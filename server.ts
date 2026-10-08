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

// In-memory server-authoritative state for REAL human players
const players = new Map<string, MultiplayerPlayer>();
const socketToPlayerId = new Map<WebSocket, string>();
const chatHistory: ChatMessage[] = [];
const activeDuels = new Map<string, DuelSession>();
const announcedPlayers = new Map<string, number>(); // playerId -> last announcement timestamp

// Initialize WebSocket Server with noServer to prevent port and path collision with Vite
const wss = new WebSocketServer({ noServer: true });

function broadcastToRoom(room: string, data: object, excludeWs?: WebSocket) {
  const messageStr = JSON.stringify(data);
  const targetRoom = (room || 'global').toLowerCase().trim();
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN && client !== excludeWs) {
      const pId = socketToPlayerId.get(client);
      if (pId) {
        const p = players.get(pId);
        if (p && (p.room || 'global').toLowerCase().trim() === targetRoom) {
          try {
            client.send(messageStr);
          } catch {
            // ignore
          }
        }
      }
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
            avatar: player.avatar || '🧒',
            clothingColor: player.clothingColor || '#38bdf8',
            companionId: player.companionId || 'starter-electric',
            cityIndex: typeof player.cityIndex === 'number' ? player.cityIndex : 0,
            cityName: player.cityName || 'London',
            pos: player.pos || { lat: 51.5074, lng: -0.1278 },
            facing: player.facing || 'down',
            vehicle: player.vehicle || 'walk',
            level: player.level || 1,
            title: player.title || 'Novice Word Explorer',
            lastActive: Date.now(),
            room: (room || 'global').toLowerCase().trim(),
          };

          players.set(playerId, newPlayer);

          // Get other REAL players in this room
          const roomPlayers = Array.from(players.values()).filter(
            p => (p.room || 'global').toLowerCase().trim() === newPlayer.room
          );

          // Send init payload with state to newly connected client
          ws.send(JSON.stringify({
            type: 'init',
            yourId: playerId,
            players: roomPlayers,
            messages: chatHistory
              .filter(m => (m.room || 'global').toLowerCase().trim() === newPlayer.room)
              .slice(-50),
          }));

          // Broadcast join event to everyone else in the room
          broadcastToRoom(newPlayer.room, {
            type: 'player_joined',
            player: newPlayer,
          }, ws);

          // System announcement in chat (throttled)
          const nameKey = (newPlayer.name || '').trim().toLowerCase();
          const lastAnnouncedById = announcedPlayers.get(playerId);
          const lastAnnouncedByName = nameKey ? announcedPlayers.get(`name:${nameKey}`) : undefined;
          const lastAnnounced = Math.max(lastAnnouncedById || 0, lastAnnouncedByName || 0);
          const isGenericTrainer = !newPlayer.name || newPlayer.name.toLowerCase() === 'trainer' || newPlayer.name.toLowerCase() === 'explorer';
          const shouldAnnounce = !isGenericTrainer && (!lastAnnounced || (Date.now() - lastAnnounced > 1000 * 60 * 60));

          if (shouldAnnounce) {
            announcedPlayers.set(playerId, Date.now());
            if (nameKey) announcedPlayers.set(`name:${nameKey}`, Date.now());
            const joinMsg: ChatMessage = {
              id: `ann-${Date.now()}-${playerId}`,
              senderId: 'system',
              senderName: 'System',
              text: `✨ Trainer ${newPlayer.name} (Lv. ${newPlayer.level}) entered the world!`,
              timestamp: Date.now(),
              room: newPlayer.room,
              isAnnouncement: true,
            };
            if (!chatHistory.some(m => m.id === joinMsg.id)) {
              chatHistory.push(joinMsg);
              if (chatHistory.length > 200) chatHistory.shift();
              broadcastToRoom(newPlayer.room, {
                type: 'chat_message',
                message: joinMsg,
              });
            }
          }
          break;
        }

        case 'ping': {
          ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
          break;
        }

        case 'move': {
          const pId = data.id || socketToPlayerId.get(ws);
          if (!pId) return;
          const p = players.get(pId);
          if (!p) return;

          p.pos = data.pos || p.pos;
          if (data.facing) p.facing = data.facing;
          if (data.vehicle) p.vehicle = data.vehicle;
          if (typeof data.cityIndex === 'number') p.cityIndex = data.cityIndex;
          if (data.cityName) p.cityName = data.cityName;
          p.lastActive = Date.now();

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
          const pId = data.senderId || socketToPlayerId.get(ws);
          const p = pId ? players.get(pId) : null;
          const senderName = p?.name || data.senderName || 'Trainer';
          const senderAvatar = p?.avatar || data.senderAvatar || '🧒';
          const targetRoom = (data.room || p?.room || 'global').toLowerCase().trim();

          const text = (data.text || '').trim();
          if (!text || text.length > 280) return;

          // Preserve client's exact message id to prevent duplicate messages!
          const messageId = data.id || `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

          // Check if already in chat history to guarantee idempotency
          if (chatHistory.some(m => m.id === messageId)) return;

          const newMsg: ChatMessage = {
            id: messageId,
            senderId: pId || `p-${Date.now()}`,
            senderName,
            senderAvatar,
            text,
            timestamp: data.timestamp || Date.now(),
            room: targetRoom,
          };

          chatHistory.push(newMsg);
          if (chatHistory.length > 200) chatHistory.shift();

          // Broadcast to everyone in the room (including sender to confirm delivery)
          broadcastToRoom(targetRoom, {
            type: 'chat_message',
            message: newMsg,
          });
          break;
        }

        case 'emote': {
          const pId = data.playerId || socketToPlayerId.get(ws);
          if (!pId) return;
          const p = players.get(pId);
          if (!p) return;

          const { emoji, text } = data;
          p.currentEmote = { emoji, text, timestamp: Date.now() };

          broadcastToRoom(p.room, {
            type: 'player_emote',
            playerId: p.id,
            emoji,
            text,
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

          broadcastToRoom(oldRoom, {
            type: 'player_left',
            id: p.id,
            name: p.name,
          }, ws);

          p.room = newRoom;

          const roomPlayers = Array.from(players.values()).filter(
            player => (player.room || 'global').toLowerCase().trim() === newRoom
          );
          ws.send(JSON.stringify({
            type: 'init',
            yourId: p.id,
            players: roomPlayers,
            messages: chatHistory
              .filter(m => (m.room || 'global').toLowerCase().trim() === newRoom)
              .slice(-50),
          }));

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
          const pId = data.challengerId || socketToPlayerId.get(ws);
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

          // Send invitation to real human opponent
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
          const pId = data.playerId || socketToPlayerId.get(ws);
          const { duelId, answer } = data;
          const duel = activeDuels.get(duelId);
          if (!duel || duel.status !== 'active') return;

          if (pId === duel.challengerId) {
            duel.challengerAnswer = answer;
          } else if (pId === duel.opponentId) {
            duel.opponentAnswer = answer;
          }

          if (duel.challengerAnswer && duel.opponentAnswer) {
            const chCorrect = duel.challengerAnswer === duel.question.correctAnswer;
            const opCorrect = duel.opponentAnswer === duel.question.correctAnswer;

            let winnerId: string | 'tie' = 'tie';
            if (chCorrect && !opCorrect) winnerId = duel.challengerId;
            else if (!chCorrect && opCorrect) winnerId = duel.opponentId;
            else winnerId = 'tie';

            duel.status = 'finished';
            duel.winnerId = winnerId;

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

// Periodic cleanup of inactive human sessions (removes disconnected players after 2.5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [id, player] of players.entries()) {
    if (now - player.lastActive > 150000) {
      broadcastToRoom(player.room, {
        type: 'player_left',
        id,
        name: player.name,
      });
      players.delete(id);
    }
  }
}, 30000);

// =========================================================================
// REST API ENDPOINTS (Fallback & Real-time State Synchronization)
// =========================================================================

// 1. Full State Sync
app.get('/api/multiplayer/sync', (req, res) => {
  const room = ((req.query.room as string) || 'global').toLowerCase().trim();
  const playerId = (req.query.playerId as string) || '';

  const roomPlayers = Array.from(players.values()).filter(
    (p) => (p.room || 'global').toLowerCase().trim() === room
  );
  const messages = chatHistory
    .filter((m) => (m.room || 'global').toLowerCase().trim() === room)
    .slice(-50);

  let playerDuel: DuelSession | null = null;
  if (playerId) {
    for (const d of activeDuels.values()) {
      if (d.challengerId === playerId || d.opponentId === playerId) {
        playerDuel = d;
        break;
      }
    }
  }

  res.json({
    status: 'connected',
    players: roomPlayers,
    messages,
    activeDuel: playerDuel,
    timestamp: Date.now(),
  });
});

// 2. Join Room / Register Player
app.post('/api/multiplayer/join', (req, res) => {
  const { player, room = 'global' } = req.body;
  if (!player || !player.id) {
    return res.status(400).json({ error: 'Player data required' });
  }

  const cleanRoom = (room || 'global').toLowerCase().trim();
  const existing = players.get(player.id);
  const newPlayer: MultiplayerPlayer = {
    id: player.id,
    name: player.name || 'Trainer',
    avatar: player.avatar || '🧒',
    clothingColor: player.clothingColor || '#38bdf8',
    companionId: player.companionId || 'starter-electric',
    cityIndex: typeof player.cityIndex === 'number' ? player.cityIndex : (existing?.cityIndex ?? 0),
    cityName: player.cityName || (existing?.cityName ?? 'London'),
    pos: player.pos || existing?.pos || { lat: 51.5074, lng: -0.1278 },
    facing: player.facing || existing?.facing || 'down',
    vehicle: player.vehicle || existing?.vehicle || 'walk',
    level: player.level || existing?.level || 1,
    title: player.title || existing?.title || 'Word Explorer',
    lastActive: Date.now(),
    room: cleanRoom,
  };

  players.set(player.id, newPlayer);

  broadcastToRoom(cleanRoom, {
    type: 'player_joined',
    player: newPlayer,
  });

  const roomPlayers = Array.from(players.values()).filter(
    (p) => (p.room || 'global').toLowerCase().trim() === cleanRoom
  );
  const messages = chatHistory
    .filter((m) => (m.room || 'global').toLowerCase().trim() === cleanRoom)
    .slice(-50);

  res.json({
    success: true,
    players: roomPlayers,
    messages,
    yourId: player.id,
  });
});

// 3. Send Chat Message (Guarantees preservation of client message ID to prevent duplication)
app.post('/api/multiplayer/chat', (req, res) => {
  const { id, senderId, senderName, senderAvatar, text, timestamp, room = 'global' } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const cleanRoom = (room || 'global').toLowerCase().trim();
  const messageId = id || `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  // Idempotency: if already added via WebSocket or prior request, return immediately
  const existing = chatHistory.find(m => m.id === messageId);
  if (existing) {
    return res.json({ success: true, message: existing });
  }

  const p = senderId ? players.get(senderId) : null;
  if (p) p.lastActive = Date.now();

  const newMsg: ChatMessage = {
    id: messageId,
    senderId: senderId || 'anon',
    senderName: senderName || p?.name || 'Trainer',
    senderAvatar: senderAvatar || p?.avatar || '🧒',
    text: text.trim().substring(0, 280),
    timestamp: timestamp || Date.now(),
    room: cleanRoom,
  };

  chatHistory.push(newMsg);
  if (chatHistory.length > 200) chatHistory.shift();

  broadcastToRoom(cleanRoom, {
    type: 'chat_message',
    message: newMsg,
  });

  res.json({ success: true, message: newMsg });
});

