import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { soundEffects } from '../utils/audio';
import { 
  Gift, 
  Sparkles, 
  Coins, 
  Zap, 
  CheckCircle2, 
  X, 
  Flame, 
  Calendar, 
  BookOpen, 
  ArrowRight,
  Trophy
} from 'lucide-react';

export interface DailyRewardTier {
  day: number;
  coins: number;
  xp: number;
  icon: string;
  specialTitle?: string;
}

export const DAILY_REWARDS: DailyRewardTier[] = [
  { day: 1, coins: 50, xp: 25, icon: '🪙', specialTitle: 'Starter Pack' },
  { day: 2, coins: 75, xp: 40, icon: '🪙', specialTitle: 'Explorer Boost' },
  { day: 3, coins: 100, xp: 60, icon: '💎', specialTitle: 'Gem Stash' },
  { day: 4, coins: 150, xp: 80, icon: '⚡', specialTitle: 'Grammar Energy' },
  { day: 5, coins: 200, xp: 100, icon: '🎁', specialTitle: 'Super Supply' },
  { day: 6, coins: 250, xp: 150, icon: '🔮', specialTitle: 'Scholar Cache' },
  { day: 7, coins: 500, xp: 300, icon: '👑', specialTitle: 'Master Champion Box' }
];

// Helper to calculate difference in calendar days between two YYYY-MM-DD dates
export function getCalendarDaysDiff(prevDateStr: string, currDateStr: string): number {
  try {
    const prev = new Date(prevDateStr + 'T00:00:00');
    const curr = new Date(currDateStr + 'T00:00:00');
    const diffMs = curr.getTime() - prev.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  } catch {
    return 999;
  }
}

// Compute current active streak day and whether claimed today
export function calculateDailyRewardStatus(student: StudentProfile, todayStr: string) {
  const isClaimedToday = student.lastDailyRewardDate === todayStr;

  if (isClaimedToday) {
    const currentStreak = Math.min(Math.max(student.dailyStreak || 1, 1), 7);
    return {
      isClaimedToday: true,
      activeStreakDay: currentStreak,
      streakCount: student.dailyStreak || 1
    };
  }

  // Not claimed today yet
  if (!student.lastDailyRewardDate) {
    // First time playing or claiming
    return {
      isClaimedToday: false,
      activeStreakDay: 1,
      streakCount: 1
    };
  }

  const diff = getCalendarDaysDiff(student.lastDailyRewardDate, todayStr);
  if (diff === 1) {
    // Consecutive day login!
    const nextStreak = ((student.dailyStreak || 1) % 7) + 1;
    return {
      isClaimedToday: false,
      activeStreakDay: nextStreak,
      streakCount: (student.dailyStreak || 1) + 1
    };
  } else {
    // Streak broken (diff > 1 or negative) -> reset to Day 1
    return {
      isClaimedToday: false,
      activeStreakDay: 1,
      streakCount: 1
    };
  }
}

interface DailyRewardModalProps {
  student: StudentProfile;
  onClaimReward: (coins: number, xp: number, streak: number, dateStr: string) => void;
  onOpenLessonGuide: () => void;
  onClose: () => void;
}

