import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { CityData, Monster, TransitStation } from '../types';
import { Maximize2, Minimize2, Compass } from 'lucide-react';
import { soundEffects } from '../utils/audio';

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
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const miniMapRef = useRef<L.Map | null>(null);
  const playerMarkerRef = useRef<L.Marker | null>(null);
  const monsterMarkersRef = useRef<L.Marker[]>([]);
  const stationMarkersRef = useRef<L.Marker[]>([]);

  const rotationAngles: Record<'N' | 'S' | 'E' | 'W', number> = {
    N: 0,
    E: 90,
    S: 180,
    W: 270
  };

  // Initialize the mini Leaflet map with real OpenStreetMap roads
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialZoom = isExpanded ? 15 : 14;
    const miniMap = L.map(mapContainerRef.current, {
      center: playerPosition,
      zoom: initialZoom,
      zoomControl: false,
      attributionControl: false,
      dragging: true,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false
    });

    // Real OpenStreetMap road tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      subdomains: ['a', 'b', 'c']
    }).addTo(miniMap);

    // Click on real road to pan main camera
    miniMap.on('click', (e: L.LeafletMouseEvent) => {
      if (onPanToLocation) {
        soundEffects.playSelect();
        onPanToLocation([e.latlng.lat, e.latlng.lng]);
      }
    });

    // Player GPS Marker with direction cone
    const playerIcon = L.divIcon({
      className: 'custom-minimap-player-pin',
      html: `
        <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; inset: 0; border-radius: 9999px; background: rgba(56, 189, 248, 0.35); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="transform: rotate(${rotationAngles[facingDirection]}deg); font-size: 16px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));">
            ${activeVehicleIcon}
          </div>
          <div style="position: absolute; -top: 4px; width: 6px; height: 6px; background: #38bdf8; border-radius: 9999px; border: 1.5px solid white;"></div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const playerMarker = L.marker(playerPosition, { 
      icon: playerIcon,
      zIndexOffset: 1000 
    }).addTo(miniMap);

    miniMapRef.current = miniMap;
    playerMarkerRef.current = playerMarker;

    return () => {
      miniMap.remove();
      miniMapRef.current = null;
    };
  }, []); // Mount once

  // Invalidate map size when expanded / collapsed
  useEffect(() => {
    if (!miniMapRef.current) return;
    const timer = setTimeout(() => {
      if (miniMapRef.current) {
        miniMapRef.current.invalidateSize();
        miniMapRef.current.setView(playerPosition, isExpanded ? 15 : 14);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [isExpanded]);

  // Update player marker position & heading
  useEffect(() => {
    if (!miniMapRef.current || !playerMarkerRef.current) return;

    playerMarkerRef.current.setLatLng(playerPosition);

    const playerIcon = L.divIcon({
      className: 'custom-minimap-player-pin',
      html: `
        <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; inset: 0; border-radius: 9999px; background: rgba(56, 189, 248, 0.35); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="transform: rotate(${rotationAngles[facingDirection]}deg); font-size: 16px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));">
            ${activeVehicleIcon}
          </div>
          <div style="position: absolute; top: -2px; width: 6px; height: 6px; background: #38bdf8; border-radius: 9999px; border: 1.5px solid white;"></div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    playerMarkerRef.current.setIcon(playerIcon);
    miniMapRef.current.panTo(playerPosition, { animate: false });
  }, [playerPosition, facingDirection, activeVehicleIcon]);

  // Update Monsters on real roads
  useEffect(() => {
    if (!miniMapRef.current) return;
    const miniMap = miniMapRef.current;

    // Clear old markers
    monsterMarkersRef.current.forEach(m => miniMap.removeLayer(m));
    monsterMarkersRef.current = [];

    // Add new markers
    currentCity.monsters.forEach(monster => {
      const isDefeated = defeatedMonsterIds.includes(monster.id);
      const icon = L.divIcon({
        className: 'custom-minimap-monster',
        html: `
          <div style="
            width: ${isDefeated ? '8px' : '11px'}; 
            height: ${isDefeated ? '8px' : '11px'}; 
            border-radius: 9999px; 
            background: ${isDefeated ? '#10b981' : '#f43f5e'}; 
            border: 1.5px solid white; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.6);
            opacity: ${isDefeated ? 0.6 : 1.0};
          "></div>
        `,
        iconSize: [11, 11],
        iconAnchor: [5.5, 5.5]
      });

      const marker = L.marker(monster.position, { icon }).addTo(miniMap);
      marker.bindTooltip(`${monster.name} ${isDefeated ? '✓' : '!'}`, { 
        direction: 'top', 
        offset: [0, -6],
        className: 'text-[9px] font-bold px-1 py-0.5'
      });
      monsterMarkersRef.current.push(marker);
    });
  }, [currentCity, defeatedMonsterIds]);

  // Update Transit Stations on real roads
  useEffect(() => {
    if (!miniMapRef.current) return;
    const miniMap = miniMapRef.current;

    stationMarkersRef.current.forEach(s => miniMap.removeLayer(s));
    stationMarkersRef.current = [];

    (currentCity.stations || []).forEach(station => {
      const icon = L.divIcon({
        className: 'custom-minimap-station',
        html: `
          <div style="
            width: 10px; 
            height: 10px; 
            border-radius: 9999px; 
            background: #0284c7; 
            border: 1.5px solid white; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.6);
          "></div>
        `,
        iconSize: [10, 10],
        iconAnchor: [5, 5]
      });

      const marker = L.marker(station.position, { icon }).addTo(miniMap);
      marker.bindTooltip(`🚇 ${station.name}`, { 
        direction: 'top', 
        offset: [0, -6],
        className: 'text-[9px] font-bold px-1 py-0.5'
      });
      stationMarkersRef.current.push(marker);
    });
  }, [currentCity]);

  return (
    <div
      id="city-mini-map-overlay"
      className="select-none pointer-events-auto transition-all duration-200"
    >
      <div
        className={`rounded-2xl bg-slate-950/95 backdrop-blur-md border border-slate-700/80 shadow-2xl overflow-hidden transition-all duration-200 ${
          isExpanded ? 'w-64 sm:w-72' : 'w-48 sm:w-52'
        }`}
      >
        {/* Header Bar */}
        <div className="px-2.5 py-1.5 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin-slow shrink-0" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-200 truncate max-w-[120px] sm:max-w-[140px]">
              {currentCity.name} Radar
            </span>
          </div>

          <button
            onClick={() => {
              soundEffects.playSelect();
              setIsExpanded(prev => !prev);
            }}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title={isExpanded ? 'Minimize Radar' : 'Expand Radar'}
          >
            {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3 text-sky-400" />}
          </button>
        </div>

        {/* Real Roads Leaflet Mini-Map Canvas */}
        <div
          ref={mapContainerRef}
          className={`relative w-full overflow-hidden cursor-crosshair z-0 ${
            isExpanded ? 'h-52 sm:h-56' : 'h-36 sm:h-40'
          }`}
          title="Mini-map showing real roads & streets. Click to pan camera."
        />

        {/* Footer Sub-bar with Road Indicator */}
        <div className="px-2.5 py-1 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-400">
          <span className="flex items-center gap-1 text-sky-300 font-medium">
            🛣️ Real Streets & Roads
          </span>
          <span className="text-slate-500 font-mono">
            Click to Pan
          </span>
        </div>
      </div>
    </div>
  );
};
