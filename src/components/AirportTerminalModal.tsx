import React, { useState } from 'react';
import { CityData, CityAirport, StudentProfile } from '../types';
import { soundEffects } from '../utils/audio';
import { updateMissionProgress } from '../utils/dailyMissions';
import { 
  Plane, 
  MapPin, 
  X, 
  CheckCircle, 
  ShieldCheck, 
  Luggage, 
  Ticket, 
  ArrowRight, 
  Clock, 
  Search, 
  Compass, 
  Sparkles, 
  UserCheck,
  Lock,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface AirportTerminalModalProps {
  currentCity: CityData;
  allCities: CityData[];
  student: StudentProfile;
  onLaunchFlight: (targetCity: CityData) => void;
  onClose: () => void;
}

export const AirportTerminalModal: React.FC<AirportTerminalModalProps> = ({
  currentCity,
  allCities,
  student,
  onLaunchFlight,
  onClose
}) => {
  // Check city monster completion status
  const totalMonsters = currentCity.monsters.length;
  const defeatedCount = currentCity.monsters.filter(m => student.defeatedMonsterIds.includes(m.id)).length;
  const isCityFinished = totalMonsters > 0 ? defeatedCount >= totalMonsters : true;
  const monstersRemaining = Math.max(0, totalMonsters - defeatedCount);

  // Next sequential city on the world tour
  const nextCityIndex = (student.currentCityIndex + 1) % allCities.length;
  const nextCity = allCities[nextCityIndex] || allCities[0];

  // Boarding Steps: 1: 'destinations' -> 2: 'checkin' -> 3: 'security' -> 4: 'gate'
  const [step, setStep] = useState<'destinations' | 'checkin' | 'security' | 'gate'>('destinations');
  const [selectedDestination, setSelectedDestination] = useState<CityData>(nextCity);
  const [searchQuery, setSearchQuery] = useState('');
  const [seatChoice, setSeatChoice] = useState<'window' | 'aisle'>('window');
  const [checkinAnswered, setCheckinAnswered] = useState(false);
  const [securityAnswered, setSecurityAnswered] = useState(false);
  const [baggageWeighed, setBaggageWeighed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const airportName = currentCity.airport?.name || `${currentCity.name} International Airport`;
  const airportCode = currentCity.airport?.code || currentCity.name.substring(0, 3).toUpperCase();

  // Determine if a destination is unlocked:
  // - Next city is unlocked ONLY IF current city is finished!
  // - Previously visited cities are unlocked for revisiting
  // - All other cities are locked (cannot skip ahead)
  const isCityUnlocked = (city: CityData) => {
    if (city.id === nextCity.id) {
      return isCityFinished;
    }
    if (student.visitedCities?.includes(city.id) && city.id !== currentCity.id) {
      return true;
    }
    return false;
  };

  const filteredCities = allCities.filter(c => 
    c.id !== currentCity.id && 
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     c.country.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectCity = (city: CityData) => {
    if (!isCityUnlocked(city)) {
      soundEffects.playWrong();
      if (city.id === nextCity.id) {
        setErrorMessage(`⚠️ Flight to ${city.name} is restricted! You must defeat all ${totalMonsters} monsters in ${currentCity.name} first (${defeatedCount}/${totalMonsters} defeated).`);
      } else {
        setErrorMessage(`🔒 ${city.name} is locked! You must complete prior cities in order to unlock this destination.`);
      }
      return;
    }
    setErrorMessage('');
    soundEffects.playSelect();
    setSelectedDestination(city);
    setStep('checkin');
  };

  const handleCompleteCheckin = () => {
    soundEffects.playSelect();
    setStep('security');
  };

  const handleCompleteSecurity = () => {
    soundEffects.playVictory();
    updateMissionProgress('airport', 1);
    setStep('gate');
  };

  const handleBoardFlight = () => {
    if (!isCityUnlocked(selectedDestination)) {
      soundEffects.playWrong();
      setErrorMessage(`Cannot board: Flight to ${selectedDestination.name} requires finishing ${currentCity.name} first!`);
      setStep('destinations');
      return;
    }
    soundEffects.playFlightTakeoff();
    updateMissionProgress('transit', 1);
    onLaunchFlight(selectedDestination);
  };

  const canProceed = isCityUnlocked(selectedDestination);

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-5 sm:p-7 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Glow ambient light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-sky-500/15 blur-3xl pointer-events-none rounded-full" />

        {/* Airport Terminal Header */}
        <div className="relative flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 p-0.5 shadow-lg shadow-sky-500/20 flex items-center justify-center text-3xl">
              ✈️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white font-['Fredoka',sans-serif]">
                  {airportName}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  {airportCode}
                </span>
                {isCityFinished ? (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <CheckCircle className="w-3 h-3" /> Runway Open
                  </span>
                ) : (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    <Lock className="w-3 h-3" /> Grounded ({defeatedCount}/{totalMonsters})
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Physical Airport Terminal • Passenger: <strong className="text-amber-300">{student.name}</strong> (Lv. {student.level})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Exit Airport Terminal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Navigation Indicator */}
        <div className="grid grid-cols-4 gap-1.5 my-4">
          {[
            { key: 'destinations', label: '1. Departures', icon: '🛫' },
            { key: 'checkin', label: '2. Check-In', icon: '🧳', locked: !canProceed },
            { key: 'security', label: '3. Security', icon: '🛡️', locked: !canProceed },
            { key: 'gate', label: '4. Boarding Gate', icon: '✈️', locked: !canProceed }
          ].map((s, idx) => {
            const isActive = step === s.key;
            const isPassed = 
              (step === 'checkin' && idx === 0) ||
              (step === 'security' && idx <= 1) ||
              (step === 'gate' && idx <= 2);

            return (
              <div
                key={s.key}
                className={`py-2 px-1.5 rounded-xl text-center border text-[11px] font-bold transition-all ${
                  isActive
                    ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-md ring-1 ring-sky-400/40'
                    : isPassed
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : s.locked
                    ? 'bg-slate-850/40 border-slate-800 text-slate-500 opacity-60'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                }`}
              >
                <span>{s.locked ? '🔒' : s.icon} {s.label}</span>
              </div>
            );
          })}
        </div>

        {/* STEP 1: DESTINATIONS DEPARTURE BOARD */}
        {step === 'destinations' && (
          <div className="space-y-4">
            
            {/* Airspace Clearance / Restriction Banner */}
            {!isCityFinished ? (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                      <span>Airspace Restricted • Finish City to Fly</span>
                    </div>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">
                      You must finish <strong className="text-white">{currentCity.name}</strong> before flying to the next city! Defeat all roaming monsters to open international runways.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700 max-w-xs">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-300"
                          style={{ width: `${Math.round((defeatedCount / Math.max(1, totalMonsters)) * 100)}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-amber-400">
                        {defeatedCount}/{totalMonsters} Defeated ({monstersRemaining} remaining)
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 self-start sm:self-center transition shadow cursor-pointer active:scale-95"
                >
                  Return to Streets
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-xs animate-in fade-in">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                    <span>Airspace Cleared • International Departure Approved!</span>
                  </div>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">
                    All {totalMonsters} monsters in <strong className="text-white">{currentCity.name}</strong> defeated! Boarding gate is open for your next flight to <strong className="text-amber-300">{nextCity.name}</strong>.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message Toast */}
            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2 animate-pulse">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Official Tour Route Hero Card (Next City) */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-850 to-slate-800 border border-slate-700/80 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 flex items-center gap-1 font-mono">
                  <Compass className="w-3.5 h-3.5" />
                  Scheduled World Tour Stop #{nextCityIndex + 1}
                </span>
                {isCityFinished ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    ✓ Clearance Granted
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Locked (Finish City First)
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-2xl">
                    🌍
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white font-['Fredoka',sans-serif]">
                      {nextCity.name}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {nextCity.country} • Airport: {nextCity.airport?.code || nextCity.name.substring(0, 3).toUpperCase()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectCity(nextCity)}
                  disabled={!isCityFinished}
                  className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                    isCityFinished
                      ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md cursor-pointer active:scale-95'
                      : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  }`}
                >
                  {isCityFinished ? (
                    <>
                      <span>Select Flight to {nextCity.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked ({defeatedCount}/{totalMonsters})</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Departures Board List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5 font-['Fredoka',sans-serif]">
                    <span>World Tour Flight Schedule</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      (Cities must be unlocked sequentially)
                    </span>
                  </h3>
                </div>

                {/* Search Bar */}
                <div className="relative w-44">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destination..."
                    className="w-full pl-8 pr-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {filteredCities.map((city) => {
                  const isNext = city.id === nextCity.id;
                  const isVisited = student.visitedCities?.includes(city.id);
                  const unlocked = isCityUnlocked(city);
                  const isSelected = selectedDestination.id === city.id;

                  return (
                    <button
                      key={city.id}
                      onClick={() => handleSelectCity(city)}
                      className={`p-2.5 rounded-2xl border text-left flex items-center justify-between transition group ${
                        isSelected && unlocked
                          ? 'bg-sky-500/20 border-sky-400 text-white ring-1 ring-sky-400/40 cursor-pointer'
                          : unlocked
                          ? 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-300 cursor-pointer'
                          : 'bg-slate-900/60 border-slate-800/80 text-slate-500 opacity-60 hover:opacity-80 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl shrink-0">
                          {unlocked ? (isNext ? '🛫' : '🌍') : '🔒'}
                        </span>
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-white truncate flex items-center gap-1.5">
                            <span className="truncate">{city.name}</span>
                            {isNext && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-sky-500/20 text-sky-300 shrink-0">
                                NEXT
                              </span>
                            )}
                            {isVisited && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-emerald-500/20 text-emerald-400 shrink-0">
                                CLEARED
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {city.country} • {city.airport?.code || 'WQ'}
                            {!unlocked && ' • Locked'}
                          </div>
                        </div>
                      </div>
                      
                      {unlocked ? (
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-400 font-mono text-[11px]">
                Active Origin: <strong>{currentCity.name}</strong> ({airportCode})
              </span>
              
              {canProceed ? (
                <button
                  onClick={() => setStep('checkin')}
                  className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg shadow-sky-500/20 flex items-center gap-1.5 cursor-pointer active:scale-95 transition"
                >
                  <span>Proceed with {selectedDestination.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  disabled
                  className="px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-500 font-bold text-xs flex items-center gap-1.5 cursor-not-allowed"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Finish {currentCity.name} to Unlock Flight</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: CHECK-IN & BAGGAGE DROP */}
        {step === 'checkin' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-sm text-white">Airline Check-In Desk</span>
                </div>
                <span className="text-xs text-sky-400 font-mono font-bold">
                  {airportCode} ➔ {selectedDestination.airport?.code || selectedDestination.name.substring(0, 3).toUpperCase()}
                </span>
              </div>

              {/* Seat Selection */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Select Your In-Flight Seat Preference:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      setSeatChoice('window');
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer ${
                      seatChoice === 'window'
                        ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                        : 'bg-slate-850 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🪟 Window Seat (Scenic Sky Views)</span>
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      setSeatChoice('aisle');
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer ${
                      seatChoice === 'aisle'
                        ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                        : 'bg-slate-850 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🚶 Aisle Seat (Easy Walking Access)</span>
                  </button>
                </div>
              </div>

              {/* Educational Travel Dialogue Question */}
              <div className="pt-2 border-t border-slate-700/50 space-y-2">
                <span className="text-xs font-bold text-amber-300">
                  Airline Agent Question:
                </span>
                <p className="text-xs text-slate-200 italic bg-slate-900/80 p-2.5 rounded-xl border border-slate-700">
                  "Good morning! Do you have any dangerous goods or liquids exceeding 100ml in your carry-on luggage?"
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      setCheckinAnswered(true);
                      setBaggageWeighed(true);
                    }}
                    className={`p-2 rounded-xl border text-xs font-bold text-left transition cursor-pointer ${
                      checkinAnswered
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-850 hover:bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    ✓ "No, I only have my clothing, passport, and English books."
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      setCheckinAnswered(true);
                      setBaggageWeighed(true);
                    }}
                    className={`p-2 rounded-xl border text-xs font-bold text-left transition cursor-pointer ${
                      checkinAnswered
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-850 hover:bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    ✓ "No liquids at all. My baggage is compliant with safety guidelines."
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep('destinations')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
              >
                Back to Destinations
              </button>
              <button
                disabled={!checkinAnswered}
                onClick={handleCompleteCheckin}
                className={`px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                  checkinAnswered
                    ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>Print Boarding Pass & Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SECURITY & PASSPORT CONTROL */}
        {step === 'security' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-sm text-white">Airport Security & Border Inspection</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  TSA / Border Gate Active
                </span>
              </div>

              {/* Security Conveyor Simulation */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-around text-center">
                <div>
                  <div className="text-2xl animate-bounce">🧳</div>
                  <span className="text-[10px] text-slate-400">X-Ray Scanner: CLEAR</span>
                </div>
                <div>
                  <div className="text-2xl">🚶</div>
                  <span className="text-[10px] text-emerald-400 font-bold">Metal Detector: BEEP ✓</span>
                </div>
                <div>
                  <div className="text-2xl">🛂</div>
                  <span className="text-[10px] text-amber-300 font-bold">Passport: VALIDATED</span>
                </div>
              </div>

              {/* Immigration Officer English Question */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-amber-300">
                  Immigration Officer:
                </span>
                <p className="text-xs text-slate-200 italic bg-slate-900/80 p-2.5 rounded-xl border border-slate-700">
                  "What is the official purpose of your international travel to {selectedDestination.name}?"
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      setSecurityAnswered(true);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-xs font-bold text-left transition cursor-pointer flex items-center justify-between ${
                      securityAnswered
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-850 hover:bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <span>"I am traveling for English education, city exploration, and intercultural friendship!"</span>
                    {securityAnswered && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep('checkin')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
              >
                Back
              </button>
              <button
                disabled={!securityAnswered}
                onClick={handleCompleteSecurity}
                className={`px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                  securityAnswered
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>Stamp Passport & Proceed to Gate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: BOARDING GATE & JET BRIDGE */}
        {step === 'gate' && (
          <div className="space-y-4 animate-in fade-in duration-200 text-center">
            <div className="p-5 rounded-2xl bg-gradient-to-b from-sky-900/40 via-slate-850 to-slate-900 border border-sky-500/40 shadow-xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <CheckCircle className="w-3.5 h-3.5" />
                Security Cleared • Final Boarding Call
              </div>

              <h3 className="text-2xl font-black text-white font-['Fredoka',sans-serif]">
                Gate B12 • Flight WQ-777 to {selectedDestination.name}! ✈️
              </h3>

              {/* Boarding Pass Summary Card */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-left grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">PASSENGER</span>
                  <strong className="text-white">{student.name}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">ORIGIN</span>
                  <strong className="text-sky-300">{airportCode}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">DESTINATION</span>
                  <strong className="text-amber-300">{selectedDestination.name}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">SEAT</span>
                  <strong className="text-emerald-300">{seatChoice === 'window' ? '12A (Window)' : '12C (Aisle)'}</strong>
                </div>
              </div>

              <p className="text-xs text-slate-300">
                Please step into the jet bridge to board your flight. Prepare for takeoff!
              </p>

              <button
                onClick={handleBoardFlight}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:brightness-110 text-slate-950 font-black text-sm shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition"
              >
                <Plane className="w-5 h-5 text-slate-950" />
                <span>Walk Down Jet Bridge & Launch Flight!</span>
              </button>
            </div>

            <button
              onClick={() => setStep('security')}
              className="text-xs text-slate-400 hover:text-white transition"
            >
              Back to Security
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
