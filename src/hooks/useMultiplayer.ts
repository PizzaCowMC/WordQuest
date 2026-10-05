import { useState, useEffect, useRef, useCallback } from 'react';
import { MultiplayerPlayer, ChatMessage, DuelSession, StudentProfile, CityData, VehicleType } from '../types';

export interface UseMultiplayerProps {
  student: StudentProfile | null;
  currentCity: CityData;
  cityIndex: number;
}

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

function getInitialPlayerId(): string {
  if (typeof window !== 'undefined' && (window as any).__wordquest_player_id) {
    return (window as any).__wordquest_player_id;
  }
  let id = '';
  try {
    id = localStorage.getItem('wordquest_player_id') || '';
  } catch {
    // ignore
  }
  if (!id) {
    try {
      id = sessionStorage.getItem('wordquest_player_id') || '';
    } catch {
      // ignore
    }
  }
  if (!id) {
    id = 'p-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36);
    try {
      localStorage.setItem('wordquest_player_id', id);
    } catch {}
    try {
      sessionStorage.setItem('wordquest_player_id', id);
    } catch {}
  }
  if (typeof window !== 'undefined') {
    (window as any).__wordquest_player_id = id;
  }
  return id;
}

export function useMultiplayer({ student, currentCity, cityIndex }: UseMultiplayerProps) {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [room, setRoom] = useState<string>(() => {
    try {
      return localStorage.getItem('wordquest_room_code') || 'global';
    } catch {
      return 'global';
    }
  });

  const [players, setPlayers] = useState<MultiplayerPlayer[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [activeDuel, setActiveDuel] = useState<DuelSession | null>(null);
  const [incomingDuelInvite, setIncomingDuelInvite] = useState<DuelSession | null>(null);
  const [duelResult, setDuelResult] = useState<{ duel: DuelSession; winnerId: string | 'tie' } | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastMoveSentRef = useRef<number>(0);
  const myPlayerIdRef = useRef<string>(getInitialPlayerId());

  // Keep latest student, city, and room in ref for reconnects & message sends
  const stateRef = useRef({ student, currentCity, cityIndex, room });
  stateRef.current = { student, currentCity, cityIndex, room };

  const hasStudent = Boolean(student);

  const connect = useCallback(() => {
    if (!stateRef.current.student) return;

    // Cleanup existing socket
    if (socketRef.current) {
      try {
        socketRef.current.close();
      } catch {
        // ignore
      }
    }

    setStatus('connecting');

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const wsUrl = `${protocol}//${host}/ws`;

    try {
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      let pingInterval: ReturnType<typeof setInterval> | null = null;

      ws.onopen = () => {
        setStatus('connected');

        // Heartbeat ping every 25s
        pingInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            try {
              ws.send(JSON.stringify({ type: 'ping' }));
            } catch {
              // ignore
            }
          }
        }, 25000);

        // Send initial join payload
        const myPlayerId = myPlayerIdRef.current;
        const joinPayload = {
          type: 'join',
          room: stateRef.current.room,
          player: {
            id: myPlayerId,
            name: stateRef.current.student?.name || 'Explorer',
            avatar: stateRef.current.student?.appearance?.avatar || 'boy',
            clothingColor: stateRef.current.student?.appearance?.outfitColor || '#38bdf8',
            companionId: stateRef.current.student?.starter?.id || 'starter-electric',
            cityIndex: stateRef.current.cityIndex,
            cityName: stateRef.current.currentCity.name,
            pos: {
              lat: stateRef.current.currentCity.coordinates[0],
              lng: stateRef.current.currentCity.coordinates[1],
            },
            facing: 'down',
            vehicle: stateRef.current.student?.activeVehicle || 'walk',
            level: stateRef.current.student?.level || 1,
            title: stateRef.current.student?.appearance?.title || 'Word Explorer',
          },
        };

        ws.send(JSON.stringify(joinPayload));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const myId = myPlayerIdRef.current;

          switch (data.type) {
            case 'init': {
              const remotePlayers: MultiplayerPlayer[] = (data.players || []).filter(
                (p: MultiplayerPlayer) => p.id !== myId
              );
              setPlayers(remotePlayers);
              if (data.messages) {
                setChatMessages(data.messages);
              }
              break;
            }

            case 'player_joined': {
              const newPlayer: MultiplayerPlayer = data.player;
              if (!newPlayer || newPlayer.id === myId) break;

              setPlayers((prev) => {
                const index = prev.findIndex((p) => p.id === newPlayer.id);
                if (index >= 0) {
                  const updated = [...prev];
                  updated[index] = newPlayer;
                  return updated;
                }
                return [...prev, newPlayer];
              });
              break;
            }

            case 'player_moved': {
              if (data.id === myId) break;
              setPlayers((prev) =>
                prev.map((p) => {
                  if (p.id === data.id) {
                    return {
                      ...p,
                      pos: data.pos,
                      facing: data.facing || p.facing,
                      vehicle: data.vehicle || p.vehicle,
                      cityIndex: typeof data.cityIndex === 'number' ? data.cityIndex : p.cityIndex,
                      cityName: data.cityName || p.cityName,
                      lastActive: Date.now(),
                    };
                  }
                  return p;
                })
              );
              break;
            }

            case 'player_left': {
              setPlayers((prev) => prev.filter((p) => p.id !== data.id));
              break;
            }

            case 'chat_message': {
              const msg: ChatMessage = data.message;
              if (msg) {
                setChatMessages((prev) => {
                  if (prev.some((m) => m.id === msg.id)) return prev;
                  return [...prev.slice(-99), msg];
                });
              }
              break;
            }

            case 'player_emote': {
              const { playerId, emoji, text } = data;
              setPlayers((prev) =>
                prev.map((p) => {
                  if (p.id === playerId) {
                    return {
                      ...p,
                      currentEmote: { emoji, text, timestamp: Date.now() },
                    };
                  }
                  return p;
                })
              );

              // Auto-clear emote after 4.5 seconds
              setTimeout(() => {
                setPlayers((prev) =>
                  prev.map((p) => {
                    if (p.id === playerId && p.currentEmote?.emoji === emoji) {
                      return { ...p, currentEmote: undefined };
                    }
                    return p;
                  })
                );
              }, 4500);
              break;
            }

            case 'duel_invited': {
              setIncomingDuelInvite(data.duel);
              break;
            }

            case 'duel_started': {
              setIncomingDuelInvite(null);
              setActiveDuel(data.duel);
              break;
            }

            case 'duel_declined': {
              setActiveDuel(null);
              break;
            }

            case 'duel_result': {
              setActiveDuel(data.duel);
              setDuelResult({ duel: data.duel, winnerId: data.winnerId });
              break;
            }

            default:
              break;
          }
        } catch (err) {
          console.error('Error handling WS packet:', err);
        }
      };

      ws.onerror = () => {
        if (pingInterval) clearInterval(pingInterval);
        setStatus('disconnected');
      };

      ws.onclose = () => {
        if (pingInterval) clearInterval(pingInterval);
        setStatus('disconnected');
        // Exponential backoff or steady retry after 3 seconds
        if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, 3500);
      };
    } catch (e) {
      console.warn('WebSocket connection error:', e);
      setStatus('disconnected');
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, 4000);
    }
  }, [hasStudent, room]);

  // Initial connection on student available
  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connect]);

  // Throttled movement emission
  const sendMovement = useCallback(
    (pos: { lat: number; lng: number }, facing: 'left' | 'right' | 'up' | 'down', vehicle: VehicleType) => {
      const now = Date.now();
      if (now - lastMoveSentRef.current < 60) return; // throttle at ~16 updates/sec max
      lastMoveSentRef.current = now;

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({
            type: 'move',
            pos,
            facing,
            vehicle,
            cityIndex: stateRef.current.cityIndex,
            cityName: stateRef.current.currentCity.name,
          })
        );
      }
    },
    []
  );

  // Send Chat message
  const sendChat = useCallback((text: string) => {
    if (!text.trim() || !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(
      JSON.stringify({
        type: 'chat',
        text: text.trim(),
      })
    );
  }, []);

  // Send Emote
  const sendEmote = useCallback((emoji: string, text?: string) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(
      JSON.stringify({
        type: 'emote',
        emoji,
        text,
      })
    );
  }, []);

  // Announce Monster Defeated to room
  const announceMonsterDefeated = useCallback((monsterName: string, xp: number) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(
      JSON.stringify({
        type: 'monster_defeated',
        monsterName,
        cityName: stateRef.current.currentCity.name,
        xp,
      })
    );
  }, []);

  // Switch Room / Party code
  const switchRoom = useCallback((newRoomCode: string) => {
    const cleanRoom = newRoomCode.trim().toLowerCase() || 'global';
    setRoom(cleanRoom);
    try {
      localStorage.setItem('wordquest_room_code', cleanRoom);
    } catch {
      // ignore
    }
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: 'switch_room',
          room: cleanRoom,
        })
      );
    }
  }, []);

  // Duel actions
  const inviteToDuel = useCallback((targetPlayerId: string, question: { prompt: string; options: string[]; correctAnswer: string }) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(
      JSON.stringify({
        type: 'duel_invite',
        targetPlayerId,
        question,
      })
    );
  }, []);

  const respondToDuel = useCallback((duelId: string, accept: boolean) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(
      JSON.stringify({
        type: 'duel_response',
        duelId,
        accept,
      })
    );
    if (!accept) {
      setIncomingDuelInvite(null);
    }
  }, []);

  const answerDuel = useCallback((duelId: string, answer: string) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(
      JSON.stringify({
        type: 'duel_answer',
        duelId,
        answer,
      })
    );
  }, []);

  const dismissDuel = useCallback(() => {
    setActiveDuel(null);
    setIncomingDuelInvite(null);
    setDuelResult(null);
  }, []);

  return {
    status,
    room,
    myPlayerId: myPlayerIdRef.current,
    players,
    chatMessages,
    activeDuel,
    incomingDuelInvite,
    duelResult,
    sendMovement,
    sendChat,
    sendEmote,
    announceMonsterDefeated,
    switchRoom,
    inviteToDuel,
    respondToDuel,
    answerDuel,
    dismissDuel,
  };
}
