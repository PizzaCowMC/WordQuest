import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { DailyMission } from '../types';
import { 
  getDailyMissions, 
  claimMissionReward, 
  getTimeUntilReset, 
  getTodayDateString 
} from '../utils/dailyMissions';
import { soundEffects } from '../utils/audio';
import { 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Award, 
  X, 
  ChevronRight, 
  Target, 
  Zap, 
  BookOpen, 
  Gift 
} from 'lucide-react';

interface DailyMissionsModalProps {
  onRewardClaimed: (xp: number, coins: number) => void;
  onClose: () => void;
}

export const DailyMissionsModal: React.FC<DailyMissionsModalProps> = ({
  onRewardClaimed,
  onClose
}) => {
  const [missionsState, setMissionsState] = useState(() => getDailyMissions());
  const [timeLeft, setTimeLeft] = useState(() => getTimeUntilReset());
  const [claimedId, setClaimedId] = useState<string | null>(null);

  // Live countdown timer until daily midnight reset
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilReset());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Listen to mission progress updates from game events
  useEffect(() => {
    const handleUpdate = () => {
      setMissionsState(getDailyMissions());
    };
    window.addEventListener('wordquest_missions_updated', handleUpdate);
    return () => window.removeEventListener('wordquest_missions_updated', handleUpdate);
  }, []);

  const handleClaim = (mission: DailyMission) => {
    soundEffects.playVictory();
    
    // Confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    const { success, xp, coins } = claimMissionReward(mission.id);
    if (success) {
      setClaimedId(mission.id);
      onRewardClaimed(xp, coins);
      setMissionsState(getDailyMissions());
      setTimeout(() => setClaimedId(null), 1200);
    }
  };

  const completedCount = missionsState.missions.filter(m => m.completed).length;
  const claimedCount = missionsState.missions.filter(m => m.claimed).length;
  const totalMissions = missionsState.missions.length;
  const allCompleted = completedCount === totalMissions;

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-5 sm:p-7 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Ambient Top Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        {/* Modal Header */}
        <div className="relative flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center text-2xl">
              📋
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white font-['Fredoka',sans-serif]">
                  Daily Missions
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {completedCount}/{totalMissions} Completed
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span className="font-mono text-slate-300">{getTodayDateString()}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-sky-400 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  Resets in {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overall Progress Ribbon */}
        <div className="my-4 p-3 rounded-2xl bg-gradient-to-r from-slate-850 via-slate-800 to-slate-850 border border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Gift className="w-4 h-4 text-amber-400" />
            <span className="font-medium text-slate-300">
              Complete educational goals daily for bonus XP and coins!
            </span>
          </div>
          {allCompleted && (
            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <Sparkles className="w-3 h-3" />
              All Conquered!
            </span>
          )}
        </div>

        {/* 3 Mission Cards */}
        <div className="space-y-3 my-4">
          {missionsState.missions.map((mission) => {
            const percent = Math.min(100, Math.round((mission.currentCount / mission.targetCount) * 100));
            const isReadyToClaim = mission.completed && !mission.claimed;
            const isJustClaimed = claimedId === mission.id;

            return (
              <div
                key={mission.id}
                className={`relative p-4 rounded-2xl border transition-all duration-200 overflow-hidden ${
                  mission.claimed
                    ? 'bg-slate-900/60 border-slate-800 opacity-75'
                    : isReadyToClaim
                    ? 'bg-gradient-to-r from-amber-500/10 via-slate-850 to-emerald-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl shrink-0 shadow-inner">
                      {mission.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-white font-['Fredoka',sans-serif]">
                          {mission.title}
                        </h3>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-800 text-sky-300 border border-slate-700">
                          {mission.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {mission.description}
                      </p>
                    </div>
                  </div>

                  {/* Reward Badges */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-0.5">
                        <Zap className="w-3 h-3 text-emerald-400" />
                        +{mission.xpReward} XP
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
                        🪙 +{mission.coinReward}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Action */}
                <div className="mt-3.5 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                      <span>Progress</span>
                      <span className="font-bold text-white">
                        {mission.currentCount} / {mission.targetCount}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                      <div 
                        className={`h-full transition-all duration-500 rounded-full ${
                          mission.completed 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                            : 'bg-gradient-to-r from-sky-500 to-indigo-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Status */}
                  <div className="shrink-0">
                    {mission.claimed ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-400 bg-slate-800/60 border border-slate-700/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Claimed
                      </span>
                    ) : isReadyToClaim ? (
                      <button
                        onClick={() => handleClaim(mission)}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 hover:brightness-110 active:scale-95 shadow-md shadow-amber-500/30 cursor-pointer animate-pulse"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Claim Reward!
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-400 bg-slate-800 border border-slate-700">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>

                {isJustClaimed && (
                  <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-xs flex items-center justify-center animate-in fade-in duration-150">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600 text-white font-bold text-sm shadow-xl">
                      <Sparkles className="w-4 h-4" />
                      +{mission.xpReward} XP & +{mission.coinReward} Coins Added!
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="pt-2 text-center text-[11px] text-slate-400">
          Educational daily missions refresh automatically every midnight (00:00).
        </div>
      </div>
    </div>
  );
};
