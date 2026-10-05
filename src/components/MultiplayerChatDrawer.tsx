import React, { useState, useRef, useEffect } from 'react';
import { MultiplayerPlayer, ChatMessage, StudentProfile } from '../types';
import { MessageSquare, Users, Send, Smile, Hash, Wifi, ChevronDown, ChevronUp, X, Swords, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface MultiplayerChatDrawerProps {
  student: StudentProfile;
  myPlayerId: string;
  room: string;
  status: 'connected' | 'connecting' | 'disconnected';
  players: MultiplayerPlayer[];
  chatMessages: ChatMessage[];
  currentCityIndex: number;
  onSendMessage: (text: string) => void;
  onSendEmote: (emoji: string, text?: string) => void;
  onSwitchRoom: (newRoom: string) => void;
  onSelectPlayer: (player: MultiplayerPlayer) => void;
}

export const MultiplayerChatDrawer: React.FC<MultiplayerChatDrawerProps> = ({
  student,
  myPlayerId,
  room,
  status,
  players,
  chatMessages,
  currentCityIndex,
  onSendMessage,
  onSendEmote,
  onSwitchRoom,
  onSelectPlayer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'players'>('chat');
  const [inputText, setInputText] = useState('');
  const [showRoomInput, setShowRoomInput] = useState(false);
  const [newRoomCode, setNewRoomCode] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Track unread messages when collapsed
  useEffect(() => {
    if (!isOpen && chatMessages.length > 0) {
      setUnreadCount((prev) => prev + 1);
    }
  }, [chatMessages.length, isOpen]);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isOpen, activeTab]);

  const handleOpen = () => {
    soundEffects.playSelect();
    setIsOpen(true);
    setUnreadCount(0);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    soundEffects.playSelect();
    onSendMessage(inputText);
    setInputText('');
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomCode.trim()) return;
    soundEffects.playSelect();
    onSwitchRoom(newRoomCode.trim());
    setShowRoomInput(false);
    setNewRoomCode('');
  };

  // Players in same city vs elsewhere
  const cityPlayers = players.filter((p) => p.cityIndex === currentCityIndex);
  const otherPlayers = players.filter((p) => p.cityIndex !== currentCityIndex);
  const totalOnline = players.length + 1; // including local player

  // Deduplicate announcements so repeated "entered the world" is never shown twice in chat
  const displayedMessages = React.useMemo(() => {
    const seenAnnouncements = new Set<string>();
    return chatMessages.filter((msg) => {
      if (msg.isAnnouncement) {
        const key = msg.text.trim().toLowerCase();
        if (seenAnnouncements.has(key)) return false;
        seenAnnouncements.add(key);
      }
      return true;
    });
  }, [chatMessages]);

  return (
    <aside aria-label="Multiplayer Hub" className="fixed bottom-4 right-4 z-[450] flex flex-col items-end">
      {/* 1. COLLAPSED FLOATING PILL */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="relative px-3.5 py-2.5 rounded-2xl bg-slate-900/95 hover:bg-slate-850 border-2 border-sky-500/50 shadow-2xl backdrop-blur-md text-white flex items-center gap-2.5 transition transform hover:scale-105 cursor-pointer"
        >
          {/* Status light */}
          <span className="relative flex h-3 w-3">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                status === 'connected' ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                status === 'connected' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            ></span>
          </span>

          <div className="flex items-center gap-1.5 font-bold text-xs">
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span>Multiplayer</span>
            <span className="px-1.5 py-0.2 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-mono font-black border border-sky-500/30">
              {totalOnline} online
            </span>
          </div>

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-red-500 text-white font-black text-[10px] shadow-lg animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* 2. EXPANDED CHAT / ROSTER WINDOW */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-slate-900/95 border-2 border-sky-500/40 rounded-3xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    status === 'connected' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                ></span>
              </span>

              {/* Room pill */}
              <button
                onClick={() => setShowRoomInput(!showRoomInput)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-sky-300 text-xs font-bold transition cursor-pointer"
                title="Change Party / Room Code"
              >
                <Hash className="w-3.5 h-3.5 text-sky-400" />
                <span className="capitalize">{room}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              {/* Tab Switcher */}
              <div className="flex rounded-xl bg-slate-800 p-0.5 border border-slate-700">
                <button
                  onClick={() => {
                    soundEffects.playSelect();
                    setActiveTab('chat');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeTab === 'chat'
                      ? 'bg-sky-500 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => {
                    soundEffects.playSelect();
                    setActiveTab('players');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                    activeTab === 'players'
                      ? 'bg-sky-500 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-3 h-3" />
                  <span>{totalOnline}</span>
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  soundEffects.playSelect();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Change Room Code Drawer */}
          {showRoomInput && (
            <form
              onSubmit={handleJoinRoom}
              className="p-3 bg-slate-800/90 border-b border-slate-700 flex items-center gap-2 animate-in slide-in-from-top-2"
            >
              <input
                type="text"
                value={newRoomCode}
                onChange={(e) => setNewRoomCode(e.target.value)}
                placeholder="Enter party code (e.g. CLASS1)..."
                maxLength={20}
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow transition cursor-pointer"
              >
                Join
              </button>
            </form>
          )}

          {/* Content Body: Chat or Online Players */}
          {activeTab === 'chat' ? (
            <div className="flex flex-col h-72">
              {/* Messages Area */}
              <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
                {displayedMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center p-4">
                    <MessageSquare className="w-8 h-8 text-slate-600 mb-1" />
                    <p className="font-semibold">Welcome to Multiplayer Chat!</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Say hello to trainers exploring the city!
                    </p>
                  </div>
                ) : (
                  displayedMessages.map((msg) => {
                    const isMe = msg.senderId === myPlayerId;
                    if (msg.isAnnouncement) {
                      return (
                        <div
                          key={msg.id}
                          className="p-2 rounded-xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-sky-500/10 border border-amber-500/30 text-amber-200 text-[11px] font-semibold text-center flex items-center justify-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{msg.text}</span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center gap-1.5 mb-0.5 text-[10px] text-slate-400">
                          <span className="font-bold text-slate-300">{msg.senderName}</span>
                          <span className="text-[9px] text-slate-500">
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <div
                          className={`max-w-[85%] px-3 py-2 rounded-2xl break-words ${
                            isMe
                              ? 'bg-sky-600 text-white rounded-tr-none'
                              : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Emote Bar */}
              <div className="px-3 py-1.5 bg-slate-850/70 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto">
                {[
                  { emoji: '👋', text: 'Hey!' },
                  { emoji: '⚡', text: 'GG!' },
                  { emoji: '⚔️', text: 'Duel me!' },
                  { emoji: '🌟', text: 'Nice!' },
                  { emoji: '🏆', text: 'Champion!' },
                  { emoji: '❤️', text: 'Cheer!' },
                ].map((em) => (
                  <button
                    key={em.emoji}
                    onClick={() => {
                      soundEffects.playSelect();
                      onSendEmote(em.emoji, em.text);
                    }}
                    className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm border border-slate-700 hover:border-sky-400 transition cursor-pointer shrink-0"
                    title={em.text}
                  >
                    {em.emoji}
                  </button>
                ))}
              </div>

              {/* Input Box */}
              <form
                onSubmit={handleSend}
                className="p-2.5 bg-slate-850 border-t border-slate-800 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message..."
                  maxLength={180}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          ) : (
            /* Online Players Roster */
            <div className="h-72 p-3 overflow-y-auto space-y-3 text-xs">
              {/* Current City Players */}
              <div>
                <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>In Your City ({cityPlayers.length + 1})</span>
                  <span className="text-slate-500 font-mono">Nearby</span>
                </div>

                {/* You */}
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center text-sm font-bold">
                      {student.appearance.avatar === 'boy' ? '👦' : '👧'}
                    </div>
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{student.name}</span>
                        <span className="text-[9px] px-1 rounded bg-sky-500/30 text-sky-300 font-mono">
                          You
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">Lv. {student.level} Trainer</div>
                    </div>
                  </div>
                </div>

                {cityPlayers.map((player) => (
                  <div
                    key={player.id}
                    onClick={() => onSelectPlayer(player)}
                    className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 hover:border-sky-400 transition flex items-center justify-between cursor-pointer mb-1.5 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold shadow"
                        style={{ backgroundColor: player.clothingColor || '#38bdf8' }}
                      >
                        {player.avatar === 'boy' ? '👦' : '👧'}
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-sky-300 transition">
                          {player.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Lv. {player.level} • {player.vehicle}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPlayer(player);
                      }}
                      className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 font-bold text-[10px] flex items-center gap-1 border border-amber-500/30 transition cursor-pointer"
                    >
                      <Swords className="w-3 h-3" />
                      <span>Card</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Other Cities */}
              {otherPlayers.length > 0 && (
                <div className="pt-2 border-t border-slate-800">
                  <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1.5">
                    Exploring Other Cities ({otherPlayers.length})
                  </div>
                  {otherPlayers.map((player) => (
                    <div
                      key={player.id}
                      onClick={() => onSelectPlayer(player)}
                      className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-750 border border-slate-700/60 transition flex items-center justify-between cursor-pointer mb-1 text-slate-300"
                    >
                      <div className="flex items-center gap-2">
                        <span>{player.avatar === 'boy' ? '👦' : '👧'}</span>
                        <span className="font-semibold text-white">{player.name}</span>
                        <span className="text-[10px] text-slate-400">({player.cityName})</span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-300">Lv. {player.level}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
