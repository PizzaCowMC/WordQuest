import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { CityData, Monster, StudentProfile, TransitStation, VehicleType, WeatherCondition } from '../types';
import { VEHICLE_OPTIONS } from '../data/transitData';
import { soundEffects } from '../utils/audio';
import { 
  Plus, 
  Minus, 
  Crosshair, 
  Layers, 
  Volume2, 
  VolumeX, 
  Award, 
  Plane,
  HelpCircle,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Navigation,
  Smartphone,
  Map as MapIcon,
  Settings as SettingsIcon,
  Gift,
  Train
} from 'lucide-react';
import { CityMiniMapOverlay } from './CityMiniMapOverlay';
import { VirtualJoystick } from './VirtualJoystick';
import { SettingsModal } from './SettingsModal';
import { CityWeatherOverlay, CityWeatherWidget } from './CityWeatherOverlay';
import { getRandomWeatherForTimestamp } from '../utils/weatherUtils';

interface CityMapViewProps {
  currentCity: CityData;
  secondCity: CityData;
  cityIndex: number;
  totalCities: number;
  student: StudentProfile;
  activeMonster: Monster | null;
  onSelectMonster: (monster: Monster) => void;
  onOpenFieldGuide: () => void;
  onOpenFlight: () => void;
  onOpenTransitHub: (station?: TransitStation) => void;
  onOpenPhone: () => void;
  onOpenSaveSystem?: () => void;
  onOpenDailyReward?: () => void;
  onSelectVehicle?: (vehicle: VehicleType) => void;
  onResetClick: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  showMiniMap?: boolean;
  onToggleMiniMap?: () => void;
  fastTravelTarget?: TransitStation | null;
  currentWeather?: WeatherCondition;
  tempUnit?: 'C' | 'F';
  onToggleTempUnit?: (unit: 'C' | 'F') => void;
}

// Helper to bound player and map strictly inside the city district
export const computeCityBounds = (city: CityData) => {
  const points: [number, number][] = [
    city.coordinates, 
    ...city.monsters.map(m => m.position),
    ...(city.stations || []).map(s => s.position)
  ];
  const lats = points.map(p => p[0]);
  const lngs = points.map(p => p[1]);
  // Tight buffer around all city landmarks and monsters to lock in district
  const minLat = Math.min(...lats) - 0.007;
  const maxLat = Math.max(...lats) + 0.007;
  const minLng = Math.min(...lngs) - 0.010;
  const maxLng = Math.max(...lngs) + 0.010;
  return {
    minLat,
    maxLat,
    minLng,
    maxLng,
    latLngBounds: L.latLngBounds([minLat, minLng], [maxLat, maxLng])
  };
};

