import React, { useState, useEffect } from 'react';
import { DuelSession, StudentProfile } from '../types';
import { Swords, Clock, Trophy, Award, CheckCircle2, XCircle, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/audio';

interface MultiplayerDuelModalProps {
  student: StudentProfile;
  myPlayerId: string;
  activeDuel: DuelSession | null;
  incomingDuelInvite: DuelSession | null;
  duelResult: { duel: DuelSession; winnerId: string | 'tie' } | null;
  onAcceptDuel: (duelId: string) => void;
  onDeclineDuel: (duelId: string) => void;
  onAnswerDuel: (duelId: string, answer: string) => void;
  onClose: () => void;
  onAwardReward: (coins: number, xp: number) => void;
}

export const MultiplayerDuelModal: React.FC<MultiplayerDuelModalProps> = ({
  student,
  myPlayerId,
  activeDuel,
  incomingDuelInvite,
  duelResult,
  onAcceptDuel,
  onDeclineDuel,
  onAnswerDuel,
  onClose,
  onAwardReward,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  // Reset duel selection when a new duel session arrives
  useEffect(() => {
    setSelectedOption(null);
    setRewardClaimed(false);
  }, [activeDuel?.id]);

  // Timer countdown during active duel
  useEffect(() => {
    if (!activeDuel || activeDuel.status !== 'active') return;

    setSelectedOption(null);
    setTimeLeft(20);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeDuel?.id, activeDuel?.status]);

  // Handle Confetti and reward on victory
  useEffect(() => {
    if (duelResult && !rewardClaimed) {
      if (duelResult.winnerId === myPlayerId) {
        soundEffects.playVictoryFanfare();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
        onAwardReward(50, 100);
        setRewardClaimed(true);
      } else if (duelResult.winnerId === 'tie') {
        soundEffects.playLevelUp();
        onAwardReward(25, 50);
        setRewardClaimed(true);
      } else {
        soundEffects.playWrong();
      }
    }
  }, [duelResult, myPlayerId, rewardClaimed, onAwardReward]);

  // 1. INCOMING DUEL INVITATION POPUP
  if (incomingDuelInvite && !activeDuel) {
    return (
      <div className="fixed inset-0 z-[650] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
        <div className="w-full max-w-sm bg-slate-900 border-2 border-amber-500 rounded-3xl p-6 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 mx-auto flex items-center justify-center text-3xl animate-bounce">
            ⚔️
          </div>
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider">
              Duel Challenge!
            </span>
            <h3 className="text-xl font-black text-white mt-2">
              {incomingDuelInvite.challengerName}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              has challenged you to an instant 1v1 English Knowledge Duel!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => {
                soundEffects.playSelect();
                onDeclineDuel(incomingDuelInvite.id);
              }}
              className="py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
            >
              Decline
            </button>
            <button
              onClick={() => {
                soundEffects.playEncounter();
                onAcceptDuel(incomingDuelInvite.id);
              }}
              className="py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg transition hover:scale-105 cursor-pointer"
            >
              Accept Duel!
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. DUEL RESULT MODAL
  if (duelResult) {
    const isWinner = duelResult.winnerId === myPlayerId;
    const isTie = duelResult.winnerId === 'tie';

    return (
      <div className="fixed inset-0 z-[650] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in zoom-in-95">
        <div className="w-full max-w-md bg-slate-900 border-2 border-indigo-500/50 rounded-3xl p-6 shadow-2xl text-center space-y-4">
          <div className="text-5xl animate-bounce">
            {isWinner ? '🏆' : isTie ? '🤝' : '💫'}
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">
              {isWinner ? 'Victory!' : isTie ? 'Great Draw!' : 'Match Finished!'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {isWinner
                ? `You outsmarted your opponent with the correct answer!`
                : isTie
                ? `Both trainers scored equally! Knowledge shines!`
                : `Your opponent was faster this time. Keep learning!`}
            </p>
          </div>

          {/* Answer Breakdown */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-left space-y-1.5 text-xs">
            <div className="font-bold text-slate-300">Question:</div>
            <div className="text-white font-medium">{duelResult.duel.question.prompt}</div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold mt-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Correct Answer: {duelResult.duel.question.correctAnswer}</span>
            </div>
          </div>

          {/* Reward Box */}
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center gap-4 text-xs font-bold text-amber-300">
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              <span>+{isWinner ? 50 : isTie ? 25 : 10} Coins</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span>+{isWinner ? 100 : isTie ? 50 : 25} XP</span>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-sm shadow-xl transition cursor-pointer"
          >
            Awesome! Return to Map
          </button>
        </div>
      </div>
    );
  }

  // 3. ACTIVE 1V1 QUESTION DUEL
  if (!activeDuel) return null;

  const opponentName =
    activeDuel.challengerId === myPlayerId
      ? activeDuel.opponentName
      : activeDuel.challengerName;

  const hasAnswered = selectedOption !== null;

  return (
    <div className="fixed inset-0 z-[650] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-md bg-slate-900 border-2 border-amber-500/60 rounded-3xl p-6 shadow-2xl space-y-5">
        {/* Header: Duel VS Ribbon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-base">
              ⚔️
            </span>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                1v1 English Duel
              </h3>
              <p className="text-[11px] text-slate-400">vs {opponentName}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 font-mono text-xs font-bold">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            <span>{timeLeft}s</span>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/70 to-slate-900 border border-indigo-500/30">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
            English Challenge
          </span>
          <h4 className="text-base font-black text-white mt-1 leading-snug">
            {activeDuel.question.prompt}
          </h4>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-2.5">
          {activeDuel.question.options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            return (
              <button
                key={idx}
                disabled={hasAnswered}
                onClick={() => {
                  soundEffects.playSelect();
                  setSelectedOption(opt);
                  onAnswerDuel(activeDuel.id, opt);
                }}
                className={`w-full p-3.5 rounded-2xl text-left font-bold text-xs transition flex items-center justify-between border cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 ring-2 ring-amber-400/50'
                    : hasAnswered
                    ? 'bg-slate-800/50 border-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-800/90 hover:bg-slate-800 border-slate-700 hover:border-sky-400 text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-750 text-slate-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>
                {isSelected && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-400 text-slate-950">
                    Locked In
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <div className="text-center p-3 rounded-2xl bg-slate-800/60 border border-slate-700/80 animate-pulse">
            <p className="text-xs font-bold text-sky-300">
              Answer submitted! Waiting for {opponentName}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