export const DailyRewardModal: React.FC<DailyRewardModalProps> = ({
  student,
  onClaimReward,
  onOpenLessonGuide,
  onClose
}) => {
  const todayStr = new Date().toLocaleDateString('en-CA');
  const { isClaimedToday, activeStreakDay, streakCount } = calculateDailyRewardStatus(student, todayStr);

  const [hasJustClaimed, setHasJustClaimed] = useState(false);
  const [claimedReward, setClaimedReward] = useState<DailyRewardTier | null>(null);

  const currentReward = DAILY_REWARDS[activeStreakDay - 1] || DAILY_REWARDS[0];

  const handleClaim = () => {
    if (isClaimedToday || hasJustClaimed) return;

    soundEffects.playVictoryFanfare();
    setClaimedReward(currentReward);
    setHasJustClaimed(true);
    onClaimReward(currentReward.coins, currentReward.xp, streakCount, todayStr);
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl p-5 sm:p-7 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-amber-500/20 to-transparent blur-2xl pointer-events-none" />

        {/* Header Bar */}
        <div className="relative flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30">
              <Gift className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Daily Login Bonus
                </span>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-black flex items-center gap-1">
                  <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
                  Streak: {isClaimedToday || hasJustClaimed ? streakCount : streakCount} Days
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white font-['Fredoka',sans-serif] tracking-tight">
                Daily Explorer Check-In
              </h2>
            </div>
          </div>

          <button
            id="close-daily-reward-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Claimed Notification / Success Banner */}
        {(hasJustClaimed || isClaimedToday) ? (
          <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-emerald-600/15 to-teal-500/20 border border-emerald-500/40 flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black shadow">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-emerald-300">
                  {hasJustClaimed ? 'Bonus Successfully Claimed!' : 'Daily Bonus Claimed for Today!'}
                </h4>
                <p className="text-xs text-emerald-100/80">
                  {hasJustClaimed 
                    ? `+${claimedReward?.coins || currentReward.coins} Coins and +${claimedReward?.xp || currentReward.xp} XP added to your backpack!`
                    : 'Check back tomorrow to claim your next day streak reward!'}
                </p>
              </div>
            </div>

            {/* Quick action to enter lesson right away */}
            <button
              id="daily-modal-enter-lesson-btn"
              onClick={() => {
                soundEffects.playSelect();
                onClose();
                onOpenLessonGuide();
              }}
              className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 transition cursor-pointer shrink-0"
              title="Enter English Lesson"
            >
              <BookOpen className="w-4 h-4" />
              <span>Enter Lesson</span>
            </button>
          </div>
        ) : (
          <div className="mb-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs text-amber-200">
                <span className="font-bold text-white">Log in every day</span> to unlock bonus coins, XP, and travel perks!
              </div>
            </div>
            <div className="text-[11px] font-bold text-amber-300 bg-amber-500/20 px-2 py-1 rounded-lg border border-amber-500/30 shrink-0">
              Day {activeStreakDay} Ready
            </div>
          </div>
        )}

        {/* 7-Day Calendar Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-2.5 mb-6">
          {DAILY_REWARDS.map((tier) => {
            const isToday = tier.day === activeStreakDay;
            const isCompleted = isClaimedToday 
              ? tier.day <= activeStreakDay 
              : hasJustClaimed 
                ? tier.day <= activeStreakDay 
                : tier.day < activeStreakDay;
            const isFuture = !isCompleted && !isToday;

            return (
              <div
                key={tier.day}
                className={`relative rounded-2xl p-2.5 flex flex-col items-center justify-between text-center transition-all ${
                  isToday && (!isClaimedToday && !hasJustClaimed)
                    ? 'bg-gradient-to-b from-amber-500/30 to-amber-600/10 border-2 border-amber-400 shadow-xl shadow-amber-500/20 scale-105 z-10'
                    : isCompleted
                    ? 'bg-slate-800/90 border border-emerald-500/40 text-slate-300 opacity-90'
                    : 'bg-slate-800/40 border border-slate-700/60 text-slate-400'
                }`}
              >
                {/* Day Marker */}
                <div className="w-full flex items-center justify-between text-[10px] font-black mb-1">
                  <span className={isToday ? 'text-amber-300' : isCompleted ? 'text-emerald-400' : 'text-slate-400'}>
                    Day {tier.day}
                  </span>
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>

                {/* Reward Icon */}
                <div className="text-2xl my-1 drop-shadow">
                  {tier.icon}
                </div>

                {/* Coins & XP Details */}
                <div className="w-full space-y-0.5 mt-1">
                  <div className="flex items-center justify-center gap-1 text-[11px] font-black text-amber-300">
                    <Coins className="w-3 h-3 text-amber-400" />
                    <span>+{tier.coins}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-[10px] font-semibold text-sky-300">
                    <Zap className="w-2.5 h-2.5 text-sky-400" />
                    <span>+{tier.xp} XP</span>
                  </div>
                </div>

                {/* Day 7 Badge */}
                {tier.day === 7 && (
                  <span className="mt-1 text-[8px] font-black uppercase px-1 py-0.2 rounded bg-amber-400 text-slate-950">
                    Mega
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {(!isClaimedToday && !hasJustClaimed) ? (
            <button
              id="claim-daily-bonus-btn"
              onClick={handleClaim}
              className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
            >
              <Gift className="w-5 h-5" />
              <span>Claim Day {activeStreakDay} Bonus (+{currentReward.coins} 🪙, +{currentReward.xp} XP)</span>
            </button>
          ) : (
            <button
              id="daily-enter-lesson-primary-btn"
              onClick={() => {
                soundEffects.playSelect();
                onClose();
                onOpenLessonGuide();
              }}
              className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
              <span>Enter English Lesson Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
          >
            Back to Map
          </button>
        </div>

      </div>
    </div>
  );
};