// 4. Send Movement
app.post('/api/multiplayer/move', (req, res) => {
  const { id, pos, facing, vehicle, cityIndex, cityName, room = 'global' } = req.body;
  if (!id) return res.status(400).json({ error: 'ID required' });

  const p = players.get(id);
  if (p) {
    if (pos) p.pos = pos;
    if (facing) p.facing = facing;
    if (vehicle) p.vehicle = vehicle;
    if (typeof cityIndex === 'number') p.cityIndex = cityIndex;
    if (cityName) p.cityName = cityName;
    p.lastActive = Date.now();

    broadcastToRoom(p.room, {
      type: 'player_moved',
      id: p.id,
      pos: p.pos,
      facing: p.facing,
      vehicle: p.vehicle,
      cityIndex: p.cityIndex,
      cityName: p.cityName,
    });
  }

  res.json({ success: true });
});

// 5. Send Emote
app.post('/api/multiplayer/emote', (req, res) => {
  const { playerId, emoji, text, room = 'global' } = req.body;
  if (!playerId || !emoji) return res.status(400).json({ error: 'PlayerId and emoji required' });

  const cleanRoom = (room || 'global').toLowerCase().trim();
  const p = players.get(playerId);
  if (p) {
    p.currentEmote = { emoji, text, timestamp: Date.now() };
    p.lastActive = Date.now();
  }

  broadcastToRoom(cleanRoom, {
    type: 'player_emote',
    playerId,
    emoji,
    text,
  });

  res.json({ success: true });
});

