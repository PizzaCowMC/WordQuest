import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Monster, StudentProfile } from '../types';
import { soundEffects } from '../utils/audio';
import { speakEnglishText } from '../utils/tts';
import { 
  Volume2, 
  HelpCircle, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  XCircle,
  X,
  Heart,
  RotateCcw,
  BookOpen,
  Crown,
  ShieldCheck,
  Flame,
  Droplets,
  Wind
} from 'lucide-react';

interface BattleModalProps {
  monster: Monster;
  student: StudentProfile;
  onVictory: (monsterId: string, earnedXp: number) => void;
  onClose: () => void;
}

export const BattleModal: React.FC<BattleModalProps> = ({
  monster,
  student,
  onVictory,
  onClose
}) => {
  const totalQuestions = monster.questions.length;
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [monsterHp, setMonsterHp] = useState(totalQuestions);
  const [trainerHp, setTrainerHp] = useState(100);
  const [showHint, setShowHint] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // 3 Time Check (3 Lives / Attempts per question)
  const [chancesLeft, setChancesLeft] = useState<number>(3);
  const [showCheckReview, setShowCheckReview] = useState<boolean>(false);

  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'wrong' | null;
    message: string;
    explanation?: string;
  }>({ type: null, message: '' });
  const [monsterShake, setMonsterShake] = useState(false);
  const [trainerShake, setTrainerShake] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturePhase, setCapturePhase] = useState<number>(0);
  const [isWon, setIsWon] = useState(false);

  const question = monster.questions[currentQIndex];

  // Play encounter sound upon opening
  useEffect(() => {
    soundEffects.playEncounter();
  }, []);

  const handleSpeakQuestion = () => {
    if (!question) return;
    setIsSpeaking(true);
    speakEnglishText(question.questionText, () => setIsSpeaking(false));
  };

  const handleSelectOption = (index: number) => {
    if (isCapturing || isWon || !question || showCheckReview) return;

    if (index === question.correctIndex) {
      // CORRECT ANSWER!
      soundEffects.playAttackImpact();
      soundEffects.playCorrectHit();
      setMonsterShake(true);
      setTimeout(() => setMonsterShake(false), 500);

      const nextHp = Math.max(0, monsterHp - 1);
      setMonsterHp(nextHp);

      setFeedback({
        type: 'correct',
        message: `Super effective hit with ${question.moveName}!`,
        explanation: question.explanation
      });

      if (nextHp <= 0 || currentQIndex + 1 >= totalQuestions) {
        // Monster is defeated! Trigger Capture Orb sequence
        setTimeout(() => {
          triggerCaptureSequence();
        }, 1200);
      } else {
        // Move to next question after brief pause & restore 3 chances
        setTimeout(() => {
          setCurrentQIndex(prev => prev + 1);
          setChancesLeft(3);
          setShowHint(false);
          setFeedback({ type: null, message: '' });
        }, 1800);
      }
    } else {
      // WRONG ANSWER - Decrement 1 Chance (from 3-Check system)
      const nextChances = chancesLeft - 1;
      setChancesLeft(nextChances);

      soundEffects.playWrong();
      setTrainerShake(true);
      setTimeout(() => setTrainerShake(false), 500);
      setTrainerHp(prev => Math.max(20, prev - 15));

      if (nextChances <= 0) {
        // All 3 checks used up! Trigger friendly study review
        setShowCheckReview(true);
        setFeedback({
          type: 'wrong',
          message: `3 Checks Used! Let's pause and master this rule.`,
          explanation: question.explanation
        });
      } else {
        setFeedback({
          type: 'wrong',
          message: `Check failed! ${nextChances} chance${nextChances > 1 ? 's' : ''} left!`,
          explanation: `Tip: Look at the teacher clue and try another option!`
        });
        setShowHint(true);
      }
    }
  };

  const handleRestoreChances = () => {
    soundEffects.playSelect();
    setChancesLeft(3);
    setShowCheckReview(false);
    setFeedback({
      type: null,
      message: ''
    });
  };

  // Capture Orb Animation (1... 2... 3... Caught!)
  const triggerCaptureSequence = () => {
    setIsCapturing(true);
    setCapturePhase(1);
    soundEffects.playCaptureOrbShake();

    setTimeout(() => {
      setCapturePhase(2);
      soundEffects.playCaptureOrbShake();
    }, 900);

    setTimeout(() => {
      setCapturePhase(3);
      soundEffects.playCaptureOrbShake();
    }, 1800);

    setTimeout(() => {
      setCapturePhase(4);
      soundEffects.playCaptured();
      setIsWon(true);

      // Launch celebration confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if not supported
      }

      setTimeout(() => {
        onVictory(monster.id, 100);
      }, 2500);
    }, 2600);
  };

  // Calculate HP bar percentages
  const monsterHpPercent = (monsterHp / totalQuestions) * 100;
  const monsterHpColor = monsterHpPercent > 50 ? 'bg-emerald-500' : monsterHpPercent > 20 ? 'bg-amber-500' : 'bg-red-500';

  const monsterRarity = monster.rarity || 'Epic';
  const rarityColors: Record<string, string> = {
    Common: 'from-slate-400 to-slate-500 text-slate-200 border-slate-400/40',
    Rare: 'from-sky-400 to-blue-500 text-sky-200 border-sky-400/40',
    Epic: 'from-purple-500 to-pink-500 text-purple-200 border-purple-400/40',
    Legendary: 'from-amber-400 via-yellow-400 to-orange-500 text-amber-100 border-amber-400/60 animate-pulse'
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Road Battle on {monster.streetName}
            </span>
          </div>

          {/* 3-Time Check Counter in Header */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs">
            <span className="text-[11px] font-bold text-slate-400 mr-1 hidden sm:inline">3-Check Guard:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((num) => (
                <Heart
                  key={num}
                  className={`w-3.5 h-3.5 transition-all ${
                    num <= chancesLeft 
                      ? 'text-red-500 fill-red-500 scale-110 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]' 
                      : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Escape Battle"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BATTLE STAGE CANVAS */}
        <div className="relative h-56 sm:h-64 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/40 p-4 flex flex-col justify-between overflow-hidden">
          
          {/* Glowing Elemental Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none"></div>

          {/* 1. ENEMY MONSTER (TOP RIGHT) - Highly Polished Visual Presentation */}
          <div className="flex justify-end items-start z-10">
            {/* Monster Status Box */}
            <div className="bg-slate-900/95 border border-slate-700/90 rounded-2xl p-2.5 sm:p-3 shadow-2xl w-52 sm:w-60 mr-3 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs sm:text-sm text-white flex items-center gap-1 font-['Fredoka',sans-serif]">
                  {monster.name}
                  {monsterRarity === 'Legendary' && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                </span>
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r border ${rarityColors[monsterRarity]}`}>
                  {monsterRarity}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5 mb-1.5">
                <span>Element: <strong className="text-amber-300">{monster.type}</strong></span>
                <span>Lv.{monster.level}</span>
              </div>

              {/* HP Bar */}
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700">
                <div 
                  className={`h-full rounded-full transition-all duration-500 shadow-sm ${monsterHpColor}`}
                  style={{ width: `${monsterHpPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                <span className="text-[9px] text-slate-500 truncate max-w-[120px]">{monster.lessonTopic || 'English Core'}</span>
                <span className="font-mono font-bold text-slate-300">HP {monsterHp}/{totalQuestions}</span>
              </div>
            </div>

            {/* Monster Sprite with Glowing Elemental Aura */}
            <div className={`relative ${monsterShake ? 'animate-ping' : ''}`}>
              {isCapturing ? (
                /* Capture Orb animation */
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center animate-bounce">
                  <div className={`text-5xl sm:text-6xl transition-transform ${capturePhase === 1 ? '-rotate-12' : capturePhase === 2 ? 'rotate-12' : capturePhase === 3 ? '-rotate-6' : 'scale-110'}`}>
                    🔮
                  </div>
                  <span className="text-[10px] font-bold text-amber-300 mt-1 drop-shadow">
                    {capturePhase < 4 ? `Orb Shake ${capturePhase}...` : 'GOTCHA! 🎉'}
                  </span>
                </div>
              ) : (
                <div className="relative group">
                  {/* Outer Pulsing Elemental Energy Ring */}
                  <div 
                    className="absolute -inset-2.5 rounded-3xl opacity-75 blur-md animate-pulse transition duration-1000"
                    style={{ backgroundColor: monster.auraColor || monster.spriteColor }}
                  />
                  {/* Outer Shield Frame */}
                  <div 
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-white/90 shadow-2xl flex flex-col items-center justify-center animate-bounce duration-1000"
                    style={{ backgroundColor: monster.spriteColor }}
                  >
                    <span className="text-4xl sm:text-5xl filter drop-shadow select-none">
                      {monster.avatarIcon}
                    </span>
                    <span className="absolute -bottom-2 px-1.5 py-0.5 rounded-full text-[9px] font-black bg-slate-950 text-amber-300 border border-amber-400/50 shadow">
                      {monster.type}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. TRAINER & COMPANION (BOTTOM LEFT) */}
          <div className="flex justify-start items-end z-10">
            {/* Trainer Avatar & Companion Sprite */}
            <div className={`relative flex items-center -space-x-4 ${trainerShake ? 'animate-ping' : ''}`}>
              {/* Customized Trainer Avatar */}
              <div 
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border-2 border-white shadow-xl flex items-center justify-center text-3xl sm:text-4xl z-10"
                style={{ backgroundColor: student.appearance?.outfitColor || '#2563EB' }}
                title={`${student.name} - ${student.appearance?.title || 'Trainer'}`}
              >
                {student.appearance?.avatar || '🧒'}
              </div>
              {/* Companion Creature */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 border-2 border-white shadow-lg flex items-center justify-center text-2xl sm:text-3xl z-20">
                {student.starter.avatar}
              </div>
            </div>

            {/* Trainer Status Box */}
            <div className="bg-slate-900/95 border border-slate-700/90 rounded-2xl p-2.5 sm:p-3 shadow-2xl w-52 sm:w-60 ml-3 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs sm:text-sm text-white truncate font-['Fredoka',sans-serif]">
                  {student.starter.name}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-sky-400 border border-blue-500/30">
                  Lv.{student.level}
                </span>
              </div>
              <div className="text-[10px] text-slate-300 mt-0.5 mb-1.5 flex items-center justify-between">
                <span>Trainer: <strong className="text-white">{student.name}</strong></span>
                <span className="text-amber-300 font-bold">{student.appearance?.title || 'Explorer'}</span>
              </div>
              {/* HP Bar */}
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700">
                <div 
                  className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                  style={{ width: `${trainerHp}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span className="text-[9px] text-slate-500">Gear: {student.appearance?.accessory || 'Compass'}</span>
                <span>HP: {trainerHp}/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. QUESTION & MOVE SELECTOR DIALOGUE BOX */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col gap-3.5">
          
          {/* Question Banner */}
          {question && !isCapturing && !isWon && !showCheckReview && (
            <div className="p-3.5 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-inner">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {question.category} Question ({currentQIndex + 1}/{monster.questions.length})
                  </span>

                  {/* 3-Time Check Mini Indicator */}
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-red-400" />
                    {chancesLeft} Chances Left
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleSpeakQuestion}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                      isSpeaking
                        ? 'bg-amber-400 text-slate-950 border-amber-300'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700'
                    }`}
                    title="Listen to English voice"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isSpeaking ? 'Speaking...' : 'Listen'}</span>
                  </button>
                  {question.hint && (
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="p-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-amber-300 border border-slate-700 transition cursor-pointer"
                      title="Toggle Clue"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <p className="text-sm sm:text-base font-bold text-white leading-relaxed whitespace-pre-line">
                {question.questionText}
              </p>

              {/* Hint */}
              {showHint && question.hint && (
                <div className="mt-2 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 p-2 rounded-xl flex items-center gap-1.5 animate-in fade-in">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Teacher Clue: {question.hint}</span>
                </div>
              )}
            </div>
          )}

          {/* 3-TIME CHECK REVIEW SCREEN (When all 3 chances are used) */}
          {showCheckReview && question && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-amber-500/10 border border-amber-500/40 text-white animate-in zoom-in-95">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm mb-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>3-Check Review: Study the Rule to Master It!</span>
              </div>
              <p className="text-xs text-slate-300 mb-3">
                Don't worry! Making mistakes is how we learn. Here is the grammar secret:
              </p>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-400/30 text-xs text-amber-200 font-medium leading-relaxed mb-3">
                💡 <strong>Explanation:</strong> {question.explanation}
              </div>
              <button
                onClick={handleRestoreChances}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restore 3 Checks (❤️❤️❤️) & Try Again!</span>
              </button>
            </div>
          )}

          {/* Feedback message */}
          {feedback.type && !showCheckReview && (
            <div className={`p-3 rounded-xl text-xs sm:text-sm font-semibold flex items-start gap-2 animate-in fade-in ${
              feedback.type === 'correct'
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                : 'bg-red-500/20 border border-red-500/40 text-red-300'
            }`}>
              {feedback.type === 'correct' ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 shrink-0 mt-0.5" />}
              <div>
                <div>{feedback.message}</div>
                {feedback.explanation && (
                  <div className="text-xs font-normal opacity-90 mt-0.5">{feedback.explanation}</div>
                )}
              </div>
            </div>
          )}

          {/* 4 Attack Move Buttons */}
          {question && !isCapturing && !isWon && !showCheckReview && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="group relative p-3 sm:p-3.5 rounded-2xl bg-slate-900 border border-slate-700/80 hover:border-amber-400 hover:bg-slate-800/90 active:scale-[0.98] transition-all text-left flex items-center justify-between cursor-pointer shadow-md"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center font-bold text-xs text-slate-300 transition-colors">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {option}
                    </span>
                  </div>
                  <Zap className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
                </button>
              ))}
            </div>
          )}

          {/* Capture Success Screen */}
          {isWon && (
            <div className="text-center py-4 animate-in fade-in zoom-in-95">
              <div className="text-4xl mb-2 animate-bounce">🏆</div>
              <h3 className="text-xl font-extrabold text-white font-['Fredoka',sans-serif]">
                {monster.name} Was Successfully Captured!
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                You mastered English challenges on {monster.streetName}! +100 Trainer XP!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
