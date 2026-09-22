import { useState, useEffect } from 'react';
import { INITIAL_CITIES, STARTERS } from './data/gameData';
import { CityData, Monster, StarterCompanion, StudentProfile, TrainerAppearance, TransitStation, VehicleType } from './types';
import { CityMapView } from './components/CityMapView';
import { BattleModal } from './components/BattleModal';
import { FlightSequence } from './components/FlightSequence';
import { TrainerSetupModal } from './components/TrainerSetupModal';
import { FieldGuideModal } from './components/FieldGuideModal';
import { CityLessonModal } from './components/CityLessonModal';
import { TransitStationModal } from './components/TransitStationModal';
import { PhoneModal } from './components/PhoneModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { SaveSystemModal } from './components/SaveSystemModal';
import { DailyRewardModal } from './components/DailyRewardModal';
import { toggleSound, isSoundEnabled, soundEffects } from './utils/audio';

const STORAGE_KEY = 'wordquest_student_profile';

export default function App() {
  const [allCities] = useState<CityData[]>(INITIAL_CITIES);
  const [currentCityIndex, setCurrentCityIndex] = useState<number>(0);

  const [student, setStudent] = useState<StudentProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('wordquest_saved_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed;
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Restore current city index from student profile if available
  useEffect(() => {
    if (student && typeof student.currentCityIndex === 'number') {
      setCurrentCityIndex(student.currentCityIndex);
    }
  }, []);

  const [activeBattleMonster, setActiveBattleMonster] = useState<Monster | null>(null);
  const [showFlightModal, setShowFlightModal] = useState<boolean>(false);
  const [showFieldGuideModal, setShowFieldGuideModal] = useState<boolean>(false);
  const [showLessonGuideModal, setShowLessonGuideModal] = useState<boolean>(false);
  const [showTransitModal, setShowTransitModal] = useState<boolean>(false);
  const [showPhoneModal, setShowPhoneModal] = useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [showDailyRewardModal, setShowDailyRewardModal] = useState<boolean>(false);
  const [selectedStation, setSelectedStation] = useState<TransitStation | null>(null);
  const [fastTravelTarget, setFastTravelTarget] = useState<TransitStation | null>(null);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(!isSoundEnabled());
  
  // Real-time Mini-Map HUD state (Off by default as requested by user)
  const [showMiniMap, setShowMiniMap] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('wordquest_minimap_enabled');
      return saved !== null ? saved === 'true' : false; // Default: false (OFF)
    } catch {
      return false;
    }
  });

  const handleToggleMiniMap = () => {
    setShowMiniMap(prev => {
      const next = !prev;
      try {
        localStorage.setItem('wordquest_minimap_enabled', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Derive current & next city along the 26-city global route
  const currentCity = allCities[currentCityIndex] || allCities[0];
  const nextCityIndex = (currentCityIndex + 1) % allCities.length;
  const secondCity = allCities[nextCityIndex];

  // Save student to localStorage
  useEffect(() => {
    if (student) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          ...student,
          currentCityIndex
        }));
      } catch {
        // ignore
      }
    }
  }, [student, currentCityIndex]);

  // Ensure trainer walks on foot (no car driving)
  useEffect(() => {
    if (student && student.activeVehicle !== 'walk') {
      setStudent(prev => prev ? ({ ...prev, activeVehicle: 'walk' }) : null);
    }
  }, [student?.activeVehicle]);

  // Check if all monsters in current city are defeated and trigger flight
  useEffect(() => {
    if (!student) return;
    const cityMonsterIds = currentCity.monsters.map(m => m.id);
    const defeatedInCity = cityMonsterIds.filter(id => student.defeatedMonsterIds.includes(id));
    
    if (cityMonsterIds.length > 0 && defeatedInCity.length >= cityMonsterIds.length) {
      // If we haven't already marked next city as visited and flight is not showing
      if (!showFlightModal && !student.visitedCities.includes(secondCity.id)) {
        const timer = setTimeout(() => {
          setShowFlightModal(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [student?.defeatedMonsterIds, currentCity.id, secondCity.id, showFlightModal]);

  // Handle Trainer Setup Submission with appearance customization
  const handleTrainerComplete = (name: string, starter: StarterCompanion, appearance: TrainerAppearance) => {
    const newStudent: StudentProfile = {
      name,
      appearance,
      activeVehicle: 'walk',
      starter,
      level: 5,
      xp: 0,
      coins: 50,
      travelMinutesSpent: 0,
      defeatedMonsterIds: [],
      capturedMonsters: [],
      currentCityIndex: 0,
      visitedCities: [currentCity.id],
      unlockedVehicles: ['walk', 'bicycle'],
      purchasedTickets: [],
      dailyStreak: 0,
      lastDailyRewardDate: ''
    };
    setCurrentCityIndex(0);
    setStudent(newStudent);
  };

  // Daily login reward check: prompts on first login of each day
  useEffect(() => {
    if (!student) return;
    const todayStr = new Date().toLocaleDateString('en-CA');
    if (student.lastDailyRewardDate !== todayStr) {
      // First time logging in today -> grant/prompt daily bonus
      const timer = setTimeout(() => {
        setShowDailyRewardModal(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [student?.name]);

  // Claim Daily Reward Handler
  const handleClaimDailyReward = (bonusCoins: number, bonusXp: number, newStreak: number, dateStr: string) => {
    setStudent(prev => {
      if (!prev) return null;
      const updated: StudentProfile = {
        ...prev,
        coins: prev.coins + bonusCoins,
        xp: prev.xp + bonusXp,
        dailyStreak: newStreak,
        lastDailyRewardDate: dateStr
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Reset Button logic - clears storage and resets student to null so TrainerSetupModal shows
  const handleConfirmReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('wordquest_saved_profile');
    } catch {
      // ignore
    }
    setStudent(null);
    setCurrentCityIndex(0);
    setActiveBattleMonster(null);
    setShowFlightModal(false);
    setShowFieldGuideModal(false);
    setShowLessonGuideModal(false);
    setShowTransitModal(false);
    setShowResetModal(false);
    soundEffects.playSelect();
  };

  // Handle Encountering a Monster on the Road
  const handleSelectMonster = (monster: Monster) => {
    setActiveBattleMonster(monster);
  };

  // Handle Battle Victory (defeating a monster with English questions)
  const handleBattleVictory = (monsterId: string, earnedXp: number) => {
    if (!student) return;

    setStudent(prev => {
      if (!prev) return prev;
      const alreadyDefeated = prev.defeatedMonsterIds.includes(monsterId);
      const newDefeated = alreadyDefeated 
        ? prev.defeatedMonsterIds 
        : [...prev.defeatedMonsterIds, monsterId];
      
      const newXp = prev.xp + earnedXp;
      const newLevel = Math.floor(newXp / 140) + 5;
      const earnedCoins = alreadyDefeated ? 8 : 25;

      return {
        ...prev,
        xp: newXp,
        level: Math.max(prev.level, newLevel),
        coins: (prev.coins || 0) + earnedCoins,
        defeatedMonsterIds: newDefeated,
        capturedMonsters: alreadyDefeated ? prev.capturedMonsters : [...prev.capturedMonsters, monsterId]
      };
    });

    setActiveBattleMonster(null);
  };

  // Handle Flight Landing in Next City - log travel flight time!
  const handleLandInSecondCity = (flightMinutes: number = 0) => {
    soundEffects.playSelect();
    setShowFlightModal(false);

    const nextIndex = (currentCityIndex + 1) % allCities.length;
    const landedCity = allCities[nextIndex];
    setCurrentCityIndex(nextIndex);

    if (student) {
      setStudent(prev => prev ? {
        ...prev,
        currentCityIndex: nextIndex,
        travelMinutesSpent: (prev.travelMinutesSpent || 0) + flightMinutes,
        visitedCities: prev.visitedCities.includes(landedCity.id)
          ? prev.visitedCities
          : [...prev.visitedCities, landedCity.id]
      } : null);
    }
  };

  // Switch Vehicle (Walk, Bicycle, Bus, Taxi, Car, Subway, Train)
  const handleSelectVehicle = (vehicle: VehicleType) => {
    if (!student) return;
    setStudent(prev => prev ? {
      ...prev,
      activeVehicle: vehicle
    } : null);
  };

  // Update Trainer Appearance from Smartphone Wardrobe
  const handleUpdateAppearance = (appearance: TrainerAppearance) => {
    if (!student) return;
    setStudent(prev => prev ? {
      ...prev,
      appearance
    } : null);
  };

  // Buy Ticket / Hail Ride via Smartphone
  const handleBuyTicket = (ticketId: string, costCoins: number, vehicleType: VehicleType): boolean => {
    if (!student) return false;
    if (student.coins < costCoins) return false;

    setStudent(prev => {
      if (!prev) return prev;
      const currentTickets = prev.purchasedTickets || [];
      const currentVehicles = prev.unlockedVehicles || ['walk', 'bicycle'];

      return {
        ...prev,
        coins: prev.coins - costCoins,
        purchasedTickets: currentTickets.includes(ticketId) ? currentTickets : [...currentTickets, ticketId],
        unlockedVehicles: currentVehicles.includes(vehicleType) ? currentVehicles : [...currentVehicles, vehicleType],
        activeVehicle: vehicleType
      };
    });

    return true;
  };

  // Open Transit Station Hub
  const handleOpenTransitHub = (station?: TransitStation) => {
    setSelectedStation(station || null);
    setShowTransitModal(true);
  };

  // Fast Travel between stations in city
  const handleFastTravelToStation = (station: TransitStation) => {
    soundEffects.playSelect();
    soundEffects.playVictoryFanfare();
    setFastTravelTarget({ ...station });
    setSelectedStation(station);
    setShowTransitModal(false);
  };

  // Sound Toggle
  const handleToggleMute = () => {
    const newState = toggleSound();
    setIsMuted(!newState);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-slate-950 font-['Outfit',sans-serif]">
      
      {/* 1. TRAINER SETUP MODAL (If student hasn't entered name yet or after Reset) */}
      {!student && (
        <TrainerSetupModal
          currentCity={currentCity}
          secondCity={secondCity}
          onComplete={handleTrainerComplete}
        />
      )}

      {/* 2. MAIN MAP VIEW (Stand on a map of current city, just like Google Maps, navigate with WASD) */}
      {student && (
        <CityMapView
          currentCity={currentCity}
          secondCity={secondCity}
          cityIndex={currentCityIndex}
          totalCities={allCities.length}
          student={student}
          activeMonster={activeBattleMonster}
          fastTravelTarget={fastTravelTarget}
          onSelectMonster={handleSelectMonster}
          onOpenFieldGuide={() => setShowFieldGuideModal(true)}
          onOpenFlight={() => setShowFlightModal(true)}
          onOpenLessonGuide={() => setShowLessonGuideModal(true)}
          onOpenTransitHub={handleOpenTransitHub}
          onOpenPhone={() => setShowPhoneModal(true)}
          onOpenSaveSystem={() => setShowSaveModal(true)}
          onOpenDailyReward={() => setShowDailyRewardModal(true)}
          onSelectVehicle={handleSelectVehicle}
          onResetClick={() => setShowResetModal(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          showMiniMap={showMiniMap}
          onToggleMiniMap={handleToggleMiniMap}
        />
      )}

      {/* 3. BATTLE MODAL (Click monster or walk into monster to start its questions) */}
      {activeBattleMonster && student && (
        <BattleModal
          monster={activeBattleMonster}
          student={student}
          onVictory={handleBattleVictory}
          onClose={() => setActiveBattleMonster(null)}
        />
      )}

      {/* 4. FLIGHT SEQUENCE (3D Plane Landing, Flying, Flight Times Logged) */}
      {showFlightModal && student && (
        <FlightSequence
          currentCity={currentCity}
          secondCity={secondCity}
          cityIndex={currentCityIndex}
          totalCities={allCities.length}
          student={student}
          onLandInSecondCity={handleLandInSecondCity}
          onClose={() => setShowFlightModal(false)}
        />
      )}

      {/* 5. MONSTER FIELD GUIDE & PASSPORT MODAL */}
      {showFieldGuideModal && student && (
        <FieldGuideModal
          student={student}
          cities={allCities}
          onClose={() => setShowFieldGuideModal(false)}
        />
      )}

      {/* 6. CITY LESSON & GRAMMAR GUIDE MODAL */}
      {showLessonGuideModal && student && (
        <CityLessonModal
          city={currentCity}
          cityIndex={currentCityIndex}
          totalCities={allCities.length}
          defeatedMonsterIds={student.defeatedMonsterIds}
          onStartLessonBattle={(monster) => {
            setShowLessonGuideModal(false);
            handleSelectMonster(monster);
          }}
          onClose={() => setShowLessonGuideModal(false)}
        />
      )}

      {/* 7. CITY EXPRESS LINES RAPID TRANSIT MODAL */}
      {showTransitModal && student && (
        <TransitStationModal
          station={selectedStation}
          currentCity={currentCity}
          onFastTravelToStation={handleFastTravelToStation}
          onClose={() => setShowTransitModal(false)}
        />
      )}

      {/* 8. SMARTPHONE APP MODAL (Call Taxis, Buy Tickets, Change Player Models, Wardrobe, GrammarDex) */}
      {showPhoneModal && student && (
        <PhoneModal
          student={student}
          currentCity={currentCity}
          onClose={() => setShowPhoneModal(false)}
          onSelectVehicle={handleSelectVehicle}
          onUpdateAppearance={handleUpdateAppearance}
          onBuyTicket={handleBuyTicket}
          onOpenFieldGuide={() => {
            setShowPhoneModal(false);
            setShowFieldGuideModal(true);
          }}
          onOpenLessonGuide={() => {
            setShowPhoneModal(false);
            setShowLessonGuideModal(true);
          }}
          onOpenSaveSystem={() => {
            setShowPhoneModal(false);
            setShowSaveModal(true);
          }}
          onOpenDailyReward={() => {
            setShowPhoneModal(false);
            setShowDailyRewardModal(true);
          }}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          showMiniMap={showMiniMap}
          onToggleMiniMap={handleToggleMiniMap}
        />
      )}

      {/* 9. ADVENTURE SAVE SYSTEM MODAL (Save Slots, Quick Save, JSON Export/Import) */}
      {showSaveModal && student && (
        <SaveSystemModal
          student={student}
          currentCity={currentCity}
          cityIndex={currentCityIndex}
          totalCities={allCities.length}
          onLoadProfile={(loadedProfile, loadedCityIndex) => {
            setStudent(loadedProfile);
            setCurrentCityIndex(loadedCityIndex);
            setActiveBattleMonster(null);
            setShowSaveModal(false);
          }}
          onClose={() => setShowSaveModal(false)}
        />
      )}

      {/* 10. DAILY LOGIN REWARDS & STREAK MODAL */}
      {showDailyRewardModal && student && (
        <DailyRewardModal
          student={student}
          onClaimReward={handleClaimDailyReward}
          onOpenLessonGuide={() => {
            setShowDailyRewardModal(false);
            setShowLessonGuideModal(true);
          }}
          onClose={() => setShowDailyRewardModal(false)}
        />
      )}

      {/* 11. RESET CONFIRMATION MODAL */}
      {showResetModal && (
        <ResetConfirmModal
          onConfirm={handleConfirmReset}
          onCancel={() => setShowResetModal(false)}
        />
      )}
    </main>
  );
}
