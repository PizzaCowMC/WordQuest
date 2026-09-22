import React, { useState } from 'react';
import { CityData, Monster, TransitStation } from '../types';
import { MapPin, Navigation, Maximize2, Minimize2, Eye, Compass } from 'lucide-react';

interface CityMiniMapOverlayProps {
  currentCity: CityData;
  playerPosition: [number, number];
  facingDirection: 'N' | 'S' | 'E' | 'W';
  defeatedMonsterIds: string[];
  activeVehicleIcon?: string;
  onPanToLocation?: (coords: [number, number]) => void;
}

export const CityMiniMapOverlay: React.FC<CityMiniMapOverlayProps> = ({
  currentCity,
  playerPosition,
  facingDirection,
  defeatedMonsterIds,
  activeVehicleIcon = '🚶',
  onPanToLocation
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Derive geographical bounding box of the city district
  const allPoints: [number, number][] = [
    currentCity.coordinates,
    ...currentCity.monsters.map(m => m.position),
    ...(currentCity.stations || []).map(s => s.position),
    playerPosition
  ];

  const lats = allPoints.map(p => p[0]);
  const lngs = allPoints.map(p => p[1]);
  const minLat = Math.min(...lats) - 0.008;
  const maxLat = Math.max(...lats) + 0.008;
  const minLng = Math.min(...lngs) - 0.010;
  const maxLng = Math.max(...lngs) + 0.010;

  const latSpan = Math.max(maxLat - minLat, 0.0001);
  const lngSpan = Math.max(maxLng - minLng, 0.0001);

  // Convert (lat, lng) to percentage coords inside mini-map (0% to 100%)
  // Note: latitude increases upward (top = maxLat), longitude increases rightward (right = maxLng)
  const getPercentageCoords = (lat: number, lng: number): { topPct: number; leftPct: number } => {
    const clampedLat = Math.max(minLat, Math.min(maxLat, lat));
    const clampedLng = Math.max(minLng, Math.min(maxLng, lng));

    const leftPct = ((clampedLng - minLng) / lngSpan) * 100;
    const topPct = ((maxLat - clampedLat) / latSpan) * 100;
    return { topPct, leftPct };
  };

  const playerPct = getPercentageCoords(playerPosition[0], playerPosition[1]);

  // Rotations for player direction pointer
  const rotationAngles: Record<'N' | 'S' | 'E' | 'W', number> = {
    N: 0,
    E: 90,
    S: 180,
    W: 270
  };

  return (
    <div
      id="city-mini-map-overlay"
      className="select-none pointer-events-auto transition-all duration-200"
    >
      <div
        className={`rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-700/80 shadow-2xl overflow-hidden transition-all duration-200 ${
          isExpanded ? 'w-64 sm:w-72' : 'w-44 sm:w-48'
        }`}
      >
        {/* Header Bar */}
        <div className="px-2.5 py-1.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-200 truncate max-w-[110px] sm:max-w-[130px]">
              {currentCity.name} Radar
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(prev => !prev)}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title={isExpanded ? 'Minimize Radar' : 'Expand Radar'}
          >
            {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          </button>
        </div>

        {/* Mini-Map Radar Canvas */}
        <div
          className={`relative w-full bg-slate-950 overflow-hidden cursor-crosshair border-b border-slate-800/80 ${
            isExpanded ? 'h-52 sm:h-56' : 'h-36 sm:h-40'
          }`}
          onClick={(e) => {
            if (!onPanToLocation) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = (e.clientX - rect.left) / rect.width;
            const clickY = (e.clientY - rect.top) / rect.height;
            // Reverse coordinates from percentage
            const targetLng = minLng + clickX * lngSpan;
            const targetLat = maxLat - clickY * latSpan;
            onPanToLocation([targetLat, targetLng]);
          }}
          title="Mini-map radar: click anywhere to pan camera"
        >
          {/* Subtle Grid Lines to represent district street blocks */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-15 pointer-events-none">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="border border-sky-400/40" />
            ))}
          </div>

          {/* City Boundary Box representation */}
          <div className="absolute inset-2 border border-dashed border-sky-500/30 rounded-xl pointer-events-none">
            <span className="absolute top-1 left-1.5 text-[8px] font-mono text-sky-500/60 uppercase">
              District Bounds
            </span>
          </div>

          {/* City Center Marker */}
          {(() => {
            const centerPct = getPercentageCoords(currentCity.coordinates[0], currentCity.coordinates[1]);
            return (
              <div
                className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-slate-500 border border-slate-300 pointer-events-none opacity-40"
                style={{ top: `${centerPct.topPct}%`, left: `${centerPct.leftPct}%` }}
                title="City Center"
              />
            );
          })()}

          {/* Transit Stations on Mini-Map */}
          {(currentCity.stations || []).map((station: TransitStation) => {
            const coords = getPercentageCoords(station.position[0], station.position[1]);
            return (
              <div
                key={station.id}
                className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-sky-400 border border-white shadow-sm pointer-events-none z-10"
                style={{ top: `${coords.topPct}%`, left: `${coords.leftPct}%` }}
                title={station.name}
              />
            );
          })}

          {/* Monsters on Mini-Map */}
          {currentCity.monsters.map((monster: Monster) => {
            const coords = getPercentageCoords(monster.position[0], monster.position[1]);
            const isDefeated = defeatedMonsterIds.includes(monster.id);

            return (
              <div
                key={monster.id}
                className={`absolute w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full pointer-events-none z-10 transition-transform ${
                  isDefeated
                    ? 'bg-emerald-500/40 border border-emerald-400/50 scale-75'
                    : 'bg-rose-500 border border-white shadow-md animate-pulse scale-100'
                }`}
                style={{ top: `${coords.topPct}%`, left: `${coords.leftPct}%` }}
                title={`${monster.name} ${isDefeated ? '(Defeated)' : '(Active Encounter)'}`}
              />
            );
          })}

          {/* Live Player Position Indicator with Direction Cone */}
          <div
            className="absolute z-20 pointer-events-none transition-all duration-100 ease-out"
            style={{
              top: `${playerPct.topPct}%`,
              left: `${playerPct.leftPct}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Direction pointer cone */}
            <div
              className="relative flex items-center justify-center"
              style={{ transform: `rotate(${rotationAngles[facingDirection]}deg)` }}
            >
              {/* Pulsing GPS ring */}
              <div className="absolute w-6 h-6 rounded-full bg-amber-400/30 animate-ping" />

              {/* Player Dot */}
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white shadow-lg flex items-center justify-center text-[8px] z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              </div>

              {/* North Arrow Pointer Needle */}
              <div className="absolute -top-2 w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[5px] border-b-amber-300" />
            </div>
          </div>
        </div>

        {/* Legend / Status Footer */}
        <div className="px-2 py-1 bg-slate-950 flex items-center justify-between text-[9px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              You ({activeVehicleIcon})
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
              Monsters
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />
              Stations
            </span>
          </div>

          <span className="font-mono text-slate-500 font-bold">
            {facingDirection}
          </span>
        </div>
      </div>
    </div>
  );
};
