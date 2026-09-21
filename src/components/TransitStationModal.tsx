import React from 'react';
import { TransitStation, VehicleType, CityData } from '../types';
import { VEHICLE_OPTIONS } from '../data/transitData';
import { soundEffects } from '../utils/audio';
import { X, Navigation, Zap, Compass, ArrowRight, Sparkles } from 'lucide-react';

interface TransitStationModalProps {
  station: TransitStation | null;
  currentCity: CityData;
  activeVehicle: VehicleType;
  onSelectVehicle: (vehicle: VehicleType) => void;
  onFastTravelToStation?: (targetStation: TransitStation) => void;
  onClose: () => void;
}

export const TransitStationModal: React.FC<TransitStationModalProps> = ({
  station,
  currentCity,
  activeVehicle,
  onSelectVehicle,
  onFastTravelToStation,
  onClose
}) => {
  const otherStations = (currentCity.stations || []).filter(s => s.id !== station?.id);

  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl p-5 sm:p-6 text-white animate-in fade-in zoom-in-95 duration-200 my-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-2xl shadow-lg border border-white/20">
              {station ? station.icon : '🚏'}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white font-['Fredoka',sans-serif]">
                {station ? station.name : `${currentCity.name} Transit Network`}
              </h3>
              <p className="text-xs text-slate-400">
                {station?.description || 'Switch vehicles to travel through city streets faster!'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lines Badges */}
        {station && station.lines && station.lines.length > 0 && (
          <div className="mb-4 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-[11px] font-bold text-slate-400">Lines Served:</span>
            {station.lines.map((line, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-full bg-blue-950 text-sky-300 border border-blue-700/50 font-medium text-[11px]">
                {line}
              </span>
            ))}
          </div>
        )}

        {/* Vehicle Selection Options */}
        <div className="space-y-2 mb-5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
            Choose Your Street Vehicle:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {VEHICLE_OPTIONS.map((opt) => {
              const isSelected = activeVehicle === opt.type;
              return (
                <button
                  key={opt.type}
                  onClick={() => {
                    onSelectVehicle(opt.type);
                    soundEffects.playSelect();
                  }}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/20 ring-2 ring-amber-400/50 shadow-lg'
                      : 'border-slate-700 bg-slate-800/70 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <span className="text-3xl filter drop-shadow">{opt.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-white truncate">
                        {opt.name}
                      </span>
                      <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-700 text-slate-300'}`}>
                        {opt.speedMultiplier}x Speed
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                      {opt.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fast Travel To Other Stations In City */}
        {otherStations.length > 0 && onFastTravelToStation && (
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 mb-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <Navigation className="w-3.5 h-3.5" />
              <span>City Express Lines (Fast Travel across {currentCity.name}):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {otherStations.map((stn) => (
                <button
                  key={stn.id}
                  onClick={() => {
                    onFastTravelToStation(stn);
                    soundEffects.playSelect();
                    onClose();
                  }}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-400 hover:bg-slate-850 flex items-center justify-between transition cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-lg">{stn.icon}</span>
                    <div className="truncate">
                      <div className="text-xs font-bold text-white truncate">{stn.name}</div>
                      <div className="text-[10px] text-slate-400">{stn.type.toUpperCase()} Station</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-sky-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold transition cursor-pointer"
        >
          Close Transit Panel
        </button>
      </div>
    </div>
  );
};
