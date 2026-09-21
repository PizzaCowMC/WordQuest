import React from 'react';
import { CityData, StudentProfile } from '../types';
import { VEHICLE_OPTIONS } from '../data/transitData';
import { Award, X, CheckCircle, MapPin, Printer, Clock, Navigation, Shield, Globe2 } from 'lucide-react';

interface FieldGuideModalProps {
  student: StudentProfile;
  cities: CityData[];
  onClose: () => void;
}

export const FieldGuideModal: React.FC<FieldGuideModalProps> = ({
  student,
  cities,
  onClose
}) => {
  // Collect all monsters across cities
  const allMonsters = cities.flatMap(c => c.monsters);
  const capturedList = allMonsters.filter(m => student.defeatedMonsterIds.includes(m.id));

  const totalMinutes = student.travelMinutesSpent || 0;
  const travelHours = Math.floor(totalMinutes / 60);
  const travelMins = totalMinutes % 60;

  const currentVehicle = VEHICLE_OPTIONS.find(v => v.type === student.activeVehicle) || VEHICLE_OPTIONS[0];

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-5 sm:p-7 text-white animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-2xl border-2 border-white shadow-lg flex items-center justify-center text-3xl shrink-0"
              style={{ backgroundColor: student.appearance?.outfitColor || '#2563EB' }}
            >
              {student.appearance?.avatar || '🧒'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white font-['Fredoka',sans-serif]">
                  {student.name}'s Field Guide
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {student.appearance?.title || 'Global Explorer'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Companion: <strong className="text-amber-300">{student.starter.name}</strong> {student.starter.avatar} • Gear: {student.appearance?.accessory || 'Compass'} • Vehicle: {currentVehicle.name} ({currentVehicle.icon})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Monsters</span>
            <div className="text-lg sm:text-xl font-black text-amber-400 mt-0.5">
              {capturedList.length} / {allMonsters.length}
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Trainer Level</span>
            <div className="text-lg sm:text-xl font-black text-sky-400 mt-0.5">
              Lv. {student.level}
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Total XP</span>
            <div className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">
              {student.xp} XP
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Flight Time</span>
            </span>
            <div className="text-lg sm:text-xl font-black text-amber-300 mt-0.5">
              {travelHours}h {travelMins}m
            </div>
          </div>
        </div>

        {/* Cities Visited Progress */}
        <div className="mb-4 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-sky-400" />
              <span>World Tour Progress:</span>
            </span>
            <span className="text-amber-300 font-mono">
              {student.currentCityIndex + 1} of {cities.length} Cities
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cities.map((city, idx) => {
              const isCurrent = idx === student.currentCityIndex;
              const isPast = idx < student.currentCityIndex;
              return (
                <span
                  key={city.id}
                  className={`text-[11px] px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 border ${
                    isCurrent
                      ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-400/40'
                      : isPast
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-slate-800/80 text-slate-500 border-slate-700'
                  }`}
                >
                  <span>{idx + 1}.</span>
                  <span>{city.name}</span>
                  {isPast && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                </span>
              );
            })}
          </div>
        </div>

        {/* Monster Roster Grid */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Road Monsters Log:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
            {allMonsters.map(monster => {
              const isCaptured = student.defeatedMonsterIds.includes(monster.id);
              const rarity = monster.rarity || 'Epic';
              return (
                <div
                  key={monster.id}
                  className={`p-2.5 rounded-2xl border flex items-center gap-3 transition-all ${
                    isCaptured
                      ? 'bg-slate-800/90 border-slate-700'
                      : 'bg-slate-900/50 border-slate-800 opacity-50'
                  }`}
                >
                  <div 
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl border shrink-0 ${
                      isCaptured ? 'border-amber-400/50 shadow-md' : 'border-slate-700'
                    }`}
                    style={{ backgroundColor: isCaptured ? monster.spriteColor : '#1e293b' }}
                  >
                    {isCaptured ? monster.avatarIcon : '❓'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-white truncate">
                        {isCaptured ? monster.name : 'Unknown Monster'}
                      </span>
                      {isCaptured ? (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Captured
                        </span>
                      ) : (
                        <span className="text-[9px] text-slate-500">Undefeated</span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span>{monster.streetName}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certificate Section */}
        <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
          <div>
            <div className="font-extrabold text-xs sm:text-sm text-amber-300">
              🎓 English Monster Master Certificate
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Awarded to Trainer {student.name} ({student.appearance?.title || 'Global Explorer'}) for English grammar and vocabulary exploration.
            </p>
          </div>
          <button
            onClick={handlePrintCertificate}
            className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 shadow transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
};