// 6. Duel Invite via HTTP
app.post('/api/multiplayer/duel/invite', (req, res) => {
  const { challengerId, targetPlayerId, question } = req.body;
  const challenger = players.get(challengerId);
  const targetPlayer = players.get(targetPlayerId);

  if (!challenger || !targetPlayer) {
    return res.status(400).json({ error: 'Invalid challenger or target' });
  }

  const duelId = `duel-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const duel: DuelSession = {
    id: duelId,
    challengerId: challenger.id,
    challengerName: challenger.name,
    opponentId: targetPlayer.id,
    opponentName: targetPlayer.name,
    question: question || {
      prompt: 'Which word is an adjective?',
      options: ['Run', 'Happiness', 'Magnificent', 'Quickly'].sort(() => Math.random() - 0.5),
      correctAnswer: 'Magnificent',
    },
    status: 'pending',
    expiresAt: Date.now() + 30000,
  };

  activeDuels.set(duelId, duel);

  // Send invitation to real human opponent over WS if connected
  for (const [client, id] of socketToPlayerId.entries()) {
    if (id === targetPlayer.id && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'duel_invited',
        duel,
      }));
      break;
    }
  }

  res.json({ success: true, duel });
});

// 7. Duel Answer via HTTP
app.post('/api/multiplayer/duel/answer', (req, res) => {
  const { duelId, playerId, answer } = req.body;
  const duel = activeDuels.get(duelId);
  if (!duel || duel.status !== 'active') {
    return res.status(400).json({ error: 'Duel not active' });
  }

  if (playerId === duel.challengerId) {
    duel.challengerAnswer = answer;
  } else if (playerId === duel.opponentId) {
    duel.opponentAnswer = answer;
  }

  if (duel.challengerAnswer && duel.opponentAnswer) {
    const chCorrect = duel.challengerAnswer === duel.question.correctAnswer;
    const opCorrect = duel.opponentAnswer === duel.question.correctAnswer;
    duel.status = 'finished';
    duel.winnerId = chCorrect && !opCorrect ? duel.challengerId : (!chCorrect && opCorrect ? duel.opponentId : 'tie');

    for (const [client, id] of socketToPlayerId.entries()) {
      if ((id === duel.challengerId || id === duel.opponentId) && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'duel_result',
          duel,
          winnerId: duel.winnerId,
        }));
      }
    }
    activeDuels.delete(duelId);
  }

  res.json({ success: true, duel });
});

// API endpoint for health & server stats
app.get('/api/multiplayer/stats', (_req, res) => {
  res.json({
    onlineCount: players.size,
    roomsCount: new Set(Array.from(players.values()).map(p => p.room)).size,
    timestamp: Date.now(),
  });
});

// Safe Upgrade handling for WebSockets
server.on('upgrade', (request, socket, head) => {
  try {
    const url = request.url || '';
    const pathname = url.split('?')[0];
    if (pathname === '/ws' || pathname.startsWith('/ws')) {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    }
  } catch (err) {
    console.error('WebSocket upgrade error:', err);
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
    console.log(`Lexiroam Multiplayer Server running on port ${PORT} [${isProduction ? 'production' : 'development'}]`);
  });
}

startServer();
