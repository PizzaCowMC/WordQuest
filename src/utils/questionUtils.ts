import { Question } from '../types';
import { getRandomBankDuelQuestion } from '../data/masterQuestionBank';

/**
 * Shuffles options for a set of battle questions such that:
 * 1. Each question's options are randomized.
 * 2. The correct answer index is updated to match its new shuffled position.
 * 3. Consecutive questions NEVER share the same correct option letter (e.g. if Q1 is A, Q2 will not be A).
 * 4. Across questions in a monster battle, correct answer positions (A, B, C, D) are evenly distributed.
 */
export function prepareBattleQuestions(rawQuestions: Question[]): Question[] {
  if (!rawQuestions || rawQuestions.length === 0) return [];

  // Generate sequence of target indices [0, 1, 2, 3] such that:
  // - targetIndices[i] !== targetIndices[i - 1]
  // - All available option positions (0..3) are rotated/used
  const total = rawQuestions.length;
  const targetIndices: number[] = [];

  // Create a randomized permutation of [0, 1, 2, 3]
  let pool = [0, 1, 2, 3].sort(() => Math.random() - 0.5);

  for (let i = 0; i < total; i++) {
    const q = rawQuestions[i];
    const maxIdx = Math.max(2, (q.options?.length || 4)) - 1;

    // Filter available candidate positions for this question
    let candidates = pool.filter(idx => idx <= maxIdx);
    
    // Ensure candidate doesn't match the immediate previous question's answer
    if (targetIndices.length > 0) {
      const prevIdx = targetIndices[targetIndices.length - 1];
      const nonMatching = candidates.filter(idx => idx !== prevIdx);
      if (nonMatching.length > 0) {
        candidates = nonMatching;
      }
    }

    if (candidates.length === 0) {
      // Refresh pool with a new shuffle
      pool = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
      const prevIdx = targetIndices.length > 0 ? targetIndices[targetIndices.length - 1] : -1;
      candidates = pool.filter(idx => idx <= maxIdx && idx !== prevIdx);
      if (candidates.length === 0) {
        candidates = [0, 1, 2, 3].filter(idx => idx <= maxIdx);
      }
    }

    // Pick one candidate and remove it from current pool
    const chosenIndex = candidates[Math.floor(Math.random() * candidates.length)];
    targetIndices.push(chosenIndex);
    pool = pool.filter(idx => idx !== chosenIndex);
  }

  return rawQuestions.map((q, qIdx) => {
    if (!q.options || q.options.length < 2) return q;

    const originalCorrectIndex = 
      typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < q.options.length
        ? q.correctIndex
        : 0;
    
    const correctAnswer = q.options[originalCorrectIndex];
    const distractors = q.options.filter((_, idx) => idx !== originalCorrectIndex);

    // Shuffle distractors with Fisher-Yates
    for (let i = distractors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
    }

    const targetIdx = targetIndices[qIdx] % q.options.length;

    // Assemble new options array with correct answer at targetIdx
    const newOptions: string[] = [];
    let distractorPtr = 0;
    for (let pos = 0; pos < q.options.length; pos++) {
      if (pos === targetIdx) {
        newOptions.push(correctAnswer);
      } else {
        newOptions.push(distractors[distractorPtr++] || '');
      }
    }

    return {
      ...q,
      options: newOptions,
      correctIndex: targetIdx,
    };
  });
}

export interface DuelQuestionData {
  prompt: string;
  options: string[];
  correctAnswer: string;
}

const DUEL_QUESTION_BANK: { prompt: string; correct: string; distractors: string[] }[] = [
  {
    prompt: 'Which word is an English adjective?',
    correct: 'Magnificent',
    distractors: ['Quickly', 'Run', 'Happiness'],
  },
  {
    prompt: 'What is the past tense of the irregular verb "begin"?',
    correct: 'Began',
    distractors: ['Begun', 'Beginned', 'Begins'],
  },
  {
    prompt: 'Choose the correct opposite (antonym) of the word "ancient":',
    correct: 'Modern',
    distractors: ['Historic', 'Antique', 'Elderly'],
  },
  {
    prompt: 'Complete the sentence: "Neither of the students _____ finished the assignment yet."',
    correct: 'has',
    distractors: ['have', 'were', 'are'],
  },
  {
    prompt: 'What does the common idiom "break the ice" mean?',
    correct: 'To start a friendly conversation',
    distractors: ['To go winter ice fishing', 'To cause an argument', 'To freeze food'],
  },
  {
    prompt: 'Which sentence uses the correct preposition for traveling by plane?',
    correct: 'We arrived in Tokyo on a Boeing 787.',
    distractors: ['We arrived at Tokyo by a Boeing 787.', 'We arrived into Tokyo inside a Boeing 787.', 'We arrived over Tokyo with a Boeing 787.'],
  },
  {
    prompt: 'Which of these words is spelled completely accurately?',
    correct: 'Accommodation',
    distractors: ['Acommodation', 'Accomodation', 'Acomodation'],
  },
  {
    prompt: 'Choose the word that means "to give up or leave behind completely":',
    correct: 'Abandon',
    distractors: ['Acquire', 'Assemble', 'Achieve'],
  },
  {
    prompt: 'What is the comparative form of the adjective "good"?',
    correct: 'Better',
    distractors: ['Gooder', 'More good', 'Best'],
  },
  {
    prompt: 'Complete the conditional: "If she had studied harder, she _____ passed the exam."',
    correct: 'would have',
    distractors: ['will have', 'would had', 'has had'],
  },
  {
    prompt: 'What does the phrasal verb "call off" mean in English?',
    correct: 'To cancel an event or plan',
    distractors: ['To telephone someone', 'To postpone until next week', 'To invite loudly'],
  },
  {
    prompt: 'Which noun is an uncountable (mass) noun in English?',
    correct: 'Luggage',
    distractors: ['Suitcase', 'Bag', 'Backpack'],
  },
  {
    prompt: 'What is the synonym of the word "exhausted"?',
    correct: 'Fatigued',
    distractors: ['Energetic', 'Restless', 'Bored'],
  },
  {
    prompt: 'Complete the sentence: "The museum is renowned _____ its impressionist art gallery."',
    correct: 'for',
    distractors: ['with', 'about', 'from'],
  },
  {
    prompt: 'Which word contains a silent letter?',
    correct: 'Knight',
    distractors: ['Silver', 'Travel', 'Bridge'],
  },
  {
    prompt: 'What is the plural form of the noun "criterion"?',
    correct: 'Criteria',
    distractors: ['Criterions', 'Criterias', 'Criteries'],
  },
  {
    prompt: 'Choose the adverb of frequency:',
    correct: 'Frequently',
    distractors: ['Frequent', 'Frequency', 'Frequentness'],
  },
  {
    prompt: 'What does the idiom "once in a blue moon" describe?',
    correct: 'Something that happens very rarely',
    distractors: ['Something that happens every night', 'An astronomical miracle', 'A full moon party'],
  },
];

/**
 * Returns a randomized duel question with shuffled options and the correct answer randomly positioned.
 */
export function getRandomDuelQuestion(cityName?: string): DuelQuestionData {
  return getRandomBankDuelQuestion(cityName);
}
