import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PlayerPosition {
  lat: number;
  lng: number;
}

export interface MultiplayerPlayer {
  id: string;
  name: string;
  avatar: string;
  clothingColor?: string;
  companionId?: string;
  cityIndex: number;
  cityName: string;
  pos: PlayerPosition;
  facing: 'left' | 'right' | 'up' | 'down';
  vehicle: string;
  level: number;
  title: string;
  lastActive: number;
  room: string;
  currentEmote?: {
    emoji: string;
    text?: string;
    timestamp: number;
  };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: number;
  room: string;
  isAnnouncement?: boolean;
}

export interface DuelSession {
  id: string;
  challengerId: string;
  challengerName: string;
  opponentId: string;
  opponentName: string;
  question: {
    prompt: string;
    options: string[];
    correctAnswer: string;
  };
  challengerAnswer?: string;
  opponentAnswer?: string;
  winnerId?: string | 'tie';
  status: 'pending' | 'active' | 'finished';
  expiresAt: number;
}

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory server-authoritative state
const players = new Map<string, MultiplayerPlayer>();
const socketToPlayerId = new Map<WebSocket, string>();
const chatHistory: ChatMessage[] = [];
const activeDuels = new Map<string, DuelSession>();
const announcedPlayers = new Map<string, number>(); // playerId -> last announcement timestamp

// Initialize WebSocket Server with noServer to prevent port and path collision with Vite HMR
const wss = new WebSocketServer({ noServer: true });

function broadcastToRoom(room: string, data: object, excludeWs?: WebSocket) {
  const messageStr = JSON.stringify(data);
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN && client !== excludeWs) {
      const pId = socketToPlayerId.get(client);
      if (pId) {
        const p = players.get(pId);
        if (p && p.room === room) {
          client.send(messageStr);
        }
      }
    }
  }
}

function broadcastToAll(data: object) {
  const messageStr = JSON.stringify(data);
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  }
}

