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
  ChevronRight
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
  const [altitude, setAltitude] = useState(0); // in meters
  const [airSpeed, setAirSpeed] = useState(0); // in km/h
  const [distanceKm, setDistanceKm] = useState(8900);
  const [flightTimeMinutes, setFlightTimeMinutes] = useState(0);
  const [totalCostMinutes, setTotalCostMinutes] = useState(680); // ~11h 20m
  const [progressPercent, setProgressPercent] = useState(0);

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

    // Approximate flight time: ~800 km/h + 40 mins takeoff/landing
    const minutes = Math.round((dist / 850) * 60 + 45);
    setTotalCostMinutes(minutes);
  }, [currentCity, secondCity]);

  const handleBeginFlight = () => {
    setStage('takeoff_3d');
    soundEffects.playFlightTakeoff();

    // Stage 1: Takeoff (0 - 2.5s)
    let startTime = Date.now();
    const takeoffDuration = 2500;

    const takeoffTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const prog = Math.min(1, elapsed / takeoffDuration);
      setAltitude(Math.round(prog * 3500));
      setAirSpeed(Math.round(prog * 580));
      setProgressPercent(Math.round(prog * 25));
      setFlightTimeMinutes(Math.round(prog * (totalCostMinutes * 0.25)));

      if (prog >= 1) {
        clearInterval(takeoffTimer);
        // Transition to 3D Cruising (2.5s - 6.5s)
        setStage('cruising_3d');
        startCruisingPhase();
      }
    }, 40);
  };

  const startCruisingPhase = () => {
    let startTime = Date.now();
    const cruisingDuration = 3500;

    const cruisingTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const prog = Math.min(1, elapsed / cruisingDuration);
      setAltitude(Math.round(3500 + prog * 7500)); // up to 11,000m
      setAirSpeed(880 + Math.round(Math.sin(prog * 10) * 20));
      setProgressPercent(Math.round(25 + prog * 50));
      setFlightTimeMinutes(Math.round((0.25 + prog * 0.5) * totalCostMinutes));
      setDistanceKm(prev => Math.max(100, Math.round(prev * (1 - prog * 0.6))));

      if (prog >= 1) {
        clearInterval(cruisingTimer);
        // Transition to 3D Landing sequence
        setStage('landing_3d');
        startLandingPhase();
      }
    }, 40);
  };

  const startLandingPhase = () => {
    let startTime = Date.now();
    const landingDuration = 3200;

    const landingTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const prog = Math.min(1, elapsed / landingDuration);
      setAltitude(Math.max(0, Math.round(11000 * (1 - prog))));
      setAirSpeed(Math.max(0, Math.round(880 * (1 - prog))));
      setProgressPercent(Math.round(75 + prog * 25));
      setFlightTimeMinutes(Math.round((0.75 + prog * 0.25) * totalCostMinutes));
      setDistanceKm(Math.max(0, Math.round(100 * (1 - prog))));

      if (prog >= 1) {
        clearInterval(landingTimer);
        setStage('arrived');
        soundEffects.playVictoryFanfare();
        try {
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.5 }
          });
        } catch {
          // ignore
        }
      }
    }, 40);
  };

  const hours = Math.floor(totalCostMinutes / 60);
  const mins = totalCostMinutes % 60;
  const currentElapsedHours = Math.floor(flightTimeMinutes / 60);
  const currentElapsedMins = flightTimeMinutes % 60;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-950/90 backdrop-blur-lg p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-5 sm:p-7 text-white overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
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
                Prepare for international takeoff! This flight spans continents and costs flight time.
              </p>
            </div>

            {/* Flight Ticket Card */}
            <div className="relative bg-slate-800/90 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold text-lg">
                    ✈️
                  </div>
                  <div>
                    <div className="text-xs font-black text-white uppercase tracking-wider">
                      WordQuest Airlines Global Route
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Flight WQ-{cityIndex + 1}0 • Passenger: {student.name}
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
                  <div className="text-xs text-slate-400">{currentCity.country}</div>
                </div>

                <div className="flex flex-col items-center">
                  <Plane className="w-6 h-6 text-sky-400 transform rotate-90" />
                  <div className="w-full border-t-2 border-dashed border-slate-600 my-1"></div>
                  <span className="text-[10px] text-amber-300 font-bold">Non-Stop</span>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Arriving</div>
                  <div className="text-base sm:text-xl font-extrabold text-amber-400 mt-0.5">
                    {secondCity.name}
                  </div>
                  <div className="text-xs text-slate-400">{secondCity.country}</div>
                </div>
              </div>

              {/* Flight Time Cost Highlight */}
              <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-amber-200">Scheduled Flight Time:</span>
                </div>
                <span className="text-xs font-mono font-black text-amber-300">
                  {hours}h {mins}m travel cost
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
                  <strong className="text-emerald-400">
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
                <span>Launch 3D Flight to {secondCity.name}!</span>
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

        {/* 2. 3D FLIGHT STAGES (Takeoff, Cruising, Landing) */}
        {(stage === 'takeoff_3d' || stage === 'cruising_3d' || stage === 'landing_3d') && (
          <div className="relative z-10 py-3 space-y-4">
            
            {/* Stage Title & Cockpit HUD */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider text-sky-400">
                  {stage === 'takeoff_3d' && '3D Takeoff: Rolling & Climbing'}
                  {stage === 'cruising_3d' && '3D Cruising: High Altitude Air Corridor'}
                  {stage === 'landing_3d' && `3D Landing: Final Approach to ${secondCity.name}`}
                </span>
              </div>

              {/* Real-Time Travel Time Cost Accumulator */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-mono font-bold text-amber-300">
                <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Flight Time Cost: +{currentElapsedHours}h {currentElapsedMins}m</span>
              </div>
            </div>

            {/* 3D Flight Viewport Canvas */}
            <div 
              className="relative w-full h-64 sm:h-72 rounded-3xl bg-gradient-to-b from-sky-950 via-slate-900 to-indigo-950 border border-slate-700/80 overflow-hidden flex items-center justify-center shadow-inner"
              style={{ perspective: '1000px' }}
            >
              {/* 3D Runway or Cloud Floor */}
              {stage === 'takeoff_3d' && (
                <div 
                  className="absolute inset-x-0 bottom-0 h-40 bg-slate-900/90 border-t-2 border-emerald-500/50"
                  style={{
                    transform: 'rotateX(60deg)',
                    transformOrigin: 'bottom center',
                    backgroundImage: 'repeating-linear-gradient(90deg, #10b981 0, #10b981 4px, transparent 4px, transparent 60px)'
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-full bg-amber-400 border-l border-r border-white animate-pulse" />
                  </div>
                </div>
              )}

              {/* High Cloud Streamers during Cruising */}
              {stage === 'cruising_3d' && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-1/4 left-0 right-0 flex justify-around opacity-40 text-4xl animate-pulse">
                    <span className="transform translate-z-10">☁️</span>
                    <span className="transform -translate-z-20">☁️</span>
                    <span className="transform translate-z-30">☁️</span>
                  </div>
                  <div className="absolute bottom-1/4 left-0 right-0 flex justify-around opacity-30 text-5xl">
                    <span>☁️</span>
                    <span>☁️</span>
                  </div>
                </div>
              )}

              {/* Destination City Skyline & Runway during 3D Landing */}
              {stage === 'landing_3d' && (
                <div 
                  className="absolute inset-x-0 bottom-0 h-48 bg-slate-950 border-t-4 border-amber-400"
                  style={{
                    transform: 'rotateX(55deg)',
                    transformOrigin: 'bottom center'
                  }}
                >
                  {/* Runway center line rushing towards viewer */}
                  <div className="w-full h-full flex flex-col items-center justify-between py-2">
                    <div className="text-3xl">🛬</div>
                    <div className="w-3 h-20 bg-white shadow-lg animate-pulse" />
                    <span className="text-[11px] font-mono font-bold text-amber-300">
                      RUNWAY 09L • {secondCity.name.toUpperCase()} INTERNATIONAL
                    </span>
                  </div>
                </div>
              )}

              {/* 3D AIRCRAFT MODEL */}
              <div 
                className="relative z-20 transition-all duration-300 ease-out select-none flex flex-col items-center"
                style={{
                  transform: `
                    translateY(${
                      stage === 'takeoff_3d' 
                        ? (1 - progressPercent / 25) * 40 - 20 
                        : stage === 'cruising_3d'
                        ? Math.sin(Date.now() / 400) * 8
                        : (progressPercent - 75) * 1.5
                    }px)
                    rotateX(${
                      stage === 'takeoff_3d' 
                        ? -18 
                        : stage === 'cruising_3d'
                        ? Math.sin(progressPercent / 5) * 4
                        : 14
                    }deg)
                    rotateZ(${
                      stage === 'landing_3d' ? -8 : stage === 'takeoff_3d' ? 4 : 0
                    }deg)
                    scale(${stage === 'landing_3d' ? 1.25 : 1.1})
                  `
                }}
              >
                {/* 3D Airplane Emoji + Aircraft Silhouette Body */}
                <div className="relative">
                  <span className="text-7xl sm:text-8xl filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]">
                    ✈️
                  </span>

                  {/* Twin Jet Engine Afterburners */}
                  <div className="absolute -bottom-2 left-3 w-3 h-6 bg-gradient-to-t from-sky-400 via-blue-500 to-transparent rounded-full blur-[2px] animate-pulse" />
                  <div className="absolute -bottom-2 right-3 w-3 h-6 bg-gradient-to-t from-sky-400 via-blue-500 to-transparent rounded-full blur-[2px] animate-pulse" />

                  {/* Navigation Lights */}
                  <div className="absolute top-2 left-0 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <div className="absolute top-2 right-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <div className="mt-1 px-3 py-0.5 rounded-full bg-slate-900/80 border border-slate-700 text-[10px] font-bold text-sky-300">
                  {stage === 'takeoff_3d' && 'Ascending to Cruise Altitude...'}
                  {stage === 'cruising_3d' && `Air Route: ${currentCity.name} ➔ ${secondCity.name}`}
                  {stage === 'landing_3d' && 'Deploying Landing Gear & Touchdown!'}
                </div>
              </div>

              {/* Cockpit HUD Overlay */}
              <div className="absolute top-3 left-3 bg-slate-900/85 border border-slate-700/80 rounded-xl p-2 text-[10px] font-mono space-y-0.5">
                <div className="text-slate-400">ALTITUDE: <strong className="text-emerald-400">{altitude.toLocaleString()} m</strong></div>
                <div className="text-slate-400">AIRSPEED: <strong className="text-sky-300">{airSpeed} km/h</strong></div>
                <div className="text-slate-400">REMAINING: <strong className="text-amber-300">{distanceKm.toLocaleString()} km</strong></div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin" />
                  <span>Flight Progress</span>
                </span>
                <span className="font-bold text-sky-300">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
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
