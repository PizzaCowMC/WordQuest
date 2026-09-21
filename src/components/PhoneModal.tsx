import React, { useState } from 'react';
import { StudentProfile, CityData, VehicleType, TransitStation } from '../types';
import { AVATAR_OPTIONS, OUTFIT_COLORS, ACCESSORY_OPTIONS, VEHICLE_OPTIONS, TRANSIT_TICKETS } from '../data/transitData';
import { soundEffects } from '../utils/audio';
import { 
  X, 
  Wifi, 
  Battery, 
  Navigation, 
  Car, 
  CreditCard, 
  User, 
  BookOpen, 
  Radio, 
  ChevronLeft, 
  Check, 
  Sparkles, 
  Shield, 
  Compass, 
  ArrowRight,
  Clock,
  Coins,
  MapPin,
  Volume2,
  VolumeX,
  Smartphone
} from 'lucide-react';

interface PhoneModalProps {
  student: StudentProfile;
  currentCity: CityData;
  onSelectVehicle: (vehicle: VehicleType) => void;
  onUpdateAppearance: (appearance: StudentProfile['appearance']) => void;
  onBuyTicket: (ticketId: string, costCoins: number, vehicleType: VehicleType) => boolean;
  onFastTravelToStation?: (station: TransitStation) => void;
  onOpenFieldGuide?: () => void;
  onOpenLessonGuide?: () => void;
  onClose: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

type PhoneApp = 'home' | 'ride' | 'tickets' | 'wardrobe' | 'grammar' | 'radar' | 'radio';

export const PhoneModal: React.FC<PhoneModalProps> = ({
  student,
  currentCity,
  onSelectVehicle,
  onUpdateAppearance,
  onBuyTicket,
  onFastTravelToStation,
  onOpenFieldGuide,
  onOpenLessonGuide,
  onClose,
  isMuted = false,
  onToggleMute
}) => {
  const [activeApp, setActiveApp] = useState<PhoneApp>('home');
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);

  // Wardrobe temporary state
  const [selectedAvatar, setSelectedAvatar] = useState(
    AVATAR_OPTIONS.find(a => a.avatar === student.appearance?.avatar) || AVATAR_OPTIONS[0]
  );
  const [selectedColor, setSelectedColor] = useState(
    OUTFIT_COLORS.find(c => c.hex === student.appearance?.outfitColor) || OUTFIT_COLORS[0]
  );
  const [selectedAccessory, setSelectedAccessory] = useState(
    ACCESSORY_OPTIONS.find(acc => acc.name === student.appearance?.accessory) || ACCESSORY_OPTIONS[0]
  );
  const [wardrobeSaved, setWardrobeSaved] = useState(false);

  // Active vehicle info
  const activeVehicleOption = VEHICLE_OPTIONS.find(v => v.type === student.activeVehicle) || VEHICLE_OPTIONS[0];

  // Handle Hailing a Taxi or Car
  const handleHailVehicle = (vehicle: VehicleType, name: string) => {
    soundEffects.playSelect();
    setDispatchStatus(`Calling ${name}...`);

    setTimeout(() => {
      soundEffects.playHonk();
      onSelectVehicle(vehicle);
      setDispatchStatus(`${name} arrived at your GPS coordinates! Boarded.`);
      setTimeout(() => {
        setDispatchStatus(null);
      }, 2500);
    }, 800);
  };

  // Handle Saving Wardrobe
  const handleSaveWardrobe = () => {
    soundEffects.playSelect();
    soundEffects.playCorrectHit();
    onUpdateAppearance({
      avatar: selectedAvatar.avatar,
      title: selectedAvatar.title,
      outfitColor: selectedColor.hex,
      accessory: selectedAccessory.name,
      genderStyle: selectedAvatar.genderStyle
    });
    setWardrobeSaved(true);
    setTimeout(() => setWardrobeSaved(false), 2000);
  };

