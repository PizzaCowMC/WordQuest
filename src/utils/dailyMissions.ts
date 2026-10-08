import { DailyMission, MissionCategory } from '../types';

export interface DailyMissionPoolItem {
  id: string;
  category: MissionCategory;
  title: string;
  description: string;
  targetCount: number;
  xpReward: number;
  coinReward: number;
  icon: string;
}

export const DAILY_MISSION_POOL: DailyMissionPoolItem[] = [
  {
    id: 'grammar-tamer',
    category: 'grammar',
    title: 'Grammar Master',
    description: 'Defeat 3 Grammar Road Monsters on city streets',
    targetCount: 3,
    xpReward: 90,
    coinReward: 50,
    icon: '📝'
  },
  {
    id: 'street-explorer',
    category: 'exploration',
    title: 'City Street Roamer',
    description: 'Walk and explore 2 new street sectors in the city',
    targetCount: 2,
    xpReward: 60,
    coinReward: 35,
    icon: '🧭'
  },
  {
    id: 'accuracy-champion',
    category: 'battle',
    title: 'Flawless Knowledge',
    description: 'Answer 4 battle questions correctly on the first attempt',
    targetCount: 4,
    xpReward: 85,
    coinReward: 45,
    icon: '🎯'
  },
  {
    id: 'vocab-scholar',
    category: 'vocabulary',
    title: 'Lexicon Collector',
    description: 'Defeat 2 Vocabulary Road Monsters',
    targetCount: 2,
    xpReward: 75,
    coinReward: 40,
    icon: '📚'
  },
  {
    id: 'transit-rider',
    category: 'transit',
    title: 'Express Commuter',
    description: 'Ride an Express Subway, Train, or Taxi station',
    targetCount: 1,
    xpReward: 50,
    coinReward: 30,
    icon: '🚅'
  },
  {
    id: 'monument-voyager',
    category: 'monument',
    title: 'Heritage Inspector',
    description: 'Visit a famous monument or historic building in the city',
    targetCount: 1,
    xpReward: 70,
    coinReward: 40,
    icon: '🏛️'
  },
  {
    id: 'duel-competitor',
    category: 'duel',
    title: 'Multiplayer Duelist',
    description: 'Challenge a fellow trainer to a 1v1 English Knowledge Duel',
    targetCount: 1,
    xpReward: 100,
    coinReward: 60,
    icon: '⚔️'
  },
  {
    id: 'airport-inspector',
    category: 'airport',
    title: 'Globe-Trotter Check-in',
    description: 'Visit the International Airport Terminal departure hall',
    targetCount: 1,
    xpReward: 80,
    coinReward: 45,
    icon: '✈️'
  },
  {
    id: 'mob-vanquisher',
    category: 'battle',
    title: 'Monster Vanquisher',
    description: 'Defeat any 3 road monsters roaming the city roads',
    targetCount: 3,
    xpReward: 85,
    coinReward: 50,
    icon: '👾'
  },
  {
    id: 'distance-walker',
    category: 'exploration',
    title: 'Marathon Explorer',
    description: 'Walk 500 meters smoothly along the urban street grid',
    targetCount: 500,
    xpReward: 65,
    coinReward: 35,
    icon: '👟'
  },
  {
    id: 'elemental-hunter',
    category: 'battle',
    title: 'Elemental Specialist',
    description: 'Defeat 2 Fire, Electric, or Wind element monsters',
    targetCount: 2,
    xpReward: 80,
    coinReward: 45,
    icon: '⚡'
  },
  {
    id: 'building-prowler',
    category: 'monument',
    title: 'Hidden Lore Seeker',
    description: 'Enter a city building and investigate monsters hiding inside',
    targetCount: 1,
    xpReward: 75,
    coinReward: 40,
    icon: '🏰'
  }
];

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Simple pseudo-random hash generator seeded by date string
function getSeededRandom(seedStr: string): () => number {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  return function () {
    hash = (hash * 9301 + 49297) % 233280;
    return Math.abs(hash) / 233280;
  };
}

const STORAGE_PREFIX = 'lexiroam_daily_missions_';

