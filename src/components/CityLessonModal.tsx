import React from 'react';
import { CityData } from '../types';
import { soundEffects } from '../utils/audio';
import { BookOpen, Sparkles, X, CheckCircle, MapPin } from 'lucide-react';

interface CityLessonModalProps {
  city: CityData;
  cityIndex: number;
  totalCities: number;
  onClose: () => void;
}

export const CityLessonModal: React.FC<CityLessonModalProps> = ({
  city,
  cityIndex,
  totalCities,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl p-5 sm:p-6 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400">
                City {cityIndex + 1} of {totalCities} Lesson Guide
              </span>
              <h3 className="text-base sm:text-lg font-black text-white font-['Fredoka',sans-serif]">
                {city.lessonTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grammar Rule Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-amber-500/10 border border-amber-500/40 space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs font-black text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Master English Rule:</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
            {city.lessonGrammarRule}
          </p>
        </div>

        {/* Road Monsters in this City */}
        <div className="space-y-2 mb-5">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Road Monster Encounters & Topics:
          </span>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {city.monsters.map((m, idx) => (
              <div 
                key={m.id}
                className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{m.avatarIcon}</span>
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>{m.name}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-semibold bg-slate-700 text-slate-300">
                        {m.type}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      📍 {m.streetName}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                    {m.lessonTopic || 'English Core'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold transition cursor-pointer"
        >
          Got It, Back to Roads!
        </button>
      </div>
    </div>
  );
};
