import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { getXpProgress, getLevelTitle, getXpForLevel, MAX_LEVEL } from '../utils/levelUtils';
import { soundEffects } from '../utils/audio';
import { 
  X, 
  Sparkles, 
  Award, 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Compass, 
  Flame, 
  Target, 
  Crown, 
  ShieldCheck, 
  BookOpen, 
  Calendar,
  CheckCircle2,
  Lock,
  ChevronRight,
  PieChart
} from 'lucide-react';

interface TrainerMasteryModalProps {
  student: StudentProfile;
  onClose: () => void;
  onOpenDailyMissions?: () => void;
}

type TabKey = 'mastery' | 'curve' | 'activity' | 'roadmap';

export const TrainerMasteryModal: React.FC<TrainerMasteryModalProps> = ({
  student,
  onClose,
  onOpenDailyMissions
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('mastery');
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);

  const xp = student.xp || 0;
  const level = student.level || 1;
  const progress = getXpProgress(xp);
  const title = getLevelTitle(level);
  const dailyStreak = student.dailyStreak || 1;
  const streakBonusPercent = Math.min(50, dailyStreak * 5); // 5% per streak day up to 50%

  // Simulated / dynamic skill category data based on student progress
  const defeatedCount = student.defeatedMonsterIds?.length || 0;
  const baseSolved = Math.max(defeatedCount * 4, 12);
  const grammarScore = Math.min(98, 65 + Math.min(30, Math.floor(level * 0.4)));
  const vocabScore = Math.min(96, 60 + Math.min(32, Math.floor(level * 0.38)));
  const spellingScore = Math.min(99, 70 + Math.min(28, Math.floor(level * 0.42)));
  const readingScore = Math.min(95, 62 + Math.min(30, Math.floor(level * 0.35)));
  const extremeScore = Math.min(92, 45 + Math.min(45, Math.floor(level * 0.5)));

  const categories = [
    {
      id: 'grammar',
      name: 'Grammar & Syntax',
      score: grammarScore,
      questionsSolved: Math.floor(baseSolved * 0.32),
      icon: '🏛️',
      color: '#38BDF8',
      bgGlow: 'from-sky-500/20 to-blue-600/10',
      description: 'Mastery of irregular verbs, inversion, conditional moods, and tense harmony.'
    },
    {
      id: 'vocabulary',
      name: 'Lexicon & Idioms',
      score: vocabScore,
      questionsSolved: Math.floor(baseSolved * 0.28),
      icon: '📚',
      color: '#A855F7',
      bgGlow: 'from-purple-500/20 to-indigo-600/10',
      description: 'Sophisticated semantic distinctions, phrasal verbs, nuances, and collocations.'
    },
    {
      id: 'spelling',
      name: 'Spelling & Orthography',
      score: spellingScore,
      questionsSolved: Math.floor(baseSolved * 0.22),
      icon: '✍️',
      color: '#10B981',
      bgGlow: 'from-emerald-500/20 to-teal-600/10',
      description: 'Accurate etymological root spelling, silent letters, and consonant doubling.'
    },
    {
      id: 'reading',
      name: 'Context & Comprehension',
      score: readingScore,
      questionsSolved: Math.floor(baseSolved * 0.12),
      icon: '🗺️',
      color: '#F59E0B',
      bgGlow: 'from-amber-500/20 to-orange-600/10',
      description: 'Transit signs, cultural readings, escalator notices, and authentic dialogue.'
    },
    {
      id: 'extreme',
      name: 'C2 / GRE Super Challenges',
      score: extremeScore,
      questionsSolved: Math.floor(baseSolved * 0.06),
      icon: '⚡',
      color: '#EC4899',
      bgGlow: 'from-pink-500/20 to-rose-600/10',
      description: 'Archaic idioms, cleft clauses, subjunctive demands, and advanced rhetoric.'
    }
  ];

  // Milestone check points for Level 1 to 1000
  const milestones = [
    { lvl: 5, title: 'City Pioneer', reward: 'Bicycle & Map Sprint', xpReq: getXpForLevel(5), icon: '🚲' },
    { lvl: 15, title: 'Word Detective', reward: 'Electric Scooter & Clue Boost', xpReq: getXpForLevel(15), icon: '🛴' },
    { lvl: 30, title: 'Speed Scholar', reward: 'Roadster Car & Street Cruiser', xpReq: getXpForLevel(30), icon: '🚗' },
    { lvl: 50, title: 'Linguistic Adventurer', reward: 'Bullet Train Pass & Explorer Cloak', xpReq: getXpForLevel(50), icon: '🚄' },
    { lvl: 100, title: 'Master Word Explorer', reward: 'Supersonic Jet & Scholar Aura', xpReq: getXpForLevel(100), icon: '✈️' },
    { lvl: 250, title: 'High Syntax Champion', reward: 'Anti-Gravity Hovercraft & Title', xpReq: getXpForLevel(250), icon: '🛸' },
    { lvl: 500, title: 'Grandmaster Polyglot', reward: 'Mythic Neon Dragon & Golden Halo', xpReq: getXpForLevel(500), icon: '🐉' },
    { lvl: 1000, title: 'Ascended Lexicon Sovereign', reward: 'Crown of Omniscience & Lv. 1000 Badge', xpReq: getXpForLevel(1000), icon: '👑' },
  ];

  // Weekly study activity data points (Mon to Sun)
  const daysOfWeek = [
    { day: 'Mon', xpEarned: 350, questions: 12, completedGoal: true },
    { day: 'Tue', xpEarned: 520, questions: 16, completedGoal: true },
    { day: 'Wed', xpEarned: 280, questions: 9, completedGoal: false },
    { day: 'Thu', xpEarned: 640, questions: 20, completedGoal: true },
    { day: 'Fri', xpEarned: 450, questions: 14, completedGoal: true },
    { day: 'Sat', xpEarned: 780, questions: 25, completedGoal: true },
    { day: 'Sun', xpEarned: 410, questions: 13, completedGoal: true },
  ];
  const maxDayXp = 800;

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-[32px] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-white ring-1 ring-sky-500/20">
        
        {/* HEADER BAR */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border-2 border-white/40 shadow-lg shrink-0"
              style={{ backgroundColor: student.appearance?.outfitColor || '#2563EB' }}
            >
              {student.appearance?.avatar || '🧒'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white font-['Fredoka',sans-serif]">
                  Trainer Mastery & Progress
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Lv.{level}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {student.name} • <span className="text-amber-300 font-bold">{title}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="p-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            title="Close Mastery Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* 1. THE REAL REAL REAL MULTI-TIER XP PROGRESS BAR */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-850 via-slate-900 to-slate-950 border border-sky-500/30 shadow-xl relative overflow-hidden">
            {/* Top Stat Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                  Current Level Trajectory (1 → 1000)
                </span>
                <div className="text-2xl font-black text-white font-mono flex items-center gap-2">
                  <span>Level {level}</span>
                  {level < MAX_LEVEL && (
                    <span className="text-xs text-slate-400 font-normal">
                      → Level {level + 1}
                    </span>
                  )}
                </div>
              </div>

              {/* Multiplier / Streak Badge */}
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>{dailyStreak}-Day Streak (+{streakBonusPercent}% XP)</span>
                </div>
                <div className="px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono">
                  {progress.percent}%
                </div>
              </div>
            </div>

            {/* THE PROGRESS BAR TRACK */}
            <div className="relative w-full h-5 rounded-full bg-slate-950 border border-slate-700/80 overflow-hidden shadow-inner p-0.5">
              {/* Animated Glowing Fill */}
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 shadow-lg shadow-sky-500/30 transition-all duration-700 ease-out relative"
                style={{ width: `${Math.max(2, progress.percent)}%` }}
              >
                {/* Gloss highlight */}
                <div className="absolute inset-0 bg-white/20 rounded-full h-1/2" />
              </div>

              {/* Milestone tick marks at 25%, 50%, 75% */}
              <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-white/20 pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-2/4 w-0.5 bg-white/20 pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-3/4 w-0.5 bg-white/20 pointer-events-none" />
            </div>

            {/* Exact XP Digits & Next Tier Details */}
            <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-1">
                <span className="text-slate-400">Current Level XP:</span>
                <strong className="text-white font-mono">
                  {progress.currentProgressXp.toLocaleString()}
                </strong>
                <span className="text-slate-400">/</span>
                <strong className="text-sky-300 font-mono">
                  {progress.neededXp.toLocaleString()} XP
                </strong>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Total Lifetime:</span>
                  <strong className="text-amber-300 font-mono">{xp.toLocaleString()} XP</strong>
                </div>
                {level < MAX_LEVEL && (
                  <div className="flex items-center gap-1 text-emerald-400 font-bold">
                    <span>+{progress.xpRemaining.toLocaleString()} XP to Level Up</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* TAB BUTTONS */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-850 rounded-2xl border border-slate-700/80 overflow-x-auto">
            <button
              onClick={() => {
                soundEffects.playSelect();
                setActiveTab('mastery');
              }}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'mastery'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Category Mastery</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playSelect();
                setActiveTab('curve');
              }}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'curve'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Level 1000 Trajectory</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playSelect();
                setActiveTab('activity');
              }}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'activity'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Weekly Activity</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playSelect();
                setActiveTab('roadmap');
              }}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'roadmap'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Milestone Rewards</span>
            </button>
          </div>

          {/* TAB 1: CATEGORY MASTERY & SKILL BREAKDOWN */}
          {activeTab === 'mastery' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Linguistic Proficiency Across 5 Curriculum Pillars:
                </span>
                <span className="text-xs text-sky-400 font-bold font-mono">
                  Overall Accuracy: ~{Math.round((grammarScore + vocabScore + spellingScore + readingScore) / 4)}%
                </span>
              </div>

              {/* Chart Visual Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map(cat => (
                  <div
                    key={cat.id}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${cat.bgGlow} border border-slate-700/80 space-y-2`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{cat.icon}</span>
                        <div>
                          <div className="font-bold text-xs text-white">{cat.name}</div>
                          <div className="text-[10px] text-slate-400">
                            {cat.questionsSolved} questions mastered
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-black font-mono" style={{ color: cat.color }}>
                        {cat.score}%
                      </span>
                    </div>

                    {/* Progress Bar inside Card */}
                    <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-700/50 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${cat.score}%`, backgroundColor: cat.color }}
                      />
                    </div>

                    <p className="text-[10px] text-slate-300 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                ))}

                {/* Overall Summary Card */}
                <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700/80 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Pedagogical Recommendation</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      Focus on <strong>C2 / GRE Super Challenges</strong> and <strong>Grammar Inversions</strong> during monster battles in world metropolises to earn up to 5,000 XP per encounter!
                    </p>
                  </div>

                  {onOpenDailyMissions && (
                    <button
                      onClick={() => {
                        soundEffects.playSelect();
                        onClose();
                        onOpenDailyMissions();
                      }}
                      className="w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Target className="w-3.5 h-3.5" />
                      <span>Open Daily Missions for +XP</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEVEL 1000 TRAJECTORY CURVE CHART */}
          {activeTab === 'curve' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Mathematical Progression Trajectory
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Exponential power curve: XP = 35 × (Level - 1)^1.55
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Target: 1,564,500 XP (Lv.1000)
                </span>
              </div>

              {/* Interactive SVG Chart */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 relative">
                <svg viewBox="0 0 500 200" className="w-full h-44 overflow-visible">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="480" y2="20" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="40" y1="60" x2="480" y2="60" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="40" y1="100" x2="480" y2="100" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="40" y1="140" x2="480" y2="140" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="40" y1="170" x2="480" y2="170" stroke="#475569" strokeWidth="1.5" />

                  {/* Y Axis Labels */}
                  <text x="35" y="24" fill="#94A3B8" fontSize="8" textAnchor="end">1.5M</text>
                  <text x="35" y="64" fill="#94A3B8" fontSize="8" textAnchor="end">1.0M</text>
                  <text x="35" y="104" fill="#94A3B8" fontSize="8" textAnchor="end">500k</text>
                  <text x="35" y="144" fill="#94A3B8" fontSize="8" textAnchor="end">100k</text>
                  <text x="35" y="174" fill="#94A3B8" fontSize="8" textAnchor="end">0</text>

                  {/* Area fill under curve */}
                  <path
                    d="M 40 170 Q 250 165, 360 130 T 480 20 L 480 170 Z"
                    fill="url(#xpGradient)"
                    opacity="0.25"
                  />

                  {/* The Mathematical Trajectory Curve */}
                  <path
                    d="M 40 170 Q 250 165, 360 130 T 480 20"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                  </defs>

                  {/* Checkpoint Nodes along the curve */}
                  {[
                    { lvl: 1, cx: 40, cy: 170, label: 'Lv.1' },
                    { lvl: 50, cx: 120, cy: 167, label: 'Lv.50' },
                    { lvl: 100, cx: 200, cy: 162, label: 'Lv.100' },
                    { lvl: 250, cx: 280, cy: 150, label: 'Lv.250' },
                    { lvl: 500, cx: 370, cy: 120, label: 'Lv.500' },
                    { lvl: 1000, cx: 480, cy: 20, label: 'Lv.1000' }
                  ].map((pt, i) => (
                    <g key={i}>
                      <circle
                        cx={pt.cx}
                        cy={pt.cy}
                        r={level >= pt.lvl ? 5 : 3.5}
                        fill={level >= pt.lvl ? '#10B981' : '#64748B'}
                        stroke="#0F172A"
                        strokeWidth="2"
                      />
                      <text
                        x={pt.cx}
                        y={pt.cy + (i % 2 === 0 ? 14 : -8)}
                        fill="#CBD5E1"
                        fontSize="8"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        {pt.label}
                      </text>
                    </g>
                  ))}

                  {/* Current Trainer Position Marker */}
                  {(() => {
                    // Position mapping
                    const progressRatio = Math.min(1, Math.max(0, level / 1000));
                    const currentX = 40 + progressRatio * 440;
                    // Approximate curve Y
                    const currentY = 170 - Math.pow(progressRatio, 1.55) * 150;
                    return (
                      <g>
                        <circle cx={currentX} cy={currentY} r="7" fill="#F59E0B" className="animate-ping" opacity="0.6" />
                        <circle cx={currentX} cy={currentY} r="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                        <text x={currentX} y={currentY - 10} fill="#FDE047" fontSize="9" fontWeight="900" textAnchor="middle">
                          YOU (Lv.{level})
                        </text>
                      </g>
                    );
                  })()}
                </svg>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 border-t border-slate-800 pt-2">
                  <span>Start (Lv. 1)</span>
                  <span className="text-amber-300 font-bold">You are at Level {level} ({xp.toLocaleString()} XP)</span>
                  <span>Apex Sovereign (Lv. 1000)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WEEKLY STUDY ACTIVITY CHART */}
          {activeTab === 'activity' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    7-Day Study & Battle Activity
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Daily engagement metrics and questions completed
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-300">Daily Goal: 500 XP</span>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-end justify-between gap-2 h-40 pt-4 px-2">
                  {daysOfWeek.map((day, idx) => {
                    const heightPercent = Math.min(100, Math.round((day.xpEarned / maxDayXp) * 100));
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <span className="text-[9px] text-sky-300 font-mono font-bold opacity-0 group-hover:opacity-100 transition">
                          +{day.xpEarned}
                        </span>

                        <div className="w-full max-w-[34px] rounded-t-xl bg-slate-800 overflow-hidden relative h-full flex items-end">
                          <div
                            className={`w-full rounded-t-xl transition-all duration-500 ${
                              day.completedGoal
                                ? 'bg-gradient-to-t from-emerald-600 to-teal-400'
                                : 'bg-gradient-to-t from-sky-600 to-blue-400'
                            }`}
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>

                        <span className="text-[10px] font-bold text-slate-300">
                          {day.day}
                        </span>
                        <span className="text-[9px] text-slate-400 -mt-1 font-mono">
                          {day.questions}q
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-md bg-emerald-500 inline-block" />
                    <span>Goal Completed (500+ XP)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-md bg-sky-500 inline-block" />
                    <span>Active Session</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LEVEL 1000 MILESTONE ROADMAP */}
          {activeTab === 'roadmap' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Ascension Roadmap & Milestone Unlocks (Levels 1 → 1000):
              </span>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {milestones.map((m) => {
                  const isUnlocked = level >= m.lvl;
                  return (
                    <div
                      key={m.lvl}
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        isUnlocked
                          ? 'bg-emerald-500/10 border-emerald-500/40'
                          : 'bg-slate-850 border-slate-800 opacity-75'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                          isUnlocked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {m.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-white font-mono">
                              Level {m.lvl}
                            </span>
                            <span className="text-[10px] text-slate-300 font-bold">
                              • {m.title}
                            </span>
                            {isUnlocked && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                                UNLOCKED
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Reward: <strong className="text-white">{m.reward}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-mono font-bold text-sky-400">
                          {m.xpReq.toLocaleString()} XP
                        </div>
                        {!isUnlocked && (
                          <div className="text-[9px] text-amber-300 font-mono">
                            {(m.xpReq - xp > 0) ? `+${(m.xpReq - xp).toLocaleString()} left` : 'Almost there'}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. TRAINER LIFETIME STATS MATRIX */}
          <div className="p-4 rounded-3xl bg-slate-850/80 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              Trainer Career Lifetime Statistics:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">Monsters Defeated</span>
                <div className="text-base font-black text-white font-mono mt-0.5">
                  {student.defeatedMonsterIds?.length || 0}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">Cities Explored</span>
                <div className="text-base font-black text-white font-mono mt-0.5">
                  {student.visitedCities?.length || 1} / 150
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">Coins Banked</span>
                <div className="text-base font-black text-amber-300 font-mono mt-0.5">
                  🪙 {student.coins}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">Active Streak</span>
                <div className="text-base font-black text-emerald-400 font-mono mt-0.5">
                  🔥 {dailyStreak} Days
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ACTION BUTTON */}
        <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400">
            💡 Defeat roaming monsters and solve higher tier C2 questions to reach Level 1000!
          </div>
          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md transition cursor-pointer"
          >
            Back to Map
          </button>
        </div>

      </div>
    </div>
  );
};
