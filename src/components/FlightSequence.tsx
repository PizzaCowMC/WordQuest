import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CityData, StudentProfile } from '../types';
import { soundEffects } from '../utils/audio';
import { 
  Plane, 
  Compass, 
  Sparkles, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Gauge, 
  Wind,
  ShieldAlert,
  ChevronRight,
  Eye,
  Camera,
  Maximize2
} from 'lucide-react';

interface FlightSequenceProps {
  currentCity: CityData;
  secondCity: CityData;
  cityIndex: number;
  totalCities: number;
  student: StudentProfile;
  onLandInSecondCity: (flightMinutes: number) => void;
  onClose: () => void;
}

export type CameraViewMode = 'chase' | 'window' | 'cockpit';

export const FlightSequence: React.FC<FlightSequenceProps> = ({
  currentCity,
  secondCity,
  cityIndex,
  totalCities,
  student,
  onLandInSecondCity,
  onClose
}) => {
  // Flight Stages: boarding -> takeoff_3d -> cruising_3d -> landing_3d -> arrived
  const [stage, setStage] = useState<'boarding' | 'takeoff_3d' | 'cruising_3d' | 'landing_3d' | 'arrived'>('boarding');
  const [cameraView, setCameraView] = useState<CameraViewMode>('chase');
  const [altitude, setAltitude] = useState(0); // in meters
  const [airSpeed, setAirSpeed] = useState(0); // in km/h
  const [distanceKm, setDistanceKm] = useState(8900);
  const [flightTimeMinutes, setFlightTimeMinutes] = useState(0);
  const [totalCostMinutes, setTotalCostMinutes] = useState(680);
  const [progressPercent, setProgressPercent] = useState(0);
  const [bankAngle, setBankAngle] = useState(0); // Aircraft banking in degrees
  const [pitchAngle, setPitchAngle] = useState(0);

  const isFinalCity = cityIndex + 1 >= totalCities;

  // Calculate approximate realistic flight time based on city coordinates
  useEffect(() => {
    const lat1 = currentCity.coordinates[0];
    const lon1 = currentCity.coordinates[1];
    const lat2 = secondCity.coordinates[0];
    const lon2 = secondCity.coordinates[1];
    
    // Haversine approximation
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = Math.max(1200, Math.round(6371 * c));
    setDistanceKm(dist);

    const minutes = Math.round((dist / 850) * 60 + 45);
    setTotalCostMinutes(minutes);
  }, [currentCity, secondCity]);

  const handleBeginFlight = () => {
    setStage('takeoff_3d');
    soundEffects.playFlightTakeoff();

    // Stage 1: Takeoff (0 - 2.8s)
    const startTime = Date.now();
    const takeoffDuration = 2800;

    const takeoffTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const prog = Math.min(1, elapsed / takeoffDuration);
      setAltitude(Math.round(prog * 3800));
      setAirSpeed(Math.round(prog * 620));
      setProgressPercent(Math.round(prog * 25));
      setFlightTimeMinutes(Math.round(prog * (totalCostMinutes * 0.25)));
      setPitchAngle(prog * 18);
      setBankAngle(Math.sin(prog * Math.PI) * 4);

      if (prog >= 1) {
        clearInterval(takeoffTimer);
        setStage('cruising_3d');
        startCruisingPhase();
      }
    }, 35);
  };

  const startCruisingPhase = () => {
    const startTime = Date.now();
    const cruisingDuration = 3800;

    const cruisingTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const prog = Math.min(1, elapsed / cruisingDuration);
      
      const currentAlt = 3800 + Math.round(prog * 7200); // 3,800m up to 11,000m cruise altitude
      setAltitude(currentAlt);
      setAirSpeed(850 + Math.round(Math.sin(elapsed / 300) * 15));
      setProgressPercent(25 + Math.round(prog * 50));
      setFlightTimeMinutes(Math.round((0.25 + prog * 0.5) * totalCostMinutes));
      setPitchAngle(2 + Math.sin(elapsed / 500) * 2);
      setBankAngle(Math.sin(elapsed / 400) * 6);

      if (prog >= 1) {
        clearInterval(cruisingTimer);
        setStage('landing_3d');
        startLandingPhase();
      }
    }, 35);
  };

  const startLandingPhase = () => {
    const startTime = Date.now();
    const landingDuration = 3200;

    const landingTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const prog = Math.min(1, elapsed / landingDuration);
      
      const currentAlt = Math.max(0, Math.round((1 - prog) * 11000));
      const currentSpeed = Math.round(850 - prog * 600);
      setAltitude(currentAlt);
      setAirSpeed(Math.max(160, currentSpeed));
      setProgressPercent(75 + Math.round(prog * 25));
      setFlightTimeMinutes(Math.round((0.75 + prog * 0.25) * totalCostMinutes));
      setPitchAngle(-8 * (1 - prog));
      setBankAngle(-Math.sin(prog * Math.PI) * 5);

      if (prog >= 1) {
        clearInterval(landingTimer);
        setStage('arrived');
        soundEffects.playVictory();

        try {
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
    }, 35);
  };

  const hours = Math.floor(totalCostMinutes / 60);
  const mins = totalCostMinutes % 60;
  const currentElapsedHours = Math.floor(flightTimeMinutes / 60);
  const currentElapsedMins = flightTimeMinutes % 60;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-950/90 backdrop-blur-lg p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-5 sm:p-7 text-white overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Sky Ambient Light */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/30 via-slate-900 to-slate-950 pointer-events-none" />

        {/* 1. BOARDING PASS STAGE */}
        {stage === 'boarding' && (
          <div className="relative z-10 space-y-5">
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                <CheckCircle className="w-3.5 h-3.5" />
                City {cityIndex + 1} of {totalCities} Conquered!
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Fredoka',sans-serif]">
                Boarding Flight to City #{cityIndex + 2}: {secondCity.name}! ✈️
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                International Jet Service: {currentCity.airport?.name || `${currentCity.name} International Airport`} ➔ {secondCity.airport?.name || `${secondCity.name} International Airport`}
              </p>
            </div>

            {/* Flight Ticket Card */}
            <div className="relative bg-slate-800/90 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center text-white font-bold text-xl shadow-md">
                    ✈️
                  </div>
                  <div>
                    <div className="text-xs font-black text-white uppercase tracking-wider">
                      WordQuest Airlines Global Route
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Flight WQ-{cityIndex + 1}0 • Passenger: {student.name} • Aircraft: B787-9 Dreamliner
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold text-xs">
                  FLIGHT #{cityIndex + 1} / {totalCities - 1}
                </span>
              </div>

              {/* Origin -> Destination Route */}
              <div className="grid grid-cols-3 items-center text-center py-2">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Departing</div>
                  <div className="text-base sm:text-xl font-extrabold text-white mt-0.5">
                    {currentCity.name}
                  </div>
                  <div className="text-xs text-sky-300 font-mono font-bold">
                    {currentCity.airport?.code || currentCity.name.substring(0, 3).toUpperCase()}
                  </div>
                  <div className="text-[11px] text-slate-400">{currentCity.country}</div>
                </div>

                <div className="flex flex-col items-center">
                  <Plane className="w-7 h-7 text-sky-400 transform rotate-90" />
                  <div className="w-full border-t-2 border-dashed border-sky-500/50 my-1"></div>
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Non-Stop Jet</span>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Arriving</div>
                  <div className="text-base sm:text-xl font-extrabold text-amber-400 mt-0.5">
                    {secondCity.name}
                  </div>
                  <div className="text-xs text-amber-300 font-mono font-bold">
                    {secondCity.airport?.code || secondCity.name.substring(0, 3).toUpperCase()}
                  </div>
                  <div className="text-[11px] text-slate-400">{secondCity.country}</div>
                </div>
              </div>

              {/* Flight Time Cost Highlight */}
              <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-amber-200">Flight Journey Time:</span>
                </div>
                <span className="text-xs font-mono font-black text-amber-300">
                  {hours}h {mins}m logged to passport ({distanceKm.toLocaleString()} km)
                </span>
              </div>

              {/* Passenger Credentials */}
              <div className="grid grid-cols-3 gap-2 border-t border-slate-700 pt-3 mt-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Trainer</span>
                  <strong className="text-white flex items-center gap-1">
                    <span>{student.appearance?.avatar || '🧒'}</span>
                    <span className="truncate">{student.name}</span>
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Companion</span>
                  <strong className="text-white">{student.starter.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Transit Record</span>
                  <strong className="text-emerald-400 font-mono">
                    {Math.floor((student.travelMinutesSpent || 0) / 60)}h logged
                  </strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                id="take-off-flight-btn"
                onClick={handleBeginFlight}
                className="flex-1 py-3.5 px-6 rounded-2xl font-black text-slate-950 bg-gradient-to-r from-sky-400 via-blue-400 to-sky-500 hover:from-sky-300 hover:to-blue-400 shadow-xl shadow-sky-500/20 text-sm sm:text-base flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Plane className="w-5 h-5" />
                <span>Begin Cinematic Flight to {secondCity.name}!</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="py-3 px-5 rounded-2xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold cursor-pointer"
              >
                Stay in {currentCity.name}
              </button>
            </div>
          </div>
        )}

        {/* 2. ENHANCED CINEMATIC AIRPLANE FOOTAGE (Takeoff, Cruising, Landing) */}
        {(stage === 'takeoff_3d' || stage === 'cruising_3d' || stage === 'landing_3d') && (
          <div className="relative z-10 py-3 space-y-4">
            
            {/* Stage Title & Camera Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider text-sky-400">
                  {stage === 'takeoff_3d' && '🛫 Runway Takeoff & Initial Climb'}
                  {stage === 'cruising_3d' && `✈️ High Altitude Jet Stream (${currentCity.name} ➔ ${secondCity.name})`}
                  {stage === 'landing_3d' && `🛬 Final Approach & Touchdown at ${secondCity.name}`}
                </span>
              </div>

              {/* Camera Switcher Buttons */}
              <div className="flex items-center gap-1.5 bg-slate-850 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setCameraView('chase')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                    cameraView === 'chase' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Chase Camera Angle"
                >
                  <Camera className="w-3 h-3" />
                  <span>Chase</span>
                </button>
                <button
                  onClick={() => setCameraView('window')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                    cameraView === 'window' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Passenger Window Wing View"
                >
                  <Eye className="w-3 h-3" />
                  <span>Wing Window</span>
                </button>
                <button
                  onClick={() => setCameraView('cockpit')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                    cameraView === 'cockpit' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Forward Cockpit Synthetic Vision"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Cockpit HUD</span>
                </button>
              </div>
            </div>

            {/* 3D AIRPLANE FOOTAGE VIEWPORT */}
            <div 
              className="relative w-full h-72 sm:h-84 rounded-3xl bg-slate-950 border border-slate-700/80 overflow-hidden flex items-center justify-center shadow-2xl select-none"
              style={{ perspective: '1200px' }}
            >
              {/* CAMERA VIEW 1: CHASE CAM */}
              {cameraView === 'chase' && (
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  
                  {/* Atmospheric Sky Background */}
                  <div 
                    className="absolute inset-0 transition-colors duration-1000"
                    style={{
                      background: stage === 'cruising_3d' 
                        ? 'linear-gradient(to bottom, #0369a1 0%, #0284c7 40%, #bae6fd 75%, #f0f9ff 100%)'
                        : 'linear-gradient(to bottom, #0f172a 0%, #1e293b 50%, #334155 100%)'
                    }}
                  />

                  {/* Parallax Ground Grid / Runway */}
                  {stage === 'takeoff_3d' && (
                    <div 
                      className="absolute inset-x-0 bottom-0 h-44 bg-slate-900 border-t-2 border-emerald-400"
                      style={{
                        transform: 'rotateX(62deg)',
                        transformOrigin: 'bottom center',
                        backgroundImage: 'linear-gradient(90deg, #1e293b 0%, #0f172a 100%)'
                      }}
                    >
                      {/* Runway centerline rushing towards bottom */}
                      <div className="w-full h-full flex flex-col items-center justify-around">
                        <div className="w-3 h-16 bg-white animate-pulse" />
                        <div className="w-3 h-16 bg-white animate-pulse" />
                        <div className="w-3 h-16 bg-white animate-pulse" />
                      </div>
                    </div>
                  )}

                  {/* Cruising Volumetric Cloud Layer */}
                  {stage === 'cruising_3d' && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {/* Top Cirrus Clouds */}
                      <div className="absolute top-4 inset-x-0 flex justify-around opacity-30 text-5xl animate-pulse">
                        <span className="transform -translate-x-10">☁️</span>
                        <span className="transform translate-x-16">☁️</span>
                        <span className="transform translate-x-4">☁️</span>
                      </div>
                      
                      {/* Deep Cloud Blanket Below */}
                      <div 
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white/90 via-sky-100/70 to-transparent"
                        style={{
                          transform: `rotateX(55deg) rotateZ(${bankAngle * 0.4}deg)`,
                          transformOrigin: 'bottom center'
                        }}
                      >
                        <div className="w-full h-full flex items-center justify-around opacity-60 text-6xl">
                          <span>☁️</span>
                          <span>☁️</span>
                          <span>☁️</span>
                          <span>☁️</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Landing Runway Approach Lights */}
                  {stage === 'landing_3d' && (
                    <div 
                      className="absolute inset-x-0 bottom-0 h-48 bg-slate-950 border-t-4 border-amber-400"
                      style={{
                        transform: 'rotateX(58deg)',
                        transformOrigin: 'bottom center'
                      }}
                    >
                      <div className="w-full h-full flex flex-col items-center justify-between py-2">
                        <div className="flex gap-8 text-amber-400 animate-pulse text-xs font-mono">
                          <span>🟡 PAPI: 2 RED 2 WHITE</span>
                          <span>RUNWAY 24R • {secondCity.name.toUpperCase()}</span>
                        </div>
                        <div className="w-3 h-24 bg-white shadow-lg animate-pulse" />
                        <div className="flex gap-4">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* HIGH-PRECISION SVG JET AIRLINER MODEL (CHASE VIEW) */}
                  <div 
                    className="relative z-30 transition-transform duration-100 ease-out"
                    style={{
                      transform: `
                        translateY(${
                          stage === 'takeoff_3d' ? (1 - progressPercent / 25) * 50 - 25 :
                          stage === 'landing_3d' ? (progressPercent - 75) * 1.8 : 0
                        }px)
                        rotateX(${-pitchAngle}deg)
                        rotateZ(${bankAngle}deg)
                        scale(${stage === 'landing_3d' ? 1.3 : 1.15})
                      `
                    }}
                  >
                    <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-[0_25px_20px_rgba(0,0,0,0.6)]">
                      {/* Left & Right Jet Contrails */}
                      {stage === 'cruising_3d' && (
                        <>
                          <line x1="62" y1="100" x2="10" y2="150" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.6" strokeDasharray="6 4" />
                          <line x1="158" y1="100" x2="210" y2="150" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.6" strokeDasharray="6 4" />
                        </>
                      )}

                      {/* Main Swept Wings */}
                      <path d="M110 55 L15 95 L25 105 L110 75 L195 105 L205 95 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                      {/* Wing Flaps & Slats Highlight */}
                      <path d="M40 92 L95 76" stroke="#0284c7" strokeWidth="2.5" />
                      <path d="M125 76 L180 92" stroke="#0284c7" strokeWidth="2.5" />

                      {/* Wingtip Blended Winglets */}
                      <path d="M15 95 L12 80 L18 85 Z" fill="#0284c7" />
                      <path d="M205 95 L208 80 L202 85 Z" fill="#0284c7" />

                      {/* Wingtip Navigation Strobes */}
                      <circle cx="13" cy="82" r="3" fill="#ef4444" className="animate-ping" />
                      <circle cx="207" cy="82" r="3" fill="#10b981" className="animate-ping" />

                      {/* Twin Turbofan Engines Under Wings */}
                      {/* Left Engine */}
                      <rect x="52" y="80" width="16" height="30" rx="6" fill="#475569" stroke="#334155" strokeWidth="2" />
                      <ellipse cx="60" cy="110" rx="7" ry="3" fill="#0284c7" className="animate-pulse" />
                      {/* Left Jet Exhaust Core */}
                      <ellipse cx="60" cy="112" rx="4" ry="2" fill="#38bdf8" />

                      {/* Right Engine */}
                      <rect x="152" y="80" width="16" height="30" rx="6" fill="#475569" stroke="#334155" strokeWidth="2" />
                      <ellipse cx="160" cy="110" rx="7" ry="3" fill="#0284c7" className="animate-pulse" />
                      {/* Right Jet Exhaust Core */}
                      <ellipse cx="160" cy="112" rx="4" ry="2" fill="#38bdf8" />

                      {/* Horizontal Stabilizers / Tailplanes */}
                      <path d="M110 115 L70 135 L75 140 L110 125 L145 140 L150 135 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />

                      {/* Vertical Tail Fin */}
                      <path d="M106 125 L106 70 L114 70 L114 125 Z" fill="#0284c7" />
                      <path d="M107 70 L110 50 L113 70 Z" fill="#0369a1" />

                      {/* Fuselage / Main Aircraft Body */}
                      <path d="M102 125 L102 30 C102 15, 118 15, 118 30 L118 125 C118 135, 102 135, 102 125 Z" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />

                      {/* Cockpit Windshield Visor (Forward nose) */}
                      <path d="M104 25 C107 20, 113 20, 116 25 L115 30 L105 30 Z" fill="#0f172a" />

                      {/* Red Beacon Strobe on Fuselage Top */}
                      <circle cx="110" cy="65" r="2.5" fill="#ef4444" className="animate-ping" />
                    </svg>

                    {/* Flight status label pill */}
                    <div className="text-center mt-2">
                      <span className="px-3 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-[10px] font-mono font-bold text-sky-300 shadow">
                        WQ-{cityIndex + 1}0 • B787 JET • SPEED {airSpeed} KM/H
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* CAMERA VIEW 2: PASSENGER WINDOW WING VIEW */}
              {cameraView === 'window' && (
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-slate-950">
                  {/* Sky & Clouds through Window */}
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100 flex items-center justify-center">
                    {/* Clouds Drifting Fast */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-1/3 left-0 text-7xl opacity-80 animate-pulse transform -translate-x-10">
                        ☁️
                      </div>
                      <div className="absolute bottom-1/4 right-8 text-8xl opacity-90 transform translate-y-6">
                        ☁️
                      </div>
                    </div>

                    {/* Aircraft Wing Extending into Frame */}
                    <div 
                      className="absolute right-0 bottom-6 w-3/4 h-24 bg-gradient-to-l from-slate-200 via-slate-300 to-slate-400 border-t-4 border-slate-500 shadow-2xl"
                      style={{
                        transform: `rotate(-14deg) translateY(${Math.sin(Date.now() / 400) * 4}px)`,
                        transformOrigin: 'right center'
                      }}
                    >
                      {/* Winglet Red Beacon */}
                      <div className="absolute left-2 top-0 w-3 h-8 bg-sky-600 rounded-t border border-white flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      </div>

                      {/* Engine Nacelle Pylon & Inlet */}
                      <div className="absolute left-1/3 bottom-0 w-24 h-16 rounded-full bg-slate-700 border-2 border-slate-500 flex items-center justify-center shadow-inner">
                        <span className="text-2xl animate-spin" style={{ animationDuration: '0.1s' }}>⚙️</span>
                      </div>
                    </div>
                  </div>

                  {/* Airplane Cabin Window Bezel Frame */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-56 sm:w-64 h-72 sm:h-80 rounded-[50px] border-[24px] border-slate-900 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] relative">
                      {/* Plastic Window Shade Lip */}
                      <div className="absolute -top-3 left-1/4 right-1/4 h-3 bg-slate-750 rounded-b-md" />
                      {/* Window Reflection Sheen */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-[32px]" />
                    </div>
                  </div>

                  {/* Seat View Badge */}
                  <div className="absolute bottom-3 left-4 bg-slate-900/90 border border-slate-700 px-3 py-1 rounded-xl text-[10px] font-mono text-slate-300">
                    SEAT 14A • WINDOW VIEW OVER WING
                  </div>
                </div>
              )}

              {/* CAMERA VIEW 3: COCKPIT SYNTHETIC VISION HUD */}
              {cameraView === 'cockpit' && (
                <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-4">
                  {/* Artificial Horizon Pitch Ladder */}
                  <div className="relative w-full max-w-md h-56 border-2 border-emerald-500/50 rounded-2xl bg-emerald-950/20 p-3 font-mono text-emerald-400 flex flex-col justify-between shadow-inner">
                    
                    {/* Top Compass Heading Tape */}
                    <div className="flex items-center justify-between border-b border-emerald-500/40 pb-1 text-xs">
                      <span>HDG: 085° MAG</span>
                      <span className="font-black text-amber-300">AUTOPILOT: LNAV/VNAV</span>
                      <span>DEST: {secondCity.name.toUpperCase()}</span>
                    </div>

                    {/* Center Pitch Crosshair & Horizon Line */}
                    <div className="relative flex items-center justify-center my-auto">
                      {/* Center Aircraft Reticle */}
                      <div className="w-8 h-8 border-2 border-emerald-400 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      </div>
                      
                      {/* Left & Right Horizon Bars */}
                      <div 
                        className="absolute w-3/4 border-t-2 border-emerald-400"
                        style={{ transform: `rotate(${bankAngle}deg)` }}
                      >
                        <div className="flex justify-between text-[9px] -mt-4 font-bold">
                          <span>10°</span>
                          <span>10°</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Ground Speed & Mach */}
                    <div className="flex items-center justify-between border-t border-emerald-500/40 pt-1 text-xs">
                      <span>GS: {airSpeed} KT</span>
                      <span>MACH: 0.85</span>
                      <span>FMS: RNP 0.3</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Cockpit HUD Overlay On Left Top */}
              <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-700/80 rounded-xl p-2.5 text-[10px] font-mono space-y-0.5 backdrop-blur-md shadow-lg pointer-events-none z-40">
                <div className="text-slate-400">ALTITUDE: <strong className="text-emerald-400">{altitude.toLocaleString()} m</strong></div>
                <div className="text-slate-400">AIRSPEED: <strong className="text-sky-300">{airSpeed} km/h</strong></div>
                <div className="text-slate-400">DISTANCE REMAINING: <strong className="text-amber-300">{distanceKm.toLocaleString()} km</strong></div>
              </div>

              {/* Flight Time Accumulator On Right Top */}
              <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-amber-300 backdrop-blur-md shadow-lg pointer-events-none z-40 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Travel Time: +{currentElapsedHours}h {currentElapsedMins}m</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin" />
                  <span>Flight Trajectory ({currentCity.name} ➔ {secondCity.name})</span>
                </span>
                <span className="font-bold text-sky-300">{progressPercent}% Completed</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-700">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-amber-400 transition-all duration-100 shadow"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. ARRIVED / TOUCHDOWN CELEBRATION */}
        {stage === 'arrived' && (
          <div className="relative z-10 py-5 text-center space-y-5 animate-in fade-in zoom-in-95">
            <div className="text-6xl animate-bounce">
              {isFinalCity ? '🏆' : '🛬'}
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Touchdown in City #{cityIndex + 2} of {totalCities}!
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Fredoka',sans-serif]">
                Welcome to {secondCity.name}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
                {secondCity.welcomeMessage}
              </p>
            </div>

            {/* Flight Cost Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-left max-w-md mx-auto space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Clock className="w-4 h-4" />
                  <span>Flight Journey Time Logged:</span>
                </div>
                <span className="text-xs font-mono font-black text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                  +{hours}h {mins}m added
                </span>
              </div>
              
              <div className="text-xs text-slate-300">
                New Total Travel Time in Passport: <strong className="text-emerald-400 font-mono">{Math.floor(((student.travelMinutesSpent || 0) + totalCostMinutes) / 60)}h {((student.travelMinutesSpent || 0) + totalCostMinutes) % 60}m</strong>
              </div>

              <div className="border-t border-slate-700/80 pt-2">
                <div className="text-[11px] font-bold text-slate-400 mb-1">
                  City Highlights & Stations:
                </div>
                <div className="flex flex-wrap gap-1">
                  {secondCity.landmarks.map((l, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-200 border border-slate-700">
                      📍 {l}
                    </span>
                  ))}
                  {secondCity.stations && secondCity.stations.map((stn, idx) => (
                    <span key={`stn-${idx}`} className="text-[11px] px-2 py-0.5 rounded bg-blue-950/80 text-sky-200 border border-blue-700/50">
                      {stn.icon} {stn.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              id="explore-second-city-btn"
              onClick={() => onLandInSecondCity(totalCostMinutes)}
              className="w-full sm:w-auto py-3.5 px-8 rounded-2xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 shadow-xl shadow-amber-500/20 text-sm sm:text-base inline-flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Enter {secondCity.name} Streets & Begin English Quest!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
