/**
 * Real Level progression supporting Levels 1 through 1000 with smooth exponential curve.
 */

export const MAX_LEVEL = 1000;

/**
 * Returns cumulative total XP required to reach a given level (1 to 1000).
 */
export function getXpForLevel(level: number): number {
  if (level <= 1) return 0;
  const target = Math.min(MAX_LEVEL, level);
  // Smooth power scaling:
  // Lv 2: ~35 XP
  // Lv 10: ~1,057 XP
  // Lv 50: ~14,732 XP
  // Lv 100: ~43,694 XP
  // Lv 500: ~532,700 XP
  // Lv 1000: ~1,564,500 XP
  return Math.floor(35 * Math.pow(target - 1, 1.55));
}

/**
 * Calculates current trainer level (1 to 1000) based on total XP.
 */
export function getLevelFromXp(xp: number): number {
  if (xp <= 0) return 1;
  const computed = Math.floor(Math.pow(xp / 35, 1 / 1.55)) + 1;
  return Math.min(MAX_LEVEL, Math.max(1, computed));
}

/**
 * Returns progress details within the current level for the XP bar.
 */
export function getXpProgress(xp: number): {
  currentLevel: number;
  currentLevelStartXp: number;
  nextLevelXp: number;
  currentProgressXp: number;
  neededXp: number;
  percent: number;
  xpRemaining: number;
} {
  const currentLevel = getLevelFromXp(xp);
  if (currentLevel >= MAX_LEVEL) {
    const maxStartXp = getXpForLevel(MAX_LEVEL);
    return {
      currentLevel: MAX_LEVEL,
      currentLevelStartXp: maxStartXp,
      nextLevelXp: maxStartXp,
      currentProgressXp: 0,
      neededXp: 0,
      percent: 100,
      xpRemaining: 0,
    };
  }

  const currentLevelStartXp = getXpForLevel(currentLevel);
  const nextLevelXp = getXpForLevel(currentLevel + 1);
  const neededXp = Math.max(1, nextLevelXp - currentLevelStartXp);
  const currentProgressXp = Math.max(0, xp - currentLevelStartXp);
  const percent = Math.min(100, Math.max(0, Math.round((currentProgressXp / neededXp) * 100)));
  const xpRemaining = Math.max(0, nextLevelXp - xp);

  return {
    currentLevel,
    currentLevelStartXp,
    nextLevelXp,
    currentProgressXp,
    neededXp,
    percent,
    xpRemaining,
  };
}

/**
 * Returns honorary rank title based on level up to Lv. 1000.
 */
export function getLevelTitle(level: number): string {
  if (level >= 1000) return 'Ascended Lexicon Sovereign 👑';
  if (level >= 900) return 'Archmage of All Tongues 🌌';
  if (level >= 800) return 'Supreme Syntax Demigod ⚡';
  if (level >= 700) return 'Mythic Wordsmith 🔮';
  if (level >= 600) return 'Elder Master of Dialects 📜';
  if (level >= 500) return 'Grandmaster Polyglot 🏆';
  if (level >= 400) return 'High Syntax Champion ⚔️';
  if (level >= 300) return 'Global Lexicon Virtuoso 🌟';
  if (level >= 200) return 'Continental Polyglot 🌍';
  if (level >= 150) return 'Distinguished Linguist 🎖️';
  if (level >= 100) return 'Master Word Explorer 🧭';
  if (level >= 75) return 'Advanced Orthographer ✍️';
  if (level >= 50) return 'Linguistic Adventurer 🎒';
  if (level >= 35) return 'Grammar Pathfinder 🌲';
  if (level >= 20) return 'Vocabulary Scout 🔍';
  if (level >= 10) return 'Word Apprentice 📖';
  return 'Novice Word Explorer 🌱';
}
