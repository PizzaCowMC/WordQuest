import { useState, useEffect } from 'react';
import { STARTERS } from './data/gameData';
import { ALL_150_CITIES } from './data/worldCities150';
import { CityData, Monster, StarterCompanion, StudentProfile, TrainerAppearance, TransitStation, VehicleType, WeatherCondition, MultiplayerPlayer, CityBuilding } from './types';
import { CityMapView } from './components/CityMapView';
import { BattleModal } from './components/BattleModal';
import { FlightSequence } from './components/FlightSequence';
import { TrainerSetupModal } from './components/TrainerSetupModal';
import { FieldGuideModal } from './components/FieldGuideModal';
import { TransitStationModal } from './components/TransitStationModal';
import { PhoneModal } from './components/PhoneModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { SaveSystemModal } from './components/SaveSystemModal';
import { DailyRewardModal } from './components/DailyRewardModal';
import { MultiplayerChatDrawer } from './components/MultiplayerChatDrawer';
import { MultiplayerTrainerCardModal } from './components/MultiplayerTrainerCardModal';
import { MultiplayerDuelModal } from './components/MultiplayerDuelModal';
import { UpdateLogsModal } from './components/UpdateLogsModal';
import { BuildingModal } from './components/BuildingModal';
import { AirportTerminalModal } from './components/AirportTerminalModal';
import { DailyMissionsModal } from './components/DailyMissionsModal';
import { updateMissionProgress } from './utils/dailyMissions';
import { useMultiplayer } from './hooks/useMultiplayer';
import { toggleSound, isSoundEnabled, soundEffects } from './utils/audio';
import { getRandomWeatherForTimestamp } from './utils/weatherUtils';
import { getRandomDuelQuestion } from './utils/questionUtils';

const STORAGE_KEY = 'wordquest_student_profile';

