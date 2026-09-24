import { StarterCompanion, CityData } from '../types';
import { CITY_TRANSIT_STATIONS, CITY_LESSONS_INFO, SEOUL_CITY, BERLIN_CITY } from './transitData';
import { EXPANDED_CITIES_13_TO_26 } from './expandedCities';

export const APP_VERSION = '1.9.5';

export const STARTERS: StarterCompanion[] = [
  {
    id: 'starter-electric',
    name: 'Voltling',
    type: 'Electric',
    color: 'from-amber-400 to-yellow-500',
    description: 'Energetic and bright! Masters grammar rules with lightning speed.',
    avatar: '⚡'
  },
  {
    id: 'starter-fire',
    name: 'Pyropup',
    type: 'Fire',
    color: 'from-orange-500 to-red-600',
    description: 'Brave and passionate! Burns through tough vocabulary challenges.',
    avatar: '🔥'
  },
  {
    id: 'starter-water',
    name: 'Aquatail',
    type: 'Water',
    color: 'from-sky-400 to-blue-600',
    description: 'Calm and steady! Flows smoothly through reading and spelling.',
    avatar: '💧'
  },
  {
    id: 'starter-grass',
    name: 'Leafox',
    type: 'Grass',
    color: 'from-emerald-400 to-green-600',
    description: 'Clever and curious! Grows a huge collection of English words.',
    avatar: '🌿'
  }
];

