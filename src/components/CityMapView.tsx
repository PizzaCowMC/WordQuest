import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { 
  CityData, 
  Monster, 
  StudentProfile, 
  TransitStation, 
  VehicleType, 
  WeatherCondition, 
  MultiplayerPlayer,
  CityBuilding,
  CityAirport,
  ElementType
} from '../types';
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
  Smartphone,
  Settings as SettingsIcon,
  Gift,
  Train,
  Target,
  Landmark,
  Building2,
  Sparkles,
  Maximize2,
  Crown,
  X,
  Footprints
} from 'lucide-react';
import { getRandomCitySpot, RandomSpotResult } from '../utils/randomSpotUtils';
import { getDailyMissions } from '../utils/dailyMissions';
import { CityMiniMapOverlay } from './CityMiniMapOverlay';
import { VirtualJoystick } from './VirtualJoystick';
import { SettingsModal } from './SettingsModal';
import { CityWeatherOverlay, CityWeatherWidget } from './CityWeatherOverlay';
import { getRandomWeatherForTimestamp } from '../utils/weatherUtils';
import { UpdateLogsModal } from './UpdateLogsModal';
import { APP_VERSION } from '../data/updateLogs';
import { TrainerXpBar } from './TrainerXpBar';
import { FINAL_BOSS_MONSTER } from '../data/finalBoss';

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
  runAwayTarget?: RandomSpotResult | null;
  currentWeather?: WeatherCondition;
  tempUnit?: 'C' | 'F';
  onToggleTempUnit?: (unit: 'C' | 'F') => void;
  multiplayerPlayers?: MultiplayerPlayer[];
  onSendMovement?: (pos: { lat: number; lng: number }, facing: 'left' | 'right' | 'up' | 'down', vehicle: VehicleType) => void;
  onSelectRemotePlayer?: (player: MultiplayerPlayer) => void;
  onOpenUpdateLogs?: () => void;
  onOpenMastery?: () => void;
  onOpenBuilding?: (building: CityBuilding) => void;
  onOpenAirport?: () => void;
  onOpenDailyMissions?: () => void;
  onRewardClaimed?: (xp: number, coins: number) => void;
}

// Generate animated SVG elemental mob model
export function generateMobModelHtml(monster: Monster, isDefeated: boolean, isFacingLeft: boolean): string {
  if (isDefeated) {
    return `
      <div class="relative flex flex-col items-center cursor-pointer group transform transition-transform hover:scale-115">
        <div class="w-7 h-7 rounded-full bg-slate-800/95 border-2 border-amber-400 shadow-md flex items-center justify-center">
          <span class="text-sm">⭐</span>
        </div>
        <div class="px-1.5 py-0.2 mt-0.5 rounded bg-slate-900/90 border border-amber-500/50 text-[8px] font-bold text-amber-300 shadow">
          Captured
        </div>
      </div>
    `;
  }

  const rarity = monster.rarity || 'Epic';
  const rarityCrown = rarity === 'Boss' ? '👑🔥' : rarity === 'Mythic' ? '🌟✨' : rarity === 'Legendary' ? '👑' : rarity === 'Epic' ? '💎' : '⭐';
  const rarityBadgeColor = rarity === 'Boss' 
    ? 'bg-gradient-to-r from-purple-600 via-rose-600 to-amber-500 text-amber-100 border-amber-300 ring-2 ring-amber-300 animate-pulse shadow-lg' 
    : rarity === 'Mythic' 
    ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white border-amber-200 ring-1 ring-amber-300 shadow-md animate-pulse' 
    : rarity === 'Legendary' 
    ? 'bg-amber-400 text-slate-950 border-amber-300' 
    : rarity === 'Epic' 
    ? 'bg-purple-500 text-white border-purple-300' 
    : 'bg-sky-500 text-white border-sky-300';
  const flip = isFacingLeft ? 'scaleX(-1)' : 'scaleX(1)';

  // Element specific decorative particles & accessories
  let elementEffect = '';
  switch (monster.type) {
    case 'Fire':
      elementEffect = `
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-0.5 pointer-events-none">
          <span class="text-[11px] animate-bounce" style="animation-duration: 0.9s;">🔥</span>
        </div>
      `;
      break;
    case 'Water':
      elementEffect = `
        <div class="absolute -bottom-1 -right-1 text-[10px] pointer-events-none animate-pulse">💧</div>
      `;
      break;
    case 'Electric':
      elementEffect = `
        <div class="absolute -top-3 -right-1 text-[11px] pointer-events-none animate-ping" style="animation-duration: 1.4s;">⚡</div>
      `;
      break;
    case 'Grass':
      elementEffect = `
        <div class="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] pointer-events-none">🌿</div>
      `;
      break;
    case 'Psychic':
      elementEffect = `
        <div class="absolute -top-2 -right-1 text-[10px] pointer-events-none animate-spin" style="animation-duration: 5s;">🔮</div>
      `;
      break;
    case 'Ice':
      elementEffect = `
        <div class="absolute -top-2 -left-1 text-[10px] pointer-events-none animate-pulse">❄️</div>
      `;
      break;
    case 'Dragon':
      elementEffect = `
        <div class="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] pointer-events-none animate-bounce" style="animation-duration: 1.8s;">🐲</div>
      `;
      break;
    case 'Fairy':
      elementEffect = `
        <div class="absolute -top-2 -right-1 text-[10px] pointer-events-none animate-pulse">✨</div>
      `;
      break;
    case 'Wind':
      elementEffect = `
        <div class="absolute -bottom-1 -left-1 text-[10px] pointer-events-none animate-pulse">🌪️</div>
      `;
      break;
    default:
      break;
  }

  return `
    <div class="relative flex flex-col items-center cursor-pointer group transform transition-transform hover:scale-120">
      
      <!-- Top Floating Rarity Crown & Level Pill -->
      <div class="flex items-center gap-0.5 mb-0.5">
        <span class="px-1 py-0.2 rounded-full text-[8px] font-black uppercase border shadow-md ${rarityBadgeColor} flex items-center gap-0.5">
          <span>${rarityCrown}</span>
          <span>Lv.${monster.level}</span>
        </span>
      </div>

      <!-- Animated Creature Model Body -->
      <div class="relative">
        <!-- Glowing Pulsing Aura Ring -->
        <div class="absolute -inset-1.5 rounded-2xl opacity-80 blur-xs animate-pulse" style="background-color: ${monster.auraColor || monster.spriteColor}"></div>
        
        <!-- High-fidelity Creature Shield Body with Flip Animation -->
        <div 
          class="relative w-9 h-9 rounded-2xl border-2 border-white/95 shadow-2xl flex items-center justify-center animate-bounce"
          style="background: radial-gradient(circle at 35% 35%, #ffffff 0%, ${monster.spriteColor} 70%, #0f172a 100%); animation-duration: 2.2s; transform: ${flip};"
        >
          <span class="text-xl filter drop-shadow select-none leading-none">${monster.avatarIcon}</span>
          <span class="absolute -top-1 -right-1 text-[8px] animate-pulse">✨</span>
          ${elementEffect}
        </div>
      </div>

      <!-- Mini HP Lifebar -->
      <div class="w-10 h-1.5 bg-slate-900/90 rounded-full overflow-hidden border border-slate-700 mt-1 p-0.2 shadow">
        <div class="w-full h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"></div>
      </div>

      <!-- Monster Name & Element Pill -->
      <div class="px-1.5 py-0.2 mt-0.5 rounded-md bg-slate-900/95 border border-slate-700/80 text-[8px] font-extrabold text-white whitespace-nowrap shadow-lg flex items-center gap-1">
        <span>${monster.name}</span>
        <span class="text-[7px] px-1 rounded font-bold bg-slate-800 text-amber-300 border border-slate-700">${monster.type}</span>
      </div>
    </div>
  `;
}

