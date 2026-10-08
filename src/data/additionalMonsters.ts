import { Monster } from '../types';

export const ADDITIONAL_CITY_MONSTERS: Record<string, Monster[]> = {
  // PARIS (Cities 3) - adding 2 monsters: LouvreSphinx & SeineNaiad
  paris: [
    {
      id: 'par-3',
      name: 'LouvreSphinx',
      type: 'Psychic',
      level: 11,
      hp: 3,
      maxHp: 3,
      position: [48.8606, 2.3376],
      streetName: 'Rue de Rivoli / Louvre Courtyard',
      spriteColor: '#8B5CF6',
      description: 'A crystalline sphinx guarding centuries of royal art and enigmatic grammar riddles!',
      avatarIcon: '🏛️',
      rarity: 'Rare',
      auraColor: '#A78BFA',
      lessonTopic: 'Comparative & Superlative Nuances',
      questions: [
        {
          id: 'par-3-q1',
          category: 'grammar',
          questionText: 'This classical painting is _____ than the modern sculpture next to it.',
          hint: 'Two syllables adjective "famous" takes "more"',
          options: ['more famous', 'famouser', 'most famous', 'more famouser'],
          correctIndex: 0,
          explanation: 'We use "more famous" because adjectives with two or more syllables typically take "more" in comparisons.',
          moveName: 'Pyramid Mind Beam'
        },
        {
          id: 'par-3-q2',
          category: 'vocabulary',
          questionText: 'A famous work of art that is an artist\'s greatest achievement is called a ______.',
          hint: 'Master + piece',
          options: ['masterpiece', 'sketchbook', 'canvas', 'draft'],
          correctIndex: 0,
          explanation: 'A "masterpiece" (or chef-d\'œuvre) is an outstanding, masterful work of art or literature.',
          moveName: 'Golden Canvas Flash'
        },
        {
          id: 'par-3-q3',
          category: 'reading',
          questionText: '"Beauty is in the eye of the beholder." What does this famous proverb mean?',
          hint: 'Different people have different tastes and opinions about what is beautiful',
          options: ['Different people appreciate beauty in different ways', 'Everyone agrees on art', 'Paintings are expensive', 'Eyes get tired quickly'],
          correctIndex: 0,
          explanation: '"Beauty is in the eye of the beholder" means perceptions of beauty are subjective and personal.',
          moveName: 'Sphinx Riddle Strike'
        },
        {
          id: 'par-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for an ancient royal palace or exhibition building?',
          hint: 'Greek "Mouseion" (seat of the Muses): single "s" and terminal "-um"',
          options: ['museum', 'museam', 'muzeum', 'musium'],
          correctIndex: 0,
          explanation: '"Museum" is correctly spelled M-U-S-E-U-M.',
          moveName: 'Curator Psychic Ward'
        }
      ]
    },
    {
      id: 'par-4',
      name: 'SeineNaiad',
      type: 'Water',
      level: 12,
      hp: 3,
      maxHp: 3,
      position: [48.8530, 2.3499],
      streetName: 'Quai de la Tournelle / Île de la Cité',
      spriteColor: '#0284C7',
      description: 'An elegant aquatic spirit splashing ripples under the stone bridges of the Seine!',
      avatarIcon: '🌊',
      rarity: 'Epic',
      auraColor: '#38BDF8',
      lessonTopic: 'Prepositions of Movement',
      questions: [
        {
          id: 'par-4-q1',
          category: 'grammar',
          questionText: 'The sightseeing boat glided smoothly _____ the historic stone arches of the bridge.',
          hint: 'Movement from one side to the other underneath',
          options: ['under', 'over', 'onto', 'above'],
          correctIndex: 0,
          explanation: 'The boat moves "under" the bridge arches when passing below them.',
          moveName: 'River Aqua Surge'
        },
        {
          id: 'par-4-q2',
          category: 'vocabulary',
          questionText: 'What is a wide paved public walking area alongside a river called?',
          hint: 'French loanword from "se promener" (to walk), denoting an esplanade by the shore.',
          options: ['promenade', 'runway', 'highway', 'tunnel'],
          correctIndex: 0,
          explanation: 'A "promenade" or esplanade is a scenic walkway alongside a river, waterfront, or public park.',
          moveName: 'Tide Wave Waltz'
        },
        {
          id: 'par-4-q3',
          category: 'spelling',
          questionText: 'Which spelling is correct for the light, pleasant wind blowing off the water?',
          hint: 'Spanish "briza" (cold northeast wind): features double "ee" and terminal "ze"',
          options: ['breeze', 'breaze', 'breze', 'breez'],
          correctIndex: 0,
          explanation: '"Breeze" is spelled B-R-E-E-Z-E.',
          moveName: 'Hydro Ripple Beam'
        },
        {
          id: 'par-4-q4',
          category: 'reading',
          questionText: '"Still waters run deep." What does this English idiom suggest about quiet people?',
          hint: 'A quiet person may have deep thoughts, passion, or hidden intelligence',
          options: ['Quiet people often possess profound intelligence and depth', 'Rivers are always dangerous', 'Swimming should be avoided', 'Loud speech is superior'],
          correctIndex: 0,
          explanation: '"Still waters run deep" means a calm, quiet person often has a complex, thoughtful inner nature.',
          moveName: 'Seine Sovereign Crest'
        }
      ]
    }
  ],

  // NEW YORK (City 4) - adding 2 monsters: BroadwayLion & CentralParkDryad
  newyork: [
    {
      id: 'nyc-3',
      name: 'BroadwayLion',
      type: 'Fire',
      level: 15,
      hp: 3,
      maxHp: 3,
      position: [40.7580, -73.9855],
      streetName: 'Broadway / West 45th Street',
      spriteColor: '#EA580C',
      description: 'A theatrical fire-maned lion roaring amid the dazzle of marquee theater lights!',
      avatarIcon: '🦁',
      rarity: 'Rare',
      auraColor: '#F97316',
      lessonTopic: 'Past Continuous & Interrupted Actions',
      questions: [
        {
          id: 'nyc-3-q1',
          category: 'grammar',
          questionText: 'The actors _____ their lines on stage when the sudden spotlight clicked on.',
          hint: 'Plural subject "actors" with past continuous',
          options: ['were rehearsing', 'was rehearsing', 'are rehearse', 'rehearsed was'],
          correctIndex: 0,
          explanation: 'We use "were rehearsing" because "actors" is plural and the action was ongoing in the past when interrupted.',
          moveName: 'Marquee Flare'
        },
        {
          id: 'nyc-3-q2',
          category: 'vocabulary',
          questionText: 'If an actor performs without a written script by creating lines on the spot, they are ______.',
          hint: 'Latin "improvisus" (unforeseen): spelled with "s", not "z"',
          options: ['improvising', 'whispering', 'sleeping', 'reading'],
          correctIndex: 0,
          explanation: '"Improvising" means composing, uttering, or performing spontaneously without preparation.',
          moveName: 'Encore Roar'
        },
        {
          id: 'nyc-3-q3',
          category: 'reading',
          questionText: 'When someone tells an actor "Break a leg!", what are they actually wishing them?',
          hint: 'A theatrical idiom for good luck',
          options: ['Good luck with your performance', 'Be careful not to fall', 'Stop the performance immediately', 'Go to the hospital'],
          correctIndex: 0,
          explanation: '"Break a leg" is a traditional theatrical idiom meaning "Good luck!"',
          moveName: 'Standing Ovation Blast'
        },
        {
          id: 'nyc-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for an enthusiastic response and clapping from the audience?',
          hint: 'Latin "applaudere" (to strike hands together): doubled "pp" and diphthong "au"',
          options: ['applause', 'aplaud', 'applaws', 'apllause'],
          correctIndex: 0,
          explanation: '"Applause" is spelled A-P-P-L-A-U-S-E.',
          moveName: 'Spotlight Sunfire'
        }
      ]
    },
    {
      id: 'nyc-4',
      name: 'CentralParkDryad',
      type: 'Grass',
      level: 16,
      hp: 3,
      maxHp: 3,
      position: [40.7711, -73.9742],
      streetName: 'The Mall / Literary Walk, Central Park',
      spriteColor: '#10B981',
      description: 'A towering emerald dryad weaving leafy canopies above Manhattan\'s famous green haven!',
      avatarIcon: '🌳',
      rarity: 'Epic',
      auraColor: '#34D399',
      lessonTopic: 'Countable vs Uncountable Nouns',
      questions: [
        {
          id: 'nyc-4-q1',
          category: 'grammar',
          questionText: 'There is only a little _____ left in my reusable water bottle after jogging the park loop.',
          hint: '"Water" is an uncountable liquid noun',
          options: ['water', 'waters', 'few water', 'a water'],
          correctIndex: 0,
          explanation: '"Water" is uncountable and takes "a little", not "a few".',
          moveName: 'Canopy Quake'
        },
        {
          id: 'nyc-4-q2',
          category: 'vocabulary',
          questionText: 'A quiet, lush sanctuary inside a busy urban city is known as an urban ______.',
          hint: 'Ancient Greek / Egyptian loanword for an isolated fertile desert spring',
          options: ['oasis', 'desert', 'skyscraper', 'factory'],
          correctIndex: 0,
          explanation: 'An "oasis" metaphorically describes a pleasant or peaceful area in the midst of a hectic environment.',
          moveName: 'Verdant Shield'
        },
        {
          id: 'nyc-4-q3',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for the quiet state of peaceful contemplation in nature?',
          hint: 'Latin "serenus" (calm): abstract nominal suffix "-ity"',
          options: ['serenity', 'sarenity', 'serenaty', 'sirenity'],
          correctIndex: 0,
          explanation: '"Serenity" is spelled S-E-R-E-N-I-T-Y.',
          moveName: 'Floral Vortex'
        },
        {
          id: 'nyc-4-q4',
          category: 'reading',
          questionText: '"You can\'t see the forest for the trees." What does this wise expression mean?',
          hint: 'Focusing too much on small details so you miss the bigger overall picture',
          options: ['Focusing so closely on small details that you miss the big picture', 'Trees are too tall to look over', 'Woodlands are hard to navigate', 'Forest fires are common'],
          correctIndex: 0,
          explanation: 'This idiom warns against obsessing over minor details at the expense of understanding the overall situation.',
          moveName: 'Ancient Elm Crown'
        }
      ]
    }
  ],

  // ROME (City 5) - adding 2 monsters: ColosseumCentaur & TiberHydra
  rome: [
    {
      id: 'rom-3',
      name: 'ColosseumCentaur',
      type: 'Fire',
      level: 17,
      hp: 3,
      maxHp: 3,
      position: [41.8902, 12.4922],
      streetName: 'Piazza del Colosseo',
      spriteColor: '#DC2626',
      description: 'A courageous bronze-armored centaur brandishing flaming lances in the ancient arena!',
      avatarIcon: '🏹',
      rarity: 'Rare',
      auraColor: '#EF4444',
      lessonTopic: 'Past Simple vs Present Perfect',
      questions: [
        {
          id: 'rom-3-q1',
          category: 'grammar',
          questionText: 'Roman engineers _____ the monumental Colosseum nearly two thousand years ago.',
          hint: 'Specific time in the past requires past simple',
          options: ['built', 'have built', 'build', 'are building'],
          correctIndex: 0,
          explanation: 'Because "two thousand years ago" specifies a finished past time, we use past simple "built".',
          moveName: 'Centaur Javelin'
        },
        {
          id: 'rom-3-q2',
          category: 'vocabulary',
          questionText: 'A fearless fighter in ancient Rome who fought in public arenas for crowds was a ______.',
          hint: 'Latin "gladius" (short sword): agent noun ending in "-ator"',
          options: ['gladiator', 'senator', 'emperor', 'sculptor'],
          correctIndex: 0,
          explanation: 'A "gladiator" was an armed combatant who entertained audiences in the Roman Republic and Empire.',
          moveName: 'Colosseum Blaze'
        },
        {
          id: 'rom-3-q3',
          category: 'reading',
          questionText: '"Rome was not built in a day." What encouraging lesson does this proverb teach learners?',
          hint: 'Great achievements take time, patience, and persistent effort',
          options: ['Great achievements take sustained patience and daily dedication', 'Buildings collapse quickly', 'One day is enough for studying', 'Never start difficult projects'],
          correctIndex: 0,
          explanation: '"Rome wasn\'t built in a day" emphasizes that worthwhile goals require steady, ongoing effort.',
          moveName: 'Imperial Bronze Shield'
        },
        {
          id: 'rom-3-q4',
          category: 'spelling',
          questionText: 'Which spelling is correct for the ancient stone structures left behind by history?',
          hint: 'Latin "ruere" (to fall down): plural noun ending in "-ins"',
          options: ['ruins', 'rueens', 'roons', 'rewins'],
          correctIndex: 0,
          explanation: '"Ruins" is spelled R-U-I-N-S.',
          moveName: 'Gladiator Honor Surge'
        }
      ]
    },
    {
      id: 'rom-4',
      name: 'TiberHydra',
      type: 'Water',
      level: 18,
      hp: 3,
      maxHp: 3,
      position: [41.8919, 12.4777],
      streetName: 'Ponte Sant\'Angelo / Tiber Embankment',
      spriteColor: '#0EA5E9',
      description: 'A multi-headed water dragon watching over the Tiber River with marble wisdom!',
      avatarIcon: '🐉',
      rarity: 'Epic',
      auraColor: '#38BDF8',
      lessonTopic: 'Relative Clauses with Who & Which',
      questions: [
        {
          id: 'rom-4-q1',
          category: 'grammar',
          questionText: 'The ancient bridge _____ spans the Tiber River was completed by Emperor Hadrian.',
          hint: 'Use "which" or "that" for objects/bridges',
          options: ['which', 'who', 'whom', 'whose'],
          correctIndex: 0,
          explanation: 'We use "which" (or "that") for inanimate things like bridges; "who" is reserved for people.',
          moveName: 'Hydra Tidal Blast'
        },
        {
          id: 'rom-4-q2',
          category: 'vocabulary',
          questionText: 'An arched structure carrying an elevated water conduit across valleys is an ______.',
          hint: 'Latin "aqua" (water) + "ducere" (to lead): features "que" and terminal "-duct"',
          options: ['aqueduct', 'aquarium', 'anchor', 'archipelago'],
          correctIndex: 0,
          explanation: 'An "aqueduct" is a watercourse constructed to convey water across long distances.',
          moveName: 'Aqueduct Cascade'
        },
        {
          id: 'rom-4-q3',
          category: 'reading',
          questionText: '"When in Rome, do as the Romans do." What does this wise travel idiom suggest?',
          hint: 'Adapt to the local customs, manners, and culture of the place you visit',
          options: ['Adapt to and respect the local customs of the society you are visiting', 'Only eat pizza and pasta', 'Never speak foreign languages', 'Copy mistakes without thinking'],
          correctIndex: 0,
          explanation: 'This proverb advises travelers to respect and follow local customs and behavior.',
          moveName: 'Emperor Aqua Whirl'
        },
        {
          id: 'rom-4-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for high courage and bravery in the face of adversity?',
          hint: 'Latin "valere" (to be strong): American "-or" / British "-our"',
          options: ['valor', 'valer', 'vallor', 'valur'],
          correctIndex: 0,
          explanation: '"Valor" (or valour) is spelled V-A-L-O-R.',
          moveName: 'Tiber Eternal Roar'
        }
      ]
    }
  ],

  // SYDNEY (City 6) - adding 2 monsters: BondiShark & BlueMtnsGryphon
  sydney: [
    {
      id: 'syd-3',
      name: 'BondiShark',
      type: 'Water',
      level: 19,
      hp: 3,
      maxHp: 3,
      position: [-33.8915, 151.2767],
      streetName: 'Campbell Parade / Bondi Beach Promenade',
      spriteColor: '#0284C7',
      description: 'A lightning-fast cyber shark riding turquoise Pacific barrels along Bondi sands!',
      avatarIcon: '🦈',
      rarity: 'Rare',
      auraColor: '#38BDF8',
      lessonTopic: 'Adverbial Formations',
      questions: [
        {
          id: 'syd-3-q1',
          category: 'grammar',
          questionText: 'The championship surfer carved _____ across the crest of the Pacific wave.',
          hint: 'Adverb describing the verb "carved"',
          options: ['effortlessly', 'effortless', 'more effortless', 'effortlessness'],
          correctIndex: 0,
          explanation: 'We need the adverb "effortlessly" to describe how the action was performed.',
          moveName: 'Bondi Barrel Dash'
        },
        {
          id: 'syd-3-q2',
          category: 'vocabulary',
          questionText: 'A high, rolling swell of water breaking into foam on the seashore is a ______.',
          hint: 'Sound symbolism of breaking sea waves: spelled with "u", not "e"',
          options: ['breaker', 'puddle', 'lake', 'stream'],
          correctIndex: 0,
          explanation: 'A "breaker" is a heavy ocean sea-wave breaking into white foam on rocks or a beach.',
          moveName: 'Tidal Tail Whip'
        },
        {
          id: 'syd-3-q3',
          category: 'reading',
          questionText: 'If an Australian says "No worries!", what friendly message are they conveying?',
          hint: 'It\'s all right / You\'re welcome / Don\'t stress',
          options: ['It is completely fine and everything is okay', 'You must worry a lot', 'There is danger ahead', 'Please stop talking'],
          correctIndex: 0,
          explanation: '"No worries" is a warm, ubiquitous Aussie phrase meaning "You\'re welcome" or "It\'s no problem at all!"',
          moveName: 'Pacific Sunwave'
        },
        {
          id: 'syd-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for an oceanic tropical animal with a hard shell?',
          hint: 'Latin "tortuca" (twisted): features "ur" and terminal syllabic "-le"',
          options: ['turtle', 'tertle', 'turtel', 'turtal'],
          correctIndex: 0,
          explanation: '"Turtle" is spelled T-U-R-T-L-E.',
          moveName: 'Hydro Fin Breaker'
        }
      ]
    },
    {
      id: 'syd-4',
      name: 'BlueMtnsGryphon',
      type: 'Wind',
      level: 20,
      hp: 3,
      maxHp: 3,
      position: [-33.8568, 151.2153],
      streetName: 'Bennelong Point / Sydney Opera House',
      spriteColor: '#6366F1',
      description: 'A majestic blue-winged gryphon soaring over the iconic sail shells of Sydney Harbour!',
      avatarIcon: '🦅',
      rarity: 'Epic',
      auraColor: '#818CF8',
      lessonTopic: 'Modals of Deduction (Must, Can\'t, Might)',
      questions: [
        {
          id: 'syd-4-q1',
          category: 'grammar',
          questionText: 'Look at those towering white architectural sails! That _____ be the famous Sydney Opera House.',
          hint: 'High certainty based on clear evidence',
          options: ['must', 'can\'t', 'shouldn\'t', 'won\'t'],
          correctIndex: 0,
          explanation: 'We use "must" when we are logically certain about something based on strong visible evidence.',
          moveName: 'Harbour Gale'
        },
        {
          id: 'syd-4-q2',
          category: 'vocabulary',
          questionText: 'The unique structural design of a building is called its ______.',
          hint: 'Greek "arkhitekton": features "ch" digraph and noun suffix "-ture"',
          options: ['architecture', 'geography', 'astronomy', 'botany'],
          correctIndex: 0,
          explanation: '"Architecture" is the art or practice of designing and constructing buildings.',
          moveName: 'Sail Shell Reflection'
        },
        {
          id: 'syd-4-q3',
          category: 'reading',
          questionText: '"The sky is the limit." What does this enthusiastic expression inspire someone to do?',
          hint: 'There are no boundaries to what you can achieve',
          options: ['Believe that there is no boundary to your potential and ambition', 'Fly only in airplanes', 'Stop climbing mountains', 'Watch out for clouds'],
          correctIndex: 0,
          explanation: '"The sky is the limit" means there are virtually no restrictions or limits to what you can accomplish.',
          moveName: 'Celestial Apex Flight'
        },
        {
          id: 'syd-4-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for an unforgettable performance or show?',
          hint: 'Latin "spectaculum": adjective formed with suffix "-cular"',
          options: ['spectacular', 'spectaculer', 'spektacular', 'spectaculor'],
          correctIndex: 0,
          explanation: '"Spectacular" is spelled S-P-E-C-T-A-C-U-L-A-R.',
          moveName: 'Southern Cross Beam'
        }
      ]
    }
  ],

  // CAIRO (City 7) - adding 2 monsters: SphinxWatcher & NileCobra
  cairo: [
    {
      id: 'cai-3',
      name: 'SphinxWatcher',
      type: 'Psychic',
      level: 21,
      hp: 3,
      maxHp: 3,
      position: [29.9753, 31.1376],
      streetName: 'Giza Plateau Pyramid Causeway',
      spriteColor: '#D97706',
      description: 'The ancient limestone lion-headed watcher testing travelers with desert wisdom!',
      avatarIcon: '🦁',
      rarity: 'Rare',
      auraColor: '#F59E0B',
      lessonTopic: 'Past Perfect with "Had"',
      questions: [
        {
          id: 'cai-3-q1',
          category: 'grammar',
          questionText: 'By the time the sun set over the dunes, the archaeologists _____ their field notes.',
          hint: 'Action finished before another past event',
          options: ['had completed', 'have completed', 'were complete', 'completing had'],
          correctIndex: 0,
          explanation: 'Past perfect ("had completed") expresses an action completed before another past moment.',
          moveName: 'Pyramid Gaze'
        },
        {
          id: 'cai-3-q2',
          category: 'vocabulary',
          questionText: 'An ancient Egyptian picture-writing symbol used in carved inscriptions is a ______.',
          hint: 'Greek "hieros" (sacred) + "glyphein" (to carve): features "hiero-" and "-glyph"',
          options: ['hieroglyph', 'alphabet', 'shorthand', 'pixel'],
          correctIndex: 0,
          explanation: 'A "hieroglyph" is a character used in an ancient system of pictorial writing, notably in Egypt.',
          moveName: 'Glyph of Eternity'
        },
        {
          id: 'cai-3-q3',
          category: 'reading',
          questionText: '"Curiosity killed the cat, but satisfaction brought it back." What does the complete proverb celebrate?',
          hint: 'The joy and reward of discovery and learning new truths',
          options: ['The ultimate fulfillment that learning and solving mysteries brings', 'Cats should not climb walls', 'Questions are dangerous', 'Never explore ancient temples'],
          correctIndex: 0,
          explanation: 'The full proverb emphasizes that while risk exists, the knowledge gained satisfies our human thirst for truth.',
          moveName: 'Dune Solar Ray'
        },
        {
          id: 'cai-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for an ancient monument shaped with triangular stone sides?',
          hint: 'Greek "pyramis": spelled with vowel "y" in the initial syllable',
          options: ['pyramid', 'piramid', 'pyramyd', 'pie-ramid'],
          correctIndex: 0,
          explanation: '"Pyramid" is spelled P-Y-R-A-M-I-D.',
          moveName: 'Sphinx Sandstorm'
        }
      ]
    },
    {
      id: 'cai-4',
      name: 'NileCobra',
      type: 'Water',
      level: 22,
      hp: 3,
      maxHp: 3,
      position: [30.0444, 31.2357],
      streetName: 'Corniche El Nil / Nile River Front',
      spriteColor: '#059669',
      description: 'A shimmering turquoise river cobra bringing water blessings from the source of the Nile!',
      avatarIcon: '🐍',
      rarity: 'Epic',
      auraColor: '#10B981',
      lessonTopic: 'Cause and Effect Linkers (Because of, Due to)',
      questions: [
        {
          id: 'cai-4-q1',
          category: 'grammar',
          questionText: 'Ancient agriculture flourished along the Nile _____ its seasonal, nutrient-rich floods.',
          hint: 'Followed directly by a noun phrase "its seasonal floods"',
          options: ['due to', 'because', 'since that', 'so as'],
          correctIndex: 0,
          explanation: '"Due to" (or "because of") is followed by a noun phrase, whereas "because" is followed by a subject and verb.',
          moveName: 'Nile Surge'
        },
        {
          id: 'cai-4-q2',
          category: 'vocabulary',
          questionText: 'Soil that is rich in nutrients and produces abundant crops and plants is ______.',
          hint: 'Latin "fertilis" (bearing fruit): adjective ending in "-ile"',
          options: ['fertile', 'barren', 'dry', 'shallow'],
          correctIndex: 0,
          explanation: '"Fertile" means capable of producing abundant vegetation, crops, or life.',
          moveName: 'Emerald Venom Strike'
        },
        {
          id: 'cai-4-q3',
          category: 'reading',
          questionText: '"Water is the driving force of all nature." (Leonardo da Vinci)\nWhy has the Nile River been revered for thousands of years?',
          hint: 'It sustained civilization, life, farming, and transport through the desert',
          options: ['It gave vital life, food, and transport across thousands of desert miles', 'It has blue water', 'People liked swimming in it', 'It was used to build cars'],
          correctIndex: 0,
          explanation: 'The Nile is known as the cradle of Egyptian civilization because it supplied water and fertile silt in an arid climate.',
          moveName: 'Lotus Hydro Flash'
        },
        {
          id: 'cai-4-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for a natural waterway flowing toward the sea?',
          hint: 'Old French "riviere": single "v" and vowel "i"',
          options: ['river', 'rivver', 'ryver', 'rivar'],
          correctIndex: 0,
          explanation: '"River" is spelled R-I-V-E-R.',
          moveName: 'Pharaoh Crest Surge'
        }
      ]
    }
  ],

  // RIO DE JANEIRO (City 8) - adding 2 monsters: SugarloafHawk & SambaSalamander
  rio: [
    {
      id: 'rio-3',
      name: 'SugarloafHawk',
      type: 'Wind',
      level: 23,
      hp: 3,
      maxHp: 3,
      position: [-22.9492, -43.1545],
      streetName: 'Avenida Pasteur / Sugarloaf Mountain Cableway',
      spriteColor: '#6366F1',
      description: 'A sharp-eyed mountain hawk riding Atlantic thermal drafts around Sugarloaf Peak!',
      avatarIcon: '🦅',
      rarity: 'Rare',
      auraColor: '#818CF8',
      lessonTopic: 'Reported Speech (Tense Backshift)',
      questions: [
        {
          id: 'rio-3-q1',
          category: 'grammar',
          questionText: 'Direct: "The view is breathtaking."\nReported: The traveler said that the view _____ breathtaking.',
          hint: 'Present tense "is" backshifts to past tense in reported speech',
          options: ['was', 'is', 'will be', 'has been'],
          correctIndex: 0,
          explanation: 'When reporting speech in the past, present "is" shifts back to past "was".',
          moveName: 'Thermal Falcon Swoop'
        },
        {
          id: 'rio-3-q2',
          category: 'vocabulary',
          questionText: 'A high, steep, panoramic view overlooking a wide expanse of land and ocean is a ______.',
          hint: 'Greek "pan" (all) + "horama" (sight): broad unobstructed scenic vista',
          options: ['panorama', 'microscope', 'tunnel', 'cubicle'],
          correctIndex: 0,
          explanation: 'A "panorama" is an unbroken view of the whole region surrounding an observer.',
          moveName: 'Sugarloaf Wing Gale'
        },
        {
          id: 'rio-3-q3',
          category: 'reading',
          questionText: '"Every cloud has a silver lining." What does this optimistic phrase remind us during hardships?',
          hint: 'Every difficult situation contains a positive aspect or hopeful lesson',
          options: ['Every tough circumstance contains something hopeful or positive', 'Clouds are made of metal', 'Rain only falls in silver colors', 'Never fly above clouds'],
          correctIndex: 0,
          explanation: '"Every cloud has a silver lining" reminds us to find optimism and good lessons even in tough times.',
          moveName: 'Atlantic Sky Beam'
        },
        {
          id: 'rio-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for a cable-suspended passenger car on mountains?',
          hint: 'Focus on semantic morphology, roots, and standard orthographic rules',
          options: ['cable car', 'cabel car', 'kabel car', 'caible car'],
          correctIndex: 0,
          explanation: '"Cable car" is spelled C-A-B-L-E  C-A-R.',
          moveName: 'Summit Cyclone'
        }
      ]
    },
    {
      id: 'rio-4',
      name: 'SambaSalamander',
      type: 'Fire',
      level: 24,
      hp: 3,
      maxHp: 3,
      position: [-22.9707, -43.1823],
      streetName: 'Avenida Atlântica / Copacabana Promenade',
      spriteColor: '#EF4444',
      description: 'A vibrant fiery salamander dancing to syncopated batucada rhythms along Copacabana mosaic tiles!',
      avatarIcon: '🦎',
      rarity: 'Epic',
      auraColor: '#F87171',
      lessonTopic: 'Tag Questions',
      questions: [
        {
          id: 'rio-4-q1',
          category: 'grammar',
          questionText: 'The carnival rhythm is irresistible, _____ it?',
          hint: 'Positive sentence takes negative tag: "is" ➔ "isn\'t"',
          options: ['isn\'t', 'doesn\'t', 'wasn\'t', 'aren\'t'],
          correctIndex: 0,
          explanation: 'A positive statement with the verb "is" takes the negative tag "isn\'t it?".',
          moveName: 'Batucada Flame Step'
        },
        {
          id: 'rio-4-q2',
          category: 'vocabulary',
          questionText: 'A lively, festive procession with music, dancing, and elaborate costumes through the city is a ______.',
          hint: 'French "parer" (to prepare/adorn): features "ar" and terminal "-ade"',
          options: ['parade', 'meeting', 'lecture', 'detour'],
          correctIndex: 0,
          explanation: 'A "parade" is a public procession, especially one celebrating a special day or event.',
          moveName: 'Carnival Inferno'
        },
        {
          id: 'rio-4-q3',
          category: 'reading',
          questionText: '"Laughter is the shortest distance between two people." (Victor Borge)\nWhat power does joy and celebration have in human language?',
          hint: 'Joy connects people of different cultures and languages instantly',
          options: ['Shared joy and laughter build immediate empathy and friendly connection', 'Distances can only be measured in meters', 'Never laugh with strangers', 'Silence is better than music'],
          correctIndex: 0,
          explanation: 'Laughter and warm celebration transcend borders, quickly uniting people of diverse origins.',
          moveName: 'Samba Flare Sparkle'
        },
        {
          id: 'rio-4-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for the repeating musical beat and cadence in dancing?',
          hint: 'Greek "rhythmos": uses vowel "y" with unvoiced dental fricative "th"',
          options: ['rhythm', 'rythm', 'rhythim', 'rithim'],
          correctIndex: 0,
          explanation: '"Rhythm" is spelled R-H-Y-T-H-M.',
          moveName: 'Copacabana Solar Burst'
        }
      ]
    }
  ],

  // HONOLULU (City 10) - adding 2 monsters: DiamondHeadGolem & WaikikiManta
  honolulu: [
    {
      id: 'hnl-3',
      name: 'DiamondHeadGolem',
      type: 'Grass',
      level: 25,
      hp: 3,
      maxHp: 3,
      position: [21.2625, -157.8075],
      streetName: 'Diamond Head Crater Trail Summit',
      spriteColor: '#059669',
      description: 'A colossal volcanic crater golem adorned with tropical ferns and ancient petroglyphs!',
      avatarIcon: '🗿',
      rarity: 'Rare',
      auraColor: '#10B981',
      lessonTopic: 'Second Conditional (Imaginary Present)',
      questions: [
        {
          id: 'hnl-3-q1',
          category: 'grammar',
          questionText: 'If I _____ wings like a tropical seabird, I would fly across all Hawaiian islands.',
          hint: 'Second conditional uses past simple "had" in the if-clause',
          options: ['had', 'have', 'would have', 'having'],
          correctIndex: 0,
          explanation: 'The Second Conditional uses "If + past simple, would + verb" for imaginary present situations.',
          moveName: 'Crater Stone Pillar'
        },
        {
          id: 'hnl-3-q2',
          category: 'vocabulary',
          questionText: 'A circular bowl-shaped depression at the top of a volcano is called a ______.',
          hint: 'Greek "krater" (mixing bowl): volcanic depression ending in "-er"',
          options: ['crater', 'canyon', 'valley', 'meadow'],
          correctIndex: 0,
          explanation: 'A "crater" is a large bowl-shaped cavity in the ground or on a volcano.',
          moveName: 'Basalt Shockwave'
        },
        {
          id: 'hnl-3-q3',
          category: 'reading',
          questionText: 'In Hawaiian culture, what does the warm greeting and philosophy of "Aloha" represent?',
          hint: 'Love, peace, compassion, and living in harmony with others and nature',
          options: ['Love, kindness, mutual respect, and harmony with the community and earth', 'Only hello and goodbye', 'A type of fruit', 'A sailing ship'],
          correctIndex: 0,
          explanation: '"Aloha" is a deep way of life that embodies love, compassion, hospitality, and harmonious living.',
          moveName: 'Island Palm Bulwark'
        },
        {
          id: 'hnl-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for a mountain with a vent through which lava escapes?',
          hint: 'Latin "Vulcanus" (Roman god of fire): Italian origin ending in "-ano"',
          options: ['volcano', 'volcanow', 'valcano', 'volkeno'],
          correctIndex: 0,
          explanation: '"Volcano" is spelled V-O-L-C-A-N-O.',
          moveName: 'Diamond Head Earthbind'
        }
      ]
    },
    {
      id: 'hnl-4',
      name: 'WaikikiManta',
      type: 'Water',
      level: 26,
      hp: 3,
      maxHp: 3,
      position: [21.2740, -157.8240],
      streetName: 'Kalakaua Avenue / Waikiki Surf Break',
      spriteColor: '#0284C7',
      description: 'A radiant sapphire manta ray soaring effortlessly above coral reefs and rolling surf!',
      avatarIcon: '🪼',
      rarity: 'Epic',
      auraColor: '#38BDF8',
      lessonTopic: 'Phrasal Verbs with "Look"',
      questions: [
        {
          id: 'hnl-4-q1',
          category: 'grammar',
          questionText: 'Always _____ for sea turtles while paddleboarding near the coral reef.',
          hint: 'Phrasal verb meaning to be vigilant or watch out for',
          options: ['look out', 'look down', 'look over', 'look off'],
          correctIndex: 0,
          explanation: '"Look out for" means to watch carefully or be vigilant for something.',
          moveName: 'Manta Aqua Glide'
        },
        {
          id: 'hnl-4-q2',
          category: 'vocabulary',
          questionText: 'An underwater ridge formed by colonies of tiny marine animals and limestone is a coral ______.',
          hint: 'Old Norse "rif" (rib/ridge): underwater rock or coral ridge with double "ee"',
          options: ['reef', 'cliff', 'bridge', 'dune'],
          correctIndex: 0,
          explanation: 'A "coral reef" is a diverse underwater ecosystem held together by calcium carbonate structures.',
          moveName: 'Coral Shimmer Beam'
        },
        {
          id: 'hnl-4-q3',
          category: 'reading',
          questionText: '"You cannot stop the waves, but you can learn to surf." (Jon Kabat-Zinn)\nWhat life skill does this quote teach about handling challenges?',
          hint: 'You cannot stop life events, but you can learn how to balance and respond skillfully',
          options: ['Learn resilience, calm adaptability, and problem-solving rather than fighting reality', 'Surfing is mandatory for all students', 'Waves are impossible to navigate', 'Ocean sports are dangerous'],
          correctIndex: 0,
          explanation: 'This inspiring metaphor highlights that developing mindfulness and emotional agility helps us handle any life obstacle.',
          moveName: 'Tidal Harmony Waltz'
        },
        {
          id: 'hnl-4-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for an archipelago or cluster of islands in the sea?',
          hint: 'Old English "īġland" influenced by Latin "insula": features silent "s"',
          options: ['island', 'iland', 'iseland', 'ysland'],
          correctIndex: 0,
          explanation: '"Island" is spelled I-S-L-A-N-D.',
          moveName: 'Pacific Sovereign Corona'
        }
      ]
    }
  ],

  // SEOUL (City 9) - adding 2 monsters: CyberKite & NamsanGargoyle
  seoul: [
    {
      id: 'seo-3',
      name: 'CyberKite',
      type: 'Wind',
      level: 26,
      hp: 3,
      maxHp: 3,
      position: [37.5695, 126.9770],
      streetName: 'Sejong-daero Avenue',
      spriteColor: '#06B6D4',
      description: 'A neon digital dragon soaring above Gyeongbokgung palace gates!',
      avatarIcon: '🪁',
      rarity: 'Rare',
      auraColor: '#22D3EE',
      lessonTopic: 'Phrasal Verbs with "Look"',
      questions: [
        {
          id: 'seo-3-q1',
          category: 'grammar',
          questionText: 'When you encounter an unfamiliar English idiom, you should _____ in your field guide.',
          hint: 'Phrasal verb for searching information: look it up',
          options: ['look it up', 'look it off', 'look it into', 'look it down'],
          correctIndex: 0,
          explanation: '"Look up" means to search for information in a dictionary or reference book.',
          moveName: 'Neon Wind Gust'
        },
        {
          id: 'seo-3-q2',
          category: 'vocabulary',
          questionText: 'What does the phrasal verb "give up" mean?',
          hint: 'To stop trying or surrender',
          options: ['to stop trying / quit', 'to give a present', 'to climb higher', 'to speak louder'],
          correctIndex: 0,
          explanation: '"Give up" means to quit or surrender. Never give up on your language journey!',
          moveName: 'Cyber Gale'
        },
        {
          id: 'seo-3-q3',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for the study of high-tech tools and computers?',
          hint: 'Greek "techne" (art/craft) + "logia" (study): classical "ch" digraph',
          options: ['technology', 'tecknology', 'technolagy', 'technoligy'],
          correctIndex: 0,
          explanation: '"Technology" is spelled T-E-C-H-N-O-L-O-G-Y.',
          moveName: 'Binary Typhoon'
        },
        {
          id: 'seo-3-q4',
          category: 'reading',
          questionText: '"Action speaks louder than words." What does this wise proverb advise us?',
          hint: 'What you do is more important than what you say',
          options: ['What you actually do matters more than what you promise', 'Shouting is better than whispering', 'Books are useless', 'Only speak in riddles'],
          correctIndex: 0,
          explanation: '"Action speaks louder than words" reminds us that real deeds and practice matter far more than mere talk!',
          moveName: 'Astral Master Strike'
        }
      ]
    },
    {
      id: 'seo-4',
      name: 'NamsanGargoyle',
      type: 'Psychic',
      level: 27,
      hp: 3,
      maxHp: 3,
      position: [37.5512, 126.9882],
      streetName: 'N Seoul Tower Loop',
      spriteColor: '#8B5CF6',
      description: 'The glowing mystic guardian perched high atop N Seoul Tower overlooking the mountain!',
      avatarIcon: '🔮',
      rarity: 'Epic',
      auraColor: '#C084FC',
      lessonTopic: 'Gerunds after Prepositions',
      questions: [
        {
          id: 'seo-4-q1',
          category: 'grammar',
          questionText: 'I am really looking forward _____ you at the international conference tomorrow.',
          hint: 'The phrase "look forward to" is followed by a gerund (-ing)',
          options: ['to meeting', 'to meet', 'meeting', 'meet'],
          correctIndex: 0,
          explanation: 'The phrase "look forward to" takes a noun or gerund (-ing): "look forward to meeting".',
          moveName: 'Cosmic Tower Ray'
        },
        {
          id: 'seo-4-q2',
          category: 'vocabulary',
          questionText: 'Someone who speaks three or more languages fluently is known as a ______.',
          hint: 'Poly- means many',
          options: ['polyglot', 'monoglot', 'pilot', 'botanist'],
          correctIndex: 0,
          explanation: 'A "polyglot" is someone who knows and is able to use several languages.',
          moveName: 'Mind Warp'
        },
        {
          id: 'seo-4-q3',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for an impressive elevated viewing tower?',
          hint: 'Latin "observare" (to watch): scientific facility suffix "-atory"',
          options: ['observatory', 'observetory', 'observatary', 'obzervatory'],
          correctIndex: 0,
          explanation: '"Observatory" is spelled O-B-S-E-R-V-A-T-O-R-Y.',
          moveName: 'Namsan Summit Flare'
        },
        {
          id: 'seo-4-q4',
          category: 'reading',
          questionText: 'If a project is "a piece of cake", what does that idiom mean?',
          hint: 'Think about how easy it is to eat cake',
          options: ['It is very easy to accomplish', 'It is made of sugar', 'It takes five years', 'It is dangerous'],
          correctIndex: 0,
          explanation: 'The idiom "a piece of cake" means something is extremely simple or easy to do.',
          moveName: 'Thunder K-Pop Blast'
        }
      ]
    }
  ],

  // AMSTERDAM (City 14) - adding 1 monster: WindmillGale
  amsterdam: [
    {
      id: 'ams-3',
      name: 'WindmillGale',
      type: 'Wind',
      level: 28,
      hp: 3,
      maxHp: 3,
      position: [52.3680, 4.8900],
      streetName: 'Singel Canal Bridge',
      spriteColor: '#06B6D4',
      description: 'A spinning aerodynamic gale sprite powered by centuries of Dutch windmill heritage!',
      avatarIcon: '💨',
      rarity: 'Rare',
      auraColor: '#22D3EE',
      lessonTopic: 'Infinitive of Purpose',
      questions: [
        {
          id: 'ams-3-q1',
          category: 'grammar',
          questionText: 'Locals in Amsterdam ride bicycles every day _____ healthy and avoid traffic congestion.',
          hint: 'To + verb explains the purpose or reason for an action',
          options: ['to stay', 'for staying', 'staying', 'for stay'],
          correctIndex: 0,
          explanation: 'We use the infinitive of purpose ("to stay") to explain why someone does an action.',
          moveName: 'Windmill Whirlwind'
        },
        {
          id: 'ams-3-q2',
          category: 'vocabulary',
          questionText: 'An artificial waterway constructed to allow the passage of boats or to direct water is a ______.',
          hint: 'Latin "canalis" (pipe/groove): single "n" and double "a"',
          options: ['canal', 'highway', 'runway', 'drainpipe'],
          correctIndex: 0,
          explanation: 'A "canal" is an artificial waterway constructed for navigation or irrigation.',
          moveName: 'Canal Current Rush'
        },
        {
          id: 'ams-3-q3',
          category: 'reading',
          questionText: '"Where there is a will, there is a way." What does this famous proverb affirm?',
          hint: 'If you are truly determined, you will find a way to overcome any obstacle',
          options: ['True determination enables you to overcome any difficulty', 'Wills are only legal documents', 'Ways are street directions', 'Give up when things get hard'],
          correctIndex: 0,
          explanation: '"Where there\'s a will, there\'s a way" reminds us that determination and ingenuity conquer obstacles.',
          moveName: 'Breeze of Liberty'
        },
        {
          id: 'ams-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for a machine that converts wind power into rotational energy?',
          hint: 'Compound industrial noun combining kinetic wind harnessing with grain milling',
          options: ['windmill', 'windmil', 'wyndmill', 'windmeel'],
          correctIndex: 0,
          explanation: '"Windmill" is spelled W-I-N-D-M-I-L-L.',
          moveName: 'Zephyr Spin Strike'
        }
      ]
    }
  ],

  // DUBAI (City 15) - adding 1 monster: MarinaStingray
  dubai: [
    {
      id: 'dxb-3',
      name: 'MarinaStingray',
      type: 'Water',
      level: 30,
      hp: 3,
      maxHp: 3,
      position: [25.0805, 55.1403],
      streetName: 'Dubai Marina Walk / JBR Promenade',
      spriteColor: '#0284C7',
      description: 'A neon-lit cyber stingray gliding through the crystal yacht waters of Dubai Marina!',
      avatarIcon: '🐡',
      rarity: 'Rare',
      auraColor: '#38BDF8',
      lessonTopic: 'Third Conditional (Unreal Past)',
      questions: [
        {
          id: 'dxb-3-q1',
          category: 'grammar',
          questionText: 'If we had booked our Burj Khalifa observation tickets earlier, we _____ the sunset from the 148th floor.',
          hint: 'Third conditional: If + had + past participle, would have + past participle',
          options: ['would have watched', 'will watch', 'watched', 'would watch'],
          correctIndex: 0,
          explanation: 'The third conditional ("would have watched") talks about an unreal past condition and its past result.',
          moveName: 'Marina Wave Ripple'
        },
        {
          id: 'dxb-3-q2',
          category: 'vocabulary',
          questionText: 'A very tall building of many stories, often seen dominating a city skyline, is a ______.',
          hint: 'Colloquial architectural metaphor for a soaring multistory tower',
          options: ['skyscraper', 'cottage', 'bungalow', 'shed'],
          correctIndex: 0,
          explanation: 'A "skyscraper" is a very tall, continuously habitable building having multiple floors.',
          moveName: 'Neon Spire Flash'
        },
        {
          id: 'dxb-3-q3',
          category: 'reading',
          questionText: '"Fortune favors the bold." What does this ancient proverb encourage people to cultivate?',
          hint: 'Courage, bold initiative, and brave action in pursuing dreams',
          options: ['Courage and decisive action bring positive opportunities', 'Only lucky people win', 'Being timid is the safest approach', 'Never build ambitious things'],
          correctIndex: 0,
          explanation: '"Fortune favors the bold" encourages boldness, courage, and calculated ambition.',
          moveName: 'Gulf Aquatic Beam'
        },
        {
          id: 'dxb-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for an artificial safe haven for luxury yachts and boats?',
          hint: 'Latin "marinus" (of the sea): sheltered harbor basin for yachts and boats',
          options: ['marina', 'mareena', 'marrina', 'marine-a'],
          correctIndex: 0,
          explanation: '"Marina" is spelled M-A-R-I-N-A.',
          moveName: 'Emirates Sapphire Surge'
        }
      ]
    }
  ],

  // BARCELONA (City 16) - adding 1 monster: ParkGuellSalamander
  barcelona: [
    {
      id: 'bcn-3',
      name: 'ParkGuellSalamander',
      type: 'Fire',
      level: 31,
      hp: 3,
      maxHp: 3,
      position: [41.4145, 2.1527],
      streetName: 'Park Güell Monumental Staircase',
      spriteColor: '#F97316',
      description: 'The world-famous multicolored mosaic salamander (El Drac) sparking creative flames of architectural genius!',
      avatarIcon: '🦎',
      rarity: 'Rare',
      auraColor: '#FB923C',
      lessonTopic: 'Adjective Order (OSASCOMP)',
      questions: [
        {
          id: 'bcn-3-q1',
          category: 'grammar',
          questionText: 'Antoni Gaudí designed a _____ staircase inside Park Güell.',
          hint: 'Opinion (magnificent) ➔ Size (large) ➔ Material/Style (ceramic)',
          options: ['magnificent large ceramic', 'ceramic large magnificent', 'large ceramic magnificent', 'ceramic magnificent large'],
          correctIndex: 0,
          explanation: 'Correct English adjective order: Opinion (magnificent) + Size (large) + Material (ceramic).',
          moveName: 'Trencadís Spark'
        },
        {
          id: 'bcn-3-q2',
          category: 'vocabulary',
          questionText: 'Art made by arranging small pieces of colored stone, tile, or glass into patterns is called a ______.',
          hint: 'Greek "mouseion": decorative tessellated tile art ending in "-aic"',
          options: ['mosaic', 'tapestry', 'pottery', 'origami'],
          correctIndex: 0,
          explanation: 'A "mosaic" is a picture or pattern produced by arranging together small colored pieces of hard material.',
          moveName: 'Catalan Prism Beam'
        },
        {
          id: 'bcn-3-q3',
          category: 'reading',
          questionText: '"Originality consists in returning to the origin." (Antoni Gaudí)\nWhat was Gaudí\'s primary inspiration for his architecture?',
          hint: 'Nature, trees, bones, marine shells, and organic forms',
          options: ['Nature, living organic forms, and natural geometry', 'Straight factory lines', 'Computer algorithms', 'Steel boxes'],
          correctIndex: 0,
          explanation: 'Gaudí drew directly from nature\'s organic curves, animal forms, and botanical structures.',
          moveName: 'Organic Spiral Bloom'
        },
        {
          id: 'bcn-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for the creative ability to produce original ideas?',
          hint: 'Latin "creare" (to bring forth): abstract noun suffix "-ivity"',
          options: ['creativity', 'creativety', 'creeativity', 'creativitye'],
          correctIndex: 0,
          explanation: '"Creativity" is spelled C-R-E-A-T-I-V-I-T-Y.',
          moveName: 'Dragon Mosaic Crown'
        }
      ]
    }
  ],

  // BANGKOK (City 17) - adding 1 monster: EmeraldGaruda
  bangkok: [
    {
      id: 'bkk-3',
      name: 'EmeraldGaruda',
      type: 'Wind',
      level: 32,
      hp: 3,
      maxHp: 3,
      position: [13.7513, 100.4925],
      streetName: 'Grand Palace / Sanam Luang',
      spriteColor: '#10B981',
      description: 'A golden-crested mythological bird soaring majestically over Grand Palace spires and Chao Phraya waters!',
      avatarIcon: '🦅',
      rarity: 'Rare',
      auraColor: '#34D399',
      lessonTopic: 'Participle Adjectives (-ed vs -ing)',
      questions: [
        {
          id: 'bkk-3-q1',
          category: 'grammar',
          questionText: 'The glittering golden temple spires were so _____ that all the visitors stood in awe.',
          hint: 'Thing causing the emotion takes -ing',
          options: ['fascinating', 'fascinated', 'fascinate', 'fascination'],
          correctIndex: 0,
          explanation: 'We use "-ing" adjectives (fascinating) to describe the thing or person that produces an effect.',
          moveName: 'Garuda Golden Wing'
        },
        {
          id: 'bkk-3-q2',
          category: 'vocabulary',
          questionText: 'A high, slender, pointed structure rising above the roof of a temple or cathedral is a ______.',
          hint: 'Old English "spīr" (tapering shoot): steep pyramidal architectural apex',
          options: ['spire', 'pillar', 'balcony', 'courtyard'],
          correctIndex: 0,
          explanation: 'A "spire" is a tapering conical or pyramidal structure on the top of a building.',
          moveName: 'Temple Scepter Ray'
        },
        {
          id: 'bkk-3-q3',
          category: 'reading',
          questionText: '"A journey of a thousand miles begins with a single step." (Laozi)\nHow should students approach a huge goal like learning English?',
          hint: 'Take consistent, small daily steps every single day',
          options: ['Start today with steady, daily practice and consistent effort', 'Wait until you have five hours at once', 'Never start difficult tasks', 'Only study the day before exams'],
          correctIndex: 0,
          explanation: 'Grand achievements are reached through accumulated, disciplined small steps taken each day.',
          moveName: 'Siam Wind Blessing'
        },
        {
          id: 'bkk-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for a peaceful and respectful greeting in Thailand?',
          hint: 'Traditional Thai greeting gesture combining bowed head with prayer palms',
          options: ['wai', 'waye', 'whey', 'whai'],
          correctIndex: 0,
          explanation: 'The traditional Thai greeting is spelled "wai" (pressing palms together with a slight bow).',
          moveName: 'Emerald Falcon Aura'
        }
      ]
    }
  ],

  // SAN FRANCISCO (City 18) - adding 1 monster: AlcatrazWraith
  sanfrancisco: [
    {
      id: 'sfo-3',
      name: 'AlcatrazWraith',
      type: 'Psychic',
      level: 33,
      hp: 3,
      maxHp: 3,
      position: [37.8267, -122.4230],
      streetName: 'Alcatraz Island Watchtower',
      spriteColor: '#8B5CF6',
      description: 'A mysterious spectral mist phantom haunting rocky island currents with cryptic riddles!',
      avatarIcon: '👻',
      rarity: 'Rare',
      auraColor: '#A78BFA',
      lessonTopic: 'Inversion with Negative Adverbials',
      questions: [
        {
          id: 'sfo-3-q1',
          category: 'grammar',
          questionText: 'Rarely _____ such a thick, mysterious fog blanket over the bay.',
          hint: 'Negative adverb "Rarely" triggers subject-verb inversion: auxiliary + subject + verb',
          options: ['have I seen', 'I have seen', 'I saw', 'saw I'],
          correctIndex: 0,
          explanation: 'Negative adverbs at the beginning of a sentence (Rarely, Never, Seldom) require inversion: "have I seen".',
          moveName: 'Spectral Fog Shroud'
        },
        {
          id: 'sfo-3-q2',
          category: 'vocabulary',
          questionText: 'A tall stone tower with a powerful rotating beacon light to guide ships safely past rocks is a ______.',
          hint: 'Compound navigational noun combining illumination beacon with tower structure',
          options: ['lighthouse', 'windmill', 'skyscraper', 'silo'],
          correctIndex: 0,
          explanation: 'A "lighthouse" is a tower with a bright light at the top that warns or guides ships at sea.',
          moveName: 'Beacon Phantom Flare'
        },
        {
          id: 'sfo-3-q3',
          category: 'reading',
          questionText: '"The coldest winter I ever spent was a summer in San Francisco." (Attributed to Mark Twain)\nWhat unique weather phenomenon does this quote humorously refer to?',
          hint: 'The chilly Pacific marine fog ("Karl the Fog") blowing into the bay during summer',
          options: ['The famous chilly Pacific summer fog blowing into the city', 'Snow falling in July', 'Frozen ocean water', 'Lack of sunlight year-round'],
          correctIndex: 0,
          explanation: 'San Francisco summers often experience cool, windy Pacific marine layers and fog.',
          moveName: 'Bay Mist Mirage'
        },
        {
          id: 'sfo-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for an ocean current moving with strong swirling power?',
          hint: 'Latin "currere" (to run): doubled "rr" and suffix "-ent"',
          options: ['current', 'curent', 'currint', 'currant'],
          correctIndex: 0,
          explanation: 'An ocean flow of water is spelled "current" (C-U-R-R-E-N-T).',
          moveName: 'Alcatraz Soul Ward'
        }
      ]
    }
  ],

  // REYKJAVIK (City 19) - adding 1 monster: VolcanicWyrm
  reykjavik: [
    {
      id: 'rjk-3',
      name: 'VolcanicWyrm',
      type: 'Fire',
      level: 34,
      hp: 3,
      maxHp: 3,
      position: [64.1430, -21.9300],
      streetName: 'Tjörnin Lake Shoreline',
      spriteColor: '#DC2626',
      description: 'A subterranean magma dragon surging from geothermal vents beneath Iceland\'s basalt crust!',
      avatarIcon: '🌋',
      rarity: 'Rare',
      auraColor: '#EF4444',
      lessonTopic: 'Wishes and Regrets with "Wish"',
      questions: [
        {
          id: 'rjk-3-q1',
          category: 'grammar',
          questionText: 'It is so freezing out on the lava field! I wish I _____ my thermal jacket today.',
          hint: 'Past regret uses past perfect: had + past participle',
          options: ['had brought', 'brought', 'bring', 'would bring'],
          correctIndex: 0,
          explanation: 'We use "wish + had + past participle" to express a regret about an earlier past action.',
          moveName: 'Magma Geyser Surge'
        },
        {
          id: 'rjk-3-q2',
          category: 'vocabulary',
          questionText: 'Heat and energy derived naturally from the internal heat of the Earth is ______ energy.',
          hint: 'Geo- (Earth) + thermal (heat)',
          options: ['geothermal', 'solar', 'hydroelectric', 'nuclear'],
          correctIndex: 0,
          explanation: '"Geothermal" energy is thermal energy generated and stored in the Earth.',
          moveName: 'Basalt Lava Armor'
        },
        {
          id: 'rjk-3-q3',
          category: 'reading',
          questionText: 'Iceland is known worldwide as "The Land of Fire and Ice." What natural contrast creates this title?',
          hint: 'Glaciers and icecaps coexisting alongside active volcanic systems and geysers',
          options: ['Massive glaciers and active volcanic heat coexisting on the same island', 'Ice cream and bonfires', 'Winter and summer', 'Cold weather only'],
          correctIndex: 0,
          explanation: 'Iceland earned this moniker because glaciers and active volcanic systems exist side by side.',
          moveName: 'Lava Flare Blast'
        },
        {
          id: 'rjk-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for hot molten rock erupting from a volcano?',
          hint: 'Neapolitan Italian "lava" (stream/flow): volcanic molten rock',
          options: ['lava', 'larva', 'lahva', 'lavva'],
          correctIndex: 0,
          explanation: '"Lava" (molten rock) is spelled L-A-V-A. ("Larva" is an immature insect stage!)',
          moveName: 'Volcanic Core Burst'
        }
      ]
    }
  ],

  // CAPE TOWN (City 20) - adding 1 monster: CapePointSiren
  capetown: [
    {
      id: 'cpt-3',
      name: 'CapePointSiren',
      type: 'Water',
      level: 35,
      hp: 3,
      maxHp: 3,
      position: [-33.9036, 18.4205],
      streetName: 'V&A Waterfront Marina Boardwalk',
      spriteColor: '#0EA5E9',
      description: 'A dazzling oceanic siren guarding where the Atlantic and Indian oceans merge in swirling tides!',
      avatarIcon: '🧜‍♀️',
      rarity: 'Rare',
      auraColor: '#38BDF8',
      lessonTopic: 'Mixed Conditionals (Past Cause, Present Result)',
      questions: [
        {
          id: 'cpt-3-q1',
          category: 'grammar',
          questionText: 'If sailors _____ the warning signals from the lighthouse, they wouldn\'t be stranded on the reef now.',
          hint: 'Past condition (had heeded) with present result (wouldn\'t be stranded now)',
          options: ['had heeded', 'heeded', 'would heed', 'have heeded'],
          correctIndex: 0,
          explanation: 'A mixed conditional combines past cause ("had heeded") with a present consequence ("wouldn\'t be stranded now").',
          moveName: 'Two-Oceans Whirlpool'
        },
        {
          id: 'cpt-3-q2',
          category: 'vocabulary',
          questionText: 'A high point of land that extends into a river, lake, or ocean is called a cape or ______.',
          hint: 'Latin "promontorium": elevated ridge of land projecting into coastal water',
          options: ['promontory', 'plain', 'trench', 'crater'],
          correctIndex: 0,
          explanation: 'A "promontory" is a prominent mass of land overlooking or projecting into a lowland or body of water.',
          moveName: 'Siren Tide Song'
        },
        {
          id: 'cpt-3-q3',
          category: 'reading',
          questionText: '"It always seems impossible until it\'s done." (Nelson Mandela)\nWhat does this historic message encourage all learners to do?',
          hint: 'Persist bravely through difficult challenges without losing faith',
          options: ['Persevere through what seems impossible because dedication turns it into reality', 'Stop trying if something looks hard', 'Only do easy things', 'Believe tasks cannot be completed'],
          correctIndex: 0,
          explanation: 'Mandela\'s celebrated words remind us that courage and persistence transform seemingly impossible goals into triumphs.',
          moveName: 'Atlantic Cape Aurora'
        },
        {
          id: 'cpt-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for an oceanic bird native to the southern hemisphere?',
          hint: 'Welsh "pen gwyn" (white head): flightless marine bird ending in "-in"',
          options: ['penguin', 'pengwin', 'pengiun', 'pengwen'],
          correctIndex: 0,
          explanation: '"Penguin" is spelled P-E-N-G-U-I-N.',
          moveName: 'Two Oceans Crest'
        }
      ]
    }
  ],

  // BUENOS AIRES (City 21) - adding 1 monster: CaminitoChameleon
  buenosaires: [
    {
      id: 'bue-3',
      name: 'CaminitoChameleon',
      type: 'Grass',
      level: 36,
      hp: 3,
      maxHp: 3,
      position: [-34.6394, -58.3629],
      streetName: 'El Caminito / La Boca Painted Street',
      spriteColor: '#10B981',
      description: 'A colorful artistic chameleon shifting vibrant hues along the corrugated tin houses of La Boca!',
      avatarIcon: '🦎',
      rarity: 'Rare',
      auraColor: '#34D399',
      lessonTopic: 'Compound Adjectives with Hyphens',
      questions: [
        {
          id: 'bue-3-q1',
          category: 'grammar',
          questionText: 'La Boca is famous for its _____ houses painted in bold primary colors.',
          hint: 'Adverb-participle compound adjective: brightly-colored',
          options: ['brightly-colored', 'bright color', 'brightest coloring', 'bright-coloring'],
          correctIndex: 0,
          explanation: 'We use hyphenated compound adjectives like "brightly-colored" before nouns.',
          moveName: 'Caminito Color Burst'
        },
        {
          id: 'bue-3-q2',
          category: 'vocabulary',
          questionText: 'A famous theatrical dance originating in Buenos Aires known for dramatic rhythm and passion is the ______.',
          hint: 'Afro-Argentine rhythmic partner dance of the Rio de la Plata',
          options: ['tango', 'salsa', 'waltz', 'ballet'],
          correctIndex: 0,
          explanation: 'The "tango" is a ballroom dance of Argentine origin characterized by marked rhythms and stylized poses.',
          moveName: 'Tango Footwork'
        },
        {
          id: 'bue-3-q3',
          category: 'reading',
          questionText: '"It takes two to tango." What does this popular English idiom mean about cooperation and conflict?',
          hint: 'Both parties involved in a situation or conflict share responsibility',
          options: ['Both people involved in a situation share responsibility for the outcome', 'Only dance with partners', 'Arguments have only one cause', 'Single people cannot dance'],
          correctIndex: 0,
          explanation: '"It takes two to tango" means both parties in a relationship, dispute, or undertaking bear responsibility.',
          moveName: 'Prismatic Camouflage'
        },
        {
          id: 'bue-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for someone who lives in and loves their neighborhood?',
          hint: 'Old English "nēahgebūr": complex silent "gh" cluster and suffix "-hood"',
          options: ['neighborhood', 'nieghborhood', 'neighberhood', 'nayborhood'],
          correctIndex: 0,
          explanation: '"Neighborhood" is spelled N-E-I-G-H-B-O-R-H-O-O-D.',
          moveName: 'La Boca Rainbow Stride'
        }
      ]
    }
  ],

  // ATHENS (City 22) - adding 1 monster: AcropolisTitan
  athens: [
    {
      id: 'ath-3',
      name: 'AcropolisTitan',
      type: 'Electric',
      level: 37,
      hp: 3,
      maxHp: 3,
      position: [37.9715, 23.7257],
      streetName: 'Dionysiou Areopagitou Promenade / Acropolis Rock',
      spriteColor: '#F59E0B',
      description: 'A colossal bronze titan channeling thunderbolt philosophy from the rocky summit of the Acropolis!',
      avatarIcon: '⚡',
      rarity: 'Rare',
      auraColor: '#FBBF24',
      lessonTopic: 'Subject-Verb Agreement with Collective Nouns',
      questions: [
        {
          id: 'ath-3-q1',
          category: 'grammar',
          questionText: 'The committee of classical scholars _____ announced the winner of the essay contest.',
          hint: 'In standard American English, singular collective noun committee takes singular "has"',
          options: ['has', 'have', 'are', 'were'],
          correctIndex: 0,
          explanation: 'Collective nouns acting as a single unit take singular verbs: "The committee has announced".',
          moveName: 'Titan Thunderbolt'
        },
        {
          id: 'ath-3-q2',
          category: 'vocabulary',
          questionText: 'A form of government where power resides in the people who elect representatives or vote directly is a ______.',
          hint: 'Greek "demos" (people) + "kratos" (power): political system suffix "-cracy"',
          options: ['democracy', 'monarchy', 'oligarchy', 'anarchy'],
          correctIndex: 0,
          explanation: '"Democracy" (rule by the people) was famously born in ancient Athens in the 5th century BC.',
          moveName: 'Marble Pillar Ray'
        },
        {
          id: 'ath-3-q3',
          category: 'reading',
          questionText: '"The only true wisdom is in knowing you know nothing." (Socrates)\nWhat virtue did Socrates prize above pride?',
          hint: 'Intellectual humility, curiosity, and openness to learning continuously',
          options: ['Intellectual humility and a lifelong desire to keep questioning and learning', 'Pretending to know all answers', 'Never studying', 'Arguing to win'],
          correctIndex: 0,
          explanation: 'Socrates celebrated intellectual humility: recognizing the limits of our knowledge opens our minds to genuine learning.',
          moveName: 'Socratic Spark'
        },
        {
          id: 'ath-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for an ancient high citadel in Greek cities?',
          hint: 'Greek "akros" (high) + "polis" (city): sacred fortified hilltop citadel',
          options: ['acropolis', 'acropolys', 'akropolis', 'acrapolis'],
          correctIndex: 0,
          explanation: '"Acropolis" is spelled A-C-R-O-P-O-L-I-S.',
          moveName: 'Olympian Thunder Corona'
        }
      ]
    }
  ],

  // MUMBAI (City 23) - adding 1 monster: MarineDriveRay
  mumbai: [
    {
      id: 'bom-3',
      name: 'MarineDriveRay',
      type: 'Water',
      level: 38,
      hp: 3,
      maxHp: 3,
      position: [18.9430, 72.8230],
      streetName: 'Marine Drive / Queen\'s Necklace Promenade',
      spriteColor: '#0284C7',
      description: 'A luminous sapphire ray sparkling like the Queen\'s Necklace streetlights along the Arabian Sea!',
      avatarIcon: '🪼',
      rarity: 'Rare',
      auraColor: '#38BDF8',
      lessonTopic: 'Cleft Sentences (What I need is...)',
      questions: [
        {
          id: 'bom-3-q1',
          category: 'grammar',
          questionText: '_____ we need right now is a refreshing evening breeze off the Arabian Sea.',
          hint: 'Cleft sentence structure starting with "What"',
          options: ['What', 'That', 'Which', 'Where'],
          correctIndex: 0,
          explanation: 'We use "What-cleft" sentences ("What we need is...") to give strong focus and emphasis to a specific noun.',
          moveName: 'Arabian Sea Tide'
        },
        {
          id: 'bom-3-q2',
          category: 'vocabulary',
          questionText: 'A seasonal wind pattern in South Asia bringing torrential rains and maritime life is a ______.',
          hint: 'Arabic "mawsim" (seasonal shift): seasonal reversing wind system',
          options: ['monsoon', 'blizzard', 'avalanche', 'drought'],
          correctIndex: 0,
          explanation: 'A "monsoon" is a seasonal prevailing wind in South Asia blowing from the southwest between May and September.',
          moveName: 'Monsoon Splash'
        },
        {
          id: 'bom-3-q3',
          category: 'reading',
          questionText: '"You must be the change you wish to see in the world." (Mahatma Gandhi)\nWhat responsibility does this teach every student?',
          hint: 'Take personal initiative to live your values through your own deeds first',
          options: ['Lead by your own positive actions rather than merely criticizing others', 'Wait for everyone else to start', 'Only make big speeches', 'Changes are impossible'],
          correctIndex: 0,
          explanation: 'Gandhi\'s wisdom reminds us that personal integrity and daily actions create real, positive global change.',
          moveName: 'Queen\'s Necklace Light'
        },
        {
          id: 'bom-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for an impressive array of sparkling gemstones or streetlights?',
          hint: 'Compound personal ornament noun: throat jewel ending in "-lace"',
          options: ['necklace', 'neckless', 'necklase', 'neclace'],
          correctIndex: 0,
          explanation: '"Necklace" is spelled N-E-C-K-L-A-C-E.',
          moveName: 'Marine Drive Tidal Burst'
        }
      ]
    }
  ],

  // ISTANBUL (City 24) - adding 1 monster: GalataFalcon
  istanbul: [
    {
      id: 'ist-3',
      name: 'GalataFalcon',
      type: 'Wind',
      level: 39,
      hp: 3,
      maxHp: 3,
      position: [41.0256, 28.9741],
      streetName: 'Galata Kulesi Square / İstiklal Avenue',
      spriteColor: '#6366F1',
      description: 'A sharp-eyed stone-crested falcon watching over the Golden Horn from the top of Galata Tower!',
      avatarIcon: '🦅',
      rarity: 'Rare',
      auraColor: '#818CF8',
      lessonTopic: 'Concessive Clauses (Although, Even though, Despite)',
      questions: [
        {
          id: 'ist-3-q1',
          category: 'grammar',
          questionText: '_____ the steep cobblestone climb up to Galata Tower, the 360-degree panoramic view was worth every step.',
          hint: '"Despite" is followed by a noun phrase "the steep climb"',
          options: ['Despite', 'Although', 'Even though', 'Whereas'],
          correctIndex: 0,
          explanation: '"Despite" (or In spite of) is followed by a noun phrase, whereas "Although" requires a subject and verb clause.',
          moveName: 'Galata Tower Gale'
        },
        {
          id: 'ist-3-q2',
          category: 'vocabulary',
          questionText: 'A narrow passage of water connecting two seas or two large bodies of water is a ______.',
          hint: 'Old French "estreit" (narrow): narrow maritime passage connecting two bodies of water',
          options: ['strait', 'gulf', 'peninsula', 'harbor'],
          correctIndex: 0,
          explanation: 'A "strait" is a naturally formed, narrow waterway connecting two large bodies of water.',
          moveName: 'Bosphorus Wing Swoop'
        },
        {
          id: 'ist-3-q3',
          category: 'reading',
          questionText: 'Istanbul is the only metropolis in the world located across two continents simultaneously. Which two?',
          hint: 'Europe and Asia',
          options: ['Europe and Asia', 'Africa and Europe', 'Asia and North America', 'South America and Australia'],
          correctIndex: 0,
          explanation: 'Istanbul famously bridges both the European and Asian continents across the Bosphorus Strait.',
          moveName: 'Bridge of Continents Beam'
        },
        {
          id: 'ist-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for a medieval fortress or tower in a city?',
          hint: 'Old French "forteresse": fortified stronghold ending in "-ress"',
          options: ['fortress', 'fourtress', 'fortriss', 'fortres'],
          correctIndex: 0,
          explanation: '"Fortress" is spelled F-O-R-T-R-E-S-S.',
          moveName: 'Golden Horn Vortex'
        }
      ]
    }
  ],

  // KYOTO (City 25) - adding 1 monster: FushimiFox
  kyoto: [
    {
      id: 'kyo-3',
      name: 'FushimiFox',
      type: 'Fire',
      level: 40,
      hp: 3,
      maxHp: 3,
      position: [34.9671, 135.7727],
      streetName: 'Fushimi Inari Senbon Torii Path',
      spriteColor: '#EA580C',
      description: 'A mystical red-and-gold sacred kitsune leaping through thousands of vermilion torii shrine gates!',
      avatarIcon: '🦊',
      rarity: 'Rare',
      auraColor: '#F97316',
      lessonTopic: 'Ellipsis and Substitution (So do I, Neither do I)',
      questions: [
        {
          id: 'kyo-3-q1',
          category: 'grammar',
          questionText: '"I really enjoy visiting ancient wooden shrines and temples."\n"_____ do I! The peaceful atmosphere is enchanting."',
          hint: 'Agreeing with a positive statement using "So + auxiliary + I"',
          options: ['So', 'Neither', 'Either', 'Nor'],
          correctIndex: 0,
          explanation: 'We use "So do I" to agree with a positive statement; "Neither do I" is used for negative statements.',
          moveName: 'Vermilion Gate Flash'
        },
        {
          id: 'kyo-3-q2',
          category: 'vocabulary',
          questionText: 'A traditional Japanese gate commonly found at the entrance of a Shinto shrine is a ______.',
          hint: 'Traditional Japanese gateway marking the boundary between profane and sacred grounds',
          options: ['torii', 'pagoda', 'tatami', 'kimono'],
          correctIndex: 0,
          explanation: 'A "torii" gate marks the transition from the mundane world to the sacred space of a Shinto shrine.',
          moveName: 'Kitsune Sacred Ember'
        },
        {
          id: 'kyo-3-q3',
          category: 'reading',
          questionText: '"One who chases two rabbits catches neither." What does this ancient Japanese proverb teach learners?',
          hint: 'Focus deeply on one goal at a time rather than dividing your attention too thinly',
          options: ['Focus your energy on one goal at a time to achieve true success', 'Rabbits run very fast', 'Always hunt animals', 'Do everything at the same moment'],
          correctIndex: 0,
          explanation: 'This proverb advises that attempting to pursue multiple incompatible goals at once leads to failure in both.',
          moveName: 'Senbon Torii Rush'
        },
        {
          id: 'kyo-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for the deep, respectful calm found in quiet nature?',
          hint: 'Latin "tranquillus": doubled "ll" in British / single "l" in American with "-ity"',
          options: ['tranquility', 'tranquillitye', 'tranquelity', 'trankwility'],
          correctIndex: 0,
          explanation: '"Tranquility" (or tranquillity) is spelled T-R-A-N-Q-U-I-L-I-T-Y.',
          moveName: 'Inari Spirit Flame'
        }
      ]
    }
  ],

  // GENEVA (City 26) - adding 1 monster: MontBlancYeti
  geneva: [
    {
      id: 'gva-3',
      name: 'MontBlancYeti',
      type: 'Ice',
      level: 41,
      hp: 3,
      maxHp: 3,
      position: [46.2080, 6.1550],
      streetName: 'Promenade du Lac / Jet d\'Eau Pier',
      spriteColor: '#0EA5E9',
      description: 'A frost-crowned Alpine guardian descending from snow-capped Mont Blanc peaks to watch over Lake Geneva!',
      avatarIcon: '❄️',
      rarity: 'Rare',
      auraColor: '#7DD3FC',
      lessonTopic: 'Inversion with "Had I known / Should you"',
      questions: [
        {
          id: 'gva-3-q1',
          category: 'grammar',
          questionText: '_____ you require any assistance during your visit to the United Nations, our multilingual guides are ready.',
          hint: 'Formal conditional inversion: "Should you require" = "If you require"',
          options: ['Should', 'Would', 'Could', 'Might'],
          correctIndex: 0,
          explanation: 'In formal English, "Should you + verb" replaces "If you + verb" without using "if".',
          moveName: 'Alpine Glacier Breath'
        },
        {
          id: 'gva-3-q2',
          category: 'vocabulary',
          questionText: 'A country or state that chooses not to take part in a conflict or war between other nations maintains ______.',
          hint: 'Latin "neutralis": foreign policy posture abstaining from international conflicts (as in Switzerland)',
          options: ['neutrality', 'hostility', 'aggression', 'alliance'],
          correctIndex: 0,
          explanation: '"Neutrality" is the state of not supporting or helping either side in a conflict or disagreement.',
          moveName: 'Frost Aegis Shield'
        },
        {
          id: 'gva-3-q3',
          category: 'reading',
          questionText: '"Peace cannot be kept by force; it can only be achieved by understanding." (Albert Einstein)\nWhy is mutual dialogue essential in global diplomacy?',
          hint: 'True lasting peace comes from listening, empathy, and constructive communication',
          options: ['Lasting peace requires empathetic listening, mutual respect, and communication', 'Force is the only solution', 'Never sign agreements', 'Languages divide people forever'],
          correctIndex: 0,
          explanation: 'Einstein\'s insight proves that genuine harmony is born from education, empathy, and diplomatic dialogue.',
          moveName: 'Mont Blanc Summit Strike'
        },
        {
          id: 'gva-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for a massive moving sheet or body of mountain ice?',
          hint: 'Franco-Provençal "glace" (ice): massive slow-moving perennial ice mass ending in "-ier"',
          options: ['glacier', 'glasier', 'glaysher', 'glaycier'],
          correctIndex: 0,
          explanation: '"Glacier" is spelled G-L-A-C-I-E-R.',
          moveName: 'Lake Geneva Crystal Blast'
        }
      ]
    }
  ]
};