const BASE_CITIES: any[] = [
  // CITY 1: LONDON, UK
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    coordinates: [51.5074, -0.1278],
    zoom: 14,
    welcomeMessage: 'Welcome to London (City 1/10)! Monsters roam from Big Ben to Tower Bridge. Defeat all 4 monsters using your English skills to unlock Flight #1 to Tokyo!',
    landmarks: ['Big Ben', 'Trafalgar Square', 'Piccadilly Circus', 'Tower Bridge'],
    monsters: [
      {
        id: 'lon-1',
        name: 'Voltix',
        type: 'Electric',
        level: 4,
        hp: 3,
        maxHp: 3,
        position: [51.5013, -0.1249],
        streetName: 'Westminster Bridge Road',
        spriteColor: '#F59E0B',
        description: 'A crackling lightning monster guarding the bridge near Big Ben!',
        avatarIcon: '⚡',
        questions: [
          {
            id: 'lon-1-q1',
            category: 'grammar',
            questionText: 'Yesterday, Sarah _____ to the museum by double-decker bus.',
            hint: 'Irregular past tense of "go"',
            options: ['go', 'went', 'goed', 'goes'],
            correctIndex: 1,
            explanation: '"Went" is the irregular past tense form of "go".',
            moveName: 'Volt Tackle'
          },
          {
            id: 'lon-1-q2',
            category: 'vocabulary',
            questionText: 'What is the opposite of the word "noisy"?',
            hint: 'Peaceful and calm',
            options: ['loud', 'quiet', 'bright', 'heavy'],
            correctIndex: 1,
            explanation: '"Quiet" is the exact opposite (antonym) of "noisy".',
            moveName: 'Thunder Spark'
          },
          {
            id: 'lon-1-q3',
            category: 'grammar',
            questionText: 'Look! The big clock tower _____ ringing right now.',
            hint: 'Present continuous with singular subject',
            options: ['are', 'is', 'were', 'be'],
            correctIndex: 1,
            explanation: 'The clock tower is singular, so we use "is ringing".',
            moveName: 'Lightning Flash'
          },
          {
            id: 'lon-1-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for the 7th day of the week?',
            hint: 'Starts with S-u-n...',
            options: ['Sunday', 'Sundae', 'Sonday', 'Sanday'],
            correctIndex: 0,
            explanation: '"Sunday" is spelled S-u-n-d-a-y.',
            moveName: 'Electric Surge'
          }
        ]
      },
      {
        id: 'lon-2',
        name: 'Gloopie',
        type: 'Water',
        level: 5,
        hp: 3,
        maxHp: 3,
        position: [51.5080, -0.1281],
        streetName: 'Trafalgar Square / The Strand',
        spriteColor: '#0EA5E9',
        description: 'A splashing river water sprite by the grand fountains of Trafalgar Square!',
        avatarIcon: '💧',
        questions: [
          {
            id: 'lon-2-q1',
            category: 'grammar',
            questionText: 'There are two pigeons and three _____ playing near the fountain.',
            hint: 'Irregular plural of "child"',
            options: ['childs', 'children', 'childrens', 'childes'],
            correctIndex: 1,
            explanation: '"Children" is the irregular plural form of "child".',
            moveName: 'Aqua Jet'
          },
          {
            id: 'lon-2-q2',
            category: 'vocabulary',
            questionText: 'Which word means "extremely large"?',
            hint: 'Gigantic, massive',
            options: ['tiny', 'enormous', 'narrow', 'shallow'],
            correctIndex: 1,
            explanation: '"Enormous" means extremely large in size or scale.',
            moveName: 'Water Pulse'
          },
          {
            id: 'lon-2-q3',
            category: 'grammar',
            questionText: 'The National Gallery is open _____ 10:00 AM to 6:00 PM.',
            hint: 'Paired with "to" for time ranges',
            options: ['at', 'from', 'on', 'in'],
            correctIndex: 1,
            explanation: 'We use "from [time] to [time]" to indicate a time span.',
            moveName: 'Bubble Beam'
          },
          {
            id: 'lon-2-q4',
            category: 'reading',
            questionText: '"Mind the Gap!" When you hear this in London Underground, it means:',
            hint: 'Be careful when boarding the train',
            options: ['Watch the space between train and platform', 'Buy a ticket', 'Turn off your phone', 'Eat your sandwich'],
            correctIndex: 0,
            explanation: '"Mind the gap" warns passengers to be careful stepping over the space.',
            moveName: 'Hydro Pump'
          }
        ]
      },
      {
        id: 'lon-3',
        name: 'Emberex',
        type: 'Fire',
        level: 6,
        hp: 3,
        maxHp: 3,
        position: [51.5101, -0.1345],
        streetName: 'Piccadilly Circus / Shaftesbury Ave',
        spriteColor: '#EF4444',
        description: 'A fiery neon beast glowing brighter than the famous Piccadilly billboards!',
        avatarIcon: '🔥',
        questions: [
          {
            id: 'lon-3-q1',
            category: 'grammar',
            questionText: 'An airplane is _____ than a double-decker bus.',
            hint: 'Comparative form of "fast"',
            options: ['faster', 'fastest', 'more fast', 'as fast'],
            correctIndex: 0,
            explanation: 'For short adjectives comparing two items, add "-er" (faster).',
            moveName: 'Flame Burst'
          },
          {
            id: 'lon-3-q2',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for the middle day of the work week?',
            hint: 'Silent "d"',
            options: ['Wensday', 'Wednesday', 'Wenesday', 'Wedensday'],
            correctIndex: 1,
            explanation: '"Wednesday" is spelled W-e-d-n-e-s-d-a-y.',
            moveName: 'Fire Spin'
          },
          {
            id: 'lon-3-q3',
            category: 'vocabulary',
            questionText: 'When rain pours down in London, people open an _______.',
            hint: 'Protects you from wet weather',
            options: ['umbrella', 'envelope', 'uniform', 'anchor'],
            correctIndex: 0,
            explanation: 'An "umbrella" shields you from rain.',
            moveName: 'Inferno Strike'
          },
          {
            id: 'lon-3-q4',
            category: 'grammar',
            questionText: 'They _____ visited London three times this year.',
            hint: 'Present perfect auxiliary for "they"',
            options: ['have', 'has', 'is', 'was'],
            correctIndex: 0,
            explanation: 'With "they" in the present perfect, we use "have".',
            moveName: 'Fire Blast'
          }
        ]
      },
      {
        id: 'lon-4',
        name: 'DracoThames',
        type: 'Dragon',
        level: 7,
        hp: 3,
        maxHp: 3,
        position: [51.5055, -0.0754],
        streetName: 'Tower Bridge Road',
        spriteColor: '#8B5CF6',
        description: 'The ancient River Thames dragon soaring above the iconic stone towers!',
        avatarIcon: '🐲',
        questions: [
          {
            id: 'lon-4-q1',
            category: 'grammar',
            questionText: 'Have you ever _____ across Tower Bridge?',
            hint: 'Past participle of "walk"',
            options: ['walked', 'walk', 'walking', 'walks'],
            correctIndex: 0,
            explanation: 'After "have you ever", use the past participle "walked".',
            moveName: 'Dragon Breath'
          },
          {
            id: 'lon-4-q2',
            category: 'vocabulary',
            questionText: 'The captain was very _____ when steering through thick river fog.',
            hint: 'Alert and paying close attention',
            options: ['careful', 'careless', 'sleepy', 'greedy'],
            correctIndex: 0,
            explanation: '"Careful" means taking care and paying close attention to avoid danger.',
            moveName: 'Dragon Claw'
          },
          {
            id: 'lon-4-q3',
            category: 'reading',
            questionText: '"Excuse me, could you tell me the way to the airport?" This speaker is asking for:',
            hint: 'How to travel somewhere',
            options: ['directions', 'a snack', 'the weather', 'a ticket price'],
            correctIndex: 0,
            explanation: 'Asking "the way to..." is a polite phrase for asking directions.',
            moveName: 'Dragon Meteor'
          },
          {
            id: 'lon-4-q4',
            category: 'grammar',
            questionText: 'The river Thames flows _____ London into the North Sea.',
            hint: 'Preposition meaning from one side to the other',
            options: ['through', 'under', 'between', 'against'],
            correctIndex: 0,
            explanation: 'A river flows "through" a city.',
            moveName: 'Dragon Wing'
          }
        ]
      }
    ]
  },

  // CITY 2: TOKYO, JAPAN
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    coordinates: [35.6775, 139.7300],
    zoom: 14,
    welcomeMessage: 'Landed in Tokyo (City 2/10)! Neon lights and cyber road monsters await in Shibuya and Shinjuku. Defeat them to fly to Paris!',
    landmarks: ['Shibuya Crossing', 'Shinjuku Neon Street', 'Akihabara Tech Road', 'Tokyo Tower'],
    monsters: [
      {
        id: 'tok-1',
        name: 'Raijin-Cat',
        type: 'Electric',
        level: 8,
        hp: 3,
        maxHp: 3,
        position: [35.6595, 139.7005],
        streetName: 'Shibuya Crossing / Dogenzaka',
        spriteColor: '#F59E0B',
        description: 'A robotic lightning feline leaping over the world’s busiest pedestrian crossing!',
        avatarIcon: '🐱',
        questions: [
          {
            id: 'tok-1-q1',
            category: 'grammar',
            questionText: 'Thousands of people _____ crossing the street right now.',
            hint: 'Present continuous plural',
            options: ['are', 'is', 'was', 'am'],
            correctIndex: 0,
            explanation: '"Thousands of people" is plural, so we use "are crossing".',
            moveName: 'Thunder Surge'
          },
          {
            id: 'tok-1-q2',
            category: 'vocabulary',
            questionText: 'When a place is full of many people, it is ______.',
            hint: 'Opposite of empty',
            options: ['crowded', 'lonely', 'quiet', 'deserted'],
            correctIndex: 0,
            explanation: '"Crowded" means filled with many people.',
            moveName: 'Electro Ball'
          },
          {
            id: 'tok-1-q3',
            category: 'spelling',
            questionText: 'Which word means a rapid underground railway train?',
            hint: 'M-e-t-r-o',
            options: ['metro', 'metrow', 'mitro', 'matro'],
            correctIndex: 0,
            explanation: '"Metro" is spelled M-e-t-r-o.',
            moveName: 'Spark Claw'
          },
          {
            id: 'tok-1-q4',
            category: 'grammar',
            questionText: 'If you push the button, the traffic light _____ change.',
            hint: 'First conditional result',
            options: ['will', 'would', 'did', 'had'],
            correctIndex: 0,
            explanation: 'In the first conditional, the result clause uses "will + verb".',
            moveName: 'Volt Pounce'
          }
        ]
      },
      {
        id: 'tok-2',
        name: 'Kitsunefire',
        type: 'Fire',
        level: 9,
        hp: 3,
        maxHp: 3,
        position: [35.6938, 139.7034],
        streetName: 'Shinjuku Yasukuni-dori',
        spriteColor: '#EF4444',
        description: 'A nine-tailed spirit with glowing red tails lighting up the Shinjuku skyline!',
        avatarIcon: '🦊',
        questions: [
          {
            id: 'tok-2-q1',
            category: 'grammar',
            questionText: 'Tokyo Skytree is the _____ tower in Japan.',
            hint: 'Superlative form of "tall"',
            options: ['tallest', 'taller', 'most tall', 'more tall'],
            correctIndex: 0,
            explanation: 'For short adjectives comparing the highest of all, use "-est" (tallest).',
            moveName: 'Fire Blast'
          },
          {
            id: 'tok-2-q2',
            category: 'vocabulary',
            questionText: 'Something created with brand-new technology is called ______.',
            hint: 'Opposite of ancient',
            options: ['modern', 'ancient', 'rusty', 'primitive'],
            correctIndex: 0,
            explanation: '"Modern" means relating to present or recent times.',
            moveName: 'Mystic Flame'
          },
          {
            id: 'tok-2-q3',
            category: 'reading',
            questionText: '"Please stay behind the yellow safety line." This notice is meant to:',
            hint: 'Keep passengers safe on the train platform',
            options: ['protect passengers from danger', 'sell train tickets', 'clean the floor', 'charge your phone'],
            correctIndex: 0,
            explanation: 'Staying behind safety lines prevents accidental falls or collisions.',
            moveName: 'Foxfire Flame'
          },
          {
            id: 'tok-2-q4',
            category: 'grammar',
            questionText: 'She enjoys _____ traditional ramen soup after exploring the city.',
            hint: 'Verb "enjoy" is followed by a gerund (-ing)',
            options: ['eating', 'to eat', 'ate', 'eat'],
            correctIndex: 0,
            explanation: '"Enjoy" is followed by an -ing verb (gerund).',
            moveName: 'Flame Spiral'
          }
        ]
      },
      {
        id: 'tok-3',
        name: 'Cyberbyte',
        type: 'Psychic',
        level: 10,
        hp: 3,
        maxHp: 3,
        position: [35.6983, 139.7713],
        streetName: 'Akihabara Chuo-dori',
        spriteColor: '#EC4899',
        description: 'A mind-bending digital monster constructed out of retro 8-bit game cartridges!',
        avatarIcon: '👾',
        questions: [
          {
            id: 'tok-3-q1',
            category: 'grammar',
            questionText: 'Neither Kenji _____ his sister forgot their electronic dictionaries.',
            hint: 'Correlative conjunction paired with "Neither"',
            options: ['nor', 'or', 'and', 'but'],
            correctIndex: 0,
            explanation: 'The pairing is "Neither... nor" (and "Either... or").',
            moveName: 'Psybeam'
          },
          {
            id: 'tok-3-q2',
            category: 'vocabulary',
            questionText: 'A gift or object you buy to remember a place you visited is a ______.',
            hint: 'A holiday keepsake',
            options: ['souvenir', 'receipt', 'luggage', 'passport'],
            correctIndex: 0,
            explanation: 'A "souvenir" is a memento kept as a reminder of a trip.',
            moveName: 'Pixel Surge'
          },
          {
            id: 'tok-3-q3',
            category: 'spelling',
            questionText: 'Select the correct spelling of the word meaning pleasing to the senses:',
            hint: 'B-e-a-u-t-i-f-u-l',
            options: ['beautiful', 'beautifull', 'beutiful', 'beautyful'],
            correctIndex: 0,
            explanation: '"Beautiful" is spelled B-e-a-u-t-i-f-u-l.',
            moveName: 'Mind Warp'
          },
          {
            id: 'tok-3-q4',
            category: 'grammar',
            questionText: 'The robot can speak English, _____ it?',
            hint: 'Question tag for affirmative modal "can"',
            options: ["can't", 'can', 'is', "isn't"],
            correctIndex: 0,
            explanation: 'Affirmative statements take negative question tags: "can... can\'t it?".',
            moveName: 'Cyber Spark'
          }
        ]
      },
      {
        id: 'tok-4',
        name: 'RyuTitan',
        type: 'Dragon',
        level: 11,
        hp: 3,
        maxHp: 3,
        position: [35.6586, 139.7454],
        streetName: 'Tokyo Tower Avenue',
        spriteColor: '#6366F1',
        description: 'The supreme red-and-white Dragon Titan coiled around Tokyo Tower!',
        avatarIcon: '🐉',
        questions: [
          {
            id: 'tok-4-q1',
            category: 'grammar',
            questionText: 'By tonight, we _____ completed our journey across Tokyo.',
            hint: 'Future perfect structure: will have + past participle',
            options: ['will have', 'will had', 'have will', 'had will'],
            correctIndex: 0,
            explanation: 'Future perfect is formed with "will have" + past participle.',
            moveName: 'Dragon Pulse'
          },
          {
            id: 'tok-4-q2',
            category: 'vocabulary',
            questionText: '"The view from the top of the tower was breathtaking." "Breathtaking" means:',
            hint: 'Astonishingly beautiful and exciting',
            options: ['astonishing and magnificent', 'hard to breathe', 'dull and boring', 'dark and scary'],
            correctIndex: 0,
            explanation: '"Breathtaking" means astonishingly magnificent.',
            moveName: 'Draco Impact'
          },
          {
            id: 'tok-4-q3',
            category: 'reading',
            questionText: 'Which greeting is used in English when meeting someone in the morning?',
            hint: 'Sun is rising',
            options: ['Good morning', 'Good night', 'Sweet dreams', 'Goodbye'],
            correctIndex: 0,
            explanation: '"Good morning" is the standard greeting before noon.',
            moveName: 'Dragon Roar'
          },
          {
            id: 'tok-4-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a printed schedule of flights or trains?',
            hint: 'T-i-m-e-t-a-b-l-e',
            options: ['timetable', 'timetabel', 'tymetable', 'timetabull'],
            correctIndex: 0,
            explanation: '"Timetable" is spelled T-i-m-e-t-a-b-l-e.',
            moveName: 'Sky Strike'
          }
        ]
      }
    ]
  },

  // CITY 3: PARIS, FRANCE
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    coordinates: [48.8566, 2.3522],
    zoom: 14,
    welcomeMessage: 'Bonjour! You have arrived in Paris (City 3/10)! The romantic boulevards along the Seine have been overtaken by stylish road monsters. Defeat them to fly to New York!',
    landmarks: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées'],
    monsters: [
      {
        id: 'par-1',
        name: 'Lumiereon',
        type: 'Fairy',
        level: 12,
        hp: 3,
        maxHp: 3,
        position: [48.8584, 2.2945],
        streetName: 'Champ de Mars Avenue',
        spriteColor: '#F472B6',
        description: 'A dazzling fairy sparkling beneath the golden lights of the Eiffel Tower!',
        avatarIcon: '✨',
        questions: [
          {
            id: 'par-1-q1',
            category: 'grammar',
            questionText: 'The Eiffel Tower was designed _____ Gustave Eiffel in 1889.',
            hint: 'Passive voice agent preposition',
            options: ['by', 'from', 'with', 'at'],
            correctIndex: 0,
            explanation: 'In passive voice, "by" introduces the person who created it.',
            moveName: 'Dazzling Gleam'
          },
          {
            id: 'par-1-q2',
            category: 'vocabulary',
            questionText: 'Which word describes fresh French pastries that taste wonderful?',
            hint: 'Very tasty and pleasing',
            options: ['delicious', 'disgusting', 'bland', 'bitter'],
            correctIndex: 0,
            explanation: '"Delicious" means having a very pleasing taste.',
            moveName: 'Moonblast'
          },
          {
            id: 'par-1-q3',
            category: 'spelling',
            questionText: 'Select the correct spelling of the food made of flour and baked in a bakery:',
            hint: 'French baguette staple',
            options: ['bread', 'bred', 'braed', 'braid'],
            correctIndex: 0,
            explanation: '"Bread" is spelled B-R-E-A-D.',
            moveName: 'Fairy Wind'
          },
          {
            id: 'par-1-q4',
            category: 'grammar',
            questionText: 'She has been living in Paris _____ three years.',
            hint: 'Used with a duration of time (three years)',
            options: ['for', 'since', 'during', 'while'],
            correctIndex: 0,
            explanation: 'Use "for" with a duration or amount of time (for three years).',
            moveName: 'Star Shimmer'
          }
        ]
      },
      {
        id: 'par-2',
        name: 'GargoyleX',
        type: 'Dragon',
        level: 13,
        hp: 3,
        maxHp: 3,
        position: [48.8530, 2.3499],
        streetName: 'Rue de la Cité (Notre Dame)',
        spriteColor: '#6B7280',
        description: 'A stone-winged dragon perched high near the ancient cathedral bells!',
        avatarIcon: '🗿',
        questions: [
          {
            id: 'par-2-q1',
            category: 'grammar',
            questionText: 'Although it began to drizzle, the tourists _____ exploring.',
            hint: 'Past tense matching "began"',
            options: ['continued', 'continue', 'continuing', 'continues'],
            correctIndex: 0,
            explanation: '"Continued" is past simple, matching "began".',
            moveName: 'Stone Edge'
          },
          {
            id: 'par-2-q2',
            category: 'vocabulary',
            questionText: 'A historic building that has stood for many centuries is ______.',
            hint: 'Belonging to the distant past',
            options: ['ancient', 'temporary', 'brand-new', 'modern'],
            correctIndex: 0,
            explanation: '"Ancient" refers to things belonging to the distant past.',
            moveName: 'Rock Slide'
          },
          {
            id: 'par-2-q3',
            category: 'reading',
            questionText: '"Admission is free for students on Sunday." What does this sign mean?',
            hint: 'No money required for students',
            options: ['Students do not have to pay on Sunday', 'Sunday is closed', 'Only teachers can enter', 'Tickets cost double'],
            correctIndex: 0,
            explanation: '"Admission free" means entry costs zero money.',
            moveName: 'Gargoyle Roar'
          },
          {
            id: 'par-2-q4',
            category: 'grammar',
            questionText: 'You haven\'t lost your hotel key, _____ you?',
            hint: 'Positive tag for negative statement',
            options: ['have', "haven't", 'did', 'do'],
            correctIndex: 0,
            explanation: 'Negative clause ("haven\'t lost") takes a positive tag ("have you?").',
            moveName: 'Granite Claw'
          }
        ]
      }
    ]
  },

  // CITY 4: NEW YORK, USA
  {
    id: 'newyork',
    name: 'New York',
    country: 'United States',
    coordinates: [40.7128, -74.0060],
    zoom: 14,
    welcomeMessage: 'Welcome to New York City (City 4/10)! Yellow cabs honk as Broadway road monsters emerge. Clear them to earn your flight to Rome!',
    landmarks: ['Times Square', 'Broadway', 'Empire State Building', 'Central Park'],
    monsters: [
      {
        id: 'ny-1',
        name: 'NeonBeast',
        type: 'Electric',
        level: 14,
        hp: 3,
        maxHp: 3,
        position: [40.7580, -73.9855],
        streetName: 'Times Square / Broadway 42nd St',
        spriteColor: '#F59E0B',
        description: 'A pulsing cyber beast energized by giant digital Broadway billboards!',
        avatarIcon: '🎭',
        questions: [
          {
            id: 'ny-1-q1',
            category: 'grammar',
            questionText: 'The singer sang _____ on the Broadway stage last night.',
            hint: 'Adverb describing how she sang',
            options: ['beautifully', 'beautiful', 'beauty', 'more beautiful'],
            correctIndex: 0,
            explanation: 'We use an adverb ending in "-ly" to describe how an action was performed.',
            moveName: 'Spotlight Beam'
          },
          {
            id: 'ny-1-q2',
            category: 'vocabulary',
            questionText: 'The people who sit and watch a theater show or movie are the ______.',
            hint: 'Spectators and listeners',
            options: ['audience', 'passengers', 'pedestrians', 'mechanics'],
            correctIndex: 0,
            explanation: 'The "audience" is the gathered group of viewers or listeners.',
            moveName: 'Broadway Blast'
          },
          {
            id: 'ny-1-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a Broadway show or concert?',
            hint: 'P-e-r-f-o-r-m-a-n-c-e',
            options: ['performance', 'preformance', 'performence', 'preformence'],
            correctIndex: 0,
            explanation: '"Performance" starts with "per" and ends with "ance".',
            moveName: 'Thunder Stomp'
          },
          {
            id: 'ny-1-q4',
            category: 'reading',
            questionText: 'What does the idiom "Break a leg!" mean when said to an actor before a show?',
            hint: 'Wishing them the best',
            options: ['Good luck!', 'Be careful!', 'Walk slowly!', 'Go home!'],
            correctIndex: 0,
            explanation: 'In English theater tradition, "Break a leg!" means "Good luck!".',
            moveName: 'Curtain Call'
          }
        ]
      },
      {
        id: 'ny-2',
        name: 'ParkEnt',
        type: 'Grass',
        level: 15,
        hp: 3,
        maxHp: 3,
        position: [40.7644, -73.9730],
        streetName: 'Central Park South (59th St)',
        spriteColor: '#10B981',
        description: 'A leafy giant tree guardian strolling along the edge of Central Park!',
        avatarIcon: '🌳',
        questions: [
          {
            id: 'ny-2-q1',
            category: 'grammar',
            questionText: 'He would rather ride a bicycle _____ take a crowded subway train.',
            hint: 'Paired with "would rather"',
            options: ['than', 'then', 'to', 'from'],
            correctIndex: 0,
            explanation: 'We say "would rather [do X] than [do Y]". Note spelling T-H-A-N.',
            moveName: 'Oak Bash'
          },
          {
            id: 'ny-2-q2',
            category: 'vocabulary',
            questionText: 'What is the opposite of the word "noisy" city streets?',
            hint: 'Serene, tranquil',
            options: ['peaceful', 'stormy', 'busy', 'crowded'],
            correctIndex: 0,
            explanation: '"Peaceful" is the opposite of noisy.',
            moveName: 'Leaf Shield'
          },
          {
            id: 'ny-2-q3',
            category: 'spelling',
            questionText: 'Select the correct spelling of the animal with antlers in the park:',
            hint: 'D-e-e-r',
            options: ['deer', 'dear', 'deere', 'deir'],
            correctIndex: 0,
            explanation: 'The forest animal is spelled "deer" (while "dear" means beloved).',
            moveName: 'Sprout Burst'
          },
          {
            id: 'ny-2-q4',
            category: 'grammar',
            questionText: 'Neither the squirrels nor the bird _____ afraid of people.',
            hint: 'Subject closer to verb is singular ("bird")',
            options: ['is', 'are', 'were', 'am'],
            correctIndex: 0,
            explanation: 'With "neither... nor", the verb agrees with the closer subject ("bird" is singular).',
            moveName: 'Forest Surge'
          }
        ]
      }
    ]
  },

  // CITY 5: ROME, ITALY
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    coordinates: [41.9028, 12.4964],
    zoom: 14,
    welcomeMessage: 'Benvenuto a Roma (City 5/10)! The Colosseum and Roman Forum roads are guarded by ancient gladiatorial monsters. Conquer them to fly to Sydney!',
    landmarks: ['Colosseum', 'Trevi Fountain', 'Pantheon', 'Piazza Navona'],
    monsters: [
      {
        id: 'rom-1',
        name: 'Gladiataur',
        type: 'Fire',
        level: 16,
        hp: 3,
        maxHp: 3,
        position: [41.8902, 12.4922],
        streetName: 'Via dei Fori Imperiali (Colosseum)',
        spriteColor: '#DC2626',
        description: 'A mighty armored centurion monster holding a flaming gladius outside the Colosseum!',
        avatarIcon: '🛡️',
        questions: [
          {
            id: 'rom-1-q1',
            category: 'grammar',
            questionText: 'The ancient Romans _____ many famous stone roads across Europe.',
            hint: 'Past tense of "build"',
            options: ['built', 'builded', 'build', 'building'],
            correctIndex: 0,
            explanation: '"Built" is the irregular past tense of "build".',
            moveName: 'Gladiator Strike'
          },
          {
            id: 'rom-1-q2',
            category: 'vocabulary',
            questionText: 'A person who travels to visit interesting historical sights is a ______.',
            hint: 'A sightseer or traveler',
            options: ['tourist', 'pilot', 'plumber', 'dentist'],
            correctIndex: 0,
            explanation: 'A "tourist" is a person traveling for pleasure and sightseeing.',
            moveName: 'Shield Bash'
          },
          {
            id: 'rom-1-q3',
            category: 'spelling',
            questionText: 'Which Italian food made of dough, tomato sauce, and cheese is spelled correctly?',
            hint: 'Double Z',
            options: ['pizza', 'piza', 'peetza', 'pizzah'],
            correctIndex: 0,
            explanation: '"Pizza" is spelled P-I-Z-Z-A.',
            moveName: 'Flame Charge'
          },
          {
            id: 'rom-1-q4',
            category: 'grammar',
            questionText: 'The Colosseum is one of the _____ monuments in the world.',
            hint: 'Superlative with long adjective "famous"',
            options: ['most famous', 'more famous', 'famousest', 'as famous'],
            correctIndex: 0,
            explanation: 'For multi-syllable adjectives, use "most famous".',
            moveName: 'Colosseum Crash'
          }
        ]
      },
      {
        id: 'rom-2',
        name: 'Aquafontana',
        type: 'Water',
        level: 17,
        hp: 3,
        maxHp: 3,
        position: [41.9009, 12.4833],
        streetName: 'Via delle Muratte (Trevi Fountain)',
        spriteColor: '#0284C7',
        description: 'A magical fountain naiad splashing lucky coins into the air!',
        avatarIcon: '🌊',
        questions: [
          {
            id: 'rom-2-q1',
            category: 'grammar',
            questionText: 'If you throw a coin into Trevi Fountain, you _____ return to Rome!',
            hint: 'First conditional promise',
            options: ['will', 'would', 'did', 'have'],
            correctIndex: 0,
            explanation: 'First conditional: "If you throw... you will return".',
            moveName: 'Coin Splash'
          },
          {
            id: 'rom-2-q2',
            category: 'vocabulary',
            questionText: 'Tossing a coin into a fountain is a popular ______ in Rome.',
            hint: 'A long-standing cultural custom',
            options: ['tradition', 'accident', 'punishment', 'crime'],
            correctIndex: 0,
            explanation: 'A "tradition" is a custom or belief passed down through generations.',
            moveName: 'Water Surge'
          },
          {
            id: 'rom-2-q3',
            category: 'reading',
            questionText: 'What does the proverb "When in Rome, do as the Romans do" advise?',
            hint: 'Adapt to local culture and customs',
            options: ['Respect and follow the local customs where you are', 'Never leave your home', 'Only speak Latin', 'Fight gladiators'],
            correctIndex: 0,
            explanation: 'It means you should adapt to the customs of the place you are visiting.',
            moveName: 'Naiad Blessing'
          },
          {
            id: 'rom-2-q4',
            category: 'spelling',
            questionText: 'Which word means the money in the form of round metal discs?',
            hint: 'C-o-i-n-s',
            options: ['coins', 'coyns', 'koyns', 'cones'],
            correctIndex: 0,
            explanation: '"Coins" is spelled C-o-i-n-s.',
            moveName: 'Aqua Geyser'
          }
        ]
      }
    ]
  },

  // CITY 6: SYDNEY, AUSTRALIA
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    coordinates: [-33.8688, 151.2093],
    zoom: 14,
    welcomeMessage: 'G’day mate! Welcome to Sydney (City 6/10)! Surf-loving road monsters are bounding near the Opera House and Harbour Bridge. Defeat them to fly to Cairo!',
    landmarks: ['Sydney Opera House', 'Harbour Bridge', 'Circular Quay', 'Bondi Road'],
    monsters: [
      {
        id: 'syd-1',
        name: 'KangarooX',
        type: 'Wind',
        level: 18,
        hp: 3,
        maxHp: 3,
        position: [-33.8568, 151.2153],
        streetName: 'Macquarie Street (Opera House)',
        spriteColor: '#F97316',
        description: 'A boxing wind kangaroo hopping near the white sail roofs of the Opera House!',
        avatarIcon: '🦘',
        questions: [
          {
            id: 'syd-1-q1',
            category: 'grammar',
            questionText: 'Kangaroos can jump _____ than almost any other animal.',
            hint: 'Comparative form of "high"',
            options: ['higher', 'highest', 'more high', 'as high'],
            correctIndex: 0,
            explanation: 'Comparative form of the short adjective "high" is "higher".',
            moveName: 'Boomerang Kick'
          },
          {
            id: 'syd-1-q2',
            category: 'vocabulary',
            questionText: 'An animal that carries its babies inside a pouch on its belly is a ______.',
            hint: 'Like kangaroos and koalas',
            options: ['marsupial', 'reptile', 'insect', 'amphibian'],
            correctIndex: 0,
            explanation: 'A "marsupial" is a mammal whose young develop inside an external pouch.',
            moveName: 'Wind Gust'
          },
          {
            id: 'syd-1-q3',
            category: 'spelling',
            questionText: 'Which curved wooden throwing tool invented in Australia is spelled correctly?',
            hint: 'B-o-o-m-e-r-a-n-g',
            options: ['boomerang', 'boomarang', 'boomerange', 'bumarang'],
            correctIndex: 0,
            explanation: '"Boomerang" is spelled B-o-o-m-e-r-a-n-g.',
            moveName: 'Whirlwind Spin'
          },
          {
            id: 'syd-1-q4',
            category: 'reading',
            questionText: '"No worries, mate!" in Australian English means:',
            hint: 'You are welcome / it is all fine',
            options: ["You're welcome / It's fine!", 'Be scared!', 'Hurry up!', 'Stop talking!'],
            correctIndex: 0,
            explanation: '"No worries" is a friendly Australian phrase meaning "You\'re welcome" or "Don\'t worry about it".',
            moveName: 'Outback Strike'
          }
        ]
      },
      {
        id: 'syd-2',
        name: 'Reefling',
        type: 'Water',
        level: 19,
        hp: 3,
        maxHp: 3,
        position: [-33.8523, 151.2108],
        streetName: 'Bradfield Highway (Harbour Bridge)',
        spriteColor: '#06B6D4',
        description: 'A coral-shelled sea turtle swimming up the harbour breeze!',
        avatarIcon: '🐢',
        questions: [
          {
            id: 'syd-2-q1',
            category: 'grammar',
            questionText: 'Sea turtles _____ across thousands of miles of ocean every year.',
            hint: 'Present simple plural verb for "turtles"',
            options: ['swim', 'swims', 'swam', 'swimming'],
            correctIndex: 0,
            explanation: 'For plural subjects ("turtles"), we use the base verb "swim".',
            moveName: 'Coral Blast'
          },
          {
            id: 'syd-2-q2',
            category: 'vocabulary',
            questionText: 'A bridge that is suspended high above deep water is a ______ bridge.',
            hint: 'Hangs from cables',
            options: ['suspension', 'wooden', 'floating', 'glass'],
            correctIndex: 0,
            explanation: 'A "suspension" bridge has its roadway suspended by cables.',
            moveName: 'Tidal Wave'
          },
          {
            id: 'syd-2-q3',
            category: 'spelling',
            questionText: 'Choose the correct spelling of the large body of saltwater:',
            hint: 'O-c-e-a-n',
            options: ['ocean', 'oshun', 'ocian', 'osean'],
            correctIndex: 0,
            explanation: '"Ocean" is spelled O-C-E-A-N.',
            moveName: 'Reef Guard'
          },
          {
            id: 'syd-2-q4',
            category: 'grammar',
            questionText: 'You should always wear sunscreen _____ you go outside in the Australian sun.',
            hint: 'Time conjunction meaning whenever',
            options: ['when', 'during', 'since', 'until'],
            correctIndex: 0,
            explanation: 'We use "when" to introduce the time something happens.',
            moveName: 'Sunburst Shell'
          }
        ]
      }
    ]
  },

  // CITY 7: CAIRO, EGYPT
  {
    id: 'cairo',
    name: 'Cairo',
    country: 'Egypt',
    coordinates: [30.0444, 31.2357],
    zoom: 14,
    welcomeMessage: 'Welcome to Cairo (City 7/10)! The Pyramids of Giza and Nile River roads are shrouded in desert sandstorms. Defeat the Sphinx monsters to fly to Rio de Janeiro!',
    landmarks: ['Great Pyramids', 'The Sphinx', 'Tahrir Square', 'Nile Corniche'],
    monsters: [
      {
        id: 'cai-1',
        name: 'Sphinxor',
        type: 'Psychic',
        level: 20,
        hp: 3,
        maxHp: 3,
        position: [29.9753, 31.1376],
        streetName: 'Al Haram Avenue (Pyramids Road)',
        spriteColor: '#EAB308',
        description: 'A golden lion guardian testing travelers with riddles under the desert sun!',
        avatarIcon: '🦁',
        questions: [
          {
            id: 'cai-1-q1',
            category: 'grammar',
            questionText: 'The Great Pyramid was _____ thousands of years ago.',
            hint: 'Passive past participle of "construct"',
            options: ['constructed', 'constructing', 'construct', 'constructs'],
            correctIndex: 0,
            explanation: 'Passive voice with "was" uses the past participle "constructed".',
            moveName: 'Riddle of Gold'
          },
          {
            id: 'cai-1-q2',
            category: 'vocabulary',
            questionText: 'A puzzle or question asked in a clever way that you must solve is a ______.',
            hint: 'A brainteaser',
            options: ['riddle', 'receipt', 'recipe', 'remedy'],
            correctIndex: 0,
            explanation: 'A "riddle" is a clever question or statement phrased as a puzzle.',
            moveName: 'Psychic Sand'
          },
          {
            id: 'cai-1-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for the dry, sandy biome?',
            hint: 'One "s" (not sweet dessert)',
            options: ['desert', 'dessert', 'dezert', 'dezzerd'],
            correctIndex: 0,
            explanation: 'The sandy landscape is "desert" with one S. "Dessert" with two S\'s is sweet food!',
            moveName: 'Solar Flare'
          },
          {
            id: 'cai-1-q4',
            category: 'reading',
            questionText: '"The Nile River is the longest river in Africa." This statement is a:',
            hint: 'Proven piece of information',
            options: ['fact', 'rumor', 'fictional story', 'fairy tale'],
            correctIndex: 0,
            explanation: 'A verified geographic truth is a "fact".',
            moveName: 'Sphinx Gaze'
          }
        ]
      },
      {
        id: 'cai-2',
        name: 'Anubite',
        type: 'Dragon',
        level: 21,
        hp: 3,
        maxHp: 3,
        position: [30.0444, 31.2357],
        streetName: 'Nile Corniche / Qasr El Nil',
        spriteColor: '#7C3AED',
        description: 'A jackal-headed phantom dragon walking alongside the glowing Nile River!',
        avatarIcon: '🐺',
        questions: [
          {
            id: 'cai-2-q1',
            category: 'grammar',
            questionText: 'If they _____ the map, they would not have gotten lost in the desert.',
            hint: 'Third conditional if-clause: had + past participle',
            options: ['had followed', 'followed', 'have followed', 'follow'],
            correctIndex: 0,
            explanation: 'Third conditional uses "had + past participle" in the if-clause.',
            moveName: 'Shadow Prowl'
          },
          {
            id: 'cai-2-q2',
            category: 'vocabulary',
            questionText: 'The Egyptian kings and queens in ancient times were called ______.',
            hint: 'Title of ancient Egyptian rulers',
            options: ['pharaohs', 'presidents', 'mayors', 'professors'],
            correctIndex: 0,
            explanation: 'Ancient Egyptian rulers were titled "pharaohs".',
            moveName: 'Dark Pulse'
          },
          {
            id: 'cai-2-q3',
            category: 'spelling',
            questionText: 'Select the correct spelling of the triangular monument:',
            hint: 'P-y-r-a-m-i-d',
            options: ['pyramid', 'piramid', 'pyramyd', 'pie-ramid'],
            correctIndex: 0,
            explanation: '"Pyramid" is spelled P-Y-R-A-M-I-D.',
            moveName: 'Ancient Hex'
          },
          {
            id: 'cai-2-q4',
            category: 'grammar',
            questionText: 'Cairo is known _____ its rich history and ancient architecture.',
            hint: 'Preposition following "known"',
            options: ['for', 'to', 'with', 'about'],
            correctIndex: 0,
            explanation: 'We say "known for [a characteristic]".',
            moveName: 'Dune Storm'
          }
        ]
      }
    ]
  },

  // CITY 8: RIO DE JANEIRO, BRAZIL
  {
    id: 'rio',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    coordinates: [-22.9068, -43.1729],
    zoom: 14,
    welcomeMessage: 'Bem-vindo ao Rio (City 8/10)! Samba music echoes as coastal road monsters dance around Copacabana and Christ the Redeemer. Defeat them to fly to Seoul!',
    landmarks: ['Copacabana Beach', 'Sugarloaf Mountain', 'Christ the Redeemer', 'Ipanema Beach'],
    monsters: [
      {
        id: 'rio-1',
        name: 'Sambacaw',
        type: 'Wind',
        level: 22,
        hp: 3,
        maxHp: 3,
        position: [-22.9711, -43.1822],
        streetName: 'Avenida Atlântica (Copacabana)',
        spriteColor: '#10B981',
        description: 'A vibrant tropical macaw gliding with festive carnival feathers!',
        avatarIcon: '🦜',
        questions: [
          {
            id: 'rio-1-q1',
            category: 'grammar',
            questionText: 'The dancers are practicing their moves so that they _____ perform well at Carnival.',
            hint: 'Modal expressing ability / purpose',
            options: ['can', 'could', 'must', 'ought'],
            correctIndex: 0,
            explanation: '"So that they can perform" expresses purpose and ability in the present.',
            moveName: 'Carnival Gust'
          },
          {
            id: 'rio-1-q2',
            category: 'vocabulary',
            questionText: 'Which adjective describes a festival full of energy, excitement, and colors?',
            hint: 'Full of life and color',
            options: ['vibrant', 'gloomy', 'monotonous', 'sleepy'],
            correctIndex: 0,
            explanation: '"Vibrant" means full of energy, enthusiasm, and bright color.',
            moveName: 'Feather Dance'
          },
          {
            id: 'rio-1-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for the sandy area beside the ocean?',
            hint: 'B-e-a-c-h',
            options: ['beach', 'beech', 'beash', 'beache'],
            correctIndex: 0,
            explanation: '"Beach" is spelled B-E-A-C-H.',
            moveName: 'Samba Beat'
          },
          {
            id: 'rio-1-q4',
            category: 'reading',
            questionText: 'Soccer (football) is celebrated in Brazil as "o Jogo Bonito". In English, that translates to:',
            hint: 'The Beautiful...',
            options: ['The Beautiful Game', 'The Hard Work', 'The Fast Race', 'The Loud Noise'],
            correctIndex: 0,
            explanation: '"The Beautiful Game" is the world-famous English nickname for soccer.',
            moveName: 'Rainbow Wing'
          }
        ]
      },
      {
        id: 'rio-2',
        name: 'JaguaFire',
        type: 'Fire',
        level: 23,
        hp: 3,
        maxHp: 3,
        position: [-22.9519, -43.2105],
        streetName: 'Estrada do Redentor (Corcovado)',
        spriteColor: '#F59E0B',
        description: 'A fierce golden jaguar with fiery spots protecting the rainforest mountain trails!',
        avatarIcon: '🐆',
        questions: [
          {
            id: 'rio-2-q1',
            category: 'grammar',
            questionText: 'Jaguars are the _____ wild cats in the Americas.',
            hint: 'Superlative of "large"',
            options: ['largest', 'larger', 'most large', 'more large'],
            correctIndex: 0,
            explanation: 'The superlative of "large" is "largest".',
            moveName: 'Prowl Flare'
          },
          {
            id: 'rio-2-q2',
            category: 'vocabulary',
            questionText: 'A dense, warm, green forest that receives large amounts of rain is a ______.',
            hint: 'The Amazon...',
            options: ['rainforest', 'desert', 'tundra', 'glacier'],
            correctIndex: 0,
            explanation: 'A "rainforest" is a tropical forest with heavy rainfall.',
            moveName: 'Flame Leap'
          },
          {
            id: 'rio-2-q3',
            category: 'grammar',
            questionText: 'The view from Corcovado mountain is _____ more stunning than I imagined.',
            hint: 'Intensifier for comparative',
            options: ['even', 'very', 'too', 'more'],
            correctIndex: 0,
            explanation: 'We use "even" or "much" to intensify comparatives ("even more stunning").',
            moveName: 'Sun Roar'
          },
          {
            id: 'rio-2-q4',
            category: 'spelling',
            questionText: 'Select the correct spelling of the large Brazilian rainforest:',
            hint: 'A-m-a-z-o-n',
            options: ['Amazon', 'Amozon', 'Amazan', 'Ammazon'],
            correctIndex: 0,
            explanation: '"Amazon" is spelled A-m-a-z-o-n.',
            moveName: 'Jaguar Claws'
          }
        ]
      }
    ]
  },

  // CITY 9: SEOUL, SOUTH KOREA
  {
    id: 'seoul',
    name: 'Seoul',
    country: 'South Korea',
    coordinates: [37.5665, 126.9780],
    zoom: 14,
    welcomeMessage: 'Annyeonghaseyo! Welcome to Seoul (City 9/10)! Cyberpunk digital road monsters are roaming Gangnam and Gyeongbokgung. Beat them to fly to your 10th & Final Master City: Honolulu!',
    landmarks: ['Gyeongbokgung Palace', 'N Seoul Tower', 'Gangnam Boulevard', 'Dongdaemun Design Plaza'],
    monsters: [
      {
        id: 'seo-1',
        name: 'HaechiSpark',
        type: 'Electric',
        level: 24,
        hp: 3,
        maxHp: 3,
        position: [37.5796, 126.9770],
        streetName: 'Sajik-ro (Gyeongbokgung Palace Gate)',
        spriteColor: '#3B82F6',
        description: 'A mythical horned lion guarding the palace against fires and digital corruption!',
        avatarIcon: '🦄',
        questions: [
          {
            id: 'seo-1-q1',
            category: 'grammar',
            questionText: 'The palace guards _____ wearing traditional royal uniforms today.',
            hint: 'Present continuous with plural subject',
            options: ['are', 'is', 'was', 'am'],
            correctIndex: 0,
            explanation: '"The palace guards" is plural, requiring "are".',
            moveName: 'Royal Spark'
          },
          {
            id: 'seo-1-q2',
            category: 'vocabulary',
            questionText: 'A high-speed wireless internet connection is known in English as ______.',
            hint: 'W-i-F-i',
            options: ['broadband / Wi-Fi', 'typewriter', 'paperback', 'telegram'],
            correctIndex: 0,
            explanation: 'Modern high-speed wireless internet is called Wi-Fi / broadband.',
            moveName: 'Cyber Lightning'
          },
          {
            id: 'seo-1-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a royal home of kings and queens?',
            hint: 'P-a-l-a-c-e',
            options: ['palace', 'palis', 'pallas', 'pelace'],
            correctIndex: 0,
            explanation: '"Palace" is spelled P-A-L-A-C-E.',
            moveName: 'Haechi Shield'
          },
          {
            id: 'seo-1-q4',
            category: 'reading',
            questionText: '"Excuse me, which subway line goes to Seoul Station?" What is the speaker doing?',
            hint: 'Seeking travel assistance',
            options: ['Asking for travel transit help', 'Ordering dinner', 'Reporting a lost puppy', 'Buying a hat'],
            correctIndex: 0,
            explanation: 'Asking about a subway line is asking for transit help.',
            moveName: 'Horn Flash'
          }
        ]
      },
      {
        id: 'seo-2',
        name: 'K-Beatmon',
        type: 'Psychic',
        level: 25,
        hp: 3,
        maxHp: 3,
        position: [37.4979, 127.0276],
        streetName: 'Gangnam-daero (Gangnam Station)',
        spriteColor: '#EC4899',
        description: 'A stylish music-loving creature dancing to catchy K-pop rhythms on LED screens!',
        avatarIcon: '🎧',
        questions: [
          {
            id: 'seo-2-q1',
            category: 'grammar',
            questionText: 'She has been practicing her English and dancing _____ she was eight years old.',
            hint: 'Used with a specific starting point in time',
            options: ['since', 'for', 'during', 'while'],
            correctIndex: 0,
            explanation: 'We use "since" with a specific starting point in the past.',
            moveName: 'Pop Rhythm'
          },
          {
            id: 'seo-2-q2',
            category: 'vocabulary',
            questionText: 'A song that is extremely popular and played by millions of fans is called a ______.',
            hint: 'A chart-topper',
            options: ['hit song', 'whisper', 'failure', 'secret'],
            correctIndex: 0,
            explanation: 'A successful, popular music track is called a "hit song".',
            moveName: 'Synth Wave'
          },
          {
            id: 'seo-2-q3',
            category: 'spelling',
            questionText: 'Choose the correct spelling of the device used to listen to music privately:',
            hint: 'H-e-a-d-p-h-o-n-e-s',
            options: ['headphones', 'headfones', 'hedphones', 'headphons'],
            correctIndex: 0,
            explanation: '"Headphones" is spelled H-e-a-d-p-h-o-n-e-s.',
            moveName: 'Beat Drop'
          },
          {
            id: 'seo-2-q4',
            category: 'grammar',
            questionText: 'Neither the singer nor the dancers _____ tired after the concert.',
            hint: 'Closer subject "dancers" is plural',
            options: ['were', 'was', 'is', 'has'],
            correctIndex: 0,
            explanation: 'In the past with "neither... nor", agreement is with plural "dancers" -> "were".',
            moveName: 'Superstar Nova'
          }
        ]
      }
    ]
  },

  // CITY 10: HONOLULU, HAWAII (FINAL MASTER CITY!)
  {
    id: 'honolulu',
    name: 'Honolulu',
    country: 'United States',
    coordinates: [21.3069, -157.8583],
    zoom: 14,
    welcomeMessage: 'Aloha! You made it to Honolulu (City 10/10 — The Grand Finale)! Volcanic dragons and ocean tide masters guard Waikiki and Diamond Head. Defeat them to become the Ultimate World English Champion!',
    landmarks: ['Waikiki Beach Road', 'Diamond Head Crater', 'Kalakaua Avenue', 'Pearl Harbor'],
    monsters: [
      {
        id: 'hon-1',
        name: 'HonuKing',
        type: 'Water',
        level: 28,
        hp: 3,
        maxHp: 3,
        position: [21.2766, -157.8275],
        streetName: 'Kalakaua Avenue (Waikiki Beach)',
        spriteColor: '#0284C7',
        description: 'The ancient ocean turtle sovereign surfing atop turquoise Hawaiian breakers!',
        avatarIcon: '🏄‍♂️',
        questions: [
          {
            id: 'hon-1-q1',
            category: 'grammar',
            questionText: 'If you could travel anywhere in the world, where _____ you go?',
            hint: 'Second conditional with "could"',
            options: ['would', 'will', 'do', 'did'],
            correctIndex: 0,
            explanation: 'In the second conditional (hypothetical), we use "would + base verb".',
            moveName: 'Surfer Wave'
          },
          {
            id: 'hon-1-q2',
            category: 'vocabulary',
            questionText: '"Aloha" is a warm Hawaiian greeting that can mean both ______ and ______ in English.',
            hint: 'Said when meeting and parting',
            options: ['hello and goodbye', 'yes and no', 'food and drink', 'sun and rain'],
            correctIndex: 0,
            explanation: '"Aloha" famously means both "hello" and "goodbye".',
            moveName: 'Aloha Tide'
          },
          {
            id: 'hon-1-q3',
            category: 'spelling',
            questionText: 'Select the correct spelling of the tropical fruit with sweet yellow rings:',
            hint: 'P-i-n-e-a-p-p-l-e',
            options: ['pineapple', 'pineappel', 'pynapple', 'pineaple'],
            correctIndex: 0,
            explanation: '"Pineapple" is spelled P-I-N-E-A-P-P-L-E.',
            moveName: 'Ocean Current'
          },
          {
            id: 'hon-1-q4',
            category: 'reading',
            questionText: 'Why is learning English important for international travel?',
            hint: 'Helps you communicate with people everywhere',
            options: ['It connects people from different cultures and countries', 'It is the only language spoken on Earth', 'It prevents airplanes from falling', 'It buys free hotel rooms'],
            correctIndex: 0,
            explanation: 'English is a global lingua franca that allows people from diverse cultures to connect.',
            moveName: 'Tide Crest'
          }
        ]
      },
      {
        id: 'hon-2',
        name: 'PeleDrake',
        type: 'Dragon',
        level: 30,
        hp: 3,
        maxHp: 3,
        position: [21.2620, -157.8057],
        streetName: 'Diamond Head Road',
        spriteColor: '#DC2626',
        description: 'The volcanic dragon lord crowned in glowing molten lava at the summit of Diamond Head!',
        avatarIcon: '🌋',
        questions: [
          {
            id: 'hon-2-q1',
            category: 'grammar',
            questionText: 'You have conquered all ten cities! By studying every day, your English has _____ drastically.',
            hint: 'Past participle of "improve"',
            options: ['improved', 'improve', 'improving', 'improves'],
            correctIndex: 0,
            explanation: 'After "has", we use the past participle "improved".',
            moveName: 'Volcano Eruption'
          },
          {
            id: 'hon-2-q2',
            category: 'vocabulary',
            questionText: 'A mountain that opens downward to a pool of molten rock below the surface of the Earth is a ______.',
            hint: 'Like Kilauea or Mount Fuji',
            options: ['volcano', 'canyon', 'valley', 'swamp'],
            correctIndex: 0,
            explanation: 'A "volcano" is an opening in the Earth\'s crust through which lava erupts.',
            moveName: 'Magma Burst'
          },
          {
            id: 'hon-2-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for the highest prize or title in a competition?',
            hint: 'C-h-a-m-p-i-o-n',
            options: ['champion', 'champian', 'champyon', 'champeon'],
            correctIndex: 0,
            explanation: '"Champion" is spelled C-H-A-M-P-I-O-N.',
            moveName: 'Dragon Inferno'
          },
          {
            id: 'hon-2-q4',
            category: 'reading',
            questionText: '"Practice makes perfect." What does this famous English proverb teach us?',
            hint: 'Keep trying and you will master anything',
            options: ['Regular practice leads to mastery and success', 'You should never try new things', 'Mistakes cannot be fixed', 'Tests are the only thing that matters'],
            correctIndex: 0,
            explanation: 'The proverb "Practice makes perfect" means dedication and daily effort lead to mastery!',
            moveName: 'Master Crown Strike'
          }
        ]
      }
    ]
  }
];

export const INITIAL_CITIES: CityData[] = [
  ...BASE_CITIES.map((c: any) => ({
    ...c,
    lessonTitle: CITY_LESSONS_INFO[c.id]?.title || `Lesson: ${c.name} English Exploration`,
    lessonGrammarRule: CITY_LESSONS_INFO[c.id]?.grammarRule || 'Master key English patterns and structures on this city road.',
    stations: CITY_TRANSIT_STATIONS[c.id] || [],
    monsters: (c.monsters || []).map((m: any, idx: number) => ({
      ...m,
      rarity: m.rarity || (idx === c.monsters.length - 1 ? 'Legendary' : idx % 2 === 0 ? 'Rare' : 'Common'),
      auraColor: m.auraColor || (m.type === 'Electric' ? '#F59E0B' : m.type === 'Fire' ? '#EF4444' : m.type === 'Water' ? '#0284C7' : m.type === 'Grass' ? '#10B981' : '#8B5CF6'),
      lessonTopic: m.lessonTopic || `${c.name} Core Skill #${idx + 1}`
    }))
  })),
  SEOUL_CITY,
  BERLIN_CITY,
  ...EXPANDED_CITIES_13_TO_26
];

