import React from 'react';
import { MultiplayerPlayer } from '../types';
import { X, Swords, Smile, MapPin, Award, Compass, ShieldCheck } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface MultiplayerTrainerCardModalProps {
  player: MultiplayerPlayer;
  onChallengeDuel: (targetPlayerId: string) => void;
  onSendEmote: (emoji: string, text?: string) => void;
  onClose: () => void;
}

export const MultiplayerTrainerCardModal: React.FC<MultiplayerTrainerCardModalProps> = ({
  player,
  onChallengeDuel,
  onSendEmote,
  onClose,
}) => {
  const isMale = player.avatar === 'boy';

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm bg-slate-900 border-2 border-sky-500/40 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="relative bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 p-5 text-white">
          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-2xl border-2 border-white/80 shadow-lg flex items-center justify-center text-3xl shrink-0"
              style={{ backgroundColor: player.clothingColor || '#38bdf8' }}
            >
              {isMale ? '👦' : '👧'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white">{player.name}</h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow">
                  Lv. {player.level}
                </span>
              </div>
              <p className="text-xs text-sky-200 font-semibold mt-0.5">{player.title}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-white/80 mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>Currently in {player.cityName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body Stats */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-lg">
                🚗
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Transit Mode</div>
                <div className="text-xs font-black text-white capitalize">{player.vehicle}</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-lg">
                🐾
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Companion</div>
                <div className="text-xs font-black text-white capitalize">Electric Fox</div>
              </div>
            </div>
          </div>

          {/* Quick Emote Reactions to Player */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 mb-2 flex items-center gap-1.5">
              <Smile className="w-3.5 h-3.5 text-amber-400" />
              <span>Send Quick Reaction:</span>
            </div>
            <div className="flex items-center gap-2">
              {[
                { emoji: '👋', text: 'Hello!' },
                { emoji: '⚡', text: 'Good luck!' },
                { emoji: '🏆', text: 'Awesome!' },
                { emoji: '🌟', text: 'Let\'s explore!' },
              ].map((em) => (
                <button
                  key={em.emoji}
                  onClick={() => {
                    soundEffects.playSelect();
                    onSendEmote(em.emoji, `@${player.name} ${em.text}`);
                    onClose();
                  }}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-sky-400 text-lg transition flex items-center justify-center cursor-pointer shadow hover:scale-105"
                  title={em.text}
                >
                  {em.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Action Challenge Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                soundEffects.playSelect();
                onChallengeDuel(player.id);
                onClose();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 transition hover:scale-[1.02] cursor-pointer"
            >
              <Swords className="w-5 h-5 text-slate-950" />
              <span>Challenge to 1v1 English Duel!</span>
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              Compete in real time to answer an English grammar or vocabulary challenge!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
