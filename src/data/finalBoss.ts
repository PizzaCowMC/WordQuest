import { Monster } from '../types';
import { getFinalBossQuestions } from './masterQuestionBank';

export const FINAL_BOSS_MONSTER: Monster = {
  id: 'final-boss-lexicon-archon',
  name: 'The Grand Lexicon Archon',
  type: 'Dragon',
  level: 1000,
  hp: 8,
  maxHp: 8,
  position: [51.5007, -0.1246], // Anchored near royal Westminster or accessed via Portal
  streetName: 'Citadel of Syntax • The Lexicon Throne',
  spriteColor: '#7C3AED',
  auraColor: '#F59E0B',
  description: 'The supreme sovereign and keeper of all 150 world languages! Defeat the Archon by answering super hard, advanced C2 linguistics and keyboard typing challenges!',
  avatarIcon: '👑',
  rarity: 'Boss',
  lessonTopic: 'Ultimate Mastery: The Ascended Lexicon Trial',
  questions: getFinalBossQuestions(),
};
