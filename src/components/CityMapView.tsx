import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { CityData, Monster, StudentProfile, TransitStation, VehicleType } from '../types';
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
  BookOpen,
  RotateCcw,
  Navigation,
  Smartphone
} from 'lucide-react';

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
  onOpenLessonGuide: () => void;
  onOpenTransitHub: (station?: TransitStation) => void;
  onOpenPhone: () => void;
  onSelectVehicle?: (vehicle: VehicleType) => void;
  onResetClick: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

// Helper to bound player and map strictly inside the city district
const computeCityBounds = (city: CityData): L.LatLngBounds => {
  const points: [number, number][] = [
    city.coordinates, 
    ...city.monsters.map(m => m.position),
    ...(city.stations || []).map(s => s.position)
  ];
  const lats = points.map(p => p[0]);
  const lngs = points.map(p => p[1]);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  return L.latLngBounds(
    [minLat - 0.04, minLng - 0.05],
    [maxLat + 0.04, maxLng + 0.05]
  );
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
  onOpenLessonGuide,
  onOpenTransitHub,
  onOpenPhone,
  onSelectVehicle,
  onResetClick,
  isMuted,
  onToggleMute
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const playerMarkerRef = useRef<L.Marker | null>(null);
  const monsterMarkersRef = useRef<{ [id: string]: L.Marker }>({});
  const stationMarkersRef = useRef<{ [id: string]: L.Marker }>({});
  const trafficMarkersRef = useRef<{ [id: string]: L.Marker }>({});
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Player coordinates in the current city
  const [playerPosition, setPlayerPosition] = useState<[number, number]>(currentCity.coordinates);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets');
  const [facingDirection, setFacingDirection] = useState<'N' | 'S' | 'E' | 'W'>('N');
  const [isWalking, setIsWalking] = useState<boolean>(false);
  const [currentZoom, setCurrentZoom] = useState<number>(Math.max(currentCity.zoom || 15, 14));
  const walkingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check how many monsters in this city are defeated
  const defeatedCount = currentCity.monsters.filter(m => 
    student.defeatedMonsterIds.includes(m.id)
  ).length;
  const totalMonsters = currentCity.monsters.length;
  const allDefeated = defeatedCount >= totalMonsters && totalMonsters > 0;

  // Find active vehicle details
  const activeVehicleOption = VEHICLE_OPTIONS.find(v => v.type === student.activeVehicle) || VEHICLE_OPTIONS[0];

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
        maxBounds: cityBounds,
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
      mapInstanceRef.current.setMaxBounds(cityBounds);
      mapInstanceRef.current.setMinZoom(14);
      mapInstanceRef.current.setMaxZoom(18);
      mapInstanceRef.current.setView(currentCity.coordinates, initialZoom);
      setCurrentZoom(initialZoom);
      setPlayerPosition(currentCity.coordinates);
    }
  }, [currentCity.id]);

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

  // Ambient City Street Traffic Simulation (Cars, Taxis, Buses, Trains moving along roads)
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    Object.values(trafficMarkersRef.current).forEach(m => m.remove());
    trafficMarkersRef.current = {};

    const baseLat = currentCity.coordinates[0];
    const baseLng = currentCity.coordinates[1];

    const trafficVehicles = [
      {
        id: 'traffic-cab',
        name: 'City Taxi',
        icon: '🚕',
        color: 'bg-amber-400 text-slate-950',
        offset: [0.0032, -0.0035],
        delta: [0.00010, 0.00016],
        type: 'taxi' as VehicleType
      },
      {
        id: 'traffic-bus',
        name: 'Transit Bus',
        icon: '🚌',
        color: 'bg-emerald-500 text-white',
        offset: [-0.0035, 0.0022],
        delta: [-0.00012, 0.00014],
        type: 'bus' as VehicleType
      },
      {
        id: 'traffic-car',
        name: 'Roadster Car',
        icon: '🚗',
        color: 'bg-red-500 text-white',
        offset: [0.0018, 0.0042],
        delta: [0.00014, -0.00016],
        type: 'car' as VehicleType
      },
      {
        id: 'traffic-train',
        name: 'Express Rail',
        icon: '🚅',
        color: 'bg-indigo-600 text-white',
        offset: [-0.0022, -0.0050],
        delta: [0.00022, 0.00008],
        type: 'bullet_train' as VehicleType
      }
    ];

    let step = 0;
    const markers: { [id: string]: L.Marker } = {};

    trafficVehicles.forEach((veh, index) => {
      const pos: [number, number] = [
        baseLat + veh.offset[0],
        baseLng + veh.offset[1]
      ];

      const html = `
        <div class="relative flex flex-col items-center cursor-pointer group hover:scale-125 transition-transform" title="Click to board ${veh.name}">
          <div class="w-6 h-6 rounded-lg ${veh.color} border border-white/80 shadow-md flex items-center justify-center text-xs shadow-black/40">
            <span>${veh.icon}</span>
          </div>
          <div class="text-[7px] font-bold text-white bg-slate-900/90 px-1 rounded shadow-sm whitespace-nowrap mt-0.5 border border-slate-700">
            ${veh.name}
          </div>
        </div>
      `;

      const icon = L.divIcon({
        html,
        className: 'custom-traffic-marker',
        iconSize: [26, 36],
        iconAnchor: [13, 26]
      });

      const m = L.marker(pos, { icon, zIndexOffset: 250 }).addTo(mapInstanceRef.current!);
      m.on('click', () => {
        soundEffects.playHonk();
        if (onSelectVehicle) {
          onSelectVehicle(veh.type);
        } else {
          onOpenPhone();
        }
      });

      markers[veh.id] = m;
    });

    trafficMarkersRef.current = markers;

    const interval = setInterval(() => {
      step++;
      trafficVehicles.forEach((veh, idx) => {
        const marker = markers[veh.id];
        if (!marker) return;
        const oscillation = Math.sin((step * 0.12) + (idx * 1.6));
        const newLat = baseLat + veh.offset[0] + (veh.delta[0] * oscillation * 6);
        const newLng = baseLng + veh.offset[1] + (veh.delta[1] * oscillation * 6);
        marker.setLatLng([newLat, newLng]);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      Object.values(markers).forEach(m => m.remove());
      trafficMarkersRef.current = {};
    };
  }, [currentCity.coordinates, onSelectVehicle, onOpenPhone]);

  // WASD MOVEMENT HANDLER (With active vehicle speed multiplier)
  const moveTrainer = useCallback((dir: 'W' | 'A' | 'S' | 'D') => {
    // If in battle, ignore movement
    if (activeMonster) return;

    // Base step multiplied by vehicle speed (e.g. 1.8x bicycle, 2.6x taxi, 3.5x subway, 5.0x train)
    const multiplier = activeVehicleOption.speedMultiplier || 1.0;
    const STEP = 0.00045 * multiplier;

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

      // Check proximity to any undefeated monster
      const newPos: [number, number] = [lat, lng];
      currentCity.monsters.forEach(m => {
        if (!student.defeatedMonsterIds.includes(m.id)) {
          const dLat = Math.abs(m.position[0] - lat);
          const dLng = Math.abs(m.position[1] - lng);
          if (dLat < 0.0007 && dLng < 0.0007) {
            // Walked directly into monster! Start battle
            soundEffects.playSelect();
            onSelectMonster(m);
          }
        }
      });

      // Pan map smoothly if player gets near edges
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo(newPos, { animate: true, duration: 0.15 });
      }

      return newPos;
    });

    setIsWalking(true);
    if (walkingTimerRef.current) clearTimeout(walkingTimerRef.current);
    walkingTimerRef.current = setTimeout(() => setIsWalking(false), 200);
  }, [activeMonster, currentCity.monsters, student.defeatedMonsterIds, onSelectMonster, activeVehicleOption]);

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

          {/* Lesson Guide Button */}
          <button
            onClick={onOpenLessonGuide}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-lg transition cursor-pointer"
            title="Open City English Lesson & Grammar Rules"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">English Lesson</span>
          </button>
        </div>

        {/* Center/Right: Vehicle Switcher & Transit Hub Pill */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Active Vehicle Status & Quick Change */}
          <button
            onClick={() => onOpenTransitHub()}
            className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700 hover:border-sky-400 text-white text-xs font-bold shadow-xl transition cursor-pointer"
            title="Switch Vehicle (Walk, Bicycle, Bus, Taxi, Car, Subway, Train)"
          >
            <span className="text-lg">{activeVehicleOption.icon}</span>
            <span className="hidden md:inline">{activeVehicleOption.name}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-sky-300 font-mono">
              {activeVehicleOption.speedMultiplier}x
            </span>
          </button>

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

          {/* Reset Button (Requested by User) */}
          <button
            onClick={onResetClick}
            className="flex items-center gap-1 px-2.5 py-2 rounded-2xl bg-red-500/15 hover:bg-red-500/30 border border-red-500/40 text-red-300 hover:text-red-200 text-xs font-bold transition cursor-pointer"
            title="Reset Adventure & Redo Character Setup"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </header>

      {/* 2. LEAFLET MAP CANVAS (NO click-to-walk on map; only clicking monsters triggers battle) */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full z-0 cursor-default"
      />

      {/* 3. ON-SCREEN WASD D-PAD CONTROLLER (BOTTOM-LEFT) */}
      <div className="absolute bottom-6 left-4 z-[400] pointer-events-auto flex flex-col items-center">
        <div className="p-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-2xl flex flex-col items-center gap-1.5">
          <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
            Walk / Drive (WASD)
          </div>

          {/* W Button */}
          <button
            onClick={() => moveTrainer('W')}
            className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 active:scale-90 border border-slate-600 text-slate-200 font-bold flex flex-col items-center justify-center transition shadow cursor-pointer"
            title="Walk North (W / Up)"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="text-[9px] -mt-0.5 font-mono">W</span>
          </button>

          {/* A, S, D Row */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => moveTrainer('A')}
              className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 active:scale-90 border border-slate-600 text-slate-200 font-bold flex flex-col items-center justify-center transition shadow cursor-pointer"
              title="Walk West (A / Left)"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[9px] -mt-0.5 font-mono">A</span>
            </button>

            <button
              onClick={() => moveTrainer('S')}
              className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 active:scale-90 border border-slate-600 text-slate-200 font-bold flex flex-col items-center justify-center transition shadow cursor-pointer"
              title="Walk South (S / Down)"
            >
              <ArrowDown className="w-4 h-4" />
              <span className="text-[9px] -mt-0.5 font-mono">S</span>
            </button>

            <button
              onClick={() => moveTrainer('D')}
              className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 active:scale-90 border border-slate-600 text-slate-200 font-bold flex flex-col items-center justify-center transition shadow cursor-pointer"
              title="Walk East (D / Right)"
            >
              <ArrowRight className="w-4 h-4" />
              <span className="text-[9px] -mt-0.5 font-mono">D</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. GOOGLE MAPS STYLE FLOATING CONTROLS (RIGHT-HAND SIDE) */}
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

      {/* 5. INSTRUCTION BANNER */}
      <footer className="absolute bottom-4 left-44 right-16 sm:right-auto z-[390] pointer-events-none hidden md:block">
        <div className="pointer-events-auto max-w-sm p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-200 text-xs shadow-xl flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Controls:</span> Press <strong>W, A, S, D</strong> or Arrow keys to steer your <strong>{activeVehicleOption.name}</strong>. Click monsters or stations on the road!
          </div>
        </div>
      </footer>
    </div>
  );
};