export const CityMapView: React.FC<CityMapViewProps> = ({
  currentCity,
  secondCity,
  cityIndex,
  totalCities,
  student,
  activeMonster,
  onSelectMonster,
  onOpenFieldGuide,
  onOpenFlight,
  onOpenTransitHub,
  onOpenPhone,
  onOpenSaveSystem,
  onOpenDailyReward,
  onSelectVehicle,
  onResetClick,
  isMuted,
  onToggleMute,
  showMiniMap: propShowMiniMap,
  onToggleMiniMap: propOnToggleMiniMap,
  fastTravelTarget,
  currentWeather: propWeather,
  tempUnit = 'C',
  onToggleTempUnit
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const playerMarkerRef = useRef<L.Marker | null>(null);
  const monsterMarkersRef = useRef<{ [id: string]: L.Marker }>({});
  const stationMarkersRef = useRef<{ [id: string]: L.Marker }>({});
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Check if daily reward has been claimed today
  const todayStr = new Date().toLocaleDateString('en-CA');
  const isDailyRewardClaimed = student.lastDailyRewardDate === todayStr;

  // Player coordinates in the current city
  const [playerPosition, setPlayerPosition] = useState<[number, number]>(currentCity.coordinates);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets');
  const [facingDirection, setFacingDirection] = useState<'N' | 'S' | 'E' | 'W'>('N');
  const [isWalking, setIsWalking] = useState<boolean>(false);
  const [currentZoom, setCurrentZoom] = useState<number>(Math.max(currentCity.zoom || 15, 14));

  // Handle City Express Lines Fast Travel Teleport
  useEffect(() => {
    if (fastTravelTarget && fastTravelTarget.position) {
      setPlayerPosition(fastTravelTarget.position);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo(fastTravelTarget.position, 16, { animate: true, duration: 1.2 });
      }
    }
  }, [fastTravelTarget]);

  // Dynamic Random Weather System (Random weather changes every 15 min, no manual override)
  const [internalWeather, setInternalWeather] = useState<WeatherCondition>(() => {
    return getRandomWeatherForTimestamp(Date.now());
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const next = getRandomWeatherForTimestamp(Date.now());
      setInternalWeather(prev => (prev !== next ? next : prev));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const effectiveWeather = propWeather || internalWeather;

  // Invalidate map size whenever weather changes to guarantee Leaflet raster tiles never vanish
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize();
    }
  }, [effectiveWeather]);
  
  // Local mini-map radar overlay fallback (OFF by default as requested by user)
  const [localShowMiniMap, setLocalShowMiniMap] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('wordquest_minimap_enabled');
      return saved !== null ? saved === 'true' : false; // Default: false (OFF)
    } catch {
      return false; // Default: false (OFF)
    }
  });

  const showMiniMap = propShowMiniMap !== undefined ? propShowMiniMap : localShowMiniMap;

  const handleToggleMiniMap = useCallback(() => {
    if (propOnToggleMiniMap) {
      propOnToggleMiniMap();
    } else {
      setLocalShowMiniMap(prev => {
        const next = !prev;
        try {
          localStorage.setItem('wordquest_minimap_enabled', String(next));
        } catch {
          // Ignore
        }
        return next;
      });
    }
  }, [propOnToggleMiniMap]);

  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const walkingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check how many monsters in this city are defeated
  const defeatedCount = currentCity.monsters.filter(m => 
    student.defeatedMonsterIds.includes(m.id)
  ).length;
  const totalMonsters = currentCity.monsters.length;
  const allDefeated = defeatedCount >= totalMonsters && totalMonsters > 0;

  // Player is an Explorer on Foot walking through the city streets (no car)
  const activeVehicleOption = VEHICLE_OPTIONS[0];

  // Initialize and update Leaflet Map with strict bounds and clean OSM tiles (NO zoom-out past city)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const cityBounds = computeCityBounds(currentCity);
    const initialZoom = Math.max(currentCity.zoom || 15, 14);

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: currentCity.coordinates,
        zoom: initialZoom,
        minZoom: 14, // Strictly prevents zooming out past street/city district
        maxZoom: 18,
        maxBounds: cityBounds.latLngBounds,
        maxBoundsViscosity: 1.0, // Totally impenetrable boundary
        worldCopyJump: false,
        zoomControl: false,
        attributionControl: false
      });

      const streetTiles = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          minZoom: 14,
          maxZoom: 18,
          noWrap: true,
          subdomains: ['a', 'b', 'c'],
          attribution: '&copy; OpenStreetMap contributors'
        }
      ).addTo(map);

      map.on('zoomend', () => {
        setCurrentZoom(map.getZoom());
      });

      tileLayerRef.current = streetTiles;
      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setMaxBounds(cityBounds.latLngBounds);
      mapInstanceRef.current.setMinZoom(14);
      mapInstanceRef.current.setMaxZoom(18);
      mapInstanceRef.current.setView(currentCity.coordinates, initialZoom);
      setCurrentZoom(initialZoom);
      setPlayerPosition(currentCity.coordinates);
    }
  }, [currentCity.id, currentCity]);

  // Handle Tile Style switch
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    if (mapStyle === 'streets') {
      tileLayerRef.current = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          minZoom: 14,
          maxZoom: 18,
          noWrap: true,
          subdomains: ['a', 'b', 'c'],
          attribution: '&copy; OpenStreetMap contributors'
        }
      ).addTo(mapInstanceRef.current);
    } else {
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          minZoom: 14,
          maxZoom: 18,
          noWrap: true,
          attribution: '&copy; Esri'
        }
      ).addTo(mapInstanceRef.current);
    }
  }, [mapStyle]);

  // Render & Update Player Marker with custom avatar, vehicle, outfit color and title (Scale down for clean street proportion)
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const outfitColor = student.appearance?.outfitColor || '#2563EB';
    const avatarEmoji = student.appearance?.avatar || '🧒';
    const vehicleIcon = activeVehicleOption.icon;
    const isRiding = activeVehicleOption.type !== 'walk';

    const playerHtml = `
      <div class="relative flex items-center justify-center pointer-events-none select-none">
        <!-- Compact Radar Pulse Circle -->
        <div class="absolute -inset-2 rounded-full bg-sky-400/20 animate-ping"></div>
        <div class="absolute -inset-1 rounded-full ${activeVehicleOption.spriteGlow} border border-sky-400/40 shadow-sm"></div>
        
        <!-- Scaled Down Player Avatar (w-9 h-9) -->
        <div class="relative w-9 h-9 rounded-xl border-2 border-white shadow-xl flex items-center justify-center transition-transform ${isWalking ? 'scale-110 rotate-3' : ''}" style="background-color: ${outfitColor}">
          <span class="text-xl filter drop-shadow select-none">${avatarEmoji}</span>
          
          <!-- Companion Creature Mini Badge -->
          <div class="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-slate-900 border border-white flex items-center justify-center text-[10px] shadow">
            ${student.starter.avatar}
          </div>

          <!-- Active Vehicle Mini Badge -->
          ${isRiding ? `
            <div class="absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 border border-slate-900 flex items-center justify-center text-[10px] shadow animate-bounce">
              ${vehicleIcon}
            </div>
          ` : `
            <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-blue-600 rounded-full border border-white flex items-center justify-center text-[8px] font-bold text-white">
              ${student.level}
            </div>
          `}
        </div>

        <!-- Name & Vehicle Pill -->
        <div class="absolute -top-7 px-1.5 py-0.2 rounded-full bg-slate-900/95 border border-slate-700 text-[9px] font-bold text-white whitespace-nowrap shadow-md flex items-center gap-1">
          <span>${student.name}</span>
          ${isRiding ? `<span class="text-amber-300 font-mono">(${activeVehicleOption.name})</span>` : ''}
        </div>
      </div>
    `;

    const playerIcon = L.divIcon({
      html: playerHtml,
      className: 'custom-player-marker',
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    if (!playerMarkerRef.current) {
      playerMarkerRef.current = L.marker(playerPosition, { icon: playerIcon, zIndexOffset: 1000 })
        .addTo(mapInstanceRef.current);
    } else {
      playerMarkerRef.current.setLatLng(playerPosition);
      playerMarkerRef.current.setIcon(playerIcon);
    }
  }, [playerPosition, student.name, student.level, student.starter.avatar, student.appearance, student.activeVehicle, isWalking, activeVehicleOption]);

  // Render & Update Transit Station Markers on Map (Compact, Clean)
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    Object.values(stationMarkersRef.current).forEach(marker => marker.remove());
    stationMarkersRef.current = {};

    const stations = currentCity.stations || [];
    stations.forEach(station => {
      const stationHtml = `
        <div class="relative flex flex-col items-center cursor-pointer group transform transition-transform hover:scale-120">
          <div class="relative w-8 h-8 rounded-xl bg-slate-900 border-2 border-sky-400 shadow-xl flex items-center justify-center text-base shadow-sky-500/40">
            <span>${station.icon}</span>
            <div class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900 animate-pulse"></div>
          </div>
          <div class="px-1.5 py-0.2 mt-0.5 rounded-md bg-slate-900/95 border border-sky-500/50 text-[9px] font-black text-sky-200 whitespace-nowrap shadow flex items-center gap-1">
            <span>${station.name}</span>
          </div>
          <div class="text-[7px] font-bold uppercase tracking-wider text-amber-300 bg-slate-950/80 px-1 rounded shadow-sm mt-0.5">
            ${station.type.toUpperCase()} STOP
          </div>
        </div>
      `;

      const stationIcon = L.divIcon({
        html: stationHtml,
        className: 'custom-station-marker',
        iconSize: [34, 46],
        iconAnchor: [17, 38]
      });

      const marker = L.marker(station.position, { icon: stationIcon, zIndexOffset: 300 })
        .addTo(mapInstanceRef.current!);

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        soundEffects.playSelect();
        onOpenTransitHub(station);
      });

      stationMarkersRef.current[station.id] = marker;
    });
  }, [currentCity.stations, onOpenTransitHub]);

  // Render & Update Monster Markers on Map (Scaled down from w-12 to w-9 for street proportion)
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    Object.values(monsterMarkersRef.current).forEach(marker => marker.remove());
    monsterMarkersRef.current = {};

    currentCity.monsters.forEach(monster => {
      const isDefeated = student.defeatedMonsterIds.includes(monster.id);
      const rarity = monster.rarity || 'Epic';
      const rarityBadgeColor = rarity === 'Legendary' ? 'bg-amber-500 text-slate-950 border-amber-300' : rarity === 'Epic' ? 'bg-purple-600 text-white border-purple-300' : 'bg-sky-600 text-white border-sky-300';

      const markerHtml = `
        <div class="relative flex flex-col items-center cursor-pointer group transform transition-transform hover:scale-115">
          ${isDefeated ? `
            <div class="w-7 h-7 rounded-full bg-slate-800/90 border border-amber-400/80 shadow-md flex items-center justify-center">
              <span class="text-sm">⭐</span>
            </div>
            <div class="px-1.5 py-0.2 mt-0.5 rounded bg-slate-900/90 border border-amber-500/50 text-[8px] font-bold text-amber-300 shadow">
              Captured
            </div>
          ` : `
            <div class="relative">
              <!-- Glowing Pulsing Aura Ring -->
              <div class="absolute -inset-1 rounded-xl opacity-75 blur-xs animate-pulse" style="background-color: ${monster.auraColor || monster.spriteColor}"></div>
              
              <!-- Monster Avatar Shield (w-9 h-9) -->
              <div class="relative w-9 h-9 rounded-xl border-2 border-white shadow-xl flex items-center justify-center animate-bounce" style="background-color: ${monster.spriteColor}; animation-duration: 2s;">
                <span class="text-xl filter drop-shadow select-none">${monster.avatarIcon}</span>
                <span class="absolute -top-1.5 -right-1.5 px-1 py-0.2 text-[7px] font-black rounded-full border shadow ${rarityBadgeColor}">
                  ${rarity}
                </span>
              </div>
            </div>

            <!-- Monster Name & Type Tag -->
            <div class="px-1.5 py-0.2 mt-0.5 rounded-lg bg-slate-900/95 border border-slate-700 text-[9px] font-bold text-white whitespace-nowrap shadow flex items-center gap-1">
              <span>${monster.name}</span>
              <span class="text-[8px] px-1 rounded font-semibold bg-slate-800 text-amber-300">${monster.type}</span>
            </div>
            <div class="text-[8px] text-slate-300 bg-slate-900/80 px-1 rounded shadow-sm mt-0.5 max-w-[110px] truncate border border-slate-700">
              📍 ${monster.streetName}
            </div>
          `}
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-monster-marker',
        iconSize: [36, 48],
        iconAnchor: [18, 40]
      });

      const marker = L.marker(monster.position, { icon: customIcon, zIndexOffset: isDefeated ? 100 : 500 })
        .addTo(mapInstanceRef.current!);

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        soundEffects.playSelect();
        onSelectMonster(monster);
      });

      monsterMarkersRef.current[monster.id] = marker;
    });
  }, [currentCity.monsters, student.defeatedMonsterIds, onSelectMonster]);

  // WASD / Keyboard MOVEMENT HANDLER with strict boundary clamping (Impossible to leave map)
  const moveTrainer = useCallback((dir: 'W' | 'A' | 'S' | 'D') => {
    // If in battle, ignore movement
    if (activeMonster) return;

    // Steady, realistic walking pace for street-level exploration
    const STEP = 0.00015;
    const bounds = computeCityBounds(currentCity);

    setPlayerPosition(prev => {
      let [lat, lng] = prev;
      if (dir === 'W') { // Up / North
        lat += STEP;
        setFacingDirection('N');
      } else if (dir === 'S') { // Down / South
        lat -= STEP;
        setFacingDirection('S');
      } else if (dir === 'A') { // Left / West
        lng -= STEP;
        setFacingDirection('W');
      } else if (dir === 'D') { // Right / East
        lng += STEP;
        setFacingDirection('E');
      }

      // IMPOSSIBLE TO GET OUT OF THE MAP: strictly clamp coordinates within district bounds
      const clampedLat = Math.max(bounds.minLat, Math.min(bounds.maxLat, lat));
      const clampedLng = Math.max(bounds.minLng, Math.min(bounds.maxLng, lng));
      const newPos: [number, number] = [clampedLat, clampedLng];

      // Check proximity to any undefeated monster
      currentCity.monsters.forEach(m => {
        if (!student.defeatedMonsterIds.includes(m.id)) {
          const dLat = Math.abs(m.position[0] - clampedLat);
          const dLng = Math.abs(m.position[1] - clampedLng);
          if (dLat < 0.0007 && dLng < 0.0007) {
            // Walked directly into monster! Start battle
            soundEffects.playSelect();
            onSelectMonster(m);
          }
        }
      });

      // Pan map smoothly to stay centered on player
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo(newPos, { animate: true, duration: 0.15 });
      }

      return newPos;
    });

    setIsWalking(true);
    if (walkingTimerRef.current) clearTimeout(walkingTimerRef.current);
    walkingTimerRef.current = setTimeout(() => setIsWalking(false), 200);
  }, [activeMonster, currentCity, student.defeatedMonsterIds, onSelectMonster]);

  // Global Keyboard Listener for WASD and Arrow Keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 'p') {
        e.preventDefault();
        soundEffects.playPhoneRing();
        onOpenPhone();
        return;
      }
      if (key === 'w' || key === 'arrowup') {
        e.preventDefault();
        moveTrainer('W');
      } else if (key === 's' || key === 'arrowdown') {
        e.preventDefault();
        moveTrainer('S');
      } else if (key === 'a' || key === 'arrowleft') {
        e.preventDefault();
        moveTrainer('A');
      } else if (key === 'd' || key === 'arrowright') {
        e.preventDefault();
        moveTrainer('D');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveTrainer]);

  // Controls helpers
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      if (mapInstanceRef.current.getZoom() < 18) {
        mapInstanceRef.current.zoomIn();
        soundEffects.playSelect();
      }
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      if (mapInstanceRef.current.getZoom() > 14) {
        mapInstanceRef.current.zoomOut();
        soundEffects.playSelect();
      }
    }
  };

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(playerPosition, 15, { duration: 0.8 });
      soundEffects.playSelect();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 select-none">
      
      {/* 1. TOP STATUS & NAVIGATION BAR */}
      <header className="absolute top-3 left-3 right-3 sm:left-4 sm:right-4 z-[400] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Left: City Badge + Lesson Quick Guide Trigger */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center gap-2.5 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-2 sm:px-3 sm:py-2 shadow-2xl">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow font-black text-xs">
              {cityIndex + 1}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
                  {currentCity.name}
                </h2>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {cityIndex + 1}/{totalCities}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden md:block truncate max-w-[180px]">
                {currentCity.country}
              </p>
            </div>
          </div>

          {/* Dynamic Random Weather System Widget (Shifts randomly every 15 min, no manual override) */}
          <CityWeatherWidget
            currentWeather={effectiveWeather}
            tempUnit={tempUnit}
            onOpenPhoneWeather={onOpenPhone}
          />

          {/* Daily Reward Bonus Button */}
          {onOpenDailyReward && (
            <button
              id="open-daily-reward-btn"
              onClick={() => {
                soundEffects.playSelect();
                onOpenDailyReward();
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-2xl border text-xs font-black shadow-lg transition active:scale-95 cursor-pointer shrink-0 ${
                isDailyRewardClaimed
                  ? 'bg-slate-900/95 border-emerald-500/40 text-emerald-400 hover:bg-slate-800'
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 border-amber-300 text-slate-950 hover:from-amber-300 hover:to-amber-400 shadow-amber-500/30 animate-pulse'
              }`}
              title={isDailyRewardClaimed ? "Daily Bonus Claimed for Today (Streak Active)" : "Claim Today's Bonus Coins & XP!"}
            >
              <Gift className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Daily Bonus</span>
              {!isDailyRewardClaimed && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
              )}
            </button>
          )}

          {/* City Express Lines Button */}
          <button
            id="open-city-express-lines-btn"
            onClick={() => {
              soundEffects.playSelect();
              onOpenTransitHub();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 border border-sky-400/60 text-white text-xs font-black shadow-lg shadow-sky-500/20 transition active:scale-95 cursor-pointer shrink-0"
            title="Open City Express Lines Rapid Transit Hub"
          >
            <Train className="w-4 h-4 text-sky-200 shrink-0" />
            <span className="hidden sm:inline">Express Lines</span>
          </button>
        </div>

        {/* Center/Right: Action Buttons & Progress Pill */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Smartphone App Button (Call Taxi, Buy Tickets, Change Models) */}
          <button
            id="open-smartphone-btn"
            onClick={() => {
              soundEffects.playPhoneRing();
              onOpenPhone();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-purple-600/90 to-indigo-600/90 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/60 text-white text-xs font-bold shadow-lg shadow-purple-500/20 transition cursor-pointer active:scale-95 animate-pulse"
            title="Open Smartphone (Call Taxi, Buy Tickets, Switch Models)"
          >
            <Smartphone className="w-4 h-4 text-purple-200" />
            <span>📱 Phone</span>
            <span className="hidden xl:inline text-[9px] text-purple-200 font-mono bg-purple-950/60 px-1 rounded">P</span>
          </button>

          {/* Defeat Progress Pill */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700/80 shadow-xl text-xs font-semibold">
            <span className="text-slate-300 hidden sm:inline">Defeated:</span>
            <span className={`px-2 py-0.5 rounded-full font-bold ${allDefeated ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'}`}>
              {defeatedCount} / {totalMonsters}
            </span>
          </div>

          {/* Fly to Next City Button */}
          {allDefeated && (
            <button
              id="fly-to-second-city-btn"
              onClick={onOpenFlight}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-sky-500/30 animate-pulse border border-sky-400 cursor-pointer"
            >
              <Plane className="w-4 h-4 animate-bounce" />
              <span>FLY TO {secondCity.name.toUpperCase()}! ✈️</span>
            </button>
          )}

          {/* Monster Field Guide / Badges */}
          <button
            onClick={onOpenFieldGuide}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700 hover:border-amber-400 text-white text-xs font-semibold shadow-lg hover:bg-slate-800 transition cursor-pointer"
            title="Open Monster Field Guide & Badges"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">Guide</span>
          </button>

          {/* Settings Button (Opens Settings modal to toggle Mini-Map, Sound, Save System & Reset) */}
          <button
            id="toggle-settings-btn"
            onClick={() => {
              soundEffects.playSelect();
              setShowSettingsModal(true);
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-2xl bg-slate-900/95 border border-slate-700 hover:border-sky-400 text-slate-300 hover:text-white text-xs font-bold shadow-lg transition cursor-pointer"
            title="Settings (Save Game, Reset, Mini-Map & Audio)"
          >
            <SettingsIcon className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </header>

      {/* 2. LEAFLET MAP CANVAS CONTAINER (Pristine Leaflet div, no CSS filters so map never disappears) */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full z-0 cursor-default"
      />

      {/* 2b. DYNAMIC WEATHER AMBIANCE & PARTICLE OVERLAY (Safe rendering, never causes map to vanish) */}
      <CityWeatherOverlay
        weather={effectiveWeather}
      />

      {/* 3. REAL-TIME MINI-MAP OVERLAY (RELATIVE TO CITY BOUNDARIES) */}
      {showMiniMap && (
        <aside 
          aria-label="City Mini-Map Radar" 
          className="absolute top-18 right-3 sm:right-4 z-[400] pointer-events-none animate-in fade-in slide-in-from-top-3 duration-200"
        >
          <CityMiniMapOverlay
            currentCity={currentCity}
            playerPosition={playerPosition}
            facingDirection={facingDirection}
            defeatedMonsterIds={student.defeatedMonsterIds}
            activeVehicleIcon={activeVehicleOption.icon}
            onPanToLocation={(coords) => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.panTo(coords, { animate: true, duration: 0.3 });
                soundEffects.playSelect();
              }
            }}
          />
        </aside>
      )}

      {/* 4. TOUCH CONTROLS FOR MOBILE (Hidden on desktop) */}
      <div className="absolute bottom-6 left-4 z-[400] pointer-events-auto block md:hidden">
        <VirtualJoystick 
          onMove={moveTrainer} 
          speedMultiplier={activeVehicleOption.speedMultiplier}
        />
      </div>

      {/* 5. GOOGLE MAPS STYLE FLOATING CONTROLS (RIGHT-HAND SIDE) */}
      <aside aria-label="Map Controls" className="absolute bottom-6 right-4 z-[400] flex flex-col gap-2 pointer-events-auto">
        
        {/* Street / Satellite Toggle */}
        <button
          onClick={() => {
            setMapStyle(mapStyle === 'streets' ? 'satellite' : 'streets');
            soundEffects.playSelect();
          }}
          className="w-10 h-10 rounded-xl bg-slate-900/95 border border-slate-700/80 hover:bg-slate-800 text-slate-200 shadow-xl flex items-center justify-center transition cursor-pointer"
          title={`Switch to ${mapStyle === 'streets' ? 'Satellite' : 'Road'} View`}
        >
          <Layers className="w-4 h-4" />
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleMute}
          className="w-10 h-10 rounded-xl bg-slate-900/95 border border-slate-700/80 hover:bg-slate-800 text-slate-200 shadow-xl flex items-center justify-center transition cursor-pointer"
          title={isMuted ? 'Unmute Game Sounds' : 'Mute Sounds'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Recenter on Trainer GPS Button */}
        <button
          onClick={handleRecenter}
          className="w-10 h-10 rounded-xl bg-slate-900/95 border border-slate-700/80 hover:bg-slate-800 text-sky-400 shadow-xl flex items-center justify-center transition cursor-pointer"
          title="Recenter on Trainer"
        >
          <Crosshair className="w-5 h-5" />
        </button>

        {/* Quick Settings Button (Mini-Map HUD, Audio, Display) */}
        <button
          id="map-floating-settings-btn"
          onClick={() => {
            soundEffects.playSelect();
            setShowSettingsModal(true);
          }}
          className="w-10 h-10 rounded-xl bg-slate-900/95 border border-slate-700/80 hover:border-sky-400 hover:bg-slate-800 text-slate-200 hover:text-sky-300 shadow-xl flex items-center justify-center transition cursor-pointer"
          title="Game Settings (Mini-Map & Audio)"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>

        {/* Zoom In & Out Stack (Zoom range constrained to 14-18) */}
        <div className="flex flex-col rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900/95 shadow-xl">
          <button
            onClick={handleZoomIn}
            disabled={currentZoom >= 18}
            className={`w-10 h-10 text-slate-200 flex items-center justify-center border-b border-slate-800 transition cursor-pointer ${
              currentZoom >= 18 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-800'
            }`}
            title={currentZoom >= 18 ? "Maximum Zoom In Level" : "Zoom In"}
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            disabled={currentZoom <= 14}
            className={`w-10 h-10 text-slate-200 flex items-center justify-center transition cursor-pointer ${
              currentZoom <= 14 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-800'
            }`}
            title={currentZoom <= 14 ? "City District Boundary Reached (Cannot zoom out further)" : "Zoom Out"}
          >
            <Minus className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* 6. INSTRUCTION BANNER & VERSION TAG */}
      <footer className="absolute bottom-4 left-4 right-16 sm:right-auto z-[390] pointer-events-none flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <div className="pointer-events-auto max-w-sm p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-200 text-xs shadow-xl flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-white">Controls:</span> Walk using <strong>W, A, S, D</strong> or <strong>Arrow keys</strong>. Click monsters or stations to interact!
          </div>
        </div>
        <div className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-800 text-[10px] font-mono text-slate-400 shadow">
          <span>WordQuest</span>
          <span className="text-sky-400 font-bold">v1.9.5</span>
        </div>
      </footer>

      {/* 7. SETTINGS MODAL (Toggles Real-Time Mini-Map, Sound, Temperature Unit, Save System & Reset) */}
      {showSettingsModal && (
        <SettingsModal
          showMiniMap={showMiniMap}
          onToggleMiniMap={handleToggleMiniMap}
          isMuted={isMuted}
          onToggleMute={onToggleMute}
          tempUnit={tempUnit}
          onToggleTempUnit={onToggleTempUnit}
          onOpenSaveSystem={onOpenSaveSystem}
          onResetClick={onResetClick}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  );
};