  // Handle Purchasing Ticket
  const handlePurchase = (ticket: typeof TRANSIT_TICKETS[0]) => {
    const isOwned = (student.purchasedTickets || []).includes(ticket.id);
    if (isOwned) {
      soundEffects.playSelect();
      onSelectVehicle(ticket.vehicleType);
      setDispatchStatus(`Boarded ${ticket.title}!`);
      setTimeout(() => setDispatchStatus(null), 2000);
      return;
    }

    if (student.coins < ticket.costCoins) {
      soundEffects.playWrong();
      alert(`You need ${ticket.costCoins} coins to buy this pass. Defeat road monsters with English answers to earn coins!`);
      return;
    }

    const success = onBuyTicket(ticket.id, ticket.costCoins, ticket.vehicleType);
    if (success) {
      soundEffects.playCashRegister();
      onSelectVehicle(ticket.vehicleType);
    }
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Smartphone Chassis Frame */}
      <div className="relative w-full max-w-[390px] h-[700px] max-h-[92vh] bg-slate-950 rounded-[44px] border-[6px] border-slate-700 shadow-2xl flex flex-col overflow-hidden text-white my-auto ring-1 ring-white/10 shadow-sky-500/20">
        
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-slate-900 border border-slate-800 shadow-md">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
          <div className="w-12 h-3 rounded-full bg-slate-950 flex items-center justify-center">
            <span className="text-[8px] text-amber-400 font-mono tracking-tighter">● GPS ON</span>
          </div>
        </div>

        {/* Top Status Bar */}
        <div className="pt-3.5 pb-2 px-6 flex items-center justify-between text-[11px] text-slate-300 select-none z-40 bg-slate-900/90 border-b border-slate-800/80">
          <span className="font-bold font-mono">09:41</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-amber-300 font-semibold">{currentCity.name}</span>
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <Battery className="w-4 h-4 text-emerald-400" />
              <span className="text-[9px] font-mono">98%</span>
            </div>
          </div>
        </div>

