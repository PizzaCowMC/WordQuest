import { useState, useEffect, useRef, useCallback } from 'react';
import { MultiplayerPlayer, ChatMessage, DuelSession, StudentProfile, CityData, VehicleType } from '../types';

export interface UseMultiplayerProps {
  student: StudentProfile | null;
  currentCity: CityData;
  cityIndex: number;
}

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

function getInitialPlayerId(): string {
  if (typeof window !== 'undefined' && (window as any).__lexiroam_player_id) {
    return (window as any).__lexiroam_player_id;
  }
  let id = '';
  try {
    id = localStorage.getItem('lexiroam_player_id') || '';
  } catch {
    // ignore
  }
  if (!id) {
    try {
      id = sessionStorage.getItem('lexiroam_player_id') || '';
    } catch {
      // ignore
    }
  }
  if (!id) {
    id = 'p-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36);
    try {
      localStorage.setItem('lexiroam_player_id', id);
    } catch {}
    try {
      sessionStorage.setItem('lexiroam_player_id', id);
    } catch {}
  }
  if (typeof window !== 'undefined') {
    (window as any).__lexiroam_player_id = id;
  }
  return id;
}

export function useMultiplayer({ student, currentCity, cityIndex }: UseMultiplayerProps) {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [room, setRoom] = useState<string>(() => {
    try {
      return localStorage.getItem('lexiroam_room_code') || 'global';
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
  const syncIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastMoveSentRef = useRef<number>(0);
  const myPlayerIdRef = useRef<string>(getInitialPlayerId());

  // Keep latest student, city, and room in ref for reconnects & message sends
  const stateRef = useRef({ student, currentCity, cityIndex, room });
  stateRef.current = { student, currentCity, cityIndex, room };

  const hasStudent = Boolean(student);

  // Helper to sync over HTTP REST API
  const syncOverHttp = useCallback(async () => {
    if (!stateRef.current.student) return;
    try {
      const myId = myPlayerIdRef.current;
      const currentRoom = stateRef.current.room;
      const res = await fetch(`/api/multiplayer/sync?room=${encodeURIComponent(currentRoom)}&playerId=${encodeURIComponent(myId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.players) {
          const remotePlayers: MultiplayerPlayer[] = data.players.filter((p: MultiplayerPlayer) => p.id !== myId);
          setPlayers(remotePlayers);
        }
        if (data.messages && Array.isArray(data.messages)) {
          setChatMessages((prev) => {
            const map = new Map<string, ChatMessage>();
            prev.forEach((m) => {
              if (m && m.id) map.set(m.id, m);
            });
            data.messages.forEach((m: ChatMessage) => {
              if (m && m.id) map.set(m.id, m);
            });
            return Array.from(map.values()).sort((a, b) => a.timestamp - b.timestamp).slice(-80);
          });
        }
        if (data.activeDuel) {
          if (data.activeDuel.status === 'pending' && data.activeDuel.opponentId === myId) {
            setIncomingDuelInvite(data.activeDuel);
          } else if (data.activeDuel.status === 'active') {
            setActiveDuel(data.activeDuel);
          } else if (data.activeDuel.status === 'finished') {
            setDuelResult({ duel: data.activeDuel, winnerId: data.activeDuel.winnerId || 'tie' });
          }
        }
        setStatus('connected');
      }
    } catch {
      // ignore transient network errors
    }
  }, []);

  // Connect WebSocket & start fallback sync
  const connect = useCallback(() => {
    if (!stateRef.current.student) return;

    const myPlayerId = myPlayerIdRef.current;
    const initialPlayer = {
      id: myPlayerId,
      name: stateRef.current.student.name || 'Explorer',
      avatar: stateRef.current.student.appearance?.avatar || '🧒',
      clothingColor: stateRef.current.student.appearance?.outfitColor || '#38bdf8',
      companionId: stateRef.current.student.starter?.id || 'starter-electric',
      cityIndex: stateRef.current.cityIndex,
      cityName: stateRef.current.currentCity.name,
      pos: {
        lat: stateRef.current.currentCity.coordinates[0],
        lng: stateRef.current.currentCity.coordinates[1],
      },
      facing: 'down',
      vehicle: stateRef.current.student.activeVehicle || 'walk',
      level: stateRef.current.student.level || 1,
      title: stateRef.current.student.appearance?.title || 'Word Explorer',
    };

    fetch('/api/multiplayer/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: initialPlayer, room: stateRef.current.room }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.players) {
          setPlayers(data.players.filter((p: MultiplayerPlayer) => p.id !== myPlayerId));
        }
        if (data.messages) {
          setChatMessages((prev) => {
            const map = new Map<string, ChatMessage>();
            prev.forEach((m) => { if (m?.id) map.set(m.id, m); });
            data.messages.forEach((m: ChatMessage) => { if (m?.id) map.set(m.id, m); });
            return Array.from(map.values()).sort((a, b) => a.timestamp - b.timestamp).slice(-80);
          });
        }
        setStatus('connected');
      })
      .catch(() => {});

    // Cleanup existing socket
    if (socketRef.current) {
      try {
        socketRef.current.close();
      } catch {
        // ignore
      }
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const wsUrl = `${protocol}//${host}/ws`;

    try {
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      let pingInterval: ReturnType<typeof setInterval> | null = null;

      ws.onopen = () => {
        setStatus('connected');

        pingInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            try {
              ws.send(JSON.stringify({ type: 'ping' }));
            } catch {}
          }
        }, 20000);

        const joinPayload = {
          type: 'join',
          room: stateRef.current.room,
          player: initialPlayer,
        };

        try {
          ws.send(JSON.stringify(joinPayload));
        } catch {}
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
              if (data.messages && Array.isArray(data.messages)) {
                setChatMessages((prev) => {
                  const map = new Map<string, ChatMessage>();
                  prev.forEach((m) => { if (m?.id) map.set(m.id, m); });
                  data.messages.forEach((m: ChatMessage) => { if (m?.id) map.set(m.id, m); });
                  return Array.from(map.values()).sort((a, b) => a.timestamp - b.timestamp).slice(-80);
                });
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
              if (msg && msg.id) {
                setChatMessages((prev) => {
                  // If message is already present (e.g. optimistic insert), update in place!
                  const existingIdx = prev.findIndex((m) => m.id === msg.id);
                  if (existingIdx >= 0) {
                    const updated = [...prev];
                    updated[existingIdx] = msg;
                    return updated;
                  }
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
        syncOverHttp();
      };

      ws.onclose = () => {
        if (pingInterval) clearInterval(pingInterval);
        syncOverHttp();
        if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, 4000);
      };
    } catch {
      syncOverHttp();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, 5000);
    }
  }, [hasStudent, room, syncOverHttp]);

  // Initial connection on student available
  useEffect(() => {
    connect();

    if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
    syncIntervalRef.current = setInterval(() => {
      syncOverHttp();
    }, 2500);

    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
      if (socketRef.current) {
        try {
          socketRef.current.close();
        } catch {}
      }
    };
  }, [connect, syncOverHttp]);

  // Throttled movement emission
  const sendMovement = useCallback(
    (pos: { lat: number; lng: number }, facing: 'left' | 'right' | 'up' | 'down', vehicle: VehicleType) => {
      const now = Date.now();
      if (now - lastMoveSentRef.current < 60) return;
      lastMoveSentRef.current = now;

      const payload = {
        type: 'move',
        id: myPlayerIdRef.current,
        pos,
        facing,
        vehicle,
        cityIndex: stateRef.current.cityIndex,
        cityName: stateRef.current.currentCity.name,
        room: stateRef.current.room,
      };

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        try {
          socketRef.current.send(JSON.stringify(payload));
          return;
        } catch {}
      }

      if (now % 3000 < 100) {
        fetch('/api/multiplayer/move', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(() => {});
      }
    },
    []
  );

  // Send Chat message: EXACT ID preservation, NO duplicate sending
  const sendChat = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const myId = myPlayerIdRef.current;
    const senderName = stateRef.current.student?.name || 'Explorer';
    const senderAvatar = stateRef.current.student?.appearance?.avatar || '🧒';
    const currentRoom = stateRef.current.room;
    const timestamp = Date.now();

    // Unique deterministic message id generated once by the client
    const messageId = `msg-${timestamp}-${Math.random().toString(36).substring(2, 8)}`;

    const optimisticMsg: ChatMessage = {
      id: messageId,
      senderId: myId,
      senderName,
      senderAvatar,
      text: trimmed,
      timestamp,
      room: currentRoom,
    };

    // 1. Add locally once (optimistic insertion)
    setChatMessages((prev) => {
      if (prev.some((m) => m.id === messageId)) return prev;
      return [...prev.slice(-99), optimisticMsg];
    });

    const payload = {
      id: messageId,
      senderId: myId,
      senderName,
      senderAvatar,
      text: trimmed,
      timestamp,
      room: currentRoom,
    };

    // 2. Send via WebSocket if open, OR fallback to HTTP (NEVER BOTH)
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      try {
        socketRef.current.send(
          JSON.stringify({
            type: 'chat',
            ...payload,
          })
        );
        return; // Sent via WebSocket! Do not also call fetch to avoid duplicate message!
      } catch {}
    }

    // 3. Fallback: WebSocket is not open, send via HTTP
    fetch('/api/multiplayer/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }, []);

  // Send Emote
  const sendEmote = useCallback((emoji: string, text?: string) => {
    const myId = myPlayerIdRef.current;
    const currentRoom = stateRef.current.room;

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      try {
        socketRef.current.send(
          JSON.stringify({
            type: 'emote',
            playerId: myId,
            emoji,
            text,
            room: currentRoom,
          })
        );
        return;
      } catch {}
    }

    fetch('/api/multiplayer/emote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerId: myId,
        emoji,
        text,
        room: currentRoom,
      }),
    }).catch(() => {});
  }, []);

  // Announce Monster Defeated to room
  const announceMonsterDefeated = useCallback((monsterName: string, xp: number) => {
    const myId = myPlayerIdRef.current;
    const currentRoom = stateRef.current.room;
    const payload = {
      type: 'monster_defeated',
      monsterName,
      cityName: stateRef.current.currentCity.name,
      xp,
      room: currentRoom,
    };

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      try {
        socketRef.current.send(JSON.stringify(payload));
        return;
      } catch {}
    }

    fetch('/api/multiplayer/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senderId: 'system',
        senderName: 'World News',
        text: `🏆 Trainer ${stateRef.current.student?.name || 'Explorer'} defeated ${monsterName} in ${stateRef.current.currentCity.name}! (+${xp} XP)`,
        room: currentRoom,
      }),
    }).catch(() => {});
  }, []);

  // Switch Room / Party code
  const switchRoom = useCallback((newRoomCode: string) => {
    const cleanRoom = newRoomCode.trim().toLowerCase() || 'global';
    setRoom(cleanRoom);
    try {
      localStorage.setItem('lexiroam_room_code', cleanRoom);
    } catch {
      // ignore
    }
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      try {
        socketRef.current.send(
          JSON.stringify({
            type: 'switch_room',
            room: cleanRoom,
          })
        );
      } catch {}
    }
    syncOverHttp();
  }, [syncOverHttp]);

  // Duel actions
  const inviteToDuel = useCallback((targetPlayerId: string, question: { prompt: string; options: string[]; correctAnswer: string }) => {
    const myId = myPlayerIdRef.current;
    const payload = {
      type: 'duel_invite',
      challengerId: myId,
      targetPlayerId,
      question,
    };

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      try {
        socketRef.current.send(JSON.stringify(payload));
        return;
      } catch {}
    }

    fetch('/api/multiplayer/duel/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.duel && data.duel.status === 'active') {
          setActiveDuel(data.duel);
        }
      })
      .catch(() => {});
  }, []);

  const respondToDuel = useCallback((duelId: string, accept: boolean) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      try {
        socketRef.current.send(
          JSON.stringify({
            type: 'duel_response',
            duelId,
            accept,
          })
        );
      } catch {}
    }

    if (!accept) {
      setIncomingDuelInvite(null);
    }
  }, []);

  const answerDuel = useCallback((duelId: string, answer: string) => {
    const myId = myPlayerIdRef.current;
    const payload = {
      type: 'duel_answer',
      duelId,
      playerId: myId,
      answer,
    };

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      try {
        socketRef.current.send(JSON.stringify(payload));
        return;
      } catch {}
    }

    fetch('/api/multiplayer/duel/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.duel && data.duel.status === 'finished') {
          setDuelResult({ duel: data.duel, winnerId: data.duel.winnerId });
        }
      })
      .catch(() => {});
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
