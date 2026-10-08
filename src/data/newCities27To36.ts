import { CityData } from '../types';

export const NEW_CITIES_27_TO_36: CityData[] = [
  // CITY 27: SINGAPORE
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    coordinates: [1.2868, 103.8545],
    zoom: 14,
    lessonTitle: 'Lesson 27: Future Perfect & Future Continuous',
    lessonGrammarRule: 'Future Perfect ("will have + past participle") expresses actions completed before a future deadline. Future Continuous ("will be + verb-ing") expresses actions in progress at a future moment.',
    welcomeMessage: 'Welcome to Singapore (City 27/36)! Marvel at the futuristic Supertrees and Marina Bay Sands while mastering high-level future tenses!',
    landmarks: ['Marina Bay Sands', 'Gardens by the Bay', 'Merlion Park', 'Supertree Grove'],
    stations: [
      {
        id: 'sin-stn-1',
        name: 'Bayfront MRT Underground Interchange',
        position: [1.2825, 103.8593],
        type: 'subway',
        lines: ['Downtown Line (Blue)', 'Circle Line (Yellow)'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Direct air-conditioned MRT hub linking Marina Bay Sands and Gardens by the Bay.'
      },
      {
        id: 'sin-stn-2',
        name: 'Raffles Place Financial Station',
        position: [1.2839, 103.8515],
        type: 'train',
        lines: ['North South Line (Red)', 'East West Line (Green)'],
        icon: '🚅',
        speedMultiplier: 4.8,
        description: 'Vibrant underground central business district hub connecting major city arteries.'
      },
      {
        id: 'sin-stn-3',
        name: 'Marina Bay Water Taxi Pier',
        position: [1.2860, 103.8550],
        type: 'taxi',
        lines: ['Singapore River Cruise Line'],
        icon: '🚕',
        speedMultiplier: 2.5,
        description: 'Electric eco-ferry cruising between Merlion Park and the Esplanade Theatres.'
      }
    ],
    monsters: [
      {
        id: 'sin-1',
        name: 'MerlionAqua',
        type: 'Water',
        level: 42,
        hp: 3,
        maxHp: 3,
        position: [1.2868, 103.8545],
        streetName: 'Merlion Park Pier / Fullerton Road',
        spriteColor: '#0284C7',
        description: 'The iconic national lion-fish hybrid spraying cleansing sapphire fountains into Marina Bay!',
        avatarIcon: '🦁',
        rarity: 'Common',
        auraColor: '#38BDF8',
        lessonTopic: 'Future Continuous Predictions',
        questions: [
          {
            id: 'sin-1-q1',
            category: 'grammar',
            questionText: 'This time tomorrow, we _____ across the futuristic skyway of Gardens by the Bay.',
            hint: 'Action in progress at a specific future moment: will be + verb-ing',
            options: ['will be walking', 'will have walked', 'walked', 'are walked'],
            correctIndex: 0,
            explanation: 'We use the Future Continuous ("will be walking") for an action that will be in progress at a specific time in the future.',
            moveName: 'Merlion Geyser Blast'
          },
          {
            id: 'sin-1-q2',
            category: 'vocabulary',
            questionText: 'A plant or animal species that is half one creature and half another in folklore is a ______ creature.',
            hint: 'Focus on semantic morphology, roots, and standard orthographic rules',
            options: ['mythical', 'robotic', 'microscopic', 'domestic'],
            correctIndex: 0,
            explanation: 'A "mythical" creature comes from ancient legends or myths, like the lion-fish Merlion.',
            moveName: 'Fullerton Water Surge'
          },
          {
            id: 'sin-1-q3',
            category: 'reading',
            questionText: 'Singapore is famously known as the "Garden City". Why did city planners design so many vertical gardens and sky terraces?',
            hint: 'To blend nature, biodiversity, and urban greenery seamlessly into daily city life',
            options: ['To integrate lush nature, cooling shade, and greenery into dense urban spaces', 'To sell plants to tourists', 'Because buildings have no walls', 'To hide the roads'],
            correctIndex: 0,
            explanation: 'Singapore’s "City in Nature" initiative incorporates living plants, sky gardens, and greenery into buildings.',
            moveName: 'Aquatic Lion Roar'
          },
          {
            id: 'sin-1-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an impressive city skyline by the sea?',
            hint: 'Focus on semantic morphology, roots, and standard orthographic rules',
            options: ['waterfront', 'waterfrunt', 'watarfront', 'whaterfront'],
            correctIndex: 0,
            explanation: '"Waterfront" is spelled W-A-T-E-R-F-R-O-N-T.',
            moveName: 'Marina Sapphire Stream'
          }
        ]
      },
      {
        id: 'sin-2',
        name: 'SupertreeGolem',
        type: 'Grass',
        level: 43,
        hp: 3,
        maxHp: 3,
        position: [1.2816, 103.8636],
        streetName: 'Supertree Grove, Gardens by the Bay',
        spriteColor: '#10B981',
        description: 'A 50-meter-tall vertical plant titan harvesting solar rays to power nocturnal light symphonies!',
        avatarIcon: '🌴',
        rarity: 'Rare',
        auraColor: '#34D399',
        lessonTopic: 'Future Perfect Tense',
        questions: [
          {
            id: 'sin-2-q1',
            category: 'grammar',
            questionText: 'By the year 2030, Singapore _____ thousands of new rooftop solar panels across the island.',
            hint: 'Action completed before a future deadline: will have + past participle',
            options: ['will have installed', 'will be install', 'installed have', 'installs will'],
            correctIndex: 0,
            explanation: 'Future Perfect ("will have installed") indicates an action that will be completed before a specified future time.',
            moveName: 'Solar Canopy Beam'
          },
          {
            id: 'sin-2-q2',
            category: 'vocabulary',
            questionText: 'The variety of plant and animal life in a particular habitat or in the world is called ______.',
            hint: 'Bio- (life) + diversity (variety)',
            options: ['biodiversity', 'pollution', 'deforestation', 'humidity'],
            correctIndex: 0,
            explanation: '"Biodiversity" is the variety of life in the world or in a particular habitat or ecosystem.',
            moveName: 'Vertical Garden Shield'
          },
          {
            id: 'sin-2-q3',
            category: 'reading',
            questionText: '"The best time to plant a tree was 20 years ago. The second best time is now." What does this proverb urge us to do?',
            hint: 'Take proactive action immediately rather than postponing positive choices',
            options: ['Start taking positive action immediately instead of procrastinating', 'Only plant trees in the past', 'Wait another 20 years', 'Ignore environmental goals'],
            correctIndex: 0,
            explanation: 'This inspiring proverb reminds us that the present moment is always the right time to start beneficial deeds.',
            moveName: 'Supertree Photosynthesis'
          },
          {
            id: 'sin-2-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an energy source that is naturally replenished?',
            hint: 'Focus on semantic morphology, roots, and standard orthographic rules',
            options: ['renewable', 'renewible', 'reneweble', 'renuewable'],
            correctIndex: 0,
            explanation: '"Renewable" is spelled R-E-N-E-W-A-B-L-E.',
            moveName: 'Bio-Luminesce Burst'
          }
        ]
      },
      {
        id: 'sin-3',
        name: 'OrchidDragon',
        type: 'Dragon',
        level: 44,
        hp: 3,
        maxHp: 3,
        position: [1.2838, 103.8607],
        streetName: 'Marina Bay Sands SkyPark',
        spriteColor: '#8B5CF6',
        description: 'A majestic dragon draped in purple Vanda Miss Joaquim orchids perched high above the infinity pool!',
        avatarIcon: '🐉',
        rarity: 'Legendary',
        auraColor: '#C084FC',
        lessonTopic: 'Distinction: Future Perfect vs Future Continuous',
        questions: [
          {
            id: 'sin-3-q1',
            category: 'grammar',
            questionText: 'Don\'t call me at 8:00 PM tonight because I _____ the nocturnal Garden Rhapsody light show.',
            hint: 'Action in progress at that future moment: will be + verb-ing',
            options: ['will be watching', 'will have watched', 'have watched', 'am watched'],
            correctIndex: 0,
            explanation: 'We use the Future Continuous ("will be watching") because the viewing action will be actively taking place at 8:00 PM.',
            moveName: 'SkyPark Astral Wave'
          },
          {
            id: 'sin-3-q2',
            category: 'vocabulary',
            questionText: 'A swimming pool whose water flows over one or more edges, producing a visual impression of having no boundary, is an ______ pool.',
            hint: 'Focus on semantic morphology, roots, and standard orthographic rules',
            options: ['infinity', 'interior', 'inelastic', 'infinitee'],
            correctIndex: 0,
            explanation: 'An "infinity pool" gives the optical illusion that its waters stretch infinitely into the horizon or sky.',
            moveName: 'Vanda Orchid Flare'
          },
          {
            id: 'sin-3-q3',
            category: 'reading',
            questionText: '"By this time next year, I will have mastered 1,000 new English words!"\nWhat two things does this sentence express?',
            hint: 'A clear future deadline (next year) and a completed achievement goal',
            options: ['A future deadline and a goal that will be successfully completed by that point', 'Something that happened last year', 'A regret about the past', 'A current habit'],
            correctIndex: 0,
            explanation: 'The Future Perfect describes an ambitious goal achieved before a specific future milestone.',
            moveName: 'Prismatic Dragon Breath'
          },
          {
            id: 'sin-3-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an exotic tropical flower celebrated in Singapore?',
            hint: 'Focus on semantic morphology, roots, and standard orthographic rules',
            options: ['orchid', 'orkid', 'orchyd', 'orckid'],
            correctIndex: 0,
            explanation: '"Orchid" is spelled O-R-C-H-I-D.',
            moveName: 'Cosmic Lion Dragon Crown'
          }
        ]
      }
    ]
  },

  // CITY 28: MEXICO CITY
  {
    id: 'mexicocity',
    name: 'Mexico City',
    country: 'Mexico',
    coordinates: [19.4326, -99.1332],
    zoom: 14,
    lessonTitle: 'Lesson 28: Mixed Conditionals & Hypotheses',
    lessonGrammarRule: 'Mixed conditionals connect past conditions to present outcomes ("If I had studied harder in school, I would be a diplomat today") or ongoing traits to past events ("If I weren\'t so afraid of heights, I would have climbed the pyramid").',
    welcomeMessage: '¡Bienvenidos a la Ciudad de México (City 28/36)! Walk historic Zócalo plazas and Aztec pyramid ruins while conquering advanced mixed conditional structures!',
    landmarks: ['Zócalo (Plaza de la Constitución)', 'Chapultepec Castle', 'Angel of Independence', 'Palacio de Bellas Artes'],
    stations: [
      {
        id: 'mex-stn-1',
        name: 'Metro Zócalo Underground',
        position: [19.4330, -99.1328],
        type: 'subway',
        lines: ['Line 2 (Blue)'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Historic subway stop displaying scale models of the Aztec capital Tenochtitlan.'
      },
      {
        id: 'mex-stn-2',
        name: 'Bellas Artes Metro & Metrobús Hub',
        position: [19.4352, -99.1412],
        type: 'train',
        lines: ['Line 2', 'Line 8', 'Metrobús Line 4'],
        icon: '🚅',
        speedMultiplier: 4.5,
        description: 'Palatial transit hub fronting the glittering Art Nouveau Palace of Fine Arts.'
      },
      {
        id: 'mex-stn-3',
        name: 'Chapultepec Eco-Bici & Bus Station',
        position: [19.4215, -99.1760],
        type: 'bus',
        lines: ['Metrobús Line 7 Reforma'],
        icon: '🚌',
        speedMultiplier: 2.4,
        description: 'Express double-decker bus terminal beside Chapultepec Castle hilltop forest.'
      }
    ],
    monsters: [
      {
        id: 'mex-1',
        name: 'AxolotlSage',
        type: 'Water',
        level: 45,
        hp: 3,
        maxHp: 3,
        position: [19.4204, -99.1819],
        streetName: 'Chapultepec Lake Boardwalk',
        spriteColor: '#EC4899',
        description: 'A friendly pink aquatic salamander famed for natural regeneration and timeless Aztec lore!',
        avatarIcon: '🦎',
        rarity: 'Common',
        auraColor: '#F472B6',
        lessonTopic: 'Mixed Conditionals (Type 1: Past Cause ➔ Present Result)',
        questions: [
          {
            id: 'mex-1-q1',
            category: 'grammar',
            questionText: 'If the team _____ the historic map yesterday, they wouldn\'t be lost in the historic center today.',
            hint: 'Past cause (had read) with present consequence (wouldn\'t be lost today)',
            options: ['had read', 'read', 'would read', 'are reading'],
            correctIndex: 0,
            explanation: 'We use "had read" (past perfect) in the if-clause to link a past mistake to a present result.',
            moveName: 'Regenerative Aqua Pulse'
          },
          {
            id: 'mex-1-q2',
            category: 'vocabulary',
            questionText: 'An animal species that is native and found only in one specific geographic area is ______.',
            hint: 'like the axolotl in Lake Xochimilco',
            options: ['endemic', 'universal', 'migratory', 'invasive'],
            correctIndex: 0,
            explanation: 'An "endemic" species is found exclusively in a particular geographical location and nowhere else.',
            moveName: 'Xochimilco Stream'
          },
          {
            id: 'mex-1-q3',
            category: 'reading',
            questionText: 'The axolotl has the extraordinary scientific ability to regenerate lost limbs and tissues. What can learners learn from this metaphor of resilience?',
            hint: 'Always bounce back from mistakes and regenerate your motivation',
            options: ['Recover quickly from mistakes, rebuild confidence, and keep growing', 'Only study marine biology', 'Never make mistakes', 'Give up if you fail once'],
            correctIndex: 0,
            explanation: 'Regeneration reminds students that mistakes are merely opportunities to recover, learn, and grow stronger.',
            moveName: 'Pink Gill Sparkle'
          },
          {
            id: 'mex-1-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a natural ability to heal or regrow?',
            hint: 'Focus on semantic morphology, roots, and standard orthographic rules',
            options: ['regeneration', 'regenaration', 'rejeneration', 'regeneratione'],
            correctIndex: 0,
            explanation: '"Regeneration" is spelled R-E-G-E-N-E-R-A-T-I-O-N.',
            moveName: 'Lake Chapultepec Ripple'
          }
        ]
      },
      {
        id: 'mex-2',
        name: 'AlebrijeWing',
        type: 'Psychic',
        level: 46,
        hp: 3,
        maxHp: 3,
        position: [19.4270, -99.1677],
        streetName: 'Paseo de la Reforma / Angel of Independence',
        spriteColor: '#8B5CF6',
        description: 'A multicolored fantastical dream chimera combining eagle wings, jaguar claws, and serpent horns!',
        avatarIcon: '🪽',
        rarity: 'Rare',
        auraColor: '#C084FC',
        lessonTopic: 'Mixed Conditionals (Type 2: Present Trait ➔ Past Result)',
        questions: [
          {
            id: 'mex-2-q1',
            category: 'grammar',
            questionText: 'If Maria _____ so fluent in Spanish, she wouldn\'t have been chosen as the museum guide last summer.',
            hint: 'Ongoing permanent trait (weren\'t) affecting a past outcome (wouldn\'t have been chosen)',
            options: ['weren\'t', 'hadn\'t been', 'isn\'t', 'won\'t be'],
            correctIndex: 0,
            explanation: 'When a general present state of being ("weren\'t so fluent") influences a past result, we use subjunctive "weren\'t" in the if-clause.',
            moveName: 'Dream Prism Glide'
          },
          {
            id: 'mex-2-q2',
            category: 'vocabulary',
            questionText: 'Brightly colored Mexican folk-art sculptures of fantastical, dreamlike creatures are called ______.',
            hint: 'Focus on semantic morphology, roots, and standard orthographic rules',
            options: ['alebrijes', 'origami', 'frescoes', 'hieroglyphs'],
            correctIndex: 0,
            explanation: '"Alebrijes" are iconic Mexican folk art sculptures depicting mythical, colorful hybrid beasts.',
            moveName: 'Oaxaca Color Wave'
          },
          {
            id: 'mex-2-q3',
            category: 'reading',
            questionText: '"Feet, what do I need them for if I have wings to fly?" (Frida Kahlo)\nWhat spirit of imagination and perseverance does Frida express?',
            hint: 'The supreme power of the creative human mind to transcend physical limitations',
            options: ['The creative imagination and inner strength can overcome any physical limitation', 'Shoes are unnecessary', 'Birds are superior to humans', 'Never walk on streets'],
            correctIndex: 0,
            explanation: 'Frida Kahlo\'s celebrated words express how the human imagination and spirit can soar despite physical trials.',
            moveName: 'Angel of Freedom Ray'
          },
          {
            id: 'mex-2-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an impressive broad tree-lined street or avenue?',
            hint: 'Focus on semantic morphology, roots, and standard orthographic rules',
            options: ['boulevard', 'boolevard', 'boulevarde', 'boulvard'],
            correctIndex: 0,
            explanation: '"Boulevard" is spelled B-O-U-L-E-V-A-R-D.',
            moveName: 'Reforma Feather Gust'
          }
        ]
      },
      {
        id: 'mex-3',
        name: 'QuetzalSun',
        type: 'Fire',
        level: 47,
        hp: 3,
        maxHp: 3,
        position: [19.4342, -99.1330],
        streetName: 'Plaza del Zócalo / Templo Mayor',
        spriteColor: '#EF4444',
        description: 'The feathered solar serpent radiating iridescent green plumes and golden warmth over Tenochtitlan!',
        avatarIcon: '🪶',
        rarity: 'Legendary',
        auraColor: '#F87171',
        lessonTopic: 'Inverted Conditionals (Had we known / Were you to)',
        questions: [
          {
            id: 'mex-3-q1',
            category: 'grammar',
            questionText: '_____ the ancient builders not aligned the pyramids with the solstices, the astronomical shadows wouldn\'t appear.',
            hint: 'Inverted third conditional: "Had + subject + not + past participle" replaces "If the ancient builders had not..."',
            options: ['Had', 'Were', 'Should', 'Did'],
            correctIndex: 0,
            explanation: 'In formal literary English, "Had the ancient builders not aligned..." inverts the subject and auxiliary to replace "If... had not".',
            moveName: 'Solstice Solar Flare'
          },
          {
            id: 'mex-3-q2',
            category: 'vocabulary',
            questionText: 'An iridescent green-and-red tropical bird celebrated in Mesoamerican mythology for its dazzling tail feathers is the ______.',
            hint: 'Nahuatl "quetzalli" (large brilliant tail feather): Central American sacred bird',
            options: ['quetzal', 'hummingbird', 'pelican', 'vulture'],
            correctIndex: 0,
            explanation: 'The "quetzal" is a strikingly colored bird in the trogon family, sacred in Aztec and Maya cultures.',
            moveName: 'Feathered Serpent Corona'
          },
          {
            id: 'mex-3-q3',
            category: 'reading',
            questionText: 'Underneath Mexico City\'s modern central Zócalo lie the excavated ruins of Templo Mayor, the heart of the Aztec Empire. What does this reveal about world cities?',
            hint: 'Modern capitals are layered living archives built upon centuries of diverse civilizational history',
            options: ['Great world cities are layered tapestries of ancient civilizational heritage and modern life', 'Ancient cities had no buildings', 'Pyramids only exist in deserts', 'History should be forgotten'],
            correctIndex: 0,
            explanation: 'Modern metropolis foundations often directly rest on rich archaeological layers of preceding cultures.',
            moveName: 'Aztec Sunstone Blast'
          },
          {
            id: 'mex-3-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for the immense stone square at the heart of Mexico City?',
            hint: 'Spanish name for the historic central public square of Mexico City, spelled with initial "Z"',
            options: ['Zocalo', 'Zokalo', 'Zocallow', 'Socalo'],
            correctIndex: 0,
            explanation: '"Zocalo" (Zócalo) is the world-famous historic main square of Mexico City.',
            moveName: 'Tenochtitlan Solar Strike'
          }
        ]
      }
    ]
  },

  // CITY 29: VANCOUVER
  {
    id: 'vancouver',
    name: 'Vancouver',
    country: 'Canada',
    coordinates: [49.2827, -123.1207],
    zoom: 14,
    lessonTitle: 'Lesson 29: Subjunctive Mood & Formal Proposals',
    lessonGrammarRule: 'The subjunctive mood uses the base form of the verb after verbs or adjectives of urgency, recommendation, or requirement: "It is essential that every student be (not is) prepared," and "The city proposed that we expand (not expands) the bike lanes."',
    welcomeMessage: 'Welcome to Vancouver (City 29/36)! Breathe fresh Pacific pine air along the Stanley Park Seawall and master formal subjunctive proposals!',
    landmarks: ['Stanley Park Seawall', 'Gastown Steam Clock', 'Granville Island', 'Canada Place'],
    stations: [
      {
        id: 'van-stn-1',
        name: 'Waterfront SkyTrain & SeaBus Concourse',
        position: [49.2858, -123.1119],
        type: 'train',
        lines: ['Expo Line', 'Canada Line', 'SeaBus North Shore Ferry'],
        icon: '🚅',
        speedMultiplier: 5.0,
        description: 'Vancouver premier multi-modal transit palace linking downtown, North Shore, and airport.'
      },
      {
        id: 'van-stn-2',
        name: 'Granville Street Transit Mall',
        position: [49.2801, -123.1205],
        type: 'subway',
        lines: ['Granville SkyTrain', 'Trolley Bus Network'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Pedestrian and zero-emission trolley transit corridor through the entertainment core.'
      },
      {
        id: 'van-stn-3',
        name: 'False Creek Aquabus Ferry Dock',
        position: [49.2709, -123.1340],
        type: 'taxi',
        lines: ['Aquabus Ferry', 'False Creek Ferries'],
        icon: '🚕',
        speedMultiplier: 2.2,
        description: 'Charming rainbow-colored mini ferries linking Granville Island and Yaletown.'
      }
    ],
    monsters: [
      {
        id: 'van-1',
        name: 'OrcaWave',
        type: 'Water',
        level: 48,
        hp: 3,
        maxHp: 3,
        position: [49.2860, -123.1432],
        streetName: 'English Bay Beach / Beach Avenue',
        spriteColor: '#0284C7',
        description: 'A glossy black-and-white killer whale breaching through sunset waves along English Bay!',
        avatarIcon: '🐋',
        rarity: 'Common',
        auraColor: '#38BDF8',
        lessonTopic: 'Subjunctive After Verbs of Recommendation',
        questions: [
          {
            id: 'van-1-q1',
            category: 'grammar',
            questionText: 'Marine biologists recommend that every boater _____ a respectful 400-meter distance from orca pods.',
            hint: 'Subjunctive mood uses the base form of the verb after "recommend that": keep',
            options: ['keep', 'keeps', 'kept', 'is keeping'],
            correctIndex: 0,
            explanation: 'After verbs of recommendation ("recommend that..."), English uses the subjunctive base verb ("keep", not "keeps").',
            moveName: 'Pacific Orca Breach'
          },
          {
            id: 'van-1-q2',
            category: 'vocabulary',
            questionText: 'A family or social group of whales traveling together in the ocean is called a ______.',
            hint: 'Collective noun describing a tight social school of cetaceans and dolphins',
            options: ['pod', 'pack', 'herd', 'flock'],
            correctIndex: 0,
            explanation: 'A "pod" is the correct collective noun for a group of marine mammals like whales or dolphins.',
            moveName: 'Tidal Tail Splash'
          },
          {
            id: 'van-1-q3',
            category: 'reading',
            questionText: 'English Bay in Vancouver is renowned for the annual Celebration of Light musical fireworks festival. How do events like this enrich civic community?',
            hint: 'They bring diverse cultural communities together in shared public celebration',
            options: ['They unite hundreds of thousands of people in shared joy, art, and friendship', 'They make the ocean warmer', 'They prevent people from studying', 'They happen indoors only'],
            correctIndex: 0,
            explanation: 'Public cultural celebrations strengthen community bonds, civic pride, and international friendship.',
            moveName: 'Emerald Coast Wave'
          },
          {
            id: 'van-1-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a marine mammal with a dorsal fin?',
            hint: 'Greek "delphis": aquatic mammal containing digraph "ph"',
            options: ['dolphin', 'dolfin', 'dolphyn', 'dollphin'],
            correctIndex: 0,
            explanation: '"Dolphin" is spelled D-O-L-P-H-I-N.',
            moveName: 'Ocean Echo Resonance'
          }
        ]
      },
      {
        id: 'van-2',
        name: 'TotemRaven',
        type: 'Wind',
        level: 49,
        hp: 3,
        maxHp: 3,
        position: [49.2995, -123.1165],
        streetName: 'Stanley Park Brockton Point Totem Poles',
        spriteColor: '#475569',
        description: 'An ancient obsidian raven spirit carrying the light of wisdom high among cedar and fir canopies!',
        avatarIcon: '🪶',
        rarity: 'Rare',
        auraColor: '#94A3B8',
        lessonTopic: 'Subjunctive After Impersonal Expressions',
        questions: [
          {
            id: 'van-2-q1',
            category: 'grammar',
            questionText: 'It is crucial that the old-growth rainforest _____ preserved for future generations.',
            hint: 'Passive subjunctive: "be preserved" (base verb "be")',
            options: ['be', 'is', 'was', 'been'],
            correctIndex: 0,
            explanation: 'After adjectives of necessity ("It is crucial that..."), the subjunctive uses base form "be": "that it be preserved".',
            moveName: 'Raven Cedar Whisper'
          },
          {
            id: 'van-2-q2',
            category: 'vocabulary',
            questionText: 'A monumental wooden post carved with ancestral figures and symbols by Indigenous peoples of the Pacific Northwest is a ______ pole.',
            hint: 'Ojibwe "odoodem" (kinship mark): carved Pacific Northwest ancestral pole',
            options: ['totem', 'telephone', 'flag', 'compass'],
            correctIndex: 0,
            explanation: 'A "totem pole" is a monumental carving depicting crest animals, ancestors, and oral histories.',
            moveName: 'Brockton Point Wind'
          },
          {
            id: 'van-2-q3',
            category: 'reading',
            questionText: 'In Pacific Northwest Indigenous mythology, Raven is the celebrated trickster and culture hero who brought light to the world. What does this tale symbolize?',
            hint: 'The triumph of clever curiosity, wisdom, and bringing knowledge out of darkness',
            options: ['Curiosity, intellect, and the illumination that knowledge brings to humanity', 'Birds like shiny toys', 'Nighttime is better than daytime', 'Never explore mysteries'],
            correctIndex: 0,
            explanation: 'The Raven bringing light symbolises intelligence, resourcefulness, and the gift of wisdom overcoming ignorance.',
            moveName: 'Obsidian Wing Gale'
          },
          {
            id: 'van-2-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a natural stone or concrete barrier defending a shoreline from ocean waves?',
            hint: 'Compound coastal engineering defense barrier restraining storm surges',
            options: ['seawall', 'seawale', 'ceawall', 'seawal'],
            correctIndex: 0,
            explanation: '"Seawall" is spelled S-E-A-W-A-L-L.',
            moveName: 'Totem Shadow Cloak'
          }
        ]
      },
      {
        id: 'van-3',
        name: 'CedarProwler',
        type: 'Grass',
        level: 50,
        hp: 3,
        maxHp: 3,
        position: [49.2832, -123.1098],
        streetName: 'Water Street / Gastown Steam Clock',
        spriteColor: '#10B981',
        description: 'A moss-covered timber beast exhaling aromatic cedar steam on cobblestone heritage sidewalks!',
        avatarIcon: '🌲',
        rarity: 'Legendary',
        auraColor: '#34D399',
        lessonTopic: 'Negative Subjunctive Formations',
        questions: [
          {
            id: 'van-3-q1',
            category: 'grammar',
            questionText: 'The park rangers insisted that visitors _____ off the marked conservation paths.',
            hint: 'Negative subjunctive: "not + base verb" (not stray)',
            options: ['not stray', 'do not stray', 'didn\'t stray', 'no straying'],
            correctIndex: 0,
            explanation: 'In the subjunctive, the negative form is simply "not + base verb": "that visitors not stray".',
            moveName: 'Steam Whistle Blast'
          },
          {
            id: 'van-3-q2',
            category: 'vocabulary',
            questionText: 'A clock powered by a steam engine that whistles chimes on the quarter hour in Vancouver is the Gastown ______ clock.',
            hint: 'Precipitating water vapor: spelled with vowel digraph "ea"',
            options: ['steam', 'solar', 'digital', 'atomic'],
            correctIndex: 0,
            explanation: 'The Gastown Steam Clock is built over a steam grate and harnesses steam power to whistle and chime.',
            moveName: 'Gastown Steam Vapor'
          },
          {
            id: 'van-3-q3',
            category: 'reading',
            questionText: '"In every walk with nature, one receives far more than he seeks." (John Muir)\nWhat does spending mindful time in green forests provide our minds?',
            hint: 'Peace, mental clarity, physical rejuvenation, and inspiration',
            options: ['Mental peace, renewed creativity, stress reduction, and well-being', 'Only physical exhaustion', 'A desire to stay inside', 'Nothing of value'],
            correctIndex: 0,
            explanation: 'Time immersed in nature restores mental focus, reduces cognitive fatigue, and inspires creative insight.',
            moveName: 'Evergreen Canopy Roar'
          },
          {
            id: 'van-3-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an ancient red or yellow coniferous tree sacred in the Pacific Northwest?',
            hint: 'Greek "kedros": aromatic evergreen conifer tree ending in "-ar"',
            options: ['cedar', 'ceder', 'ceadar', 'sedar'],
            correctIndex: 0,
            explanation: '"Cedar" is spelled C-E-D-A-R.',
            moveName: 'Pacific Sovereign Redwood'
          }
        ]
      }
    ]
  },

  // CITY 30: STOCKHOLM
  {
    id: 'stockholm',
    name: 'Stockholm',
    country: 'Sweden',
    coordinates: [59.3293, 18.0686],
    zoom: 14,
    lessonTitle: 'Lesson 30: Advanced Discourse Markers & Linking Words',
    lessonGrammarRule: 'Sophisticated discourse markers organize complex thoughts: "Furthermore / Moreover" add weight, "Nevertheless / On the contrary" express nuanced contrast, and "Consequently / Thus" signal logical outcomes.',
    welcomeMessage: 'Välkommen till Stockholm (City 30/36)! Stroll the cobblestones of Gamla Stan across 14 Baltic islands while mastering academic discourse markers!',
    landmarks: ['Gamla Stan (Old Town)', 'Royal Palace', 'Vasa Museum', 'City Hall (Stadshuset)'],
    stations: [
      {
        id: 'sto-stn-1',
        name: 'T-Centralen Metro Hub',
        position: [59.3312, 18.0592],
        type: 'subway',
        lines: ['Blue Line (Blå Linjen)', 'Red Line', 'Green Line'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'World-famous underground art gallery metro station carved into bedrock with blue mural vines.'
      },
      {
        id: 'sto-stn-2',
        name: 'Gamla Stan Historic Station',
        position: [59.3235, 18.0664],
        type: 'train',
        lines: ['Red Line', 'Green Line'],
        icon: '🚅',
        speedMultiplier: 4.5,
        description: 'Island transit hub looking directly over water channels and historic 13th-century spires.'
      },
      {
        id: 'sto-stn-3',
        name: 'Slussen Archipelago Ferry Terminal',
        position: [59.3208, 18.0730],
        type: 'bus',
        lines: ['Djurgården Ferry', 'Archipelago Waxholmsbolaget Lines'],
        icon: '🚌',
        speedMultiplier: 2.5,
        description: 'Ferry lock connecting Lake Mälaren with the 30,000 islands of the Baltic archipelago.'
      }
    ],
    monsters: [
      {
        id: 'sto-1',
        name: 'FjordElk',
        type: 'Grass',
        level: 51,
        hp: 3,
        maxHp: 3,
        position: [59.3275, 18.1002],
        streetName: 'Djurgården Royal Park Pathway',
        spriteColor: '#10B981',
        description: 'A stately golden-antlered king of the Nordic forest grazing amid royal birch groves!',
        avatarIcon: '🫎',
        rarity: 'Common',
        auraColor: '#34D399',
        lessonTopic: 'Discourse Markers for Addition (Furthermore, In addition)',
        questions: [
          {
            id: 'sto-1-q1',
            category: 'grammar',
            questionText: 'Stockholm runs on 100% renewable electricity. _____, over 80% of its heating comes from green district networks.',
            hint: 'Adding reinforcing information with a formal linker',
            options: ['Furthermore', 'On the contrary', 'Despite this', 'Otherwise'],
            correctIndex: 0,
            explanation: '"Furthermore" introduces additional corroborating evidence that strengthens the previous statement.',
            moveName: 'Nordic Antler Shock'
          },
          {
            id: 'sto-1-q2',
            category: 'vocabulary',
            questionText: 'A cherished Swedish social tradition of pausing work to enjoy coffee, pastries, and meaningful conversation with friends is ______.',
            hint: 'Swedish cultural ritual of pausing for coffee, pastry, and warm conversation',
            options: ['fika', 'siesta', 'brunch', 'buffet'],
            correctIndex: 0,
            explanation: '"Fika" is an essential Swedish cultural concept: slowing down to share coffee, cinnamon buns, and warm conversation.',
            moveName: 'Birch Grove Rustle'
          },
          {
            id: 'sto-1-q3',
            category: 'reading',
            questionText: 'The Swedish philosophy of "Lagom" translates roughly as "Not too little, not too much; just the right amount." How does this promote balanced living?',
            hint: 'It encourages moderation, sustainability, satisfaction, and avoiding excess',
            options: ['It fosters contentment, moderation, sustainability, and harmony in life', 'It means working 24 hours a day', 'It says you must own everything', 'It avoids all friendship'],
            correctIndex: 0,
            explanation: '"Lagom" emphasizes sustainable balance, modesty, and healthy equilibrium in all facets of life.',
            moveName: 'Baltic Pine Aura'
          },
          {
            id: 'sto-1-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an extensive cluster or chain of islands?',
            hint: 'Greek "arkhi-" (chief) + "pelagos" (sea): extensive chain or cluster of islands',
            options: ['archipelago', 'archipeligo', 'archepelago', 'archipellago'],
            correctIndex: 0,
            explanation: '"Archipelago" is spelled A-R-C-H-I-P-E-L-A-G-O.',
            moveName: 'Fjord Antler Guard'
          }
        ]
      },
      {
        id: 'sto-2',
        name: 'VikingLongship',
        type: 'Water',
        level: 52,
        hp: 3,
        maxHp: 3,
        position: [59.3256, 18.0745],
        streetName: 'Skeppsbron Quay / Baltic Waterfront',
        spriteColor: '#0284C7',
        description: 'A spectral dragon-prow warship carving through Baltic ice floes with rhythmic oar beats!',
        avatarIcon: '⛵',
        rarity: 'Rare',
        auraColor: '#38BDF8',
        lessonTopic: 'Discourse Markers for Contrast (Nevertheless, However)',
        questions: [
          {
            id: 'sto-2-q1',
            category: 'grammar',
            questionText: 'The 17th-century warship Vasa tragically sank on her maiden voyage in 1628; _____, her salvage 333 years later revealed an intact archaeological treasure.',
            hint: 'Contrasting a tragic opening with a wonderful historical conclusion: nevertheless',
            options: ['nevertheless', 'therefore', 'likewise', 'similarly'],
            correctIndex: 0,
            explanation: '"Nevertheless" introduces a fact that contrasts with or is surprising in light of what was just said.',
            moveName: 'Vasa Oak Broadside'
          },
          {
            id: 'sto-2-q2',
            category: 'vocabulary',
            questionText: 'Rescuing a sunken ship or its cargo from the seabed is referred to as maritime ______.',
            hint: 'Latin "salvare" (to save): maritime rescue and recovery ending in "-age"',
            options: ['salvage', 'sabotage', 'cargo', 'anchor'],
            correctIndex: 0,
            explanation: '"Salvage" is the rescue of a wrecked or disabled ship or its goods from loss at sea.',
            moveName: 'Baltic Salt Spray'
          },
          {
            id: 'sto-2-q3',
            category: 'reading',
            questionText: 'Because Baltic water has very low salinity and lacks wood-eating shipworms, the wooden Vasa ship was preserved almost perfectly for 333 years. What lesson in chemistry does this highlight?',
            hint: 'Environmental chemistry directly affects the preservation or decay of historical artifacts',
            options: ['Unique environmental chemical conditions can preserve historical artifacts for centuries', 'All wooden ships sink quickly', 'Cold water destroys everything', 'Oceans have no chemistry'],
            correctIndex: 0,
            explanation: 'The specific brackish water conditions of the Baltic prevented biological decay, keeping the ship intact.',
            moveName: 'Oar Strike Surge'
          },
          {
            id: 'sto-2-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an ancient Scandinavian maritime warrior and explorer?',
            hint: 'Old Norse "víkingr": Norse seafarer and explorer of the early Middle Ages',
            options: ['viking', 'vyking', 'veeking', 'vikinge'],
            correctIndex: 0,
            explanation: '"Viking" is spelled V-I-K-I-N-G.',
            moveName: 'Dragon Prow Ram'
          }
        ]
      },
      {
        id: 'sto-3',
        name: 'NordicAurora',
        type: 'Ice',
        level: 53,
        hp: 3,
        maxHp: 3,
        position: [59.3268, 18.0717],
        streetName: 'Slottsbacken / Royal Palace Courtyard',
        spriteColor: '#06B6D4',
        description: 'The shimmering emerald-and-violet light sovereign dancing over Stockholm\'s Baroque Royal Palace!',
        avatarIcon: '🌌',
        rarity: 'Legendary',
        auraColor: '#67E8F9',
        lessonTopic: 'Discourse Markers for Consequence (Consequently, Thus)',
        questions: [
          {
            id: 'sto-3-q1',
            category: 'grammar',
            questionText: 'The researchers rigorously validated their data across four independent universities; _____, their findings were universally accepted.',
            hint: 'Signaling a logical consequence or conclusion: consequently',
            options: ['consequently', 'despite', 'whereas', 'on the other hand'],
            correctIndex: 0,
            explanation: '"Consequently" (or "therefore", "thus") introduces a logical result or outcome of preceding actions.',
            moveName: 'Aurora Borealis Curtain'
          },
          {
            id: 'sto-3-q2',
            category: 'vocabulary',
            questionText: 'The celebrated international awards presented annually in Stockholm for breakthroughs in Physics, Chemistry, Medicine, and Literature are the ______ Prizes.',
            hint: 'Prestigious global prize foundation established by Swedish inventor Alfred Nobel',
            options: ['Nobel', 'Oscar', 'Grammy', 'Pulitzer'],
            correctIndex: 0,
            explanation: 'The "Nobel Prizes" are widely regarded as the most prestigious academic and literary accolades in the world.',
            moveName: 'Alfred Nobel Spark'
          },
          {
            id: 'sto-3-q3',
            category: 'reading',
            questionText: '"Wisdom is the power to put our time and our knowledge to the proper use." (Thomas J. Watson)\nWhy do the Nobel Prizes honor discoveries that "confer the greatest benefit on mankind"?',
            hint: 'True achievement lies in serving the betterment and welfare of humanity',
            options: ['To celebrate knowledge and science that genuinely advance peace, health, and human well-being', 'To make winners wealthy', 'To encourage useless inventions', 'To keep science secret'],
            correctIndex: 0,
            explanation: 'Alfred Nobel’s will specified that prizes honor those who rendered the greatest service to human progress.',
            moveName: 'Polar Starlight Wave'
          },
          {
            id: 'sto-3-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an impressive luminous phenomenon in the upper polar atmosphere?',
            hint: 'Roman goddess of the dawn: natural atmospheric polar luminescent display',
            options: ['aurora', 'arora', 'aurorra', 'orora'],
            correctIndex: 0,
            explanation: '"Aurora" is spelled A-U-R-O-R-A.',
            moveName: 'Stockholm Crown Corona'
          }
        ]
      }
    ]
  },

  // CITY 31: NAIROBI
  {
    id: 'nairobi',
    name: 'Nairobi',
    country: 'Kenya',
    coordinates: [-1.2921, 36.8219],
    zoom: 14,
    lessonTitle: 'Lesson 31: Phrasal Verbs with Multiple Particles',
    lessonGrammarRule: 'Three-part phrasal verbs combine a verb with two particles (preposition + adverb): "look forward to", "run out of", "come up with", "put up with", and "get along with". Their order is fixed and non-separable.',
    welcomeMessage: 'Jambo! Welcome to Nairobi (City 31/36)! Stand where savanna wildlife meets modern glass skyscrapers while mastering three-part phrasal verbs!',
    landmarks: ['Nairobi National Park', 'Kenyatta International Conf. Centre (KICC)', 'Karura Forest', 'Uhuru Park'],
    stations: [
      {
        id: 'nai-stn-1',
        name: 'Nairobi Central Railway Terminus',
        position: [-1.2905, 36.8285],
        type: 'train',
        lines: ['Madaraka Express Standard Gauge Rail (SGR)', 'Commuter Rail'],
        icon: '🚅',
        speedMultiplier: 5.0,
        description: 'Modern high-speed rail terminus whisking passengers across the Great Rift Valley to Mombasa.'
      },
      {
        id: 'nai-stn-2',
        name: 'KICC City Square Bus Station',
        position: [-1.2885, 36.8228],
        type: 'subway',
        lines: ['Nairobi Bus Rapid Transit (BRT)'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Central transit plaza beneath the iconic saucer tower of the Kenyatta Conference Centre.'
      },
      {
        id: 'nai-stn-3',
        name: 'Uhuru Highway Matatu Hub',
        position: [-1.2872, 36.8150],
        type: 'bus',
        lines: ['Vibrant Matatu Express Routes'],
        icon: '🚌',
        speedMultiplier: 2.6,
        description: 'Iconic custom-painted Kenyan minibuses pulsing with energetic music and street art.'
      }
    ],
    monsters: [
      {
        id: 'nai-1',
        name: 'SavannaCheetah',
        type: 'Electric',
        level: 54,
        hp: 3,
        maxHp: 3,
        position: [-1.2895, 36.8166],
        streetName: 'Uhuru Park Viewpoint / Procession Way',
        spriteColor: '#F59E0B',
        description: 'The world\'s fastest land predator coated in golden lightning spots overlooking city skylines!',
        avatarIcon: '🐆',
        rarity: 'Common',
        auraColor: '#FBBF24',
        lessonTopic: 'Phrasal Verbs: "Catch up with" & "Keep up with"',
        questions: [
          {
            id: 'nai-1-q1',
            category: 'grammar',
            questionText: 'Sprint as fast as you can, or you won\'t be able to _____ with the leading runners!',
            hint: 'Three-part phrasal verb meaning to stay at the same speed or level: keep up with',
            options: ['keep up with', 'keep out of', 'keep down on', 'keep off to'],
            correctIndex: 0,
            explanation: '"Keep up with" means to move at the same speed as someone or to maintain pace with developments.',
            moveName: 'Lightning Cheetah Sprint'
          },
          {
            id: 'nai-1-q2',
            category: 'vocabulary',
            questionText: 'A grassy plain in tropical and subtropical regions with scattered trees is a ______.',
            hint: 'Taíno "zabana" (treeless plain): tropical grassland ecosystem',
            options: ['savanna', 'tundra', 'glacier', 'canyon'],
            correctIndex: 0,
            explanation: 'A "savanna" (or savannah) is a rolling grassland biome with scattered shrubs and isolated trees.',
            moveName: 'Golden Prowl'
          },
          {
            id: 'nai-1-q3',
            category: 'reading',
            questionText: 'Nairobi is known as "The Green City in the Sun" and is the only global capital with a free-roaming wildlife national park adjacent to its downtown. Why is this coexistence celebrated?',
            hint: 'It proves modern human cities and precious wildlife conservation can thrive in harmony',
            options: ['It demonstrates how modern urban development and natural habitat protection can balance together', 'Animals should be trapped in rooms', 'Cities cannot have trees', 'All animals moved away'],
            correctIndex: 0,
            explanation: 'Nairobi National Park stands as a worldwide symbol of urban coexistence with majestic African fauna.',
            moveName: 'Savanna Spark Wave'
          },
          {
            id: 'nai-1-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for the fastest spotted wild cat in the world?',
            hint: 'Hindi "chita" (spotted): fastest terrestrial quadruped with double "ee"',
            options: ['cheetah', 'cheeta', 'cheetahh', 'cheata'],
            correctIndex: 0,
            explanation: '"Cheetah" is spelled C-H-E-E-T-A-H.',
            moveName: 'Volt Pounce Strike'
          }
        ]
      },
      {
        id: 'nai-2',
        name: 'SafariFalcon',
        type: 'Wind',
        level: 55,
        hp: 3,
        maxHp: 3,
        position: [-1.2886, 36.8233],
        streetName: 'Harambee Avenue / KICC Helipad',
        spriteColor: '#6366F1',
        description: 'A keen-eyed falcon scanning the Great Rift Valley from the saucer rooftop of KICC Tower!',
        avatarIcon: '🦅',
        rarity: 'Rare',
        auraColor: '#818CF8',
        lessonTopic: 'Phrasal Verbs: "Come up with" & "Look forward to"',
        questions: [
          {
            id: 'nai-2-q1',
            category: 'grammar',
            questionText: 'The environmental committee worked together to _____ an innovative wildlife protection plan.',
            hint: 'Three-part phrasal verb meaning to produce, suggest, or think of an idea: come up with',
            options: ['come up with', 'come out to', 'come down on', 'come off with'],
            correctIndex: 0,
            explanation: '"Come up with" means to produce, devise, or suggest an idea, plan, or solution.',
            moveName: 'Rift Valley Gale'
          },
          {
            id: 'nai-2-q2',
            category: 'vocabulary',
            questionText: 'The Swahili national motto of Kenya meaning "All pull together" in mutual community effort is ______.',
            hint: 'Swahili tradition of collective community self-reliance and unified pooling of effort',
            options: ['Harambee', 'Safari', 'Hakuna', 'Jambo'],
            correctIndex: 0,
            explanation: '"Harambee" is a Swahili tradition of community self-help events and collective responsibility.',
            moveName: 'Community Wing Gust'
          },
          {
            id: 'nai-2-q3',
            category: 'reading',
            questionText: '"If you want to go fast, go alone. If you want to go far, go together." (African Proverb)\nWhat profound truth does this proverb teach teams and students?',
            hint: 'Long-term enduring success comes from mutual support, collaboration, and unity',
            options: ['Enduring, meaningful success is achieved through collaboration, teamwork, and unity', 'Never work with others', 'Speed is the only virtue', 'Walking alone is always best'],
            correctIndex: 0,
            explanation: 'This timeless proverb reminds us that cooperation and collective strength achieve lasting greatness.',
            moveName: 'Falcon Helipad Vision'
          },
          {
            id: 'nai-2-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an expedition to observe wild animals in their natural habitat?',
            hint: 'Swahili "safari" (journey) derived from Arabic "safar"',
            options: ['safari', 'saffari', 'safary', 'saphari'],
            correctIndex: 0,
            explanation: '"Safari" is spelled S-A-F-A-R-I.',
            moveName: 'Aerial Apex Dive'
          }
        ]
      },
      {
        id: 'nai-3',
        name: 'BaobabGuardian',
        type: 'Grass',
        level: 56,
        hp: 3,
        maxHp: 3,
        position: [-1.2755, 36.8048],
        streetName: 'Nairobi Arboretum / State House Road',
        spriteColor: '#10B981',
        description: 'An ancient massive "Tree of Life" guardian storing thousands of liters of rainwater and wisdom!',
        avatarIcon: '🌳',
        rarity: 'Legendary',
        auraColor: '#34D399',
        lessonTopic: 'Phrasal Verbs: "Put up with" & "Run out of"',
        questions: [
          {
            id: 'nai-3-q1',
            category: 'grammar',
            questionText: 'True wildlife conservationists will not _____ the illegal poaching of endangered rhinos.',
            hint: 'Three-part phrasal verb meaning to tolerate or endure: put up with',
            options: ['put up with', 'put out to', 'put down with', 'put away on'],
            correctIndex: 0,
            explanation: '"Put up with" means to tolerate, endure, or accept an unpleasant situation.',
            moveName: 'Tree of Life Bulwark'
          },
          {
            id: 'nai-3-q2',
            category: 'vocabulary',
            questionText: 'An enormous African tree famous for its swollen trunk capable of storing thousands of liters of water during drought is the ______.',
            hint: 'African "tree of life" possessing a colossal water-storing swollen trunk',
            options: ['baobab', 'pine', 'willow', 'bamboo'],
            correctIndex: 0,
            explanation: 'The "baobab" tree can live for thousands of years and stores water inside its spongy fibrous wood.',
            moveName: 'Drought-Buster Quake'
          },
          {
            id: 'nai-3-q3',
            category: 'reading',
            questionText: 'Nobel Peace Prize laureate Wangari Maathai founded Kenya\'s Green Belt Movement, planting over 50 million trees. What did she prove about the power of grassroots action?',
            hint: 'Dedicated local action and community hands can restore landscapes and empower women',
            options: ['Community action, tree by tree, can heal environments and empower entire societies', 'Only governments can plant trees', 'Forests are not important', 'One person can never make a difference'],
            correctIndex: 0,
            explanation: 'Wangari Maathai demonstrated that grassroots environmental action empowers communities and restores democracy.',
            moveName: 'Green Belt Blessing'
          },
          {
            id: 'nai-3-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a botanical garden devoted to growing and conserving trees?',
            hint: 'Latin "arbor" (tree): botanical botanical garden dedicated to living trees',
            options: ['arboretum', 'arboretom', 'arboritum', 'arboreetum'],
            correctIndex: 0,
            explanation: '"Arboretum" is spelled A-R-B-O-R-E-T-U-M.',
            moveName: 'Sacred Baobab Crown'
          }
        ]
      }
    ]
  },

  // CITY 32: VIENNA
  {
    id: 'vienna',
    name: 'Vienna',
    country: 'Austria',
    coordinates: [48.2082, 16.3738],
    zoom: 14,
    lessonTitle: 'Lesson 32: Inversion for Emphasis & Formal Writing',
    lessonGrammarRule: 'Inversion places auxiliary verbs before subjects for dramatic rhetorical impact: "Not only did he compose symphonies, but he also...", "Scarcely had the opera begun when...", and "Little did they realize how influential their music would be."',
    welcomeMessage: 'Willkommen in Wien (City 32/36)! Follow Mozart and Beethoven through imperial palaces while mastering rhetorical inversion and classical elegance!',
    landmarks: ['St. Stephen\'s Cathedral (Stephansdom)', 'Schönbrunn Palace', 'Hofburg Imperial Palace', 'Belvedere Palace'],
    stations: [
      {
        id: 'vie-stn-1',
        name: 'Stephansplatz U-Bahn Station',
        position: [48.2085, 16.3725],
        type: 'subway',
        lines: ['U1 Red Line', 'U3 Orange Line'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Historic cathedral square subway stop opening directly in front of the gothic spire.'
      },
      {
        id: 'vie-stn-2',
        name: 'Karlsplatz Transit Concourse',
        position: [48.2003, 16.3698],
        type: 'train',
        lines: ['U1', 'U2', 'U4', 'Vienna Ring Tram'],
        icon: '🚅',
        speedMultiplier: 4.8,
        description: 'Otto Wagner Art Nouveau pavilion connecting the State Opera and Musikverein.'
      },
      {
        id: 'vie-stn-3',
        name: 'Ringstraße Heritage Tram Stop',
        position: [48.2050, 16.3610],
        type: 'bus',
        lines: ['Tram Line 1', 'Tram Line 2', 'Vienna Ring Tram'],
        icon: '🚌',
        speedMultiplier: 2.3,
        description: 'Scenic yellow tram gliding around the grand imperial palaces and boulevard gardens.'
      }
    ],
    monsters: [
      {
        id: 'vie-1',
        name: 'WaltzSwan',
        type: 'Water',
        level: 57,
        hp: 3,
        maxHp: 3,
        position: [48.2125, 16.3770],
        streetName: 'Danube Canal Promenade / Schwedenplatz',
        spriteColor: '#0EA5E9',
        description: 'A graceful sapphire swan gliding in 3/4 time signature along the Blue Danube waters!',
        avatarIcon: '🦢',
        rarity: 'Common',
        auraColor: '#7DD3FC',
        lessonTopic: 'Inversion with "Not only... but also"',
        questions: [
          {
            id: 'vie-1-q1',
            category: 'grammar',
            questionText: 'Not only _____ Johann Strauss compose "The Blue Danube", but he also redefined European dance music.',
            hint: 'Negative/restrictive opener triggers auxiliary inversion: did + subject + base verb',
            options: ['did', 'was', 'does', 'has'],
            correctIndex: 0,
            explanation: '"Not only" at the beginning requires subject-verb inversion with past auxiliary: "Not only did Johann Strauss compose...".',
            moveName: 'Blue Danube Cadence'
          },
          {
            id: 'vie-1-q2',
            category: 'vocabulary',
            questionText: 'A graceful ballroom dance in triple time performed by couples turning in circles is a ______.',
            hint: 'German "walzen" (to revolve/roll): triple-meter ballroom dance ending in "-tz"',
            options: ['waltz', 'tango', 'samba', 'breakdance'],
            correctIndex: 0,
            explanation: 'The "waltz" is a ballroom dance in 3/4 time that became the quintessential musical symbol of 19th-century Vienna.',
            moveName: 'Swan Feather Ripple'
          },
          {
            id: 'vie-1-q3',
            category: 'reading',
            questionText: 'Vienna is known as the "City of Music" because more famous composers have lived here than in any other city. How did this dense artistic community spark brilliance?',
            hint: 'Creative minds inspired, competed with, and learned from one another in coffeehouses and concert halls',
            options: ['Mutual artistic inspiration, patronage, and musical dialogue pushed genius to new heights', 'No other city had pianos', 'Musicians were forbidden from traveling', 'Music was only played once a year'],
            correctIndex: 0,
            explanation: 'An ecosystem of supportive patrons, vibrant venues, and peer collaboration fueled Vienna\'s golden musical era.',
            moveName: 'Danube Crescendo'
          },
          {
            id: 'vie-1-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an elaborate classical musical composition for full orchestra?',
            hint: 'Greek "syn-" (together) + "phone" (sound): grand orchestral composition',
            options: ['symphony', 'sinphony', 'simphony', 'symphoney'],
            correctIndex: 0,
            explanation: '"Symphony" is spelled S-Y-M-P-H-O-N-Y.',
            moveName: 'Aquatic Waltz Spiral'
          }
        ]
      },
      {
        id: 'vie-2',
        name: 'MozartSpecter',
        type: 'Psychic',
        level: 58,
        hp: 3,
        maxHp: 3,
        position: [48.2088, 16.3695],
        streetName: 'Graben / Kohlmarkt Luxury Lane',
        spriteColor: '#8B5CF6',
        description: 'A powdered-wig maestro phantom conducting invisible string quartets beneath Baroque chandeliers!',
        avatarIcon: '🎻',
        rarity: 'Rare',
        auraColor: '#C084FC',
        lessonTopic: 'Inversion with "Scarcely / No sooner"',
        questions: [
          {
            id: 'vie-2-q1',
            category: 'grammar',
            questionText: 'Scarcely _____ the maestro raised his baton when the entire concert hall fell into breathless silence.',
            hint: 'Scarcely + had + subject + past participle',
            options: ['had', 'did', 'was', 'would'],
            correctIndex: 0,
            explanation: '"Scarcely had [subject] [verb-ed] when..." is the classical inverted construction for two closely sequential past events.',
            moveName: 'Magic Flute Sonata'
          },
          {
            id: 'vie-2-q2',
            category: 'vocabulary',
            questionText: 'A young child displaying exceptional musical or intellectual genius at an early age is a child ______.',
            hint: 'Latin "prodigium" (portent/marvel): young person endowed with exceptional genius',
            options: ['prodigy', 'veteran', 'apprentice', 'spectator'],
            correctIndex: 0,
            explanation: 'A "prodigy" is a person, especially a child, with exceptional abilities or qualities.',
            moveName: 'Chamber String Wave'
          },
          {
            id: 'vie-2-q3',
            category: 'reading',
            questionText: '"The music is not in the notes, but in the silence between." (Wolfgang Amadeus Mozart)\nWhat profound truth about listening and expression does Mozart teach us?',
            hint: 'Pacing, pauses, silence, and spacing are just as powerful as sounds and words',
            options: ['Rhythm, thoughtful pauses, and quiet spaces give power and meaning to words and music', 'Notes are not necessary', 'Never play instruments', 'Noise is always superior'],
            correctIndex: 0,
            explanation: 'Mozart observed that deliberate pauses and dynamic silence create tension, beauty, and emotional depth.',
            moveName: 'Amadeus Symphony Ray'
          },
          {
            id: 'vie-2-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a musical piece performed by four string instruments?',
            hint: 'Italian "quartetto": musical ensemble composed of four instruments or voices',
            options: ['quartet', 'quartette', 'quortet', 'quarteet'],
            correctIndex: 0,
            explanation: '"Quartet" is spelled Q-U-A-R-T-E-T.',
            moveName: 'Harmonic Spirit Strike'
          }
        ]
      },
      {
        id: 'vie-3',
        name: 'HabsburgGryphon',
        type: 'Fire',
        level: 59,
        hp: 3,
        maxHp: 3,
        position: [48.2057, 16.3638],
        streetName: 'Heldenplatz / Hofburg Imperial Palace',
        spriteColor: '#EF4444',
        description: 'A double-headed golden eagle-gryphon brandishing the imperial crown of centuries of European history!',
        avatarIcon: '🦅',
        rarity: 'Legendary',
        auraColor: '#F87171',
        lessonTopic: 'Inversion with "Little did they know"',
        questions: [
          {
            id: 'vie-3-q1',
            category: 'grammar',
            questionText: 'Little _____ the architects know that their grand Schönbrunn Palace would house over 1,400 ornate rooms.',
            hint: '"Little did + subject + base verb" expresses complete unawareness of a future outcome',
            options: ['did', 'had', 'were', 'have'],
            correctIndex: 0,
            explanation: '"Little did they know..." is a classic narrative inversion expressing that someone had no idea what was to come.',
            moveName: 'Imperial Scepter Blaze'
          },
          {
            id: 'vie-3-q2',
            category: 'vocabulary',
            questionText: 'A succession of rulers who belong to the same family line across generations is a ______.',
            hint: 'Greek "dynasteia" (hereditary power): imperial succession of ruling monarchs',
            options: ['dynasty', 'republic', 'cabinet', 'senate'],
            correctIndex: 0,
            explanation: 'A "dynasty" is a line of hereditary rulers of a country.',
            moveName: 'Hofburg Solar Talon'
          },
          {
            id: 'vie-3-q3',
            category: 'reading',
            questionText: 'Vienna\'s historic coffeehouse culture is officially recognized by UNESCO as Intangible Cultural Heritage. What makes a Viennese cafe unique?',
            hint: 'Patrons can buy one coffee and read newspapers, write, and converse for hours without being rushed',
            options: ['A welcoming space where one can sit, read newspapers, and converse for hours peacefully', 'You must leave within five minutes', 'No coffee is served', 'Computers are required'],
            correctIndex: 0,
            explanation: 'The Viennese coffeehouse is celebrated as an "oasis of time and conversation" where patrons linger unhurried.',
            moveName: 'Crown of Charlemagne Ray'
          },
          {
            id: 'vie-3-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an elaborate style of European architecture and art?',
            hint: 'Portuguese "barroco" (flawed pearl): ornate, grand European artistic era',
            options: ['baroque', 'barroque', 'barocque', 'baroke'],
            correctIndex: 0,
            explanation: '"Baroque" is spelled B-A-R-O-Q-U-E.',
            moveName: 'Heldenplatz Sovereign Flame'
          }
        ]
      }
    ]
  },

  // CITY 33: LIMA
  {
    id: 'lima',
    name: 'Lima',
    country: 'Peru',
    coordinates: [-12.0464, -77.0428],
    zoom: 14,
    lessonTitle: 'Lesson 33: Passive Voice in Academic & Journalistic Contexts',
    lessonGrammarRule: 'Advanced passive voice formats are essential in journalism and research: "It is believed that...", "The ancient temple is estimated to be 1,500 years old," and "Ceviche is widely considered one of the world\'s culinary masterpieces."',
    welcomeMessage: '¡Bienvenidos a Lima (City 33/36)! Stand on the coastal cliffs of Miraflores overlooking the roaring Pacific while mastering academic reporting passives!',
    landmarks: ['Plaza Mayor (Plaza de Armas)', 'Miraflores Malecón & Larcomar', 'Huaca Pucllana Adobe Pyramid', 'Barranco Arts District'],
    stations: [
      {
        id: 'lim-stn-1',
        name: 'Metropolitano Estación Central',
        position: [-12.0575, -77.0370],
        type: 'train',
        lines: ['Metropolitano BRT Trunk Line', 'Express Routes 1-4'],
        icon: '🚅',
        speedMultiplier: 4.8,
        description: 'Underground transit super-station beneath the Paseo de la República.'
      },
      {
        id: 'lim-stn-2',
        name: 'Miraflores Benavides Bus Concourse',
        position: [-12.1225, -77.0298],
        type: 'subway',
        lines: ['Metropolitano Miraflores Feeder', 'Avenida Larco Express'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Bustling transit stop in the heart of Miraflores shopping and coastal parks.'
      },
      {
        id: 'lim-stn-3',
        name: 'Larcomar Cliffside Taxi Stand',
        position: [-12.1320, -77.0305],
        type: 'taxi',
        lines: ['Malecón Coastal Cabs'],
        icon: '🚕',
        speedMultiplier: 2.6,
        description: 'Overlook cab stand perched on dramatic Pacific coastal sea cliffs.'
      }
    ],
    monsters: [
      {
        id: 'lim-1',
        name: 'LlamaSunstone',
        type: 'Electric',
        level: 60,
        hp: 3,
        maxHp: 3,
        position: [-12.1109, -77.0336],
        streetName: 'Huaca Pucllana Adobe Ruins Plaza',
        spriteColor: '#F59E0B',
        description: 'A regal Andean camelid bearing woven golden solar tapestries across ancient clay pyramid terraces!',
        avatarIcon: '🦙',
        rarity: 'Common',
        auraColor: '#FBBF24',
        lessonTopic: 'Personal vs Impersonal Passive ("It is reported that...")',
        questions: [
          {
            id: 'lim-1-q1',
            category: 'grammar',
            questionText: 'It _____ estimated that the adobe pyramid of Huaca Pucllana was constructed around 500 AD.',
            hint: 'Impersonal passive construction: "It is + past participle"',
            options: ['is', 'has', 'was been', 'does'],
            correctIndex: 0,
            explanation: '"It is estimated that..." is an impersonal passive construction widely used in academic history.',
            moveName: 'Andean Sunstone Flash'
          },
          {
            id: 'lim-1-q2',
            category: 'vocabulary',
            questionText: 'A sun-dried brick made of clay and straw used in ancient pre-Columbian architecture is ______.',
            hint: 'Arabic "al-ṭūb" (sun-dried mud brick) transmitted through Spanish',
            options: ['adobe', 'marble', 'granite', 'concrete'],
            correctIndex: 0,
            explanation: '"Adobe" is a building material made from earth, clay, and organic materials dried in the sun.',
            moveName: 'Clay Pyramid Shield'
          },
          {
            id: 'lim-1-q3',
            category: 'reading',
            questionText: 'Lima was nicknamed "The City of Kings" (La Ciudad de los Reyes) during the Spanish Viceroyalty. Why do modern travelers treasure it as a culinary capital today?',
            hint: 'Its fusion of Andean ingredients, Pacific seafood, and immigrant cultures created a world-renowned cuisine',
            options: ['Its extraordinary fusion of coastal seafood, Andean crops, and diverse immigrant culinary traditions', 'Only fast food is eaten', 'It has no restaurants', 'Food is imported from outer space'],
            correctIndex: 0,
            explanation: 'Lima is acclaimed as the gastronomic capital of South America, blending Indigenous, Spanish, Asian, and African flavors.',
            moveName: 'Sun Ray Stomp'
          },
          {
            id: 'lim-1-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a domesticated South American camelid prized for its soft wool?',
            hint: 'Quechua "llama": domesticated Andean camelid featuring doubled initial "ll"',
            options: ['llama', 'lama', 'liama', 'llamma'],
            correctIndex: 0,
            explanation: '"Llama" is spelled L-L-A-M-A.',
            moveName: 'Solar Wool Barrier'
          }
        ]
      },
      {
        id: 'lim-2',
        name: 'CondorSky',
        type: 'Wind',
        level: 61,
        hp: 3,
        maxHp: 3,
        position: [-12.1315, -77.0302],
        streetName: 'Malecón de Miraflores / Parque del Amor',
        spriteColor: '#6366F1',
        description: 'An immense Andean condor with a 3-meter wingspan soaring along coastal Pacific sea breezes!',
        avatarIcon: '🦅',
        rarity: 'Rare',
        auraColor: '#818CF8',
        lessonTopic: 'Subject-Raised Passive ("is said to be...")',
        questions: [
          {
            id: 'lim-2-q1',
            category: 'grammar',
            questionText: 'The Andean condor is said _____ one of the largest flying birds in the entire world.',
            hint: 'Subject-raised passive: is said + infinitive (to be)',
            options: ['to be', 'being', 'been', 'is'],
            correctIndex: 0,
            explanation: 'In academic English, subject-raised passives take an infinitive: "The bird is said to be...".',
            moveName: 'Pacific Cliff Updraft'
          },
          {
            id: 'lim-2-q2',
            category: 'vocabulary',
            questionText: 'A coastal park and sculpture in Miraflores celebrating romance and couples by the sea is the Parque del ______.',
            hint: 'Latin root for love and profound affectionate devotion',
            options: ['Amor', 'Sol', 'Mar', 'Viento'],
            correctIndex: 0,
            explanation: 'The famous park overlooking the Pacific in Miraflores is "Parque del Amor" (Love Park).',
            moveName: 'Condor Coastal Dive'
          },
          {
            id: 'lim-2-q3',
            category: 'reading',
            questionText: 'The Andean Condor can soar for hours without flapping its wings once by riding warm rising air currents (thermals). What principle of aerodynamics does this teach?',
            hint: 'Working efficiently with natural forces conserves immense energy',
            options: ['Harnessing natural energy and atmospheric currents achieves effortless, enduring flight', 'Flapping frantically is always best', 'Heavy birds cannot fly', 'Wind is useless'],
            correctIndex: 0,
            explanation: 'Soaring efficiently along thermals allows massive raptors to traverse hundreds of miles using minimal energy.',
            moveName: 'Thermal Wingspan Glide'
          },
          {
            id: 'lim-2-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for the broad coastal ocean that borders Peru?',
            hint: 'Latin "pax" (peace): the vast tranquil ocean christened by Ferdinand Magellan',
            options: ['Pacific', 'Pasific', 'Pazific', 'Pacyfic'],
            correctIndex: 0,
            explanation: '"Pacific" is spelled P-A-C-I-F-I-C.',
            moveName: 'Miraflores Breeze Crest'
          }
        ]
      },
      {
        id: 'lim-3',
        name: 'IncaCitadel',
        type: 'Grass',
        level: 62,
        hp: 3,
        maxHp: 3,
        position: [-12.0453, -77.0311],
        streetName: 'Plaza Mayor / Government Palace Arcades',
        spriteColor: '#10B981',
        description: 'A colossal carved stone titan fitting seamless mortarless megaliths with earthquake-proof perfection!',
        avatarIcon: '🏛️',
        rarity: 'Legendary',
        auraColor: '#34D399',
        lessonTopic: 'Passive Voice with Reporting Verbs in the Past',
        questions: [
          {
            id: 'lim-3-q1',
            category: 'grammar',
            questionText: 'Centuries ago, it was widely believed that the Inca Empire _____ interconnected by over 40,000 kilometers of paved roads.',
            hint: 'Past reporting passive: was believed that it was...',
            options: ['was', 'is', 'has been', 'would'],
            correctIndex: 0,
            explanation: 'When the reporting verb is in the past ("it was believed"), the following clause also uses a past tense.',
            moveName: 'Megalithic Stone Lock'
          },
          {
            id: 'lim-3-q2',
            category: 'vocabulary',
            questionText: 'A massive carved stone block used in ancient construction without mortar is a ______.',
            hint: 'Greek "megas" (large) + "lithos" (stone): prehistoric monumental standing stone',
            options: ['megalith', 'brick', 'tile', 'shingle'],
            correctIndex: 0,
            explanation: 'A "megalith" is a very large stone that forms a prehistoric monument or part of an ancient stone structure.',
            moveName: 'Earthquake-Proof Wall'
          },
          {
            id: 'lim-3-q3',
            category: 'reading',
            questionText: 'Inca stone masonry is so precise that not even a razor blade can fit between the interlocking granite stones. How did this design survive massive earthquakes?',
            hint: 'The stones can shake and dance slightly during seismic tremors before settling back into place',
            options: ['Interlocking stones absorb seismic vibrations and settle back safely without cracking', 'They used modern glue', 'Earthquakes never happen in Peru', 'The stones are made of soft plastic'],
            correctIndex: 0,
            explanation: 'Inca architectural genius allowed stones to shift and absorb seismic waves, preventing collapse.',
            moveName: 'Citadel Golden Shock'
          },
          {
            id: 'lim-3-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an ancient fortress protecting a city or kingdom?',
            hint: 'Italian "cittadella" (little city): fortress commanding and defending a metropolis',
            options: ['citadel', 'citidale', 'cittadel', 'sitedel'],
            correctIndex: 0,
            explanation: '"Citadel" is spelled C-I-T-A-D-E-L.',
            moveName: 'Plaza Mayor Imperial Ward'
          }
        ]
      }
    ]
  },

  // CITY 34: AUCKLAND
  {
    id: 'auckland',
    name: 'Auckland',
    country: 'New Zealand',
    coordinates: [-36.8485, 174.7633],
    zoom: 14,
    lessonTitle: 'Lesson 34: Advanced Relative Clauses & Participle Clauses',
    lessonGrammarRule: 'Participle clauses streamline sentences with sophistication: "Standing atop the Sky Tower, we gazed at two oceans" (active participle replacing "While we stood..."), and "Carved from native kauri wood, the war canoe gleamed" (passive participle replacing "Which was carved...").',
    welcomeMessage: 'Kia Ora! Welcome to Auckland (City 34/36)! Known as the "City of Sails," explore volcanic cones and sparkling harbours while mastering participle clauses!',
    landmarks: ['Sky Tower', 'Viaduct Harbour', 'Mount Eden (Maungawhau)', 'Auckland Domain'],
    stations: [
      {
        id: 'akl-stn-1',
        name: 'Britomart Transport Centre',
        position: [-36.8442, 174.7680],
        type: 'train',
        lines: ['Eastern Line', 'Southern Line', 'Western Line', 'Onehunga Line'],
        icon: '🚅',
        speedMultiplier: 5.0,
        description: 'Historic heritage chief post office transformed into Auckland underground rail terminal.'
      },
      {
        id: 'akl-stn-2',
        name: 'Waitematā Downtown Ferry Terminal',
        position: [-36.8428, 174.7675],
        type: 'subway',
        lines: ['Devonport Ferry', 'Waiheke Island Line', 'Rangitoto Island Line'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Major harbour passenger terminal whisking sailors across Hauraki Gulf waters.'
      },
      {
        id: 'akl-stn-3',
        name: 'SkyCity Bus & Coach Terminal',
        position: [-36.8480, 174.7618],
        type: 'bus',
        lines: ['InnerLink Bus', 'CityLink Bus', 'InterCity Coaches'],
        icon: '🚌',
        speedMultiplier: 2.5,
        description: 'Direct central coach station located immediately below the soaring 328-meter Sky Tower.'
      }
    ],
    monsters: [
      {
        id: 'akl-1',
        name: 'KiwiRanger',
        type: 'Grass',
        level: 63,
        hp: 3,
        maxHp: 3,
        position: [-36.8596, 174.7758],
        streetName: 'Auckland Domain Wintergardens Walk',
        spriteColor: '#10B981',
        description: 'A swift, nocturnal forest protector with sensitive whiskers and deep love for ancient silver ferns!',
        avatarIcon: '🥝',
        rarity: 'Common',
        auraColor: '#34D399',
        lessonTopic: 'Present Participle Clauses (Action at Same Time)',
        questions: [
          {
            id: 'akl-1-q1',
            category: 'grammar',
            questionText: '_____ quietly through the damp native bush, the kiwi searched for worms with its long beak.',
            hint: 'Present participle clause (-ing) indicating simultaneous action: Foraging',
            options: ['Foraging', 'Foraged', 'Having foraged', 'To forage'],
            correctIndex: 0,
            explanation: 'We use the present participle ("Foraging quietly...") to describe an action occurring at the same time as the main verb.',
            moveName: 'Silver Fern Whiskers'
          },
          {
            id: 'akl-1-q2',
            category: 'vocabulary',
            questionText: 'The traditional Māori greeting meaning "Be well / Wishing you life and health" is ______.',
            hint: 'Focus on semantic morphology, roots, and standard orthographic rules',
            options: ['Kia Ora', 'Aloha', 'Jambo', 'Namaste'],
            correctIndex: 0,
            explanation: '"Kia Ora" is the iconic Māori greeting of New Zealand, meaning "Be well" or "Good health".',
            moveName: 'Native Bush Rustle'
          },
          {
            id: 'akl-1-q3',
            category: 'reading',
            questionText: 'New Zealand is one of the few places on Earth where native birds evolved without ground mammals for millions of years. Why did birds like the kiwi lose the ability to fly?',
            hint: 'With no ground predators, they had no need to fly and found ample food on forest floors',
            options: ['Because there were no native ground mammalian predators, so wings were not needed for escape', 'Because the sky was too windy', 'They forgot how to fly overnight', 'Flying was forbidden'],
            correctIndex: 0,
            explanation: 'Isolated island evolution without land mammals allowed several bird species to become flightless ground foragers.',
            moveName: 'Domain Flora Surge'
          },
          {
            id: 'akl-1-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an iconic flightless bird native to New Zealand?',
            hint: 'Māori onomatopoeic name for the endemic flightless bird and national symbol',
            options: ['kiwi', 'kewi', 'keewee', 'kywi'],
            correctIndex: 0,
            explanation: '"Kiwi" is spelled K-I-W-I.',
            moveName: 'Beak Ground Tap'
          }
        ]
      },
      {
        id: 'akl-2',
        name: 'MoaGiant',
        type: 'Wind',
        level: 64,
        hp: 3,
        maxHp: 3,
        position: [-36.8775, 174.7645],
        streetName: 'Mount Eden Crater Rim Path',
        spriteColor: '#6366F1',
        description: 'A 3.6-meter-tall prehistoric avian titan roaming the grassy dormant volcanic crater of Maungawhau!',
        avatarIcon: '🦤',
        rarity: 'Rare',
        auraColor: '#818CF8',
        lessonTopic: 'Past Participle Clauses (Passive Meaning)',
        questions: [
          {
            id: 'akl-2-q1',
            category: 'grammar',
            questionText: '_____ over thousands of years by volcanic eruptions, Auckland\'s landscape features 53 volcanic cones.',
            hint: 'Passive participle clause (-ed) replacing "Which was formed": Formed',
            options: ['Formed', 'Forming', 'Having formed', 'Form'],
            correctIndex: 0,
            explanation: 'We use past participle clauses ("Formed over thousands of years...") to express a passive background condition.',
            moveName: 'Crater Shockwave'
          },
          {
            id: 'akl-2-q2',
            category: 'vocabulary',
            questionText: 'A volcano that is currently inactive and sleeping, but capable of erupting in the distant future, is ______.',
            hint: 'Latin "dormire" (to sleep): volcano resting in temporary inactivity',
            options: ['dormant', 'extinct', 'erupting', 'submerged'],
            correctIndex: 0,
            explanation: 'A "dormant" volcano is one that is not actively erupting but is still capable of doing so.',
            moveName: 'Maungawhau Earth Tremor'
          },
          {
            id: 'akl-2-q3',
            category: 'reading',
            questionText: 'Why is Auckland affectionately nicknamed the "City of Sails"?',
            hint: 'It has more boats and yachts per capita than almost any other city in the world',
            options: ['It possesses more yachts and sailing boats per person than almost any other world metropolis', 'It only sells fabrics', 'The buildings look like sails', 'All cars have sails'],
            correctIndex: 0,
            explanation: 'With two harbours (Waitematā and Manukau), Aucklanders have a passionate maritime culture with thousands of boats.',
            moveName: 'Gale Over Viaduct'
          },
          {
            id: 'akl-2-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an immense body of sheltered water for boats to anchor?',
            hint: 'Late Old English "herebeorg" (shelter): sheltered nautical anchorage',
            options: ['harbour', 'harber', 'harbur', 'harbore'],
            correctIndex: 0,
            explanation: '"Harbour" (or harbor) is spelled H-A-R-B-O-U-R.',
            moveName: 'Giant Avian Stride'
          }
        ]
      },
      {
        id: 'akl-3',
        name: 'KauriDryad',
        type: 'Dragon',
        level: 65,
        hp: 3,
        maxHp: 3,
        position: [-36.8484, 174.7622],
        streetName: 'Sky Tower Observation Deck',
        spriteColor: '#0EA5E9',
        description: 'The ancient guardian of New Zealand\'s 2,000-year-old kauri trees standing atop the 328m Sky Tower!',
        avatarIcon: '🌲',
        rarity: 'Legendary',
        auraColor: '#7DD3FC',
        lessonTopic: 'Perfect Participle Clauses ("Having achieved...")',
        questions: [
          {
            id: 'akl-3-q1',
            category: 'grammar',
            questionText: '_____ the summit of the Sky Tower, the adventurers could see both the Pacific Ocean and Tasman Sea.',
            hint: 'Action completed before the second action: Having + past participle',
            options: ['Having reached', 'Reaching', 'Reached', 'To have reached'],
            correctIndex: 0,
            explanation: 'We use the perfect participle ("Having reached...") to show that the first action was completed before the main action occurred.',
            moveName: 'Sky Tower Needle Flash'
          },
          {
            id: 'akl-3-q2',
            category: 'vocabulary',
            questionText: 'The colossal native New Zealand tree known as "Lord of the Forest" (Tāne Mahuta) is a ______ tree.',
            hint: 'Focus on semantic morphology, roots, and standard orthographic rules',
            options: ['kauri', 'palm', 'birch', 'maple'],
            correctIndex: 0,
            explanation: 'The "kauri" (Agathis australis) is among the most ancient and massive trees on Earth.',
            moveName: 'Tāne Mahuta Resin Ward'
          },
          {
            id: 'akl-3-q3',
            category: 'reading',
            questionText: 'From the narrow isthmus of Auckland, you can see two different oceans (the Pacific on the east and the Tasman on the west) separated by just a few kilometers. What unique maritime advantage does this create?',
            hint: 'Access to two contrasting marine ecosystems and harbours on opposite sides of the island',
            options: ['Immediate access to two distinct oceanic waterways, trade routes, and marine climates', 'Water is only on one side', 'No ships can enter', 'Tides never change'],
            correctIndex: 0,
            explanation: 'Auckland’s isthmus gives it a rare dual-coastline geography connecting two major oceans.',
            moveName: 'Two Oceans Horizon Beam'
          },
          {
            id: 'akl-3-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a narrow strip of land connecting two larger land areas across water?',
            hint: 'Greek "isthmos": narrow strip of land flanked by water connecting two larger landmasses',
            options: ['isthmus', 'isthmis', 'isthmas', 'ismuth'],
            correctIndex: 0,
            explanation: '"Isthmus" is spelled I-S-T-H-M-U-S.',
            moveName: 'Aotearoa Sovereign Crown'
          }
        ]
      }
    ]
  },

  // CITY 35: TAIPEI
  {
    id: 'taipei',
    name: 'Taipei',
    country: 'Taiwan',
    coordinates: [25.0330, 121.5654],
    zoom: 14,
    lessonTitle: 'Lesson 35: Modal Verbs of Deduction & Speculation',
    lessonGrammarRule: 'Past and present modal deductions evaluate certainty: "must have been" (high certainty in past), "can\'t have happened" (impossible in past), and "might/could have been" (possible in past). In the present, use "must be / can\'t be".',
    welcomeMessage: 'Welcome to Taipei (City 35/36)! Stand before the bamboo-shaped Taipei 101 tower and taste sizzling night market delicacies while mastering modals of deduction!',
    landmarks: ['Taipei 101', 'Elephant Mountain (Xiangshan)', 'Shilin Night Market', 'Chiang Kai-shek Memorial Hall'],
    stations: [
      {
        id: 'tpe-stn-1',
        name: 'MRT Taipei 101 / World Trade Center',
        position: [25.0330, 121.5638],
        type: 'subway',
        lines: ['Red Line (Tamsui-Xinyi Line)'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Direct metro terminal leading into the ground concourse of Taipei 101.'
      },
      {
        id: 'tpe-stn-2',
        name: 'Taipei Main High-Speed Rail Hub',
        position: [25.0478, 121.5170],
        type: 'train',
        lines: ['Taiwan High Speed Rail (THSR)', 'TRA Western Main Line', 'Bannan Blue Line', 'Airport Express'],
        icon: '🚅',
        speedMultiplier: 5.0,
        description: 'Pulsing central transit terminal with 300 km/h bullet trains racing along the western coast.'
      },
      {
        id: 'tpe-stn-3',
        name: 'Jiantan Shilin Night Market Station',
        position: [25.0845, 121.5250],
        type: 'bus',
        lines: ['Red Line Jiantan', 'Night Market Express Bus'],
        icon: '🚌',
        speedMultiplier: 2.6,
        description: 'Iconic dragon-boat architectural station opening directly into Shilin night market.'
      }
    ],
    monsters: [
      {
        id: 'tpe-1',
        name: 'BobaBear',
        type: 'Water',
        level: 66,
        hp: 3,
        maxHp: 3,
        position: [25.0880, 121.5245],
        streetName: 'Shilin Night Market / Wenlin Road',
        spriteColor: '#0EA5E9',
        description: 'A jolly Formosan black bear with a white chest crescent balancing giant cups of sweet boba milk tea!',
        avatarIcon: '🧋',
        rarity: 'Common',
        auraColor: '#38BDF8',
        lessonTopic: 'Present Modals of Deduction (Must be, Can\'t be)',
        questions: [
          {
            id: 'tpe-1-q1',
            category: 'grammar',
            questionText: 'Look at the massive line stretching two blocks around that night market stall! The food _____ delicious.',
            hint: 'Strong logical certainty in the present: must be',
            options: ['must be', 'can\'t be', 'would be not', 'shall be'],
            correctIndex: 0,
            explanation: 'We use "must be" when we are logically certain about something based on clear present evidence (the huge line).',
            moveName: 'Tapioca Bubble Splash'
          },
          {
            id: 'tpe-1-q2',
            category: 'vocabulary',
            questionText: 'A famous Taiwanese tea-based beverage containing chewy tapioca pearls is ______ tea.',
            hint: 'Effervescent sphere: spelled with doubled bilabial "bb"',
            options: ['bubble', 'mineral', 'carbonated', 'sour'],
            correctIndex: 0,
            explanation: '"Bubble tea" (or boba tea) was invented in Taiwan in the 1980s and is loved globally.',
            moveName: 'Brown Sugar Swirl'
          },
          {
            id: 'tpe-1-q3',
            category: 'reading',
            questionText: 'Taiwanese night markets are world-famous for their bustling hospitality, sizzling food stalls, and community energy. What does this culture reveal about local values?',
            hint: 'Warm social gatherings, sharing meals, and vibrant community life after dark',
            options: ['Shared culinary joy, warm hospitality, and lively multigenerational community gatherings', 'People only eat alone', 'Cooking at home is banned', 'Markets close at noon'],
            correctIndex: 0,
            explanation: 'Night markets are central to Taiwanese social life, offering affordable street delicacies and joyful community connection.',
            moveName: 'Formosan Bear Hug'
          },
          {
            id: 'tpe-1-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for the chewy starch balls in bubble tea?',
            hint: 'Tupi "typyóka": starch extracted from cassava root',
            options: ['tapioca', 'tapioka', 'tapeoca', 'tapiocca'],
            correctIndex: 0,
            explanation: '"Tapioca" is spelled T-A-P-I-O-C-A.',
            moveName: 'Sweet Tea Wave'
          }
        ]
      },
      {
        id: 'tpe-2',
        name: 'LanternMoth',
        type: 'Fire',
        level: 67,
        hp: 3,
        maxHp: 3,
        position: [25.0345, 121.5218],
        streetName: 'Chiang Kai-shek Memorial Hall Plaza',
        spriteColor: '#F97316',
        description: 'A radiant fiery celestial moth glowing like a sky lantern over white marble memorial gates!',
        avatarIcon: '🏮',
        rarity: 'Rare',
        auraColor: '#FB923C',
        lessonTopic: 'Past Modals of Deduction (Must have been, Can\'t have been)',
        questions: [
          {
            id: 'tpe-2-q1',
            category: 'grammar',
            questionText: 'The ancient calligraphy scroll was completed with master precision; it _____ created by a novice.',
            hint: 'Past logical impossibility: can\'t have been (or couldn\'t have been)',
            options: ['can\'t have been', 'must have been', 'might have been', 'should have been'],
            correctIndex: 0,
            explanation: 'We use "can\'t have been" to express that something was logically impossible in the past.',
            moveName: 'Sky Lantern Glow'
          },
          {
            id: 'tpe-2-q2',
            category: 'vocabulary',
            questionText: 'The art of beautiful decorative handwriting or lettering with brush and ink is called ______.',
            hint: 'Greek "kallos" (beauty) + "graphein" (writing): decorative fine lettering',
            options: ['calligraphy', 'sculpture', 'stenography', 'cartography'],
            correctIndex: 0,
            explanation: '"Calligraphy" is decorative handwriting or handwritten lettering produced with a pen or brush.',
            moveName: 'Ink Brush Flare'
          },
          {
            id: 'tpe-2-q3',
            category: 'reading',
            questionText: 'During the Pingxi Sky Lantern Festival, people write their heartfelt hopes and dreams on paper lanterns before releasing them to the night sky. What does this tradition symbolize?',
            hint: 'Sending hopes, peace, and positive aspirations up toward heaven',
            options: ['Sending prayers, dreams, and hopes for peace and prosperity into the universe', 'Throwing garbage away', 'Scaring away birds', 'Making planes crash'],
            correctIndex: 0,
            explanation: 'Releasing sky lanterns symbolizes letting go of past burdens and sending positive wishes to the heavens.',
            moveName: 'Celestial Paper Flame'
          },
          {
            id: 'tpe-2-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a paper or metal casing enclosing a light?',
            hint: 'Greek "lampter" (torch): portable luminary housing a flame or bulb',
            options: ['lantern', 'lanturn', 'lanterne', 'lanterin'],
            correctIndex: 0,
            explanation: '"Lantern" is spelled L-A-N-T-E-R-N.',
            moveName: 'Memorial Arch Halo'
          }
        ]
      },
      {
        id: 'tpe-3',
        name: 'JadeDragon',
        type: 'Dragon',
        level: 68,
        hp: 3,
        maxHp: 3,
        position: [25.0339, 121.5644],
        streetName: 'Xinyi Road / Taipei 101 Base',
        spriteColor: '#10B981',
        description: 'A 508-meter-tall bamboo-structured dragon coiling around the steel damper sphere of Taipei 101!',
        avatarIcon: '🐉',
        rarity: 'Legendary',
        auraColor: '#34D399',
        lessonTopic: 'Speculation with "Might have / Could have"',
        questions: [
          {
            id: 'tpe-3-q1',
            category: 'grammar',
            questionText: 'Without the massive 660-tonne tuned mass damper inside Taipei 101, the tower _____ during the typhoon.',
            hint: 'Past speculation/hypothetical capability: could have swayed dangerously',
            options: ['could have swayed', 'must sway', 'should sway', 'can sway'],
            correctIndex: 0,
            explanation: 'We use "could have swayed" (or "might have swayed") to speculate on a past possibility that was avoided.',
            moveName: 'Tuned Damper Equilibrium'
          },
          {
            id: 'tpe-3-q2',
            category: 'vocabulary',
            questionText: 'A tropical cyclone or intense storm with violent winds occurring in the western Pacific Ocean is a ______.',
            hint: 'Cantonese "tai fung" (great wind) / Greek "Typhon": intense tropical cyclone',
            options: ['typhoon', 'blizzard', 'avalanche', 'sandstorm'],
            correctIndex: 0,
            explanation: 'A "typhoon" is a mature tropical cyclone that develops in the northwestern Pacific Basin.',
            moveName: 'Bamboo Spire Strike'
          },
          {
            id: 'tpe-3-q3',
            category: 'reading',
            questionText: 'Taipei 101 was designed to resemble a growing stalk of bamboo with eight tiered segments (a lucky number). What does bamboo symbolize in East Asian culture?',
            hint: 'Flexibility, inner strength, resilience, and bending without breaking during storms',
            options: ['Flexibility, moral integrity, resilience, and bending gracefully without breaking in storms', 'Fragility and weakness', 'Wood for fires only', 'Inflexibility'],
            correctIndex: 0,
            explanation: 'Bamboo symbolizes virtue and resilience: it bends with fierce winds without snapping.',
            moveName: 'Jade Sovereign Breath'
          },
          {
            id: 'tpe-3-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a valuable green mineral prized in fine jewelry and carving?',
            hint: 'Spanish "piedra de ijada": ornamental imperial nephrite or jadeite gemstone',
            options: ['jade', 'jayd', 'jayde', 'jaide'],
            correctIndex: 0,
            explanation: '"Jade" is spelled J-A-D-E.',
            moveName: 'Taipei 101 Master Crown'
          }
        ]
      }
    ]
  },

  // CITY 36: PRAGUE
  {
    id: 'prague',
    name: 'Prague',
    country: 'Czech Republic',
    coordinates: [50.0755, 14.4378],
    zoom: 14,
    lessonTitle: 'Lesson 36: Metaphors, Advanced Idioms & Literary Devices',
    lessonGrammarRule: 'The summit of English mastery embraces figurative language: metaphors ("Time is a river"), personification ("The clock whispered secrets"), hyperbole, symbolism, and deep idiomatic fluency across creative writing.',
    welcomeMessage: 'Vítejte v Praze (City 36/36 - GRAND FINALE)! Stand on Charles Bridge amid Gothic statues and the 600-year-old Astronomical Clock as you achieve complete World Quest mastery!',
    landmarks: ['Charles Bridge (Karlův most)', 'Astronomical Clock (Orloj)', 'Prague Castle (Pražský hrad)', 'St. Vitus Cathedral'],
    stations: [
      {
        id: 'prg-stn-1',
        name: 'Staroměstská Metro Station',
        position: [50.0882, 14.4172],
        type: 'subway',
        lines: ['Metro Line A (Green)'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Deep underground station steps away from Charles Bridge and Old Town Square.'
      },
      {
        id: 'prg-stn-2',
        name: 'Malostranská Historic Transit Hub',
        position: [50.0910, 14.4075],
        type: 'train',
        lines: ['Metro Line A', 'Tram 22 Castle Line'],
        icon: '🚅',
        speedMultiplier: 4.8,
        description: 'Riverside tram and metro terminal ascending the cobblestones to Prague Castle.'
      },
      {
        id: 'prg-stn-3',
        name: 'Hlavní Nádraží Art Nouveau Central Station',
        position: [50.0831, 14.4352],
        type: 'bus',
        lines: ['EuroCity Trains', 'Airport Express Bus Line'],
        icon: '🚌',
        speedMultiplier: 2.5,
        description: 'Grand historical domed railway palace linking Prague to all European capitals.'
      }
    ],
    monsters: [
      {
        id: 'prg-1',
        name: 'AstronomerOwl',
        type: 'Psychic',
        level: 69,
        hp: 3,
        maxHp: 3,
        position: [50.0870, 14.4207],
        streetName: 'Old Town Square / Astronomical Clock (Orloj)',
        spriteColor: '#8B5CF6',
        description: 'A wise brass-feathered owl turning celestial clockwork gears dating back to the year 1410!',
        avatarIcon: '🦉',
        rarity: 'Common',
        auraColor: '#C084FC',
        lessonTopic: 'Personification & Literary Metaphors',
        questions: [
          {
            id: 'prg-1-q1',
            category: 'grammar',
            questionText: '"The ancient astronomical clock watched over generations of citizens with its patient eyes." Which literary device is used here?',
            hint: 'Giving human traits (patient eyes, watching) to an inanimate clock',
            options: ['personification', 'alliteration', 'hyperbole', 'onomatopoeia'],
            correctIndex: 0,
            explanation: '"Personification" gives human attributes, actions, or emotions to non-human objects or abstract ideas.',
            moveName: 'Orloj Celestial Gear'
          },
          {
            id: 'prg-1-q2',
            category: 'vocabulary',
            questionText: 'A medieval clock that displays astronomical information like the relative positions of the sun, moon, and zodiac is an ______ clock.',
            hint: 'Greek "astron" (star) + "nomos" (law): relating to celestial cosmic science',
            options: ['astronomical', 'atomic', 'hourglass', 'sundial'],
            correctIndex: 0,
            explanation: 'The Prague "Astronomical Clock" (Orloj) has mounted mechanical astrolabes and zodiac dials.',
            moveName: 'Zodiac Clockwork Turn'
          },
          {
            id: 'prg-1-q3',
            category: 'reading',
            questionText: '"Time flies like an arrow; fruit flies like a banana." (Groucho Marx)\nWhat clever linguistic play makes this quote famous?',
            hint: 'The word "flies" shifts from a verb (moving quickly) to a noun (fruit insects)',
            options: ['A pun shifting the word "flies" from a verb of speed to a noun of insects', 'Both sentences mean the exact same thing', 'Arrows are made of fruit', 'Clocks are edible'],
            correctIndex: 0,
            explanation: 'This celebrated syntactic pun shows how English grammar shifts meaning depending on word parts of speech.',
            moveName: 'Dial of the Centuries'
          },
          {
            id: 'prg-1-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for the branch of science that studies celestial stars and planets?',
            hint: 'Scientific observational study of extraterrestrial celestial bodies and space',
            options: ['astronomy', 'astronomyy', 'astronamy', 'astronimy'],
            correctIndex: 0,
            explanation: '"Astronomy" is spelled A-S-T-R-O-N-O-M-Y.',
            moveName: 'Cosmic Astrolabe Ray'
          }
        ]
      },
      {
        id: 'prg-2',
        name: 'BohemianGargoyle',
        type: 'Wind',
        level: 70,
        hp: 3,
        maxHp: 3,
        position: [50.0865, 14.4114],
        streetName: 'Charles Bridge Western Bridge Tower',
        spriteColor: '#6366F1',
        description: 'A stone-winged Gothic gargoyle perched above thirty baroque saint statues along the Vltava River!',
        avatarIcon: '🗿',
        rarity: 'Rare',
        auraColor: '#818CF8',
        lessonTopic: 'Idiomatic Expressions & Figurative Fluency',
        questions: [
          {
            id: 'prg-2-q1',
            category: 'grammar',
            questionText: '"After months of hard study, she finally crossed that bridge when she came to it." What does this idiom mean?',
            hint: 'Deal with a problem only when it actually arrives rather than worrying prematurely',
            options: ['Handle a challenge when you encounter it rather than worrying beforehand', 'Build a real bridge over a river', 'Avoid walking across bridges', 'Give up on studying'],
            correctIndex: 0,
            explanation: '"Cross that bridge when you come to it" means to address a potential issue only when it actually happens.',
            moveName: 'Gothic Stone Gust'
          },
          {
            id: 'prg-2-q2',
            category: 'vocabulary',
            questionText: 'A carved stone grotesque figure with a spout designed to convey water from a roof away from buildings is a ______.',
            hint: 'Old French "gargouille" (throat): carved stone grotesque waterspout',
            options: ['gargoyle', 'obelisk', 'column', 'mosaic'],
            correctIndex: 0,
            explanation: 'A "gargoyle" is a carved human or animal grotesque projection designed to carry rainwater away.',
            moveName: 'Vltava River Mists'
          },
          {
            id: 'prg-2-q3',
            category: 'reading',
            questionText: 'Prague is known as "The City of a Hundred Spires" (and "The Golden City"). What feeling does its preserved Gothic and Baroque skyline evoke?',
            hint: 'A timeless fairytale sense of history, literature, and architectural grandeur',
            options: ['A fairytale atmosphere of preserved centuries, literary mystery, and architectural wonder', 'A city with no buildings', 'A modern factory complex', 'An abandoned valley'],
            correctIndex: 0,
            explanation: 'Prague\'s skyline features hundreds of ornate spires, towers, and domes dating back to the Middle Ages.',
            moveName: 'Spire Silhouette Shield'
          },
          {
            id: 'prg-2-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an ancient arched stone structure carrying a road across water?',
            hint: 'Civil engineering span crossing physical obstacles: ends with soft "-dge"',
            options: ['bridge', 'brydge', 'brij', 'bridg'],
            correctIndex: 0,
            explanation: '"Bridge" is spelled B-R-I-D-G-E.',
            moveName: 'Charles Bridge Ward'
          }
        ]
      },
      {
        id: 'prg-3',
        name: 'GolemOfPrague',
        type: 'Fire',
        level: 75,
        hp: 4,
        maxHp: 4,
        position: [50.0911, 14.4018],
        streetName: 'Prague Castle Golden Lane / St. Vitus Cathedral',
        spriteColor: '#EF4444',
        description: 'THE SUPREME ROAD MONSTER SOVEREIGN OF WORLD QUEST! A legendary clay titan awakened by the mystic Hebrew word "EMET" (Truth)!',
        avatarIcon: '👑',
        rarity: 'Legendary',
        auraColor: '#F87171',
        lessonTopic: 'Master Synthesis: The Power of Words & Language',
        questions: [
          {
            id: 'prg-3-q1',
            category: 'reading',
            questionText: 'According to the historic legend of Prague, Rabbi Judah Loew created the Golem from Vltava river clay and animated it by writing the Hebrew word for "TRUTH" (Emet) on its forehead. What does this legend teach about the power of language?',
            hint: 'Words have the immense power to animate, create, protect, and transform reality',
            options: ['Words and truth possess the profound creative power to protect communities and shape reality', 'Clay is only good for making pots', 'Words have no real influence', 'Magic words solve homework'],
            correctIndex: 0,
            explanation: 'The Golem story is a profound metaphor for language itself: words give life, shape society, and possess great responsibility.',
            moveName: 'Word of Truth (Emet) Awakening'
          },
          {
            id: 'prg-3-q2',
            category: 'grammar',
            questionText: 'Having completed all 36 world cities, the young scholar realized that language _____ not merely a subject to be tested, but a bridge to all humankind.',
            hint: 'Reflecting a timeless universal truth in noun clause: was/is',
            options: ['is', 'are', 'being', 'had been'],
            correctIndex: 0,
            explanation: 'When expressing an enduring, universal truth ("language is a bridge to all humankind"), the present tense "is" remains valid.',
            moveName: 'Mighty Clay Fists of Prague'
          },
          {
            id: 'prg-3-q3',
            category: 'vocabulary',
            questionText: 'The medieval pursuit aimed at transforming base metals into gold and discovering universal cures was ______.',
            hint: 'Arabic "al-kīmiyā": medieval proto-chemical pursuit of universal transmutations (historic in Golden Lane)',
            options: ['alchemy', 'astronomy', 'meteorology', 'geology'],
            correctIndex: 0,
            explanation: '"Alchemy" was the medieval forerunner of chemistry, practiced by scholars and emperors in Prague\'s Golden Lane.',
            moveName: 'Philosopher\'s Golden Flame'
          },
          {
            id: 'prg-3-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for complete and supreme command over a language or skill?',
            hint: 'Old French "maistrie": consummate proficiency and deep erudite expertise',
            options: ['mastery', 'masterey', 'mastary', 'masterry'],
            correctIndex: 0,
            explanation: '"Mastery" is spelled M-A-S-T-E-R-Y.',
            moveName: 'Supreme Grand Master Crown'
          }
        ]
      }
    ]
  }
];