        {/* Wallet & Quick Stats Ribbon */}
        <div className="px-4 py-2 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-amber-400">🪙</span>
            <span className="font-black text-amber-300 font-mono">{student.coins}</span>
            <span className="text-[10px] text-slate-400">Coins</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[11px] font-bold text-sky-300">
              <span>{activeVehicleOption.icon}</span>
              <span className="text-[10px] text-slate-300">{activeVehicleOption.name}</span>
            </div>
            
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              title="Close Phone"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Dispatch Notification Banner */}
        {dispatchStatus && (
          <div className="mx-3 mt-2 p-2 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold text-center animate-bounce">
            {dispatchStatus}
          </div>
        )}

        {/* PHONE SCREEN CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-4 select-none relative bg-gradient-to-b from-slate-900 via-slate-925 to-slate-950">
          
          {/* 1. HOME SCREEN VIEW */}
          {activeApp === 'home' && (
            <div className="space-y-5 animate-in fade-in zoom-in-95 duration-150">
              
              {/* Weather & Trainer Widget */}
              <div className="p-3.5 rounded-3xl bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-slate-800/50 border border-sky-500/30 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-sky-300 uppercase tracking-wider">
                      {currentCity.name}, {currentCity.country}
                    </div>
                    <div className="text-xl font-black text-white mt-0.5 font-['Fredoka',sans-serif]">
                      WordQuest OS
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      Trainer <strong className="text-white">{student.name}</strong> • Lv. {student.level}
                    </div>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border border-white/60 shadow-md cursor-pointer hover:scale-105 transition"
                    style={{ backgroundColor: student.appearance?.outfitColor || '#2563EB' }}
                    onClick={() => setActiveApp('wardrobe')}
                    title="Tap to change avatar"
                  >
                    {student.appearance?.avatar || '🧒'}
                  </div>
                </div>

                {/* Quick Vehicle Status Pill */}
                <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Current Street Speed:</span>
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    {activeVehicleOption.icon} {activeVehicleOption.speedMultiplier}x ({activeVehicleOption.name})
                  </span>
                </div>
              </div>

              {/* 3x3 Smartphone App Grid */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2.5 block">
                  Trainer City Apps:
                </span>
                
                <div className="grid grid-cols-3 gap-3 text-center">
                  
                  {/* App 1: Hail Taxi / Car */}
                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      setActiveApp('ride');
                    }}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition">
                      🚕
                    </div>
                    <span className="text-xs font-bold text-slate-200">Call Taxi</span>
                    <span className="text-[9px] text-slate-400 -mt-1">Hail Cabs</span>
                  </button>

                  {/* App 2: Transit & Tickets */}
                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      setActiveApp('tickets');
                    }}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-sky-400 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition">
                      🎫
                    </div>
                    <span className="text-xs font-bold text-slate-200">TransitPass</span>
                    <span className="text-[9px] text-slate-400 -mt-1">Buy Passes</span>
                  </button>

                  {/* App 3: Player Models & Wardrobe */}
                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      setActiveApp('wardrobe');
                    }}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-purple-400 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition">
                      👤
                    </div>
                    <span className="text-xs font-bold text-slate-200">Wardrobe</span>
                    <span className="text-[9px] text-slate-400 -mt-1">New Models</span>
                  </button>

                  {/* App 4: Grammar Guide */}
                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      setActiveApp('grammar');
                    }}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-400 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition">
                      📖
                    </div>
                    <span className="text-xs font-bold text-slate-200">GrammarDex</span>
                    <span className="text-[9px] text-slate-400 -mt-1">City Rules</span>
                  </button>

                  {/* App 5: Radar GPS */}
                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      setActiveApp('radar');
                    }}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-red-400 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition">
                      🧭
                    </div>
                    <span className="text-xs font-bold text-slate-200">City Radar</span>
                    <span className="text-[9px] text-slate-400 -mt-1">Monsters</span>
                  </button>

                  {/* App 6: Radio / Sounds */}
                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      setActiveApp('radio');
                    }}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-pink-400 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/40 text-pink-400 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition">
                      📻
                    </div>
                    <span className="text-xs font-bold text-slate-200">Radio FX</span>
                    <span className="text-[9px] text-slate-400 -mt-1">Audio Audio</span>
                  </button>

                </div>
              </div>

              {/* Bottom Quick Card: Instant Taxi Dispatch */}
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🚕</span>
                  <div>
                    <div className="text-xs font-bold text-white">Need a Lift?</div>
                    <div className="text-[10px] text-slate-400">Call a street cab to your location</div>
                  </div>
                </div>
                <button
                  onClick={() => handleHailVehicle('taxi', 'Yellow Cab')}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow transition cursor-pointer"
                >
                  Hail (15 🪙)
                </button>
              </div>

            </div>
          )}

          {/* 2. CALL TAXI / RIDE APP */}
          {activeApp === 'ride' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <button
                  onClick={() => setActiveApp('home')}
                  className="flex items-center gap-1 text-xs text-sky-400 font-bold hover:underline cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <h3 className="text-sm font-black text-white">City Cab Dispatch</h3>
                <span className="text-xs text-amber-300">🪙 {student.coins}</span>
              </div>

              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                📍 <strong>GPS Pickup Point:</strong> Your exact street coordinates in {currentCity.name}. No walking needed!
              </div>

              {/* Vehicle Options to Dispatch */}
              <div className="space-y-2.5">
                {/* Yellow Cab */}
                <div className="p-3 rounded-2xl bg-slate-850 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🚕</span>
                    <div>
                      <div className="font-bold text-xs text-white">Yellow Street Cab</div>
                      <div className="text-[10px] text-slate-400">2.8x Speed • Instant Dispatch</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleHailVehicle('taxi', 'Yellow Street Taxi')}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow transition cursor-pointer"
                  >
                    Hail Taxi
                  </button>
                </div>

                {/* Electric Sports Car */}
                <div className="p-3 rounded-2xl bg-slate-850 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🚗</span>
                    <div>
                      <div className="font-bold text-xs text-white">Electric Roadster Car</div>
                      <div className="text-[10px] text-slate-400">3.4x Speed • Personal Supercar</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleHailVehicle('car', 'Electric Roadster')}
                    className="px-3 py-1.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs shadow transition cursor-pointer"
                  >
                    Drive Car
                  </button>
                </div>

                {/* City Bus */}
                <div className="p-3 rounded-2xl bg-slate-850 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🚌</span>
                    <div>
                      <div className="font-bold text-xs text-white">City Transit Bus</div>
                      <div className="text-[10px] text-slate-400">2.4x Speed • Avenue Cruise</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleHailVehicle('bus', 'City Bus')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs shadow transition cursor-pointer"
                  >
                    Board Bus
                  </button>
                </div>

                {/* Foot Patrol / Walk */}
                <div className="p-3 rounded-2xl bg-slate-850 border border-slate-700 flex items-center justify-between opacity-80">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🚶</span>
                    <div>
                      <div className="font-bold text-xs text-white">Exit Vehicle (Walk)</div>
                      <div className="text-[10px] text-slate-400">1.0x Speed • Standard Pace</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      soundEffects.playSelect();
                      onSelectVehicle('walk');
                      setDispatchStatus('Now walking on foot.');
                      setTimeout(() => setDispatchStatus(null), 2000);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs transition cursor-pointer"
                  >
                    Walk
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. TRANSIT PASSES & TICKETS APP */}
          {activeApp === 'tickets' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <button
                  onClick={() => setActiveApp('home')}
                  className="flex items-center gap-1 text-xs text-sky-400 font-bold hover:underline cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <h3 className="text-sm font-black text-white">TransitPay Tickets</h3>
                <span className="text-xs text-amber-300">🪙 {student.coins}</span>
              </div>

              <p className="text-[11px] text-slate-300">
                Buy city passes and rail tickets using coins earned from defeating English monsters!
              </p>

              <div className="space-y-2.5">
                {TRANSIT_TICKETS.map(ticket => {
                  const isOwned = (student.purchasedTickets || []).includes(ticket.id);
                  const isCurrent = student.activeVehicle === ticket.vehicleType;

                  return (
                    <div
                      key={ticket.id}
                      className={`p-3 rounded-2xl border transition-all ${
                        isCurrent 
                          ? 'border-amber-400 bg-amber-500/15 ring-2 ring-amber-400/40' 
                          : isOwned 
                          ? 'border-emerald-500/50 bg-emerald-500/10' 
                          : 'border-slate-700 bg-slate-850'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-3xl">{ticket.icon}</span>
                          <div>
                            <div className="font-bold text-xs text-white flex items-center gap-1.5">
                              <span>{ticket.title}</span>
                              {isOwned && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-300 font-semibold border border-emerald-500/40">
                                  Purchased
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400">{ticket.durationLabel}</div>
                          </div>
                        </div>

                        <div>
                          {isCurrent ? (
                            <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-[10px] shadow">
                              ACTIVE
                            </span>
                          ) : isOwned ? (
                            <button
                              onClick={() => handlePurchase(ticket)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow transition cursor-pointer"
                            >
                              Board
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePurchase(ticket)}
                              className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center gap-1 shadow transition cursor-pointer"
                            >
                              <span>Buy {ticket.costCoins}</span>
                              <span>🪙</span>
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 mt-2 border-t border-slate-700/60 pt-1.5">
                        {ticket.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. WARDROBE & PLAYER MODELS APP */}
          {activeApp === 'wardrobe' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <button
                  onClick={() => setActiveApp('home')}
                  className="flex items-center gap-1 text-xs text-sky-400 font-bold hover:underline cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <h3 className="text-sm font-black text-white">Player Models & Style</h3>
                <span className="text-[10px] text-slate-400">20 Characters</span>
              </div>

              {/* Current Preview Card */}
              <div 
                className="p-3 rounded-2xl border flex items-center gap-3 transition-all"
                style={{ 
                  backgroundColor: `${selectedColor.hex}15`,
                  borderColor: `${selectedColor.hex}60`
                }}
              >
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-3xl border-2 border-white shadow"
                  style={{ backgroundColor: selectedColor.hex }}
                >
                  {selectedAvatar.avatar}
                </div>
                <div>
                  <div className="text-xs font-black text-white flex items-center gap-1.5">
                    <span>{selectedAvatar.name}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded text-white" style={{ backgroundColor: selectedColor.hex }}>
                      {selectedAvatar.title}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-300 mt-0.5">
                    Class: {selectedAvatar.genderStyle} • Gear: {selectedAccessory.name}
                  </div>
                </div>
              </div>

              {/* Avatar Selection (20 diverse models) */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                  Select Player Model (20 Options):
                </label>
                <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto pr-1">
                  {AVATAR_OPTIONS.map((av) => {
                    const isSelected = selectedAvatar.id === av.id;
                    return (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => {
                          setSelectedAvatar(av);
                          soundEffects.playSelect();
                        }}
                        className={`p-2 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                          isSelected
                            ? 'border-amber-400 bg-amber-500/25 ring-2 ring-amber-400/50 scale-105'
                            : 'border-slate-700 bg-slate-800/80 hover:bg-slate-750'
                        }`}
                      >
                        <span className="text-2xl filter drop-shadow">{av.avatar}</span>
                        <span className="text-[9px] text-slate-300 font-medium mt-1 truncate max-w-full">
                          {av.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Outfit Color Choice */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                  Theme Color:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {OUTFIT_COLORS.map(col => (
                    <button
                      key={col.hex}
                      onClick={() => {
                        setSelectedColor(col);
                        soundEffects.playSelect();
                      }}
                      className={`px-2 py-0.5 rounded-lg border text-[10px] font-medium flex items-center gap-1 transition cursor-pointer ${
                        selectedColor.hex === col.hex ? 'border-white ring-2 ring-white/60 text-white' : 'border-slate-700 text-slate-300'
                      }`}
                      style={{ backgroundColor: selectedColor.hex === col.hex ? col.hex : '#1e293b' }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: col.hex }} />
                      <span>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Style Button */}
              <button
                onClick={handleSaveWardrobe}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                {wardrobeSaved ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>Style Applied to Trainer!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Apply Style to Trainer</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* 5. GRAMMAR GUIDE APP */}
          {activeApp === 'grammar' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <button
                  onClick={() => setActiveApp('home')}
                  className="flex items-center gap-1 text-xs text-sky-400 font-bold hover:underline cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <h3 className="text-sm font-black text-white">GrammarDex Guide</h3>
                <span className="text-[10px] text-amber-300">{currentCity.name}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 space-y-2">
                <div className="text-xs font-black text-amber-300">
                  {currentCity.lessonTitle}
                </div>
                <p className="text-xs text-amber-100 font-medium leading-relaxed">
                  {currentCity.lessonGrammarRule}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  City Road Monsters:
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {currentCity.monsters.map(m => {
                    const isDefeated = student.defeatedMonsterIds.includes(m.id);
                    return (
                      <div
                        key={m.id}
                        className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{m.avatarIcon}</span>
                          <div>
                            <div className="font-bold text-white flex items-center gap-1">
                              <span>{m.name}</span>
                              {isDefeated && <Check className="w-3 h-3 text-emerald-400" />}
                            </div>
                            <div className="text-[10px] text-slate-400">📍 {m.streetName}</div>
                          </div>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-700 text-amber-300">
                          {m.lessonTopic || 'English Core'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 6. RADAR APP */}
          {activeApp === 'radar' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <button
                  onClick={() => setActiveApp('home')}
                  className="flex items-center gap-1 text-xs text-sky-400 font-bold hover:underline cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <h3 className="text-sm font-black text-white">City Radar Locator</h3>
                <span className="text-[10px] text-sky-300">GPS Active</span>
              </div>

              {/* Transit Stations Quick List */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Transit Hubs in {currentCity.name}:
                </span>
                <div className="space-y-1.5">
                  {(currentCity.stations || []).map(stn => (
                    <div 
                      key={stn.id}
                      className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{stn.icon}</span>
                        <div>
                          <div className="font-bold text-white">{stn.name}</div>
                          <div className="text-[10px] text-slate-400">{stn.type.toUpperCase()} Station</div>
                        </div>
                      </div>
                      {onFastTravelToStation && (
                        <button
                          onClick={() => {
                            onFastTravelToStation(stn);
                            onClose();
                          }}
                          className="px-2.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold text-[10px] cursor-pointer"
                        >
                          Fast Travel
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 7. RADIO APP */}
          {activeApp === 'radio' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <button
                  onClick={() => setActiveApp('home')}
                  className="flex items-center gap-1 text-xs text-sky-400 font-bold hover:underline cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <h3 className="text-sm font-black text-white">Audio & Radio</h3>
                <span className="text-[10px] text-pink-400">8-Bit Sound</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-white">Sound Effects & Bells</div>
                  <div className="text-[10px] text-slate-400">Chiptune hits, vehicle horns, chimes</div>
                </div>
                <button
                  onClick={onToggleMute}
                  className={`p-2.5 rounded-xl border transition cursor-pointer ${
                    isMuted ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>

              <button
                onClick={() => soundEffects.playHonk()}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-amber-300 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🎺 Test Taxi Horn</span>
              </button>

              <button
                onClick={() => soundEffects.playCorrectHit()}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-sky-300 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>✨ Test English Chime</span>
              </button>
            </div>
          )}

        </div>

        {/* BOTTOM HOME BAR (Clicking returns to home screen or closes) */}
        <div className="py-2.5 px-6 bg-slate-900 border-t border-slate-800 flex items-center justify-center">
          <button
            onClick={() => {
              soundEffects.playSelect();
              if (activeApp === 'home') {
                onClose();
              } else {
                setActiveApp('home');
              }
            }}
            className="w-28 h-1 rounded-full bg-slate-500 hover:bg-white transition cursor-pointer"
            title={activeApp === 'home' ? 'Swipe / Click to Close' : 'Click for Home Screen'}
          />
        </div>

      </div>
    </div>
  );
};
