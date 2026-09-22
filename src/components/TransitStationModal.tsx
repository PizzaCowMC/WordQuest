import React, { useState, useMemo } from 'react';
import { TransitStation, VehicleType, CityData } from '../types';
import { soundEffects } from '../utils/audio';
import { X, Navigation, Zap, Compass, ArrowRight, Train, Search, MapPin, CheckCircle2 } from 'lucide-react';

interface TransitStationModalProps {
  station: TransitStation | null;
  currentCity: CityData;
  activeVehicle?: VehicleType;
  onSelectVehicle?: (vehicle: VehicleType) => void;
  onFastTravelToStation?: (targetStation: TransitStation) => void;
  onClose: () => void;
}

// Line color badge helper for authentic visual distinction
const getLineBadgeStyle = (lineName: string) => {
  const lower = lineName.toLowerCase();
  if (lower.includes('central')) return 'bg-red-950/80 text-red-300 border-red-700/60';
  if (lower.includes('piccadilly')) return 'bg-blue-950/80 text-blue-300 border-blue-700/60';
  if (lower.includes('jubilee')) return 'bg-slate-800 text-slate-200 border-slate-500/60';
  if (lower.includes('northern')) return 'bg-zinc-900 text-zinc-300 border-zinc-600/60';
  if (lower.includes('victoria')) return 'bg-sky-950/80 text-sky-300 border-sky-600/60';
  if (lower.includes('district')) return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
  if (lower.includes('circle')) return 'bg-amber-950/80 text-amber-300 border-amber-600/60';
  if (lower.includes('bakerloo')) return 'bg-amber-900/60 text-amber-200 border-amber-700/60';
  if (lower.includes('eurostar') || lower.includes('rail') || lower.includes('express')) return 'bg-purple-950/80 text-purple-300 border-purple-700/60';
  return 'bg-blue-950/80 text-sky-300 border-blue-700/50';
};

export const TransitStationModal: React.FC<TransitStationModalProps> = ({
  station,
  currentCity,
  onFastTravelToStation,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'subway' | 'train'>('all');

  const allStations = currentCity.stations || [];

  // Filter stations based on search query and type filter
  const filteredStations = useMemo(() => {
    return allStations.filter(stn => {
      const matchesSearch = 
        stn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (stn.lines && stn.lines.some(l => l.toLowerCase().includes(searchQuery.toLowerCase())));

      if (!matchesSearch) return false;
      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'subway') return stn.type === 'subway';
      if (selectedFilter === 'train') return stn.type === 'train' || stn.type === 'taxi';
      return true;
    });
  }, [allStations, searchQuery, selectedFilter]);

  const handleTravel = (targetStation: TransitStation) => {
    soundEffects.playSelect();
    soundEffects.playCorrectHit();
    if (onFastTravelToStation) {
      onFastTravelToStation(targetStation);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl p-5 sm:p-6 text-white animate-in fade-in zoom-in-95 duration-200 my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-2xl shadow-lg border border-white/20">
              <Train className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white font-['Fredoka',sans-serif]">
                  City Express Lines
                </h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {allStations.length} Stations Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {currentCity.name} Metropolitan Rapid Transit & Underground Network
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Close transit panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Location Banner */}
        {station ? (
          <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-800/80 border border-sky-500/30 flex items-start justify-between gap-3 shrink-0">
            <div className="flex items-start gap-2.5">
              <div className="text-2xl mt-0.5">{station.icon}</div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                    Current Departure Hub:
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase">
                    {station.type}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-white">
                  {station.name}
                </h4>
                <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                  {station.description}
                </p>
                {station.lines && station.lines.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap mt-2">
                    {station.lines.map((line, idx) => (
                      <span key={idx} className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getLineBadgeStyle(line)}`}>
                        {line}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="shrink-0 text-right hidden sm:block">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-1 rounded-xl">
                <MapPin className="w-3 h-3" />
                Standing Here
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-4 p-3 rounded-2xl bg-slate-800/70 border border-slate-700 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Navigation className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Select any station below to fast-travel instantly across <strong>{currentCity.name}</strong> streets!</span>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mb-3 shrink-0">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search station, line, or landmark..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-sky-500 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              All ({allStations.length})
            </button>
            <button
              onClick={() => setSelectedFilter('subway')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition cursor-pointer flex items-center gap-1 ${
                selectedFilter === 'subway'
                  ? 'bg-sky-500 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              <span>🚇 Tube & Metro</span>
            </button>
            <button
              onClick={() => setSelectedFilter('train')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition cursor-pointer flex items-center gap-1 ${
                selectedFilter === 'train'
                  ? 'bg-sky-500 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              <span>🚅 Rail Terminals</span>
            </button>
          </div>
        </div>

        {/* Stations Scrollable List / Grid */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-2.5 custom-scrollbar min-h-[220px]">
          {filteredStations.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No express stations matching "{searchQuery}". Try searching for another name or line.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredStations.map((stn) => {
                const isCurrent = station?.id === stn.id;
                return (
                  <div
                    key={stn.id}
                    className={`p-3 rounded-2xl border transition-all flex flex-col justify-between text-left ${
                      isCurrent
                        ? 'border-emerald-500/70 bg-emerald-950/20 ring-1 ring-emerald-500/30 shadow-md'
                        : 'border-slate-700/80 bg-slate-800/80 hover:bg-slate-800 hover:border-sky-400/80 hover:shadow-lg'
                    }`}
                  >
                    <div>
                      {/* Top Row: Icon + Name + Type Badge */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl filter drop-shadow">{stn.icon}</span>
                          <div>
                            <h5 className="text-xs sm:text-sm font-bold text-white leading-tight">
                              {stn.name}
                            </h5>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                              {stn.type === 'subway' ? 'Underground Tube' : 'Rail Terminal'}
                            </span>
                          </div>
                        </div>

                        {isCurrent && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
                            Here
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-[10px] text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                        {stn.description}
                      </p>

                      {/* Lines Badges */}
                      {stn.lines && stn.lines.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap mt-2.5">
                          {stn.lines.slice(0, 3).map((line, idx) => (
                            <span
                              key={idx}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-medium border truncate max-w-[130px] ${getLineBadgeStyle(line)}`}
                            >
                              {line}
                            </span>
                          ))}
                          {stn.lines.length > 3 && (
                            <span className="px-1 py-0.5 rounded text-[8px] bg-slate-800 text-slate-400 border border-slate-700">
                              +{stn.lines.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action: Travel Button */}
                    <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between">
                      <span className="text-[10px] text-sky-400 font-semibold flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" />
                        Instant Fast Travel
                      </span>

                      {isCurrent ? (
                        <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Current Station
                        </span>
                      ) : (
                        <button
                          onClick={() => handleTravel(stn)}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-md hover:shadow-sky-500/20 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                        >
                          <span>Depart</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info & close */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Select any station to teleport your trainer across the map.</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer"
          >
            Close Transit Panel
          </button>
        </div>

      </div>
    </div>
  );
};