export default function App() {
  const [allCities] = useState<CityData[]>(ALL_150_CITIES);
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

  // Temperature unit preference (°C default, toggleable to °F in settings and phone)
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>(() => {
    try {
      const saved = localStorage.getItem('wordquest_temp_unit');
      if (saved === 'C' || saved === 'F') return saved;
      return student?.tempUnit || 'C';
    } catch {
      return 'C';
    }
  });

  const handleToggleTempUnit = (unit: 'C' | 'F') => {
    setTempUnit(unit);
    try {
      localStorage.setItem('wordquest_temp_unit', unit);
    } catch {
      // ignore
    }
    setStudent(prev => prev ? ({ ...prev, tempUnit: unit }) : null);
  };

  // Dynamic Random Weather System (Random weather changes every 15 min, no manual changing)
  const [currentWeather, setCurrentWeather] = useState<WeatherCondition>(() => {
    return getRandomWeatherForTimestamp(Date.now());
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const next = getRandomWeatherForTimestamp(Date.now());
      setCurrentWeather(prev => (prev !== next ? next : prev));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const [activeBattleMonster, setActiveBattleMonster] = useState<Monster | null>(null);
  const [showFlightModal, setShowFlightModal] = useState<boolean>(false);
  const [showFieldGuideModal, setShowFieldGuideModal] = useState<boolean>(false);
  const [showTransitModal, setShowTransitModal] = useState<boolean>(false);
  const [showPhoneModal, setShowPhoneModal] = useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [showDailyRewardModal, setShowDailyRewardModal] = useState<boolean>(false);
  const [selectedBuilding, setSelectedBuilding] = useState<CityBuilding | null>(null);
  const [showAirportModal, setShowAirportModal] = useState<boolean>(false);
  const [showDailyMissionsModal, setShowDailyMissionsModal] = useState<boolean>(false);
  const [customFlightDestination, setCustomFlightDestination] = useState<CityData | null>(null);
  const [selectedStation, setSelectedStation] = useState<TransitStation | null>(null);
  const [fastTravelTarget, setFastTravelTarget] = useState<TransitStation | null>(null);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [showUpdateLogsModal, setShowUpdateLogsModal] = useState<boolean>(false);
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

  // Derive current & next city along the 150-city global route
  const currentCity = allCities[currentCityIndex] || allCities[0];
  const nextCityIndex = (currentCityIndex + 1) % allCities.length;
  const secondCity = allCities[nextCityIndex];

  // Real-time Multiplayer WebSocket hook
  const multiplayer = useMultiplayer({
    student,
    currentCity,
    cityIndex: currentCityIndex,
  });

  const [selectedRemotePlayer, setSelectedRemotePlayer] = useState<MultiplayerPlayer | null>(null);

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
    setSelectedBuilding(null);
    setShowAirportModal(false);
    setShowDailyMissionsModal(false);
    setCustomFlightDestination(null);
    setShowFlightModal(false);
    setShowFieldGuideModal(false);
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

    const defeatedMonster = currentCity.monsters.find(m => m.id === monsterId);
    if (defeatedMonster) {
      multiplayer.announceMonsterDefeated(defeatedMonster.name, earnedXp);
    }

    // Daily Mission Progress: Battle defeat
    updateMissionProgress('battle', 1);
    if (defeatedMonster?.questions?.some(q => q.category === 'grammar')) {
      updateMissionProgress('grammar', 1);
    }
    if (defeatedMonster?.questions?.some(q => q.category === 'vocabulary')) {
      updateMissionProgress('vocabulary', 1);
    }

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
  const handleLandInSecondCity = (flightMinutes: number = 0, explicitIndex?: number) => {
    soundEffects.playSelect();
    setShowFlightModal(false);

    const nextIndex = typeof explicitIndex === 'number' 
      ? explicitIndex 
      : (currentCityIndex + 1) % allCities.length;
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

  // Launch Flight from Physical Airport Terminal
  const handleLaunchAirportFlight = (targetCity: CityData) => {
    const totalMonsters = currentCity.monsters.length;
    const defeatedCount = currentCity.monsters.filter(m => student?.defeatedMonsterIds.includes(m.id)).length;
    const isCityFinished = totalMonsters > 0 ? defeatedCount >= totalMonsters : true;
    const nextCity = allCities[(currentCityIndex + 1) % allCities.length];
    const isAllowed = (isCityFinished && targetCity.id === nextCity.id) || (student?.visitedCities.includes(targetCity.id));

    if (!isAllowed) {
      soundEffects.playWrong();
      return;
    }

    setCustomFlightDestination(targetCity);
    setShowAirportModal(false);
    setShowFlightModal(true);
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
    updateMissionProgress('transit', 1);
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
          currentWeather={currentWeather}
          tempUnit={tempUnit}
          onToggleTempUnit={handleToggleTempUnit}
          multiplayerPlayers={multiplayer.players}
          onSendMovement={multiplayer.sendMovement}
          onSelectRemotePlayer={(player) => setSelectedRemotePlayer(player)}
          onOpenUpdateLogs={() => setShowUpdateLogsModal(true)}
          onOpenBuilding={(building) => setSelectedBuilding(building)}
          onOpenAirport={() => setShowAirportModal(true)}
          onOpenDailyMissions={() => setShowDailyMissionsModal(true)}
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
          secondCity={customFlightDestination || secondCity}
          cityIndex={currentCityIndex}
          totalCities={allCities.length}
          student={student}
          onLandInSecondCity={(flightMinutes) => {
            const targetIdx = customFlightDestination ? allCities.findIndex(c => c.id === customFlightDestination.id) : undefined;
            setCustomFlightDestination(null);
            handleLandInSecondCity(flightMinutes, targetIdx !== -1 ? targetIdx : undefined);
          }}
          onClose={() => {
            setCustomFlightDestination(null);
            setShowFlightModal(false);
          }}
        />
      )}

      {/* 4b. PHYSICAL AIRPORT TERMINAL MODAL (Boarding pass, check-in, customs security) */}
      {showAirportModal && student && (
        <AirportTerminalModal
          currentCity={currentCity}
          allCities={allCities}
          student={student}
          onLaunchFlight={handleLaunchAirportFlight}
          onClose={() => setShowAirportModal(false)}
        />
      )}

      {/* 4c. BUILDING & FAMOUS MONUMENT MODAL (Monuments where mobs can hide inside) */}
      {selectedBuilding && student && (
        <BuildingModal
          building={selectedBuilding}
          cityName={currentCity.name}
          cityMonsters={currentCity.monsters}
          student={student}
          onBattleMonster={(monster) => {
            setSelectedBuilding(null);
            setActiveBattleMonster(monster);
          }}
          onClose={() => setSelectedBuilding(null)}
        />
      )}

      {/* 4d. DAILY MISSIONS MODAL (3 Random daily educational tasks) */}
      {showDailyMissionsModal && student && (
        <DailyMissionsModal
          onRewardClaimed={(earnedXp, earnedCoins) => {
            setStudent(prev => prev ? ({
              ...prev,
              xp: prev.xp + earnedXp,
              coins: prev.coins + earnedCoins,
              level: Math.floor((prev.xp + earnedXp) / 140) + 5,
            }) : null);
          }}
          onClose={() => setShowDailyMissionsModal(false)}
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

      {/* 6. CITY EXPRESS LINES RAPID TRANSIT MODAL */}
      {showTransitModal && student && (
        <TransitStationModal
          station={selectedStation}
          currentCity={currentCity}
          onFastTravelToStation={handleFastTravelToStation}
          onClose={() => setShowTransitModal(false)}
        />
      )}

      {/* 7. SMARTPHONE APP MODAL (Weather, Call Taxis, Buy Tickets, Change Player Models, Wardrobe, Save) */}
      {showPhoneModal && student && (
        <PhoneModal
          student={student}
          currentCity={currentCity}
          weather={currentWeather}
          tempUnit={tempUnit}
          onToggleTempUnit={handleToggleTempUnit}
          onClose={() => setShowPhoneModal(false)}
          onSelectVehicle={handleSelectVehicle}
          onUpdateAppearance={handleUpdateAppearance}
          onBuyTicket={handleBuyTicket}
          onOpenFieldGuide={() => {
            setShowPhoneModal(false);
            setShowFieldGuideModal(true);
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
          onOpenUpdateLogs={() => {
            setShowPhoneModal(false);
            setShowUpdateLogsModal(true);
          }}
        />
      )}

      {/* 8. ADVENTURE SAVE SYSTEM MODAL (Save Slots, Quick Save, JSON Export/Import) */}
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

      {/* 9. DAILY LOGIN REWARDS & STREAK MODAL */}
      {showDailyRewardModal && student && (
        <DailyRewardModal
          student={student}
          onClaimReward={handleClaimDailyReward}
          onClose={() => setShowDailyRewardModal(false)}
        />
      )}

      {/* 10. MULTIPLAYER REAL-TIME CHAT & ROSTER DRAWER */}
      {student && (
        <MultiplayerChatDrawer
          student={student}
          myPlayerId={multiplayer.myPlayerId}
          room={multiplayer.room}
          status={multiplayer.status}
          players={multiplayer.players}
          chatMessages={multiplayer.chatMessages}
          currentCityIndex={currentCityIndex}
          onSendMessage={multiplayer.sendChat}
          onSendEmote={multiplayer.sendEmote}
          onSwitchRoom={multiplayer.switchRoom}
          onSelectPlayer={(player) => setSelectedRemotePlayer(player)}
        />
      )}

      {/* 11. MULTIPLAYER TRAINER CARD MODAL (Click any player on map/roster) */}
      {selectedRemotePlayer && (
        <MultiplayerTrainerCardModal
          player={selectedRemotePlayer}
          onChallengeDuel={(targetPlayerId) => {
            const duelQuestion = getRandomDuelQuestion(currentCity.name);
            multiplayer.inviteToDuel(targetPlayerId, duelQuestion);
          }}
          onSendEmote={multiplayer.sendEmote}
          onClose={() => setSelectedRemotePlayer(null)}
        />
      )}

      {/* 12. MULTIPLAYER REAL-TIME 1v1 DUEL MODAL */}
      {student && (multiplayer.activeDuel || multiplayer.incomingDuelInvite || multiplayer.duelResult) && (
        <MultiplayerDuelModal
          student={student}
          myPlayerId={multiplayer.myPlayerId}
          activeDuel={multiplayer.activeDuel}
          incomingDuelInvite={multiplayer.incomingDuelInvite}
          duelResult={multiplayer.duelResult}
          onAcceptDuel={(id) => multiplayer.respondToDuel(id, true)}
          onDeclineDuel={(id) => multiplayer.respondToDuel(id, false)}
          onAnswerDuel={(id, ans) => multiplayer.answerDuel(id, ans)}
          onClose={multiplayer.dismissDuel}
          onAwardReward={(coins, xp) => {
            setStudent(prev => prev ? ({
              ...prev,
              coins: (prev.coins || 0) + coins,
              xp: prev.xp + xp,
              level: Math.floor((prev.xp + xp) / 140) + 5,
            }) : null);
          }}
        />
      )}

      {/* 13. RESET CONFIRMATION MODAL */}
      {showResetModal && (
        <ResetConfirmModal
          onConfirm={handleConfirmReset}
          onCancel={() => setShowResetModal(false)}
        />
      )}

      {/* 14. RELEASE NOTES & UPDATE LOGS MODAL (v1.0.0 - v1.9.6) */}
      {showUpdateLogsModal && (
        <UpdateLogsModal
          onClose={() => setShowUpdateLogsModal(false)}
        />
      )}
    </main>
  );
}