// Helper to bound player and map strictly inside the city district
export const computeCityBounds = (city: CityData) => {
  const points: [number, number][] = [
    city.coordinates, 
    ...city.monsters.map(m => m.position),
    ...(city.stations || []).map(s => s.position),
    ...(city.buildings || []).map(b => b.position),
    ...(city.airport ? [city.airport.position] : [])
  ];
  const lats = points.map(p => p[0]);
  const lngs = points.map(p => p[1]);
  const minLat = Math.min(...lats) - 0.040;
  const maxLat = Math.max(...lats) + 0.040;
  const minLng = Math.min(...lngs) - 0.055;
  const maxLng = Math.max(...lngs) + 0.055;
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
  runAwayTarget,
  currentWeather: propWeather,
  tempUnit = 'C',
  onToggleTempUnit,
  multiplayerPlayers = [],
  onSendMovement,
  onSelectRemotePlayer,
  onOpenUpdateLogs,
  onOpenMastery,
  onOpenBuilding,
  onOpenAirport,
  onOpenDailyMissions,
  onRewardClaimed,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const playerMarkerRef = useRef<L.Marker | null>(null);
  const monsterMarkersRef = useRef<{ [id: string]: L.Marker }>({});
  const stationMarkersRef = useRef<{ [id: string]: L.Marker }>({});
  const buildingMarkersRef = useRef<{ [id: string]: L.Marker }>({});
  const airportMarkerRef = useRef<L.Marker | null>(null);
  const remotePlayerMarkersRef = useRef<{ [id: string]: L.Marker }>({});

  // Check if daily reward has been claimed today
  const todayStr = new Date().toLocaleDateString('en-CA');
  const isDailyRewardClaimed = student.lastDailyRewardDate === todayStr;

  // Closable Controls Tips banner state (persisted in localStorage)
  const [showControlsTips, setShowControlsTips] = useState<boolean>(() => {
    try {
      return localStorage.getItem('wq_hide_controls_tips') !== 'true';
    } catch {
      return true;
    }
  });

  // Settings modal active tab ('settings' | 'missions')
  const [settingsTab, setSettingsTab] = useState<'settings' | 'missions'>('settings');

  // Track if any daily missions are ready to be claimed
  const [hasUnclaimedMissions, setHasUnclaimedMissions] = useState<boolean>(() => {
    try {
      const state = getDailyMissions();
      return state.missions.some(m => m.completed && !m.claimed);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleMissionUpdate = () => {
      try {
        const state = getDailyMissions();
        setHasUnclaimedMissions(state.missions.some(m => m.completed && !m.claimed));
      } catch {}
    };
    window.addEventListener('lexiroam_missions_updated', handleMissionUpdate);
    return () => window.removeEventListener('lexiroam_missions_updated', handleMissionUpdate);
  }, []);

  // Player coordinates in the current city
  const [playerPosition, setPlayerPosition] = useState<[number, number]>(currentCity.coordinates);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets');
  const [facingDirection, setFacingDirection] = useState<'N' | 'S' | 'E' | 'W'>('N');
  const [isWalking, setIsWalking] = useState<boolean>(false);
  const [currentZoom, setCurrentZoom] = useState<number>(Math.max(currentCity.zoom || 13, 12));
  const [showUpdateLogsModal, setShowUpdateLogsModal] = useState<boolean>(false);

  // Smooth continuous physics velocity vector refs (vx, vy)
  const playerPosRef = useRef<[number, number]>(currentCity.coordinates);
  const velRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const keysDownRef = useRef<Set<string>>(new Set());
  const joystickVectorRef = useRef<{ x: number; y: number } | null>(null);

  // Autonomous Mob Roaming Simulation State
  const mobSimRef = useRef<Map<string, {
    lat: number;
    lng: number;
    anchorLat: number;
    anchorLng: number;
    targetLat: number;
    targetLng: number;
    isFacingLeft: boolean;
    speed: number;
    nextWanderTime: number;
  }>>(new Map());

  // Initialize mob roaming positions whenever city changes
  useEffect(() => {
    playerPosRef.current = currentCity.coordinates;
    velRef.current = { x: 0, y: 0 };
    setPlayerPosition(currentCity.coordinates);

    mobSimRef.current.clear();
    currentCity.monsters.forEach((m, idx) => {
      mobSimRef.current.set(m.id, {
        lat: m.position[0],
        lng: m.position[1],
        anchorLat: m.position[0],
        anchorLng: m.position[1],
        targetLat: m.position[0],
        targetLng: m.position[1],
        isFacingLeft: false,
        speed: 0.00030 + ((idx % 4) * 0.00006),
        nextWanderTime: Date.now() + 400 + Math.random() * 2000
      });
    });
  }, [currentCity.id]);

  // Handle City Express Lines Fast Travel Teleport
  useEffect(() => {
    if (fastTravelTarget && fastTravelTarget.position) {
      playerPosRef.current = fastTravelTarget.position;
      velRef.current = { x: 0, y: 0 };
      setPlayerPosition(fastTravelTarget.position);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo(fastTravelTarget.position, 16, { animate: true, duration: 1.2 });
      }
    }
  }, [fastTravelTarget]);

  // Run Away State & Handler (Sprints to a random spot across the metropolis)
  const [runAwayNotification, setRunAwayNotification] = useState<string | null>(null);

  const handleRunAwayToRandomSpot = () => {
    soundEffects.playSelect();
    const spot = getRandomCitySpot(currentCity, playerPosRef.current);
    playerPosRef.current = spot.position;
    velRef.current = { x: 0, y: 0 };
    setPlayerPosition(spot.position);
    if (playerMarkerRef.current) {
      playerMarkerRef.current.setLatLng(spot.position);
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(spot.position, 16, { animate: true, duration: 1.0 });
    }
    keysDownRef.current.clear();
    joystickVectorRef.current = null;
    setIsWalking(false);

    setRunAwayNotification(`Ran away to a random spot: ${spot.name}!`);
    setTimeout(() => {
      setRunAwayNotification(null);
    }, 4000);

    onSendMovement?.({ lat: spot.position[0], lng: spot.position[1] }, 'down', student.activeVehicle);
  };

  // Handle external Run Away signal (e.g. escaping from battle)
  useEffect(() => {
    if (runAwayTarget && runAwayTarget.position) {
      playerPosRef.current = runAwayTarget.position;
      velRef.current = { x: 0, y: 0 };
      setPlayerPosition(runAwayTarget.position);
      if (playerMarkerRef.current) {
        playerMarkerRef.current.setLatLng(runAwayTarget.position);
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo(runAwayTarget.position, 16, { animate: true, duration: 1.1 });
      }
      keysDownRef.current.clear();
      joystickVectorRef.current = null;
      setIsWalking(false);

      setRunAwayNotification(`Escaped battle safely! Ran away to ${runAwayTarget.name}!`);
      setTimeout(() => {
        setRunAwayNotification(null);
      }, 4000);

      onSendMovement?.({ lat: runAwayTarget.position[0], lng: runAwayTarget.position[1] }, 'down', student.activeVehicle);
    }
  }, [runAwayTarget, student.activeVehicle, onSendMovement]);

  // Dynamic Random Weather System
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

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize();
    }
  }, [effectiveWeather]);
  
  // Local mini-map radar overlay
  const [localShowMiniMap, setLocalShowMiniMap] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('lexiroam_minimap_enabled');
      return saved !== null ? saved === 'true' : false;
    } catch {
      return false;
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
          localStorage.setItem('lexiroam_minimap_enabled', String(next));
        } catch {
          // Ignore
        }
        return next;
      });
    }
  }, [propOnToggleMiniMap]);

  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  // Check how many monsters in this city are defeated
  const defeatedCount = currentCity.monsters.filter(m => 
    student.defeatedMonsterIds.includes(m.id)
  ).length;
  const totalMonsters = currentCity.monsters.length;
  const allDefeated = defeatedCount >= totalMonsters && totalMonsters > 0;

  // Active Vehicle Option
  const activeVehicleOption = VEHICLE_OPTIONS.find(v => v.type === student.activeVehicle) || VEHICLE_OPTIONS[0];

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const cityBounds = computeCityBounds(currentCity);
    const initialZoom = Math.max(currentCity.zoom || 13, 12);

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: currentCity.coordinates,
        zoom: initialZoom,
        minZoom: 11,
        maxZoom: 18,
        maxBounds: cityBounds.latLngBounds,
        maxBoundsViscosity: 0.75,
        worldCopyJump: false,
        zoomControl: false,
        attributionControl: false
      });

      const streetTiles = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          minZoom: 11,
          maxZoom: 18,
          noWrap: true,
          subdomains: ['a', 'b', 'c'],
          attribution: '&copy; OpenStreetMap contributors'
        }
      ).addTo(map);

      mapInstanceRef.current = map;

      map.on('zoomend', () => {
        setCurrentZoom(map.getZoom());
      });
    } else {
      const map = mapInstanceRef.current;
      map.setMaxBounds(cityBounds.latLngBounds);
      map.setView(currentCity.coordinates, initialZoom, { animate: false });
    }
  }, [currentCity]);

  // Update map tile layer style
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const url = mapStyle === 'satellite'
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(url, {
      minZoom: 13,
      maxZoom: 18,
      noWrap: true,
      subdomains: mapStyle === 'satellite' ? [] : ['a', 'b', 'c']
    }).addTo(map);
  }, [mapStyle]);

  // Render & Update Player Marker
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const isMale = student.appearance?.genderStyle !== 'girl';
    const outfitColor = student.appearance?.outfitColor || '#38bdf8';
    const companionIcon = student.starter?.avatar || '⚡';

    const playerHtml = `
      <div class="relative flex flex-col items-center pointer-events-none select-none">
        
        <!-- Companion Pet floating nearby -->
        <div class="absolute -top-8 -right-4 z-20 w-6 h-6 rounded-full bg-slate-900 border border-amber-400 shadow-lg flex items-center justify-center text-xs animate-bounce" style="animation-duration: 1.5s;">
          <span>${companionIcon}</span>
        </div>

        <!-- Dynamic Movement Glow Ripple -->
        <div class="absolute -inset-2 rounded-full opacity-60 blur-xs transition-opacity duration-200 ${isWalking ? 'bg-sky-400 animate-ping' : 'bg-transparent'}"></div>

        <!-- Player Avatar Circle -->
        <div class="relative w-9 h-9 rounded-full border-2 border-white shadow-2xl flex items-center justify-center text-base" style="background-color: ${outfitColor}">
          <span>${isMale ? '👦' : '👧'}</span>
          
          <!-- Level Badge -->
          <div class="absolute -bottom-1 -right-1 px-1 rounded-full bg-amber-400 text-slate-950 font-black text-[7px] border border-white shadow">
            ${student.level}
          </div>
        </div>

        <!-- Player Name Tag -->
        <div class="px-2 py-0.5 mt-0.5 rounded-full bg-slate-900/95 border border-sky-400/80 text-[8px] font-extrabold text-white shadow-lg flex items-center gap-1 max-w-[130px]" title="${student.name}">
          <span class="truncate max-w-[85px] leading-tight">${student.name}</span>
          <span class="text-[7px] text-sky-300 shrink-0">${activeVehicleOption.icon}</span>
        </div>
      </div>
    `;

    const playerIcon = L.divIcon({
      html: playerHtml,
      className: 'custom-player-marker',
      iconSize: [44, 48],
      iconAnchor: [22, 38]
    });

    if (!playerMarkerRef.current) {
      playerMarkerRef.current = L.marker(playerPosition, { icon: playerIcon, zIndexOffset: 1000 })
        .addTo(mapInstanceRef.current);
    } else {
      playerMarkerRef.current.setLatLng(playerPosition);
      playerMarkerRef.current.setIcon(playerIcon);
    }
  }, [playerPosition, student.name, student.level, student.starter.avatar, student.appearance, student.activeVehicle, isWalking, activeVehicleOption]);

  // Render & Update Transit Station Markers
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

  // Render & Update Famous Monuments and Buildings Markers (where mobs can hide inside)
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    Object.values(buildingMarkersRef.current).forEach(marker => marker.remove());
    buildingMarkersRef.current = {};

    const buildings = currentCity.buildings || [];
    buildings.forEach(building => {
      // Check how many undefeated mobs are lurking inside or near this building
      const lurkingCount = currentCity.monsters.filter(m => 
        !student.defeatedMonsterIds.includes(m.id) &&
        (m.streetName.toLowerCase().includes(building.name.toLowerCase()) ||
         building.hiddenMonsterIds?.includes(m.id) ||
         (Math.abs(m.position[0] - building.position[0]) < 0.003 && Math.abs(m.position[1] - building.position[1]) < 0.003))
      ).length;

      const buildingHtml = `
        <div class="relative flex flex-col items-center cursor-pointer group transform transition-transform hover:scale-120">
          
          ${lurkingCount > 0 ? `
            <div class="absolute -top-3 z-30 px-1.5 py-0.2 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold text-[7px] border border-amber-300 shadow-lg flex items-center gap-0.5 animate-bounce">
              <span>👀</span>
              <span>${lurkingCount} Lurking!</span>
            </div>
          ` : ''}

          <!-- Building Icon Monument Badge -->
          <div class="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 border-2 border-amber-400 shadow-2xl flex items-center justify-center text-xl">
            <span>${building.icon || '🏛️'}</span>
          </div>

          <!-- Building Name Tag -->
          <div class="px-2 py-0.5 mt-0.5 rounded-lg bg-slate-900/95 border border-amber-400/60 text-[9px] font-extrabold text-amber-200 whitespace-nowrap shadow-xl flex items-center gap-1">
            <span>${building.name}</span>
          </div>
          <div class="text-[7px] font-bold uppercase text-slate-300 bg-slate-950/80 px-1 rounded mt-0.5">
            ${building.type} • Enter to Explore
          </div>
        </div>
      `;

      const buildingIcon = L.divIcon({
        html: buildingHtml,
        className: 'custom-building-marker',
        iconSize: [42, 54],
        iconAnchor: [21, 46]
      });

      const marker = L.marker(building.position, { icon: buildingIcon, zIndexOffset: 350 })
        .addTo(mapInstanceRef.current!);

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        soundEffects.playSelect();
        onOpenBuilding?.(building);
      });

      buildingMarkersRef.current[building.id] = marker;
    });
  }, [currentCity.buildings, currentCity.monsters, student.defeatedMonsterIds, onOpenBuilding]);

  // Render & Update Physical Airport Terminal Marker
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (airportMarkerRef.current) {
      airportMarkerRef.current.remove();
      airportMarkerRef.current = null;
    }

    const airport = currentCity.airport;
    if (airport) {
      const cityMonsterIds = currentCity.monsters.map(m => m.id);
      const defeatedInCity = cityMonsterIds.filter(id => student.defeatedMonsterIds.includes(id)).length;
      const isAirportCleared = cityMonsterIds.length > 0 ? defeatedInCity >= cityMonsterIds.length : true;

      const airportHtml = `
        <div class="relative flex flex-col items-center cursor-pointer group transform transition-transform hover:scale-120">
          
          <!-- Flashing runway beacon -->
          <div class="absolute -top-2 w-3 h-3 rounded-full ${isAirportCleared ? 'bg-emerald-400' : 'bg-amber-400'} border border-white animate-ping"></div>

          <!-- Airport Concourse Badge -->
          <div class="relative w-11 h-11 rounded-2xl ${isAirportCleared ? 'bg-gradient-to-br from-blue-600 via-sky-600 to-indigo-700 border-2 border-sky-300' : 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border-2 border-amber-400/80'} shadow-2xl flex items-center justify-center text-2xl">
            <span>✈️</span>
          </div>

          <!-- Airport Name & Code -->
          <div class="px-2 py-0.5 mt-0.5 rounded-lg bg-slate-900/95 border ${isAirportCleared ? 'border-sky-400/80 text-white' : 'border-amber-400/70 text-slate-200'} text-[9px] font-black whitespace-nowrap shadow-xl flex items-center gap-1">
            <span>${airport.name}</span>
            <span class="px-1 rounded bg-sky-500/30 text-sky-300 text-[8px] font-mono">${airport.code}</span>
          </div>
          <div class="text-[7px] font-extrabold uppercase tracking-wider ${isAirportCleared ? 'text-emerald-300 bg-emerald-950/80 border border-emerald-500/40' : 'text-amber-300 bg-amber-950/80 border border-amber-500/40'} px-1.5 py-0.2 rounded mt-0.5">
            ${isAirportCleared ? '✅ Runway Cleared • Fly Now' : `🔒 Grounded (${defeatedInCity}/${cityMonsterIds.length})`}
          </div>
        </div>
      `;

      const airportIcon = L.divIcon({
        html: airportHtml,
        className: 'custom-airport-marker',
        iconSize: [46, 58],
        iconAnchor: [23, 50]
      });

      const marker = L.marker(airport.position, { icon: airportIcon, zIndexOffset: 450 })
        .addTo(mapInstanceRef.current!);

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        soundEffects.playSelect();
        onOpenAirport?.();
      });

      airportMarkerRef.current = marker;
    }
  }, [currentCity.airport, currentCity.monsters, student.defeatedMonsterIds, onOpenAirport]);

  // Render & Update Monster Markers (Scaled and optimized for 20 mobs)
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    Object.values(monsterMarkersRef.current).forEach(marker => marker.remove());
    monsterMarkersRef.current = {};

    currentCity.monsters.forEach(monster => {
      const isDefeated = student.defeatedMonsterIds.includes(monster.id);
      const markerHtml = generateMobModelHtml(monster, isDefeated, false);

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-monster-marker',
        iconSize: [40, 52],
        iconAnchor: [20, 44]
      });

      const sim = mobSimRef.current.get(monster.id);
      const pos = sim ? [sim.lat, sim.lng] as [number, number] : monster.position;

      const marker = L.marker(pos, { icon: customIcon, zIndexOffset: isDefeated ? 100 : 500 })
        .addTo(mapInstanceRef.current!);

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        soundEffects.playSelect();
        onSelectMonster(monster);
      });

      monsterMarkersRef.current[monster.id] = marker;
    });
  }, [currentCity.monsters, student.defeatedMonsterIds, onSelectMonster]);

  // Render & Update Multiplayer Remote Players
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const cityPlayers = multiplayerPlayers.filter(p => p.cityIndex === cityIndex);
    const activeIds = new Set(cityPlayers.map(p => p.id));

    Object.keys(remotePlayerMarkersRef.current).forEach(id => {
      if (!activeIds.has(id)) {
        remotePlayerMarkersRef.current[id].remove();
        delete remotePlayerMarkersRef.current[id];
      }
    });

    cityPlayers.forEach(player => {
      const isMale = player.avatar === 'boy';
      const playerHtml = `
        <div class="relative flex flex-col items-center cursor-pointer group transform transition-transform hover:scale-115">
          ${player.currentEmote ? `
            <div class="absolute -top-12 z-30 px-2 py-1 rounded-2xl bg-white border-2 border-slate-900 text-slate-900 text-xs font-black shadow-2xl flex items-center gap-1 animate-bounce whitespace-nowrap">
              <span class="text-sm">${player.currentEmote.emoji}</span>
              ${player.currentEmote.text ? `<span class="text-[10px] font-bold text-slate-700">${player.currentEmote.text}</span>` : ''}
              <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r-2 border-b-2 border-slate-900"></div>
            </div>
          ` : ''}

          <div class="relative w-8 h-8 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-sm" style="background-color: ${player.clothingColor || '#38bdf8'}">
            <span>${isMale ? '👦' : '👧'}</span>
            <div class="absolute -bottom-1 -right-1 px-1 rounded-full bg-amber-400 text-slate-950 font-black text-[7px] border border-white shadow">
              ${player.level}
            </div>
          </div>

          <div class="px-1.5 py-0.5 mt-0.5 rounded-full bg-slate-900/95 border border-sky-400/60 text-[8px] font-bold text-sky-200 shadow flex items-center gap-1 max-w-[120px]" title="${player.name}">
            <span class="truncate max-w-[80px] leading-tight">${player.name}</span>
          </div>
        </div>
      `;

      const remoteIcon = L.divIcon({
        html: playerHtml,
        className: 'custom-remote-player-marker',
        iconSize: [34, 42],
        iconAnchor: [17, 36],
      });

      const existingMarker = remotePlayerMarkersRef.current[player.id];
      if (existingMarker) {
        existingMarker.setLatLng([player.pos.lat, player.pos.lng]);
        existingMarker.setIcon(remoteIcon);
      } else {
        const marker = L.marker([player.pos.lat, player.pos.lng], {
          icon: remoteIcon,
          zIndexOffset: 800,
        }).addTo(mapInstanceRef.current!);

        marker.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          soundEffects.playSelect();
          onSelectRemotePlayer?.(player);
        });

        remotePlayerMarkersRef.current[player.id] = marker;
      }
    });
  }, [multiplayerPlayers, cityIndex, onSelectRemotePlayer]);

  // Sync local player position with multiplayer server
  useEffect(() => {
    onSendMovement?.(
      { lat: playerPosition[0], lng: playerPosition[1] },
      facingDirection === 'W' ? 'left' : facingDirection === 'E' ? 'right' : facingDirection === 'N' ? 'up' : 'down',
      student.activeVehicle
    );
  }, [playerPosition, facingDirection, student.activeVehicle, onSendMovement]);

  // 60FPS Silky-Smooth Continuous Walking & Autonomous Mob Roaming Physics Engine
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let lastSyncTime = 0;
    let lastMobWanderTime = 0;

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);

      const dt = Math.min(0.04, (now - lastTime) / 1000);
      lastTime = now;

      // Stop walking if in battle
      if (activeMonster) {
        if (isWalking) setIsWalking(false);
        velRef.current = { x: 0, y: 0 };
        return;
      }

      const keys = keysDownRef.current;
      const joy = joystickVectorRef.current;

      let targetKx = 0;
      let targetKy = 0;
      if (keys.has('d') || keys.has('arrowright')) targetKx += 1;
      if (keys.has('a') || keys.has('arrowleft')) targetKx -= 1;
      if (keys.has('w') || keys.has('arrowup')) targetKy += 1;
      if (keys.has('s') || keys.has('arrowdown')) targetKy -= 1;

      let targetVx = targetKx + (joy ? joy.x : 0);
      let targetVy = targetKy + (joy ? -joy.y : 0);
      const targetMag = Math.hypot(targetVx, targetVy);

      if (targetMag > 1) {
        targetVx /= targetMag;
        targetVy /= targetMag;
      }

      // Smooth Physics Acceleration & Organic Deceleration Friction
      const accelRate = targetMag > 0.05 ? 14.0 : 9.0;
      velRef.current.x += (targetVx - velRef.current.x) * Math.min(1, accelRate * dt);
      velRef.current.y += (targetVy - velRef.current.y) * Math.min(1, accelRate * dt);

      const curSpeed = Math.hypot(velRef.current.x, velRef.current.y);

      if (curSpeed > 0.03) {
        // Base street walking speed scaled by vehicle multiplier
        const maxSpeed = 0.00065 * (activeVehicleOption.speedMultiplier || 1.0);
        const dLat = velRef.current.y * maxSpeed * dt;
        const dLng = velRef.current.x * maxSpeed * dt;

        const bounds = computeCityBounds(currentCity);
        const [curLat, curLng] = playerPosRef.current;

        const nextLat = Math.max(bounds.minLat, Math.min(bounds.maxLat, curLat + dLat));
        const nextLng = Math.max(bounds.minLng, Math.min(bounds.maxLng, curLng + dLng));
        const nextPos: [number, number] = [nextLat, nextLng];
        playerPosRef.current = nextPos;

        if (playerMarkerRef.current) {
          playerMarkerRef.current.setLatLng(nextPos);
        }

        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo(nextPos, { animate: false });
        }

        // Update facing direction
        let dir: 'N' | 'S' | 'E' | 'W' = facingDirection;
        if (Math.abs(velRef.current.y) >= Math.abs(velRef.current.x)) {
          dir = velRef.current.y >= 0 ? 'N' : 'S';
        } else {
          dir = velRef.current.x >= 0 ? 'E' : 'W';
        }
        setFacingDirection(dir);

        if (!isWalking) {
          setIsWalking(true);
        }

        if (now - lastSyncTime > 60) {
          lastSyncTime = now;
          setPlayerPosition(nextPos);
        }
      } else {
        if (isWalking) {
          setIsWalking(false);
          setPlayerPosition(playerPosRef.current);
        }
      }

      // AUTONOMOUS MOB ROAMING SIMULATION (Mobs actively move on their own along streets!)
      const deltaMobSec = lastMobWanderTime === 0 ? 0.016 : Math.min(0.06, (now - lastMobWanderTime) / 1000);
      lastMobWanderTime = now;
      const [pLat, pLng] = playerPosRef.current;

      currentCity.monsters.forEach((m, mIdx) => {
        if (student.defeatedMonsterIds.includes(m.id)) return;

        let sim = mobSimRef.current.get(m.id);
        if (!sim) {
          sim = {
            lat: m.position[0],
            lng: m.position[1],
            anchorLat: m.position[0],
            anchorLng: m.position[1],
            targetLat: m.position[0],
            targetLng: m.position[1],
            isFacingLeft: false,
            speed: 0.00032 + ((mIdx % 4) * 0.00006),
            nextWanderTime: now + 500 + Math.random() * 2000
          };
          mobSimRef.current.set(m.id, sim);
        }

        // Pick new waypoint if time reached or monster is close to current target
        const dLatTarget = sim.targetLat - sim.lat;
        const dLngTarget = sim.targetLng - sim.lng;
        const distTarget = Math.hypot(dLatTarget, dLngTarget);

        if (now > sim.nextWanderTime || distTarget < 0.00015) {
          const wanderRadius = 0.0035; // ~350 meters
          const randAngle = Math.random() * Math.PI * 2;
          const randDist = (0.25 + Math.random() * 0.75) * wanderRadius;
          sim.targetLat = sim.anchorLat + Math.sin(randAngle) * randDist;
          sim.targetLng = sim.anchorLng + Math.cos(randAngle) * randDist;
          sim.speed = 0.00030 + (Math.random() * 0.00025);
          sim.nextWanderTime = now + 4000 + Math.random() * 4500;
        }

        // Smoothly interpolate towards target
        const dLat = sim.targetLat - sim.lat;
        const dLng = sim.targetLng - sim.lng;
        const dist = Math.hypot(dLat, dLng);

        if (dist > 0.00006) {
          const step = Math.min(dist, sim.speed * deltaMobSec);
          sim.lat += (dLat / dist) * step;
          sim.lng += (dLng / dist) * step;
          const newFacingLeft = dLng < 0;

          const marker = monsterMarkersRef.current[m.id];
          if (marker) {
            marker.setLatLng([sim.lat, sim.lng]);
            if (newFacingLeft !== sim.isFacingLeft) {
              sim.isFacingLeft = newFacingLeft;
              const isDef = student.defeatedMonsterIds.includes(m.id);
              marker.setIcon(L.divIcon({
                html: generateMobModelHtml(m, isDef, sim.isFacingLeft),
                className: 'custom-monster-marker',
                iconSize: [40, 52],
                iconAnchor: [20, 44]
              }));
            }
          }
        }

        // Check encounter collision with player
        const distToPlayerLat = Math.abs(sim.lat - pLat);
        const distToPlayerLng = Math.abs(sim.lng - pLng);
        if (distToPlayerLat < 0.00060 && distToPlayerLng < 0.00060) {
          soundEffects.playSelect();
          onSelectMonster(m);
          keysDownRef.current.clear();
          velRef.current = { x: 0, y: 0 };
          joystickVectorRef.current = null;
        }
      });
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [activeMonster, currentCity, activeVehicleOption, student.defeatedMonsterIds, onSelectMonster, isWalking, facingDirection]);

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      const key = e.key.toLowerCase();
      if (key === 'p') {
        e.preventDefault();
        try { soundEffects.playPhoneRing(); } catch {}
        onOpenPhone();
        return;
      }
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault();
        keysDownRef.current.add(key);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysDownRef.current.delete(key);
    };

    const handleBlur = () => {
      keysDownRef.current.clear();
      velRef.current = { x: 0, y: 0 };
      joystickVectorRef.current = null;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [onOpenPhone]);

  // Controls helpers
  const handleZoomIn = () => {
    if (mapInstanceRef.current && mapInstanceRef.current.getZoom() < 18) {
      mapInstanceRef.current.zoomIn();
      soundEffects.playSelect();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current && mapInstanceRef.current.getZoom() > 11) {
      mapInstanceRef.current.zoomOut();
      soundEffects.playSelect();
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
        
        {/* Left Cluster: City Badge + Weather + Trainer XP Bar */}
        <div className="pointer-events-auto flex items-center flex-wrap gap-2">
          {/* City Badge */}
          <div className="flex items-center gap-2.5 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl px-3 py-2 shadow-2xl">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow font-black text-xs">
              {cityIndex + 1}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
                  {currentCity.name}
                </h2>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                  {cityIndex + 1}/{totalCities}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden md:block truncate max-w-[150px]">
                {currentCity.country}
              </p>
            </div>
          </div>

          {/* Dynamic Weather Widget */}
          <CityWeatherWidget
            currentWeather={effectiveWeather}
            tempUnit={tempUnit}
            onOpenPhoneWeather={onOpenPhone}
          />

          {/* Trainer Level & XP Progress Bar (Lv. 1 - Lv. 1000) */}
          <TrainerXpBar
            xp={student.xp}
            level={student.level}
            avatarIcon={student.appearance?.avatar || '👦'}
            name={student.name}
            onOpenMastery={onOpenMastery}
          />
        </div>

        {/* Center Cluster: Fast Travel, Airport, Final Boss */}
        <div className="pointer-events-auto flex items-center flex-wrap gap-2">
          {/* City Express Lines Button */}
          <button
            id="open-city-express-lines-btn"
            onClick={() => {
              soundEffects.playSelect();
              onOpenTransitHub();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 border border-sky-400/60 text-white text-xs font-black shadow-lg shadow-sky-500/20 transition active:scale-95 cursor-pointer shrink-0"
            title="Open City Express Lines Rapid Transit Hub"
          >
            <Train className="w-4 h-4 text-sky-200 shrink-0" />
            <span className="hidden sm:inline">Express Lines</span>
          </button>

          {/* Physical Airport Terminal Shortcut */}
          {onOpenAirport && (
            <button
              id="open-airport-terminal-btn"
              onClick={() => {
                soundEffects.playSelect();
                onOpenAirport();
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-black shadow-lg transition active:scale-95 cursor-pointer shrink-0 ${
                allDefeated
                  ? 'bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 border-emerald-400 text-white shadow-emerald-500/20 animate-pulse'
                  : 'bg-slate-900/95 hover:bg-slate-800 border-slate-700/80 text-slate-300'
              }`}
              title={allDefeated ? `Airport Runway Cleared! Ready to fly to ${secondCity.name}` : `Airport Terminal (${defeatedCount}/${totalMonsters} Monsters Cleared - Finish city to fly)`}
            >
              <Plane className={`w-4 h-4 shrink-0 ${allDefeated ? 'text-emerald-300' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Airport</span>
              {!allDefeated ? (
                <span className="text-[10px] text-amber-400 font-mono bg-amber-950/60 px-1 rounded border border-amber-500/30">
                  {defeatedCount}/{totalMonsters}
                </span>
              ) : (
                <span className="text-[10px] text-emerald-300 font-mono bg-emerald-950/60 px-1 rounded border border-emerald-500/40">
                  FLY ✈️
                </span>
              )}
            </button>
          )}

          {/* Final Boss Portal Button */}
          <button
            id="open-final-boss-btn"
            onClick={() => {
              soundEffects.playSelect();
              onSelectMonster(FINAL_BOSS_MONSTER);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-purple-800 via-indigo-700 to-amber-500 hover:from-purple-700 hover:to-amber-400 border-2 border-amber-300 text-white text-xs font-black shadow-xl shadow-purple-900/40 transition active:scale-95 cursor-pointer shrink-0 animate-pulse"
            title="Challenge the Final Boss: The Grand Lexicon Archon (Super Hard C2 Questions!)"
          >
            <Crown className="w-4 h-4 text-amber-300 animate-bounce" />
            <span className="hidden sm:inline">FINAL BOSS</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black font-mono">
              Lv.1000
            </span>
          </button>
          {/* Run Away Button */}
          <button
            id="open-run-away-btn"
            onClick={handleRunAwayToRandomSpot}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 border border-rose-400/80 text-white text-xs font-black shadow-lg shadow-rose-600/30 transition active:scale-95 cursor-pointer shrink-0"
            title="Run Away! Sprint to a random spot across the city!"
          >
            <Footprints className="w-4 h-4 text-rose-200 shrink-0" />
            <span>Run Away</span>
          </button>
        </div>

        {/* Right Cluster: Phone, Settings (with Daily Missions), Defeated Counter */}
        <div className="pointer-events-auto flex items-center flex-wrap gap-2">
          {/* Smartphone App Button */}
          <button
            id="open-smartphone-btn"
            onClick={() => {
              try { soundEffects.playPhoneRing(); } catch {}
              onOpenPhone();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-purple-600/90 to-indigo-600/90 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/60 text-white text-xs font-bold shadow-lg shadow-purple-500/20 transition cursor-pointer active:scale-95 animate-pulse"
            title="Open Smartphone (Call Taxi, Buy Tickets, Switch Models)"
          >
            <Smartphone className="w-4 h-4 text-purple-200" />
            <span>📱 Phone</span>
            <span className="hidden xl:inline text-[9px] text-purple-200 font-mono bg-purple-950/60 px-1 rounded">P</span>
          </button>

          {/* Daily Missions Direct Shortcut Button */}
          <button
            id="open-daily-missions-btn"
            onClick={() => {
              soundEffects.playSelect();
              setSettingsTab('missions');
              setShowSettingsModal(true);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-black shadow-lg transition active:scale-95 cursor-pointer shrink-0 ${
              hasUnclaimedMissions
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 border-amber-300 text-slate-950 animate-pulse'
                : 'bg-slate-900/95 hover:bg-slate-800 border-slate-700/80 text-amber-300'
            }`}
            title="Daily Educational Missions (Check in Settings tab)"
          >
            <Target className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Missions</span>
            {hasUnclaimedMissions && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
            )}
          </button>

          {/* Settings Button (opens settings & missions modal) */}
          <button
            id="header-settings-btn"
            onClick={() => {
              soundEffects.playSelect();
              setSettingsTab('settings');
              setShowSettingsModal(true);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-900/95 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-400 text-slate-200 hover:text-white text-xs font-bold shadow-xl transition cursor-pointer active:scale-95 relative group"
            title="Game Settings, Audio, Radar & Daily Missions"
          >
            <SettingsIcon className="w-4 h-4 text-slate-400 group-hover:text-sky-300 transition" />
            <span className="hidden sm:inline">Settings</span>
            {(hasUnclaimedMissions || !isDailyRewardClaimed) && (
              <span className="w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-900 animate-ping inline-block" />
            )}
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
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 border border-emerald-300 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/30 transition active:scale-95 cursor-pointer animate-pulse"
              title={`Board Flight to ${secondCity.name} (${secondCity.country})`}
            >
              <Plane className="w-4 h-4" />
              <span>Fly to {secondCity.name}</span>
            </button>
          )}
        </div>
      </header>

      {/* Run Away Escape Notification Toast */}
      {runAwayNotification && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[450] pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 py-2.5 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-rose-500/60 shadow-2xl flex items-center gap-2.5 text-white ring-2 ring-rose-500/20">
            <span className="text-xl animate-bounce">🏃💨</span>
            <div>
              <div className="text-[10px] uppercase font-black tracking-wider text-rose-400">
                Ran Away!
              </div>
              <div className="text-xs font-bold text-white">
                {runAwayNotification}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. LEAFLET MAP CANVAS CONTAINER */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full z-0 cursor-default"
      />

      {/* 2b. DYNAMIC WEATHER AMBIANCE & PARTICLE OVERLAY */}
      <CityWeatherOverlay
        weather={effectiveWeather}
      />

      {/* 3. REAL-TIME MINI-MAP OVERLAY */}
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
            multiplayerPlayers={multiplayerPlayers.filter(p => p.cityIndex === cityIndex)}
            onPanToLocation={(coords) => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.panTo(coords, { animate: true, duration: 0.3 });
                soundEffects.playSelect();
              }
            }}
          />
        </aside>
      )}

      {/* 4. TOUCH CONTROLS FOR MOBILE */}
      <div className="absolute bottom-6 left-4 z-[400] pointer-events-auto block md:hidden">
        <VirtualJoystick 
          onMove={() => {}} 
          onVectorChange={(vec) => {
            joystickVectorRef.current = vec;
          }}
          speedMultiplier={activeVehicleOption.speedMultiplier}
        />
      </div>

      {/* 5. FLOATING MAP CONTROLS DOCK */}
      <aside aria-label="Map Controls" className="absolute bottom-6 right-4 z-[400] flex flex-col gap-2.5 pointer-events-auto">
        
        {/* Card 1: View Modes & Audio & Tips Toggle */}
        <div className="flex flex-col rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/95 backdrop-blur-md shadow-2xl p-1 gap-1">
          {/* Street / Satellite Toggle */}
          <button
            onClick={() => {
              setMapStyle(mapStyle === 'streets' ? 'satellite' : 'streets');
              soundEffects.playSelect();
            }}
            className="w-9 h-9 rounded-xl hover:bg-slate-800 text-slate-200 shadow flex items-center justify-center transition cursor-pointer active:scale-95"
            title={`Switch to ${mapStyle === 'streets' ? 'Satellite' : 'Road'} View`}
          >
            <Layers className="w-4 h-4 text-sky-400" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className="w-9 h-9 rounded-xl hover:bg-slate-800 text-slate-200 shadow flex items-center justify-center transition cursor-pointer active:scale-95"
            title={isMuted ? 'Unmute Game Sounds' : 'Mute Sounds'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Controls Tips Peek Toggle */}
          <button
            onClick={() => {
              soundEffects.playSelect();
              setShowControlsTips(prev => {
                const next = !prev;
                try {
                  localStorage.setItem('wq_hide_controls_tips', next ? 'false' : 'true');
                } catch {}
                return next;
              });
            }}
            className={`w-9 h-9 rounded-xl shadow flex items-center justify-center transition cursor-pointer active:scale-95 ${
              showControlsTips ? 'bg-amber-500/20 text-amber-300' : 'hover:bg-slate-800 text-slate-400 hover:text-amber-300'
            }`}
            title={showControlsTips ? 'Hide Controls Tips Banner' : 'Show Controls Tips Banner'}
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Card 2: Camera Navigation & Settings */}
        <div className="flex flex-col rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/95 backdrop-blur-md shadow-2xl p-1 gap-1">
          {/* Recenter on Trainer GPS */}
          <button
            onClick={handleRecenter}
            className="w-9 h-9 rounded-xl hover:bg-slate-800 text-sky-400 shadow flex items-center justify-center transition cursor-pointer active:scale-95"
            title="Recenter on Trainer"
          >
            <Crosshair className="w-4 h-4" />
          </button>

          {/* Fit Full Metropolis Overview Button */}
          <button
            id="map-fit-metropolis-btn"
            onClick={() => {
              if (mapInstanceRef.current) {
                const bounds = computeCityBounds(currentCity);
                mapInstanceRef.current.fitBounds(bounds.latLngBounds, { padding: [40, 40], duration: 1.2 });
                soundEffects.playSelect();
              }
            }}
            className="w-9 h-9 rounded-xl hover:bg-slate-800 text-amber-400 shadow flex items-center justify-center transition cursor-pointer active:scale-95"
            title="Fit Full Metropolis Overview (See all scattered sectors & mobs)"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Run Away to Random Spot Button */}
          <button
            id="map-floating-run-away-btn"
            onClick={handleRunAwayToRandomSpot}
            className="w-9 h-9 rounded-xl hover:bg-rose-950/60 text-rose-400 hover:text-rose-300 shadow flex items-center justify-center transition cursor-pointer active:scale-95"
            title="Run Away (Sprint to a Random Spot in the City!)"
          >
            <Footprints className="w-4 h-4" />
          </button>

          {/* Quick Settings Button with notification badge */}
          <button
            id="map-floating-settings-btn"
            onClick={() => {
              soundEffects.playSelect();
              setSettingsTab('settings');
              setShowSettingsModal(true);
            }}
            className="w-9 h-9 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-sky-300 shadow flex items-center justify-center transition cursor-pointer active:scale-95 relative"
            title="Game Settings & Daily Missions"
          >
            <SettingsIcon className="w-4 h-4" />
            {(hasUnclaimedMissions || !isDailyRewardClaimed) && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-900 animate-ping" />
            )}
          </button>
        </div>

        {/* Card 3: Zoom In & Out */}
        <div className="flex flex-col rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/95 backdrop-blur-md shadow-2xl p-1 gap-1">
          <button
            onClick={handleZoomIn}
            disabled={currentZoom >= 18}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition cursor-pointer ${
              currentZoom >= 18 ? 'opacity-30 cursor-not-allowed text-slate-500' : 'text-slate-200 hover:bg-slate-800 active:scale-95'
            }`}
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            disabled={currentZoom <= 11}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition cursor-pointer ${
              currentZoom <= 11 ? 'opacity-30 cursor-not-allowed text-slate-500' : 'text-slate-200 hover:bg-slate-800 active:scale-95'
            }`}
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* 6. INSTRUCTION BANNER & VERSION TAG */}
      <footer className="absolute bottom-4 left-4 right-16 sm:right-auto z-[390] pointer-events-none flex flex-col sm:flex-row items-start sm:items-center gap-2">
        {showControlsTips && (
          <div className="pointer-events-auto max-w-sm p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700/80 text-slate-200 text-xs shadow-2xl flex items-start gap-3 transition-all animate-in fade-in duration-200">
            <div className="p-1.5 rounded-xl bg-amber-400/15 text-amber-400 border border-amber-400/30 shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="leading-relaxed flex-1 pr-1">
              <div className="font-bold text-white text-xs mb-0.5 flex items-center gap-1.5">
                <span>Controls Guide</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono">WASD</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal">
                Hold <strong>W, A, S, D</strong> to walk with smooth momentum. Mobs actively roam the streets and lurk in monuments! Clear all monsters to unlock the <strong>Airport</strong>!
              </p>
            </div>
            <button
              onClick={() => {
                soundEffects.playSelect();
                setShowControlsTips(false);
                try {
                  localStorage.setItem('wq_hide_controls_tips', 'true');
                } catch {}
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer shrink-0"
              title="Close Controls Tips (Reopen anytime from Settings or ? button)"
              aria-label="Close controls tips"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <button
          onClick={() => {
            soundEffects.playSelect();
            if (onOpenUpdateLogs) {
              onOpenUpdateLogs();
            } else {
              setShowUpdateLogsModal(true);
            }
          }}
          className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/95 hover:bg-slate-800 backdrop-blur-sm border border-slate-750 hover:border-sky-400 text-[10px] font-mono text-slate-400 hover:text-sky-300 shadow transition cursor-pointer group"
          title="Click to view Lexiroam Update Logs & Release Notes"
        >
          <span>Lexiroam</span>
          <span className="text-sky-400 font-bold group-hover:underline">v{APP_VERSION}</span>
        </button>
      </footer>

      {/* 7. SETTINGS MODAL */}
      {showSettingsModal && (
        <SettingsModal
          initialTab={settingsTab}
          showMiniMap={showMiniMap}
          onToggleMiniMap={handleToggleMiniMap}
          isMuted={isMuted}
          onToggleMute={onToggleMute}
          tempUnit={tempUnit}
          onToggleTempUnit={onToggleTempUnit}
          showControlsTips={showControlsTips}
          onToggleControlsTips={() => {
            setShowControlsTips(prev => {
              const next = !prev;
              try {
                localStorage.setItem('wq_hide_controls_tips', next ? 'false' : 'true');
              } catch {}
              return next;
            });
          }}
          student={student}
          onRewardClaimed={onRewardClaimed}
          onOpenSaveSystem={onOpenSaveSystem}
          onResetClick={onResetClick}
          onOpenUpdateLogs={() => {
            setShowSettingsModal(false);
            if (onOpenUpdateLogs) onOpenUpdateLogs();
            else setShowUpdateLogsModal(true);
          }}
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {/* 8. UPDATE LOGS MODAL */}
      {showUpdateLogsModal && (
        <UpdateLogsModal onClose={() => setShowUpdateLogsModal(false)} />
      )}
    </div>
  );
};
