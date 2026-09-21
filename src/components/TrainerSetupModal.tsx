import React, { useState } from 'react';
import { STARTERS, INITIAL_CITIES } from '../data/gameData';
import { StarterCompanion, CityData, TrainerAppearance } from '../types';
import { AVATAR_OPTIONS, OUTFIT_COLORS, ACCESSORY_OPTIONS } from '../data/transitData';
import { soundEffects } from '../utils/audio';
import { Sparkles, MapPin, Plane, ArrowRight, User, Globe2, Palette, Shield, Compass } from 'lucide-react';

interface TrainerSetupModalProps {
  currentCity: CityData;
  secondCity: CityData;
  initialName?: string;
  initialAppearance?: TrainerAppearance;
  initialStarter?: StarterCompanion;
  onComplete: (name: string, starter: StarterCompanion, appearance: TrainerAppearance) => void;
}

export const TrainerSetupModal: React.FC<TrainerSetupModalProps> = ({
  currentCity,
  secondCity,
  initialName = '',
  initialAppearance,
  initialStarter,
  onComplete
}) => {
  const [name, setName] = useState(initialName);
  const [selectedAvatar, setSelectedAvatar] = useState(
    initialAppearance 
      ? AVATAR_OPTIONS.find(a => a.avatar === initialAppearance.avatar) || AVATAR_OPTIONS[0]
      : AVATAR_OPTIONS[0]
  );
  const [selectedColor, setSelectedColor] = useState(
    initialAppearance
      ? OUTFIT_COLORS.find(c => c.hex === initialAppearance.outfitColor) || OUTFIT_COLORS[0]
      : OUTFIT_COLORS[0]
  );
  const [selectedAccessory, setSelectedAccessory] = useState(
    initialAppearance
      ? ACCESSORY_OPTIONS.find(acc => acc.name === initialAppearance.accessory) || ACCESSORY_OPTIONS[0]
      : ACCESSORY_OPTIONS[0]
  );
  const [selectedStarter, setSelectedStarter] = useState<StarterCompanion>(initialStarter || STARTERS[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please type your trainer name to begin!');
      soundEffects.playWrong();
      return;
    }

    const appearance: TrainerAppearance = {
      avatar: selectedAvatar.avatar,
      title: selectedAvatar.title,
      outfitColor: selectedColor.hex,
      accessory: selectedAccessory.name,
      genderStyle: selectedAvatar.genderStyle
    };

    soundEffects.playSelect();
    soundEffects.playCorrectHit();
    onComplete(trimmed, selectedStarter, appearance);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-5 sm:p-7 text-white my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto">
        
        {/* Header Badge */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            12-City Global Monster English Quest
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Fredoka',sans-serif]">
            Create Your English Trainer
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Choose your name, customize what you look like, and embark on a world tour!
          </p>
        </div>

        {/* Live Trainer Passport ID Preview */}
        <div 
          className="mb-5 p-3.5 rounded-2xl border flex items-center gap-4 transition-all"
          style={{ 
            backgroundColor: `${selectedColor.hex}15`,
            borderColor: `${selectedColor.hex}50` 
          }}
        >
          <div className="relative">
            <div 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-lg border-2 border-white/80 transition-transform"
              style={{ backgroundColor: selectedColor.hex }}
            >
              {selectedAvatar.avatar}
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 text-base bg-slate-900 px-1 py-0.5 rounded-md border border-slate-700" title={selectedAccessory.name}>
              {selectedAccessory.icon}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black text-white truncate font-['Fredoka',sans-serif]">
                {name.trim() || 'Trainer Traveler'}
              </span>
              <span 
                className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white shrink-0"
                style={{ backgroundColor: selectedColor.hex }}
              >
                {selectedAvatar.title}
              </span>
            </div>
            <div className="text-xs text-slate-300 mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span>Class: <strong className="text-white">{selectedAvatar.genderStyle}</strong></span>
              <span>•</span>
              <span>Gear: <strong className="text-white">{selectedAccessory.name}</strong></span>
              <span>•</span>
              <span>Partner: <strong className="text-amber-300">{selectedStarter.name} {selectedStarter.avatar}</strong></span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Name Input */}
          <div>
            <label htmlFor="trainer-name-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              1. Choose Your Name:
            </label>
            <div className="relative">
              <input
                id="trainer-name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Type your name (e.g. Ash, Maya, Leo, Emma)..."
                maxLength={20}
                className="w-full px-4 py-2.5 bg-slate-800/90 border border-slate-600 rounded-xl text-white placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-xs text-red-400 font-medium mt-1 animate-pulse">
                {error}
              </p>
            )}
          </div>

          {/* 2. Choose What You Look Like */}
          <div className="space-y-3 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-sky-400" />
                2. Choose What You Look Like:
              </label>
              <span className="text-[11px] text-slate-400">Select Character, Color & Gear</span>
            </div>

            {/* Character Avatar Choice Grid (20 diverse models) */}
            <div className="grid grid-cols-4 sm:grid-cols-10 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {AVATAR_OPTIONS.map((av) => {
                const isSelected = selectedAvatar.id === av.id;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => {
                      setSelectedAvatar(av);
                      soundEffects.playSelect();
                    }}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/20 scale-105 ring-2 ring-amber-400/50'
                        : 'border-slate-700 bg-slate-800 hover:bg-slate-750'
                    }`}
                    title={`${av.name} - ${av.genderStyle}`}
                  >
                    <span className="text-2xl filter drop-shadow">{av.avatar}</span>
                    <span className="text-[10px] text-slate-300 font-medium mt-1 truncate max-w-full text-center">
                      {av.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Outfit Color Selection */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Outfit Theme Color:
              </span>
              <div className="flex flex-wrap gap-2">
                {OUTFIT_COLORS.map((col) => {
                  const isSelected = selectedColor.hex === col.hex;
                  return (
                    <button
                      key={col.hex}
                      type="button"
                      onClick={() => {
                        setSelectedColor(col);
                        soundEffects.playSelect();
                      }}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-white ring-2 ring-white/60 text-white shadow-md'
                          : 'border-slate-700 hover:border-slate-500 text-slate-300'
                      }`}
                      style={{ backgroundColor: isSelected ? col.hex : '#1e293b' }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.hex }} />
                      {col.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accessory Selection */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Special Equipment:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {ACCESSORY_OPTIONS.map((acc) => {
                  const isSelected = selectedAccessory.id === acc.id;
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => {
                        setSelectedAccessory(acc);
                        soundEffects.playSelect();
                      }}
                      className={`p-1.5 rounded-lg border text-center text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500/20 text-white font-bold'
                          : 'border-slate-700 bg-slate-800/80 hover:bg-slate-750 text-slate-300'
                      }`}
                    >
                      <span>{acc.icon}</span>
                      <span className="truncate text-[10px]">{acc.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Starter Companion Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              3. Choose Your Companion Creature:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STARTERS.map((starter) => {
                const isSelected = selectedStarter.id === starter.id;
                return (
                  <button
                    key={starter.id}
                    type="button"
                    onClick={() => {
                      setSelectedStarter(starter);
                      soundEffects.playSelect();
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/20 shadow-md scale-102 ring-2 ring-amber-400/50'
                        : 'border-slate-700 bg-slate-800/60 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-2xl mb-1 filter drop-shadow">
                      {starter.avatar}
                    </div>
                    <div className="font-bold text-xs text-white">
                      {starter.name}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-300 mt-1 font-medium">
                      {starter.type}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Journey Preview */}
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-sky-400" />
              <span>Starting at: <strong>{currentCity.name}</strong> ({currentCity.country})</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300">
              <span>Next Flight:</span>
              <Plane className="w-3.5 h-3.5" />
              <strong>{secondCity.name}</strong>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
          >
            <span>Begin Global English Adventure!</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