export function getDailyMissions(): { date: string; missions: DailyMission[]; allClaimed: boolean; hasUnclaimed: boolean } {
  const dateStr = getTodayDateString();
  const storageKey = STORAGE_PREFIX + dateStr;

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed: DailyMission[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === 3) {
        const allClaimed = parsed.every(m => m.claimed);
        const hasUnclaimed = parsed.some(m => m.completed && !m.claimed);
        return { date: dateStr, missions: parsed, allClaimed, hasUnclaimed };
      }
    }
  } catch {
    // ignore
  }

  // Generate 3 unique balanced daily missions for today
  const rng = getSeededRandom(dateStr);
  const shuffled = [...DAILY_MISSION_POOL].sort(() => rng() - 0.5);

  // Pick 3 from different categories if possible
  const selected: DailyMissionPoolItem[] = [];
  const usedCats = new Set<string>();

  for (const item of shuffled) {
    if (!usedCats.has(item.category) && selected.length < 3) {
      selected.push(item);
      usedCats.add(item.category);
    }
  }

  // Fallback to fill 3 if needed
  for (const item of shuffled) {
    if (selected.length < 3 && !selected.some(s => s.id === item.id)) {
      selected.push(item);
    }
  }

  const missions: DailyMission[] = selected.map(item => ({
    id: `${item.id}-${dateStr}`,
    category: item.category,
    title: item.title,
    description: item.description,
    targetCount: item.targetCount,
    currentCount: 0,
    xpReward: item.xpReward,
    coinReward: item.coinReward,
    completed: false,
    claimed: false,
    icon: item.icon
  }));

  try {
    localStorage.setItem(storageKey, JSON.stringify(missions));
  } catch {
    // ignore
  }

  return { date: dateStr, missions, allClaimed: false, hasUnclaimed: false };
}

export function saveDailyMissions(missions: DailyMission[]) {
  const dateStr = getTodayDateString();
  const storageKey = STORAGE_PREFIX + dateStr;
  try {
    localStorage.setItem(storageKey, JSON.stringify(missions));
    window.dispatchEvent(new CustomEvent('lexiroam_missions_updated', { detail: missions }));
  } catch {
    // ignore
  }
}

export function updateMissionProgress(
  category: MissionCategory, 
  amount = 1,
  filterFn?: (m: DailyMission) => boolean
): { updated: boolean; newlyCompletedMissions: DailyMission[] } {
  const { missions } = getDailyMissions();
  let updated = false;
  const newlyCompletedMissions: DailyMission[] = [];

  const updatedMissions = missions.map(m => {
    if (m.category === category && !m.completed) {
      if (filterFn && !filterFn(m)) return m;

      const newCount = Math.min(m.targetCount, m.currentCount + amount);
      const isNowCompleted = newCount >= m.targetCount;
      if (newCount !== m.currentCount) {
        updated = true;
      }
      if (isNowCompleted && !m.completed) {
        newlyCompletedMissions.push({ ...m, currentCount: newCount, completed: true });
      }
      return {
        ...m,
        currentCount: newCount,
        completed: isNowCompleted
      };
    }
    return m;
  });

  if (updated) {
    saveDailyMissions(updatedMissions);
  }

  return { updated, newlyCompletedMissions };
}

export function claimMissionReward(missionId: string): { success: boolean; xp: number; coins: number } {
  const { missions } = getDailyMissions();
  let xp = 0;
  let coins = 0;
  let success = false;

  const updatedMissions = missions.map(m => {
    if (m.id === missionId && m.completed && !m.claimed) {
      m.claimed = true;
      xp = m.xpReward;
      coins = m.coinReward;
      success = true;
      return { ...m, claimed: true };
    }
    return m;
  });

  if (success) {
    saveDailyMissions(updatedMissions);
  }

  return { success, xp, coins };
}

export function getTimeUntilReset(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const diffMs = tomorrow.getTime() - now.getTime();
  const totalSecs = Math.max(0, Math.floor(diffMs / 1000));
  const hours = Math.floor(totalSecs / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;
  return { hours, minutes, seconds };
}
