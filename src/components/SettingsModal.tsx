import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Volume2, 
  VolumeX, 
  Map, 
  Check, 
  X, 
  Sparkles, 
  Save, 
  RotateCcw, 
  Thermometer, 
  History, 
  Target, 
  HelpCircle, 
  Clock, 
  Gift, 
  Zap, 
  CheckCircle2, 
  BookOpen, 
  Flame 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/audio';
import { APP_VERSION } from '../data/updateLogs';
import { 
  getDailyMissions, 
  claimMissionReward, 
  getTimeUntilReset 
} from '../utils/dailyMissions';
import { DailyMission, StudentProfile } from '../types';

interface SettingsModalProps {
  initialTab?: 'settings' | 'missions';
  showMiniMap: boolean;
  onToggleMiniMap: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  tempUnit?: 'C' | 'F';
  onToggleTempUnit?: (unit: 'C' | 'F') => void;
  showControlsTips?: boolean;
  onToggleControlsTips?: () => void;
  student?: StudentProfile | null;
  onRewardClaimed?: (xp: number, coins: number) => void;
  onOpenSaveSystem?: () => void;
  onResetClick?: () => void;
  onOpenUpdateLogs?: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  initialTab = 'settings',
  showMiniMap,
  onToggleMiniMap,
  isMuted,
  onToggleMute,
  tempUnit = 'C',
  onToggleTempUnit,
  showControlsTips = true,
  onToggleControlsTips,
  student,
  onRewardClaimed,
  onOpenSaveSystem,
  onResetClick,
  onOpenUpdateLogs,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'missions'>(initialTab);
  const [missionsState, setMissionsState] = useState(() => getDailyMissions());
  const [timeLeft, setTimeLeft] = useState(() => getTimeUntilReset());
  const [justClaimedId, setJustClaimedId] = useState<string | null>(null);

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
    window.addEventListener('lexiroam_missions_updated', handleUpdate);
    return () => window.removeEventListener('lexiroam_missions_updated', handleUpdate);
  }, []);

  const handleClaimMission = (mission: DailyMission) => {
    soundEffects.playVictory();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}

    const { success, xp, coins } = claimMissionReward(mission.id);
    if (success) {
      setJustClaimedId(mission.id);
      if (onRewardClaimed) {
        onRewardClaimed(xp, coins);
      }
      setMissionsState(getDailyMissions());
      setTimeout(() => setJustClaimedId(null), 1200);
    }
  };

  const completedUnclaimedCount = missionsState.missions.filter(m => m.completed && !m.claimed).length;

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="px-5 py-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              {activeTab === 'settings' ? <Settings className="w-5 h-5" /> : <Target className="w-5 h-5 text-amber-400" />}
            </div>
            <div>
              <h2 className="text-base font-black text-white font-['Fredoka',sans-serif]">
                {activeTab === 'settings' ? 'Game Settings & Controls' : 'Daily Curriculum Missions'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {activeTab === 'settings' ? 'Customize audio, display radar, tips and data saves' : 'Complete daily study goals to earn bonus XP and coins'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Organized Navigation Tabs */}
        <div className="px-5 pt-3 pb-2 bg-slate-900 border-b border-slate-800/80 flex items-center gap-2">
          <button
            onClick={() => {
              soundEffects.playSelect();
              setActiveTab('settings');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 border border-sky-400/50'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-750'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playSelect();
              setActiveTab('missions');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer relative ${
              activeTab === 'missions'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-md shadow-amber-500/20 border border-amber-300'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-750'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Daily Missions</span>
            {completedUnclaimedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-rose-500 text-white animate-pulse">
                {completedUnclaimedCount} Ready!
              </span>
            )}
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
          
          {/* TAB 1: GENERAL SETTINGS */}
          {activeTab === 'settings' && (
            <>
              {/* 1. Real-Time Mini-Map Radar */}
              <div className="p-3.5 rounded-2xl bg-slate-850/90 border border-slate-750 flex items-center justify-between gap-4 shadow-sm hover:border-slate-700 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Map className="w-4 h-4 text-sky-400" />
                    <span className="text-sm font-bold text-white">Real-Time Mini-Map</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-700 text-slate-300 font-mono">
                      HUD
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Display district radar overlay with player GPS pointer and live monster locations.
                  </p>
                </div>

                <button
                  id="settings-toggle-minimap-switch"
                  onClick={() => {
                    soundEffects.playSelect();
                    onToggleMiniMap();
                  }}
                  className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    showMiniMap ? 'bg-sky-500' : 'bg-slate-700'
                  }`}
                  role="switch"
                  aria-checked={showMiniMap}
                  title={showMiniMap ? 'Disable Mini-Map' : 'Enable Mini-Map'}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      showMiniMap ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 2. Controls Tips HUD Banner Toggle */}
              <div className="p-3.5 rounded-2xl bg-slate-850/90 border border-slate-750 flex items-center justify-between gap-4 shadow-sm hover:border-slate-700 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-bold text-white">Show Controls Tips on HUD</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
                      WASD Guide
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Show the floating walking and flight instructions card in the bottom-left map corner.
                  </p>
                </div>

                <button
                  id="settings-toggle-controls-tips-switch"
                  onClick={() => {
                    soundEffects.playSelect();
                    onToggleControlsTips?.();
                  }}
                  className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    showControlsTips ? 'bg-amber-500' : 'bg-slate-700'
                  }`}
                  role="switch"
                  aria-checked={showControlsTips}
                  title={showControlsTips ? 'Hide Controls Tips' : 'Show Controls Tips'}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      showControlsTips ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 3. Sound Effects Setting */}
              <div className="p-3.5 rounded-2xl bg-slate-850/90 border border-slate-750 flex items-center justify-between gap-4 shadow-sm hover:border-slate-700 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-rose-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-amber-400" />
                    )}
                    <span className="text-sm font-bold text-white">Sound Effects</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Play 8-bit synthesizer chimes for answers, phone notifications, footsteps and victories.
                  </p>
                </div>

                <button
                  onClick={() => {
                    soundEffects.playSelect();
                    onToggleMute();
                  }}
                  className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    !isMuted ? 'bg-amber-500' : 'bg-slate-700'
                  }`}
                  role="switch"
                  aria-checked={!isMuted}
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      !isMuted ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 4. Temperature Unit Setting */}
              <div className="p-3.5 rounded-2xl bg-slate-850/90 border border-slate-750 flex items-center justify-between gap-4 shadow-sm hover:border-slate-700 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white">Temperature Unit</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                      {tempUnit === 'F' ? 'Fahrenheit' : 'Celsius'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Choose unit across map weather widget and phone weather app.
                  </p>
                </div>

                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-750 shrink-0">
                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      onToggleTempUnit?.('C');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                      tempUnit === 'C'
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    °C
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      onToggleTempUnit?.('F');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                      tempUnit === 'F'
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    °F
                  </button>
                </div>
              </div>

              {/* 5. Save Game & Cloud Slots */}
              {onOpenSaveSystem && (
                <div className="p-3.5 rounded-2xl bg-slate-850/90 border border-slate-750 flex items-center justify-between gap-3 shadow-sm hover:border-slate-700 transition">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Save className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-bold text-white">Save Adventure</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 font-mono border border-blue-500/30">
                        3 Slots
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Manage progress save slots, export backup files, or load saved games.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      onClose();
                      onOpenSaveSystem();
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition cursor-pointer shrink-0 active:scale-95"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              )}

              {/* 6. Version History & Update Logs */}
              <div className="p-3.5 rounded-2xl bg-slate-850/90 border border-slate-750 flex items-center justify-between gap-3 shadow-sm hover:border-slate-700 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white">Release Notes & Updates</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                      v{APP_VERSION}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    View new features: 25 new metropolises, 9 Taiwan cities, moving monsters, and harder hints!
                  </p>
                </div>

                <button
                  onClick={() => {
                    soundEffects.playSelect();
                    onOpenUpdateLogs?.();
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition cursor-pointer shrink-0 active:scale-95"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Changelog</span>
                </button>
              </div>

              {/* 7. Reset Adventure */}
              {onResetClick && (
                <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-900/40 flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-rose-400" />
                      <span className="text-sm font-bold text-rose-200">Reset Adventure</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 font-mono border border-rose-500/30">
                        Restart
                      </span>
                    </div>
                    <p className="text-xs text-rose-300/70 leading-relaxed">
                      Clear current game progress and redo character setup and initial city.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      onClose();
                      onResetClick();
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600 border border-rose-500/50 hover:border-rose-400 text-rose-200 hover:text-white text-xs font-bold shadow transition cursor-pointer shrink-0 active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              )}
            </>
          )}

          {/* TAB 2: DAILY MISSIONS */}
          {activeTab === 'missions' && (
            <div className="space-y-3">
              {/* Reset Countdown Bar */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-slate-800 border border-amber-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-300">Daily Reset In:</span>
                  <span className="font-mono font-bold text-amber-300">
                    {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-[10px] border border-amber-400/30">
                  <Flame className="w-3 h-3 text-orange-400" />
                  <span>Streak Active</span>
                </div>
              </div>

              {/* Mission Cards */}
              {missionsState.missions.map(mission => {
                const progressPct = Math.min(100, Math.round((mission.currentCount / mission.targetCount) * 100));
                const isClaimable = mission.completed && !mission.claimed;
                const isClaimed = mission.claimed;

                return (
                  <div
                    key={mission.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isClaimed
                        ? 'bg-slate-850/60 border-slate-755 opacity-80'
                        : isClaimable
                        ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-slate-850 border-amber-400/60 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-850 border-slate-750'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg shadow-inner">
                          {mission.icon || '🎯'}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                            <span>{mission.title}</span>
                            {isClaimed && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            )}
                          </h4>
                          <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                            {mission.description}
                          </p>
                        </div>
                      </div>

                      {/* Reward Pill */}
                      <div className="flex flex-col items-end shrink-0">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-400/30">
                          <Zap className="w-3 h-3 text-amber-400" />
                          <span>+{mission.xpReward} XP</span>
                          <span>+{mission.coinReward} 🪙</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar & Claim Button */}
                    <div className="space-y-2 mt-3 pt-2 border-t border-slate-800">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Progress</span>
                        <span className="font-mono font-bold text-white">
                          {mission.currentCount} / {mission.targetCount} ({progressPct}%)
                        </span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700/80">
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${
                            mission.completed
                              ? 'bg-gradient-to-r from-emerald-400 to-green-500'
                              : 'bg-gradient-to-r from-sky-400 to-blue-500'
                          }`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>

                      {/* Action Button */}
                      <div className="flex justify-end pt-1">
                        {isClaimed ? (
                          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <Check className="w-3.5 h-3.5" />
                            <span>Claimed</span>
                          </div>
                        ) : isClaimable ? (
                          <button
                            onClick={() => handleClaimMission(mission)}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 transition active:scale-95 cursor-pointer animate-pulse"
                          >
                            <Gift className="w-3.5 h-3.5" />
                            <span>Claim Reward!</span>
                          </button>
                        ) : (
                          <div className="text-[10px] font-bold text-slate-400 px-2.5 py-1 rounded-lg bg-slate-800/60">
                            In Progress ({mission.targetCount - mission.currentCount} left)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              soundEffects.playSelect();
              onOpenUpdateLogs?.();
            }}
            className="flex items-center gap-2 cursor-pointer group"
            title="Click to view full Update Logs"
          >
            <span className="text-xs font-bold text-slate-400 group-hover:text-white transition">Lexiroam</span>
            <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-mono text-[11px] font-bold border border-sky-500/30 group-hover:border-sky-400 transition">
              v{APP_VERSION}
            </span>
          </button>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow transition cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