// Handle WebSocket connection
wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (rawData: string) => {
    try {
      const data = JSON.parse(rawData.toString());

      switch (data.type) {
        case 'join': {
          const { player, room = 'global' } = data;
          if (!player || !player.id) return;

          const playerId = player.id;
          socketToPlayerId.set(ws, playerId);

          const newPlayer: MultiplayerPlayer = {
            id: playerId,
            name: player.name || 'Trainer',
            avatar: player.avatar || 'boy',
            clothingColor: player.clothingColor || '#3b82f6',
            companionId: player.companionId || 'starter-electric',
            cityIndex: typeof player.cityIndex === 'number' ? player.cityIndex : 0,
            cityName: player.cityName || 'Tokyo',
            pos: player.pos || { lat: 35.6762, lng: 139.6503 },
            facing: player.facing || 'down',
            vehicle: player.vehicle || 'foot',
            level: player.level || 1,
            title: player.title || 'Novice Word Explorer',
            lastActive: Date.now(),
            room: room.toLowerCase().trim() || 'global',
          };

          players.set(playerId, newPlayer);

          // Get other players in this room
          const roomPlayers = Array.from(players.values()).filter(p => p.room === newPlayer.room);

          // Send init payload with state to newly connected client
          ws.send(JSON.stringify({
            type: 'init',
            yourId: playerId,
            players: roomPlayers,
            messages: chatHistory.filter(m => m.room === newPlayer.room).slice(-50),
          }));

          // Broadcast join event to everyone else in the room
          broadcastToRoom(newPlayer.room, {
            type: 'player_joined',
            player: newPlayer,
          }, ws);

          // System announcement in chat - strictly throttled by player ID and name (once per 2 hours)
          const nameKey = (newPlayer.name || '').trim().toLowerCase();
          const lastAnnouncedById = announcedPlayers.get(playerId);
          const lastAnnouncedByName = nameKey ? announcedPlayers.get(`name:${nameKey}`) : undefined;
          const lastAnnounced = Math.max(lastAnnouncedById || 0, lastAnnouncedByName || 0);
          const isGenericTrainer = !newPlayer.name || newPlayer.name.toLowerCase() === 'trainer' || newPlayer.name.toLowerCase() === 'explorer';
          const shouldAnnounce = !isGenericTrainer && (!lastAnnounced || (Date.now() - lastAnnounced > 1000 * 60 * 120));

          if (shouldAnnounce) {
            announcedPlayers.set(playerId, Date.now());
            if (nameKey) announcedPlayers.set(`name:${nameKey}`, Date.now());
            const joinMsg: ChatMessage = {
              id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              senderId: 'system',
              senderName: 'System',
              text: `✨ Trainer ${newPlayer.name} (Lv. ${newPlayer.level}) entered the world!`,
              timestamp: Date.now(),
              room: newPlayer.room,
              isAnnouncement: true,
            };
            chatHistory.push(joinMsg);
            if (chatHistory.length > 200) chatHistory.shift();
            broadcastToRoom(newPlayer.room, {
              type: 'chat_message',
              message: joinMsg,
            });
          }
          break;
        }

        case 'ping': {
          ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
          break;
        }

        case 'move': {
          const pId = socketToPlayerId.get(ws);
          if (!pId) return;
          const p = players.get(pId);
          if (!p) return;

          p.pos = data.pos || p.pos;
          if (data.facing) p.facing = data.facing;
          if (data.vehicle) p.vehicle = data.vehicle;
          if (typeof data.cityIndex === 'number') p.cityIndex = data.cityIndex;
          if (data.cityName) p.cityName = data.cityName;
          p.lastActive = Date.now();

          // Broadcast movement delta to players in the same room
          broadcastToRoom(p.room, {
            type: 'player_moved',
            id: p.id,
            pos: p.pos,
            facing: p.facing,
            vehicle: p.vehicle,
            cityIndex: p.cityIndex,
            cityName: p.cityName,
          }, ws);
          break;
        }

        case 'chat': {
          const pId = socketToPlayerId.get(ws);
          if (!pId) return;
          const p = players.get(pId);
          if (!p) return;

          const text = (data.text || '').trim();
          if (!text || text.length > 280) return;

          const newMsg: ChatMessage = {
            id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            senderId: p.id,
            senderName: p.name,
            senderAvatar: p.avatar,
            text,
            timestamp: Date.now(),
            room: p.room,
          };

          chatHistory.push(newMsg);
          if (chatHistory.length > 200) chatHistory.shift();

          // Broadcast to everyone in the room (including sender to confirm)
          broadcastToRoom(p.room, {
            type: 'chat_message',
            message: newMsg,
          });
          break;
        }

        case 'emote': {
          const pId = socketToPlayerId.get(ws);
          if (!pId) return;
          const p = players.get(pId);
          if (!p) return;

          const emoji = (data.emoji || '👋').slice(0, 10);
          const emoteText = (data.text || '').slice(0, 50);

          p.currentEmote = {
            emoji,
            text: emoteText,
            timestamp: Date.now(),
          };

          broadcastToRoom(p.room, {
            type: 'player_emote',
            playerId: p.id,
            playerName: p.name,
            emoji,
            text: emoteText,
          });
          break;
        }

        case 'switch_room': {
          const pId = socketToPlayerId.get(ws);
          if (!pId) return;
          const p = players.get(pId);
          if (!p) return;

          const oldRoom = p.room;
          const newRoom = (data.room || 'global').toLowerCase().trim();
          if (oldRoom === newRoom) return;

          // Announce leave in old room
          broadcastToRoom(oldRoom, {
            type: 'player_left',
            id: p.id,
            name: p.name,
          }, ws);

          p.room = newRoom;

          // Send current state of new room to player
          const roomPlayers = Array.from(players.values()).filter(player => player.room === newRoom);
          ws.send(JSON.stringify({
            type: 'init',
            yourId: p.id,
            players: roomPlayers,
            messages: chatHistory.filter(m => m.room === newRoom).slice(-50),
          }));

          // Announce join in new room
          broadcastToRoom(newRoom, {
            type: 'player_joined',
            player: p,
          }, ws);
          break;
        }

        case 'monster_defeated': {
          const pId = socketToPlayerId.get(ws);
          if (!pId) return;
          const p = players.get(pId);
          if (!p) return;

          const { monsterName, cityName, xp } = data;
          const announcementMsg: ChatMessage = {
            id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            senderId: 'system',
            senderName: 'World News',
            text: `🏆 Trainer ${p.name} defeated ${monsterName || 'a monster'} in ${cityName || p.cityName}! (+${xp || 100} XP)`,
            timestamp: Date.now(),
            room: p.room,
            isAnnouncement: true,
          };
          chatHistory.push(announcementMsg);
          broadcastToRoom(p.room, {
            type: 'chat_message',
            message: announcementMsg,
          });
          break;
        }

        case 'duel_invite': {
          const pId = socketToPlayerId.get(ws);
          if (!pId) return;
          const challenger = players.get(pId);
          const targetPlayer = players.get(data.targetPlayerId);
          if (!challenger || !targetPlayer) return;

          const duelId = `duel-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
          const duel: DuelSession = {
            id: duelId,
            challengerId: challenger.id,
            challengerName: challenger.name,
            opponentId: targetPlayer.id,
            opponentName: targetPlayer.name,
            question: data.question || {
              prompt: 'Which word is an adjective?',
              options: ['Run', 'Happiness', 'Magnificent', 'Quickly'].sort(() => Math.random() - 0.5),
              correctAnswer: 'Magnificent',
            },
            status: 'pending',
            expiresAt: Date.now() + 30000,
          };

          activeDuels.set(duelId, duel);

          // Send invitation to opponent
          for (const [client, id] of socketToPlayerId.entries()) {
            if (id === targetPlayer.id && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'duel_invited',
                duel,
              }));
              break;
            }
          }
          break;
        }

        case 'duel_response': {
          const { duelId, accept } = data;
          const duel = activeDuels.get(duelId);
          if (!duel) return;

          if (!accept) {
            duel.status = 'finished';
            // Inform challenger
            for (const [client, id] of socketToPlayerId.entries()) {
              if (id === duel.challengerId && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                  type: 'duel_declined',
                  duelId,
                  opponentName: duel.opponentName,
                }));
                break;
              }
            }
            activeDuels.delete(duelId);
            return;
          }

          duel.status = 'active';
          // Send start to both players
          for (const [client, id] of socketToPlayerId.entries()) {
            if ((id === duel.challengerId || id === duel.opponentId) && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'duel_started',
                duel,
              }));
            }
          }
          break;
        }

        case 'duel_answer': {
          const pId = socketToPlayerId.get(ws);
          const { duelId, answer } = data;
          const duel = activeDuels.get(duelId);
          if (!duel || duel.status !== 'active') return;

          if (pId === duel.challengerId) {
            duel.challengerAnswer = answer;
          } else if (pId === duel.opponentId) {
            duel.opponentAnswer = answer;
          }

          // Check if both answered or if one answered correctly
          if (duel.challengerAnswer && duel.opponentAnswer) {
            const chCorrect = duel.challengerAnswer === duel.question.correctAnswer;
            const opCorrect = duel.opponentAnswer === duel.question.correctAnswer;

            let winnerId: string | 'tie' = 'tie';
            if (chCorrect && !opCorrect) winnerId = duel.challengerId;
            else if (!chCorrect && opCorrect) winnerId = duel.opponentId;
            else winnerId = 'tie';

            duel.status = 'finished';
            duel.winnerId = winnerId;

            // Broadcast result to both
            for (const [client, id] of socketToPlayerId.entries()) {
              if ((id === duel.challengerId || id === duel.opponentId) && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                  type: 'duel_result',
                  duel,
                  winnerId,
                }));
              }
            }
            activeDuels.delete(duelId);
          }
          break;
        }

        default:
          break;
      }
    } catch (err) {
      console.error('Error handling WebSocket message:', err);
    }
  });

  ws.on('close', () => {
    const playerId = socketToPlayerId.get(ws);
    if (playerId) {
      const player = players.get(playerId);
      if (player) {
        broadcastToRoom(player.room, {
          type: 'player_left',
          id: playerId,
          name: player.name,
        });
        players.delete(playerId);
      }
      socketToPlayerId.delete(ws);
    }
  });
});

// Periodic heartbeat & inactive player cleanup (remove ghost connections after 2 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [id, player] of players.entries()) {
    if (now - player.lastActive > 120000) {
      broadcastToRoom(player.room, {
        type: 'player_left',
        id,
        name: player.name,
      });
      players.delete(id);
    }
  }
}, 30000);

// API endpoint for health & server stats
app.get('/api/multiplayer/stats', (_req, res) => {
  res.json({
    onlineCount: players.size,
    roomsCount: new Set(Array.from(players.values()).map(p => p.room)).size,
    timestamp: Date.now(),
  });
});

// Upgrade handling for WebSockets
server.on('upgrade', (request, socket, head) => {
  const pathname = request.url ? new URL(request.url, `http://${request.headers.host}`).pathname : '';
  if (pathname === '/ws' || pathname.startsWith('/ws')) {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    // Let other handlers or Vite handle non-/ws upgrade requests (like Vite HMR)
    // socket.destroy();
  }
});

// Setup Vite dev server or static files
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: { server },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(PORT, () => {
    console.log(`WordQuest Multiplayer Server running on port ${PORT} [${isProduction ? 'production' : 'development'}]`);
  });
}

startServer();
