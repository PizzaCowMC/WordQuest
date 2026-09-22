import React from 'react';
import { CityData, Monster } from '../types';
import { soundEffects } from '../utils/audio';
import { BookOpen, Sparkles, X, CheckCircle, ArrowRight, Play, Swords } from 'lucide-react';

interface CityLessonModalProps {
  city: CityData;
  cityIndex: number;
  totalCities: number;
  defeatedMonsterIds?: string[];
  onStartLessonBattle?: (monster: Monster) => void;
  onClose: () => void;
}

export const CityLessonModal: React.FC<CityLessonModalProps> = ({
  city,
  cityIndex,
  totalCities,
  defeatedMonsterIds = [],
  onStartLessonBattle,
  onClose
}) => {
  // Find first undefeated monster, or fallback to first monster
  const undefeatedMonster = city.monsters.find(m => !defeatedMonsterIds.includes(m.id)) || city.monsters[0];

  const handleStartPractice = (monster: Monster) => {
    soundEffects.playSelect();
    onClose();
    if (onStartLessonBattle) {
      onStartLessonBattle(monster);
    }
  };

  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl p-5 sm:p-6 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 border border-amber-300 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-amber-400">
                City {cityIndex + 1} of {totalCities} • English Lesson
              </span>
              <h3 className="text-base sm:text-lg font-black text-white font-['Fredoka',sans-serif]">
                {city.lessonTitle}
              </h3>
            </div>
          </div>

          <button
            id="close-city-lesson-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            title="Close Lesson"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grammar Rule Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-amber-500/10 border border-amber-500/40 space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs font-black text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Master English Rule:</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
            {city.lessonGrammarRule}
          </p>
        </div>

        {/* Road Monsters / Topics in this City */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              City Practice Modules & Encounters:
            </span>
            <span className="text-[10px] font-semibold text-slate-400">
              Click any module to enter quiz
            </span>
          </div>
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {city.monsters.map((m) => {
              const isDefeated = defeatedMonsterIds.includes(m.id);
              return (
                <div 
                  key={m.id}
                  className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700 hover:border-amber-400/70 transition flex items-center justify-between text-xs gap-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-2xl shrink-0">{m.avatarIcon}</span>
                    <div className="min-w-0">
                      <div className="font-bold text-white flex items-center gap-1.5 flex-wrap">
                        <span className="truncate">{m.name}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-semibold bg-slate-700 text-slate-300 shrink-0">
                          {m.type}
                        </span>
                        {isDefeated && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-0.5 shrink-0">
                            <CheckCircle className="w-2.5 h-2.5" /> Defeated
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-amber-300 font-medium truncate mt-0.5">
                        Topic: {m.lessonTopic || 'English Core'} • 📍 {m.streetName}
                      </div>
                    </div>
                  </div>

                  {/* Direct Action: Click to enter this specific lesson question encounter */}
                  <button
                    id={`enter-lesson-module-${m.id}`}
                    onClick={() => handleStartPractice(m)}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow flex items-center gap-1 shrink-0 transition active:scale-95 cursor-pointer"
                    title={`Enter practice quiz for ${m.name}`}
                  >
                    <Swords className="w-3.5 h-3.5" />
                    <span>Practice</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          {undefeatedMonster && (
            <button
              id="enter-lesson-primary-action-btn"
              onClick={() => handleStartPractice(undefeatedMonster)}
              className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Enter Lesson Practice Now ({undefeatedMonster.name})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer"
          >
            Back to Map
          </button>
        </div>
      </div>
    </div>
  );
};
