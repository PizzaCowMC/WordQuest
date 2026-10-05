import React from 'react';
import { CityBuilding, Monster, StudentProfile } from '../types';
import { soundEffects } from '../utils/audio';
import { updateMissionProgress } from '../utils/dailyMissions';
import { 
  X, 
  MapPin, 
  Building2, 
  Sparkles, 
  Swords, 
  BookOpen, 
  ShieldCheck, 
  Eye, 
  Compass, 
  CheckCircle2 
} from 'lucide-react';

interface BuildingModalProps {
  building: CityBuilding;
  cityName: string;
  cityMonsters: Monster[];
  student: StudentProfile;
  onBattleMonster: (monster: Monster) => void;
  onClose: () => void;
}

export const BuildingModal: React.FC<BuildingModalProps> = ({
  building,
  cityName,
  cityMonsters,
  student,
  onBattleMonster,
  onClose
}) => {
  // Find monsters that are lurking inside this building or nearby
  const lurkingMonsters = cityMonsters.filter(m => 
    m.streetName.toLowerCase().includes(building.name.toLowerCase()) ||
    m.id.includes(building.id) ||
    building.hiddenMonsterIds?.includes(m.id) ||
    // Proximity fallback within ~150 meters
    (Math.abs(m.position[0] - building.position[0]) < 0.0015 && Math.abs(m.position[1] - building.position[1]) < 0.0015)
  ).slice(0, 3);

  // If no specific monsters matched, assign the top city monster as lurker
  const displayMonsters = lurkingMonsters.length > 0 ? lurkingMonsters : cityMonsters.slice(0, 2);

  const handleInspect = () => {
    soundEffects.playSelect();
    updateMissionProgress('monument', 1);
  };

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-5 sm:p-7 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Glow ambient light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-sky-500/10 blur-3xl pointer-events-none rounded-full" />

        {/* Header */}
        <div className="relative flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-600 p-0.5 shadow-lg shadow-sky-500/20 flex items-center justify-center text-3xl">
              {building.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white font-['Fredoka',sans-serif]">
                  {building.name}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  {building.type}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {cityName} Heritage Monument
              </p>
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

        {/* Historical Fact Card */}
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-slate-850 to-slate-800 border border-slate-700/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Architectural & Historical Lore</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {building.historicalFact || building.description}
          </p>
          <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-700/50">
            {building.description}
          </p>
        </div>

        {/* Lurking Monsters Section */}
        <div className="my-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-purple-400" />
              <span>Creatures Hiding Inside</span>
            </div>
            <span className="text-[10px] text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30 font-semibold">
              {displayMonsters.length} Lurking Mobs
            </span>
          </div>

          <div className="space-y-2.5">
            {displayMonsters.map(monster => {
              const isDefeated = student.defeatedMonsterIds.includes(monster.id);

              return (
                <div
                  key={monster.id}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                    isDefeated
                      ? 'bg-slate-900/60 border-slate-800 opacity-80'
                      : 'bg-slate-800/90 border-slate-700 hover:border-purple-500/50 shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl border-2 border-white shadow-lg flex items-center justify-center text-xl shrink-0"
                      style={{ backgroundColor: monster.spriteColor }}
                    >
                      {monster.avatarIcon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white font-['Fredoka',sans-serif]">
                          {monster.name}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-900 text-amber-300 border border-slate-700">
                          Lv. {monster.level}
                        </span>
                        <span className="text-[9px] font-semibold text-slate-400">
                          {monster.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate max-w-xs mt-0.5">
                        {monster.description}
                      </p>
                    </div>
                  </div>

                  {isDefeated ? (
                    <span className="px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Captured
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        handleInspect();
                        onClose();
                        onBattleMonster(monster);
                      }}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-md shadow-purple-500/30 flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 transition"
                    >
                      <Swords className="w-3.5 h-3.5" />
                      Battle!
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Exploring historical monuments earns daily mission progress!</span>
          <button
            onClick={() => {
              handleInspect();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition cursor-pointer"
          >
            Done Inspecting
          </button>
        </div>
      </div>
    </div>
  );
};
