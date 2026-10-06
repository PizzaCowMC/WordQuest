import React, { useState } from 'react';
import { getXpProgress, getLevelTitle, MAX_LEVEL } from '../utils/levelUtils';
import { Sparkles, Trophy, Zap, Shield } from 'lucide-react';

interface TrainerXpBarProps {
  xp: number;
  level: number;
  avatarIcon?: string;
  name?: string;
}

export const TrainerXpBar: React.FC<TrainerXpBarProps> = ({
  xp,
  level,
  avatarIcon = '👦',
  name = 'Trainer'
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const progress = getXpProgress(xp);
  const title = getLevelTitle(level);

  // Determine badge styling based on level milestone
  const getBadgeStyle = () => {
    if (level >= 1000) return 'from-amber-400 via-rose-500 to-purple-600 text-amber-100 ring-2 ring-amber-300 shadow-amber-500/50 animate-pulse';
    if (level >= 500) return 'from-purple-600 via-indigo-600 to-sky-500 text-white ring-2 ring-purple-400 shadow-purple-500/40';
    if (level >= 100) return 'from-amber-500 to-orange-600 text-white ring-1 ring-amber-300 shadow-amber-500/30';
    if (level >= 50) return 'from-emerald-500 to-teal-600 text-white ring-1 ring-emerald-300 shadow-emerald-500/20';
    return 'from-sky-500 to-blue-600 text-white';
  };

  return (
    <div 
      className="relative pointer-events-auto flex items-center gap-2 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl px-2.5 py-1.5 shadow-xl hover:border-sky-400/60 transition cursor-pointer"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
      title="Trainer Level & XP Progress Bar (Scale to Lv. 1000!)"
    >
      {/* Level Badge */}
      <div className={`relative px-2 py-0.5 rounded-xl bg-gradient-to-r ${getBadgeStyle()} flex items-center gap-1 shadow-md shrink-0`}>
        <span className="text-xs font-black font-mono tracking-tight">
          Lv.{level}
        </span>
        {level >= 100 && (
          <Sparkles className="w-3 h-3 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
        )}
      </div>

      {/* Progress Bar & Numerical Counter */}
      <div className="flex flex-col min-w-[110px] sm:min-w-[140px] max-w-[160px]">
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-300 leading-none mb-1">
          <span className="truncate max-w-[75px] text-sky-300 font-extrabold">
            {name}
          </span>
          <span className="font-mono text-slate-400">
            {level >= MAX_LEVEL ? 'MAX' : `${progress.percent}%`}
          </span>
        </div>

        {/* Animated Bar Track */}
        <div className="relative w-full h-2 rounded-full bg-slate-800/90 border border-slate-700 overflow-hidden shadow-inner">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
      </div>

      {/* Hover / Click Tooltip Details */}
      {showTooltip && (
        <div className="absolute top-full left-0 mt-2 z-[600] w-64 p-3 bg-slate-950 border border-sky-400/50 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-2 mb-1.5 pb-1.5 border-b border-slate-800">
            <span className="text-lg">{avatarIcon}</span>
            <div>
              <div className="text-xs font-black text-white flex items-center gap-1">
                <span>{name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Lv. {level} / {MAX_LEVEL}
                </span>
              </div>
              <div className="text-[10px] text-amber-300 font-bold truncate">
                {title}
              </div>
            </div>
          </div>

          <div className="space-y-1 text-[11px]">
            <div className="flex items-center justify-between text-slate-300">
              <span>Total XP:</span>
              <span className="font-mono font-bold text-white">{xp.toLocaleString()} XP</span>
            </div>
            {level < MAX_LEVEL ? (
              <>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Next Level:</span>
                  <span className="font-mono font-bold text-sky-400">{progress.nextLevelXp.toLocaleString()} XP</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Remaining:</span>
                  <span className="font-mono font-bold text-amber-400">+{progress.xpRemaining.toLocaleString()} XP</span>
                </div>
              </>
            ) : (
              <div className="text-center font-bold text-amber-400 pt-1">
                ⭐ Ultimate Level 1000 Sovereign Mastered!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
