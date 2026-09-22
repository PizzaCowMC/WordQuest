import { CityData, TransitStation } from '../types';

export const EXPANDED_CITIES_13_TO_26: CityData[] = [
  // CITY 13: TORONTO, CANADA
  {
    id: 'toronto',
    name: 'Toronto',
    country: 'Canada',
    coordinates: [43.6532, -79.3832],
    zoom: 14,
    lessonTitle: 'Lesson 13: Gerunds vs Infinitives',
    lessonGrammarRule: 'Certain verbs take gerunds (enjoy swimming, avoid making) while others take infinitives (decide to go, hope to see).',
    welcomeMessage: 'Welcome to Toronto (City 13/26)! Master gerunds and infinitives beneath the soaring CN Tower and Lake Ontario shoreline.',
    landmarks: ['CN Tower', 'Nathan Phillips Square', 'St. Lawrence Market', 'Ripley Aquarium'],
    stations: [
      {
        id: 'tor-stn-1',
        name: 'Union Station Transit Concourse',
        position: [43.6453, -79.3806],
        type: 'train',
        lines: ['TTC Line 1', 'GO Transit Express', 'UP Express'],
        icon: '🚅',
        speedMultiplier: 5.0,
        description: 'Canada busiest transportation terminal linking downtown rail and subway arteries!'
      },
      {
        id: 'tor-stn-2',
        name: 'King Street Streetcar Hub',
        position: [43.6486, -79.3817],
        type: 'bus',
        lines: ['504 King Streetcar', 'Downtown Express'],
        icon: '🚌',
        speedMultiplier: 2.2,
        description: 'Iconic red Toronto streetcars gliding along historic financial towers.'
      },
      {
        id: 'tor-stn-3',
        name: 'Queen Station Underground',
        position: [43.6524, -79.3792],
        type: 'subway',
        lines: ['Yonge-University Line'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Subterranean transit directly below Eaton Centre.'
      }
    ],
    monsters: [
      {
        id: 'tor-1',
        name: 'MooseByte',
        type: 'Grass',
        level: 27,
        hp: 3,
        maxHp: 3,
        position: [43.6426, -79.3871],
        streetName: 'Bremner Blvd / CN Tower',
        spriteColor: '#10B981',
        description: 'A majestic cyber moose guarding the needle spire of the CN Tower!',
        avatarIcon: '🫎',
        rarity: 'Common',
        auraColor: '#34D399',
        lessonTopic: 'Gerunds after Prepositions',
        questions: [
          {
            id: 'tor-1-q1',
            category: 'grammar',
            questionText: 'We are looking forward to _____ from the top of the CN Tower.',
            hint: 'After "looking forward to", use verb-ing',
            options: ['seeing', 'see', 'saw', 'have seen'],
            correctIndex: 0,
            explanation: '"Look forward to" is followed by a gerund (-ing): "looking forward to seeing".',
            moveName: 'Maple Antler Strike'
          },
          {
            id: 'tor-1-q2',
            category: 'vocabulary',
            questionText: 'The top observation deck offers a _______ view across Lake Ontario.',
            hint: 'Breath-taking, impressive',
            options: ['spectacular', 'boring', 'fragile', 'narrow'],
            correctIndex: 0,
            explanation: '"Spectacular" means remarkably impressive or dramatic to see.',
            moveName: 'Boreal Wind'
          },
          {
            id: 'tor-1-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for the sweet tree syrup Canada is famous for?',
            hint: 'M-a-p-l-e',
            options: ['maple', 'mayple', 'mapel', 'mappel'],
            correctIndex: 0,
            explanation: '"Maple" is spelled M-A-P-L-E.',
            moveName: 'Amber Sap Splash'
          }
        ]
      },
      {
        id: 'tor-2',
        name: 'HydroOtter',
        type: 'Water',
        level: 28,
        hp: 3,
        maxHp: 3,
        position: [43.6534, -79.3840],
        streetName: 'Queen Street West / City Hall',
        spriteColor: '#0284C7',
        description: 'A playful river otter surfing the water fountains of Nathan Phillips Square!',
        avatarIcon: '🦦',
        rarity: 'Rare',
        auraColor: '#38BDF8',
        lessonTopic: 'Infinitive with "decide / want"',
        questions: [
          {
            id: 'tor-2-q1',
            category: 'grammar',
            questionText: 'After watching the ice skaters, Emma decided _____ a warm hot chocolate.',
            hint: 'The verb "decide" takes an infinitive with "to"',
            options: ['to buy', 'buying', 'bought', 'buys'],
            correctIndex: 0,
            explanation: '"Decide" takes an infinitive: "decided to buy".',
            moveName: 'Glacier Stream'
          },
          {
            id: 'tor-2-q2',
            category: 'reading',
            questionText: '"Actions speak louder than words." What does this famous proverb mean?',
            hint: 'What you do is more important than what you say',
            options: ['What you do matters more than what you say you will do', 'You must shout when you speak', 'Talking is always better than doing', 'Never speak in public'],
            correctIndex: 0,
            explanation: 'This proverb emphasizes that concrete deeds prove character better than promises.',
            moveName: 'Ontario Wave Splash'
          },
          {
            id: 'tor-2-q3',
            category: 'grammar',
            questionText: 'He avoids _____ in heavy traffic during rush hour.',
            hint: 'The verb "avoid" takes a gerund',
            options: ['driving', 'to drive', 'drive', 'drives'],
            correctIndex: 0,
            explanation: '"Avoid" is followed by a gerund: "avoids driving".',
            moveName: 'Whirlpool Spin'
          }
        ]
      },
      {
        id: 'tor-3',
        name: 'FrostBear',
        type: 'Ice',
        level: 29,
        hp: 4,
        maxHp: 4,
        position: [43.6488, -79.3716],
        streetName: 'Front Street East / St. Lawrence',
        spriteColor: '#38BDF8',
        description: 'An icy armored polar guardian commanding the historic markets and lake breeze!',
        avatarIcon: '🐻‍❄️',
        rarity: 'Legendary',
        auraColor: '#7DD3FC',
        lessonTopic: 'Gerund vs Infinitive Nuance',
        questions: [
          {
            id: 'tor-3-q1',
            category: 'grammar',
            questionText: '"Remember _____ your passport before boarding the flight!"',
            hint: 'Remember to do a future duty',
            options: ['to pack', 'packing', 'pack', 'packed'],
            correctIndex: 0,
            explanation: '"Remember to [do]" means not forgetting a duty or upcoming action.',
            moveName: 'Polar Blizzard'
          },
          {
            id: 'tor-3-q2',
            category: 'vocabulary',
            questionText: 'A person who travels to another country for leisure and exploration is a ______.',
            hint: 'T-o-u-r-i-s-t',
            options: ['tourist', 'carpenter', 'mechanic', 'dentist'],
            correctIndex: 0,
            explanation: 'A "tourist" travels for pleasure, sightseeing, and cultural discovery.',
            moveName: 'Frost Claw'
          },
          {
            id: 'tor-3-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an enjoyable journey or expedition?',
            hint: 'V-o-y-a-g-e',
            options: ['voyage', 'voyadge', 'voyedge', 'voiyage'],
            correctIndex: 0,
            explanation: '"Voyage" is spelled V-O-Y-A-G-E.',
            moveName: 'Glacial Roar'
          },
          {
            id: 'tor-3-q4',
            category: 'reading',
            questionText: 'Why is Toronto known as one of the most multicultural cities in the world?',
            hint: 'People from hundreds of cultural backgrounds live together',
            options: ['Over half of its residents were born outside Canada and speak diverse languages', 'It only has one museum', 'It is located in the arctic', 'Nobody speaks English there'],
            correctIndex: 0,
            explanation: 'Toronto celebrates linguistic and cultural diversity with communities from around the world.',
            moveName: 'Aurora Polar Crest'
          }
        ]
      }
    ]
  },

  // CITY 14: AMSTERDAM, NETHERLANDS
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    coordinates: [52.3676, 4.9041],
    zoom: 14,
    lessonTitle: 'Lesson 14: Relative Clauses (Who, Which, That, Where)',
    lessonGrammarRule: 'Use "who" for people, "which/that" for things and concepts, and "where" for places.',
    welcomeMessage: 'Welcome to Amsterdam (City 14/26)! Ride along tree-lined canals and brick bridges while mastering relative pronouns.',
    landmarks: ['Dam Square', 'Rijksmuseum', 'Canal Ring', 'Vondelpark'],
    stations: [
      {
        id: 'ams-stn-1',
        name: 'Centraal Station Metro & Ferries',
        position: [52.3791, 4.9003],
        type: 'train',
        lines: ['Metro 52 North-South', 'NS Intercity', 'IJ Ferries'],
        icon: '🚅',
        speedMultiplier: 5.0,
        description: 'Magnificent waterfront Gothic palace terminal linking all Dutch railways!'
      },
      {
        id: 'ams-stn-2',
        name: 'Dam Square Tram Station',
        position: [52.3731, 4.8932],
        type: 'bus',
        lines: ['Tram 4, 14, 24'],
        icon: '🚊',
        speedMultiplier: 2.2,
        description: 'Brisk city trams crossing cobblestone squares and canal locks.'
      },
      {
        id: 'ams-stn-3',
        name: 'Museumplein Water Taxi Stand',
        position: [52.3584, 4.8811],
        type: 'taxi',
        lines: ['Canal Water Taxi', 'City Cab Fleet'],
        icon: '🚕',
        speedMultiplier: 2.6,
        description: 'Speedy electric taxis and canal boats gliding between world-class galleries.'
      }
    ],
    monsters: [
      {
        id: 'ams-1',
        name: 'TulipPixie',
        type: 'Grass',
        level: 29,
        hp: 3,
        maxHp: 3,
        position: [52.3728, 4.8936],
        streetName: 'Damrak Canal Way',
        spriteColor: '#EC4899',
        description: 'A glowing petal fairy blooming with vivid Dutch tulips!',
        avatarIcon: '🌷',
        rarity: 'Common',
        auraColor: '#F472B6',
        lessonTopic: 'Relative Pronoun "Who"',
        questions: [
          {
            id: 'ams-1-q1',
            category: 'grammar',
            questionText: 'Vincent van Gogh was a painter _____ created vibrant sunflowers and starry skies.',
            hint: 'Pronoun referring to a person',
            options: ['who', 'which', 'where', 'whose'],
            correctIndex: 0,
            explanation: 'We use "who" to refer to people: "a painter who created".',
            moveName: 'Blossom Vortex'
          },
          {
            id: 'ams-1-q2',
            category: 'vocabulary',
            questionText: 'A waterway built across land for boats or irrigation is called a ______.',
            hint: 'C-a-n-a-l',
            options: ['canal', 'volcano', 'meadow', 'glacier'],
            correctIndex: 0,
            explanation: 'A "canal" is a man-made artificial waterway.',
            moveName: 'Petal Breeze'
          },
          {
            id: 'ams-1-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a two-wheeled pedal vehicle?',
            hint: 'B-i-c-y-c-l-e',
            options: ['bicycle', 'bycicle', 'bicicle', 'bycycle'],
            correctIndex: 0,
            explanation: '"Bicycle" is spelled B-I-C-Y-C-L-E.',
            moveName: 'Floral Sparkle'
          }
        ]
      },
      {
        id: 'ams-2',
        name: 'WindmillGolem',
        type: 'Wind',
        level: 30,
        hp: 4,
        maxHp: 4,
        position: [52.3598, 4.8852],
        streetName: 'Museumplein Green',
        spriteColor: '#06B6D4',
        description: 'A stone and timber colossus spinning giant windmill sails with the North Sea gale!',
        avatarIcon: '🪁',
        rarity: 'Legendary',
        auraColor: '#22D3EE',
        lessonTopic: 'Relative Pronouns "Which" and "Where"',
        questions: [
          {
            id: 'ams-2-q1',
            category: 'grammar',
            questionText: 'This is the historic art museum _____ millions of visitors admire Rembrandt paintings.',
            hint: 'Pronoun referring to a place',
            options: ['where', 'who', 'which', 'whose'],
            correctIndex: 0,
            explanation: 'We use "where" for places when explaining what happens there.',
            moveName: 'Gale Wind Sail'
          },
          {
            id: 'ams-2-q2',
            category: 'grammar',
            questionText: 'She rides a classic Dutch bicycle _____ has a sturdy front basket.',
            hint: 'Pronoun referring to an object or vehicle',
            options: ['which', 'who', 'where', 'whom'],
            correctIndex: 0,
            explanation: 'We use "which" or "that" to describe objects and things.',
            moveName: 'Cyclonic Gust'
          },
          {
            id: 'ams-2-q3',
            category: 'reading',
            questionText: 'Why do so many residents in Amsterdam commute by bicycle?',
            hint: 'Dedicated bike paths make it fast, clean, and healthy',
            options: ['Flat terrain and extensive cycling networks make it convenient and eco-friendly', 'Cars are not invented yet', 'Bicycles cannot be stolen', 'Walking is banned'],
            correctIndex: 0,
            explanation: 'Amsterdam infrastructure is globally celebrated for safe, bike-first urban transit.',
            moveName: 'Timber Mill Strike'
          }
        ]
      }
    ]
  },

  // CITY 15: DUBAI, UNITED ARAB EMIRATES
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    coordinates: [25.2048, 55.2708],
    zoom: 14,
    lessonTitle: 'Lesson 15: Second Conditionals (Hypothetical Situations)',
    lessonGrammarRule: 'Second Conditional: "If + past simple, would + base verb" describes imagined, unlikely, or dream scenarios: "If I lived here, I would visit the Burj Khalifa every day."',
    welcomeMessage: 'Welcome to Dubai (City 15/26)! Gaze at the tallest skyscraper on Earth and imagine futuristic grammar feats.',
    landmarks: ['Burj Khalifa', 'Dubai Mall', 'Dubai Marina', 'Palm Jumeirah'],
    stations: [
      {
        id: 'dxb-stn-1',
        name: 'Burj Khalifa / Dubai Mall Red Line Metro',
        position: [25.1972, 55.2744],
        type: 'subway',
        lines: ['Dubai Metro Red Line'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Air-conditioned driverless futuristic metro soaring on elevated viaducts!'
      },
      {
        id: 'dxb-stn-2',
        name: 'Sheikh Zayed Supercar Taxi Stand',
        position: [25.2012, 55.2721],
        type: 'taxi',
        lines: ['Dubai Luxury Taxi'],
        icon: '🚕',
        speedMultiplier: 2.8,
        description: 'Sleek luxury roadsters cruising between gleaming glass towers.'
      },
      {
        id: 'dxb-stn-3',
        name: 'Downtown Palm Monorail Depot',
        position: [25.1185, 55.1380],
        type: 'train',
        lines: ['Palm Jumeirah Monorail'],
        icon: '🚅',
        speedMultiplier: 5.0,
        description: 'Scenic monorail gliding across the Arabian Gulf archipelago.'
      }
    ],
    monsters: [
      {
        id: 'dxb-1',
        name: 'SolarFalcon',
        type: 'Electric',
        level: 31,
        hp: 3,
        maxHp: 3,
        position: [25.1972, 55.2744],
        streetName: 'Sheikh Mohammed bin Rashid Blvd',
        spriteColor: '#F59E0B',
        description: 'A golden desert raptor harnessing solar beams above the Burj Khalifa peak!',
        avatarIcon: '🦅',
        rarity: 'Rare',
        auraColor: '#FBBF24',
        lessonTopic: 'Second Conditional Structure',
        questions: [
          {
            id: 'dxb-1-q1',
            category: 'grammar',
            questionText: 'If I _____ a magic carpet, I would fly to the top of Burj Khalifa in seconds!',
            hint: 'Second conditional "if" clause uses past simple',
            options: ['had', 'have', 'will have', 'am having'],
            correctIndex: 0,
            explanation: 'In the second conditional, the condition takes past simple: "If I had... I would fly".',
            moveName: 'Solar Talon Slash'
          },
          {
            id: 'dxb-1-q2',
            category: 'vocabulary',
            questionText: 'An extremely tall, multistory modern building is known as a ______.',
            hint: 'S-k-y-s-c-r-a-p-e-r',
            options: ['skyscraper', 'bungalow', 'tent', 'cottage'],
            correctIndex: 0,
            explanation: 'A "skyscraper" is a very tall continuous habitable tower.',
            moveName: 'Sunbeam Flare'
          },
          {
            id: 'dxb-1-q3',
            category: 'reading',
            questionText: '"If you were the mayor of a smart city, what would you build first?"\nWhich answer uses correct grammar?',
            hint: 'I would build...',
            options: ['I would build solar trains and green rooftop gardens', 'I built tomorrow', 'I will built', 'I am build'],
            correctIndex: 0,
            explanation: 'Hypothetical answers use "I would [verb]".',
            moveName: 'Golden Mirage Strike'
          }
        ]
      },
      {
        id: 'dxb-2',
        name: 'DuneWyrm',
        type: 'Fire',
        level: 32,
        hp: 4,
        maxHp: 4,
        position: [25.2085, 55.2798],
        streetName: 'Financial Centre Way',
        spriteColor: '#EA580C',
        description: 'A crimson sand dragon churning crystalline heat across the desert dunes!',
        avatarIcon: '🐉',
        rarity: 'Legendary',
        auraColor: '#F97316',
        lessonTopic: 'Second Conditional with "were"',
        questions: [
          {
            id: 'dxb-2-q1',
            category: 'grammar',
            questionText: '"If I _____ you, I would drink plenty of fresh water under the desert sun."',
            hint: 'Formal subjunctive in second conditional uses "were" for all subjects',
            options: ['were', 'was', 'am', 'be'],
            correctIndex: 0,
            explanation: 'Formal English uses "If I were you" for giving advice.',
            moveName: 'Sandstorm Inferno'
          },
          {
            id: 'dxb-2-q2',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an optical illusion caused by desert heat?',
            hint: 'M-i-r-a-g-e',
            options: ['mirage', 'merage', 'myrage', 'miradge'],
            correctIndex: 0,
            explanation: '"Mirage" is spelled M-I-R-A-G-E.',
            moveName: 'Crystalline Quake'
          },
          {
            id: 'dxb-2-q3',
            category: 'vocabulary',
            questionText: 'A fertile green area in an arid desert where water is found is an ______.',
            hint: 'O-a-s-i-s',
            options: ['oasis', 'iceberg', 'ocean', 'volcano'],
            correctIndex: 0,
            explanation: 'An "oasis" provides life-saving water and shade amid arid desert expanses.',
            moveName: 'Crimson Tail Swipe'
          }
        ]
      }
    ]
  },

  // CITY 16: BARCELONA, SPAIN
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    coordinates: [41.3879, 2.1699],
    zoom: 14,
    lessonTitle: 'Lesson 16: Reported Speech (Direct to Indirect)',
    lessonGrammarRule: 'In reported speech, present tenses shift back to past tenses (said that she liked, said that he was studying).',
    welcomeMessage: 'Welcome to Barcelona (City 16/26)! Walk down La Rambla and marvel at Antoni Gaudí colorful masterpieces.',
    landmarks: ['Sagrada Familia', 'Park Güell', 'La Rambla', 'Gothic Quarter'],
    stations: [
      {
        id: 'bcn-stn-1',
        name: 'Sagrada Familia Metro Station',
        position: [41.4036, 2.1744],
        type: 'subway',
        lines: ['L2 Purple Line', 'L5 Blue Line'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Underground station directly facing Gaudí breathtaking stone basilica.'
      },
      {
        id: 'bcn-stn-2',
        name: 'Plaça de Catalunya Rail Hub',
        position: [41.3870, 2.1700],
        type: 'train',
        lines: ['Rodalies R1, R3, R4', 'FGC Lines'],
        icon: '🚅',
        speedMultiplier: 5.0,
        description: 'Vibrant central plaza station connecting Mediterranean rail networks.'
      },
      {
        id: 'bcn-stn-3',
        name: 'La Rambla Yellow-Black Cab Hub',
        position: [41.3812, 2.1732],
        type: 'taxi',
        lines: ['Barcelona Taxi Fleet'],
        icon: '🚕',
        speedMultiplier: 2.6,
        description: 'Famous yellow and black city taxis cruising toward the Mediterranean port.'
      }
    ],
    monsters: [
      {
        id: 'bcn-1',
        name: 'MosaicSalamander',
        type: 'Fire',
        level: 32,
        hp: 3,
        maxHp: 3,
        position: [41.4145, 2.1527],
        streetName: 'Park Güell Mosaic Terrace',
        spriteColor: '#F97316',
        description: 'A radiant multicolored ceramic lizard brought to life by architectural wonder!',
        avatarIcon: '🦎',
        rarity: 'Common',
        auraColor: '#FB923C',
        lessonTopic: 'Reported Speech: Present to Past',
        questions: [
          {
            id: 'bcn-1-q1',
            category: 'grammar',
            questionText: 'Direct: "I love the architecture here," Maria said.\nReported: Maria said that she _____ the architecture there.',
            hint: 'Tense shifts from present simple "love" to past simple',
            options: ['loved', 'loves', 'loving', 'will love'],
            correctIndex: 0,
            explanation: 'In reported speech, present simple shifts to past simple: "loved".',
            moveName: 'Trencadís Flame'
          },
          {
            id: 'bcn-1-q2',
            category: 'vocabulary',
            questionText: 'Art made by assembling small pieces of colored glass, ceramic, or stone is a ______.',
            hint: 'M-o-s-a-i-c',
            options: ['mosaic', 'portrait', 'shadow', 'fountain'],
            correctIndex: 0,
            explanation: 'A "mosaic" is created by joining small colorful tiles or ceramic fragments.',
            moveName: 'Ceramic Spark'
          },
          {
            id: 'bcn-1-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a grand, holy church structure?',
            hint: 'C-a-t-h-e-d-r-a-l',
            options: ['cathedral', 'cathedrel', 'catherdral', 'cathedrol'],
            correctIndex: 0,
            explanation: '"Cathedral" is spelled C-A-T-H-E-D-R-A-L.',
            moveName: 'Sunny Prism Burst'
          }
        ]
      },
      {
        id: 'bcn-2',
        name: 'GaudíGargoyle',
        type: 'Dragon',
        level: 33,
        hp: 4,
        maxHp: 4,
        position: [41.4036, 2.1744],
        streetName: 'Carrer de Mallorca / Sagrada Familia',
        spriteColor: '#8B5CF6',
        description: 'A stone spire dragon crowned with soaring organic tree-like arches and stained glass!',
        avatarIcon: '🐲',
        rarity: 'Legendary',
        auraColor: '#A855F7',
        lessonTopic: 'Reported Speech: Questions & Pronouns',
        questions: [
          {
            id: 'bcn-2-q1',
            category: 'grammar',
            questionText: 'Direct: "Can we enter the tower?" the tourist asked.\nReported: The tourist asked if they _____ enter the tower.',
            hint: '"Can" shifts back to "could"',
            options: ['could', 'can', 'will', 'may'],
            correctIndex: 0,
            explanation: 'Modal "can" shifts to "could" in reported speech.',
            moveName: 'Basilica Stone Roar'
          },
          {
            id: 'bcn-2-q2',
            category: 'reading',
            questionText: 'Why did Gaudí design the interior pillars of Sagrada Familia to look like tall branching trees?',
            hint: 'He was deeply inspired by nature and sunlight filtering through leaves',
            options: ['To mimic walking through a peaceful sunlit forest', 'Because he had no stone', 'To keep out birds', 'Because trees are flat'],
            correctIndex: 0,
            explanation: 'Gaudí bio-mimicry made church pillars branch out like forest canopies.',
            moveName: 'Stained Glass Rainbow'
          },
          {
            id: 'bcn-2-q3',
            category: 'vocabulary',
            questionText: 'An outstanding, supreme piece of art or literature produced by a master is a ______.',
            hint: 'M-a-s-t-e-r-p-i-e-c-e',
            options: ['masterpiece', 'scratchpad', 'doodle', 'receipt'],
            correctIndex: 0,
            explanation: 'A "masterpiece" represents the highest pinnacle of creative achievement.',
            moveName: 'Gothic Spire Surge'
          }
        ]
      }
    ]
  },

  // CITY 17: BANGKOK, THAILAND
  {
    id: 'bangkok',
    name: 'Bangkok',
    country: 'Thailand',
    coordinates: [13.7563, 100.5018],
    zoom: 14,
    lessonTitle: 'Lesson 17: Conjunctions of Contrast & Cause (Although, Despite, Because)',
    lessonGrammarRule: '"Although / Even though" connect full clauses; "Despite / In spite of" are followed by nouns or gerunds; "Because" explains reasons.',
    welcomeMessage: 'Welcome to Bangkok (City 17/26)! Travel along the Chao Phraya River, visit golden temples, and master connective adverbs.',
    landmarks: ['Grand Palace', 'Wat Arun', 'Chao Phraya River', 'Chatuchak'],
    stations: [
      {
        id: 'bkk-stn-1',
        name: 'Siam BTS Skytrain Interchange',
        position: [13.7456, 100.5342],
        type: 'subway',
        lines: ['Sukhumvit Line', 'Silom Line'],
        icon: '🚊',
        speedMultiplier: 3.5,
        description: 'Bustling multi-tier elevated transit hovering over vibrant retail centers.'
      },
      {
        id: 'bkk-stn-2',
        name: 'Sathorn Chao Phraya Express Pier',
        position: [13.7191, 100.5140],
        type: 'train',
        lines: ['Orange Flag Express', 'Blue Tourist Boat'],
        icon: '🚤',
        speedMultiplier: 4.8,
        description: 'Swift river express boats racing past glittering golden pagoda spires!'
      },
      {
        id: 'bkk-stn-3',
        name: 'Rattanakosin Tuk-Tuk & Cab Station',
        position: [13.7525, 100.4930],
        type: 'taxi',
        lines: ['Bangkok Tuk-Tuk Fleet', 'Pink City Meter Taxis'],
        icon: '🛺',
        speedMultiplier: 2.7,
        description: 'Iconic three-wheeled motorized tuk-tuks zipping down riverside alleys.'
      }
    ],
    monsters: [
      {
        id: 'bkk-1',
        name: 'NagaSerpent',
        type: 'Water',
        level: 33,
        hp: 3,
        maxHp: 3,
        position: [13.7437, 100.4889],
        streetName: 'Arun Amarin Road / Wat Arun',
        spriteColor: '#0284C7',
        description: 'A luminous multi-headed river guardian rising from the Chao Phraya waves!',
        avatarIcon: '🐍',
        rarity: 'Common',
        auraColor: '#38BDF8',
        lessonTopic: 'Although vs Despite',
        questions: [
          {
            id: 'bkk-1-q1',
            category: 'grammar',
            questionText: '_____ it was raining heavily, the floating market vendors continued to sell fresh mangoes with a smile.',
            hint: 'Used with a subject + verb clause',
            options: ['Although', 'Despite', 'Because of', 'In spite of'],
            correctIndex: 0,
            explanation: '"Although" is followed by a clause (subject + verb: "it was raining").',
            moveName: 'River Crest Slash'
          },
          {
            id: 'bkk-1-q2',
            category: 'grammar',
            questionText: '_____ the tropical afternoon heat, hundreds of pilgrims visited the Temple of Dawn.',
            hint: 'Followed by a noun phrase without a finite verb',
            options: ['Despite', 'Although', 'Even though', 'Since'],
            correctIndex: 0,
            explanation: '"Despite" is followed directly by a noun phrase ("the tropical afternoon heat").',
            moveName: 'Aqua Coil'
          },
          {
            id: 'bkk-1-q3',
            category: 'vocabulary',
            questionText: 'A tier-roofed Buddhist temple or sacred monument in East and Southeast Asia is a ______.',
            hint: 'P-a-g-o-d-a',
            options: ['pagoda', 'lighthouse', 'windmill', 'barn'],
            correctIndex: 0,
            explanation: 'A "pagoda" is a tiered religious tower characteristic of Asian sacred architecture.',
            moveName: 'Golden Water Stream'
          }
        ]
      },
      {
        id: 'bkk-2',
        name: 'GarudaSolaris',
        type: 'Electric',
        level: 34,
        hp: 4,
        maxHp: 4,
        position: [13.7500, 100.4913],
        streetName: 'Na Phra Lan Road / Grand Palace',
        spriteColor: '#F59E0B',
        description: 'A radiant mythical sun-bird crowned with shimmering gold leaf and rubies!',
        avatarIcon: '🪶',
        rarity: 'Legendary',
        auraColor: '#FBBF24',
        lessonTopic: 'Cause & Effect Conjunctions',
        questions: [
          {
            id: 'bkk-2-q1',
            category: 'grammar',
            questionText: 'The ancient palace is carefully preserved _____ it represents priceless cultural heritage.',
            hint: 'Conjunction showing reason or cause',
            options: ['because', 'although', 'despite', 'unless'],
            correctIndex: 0,
            explanation: '"Because" introduces the reason for preserving the palace.',
            moveName: 'Solar Wing Gale'
          },
          {
            id: 'bkk-2-q2',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for generous, warm treatment of guests and visitors?',
            hint: 'H-o-s-p-i-t-a-l-i-t-y',
            options: ['hospitality', 'hospetality', 'hospitalety', 'hospitallity'],
            correctIndex: 0,
            explanation: '"Hospitality" is spelled H-O-S-P-I-T-A-L-I-T-Y.',
            moveName: 'Ruby Sun Flash'
          },
          {
            id: 'bkk-2-q3',
            category: 'reading',
            questionText: 'Why is Thailand affectionately known as the "Land of Smiles"?',
            hint: 'Politeness and friendly hospitality are core cultural values',
            options: ['Friendly smiles, courteous manners, and warm hospitality are cherished values', 'Smiling is a law with fines', 'People never get sad', 'It has the most dentists'],
            correctIndex: 0,
            explanation: 'Thai culture is renowned worldwide for genuine kindness and welcoming smiles.',
            moveName: 'Garuda Thunder Strike'
          }
        ]
      }
    ]
  },

  // CITY 18: SAN FRANCISCO, USA
  {
    id: 'sanfrancisco',
    name: 'San Francisco',
    country: 'United States',
    coordinates: [37.7749, -122.4194],
    zoom: 14,
    lessonTitle: 'Lesson 18: Advanced Adverbs & Transition Words (However, Furthermore, Therefore)',
    lessonGrammarRule: 'Use "Furthermore" to add points, "However" to contrast ideas, and "Therefore" to show logical conclusions.',
    welcomeMessage: 'Welcome to San Francisco (City 18/26)! Hop onto the historic cable cars and cross the Golden Gate Bridge.',
    landmarks: ['Golden Gate Bridge', 'Fisherman Wharf', 'Alcatraz Island', 'Lombard Street'],
    stations: [
      {
        id: 'sfo-stn-1',
        name: 'Powell Street BART & Cable Car Turntable',
        position: [37.7844, -122.4079],
        type: 'subway',
        lines: ['BART Transbay', 'Muni Metro', 'Powell-Hyde Cable Car'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Downtown transit hub where cable cars are turned around by hand on historic wooden turntables.'
      },
      {
        id: 'sfo-stn-2',
        name: 'Transbay Transit Terminal Express',
        position: [37.7897, -122.3969],
        type: 'train',
        lines: ['Caltrain Connector', 'AC Transit Express'],
        icon: '🚅',
        speedMultiplier: 5.0,
        description: 'Futuristic multi-modal transit center with a lush rooftop park and high-speed rail links.'
      },
      {
        id: 'sfo-stn-3',
        name: 'Fisherman Wharf Waymo & Cab Zone',
        position: [37.8080, -122.4177],
        type: 'taxi',
        lines: ['Autonomous Robotaxi', 'San Francisco Yellow Cab'],
        icon: '🚗',
        speedMultiplier: 2.8,
        description: 'Autonomous electric driverless robotaxis gliding smoothly along the bay.'
      }
    ],
    monsters: [
      {
        id: 'sfo-1',
        name: 'FogGriffin',
        type: 'Wind',
        level: 34,
        hp: 3,
        maxHp: 3,
        position: [37.8199, -122.4783],
        streetName: 'Golden Gate Bridge Toll Plaza',
        spriteColor: '#64748B',
        description: 'The legendary griffin concealed in the rolling Pacific sea fog ("Karl the Fog")!',
        avatarIcon: '🦅',
        rarity: 'Common',
        auraColor: '#94A3B8',
        lessonTopic: 'Transition Words: However & Therefore',
        questions: [
          {
            id: 'sfo-1-q1',
            category: 'grammar',
            questionText: 'The Golden Gate Bridge was shrouded in heavy fog; _____, our ship navigated safely using modern radar.',
            hint: 'Transition showing contrast',
            options: ['however', 'furthermore', 'similarly', 'because'],
            correctIndex: 0,
            explanation: '"However" indicates a contrast between the thick fog and safe navigation.',
            moveName: 'Pacific Fog Cloud'
          },
          {
            id: 'sfo-1-q2',
            category: 'grammar',
            questionText: 'Sarah studied the vocabulary cards every morning; _____, she achieved a perfect score on the English exam.',
            hint: 'Transition showing logical result',
            options: ['therefore', 'although', 'despite', 'whereas'],
            correctIndex: 0,
            explanation: '"Therefore" introduces a logical result or conclusion of prior effort.',
            moveName: 'Bridge Cable Whip'
          },
          {
            id: 'sfo-1-q3',
            category: 'vocabulary',
            questionText: 'The steep angle of a road or hillside is referred to as its ______.',
            hint: 'I-n-c-l-i-n-e',
            options: ['incline', 'puddle', 'tunnel', 'anchor'],
            correctIndex: 0,
            explanation: 'An "incline" is an upward or downward slope.',
            moveName: 'Bay Breeze'
          }
        ]
      },
      {
        id: 'sfo-2',
        name: 'CyberOtterX',
        type: 'Water',
        level: 35,
        hp: 4,
        maxHp: 4,
        position: [37.8080, -122.4177],
        streetName: 'The Embarcadero / Pier 39',
        spriteColor: '#0EA5E9',
        description: 'A tech-savvy sea lion and otter hybrid surfing the bay waves with fiber-optic goggles!',
        avatarIcon: '🦭',
        rarity: 'Legendary',
        auraColor: '#38BDF8',
        lessonTopic: 'Transition Words: Furthermore & In addition',
        questions: [
          {
            id: 'sfo-2-q1',
            category: 'grammar',
            questionText: 'Cable cars are historically significant; _____, they offer panoramic views of the city hills.',
            hint: 'Transition adding an extra supportive point',
            options: ['furthermore', 'instead', 'nonetheless', 'unless'],
            correctIndex: 0,
            explanation: '"Furthermore" adds an additional supporting advantage to the sentence.',
            moveName: 'Tidal Wave Pulse'
          },
          {
            id: 'sfo-2-q2',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a device used to move upward and downward between floors?',
            hint: 'E-l-e-v-a-t-o-r',
            options: ['elevator', 'elevater', 'elevaitor', 'elavator'],
            correctIndex: 0,
            explanation: '"Elevator" is spelled E-L-E-V-A-T-O-R.',
            moveName: 'Cable Claw Strike'
          },
          {
            id: 'sfo-2-q3',
            category: 'reading',
            questionText: 'Why is San Francisco Silicon Valley region recognized as a world hub for technology?',
            hint: 'Concentration of universities, engineering pioneers, and innovative startups',
            options: ['It is home to major software innovators, research labs, and venture creators', 'Computers can only be built near the ocean', 'It is the coldest city in America', 'No books are allowed there'],
            correctIndex: 0,
            explanation: 'The Bay Area pioneered semiconductor breakthroughs, personal computing, and the internet.',
            moveName: 'Silicon Supernova'
          }
        ]
      }
    ]
  },

  // CITY 19: REYKJAVIK, ICELAND
  {
    id: 'reykjavik',
    name: 'Reykjavik',
    country: 'Iceland',
    coordinates: [64.1466, -21.9426],
    zoom: 14,
    lessonTitle: 'Lesson 19: Third Conditionals (Past Regrets & Imagined Pasts)',
    lessonGrammarRule: 'Third Conditional: "If + had + past participle, would have + past participle" talks about imagined past situations that did not happen.',
    welcomeMessage: 'Welcome to Reykjavik (City 19/26)! Experience volcanic geysers and northern lights while mastering past hypothetical conditionals.',
    landmarks: ['Hallgrímskirkja', 'Harpa Concert Hall', 'Sun Voyager', 'Perlan'],
    stations: [
      {
        id: 'rjk-stn-1',
        name: 'Hlemmur Central Bus Concourse',
        position: [64.1432, -21.9144],
        type: 'bus',
        lines: ['Strætó Line 1, 3, 6'],
        icon: '🚌',
        speedMultiplier: 2.2,
        description: 'Heated municipal geothermal transit terminal connecting city districts.'
      },
      {
        id: 'rjk-stn-2',
        name: 'Harpa Waterfront Electric Cab Stand',
        position: [64.1503, -21.9328],
        type: 'taxi',
        lines: ['Reykjavik Eco-Taxi'],
        icon: '🚕',
        speedMultiplier: 2.7,
        description: 'Zero-emission electric cabs powered by clean geothermal and hydro power.'
      },
      {
        id: 'rjk-stn-3',
        name: 'Old Harbour Whale Watcher Express',
        position: [64.1524, -21.9442],
        type: 'train',
        lines: ['Fjord Express Catamaran'],
        icon: '🚤',
        speedMultiplier: 4.8,
        description: 'High-speed fjord vessel slicing through crisp Arctic waters.'
      }
    ],
    monsters: [
      {
        id: 'rjk-1',
        name: 'AuroraSeraph',
        type: 'Ice',
        level: 35,
        hp: 3,
        maxHp: 3,
        position: [64.1417, -21.9266],
        streetName: 'Skólavörðustígur / Hallgrímskirkja',
        spriteColor: '#38BDF8',
        description: 'A radiant frost angel weaving the glowing green and violet ribbons of the Northern Lights!',
        avatarIcon: '🪽',
        rarity: 'Rare',
        auraColor: '#7DD3FC',
        lessonTopic: 'Third Conditional "If + had done"',
        questions: [
          {
            id: 'rjk-1-q1',
            category: 'grammar',
            questionText: 'If we _____ our warm winter coats yesterday, we would not have felt so chilly on the glacier.',
            hint: 'Third conditional if-clause takes "had + past participle"',
            options: ['had brought', 'brought', 'bring', 'have brought'],
            correctIndex: 0,
            explanation: 'The condition in the third conditional is "had brought".',
            moveName: 'Aurora Frost Wave'
          },
          {
            id: 'rjk-1-q2',
            category: 'vocabulary',
            questionText: 'A natural spring that intermittently discharges boiling water and steam is a ______.',
            hint: 'G-e-y-s-e-r',
            options: ['geyser', 'glacier', 'cave', 'canyon'],
            correctIndex: 0,
            explanation: 'A "geyser" shoots superheated water and steam into the sky.',
            moveName: 'Geothermal Burst'
          },
          {
            id: 'rjk-1-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a slowly moving mass or river of ice?',
            hint: 'G-l-a-c-i-e-r',
            options: ['glacier', 'glaciar', 'glaicier', 'glaysier'],
            correctIndex: 0,
            explanation: '"Glacier" is spelled G-L-A-C-I-E-R.',
            moveName: 'Crystal Icicle Shower'
          }
        ]
      },
      {
        id: 'rjk-2',
        name: 'VolcanoTitanX',
        type: 'Fire',
        level: 36,
        hp: 4,
        maxHp: 4,
        position: [64.1498, -21.9332],
        streetName: 'Austurbakki / Harpa Glass Facade',
        spriteColor: '#EF4444',
        description: 'The ancient basalt and lava sovereign representing Iceland land of fire and ice!',
        avatarIcon: '🌋',
        rarity: 'Legendary',
        auraColor: '#F87171',
        lessonTopic: 'Third Conditional Result Clause',
        questions: [
          {
            id: 'rjk-2-q1',
            category: 'grammar',
            questionText: 'If the volcanic eruption had occurred earlier, flights _____ diverted to another airfield.',
            hint: 'Result clause in third conditional uses "would have been"',
            options: ['would have been', 'will be', 'are being', 'have been'],
            correctIndex: 0,
            explanation: 'The imagined past outcome takes "would have been".',
            moveName: 'Magma Geyser Eruption'
          },
          {
            id: 'rjk-2-q2',
            category: 'reading',
            questionText: 'How does Iceland heat nearly all of its homes and produce clean energy?',
            hint: 'Underground natural heat and rushing glacial rivers',
            options: ['Through renewable geothermal heat and hydroelectric power plants', 'By burning coal', 'With giant batteries from space', 'They do not heat homes'],
            correctIndex: 0,
            explanation: 'Iceland is a world pioneer in 100% renewable geothermal and hydro energy.',
            moveName: 'Basalt Pillar Smash'
          },
          {
            id: 'rjk-2-q3',
            category: 'vocabulary',
            questionText: 'Energy that comes from natural resources that naturally replenish is called ______ energy.',
            hint: 'R-e-n-e-w-a-b-l-e',
            options: ['renewable', 'exhausted', 'artificial', 'hazardous'],
            correctIndex: 0,
            explanation: '"Renewable" energy comes from sustainable natural cycles like sun, wind, and geothermal heat.',
            moveName: 'Obsidian Shield'
          }
        ]
      }
    ]
  },

  // CITY 20: CAPE TOWN, SOUTH AFRICA
  {
    id: 'capetown',
    name: 'Cape Town',
    country: 'South Africa',
    coordinates: [-33.9249, 18.4241],
    zoom: 14,
    lessonTitle: 'Lesson 20: Expressing Purpose (In order to, So that, To)',
    lessonGrammarRule: 'Use "to" or "in order to" followed by a base verb; use "so that" followed by a subject + modal verb (so that we could arrive on time).',
    welcomeMessage: 'Welcome to Cape Town (City 20/26)! Scale the flat plateau of Table Mountain where the Atlantic and Indian Oceans meet.',
    landmarks: ['Table Mountain', 'V&A Waterfront', 'Kirstenbosch Botanical Gardens', 'Robben Island'],
    stations: [
      {
        id: 'cpt-stn-1',
        name: 'Table Mountain Aerial Cableway Base',
        position: [-33.9538, 18.4034],
        type: 'train',
        lines: ['Revolving Cable Car Terminal'],
        icon: '🚡',
        speedMultiplier: 5.0,
        description: 'Revolving 360-degree aerial cableway ascending vertical sandstone cliffs.'
      },
      {
        id: 'cpt-stn-2',
        name: 'MyCiTi Waterfront Rapid Transit',
        position: [-33.9068, 18.4211],
        type: 'bus',
        lines: ['MyCiTi T01, 104'],
        icon: '🚌',
        speedMultiplier: 2.4,
        description: 'Dedicated rapid bus transit speeding between the harbour and city bowl.'
      },
      {
        id: 'cpt-stn-3',
        name: 'Long Street Meter Cab Stand',
        position: [-33.9221, 18.4190],
        type: 'taxi',
        lines: ['Cape City Taxis'],
        icon: '🚕',
        speedMultiplier: 2.6,
        description: 'Vibrant street cabs cruising historic Victorian arcades.'
      }
    ],
    monsters: [
      {
        id: 'cpt-1',
        name: 'TableMountainLion',
        type: 'Grass',
        level: 36,
        hp: 3,
        maxHp: 3,
        position: [-33.9573, 18.4098],
        streetName: 'Table Mountain Plateau Way',
        spriteColor: '#10B981',
        description: 'A golden-maned savannah predator crowned with protea flowers and mountain mist!',
        avatarIcon: '🦁',
        rarity: 'Common',
        auraColor: '#34D399',
        lessonTopic: 'In order to vs So that',
        questions: [
          {
            id: 'cpt-1-q1',
            category: 'grammar',
            questionText: 'We woke up at dawn in order _____ the sunrise over Table Bay.',
            hint: '"In order" is followed by "to + base verb"',
            options: ['to watch', 'watching', 'watched', 'watches'],
            correctIndex: 0,
            explanation: '"In order to" takes the base form of the verb: "in order to watch".',
            moveName: 'Sandstone Roar'
          },
          {
            id: 'cpt-1-q2',
            category: 'grammar',
            questionText: 'The hikers packed compasses and extra water so that they _____ safely navigate the rocky ridge.',
            hint: '"So that" is followed by a clause with "could/would"',
            options: ['could', 'to', 'for', 'in order'],
            correctIndex: 0,
            explanation: '"So that" is followed by a modal clause: "so that they could safely navigate".',
            moveName: 'Fynbos Pounce'
          },
          {
            id: 'cpt-1-q3',
            category: 'vocabulary',
            questionText: 'A high, steep, and almost vertical rock face is called a ______.',
            hint: 'C-l-i-f-f',
            options: ['cliff', 'pond', 'meadow', 'lawn'],
            correctIndex: 0,
            explanation: 'A "cliff" is a precipitous, near-vertical rock elevation.',
            moveName: 'Mountain Wind Slash'
          }
        ]
      },
      {
        id: 'cpt-2',
        name: 'OceanSharkZ',
        type: 'Water',
        level: 37,
        hp: 4,
        maxHp: 4,
        position: [-33.9056, 18.4217],
        streetName: 'Breakwater Blvd / V&A Waterfront',
        spriteColor: '#0284C7',
        description: 'A majestic blue ocean titan swimming where the cold Benguela and warm Agulhas currents collide!',
        avatarIcon: '🦈',
        rarity: 'Legendary',
        auraColor: '#38BDF8',
        lessonTopic: 'Clause of Purpose',
        questions: [
          {
            id: 'cpt-2-q1',
            category: 'grammar',
            questionText: 'Marine biologists tag coastal sharks _____ track their migratory routes across oceans.',
            hint: 'Short infinitive of purpose',
            options: ['to', 'for', 'so', 'because'],
            correctIndex: 0,
            explanation: 'We use the simple infinitive "to track" to express purpose.',
            moveName: 'Two Oceans Torrent'
          },
          {
            id: 'cpt-2-q2',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an oceanic bird with black and white plumage that cannot fly?',
            hint: 'P-e-n-g-u-i-n',
            options: ['penguin', 'pengiun', 'pengwen', 'pengwin'],
            correctIndex: 0,
            explanation: '"Penguin" is spelled P-E-N-G-U-I-N (like the Boulders Beach penguins).',
            moveName: 'Tidal Tail Smash'
          },
          {
            id: 'cpt-2-q3',
            category: 'reading',
            questionText: 'What makes the Cape Floral Kingdom unique among biodiversity hotspots on Earth?',
            hint: 'It has the highest density of plant species in the world, many found nowhere else',
            options: ['It contains thousands of plant species, many found nowhere else on the planet', 'It is made entirely of plastic', 'No plants can grow there', 'It only has cacti'],
            correctIndex: 0,
            explanation: 'The Cape Floral Region is a UNESCO World Heritage treasure of endemic botany.',
            moveName: 'Benguela Vortex'
          }
        ]
      }
    ]
  },

  // CITY 21: BUENOS AIRES, ARGENTINA
  {
    id: 'buenosaires',
    name: 'Buenos Aires',
    country: 'Argentina',
    coordinates: [-34.6037, -58.3816],
    zoom: 14,
    lessonTitle: 'Lesson 21: Idioms & Metaphorical Expressions in English',
    lessonGrammarRule: 'Idioms are phrases whose meaning cannot be understood from the literal definitions of the words (e.g. "hit the nail on the head", "once in a blue moon").',
    welcomeMessage: 'Welcome to Buenos Aires (City 21/26)! Stroll through historic tango squares and master evocative English idioms.',
    landmarks: ['Plaza de Mayo', 'Teatro Colón', 'La Boca (Caminito)', 'Recoleta'],
    stations: [
      {
        id: 'bue-stn-1',
        name: 'Plaza de Mayo Subte Terminal',
        position: [-34.6083, -58.3712],
        type: 'subway',
        lines: ['Subte Line A (Historic)', 'Subte Line D'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'The oldest underground subway network in Latin America, operating since 1913!'
      },
      {
        id: 'bue-stn-2',
        name: 'Retiro Railway Palace Station',
        position: [-34.5915, -58.3751],
        type: 'train',
        lines: ['Mitre Commuter Rail', 'San Martín Express'],
        icon: '🚅',
        speedMultiplier: 5.0,
        description: 'Monumental Belle Époque railway cathedral opening toward the Pampas.'
      },
      {
        id: 'bue-stn-3',
        name: 'Avenida 9 de Julio Taxi Stand',
        position: [-34.6037, -58.3816],
        type: 'taxi',
        lines: ['Yellow & Black Taxi Porteño'],
        icon: '🚕',
        speedMultiplier: 2.6,
        description: 'Zipping across the widest avenue in the world alongside the famous Obelisco.'
      }
    ],
    monsters: [
      {
        id: 'bue-1',
        name: 'TangoFlame',
        type: 'Fire',
        level: 37,
        hp: 3,
        maxHp: 3,
        position: [-34.6394, -58.3627],
        streetName: 'Caminito / La Boca',
        spriteColor: '#EF4444',
        description: 'A fiery flamenco and tango dancer executing swift, passionate rhythm strikes!',
        avatarIcon: '💃',
        rarity: 'Common',
        auraColor: '#F87171',
        lessonTopic: 'Common English Idioms',
        questions: [
          {
            id: 'bue-1-q1',
            category: 'reading',
            questionText: 'When someone says "It takes two to tango", what does this idiom mean?',
            hint: 'Both people share responsibility in a situation',
            options: ['Both parties are equally responsible when problems or disputes occur', 'You cannot dance without music', 'Only two people can live in a house', 'Tango is very easy'],
            correctIndex: 0,
            explanation: 'The idiom "it takes two to tango" acknowledges mutual responsibility in relationships and conflicts.',
            moveName: 'Tango Passion Step'
          },
          {
            id: 'bue-1-q2',
            category: 'vocabulary',
            questionText: 'If an event happens "once in a blue moon", it occurs ______.',
            hint: 'Very rarely',
            options: ['very rarely', 'every single day', 'only at midnight', 'twice a week'],
            correctIndex: 0,
            explanation: '"Once in a blue moon" means something happens very infrequently or rarely.',
            moveName: 'Flame Spin'
          },
          {
            id: 'bue-1-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a regular, repeated pattern of sound or movement?',
            hint: 'R-h-y-t-h-m',
            options: ['rhythm', 'rythm', 'rhythim', 'rhithm'],
            correctIndex: 0,
            explanation: '"Rhythm" is spelled R-H-Y-T-H-M.',
            moveName: 'Crimson Rose Strike'
          }
        ]
      },
      {
        id: 'bue-2',
        name: 'PampasPegasus',
        type: 'Wind',
        level: 38,
        hp: 4,
        maxHp: 4,
        position: [-34.6037, -58.3816],
        streetName: 'Av. Corrientes / Obelisco',
        spriteColor: '#06B6D4',
        description: 'A winged silver stallion soaring over the vast grass plains and neoclassical theatres!',
        avatarIcon: '🦄',
        rarity: 'Legendary',
        auraColor: '#22D3EE',
        lessonTopic: 'Figurative Language in Context',
        questions: [
          {
            id: 'bue-2-q1',
            category: 'reading',
            questionText: 'When the teacher told the student "You hit the nail on the head!", what did she mean?',
            hint: 'You answered exactly right',
            options: ['You stated the exact truth and correct answer perfectly', 'You are building a table with a hammer', 'You made a bad mistake', 'You should be quiet'],
            correctIndex: 0,
            explanation: '"To hit the nail on the head" means to say or identify something exactly right.',
            moveName: 'Pampas Gale Wing'
          },
          {
            id: 'bue-2-q2',
            category: 'grammar',
            questionText: 'The actor felt nervous before entering the stage, but the director told him: "Break a leg!" What does this mean?',
            hint: 'A theatrical wish for good luck',
            options: ['Good luck and perform brilliantly!', 'Please fall down on stage', 'Cancel the show immediately', 'Go home and sleep'],
            correctIndex: 0,
            explanation: '"Break a leg" is a beloved traditional theatrical idiom wishing a performer good luck.',
            moveName: 'Silver Star Kick'
          },
          {
            id: 'bue-2-q3',
            category: 'vocabulary',
            questionText: 'A play or work in theatre, literature, or music presented before an audience is a ______.',
            hint: 'P-e-r-f-o-r-m-a-n-c-e',
            options: ['performance', 'quarantine', 'receipt', 'monument'],
            correctIndex: 0,
            explanation: 'A "performance" is an artistic presentation given for viewers.',
            moveName: 'Obelisk Gust'
          }
        ]
      }
    ]
  },

  // CITY 22: ATHENS, GREECE
  {
    id: 'athens',
    name: 'Athens',
    country: 'Greece',
    coordinates: [37.9838, 23.7275],
    zoom: 14,
    lessonTitle: 'Lesson 22: Greek & Latin Root Words (Bio, Chron, Tele, Graph)',
    lessonGrammarRule: 'Understanding classical prefixes and roots (bio = life, chron = time, tele = distant, graph = write) unlocks the meaning of thousands of English words.',
    welcomeMessage: 'Welcome to Athens (City 22/26)! Walk in the footsteps of ancient philosophers beside the Parthenon and Acropolis.',
    landmarks: ['Acropolis & Parthenon', 'Plaka District', 'Syntagma Square', 'Panathenaic Stadium'],
    stations: [
      {
        id: 'ath-stn-1',
        name: 'Syntagma Metro & Archaeological Exhibit',
        position: [37.9753, 23.7361],
        type: 'subway',
        lines: ['Line 2 Red', 'Line 3 Blue (Airport Link)'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Subway station doubling as an archaeological museum displaying ancient tombs and artifacts.'
      },
      {
        id: 'ath-stn-2',
        name: 'Monastiraki Heritage Station',
        position: [37.9763, 23.7258],
        type: 'train',
        lines: ['Line 1 Green (Historic Piraeus Rail)'],
        icon: '🚅',
        speedMultiplier: 5.0,
        description: 'Ancient square connecting the Acropolis hill to the port of Piraeus.'
      },
      {
        id: 'ath-stn-3',
        name: 'Plaka Dionysiou Areopagitou Tramway',
        position: [37.9698, 23.7297],
        type: 'bus',
        lines: ['Athens Coastal Tramway T6'],
        icon: '🚊',
        speedMultiplier: 2.3,
        description: 'Scenic tramway tracing the promenade beneath marble temple columns.'
      }
    ],
    monsters: [
      {
        id: 'ath-1',
        name: 'MinotaurBronze',
        type: 'Grass',
        level: 38,
        hp: 3,
        maxHp: 3,
        position: [37.9715, 23.7257],
        streetName: 'Dionysiou Areopagitou / Acropolis',
        spriteColor: '#10B981',
        description: 'A bronze-armored bull guardian protecting classical scrolls of wisdom and geometry!',
        avatarIcon: '🐂',
        rarity: 'Common',
        auraColor: '#34D399',
        lessonTopic: 'Greek Roots: Bio & Chron',
        questions: [
          {
            id: 'ath-1-q1',
            category: 'vocabulary',
            questionText: 'The Greek root "bio" means "life". Therefore, "biology" is the scientific study of ______.',
            hint: 'Bio = life; -ology = study of',
            options: ['living organisms and life', 'rocks and minerals', 'outer space stars', 'ancient coins'],
            correctIndex: 0,
            explanation: '"Biology" is the branch of science that studies living organisms.',
            moveName: 'Bronze Horn Charge'
          },
          {
            id: 'ath-1-q2',
            category: 'vocabulary',
            questionText: 'The Greek root "chron" means "time". What does "chronological" order mean?',
            hint: 'Arranged in order of time',
            options: ['Arranged in the order in which events happened over time', 'Arranged by color', 'Arranged from shortest to longest', 'Random order'],
            correctIndex: 0,
            explanation: '"Chronological" means organized according to the timeline of occurrences.',
            moveName: 'Acropolis Shield'
          },
          {
            id: 'ath-1-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a system of government by the whole population through elected representatives?',
            hint: 'D-e-m-o-c-r-a-c-y (invented in Athens)',
            options: ['democracy', 'democrasy', 'demokracy', 'dimocracy'],
            correctIndex: 0,
            explanation: '"Democracy" is spelled D-E-M-O-C-R-A-C-Y.',
            moveName: 'Parthenon Strike'
          }
        ]
      },
      {
        id: 'ath-2',
        name: 'PegasusAegis',
        type: 'Dragon',
        level: 39,
        hp: 4,
        maxHp: 4,
        position: [37.9686, 23.7411],
        streetName: 'Vasileos Konstantinou / Stadium',
        spriteColor: '#8B5CF6',
        description: 'The celestial winged guardian of philosophical reason, draped in golden laurel wreaths!',
        avatarIcon: '👑',
        rarity: 'Legendary',
        auraColor: '#A855F7',
        lessonTopic: 'Greek Roots: Tele, Graph, Phon',
        questions: [
          {
            id: 'ath-2-q1',
            category: 'vocabulary',
            questionText: '"Tele" means "far / distant" and "scope" means "to look". What is a "telescope"?',
            hint: 'Instrument to observe distant stars',
            options: ['An optical instrument used to view distant objects in space', 'A device to record sounds', 'A deep sea diving bell', 'A type of clock'],
            correctIndex: 0,
            explanation: 'A "telescope" gathers light to view distant celestial bodies.',
            moveName: 'Olympian Starlight'
          },
          {
            id: 'ath-2-q2',
            category: 'vocabulary',
            questionText: '"Phon" means "sound". What does a "symphony" mean etymologically?',
            hint: 'Sym (together) + phon (sound)',
            options: ['Sounds harmonizing together in an elaborate musical composition', 'A quiet whispered conversation', 'A broken bell', 'No sound at all'],
            correctIndex: 0,
            explanation: '"Symphony" literally translates from Greek to "concord of sounds playing together".',
            moveName: 'Marble Column Pillar'
          },
          {
            id: 'ath-2-q3',
            category: 'reading',
            questionText: 'Why is Athens revered as the cradle of Western civilization?',
            hint: 'Foundations of democracy, philosophy, mathematics, and dramatic theatre originated here',
            options: ['It pioneered democracy, philosophical inquiry, scientific geometry, and theatre', 'It has the most cars', 'It was the first city on a map', 'No one ever lived there'],
            correctIndex: 0,
            explanation: 'Classical Athens laid foundational keystones for modern philosophy, science, and governance.',
            moveName: 'Aegis Supernova'
          }
        ]
      }
    ]
  },

  // CITY 23: MUMBAI, INDIA
  {
    id: 'mumbai',
    name: 'Mumbai',
    country: 'India',
    coordinates: [18.9220, 72.8347],
    zoom: 14,
    lessonTitle: 'Lesson 23: Inversion for Emphasis (Seldom, Rarely, Never before)',
    lessonGrammarRule: 'Negative and restrictive adverbs trigger auxiliary inversion when placed at the start of a sentence: "Never before have I seen such a vibrant city."',
    welcomeMessage: 'Welcome to Mumbai (City 23/26)! Stand before the Gateway of India and watch Arabian Sea waves crash against Marine Drive.',
    landmarks: ['Gateway of India', 'Marine Drive', 'Chhatrapati Shivaji Maharaj Terminus', 'Colaba Causeway'],
    stations: [
      {
        id: 'bom-stn-1',
        name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
        position: [18.9398, 72.8354],
        type: 'train',
        lines: ['Central Railway', 'Harbour Line', 'Vande Bharat Express'],
        icon: '🚅',
        speedMultiplier: 5.0,
        description: 'UNESCO World Heritage Victorian Gothic railway palace serving millions of daily commuters!'
      },
      {
        id: 'bom-stn-2',
        name: 'Churchgate Western Suburban Terminal',
        position: [18.9322, 72.8267],
        type: 'subway',
        lines: ['Mumbai Suburban Rail Western Line', 'Metro Line 3 Aqua'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Rapid suburban artery and brand-new subterranean metro concourse.'
      },
      {
        id: 'bom-stn-3',
        name: 'Colaba Premier Black-Yellow Cab Hub',
        position: [18.9218, 72.8330],
        type: 'taxi',
        lines: ['Mumbai Padmini & CoolCabs'],
        icon: '🚕',
        speedMultiplier: 2.6,
        description: 'Famous black and yellow taxis navigating the colonial avenues of South Mumbai.'
      }
    ],
    monsters: [
      {
        id: 'bom-1',
        name: 'BengalTigerStriker',
        type: 'Fire',
        level: 39,
        hp: 3,
        maxHp: 3,
        position: [18.9220, 72.8347],
        streetName: 'Apollo Bunder / Gateway of India',
        spriteColor: '#EA580C',
        description: 'A fierce striped royal tiger blazing with sunset courage by the Arabian harbour!',
        avatarIcon: '🐅',
        rarity: 'Rare',
        auraColor: '#F97316',
        lessonTopic: 'Negative Inversion (Never / Seldom)',
        questions: [
          {
            id: 'bom-1-q1',
            category: 'grammar',
            questionText: 'Never before _____ such breathtaking fireworks over the ocean bay!',
            hint: 'Inverted word order: auxiliary verb before subject',
            options: ['have we witnessed', 'we have witnessed', 'we witnessed', 'we did witness'],
            correctIndex: 0,
            explanation: 'When "Never before" starts a sentence, invert subject and auxiliary: "have we witnessed".',
            moveName: 'Royal Bengal Roar'
          },
          {
            id: 'bom-1-q2',
            category: 'grammar',
            questionText: 'Rarely _____ so many talented film artists gather in a single studio.',
            hint: 'Auxiliary "do" precedes plural subject "so many artists"',
            options: ['do', 'are', 'is', 'did be'],
            correctIndex: 0,
            explanation: 'Present simple inversion uses auxiliary "do": "Rarely do so many artists gather".',
            moveName: 'Flame Stripe Pounce'
          },
          {
            id: 'bom-1-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an overwhelming variety or multiplicity?',
            hint: 'D-i-v-e-r-s-i-t-y',
            options: ['diversity', 'deversity', 'divercity', 'diversaty'],
            correctIndex: 0,
            explanation: '"Diversity" is spelled D-I-V-E-R-S-I-T-Y.',
            moveName: 'Arabian Sea Surge'
          }
        ]
      },
      {
        id: 'bom-2',
        name: 'ElephantaColossus',
        type: 'Electric',
        level: 40,
        hp: 4,
        maxHp: 4,
        position: [18.9430, 72.8230],
        streetName: 'Marine Drive Promenade / Queen Necklace',
        spriteColor: '#F59E0B',
        description: 'A massive adorned war elephant radiating golden lightning bolts along the curving shoreline!',
        avatarIcon: '🐘',
        rarity: 'Legendary',
        auraColor: '#FBBF24',
        lessonTopic: 'Inversion with "Not only... but also"',
        questions: [
          {
            id: 'bom-2-q1',
            category: 'grammar',
            questionText: 'Not only _____ master the challenging questions, but she also helped her fellow travelers.',
            hint: 'Inversion in the "Not only" clause with past simple auxiliary "did"',
            options: ['did she', 'she did', 'she was', 'is she'],
            correctIndex: 0,
            explanation: '"Not only did she master..." uses inverted word order for dramatic emphasis.',
            moveName: 'Colossus Thunder Stomp'
          },
          {
            id: 'bom-2-q2',
            category: 'vocabulary',
            questionText: 'The curved sweep of city lights along Marine Drive at night is famously nicknamed the "Queen\'s ______".',
            hint: 'Jewelry worn around the neck',
            options: ['Necklace', 'Crown', 'Ring', 'Slipper'],
            correctIndex: 0,
            explanation: 'The glowing streetlights curving along Back Bay resemble a sparkling pearl necklace.',
            moveName: 'Golden Tusks of Light'
          },
          {
            id: 'bom-2-q3',
            category: 'reading',
            questionText: 'What is the secret behind Mumbai legendary "Dabbawalas" lunchbox delivery system?',
            hint: 'Famed for near-zero error rates using color coding and train networks without computers',
            options: ['Precision coding, teamwork, and bicycle-rail transit achieving a 99.9999% accuracy rate', 'They use jetpacks', 'Everything is delivered by drones', 'They only deliver to one street'],
            correctIndex: 0,
            explanation: 'Dabbawalas deliver over 200,000 warm home-cooked lunches daily with world-famous logistical mastery.',
            moveName: 'Mumbai Electric Storm'
          }
        ]
      }
    ]
  },

  // CITY 24: ISTANBUL, TÜRKIYE
  {
    id: 'istanbul',
    name: 'Istanbul',
    country: 'Türkiye',
    coordinates: [41.0082, 28.9784],
    zoom: 14,
    lessonTitle: 'Lesson 24: Subjunctive Mood & Formal Proposals (Suggest that, Demand that)',
    lessonGrammarRule: 'The subjunctive mood uses the base form of the verb after expressions of recommendation or urgency: "The captain insisted that every traveler be prepared."',
    welcomeMessage: 'Welcome to Istanbul (City 24/26)! Where Europe and Asia meet across the Bosphorus Strait. Explore the Hagia Sophia and Blue Mosque.',
    landmarks: ['Hagia Sophia', 'Blue Mosque', 'Grand Bazaar', 'Galata Tower'],
    stations: [
      {
        id: 'ist-stn-1',
        name: 'Sultanahmet Tramway Concourse',
        position: [41.0064, 28.9760],
        type: 'bus',
        lines: ['T1 Kabataş-Bağcılar Tramway'],
        icon: '🚊',
        speedMultiplier: 2.3,
        description: 'Historic tram gliding past Byzantine domes and rose gardens.'
      },
      {
        id: 'ist-stn-2',
        name: 'Marmaray Sub-Bosphorus Railway',
        position: [41.0152, 28.9778],
        type: 'train',
        lines: ['Marmaray Trans-Continental Rail'],
        icon: '🚅',
        speedMultiplier: 5.0,
        description: 'High-speed rail running inside an undersea tunnel connecting Europe and Asia!'
      },
      {
        id: 'ist-stn-3',
        name: 'Eminönü Ferry Terminal',
        position: [41.0175, 28.9725],
        type: 'subway',
        lines: ['Bosphorus Ferries', 'M2 Golden Horn Metro'],
        icon: '🛳️',
        speedMultiplier: 3.5,
        description: 'Vibrant maritime hub linking two continents across the deep blue strait.'
      }
    ],
    monsters: [
      {
        id: 'ist-1',
        name: 'BosphorusLeviathan',
        type: 'Water',
        level: 40,
        hp: 3,
        maxHp: 3,
        position: [41.0180, 28.9730],
        streetName: 'Galata Bridge / Golden Horn',
        spriteColor: '#0284C7',
        description: 'An ancient azure sea serpent guarding the waterways between two great continents!',
        avatarIcon: '🐉',
        rarity: 'Common',
        auraColor: '#38BDF8',
        lessonTopic: 'Subjunctive with Base Verb',
        questions: [
          {
            id: 'ist-1-q1',
            category: 'grammar',
            questionText: 'The museum curator recommended that the visitor _____ the dome during morning light.',
            hint: 'Subjunctive uses base verb without "-s"',
            options: ['visit', 'visits', 'visited', 'will visit'],
            correctIndex: 0,
            explanation: 'After "recommended that...", formal English uses the base verb: "visit".',
            moveName: 'Bosphorus Tidal Wave'
          },
          {
            id: 'ist-1-q2',
            category: 'vocabulary',
            questionText: 'A narrow passage of water connecting two larger seas or oceans is a ______.',
            hint: 'S-t-r-a-i-t',
            options: ['strait', 'peninsula', 'continent', 'oasis'],
            correctIndex: 0,
            explanation: 'A "strait" is a narrow natural navigable waterway.',
            moveName: 'Azure Current'
          },
          {
            id: 'ist-1-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for a large covered market with numerous stalls?',
            hint: 'B-a-z-a-a-r',
            options: ['bazaar', 'bazar', 'bazzar', 'bazaare'],
            correctIndex: 0,
            explanation: '"Bazaar" is spelled B-A-Z-A-A-R (like the famous Grand Bazaar).',
            moveName: 'Galata Light Flash'
          }
        ]
      },
      {
        id: 'ist-2',
        name: 'ByzantinePhoenix',
        type: 'Fire',
        level: 41,
        hp: 4,
        maxHp: 4,
        position: [41.0086, 28.9802],
        streetName: 'Ayasofya Meydanı / Hagia Sophia',
        spriteColor: '#EF4444',
        description: 'A magnificent golden firebird reborn through centuries of architecture and poetry!',
        avatarIcon: '🦚',
        rarity: 'Legendary',
        auraColor: '#F87171',
        lessonTopic: 'Subjunctive with "be" & Urgency',
        questions: [
          {
            id: 'ist-2-q1',
            category: 'grammar',
            questionText: 'The captain demanded that everyone _____ attentive when crossing the continental boundary.',
            hint: 'Subjunctive form of "to be" is always "be"',
            options: ['be', 'is', 'was', 'are'],
            correctIndex: 0,
            explanation: 'Subjunctive mood after "demanded that" uses the base form "be".',
            moveName: 'Phoenix Solar Flare'
          },
          {
            id: 'ist-2-q2',
            category: 'reading',
            questionText: 'Why is Istanbul geographically famous around the world?',
            hint: 'It is the only metropolis spanning across two continents: Europe and Asia',
            options: ['It uniquely straddles two continents across the Bosphorus Strait', 'It is located under the North Pole', 'It has no water', 'It is built on a comet'],
            correctIndex: 0,
            explanation: 'Istanbul stands as the historic gateway bridging European and Asian civilizations.',
            moveName: 'Imperial Mosaic Shield'
          },
          {
            id: 'ist-2-q3',
            category: 'vocabulary',
            questionText: 'Something of vast historic importance that has stood through ancient centuries is ______.',
            hint: 'M-o-n-u-m-e-n-t-a-l',
            options: ['monumental', 'fragile', 'temporary', 'trivial'],
            correctIndex: 0,
            explanation: '"Monumental" means great in importance, extent, or size.',
            moveName: 'Dome of Eternity'
          }
        ]
      }
    ]
  },

  // CITY 25: KYOTO, JAPAN
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    coordinates: [35.0116, 135.7681],
    zoom: 14,
    lessonTitle: 'Lesson 25: Subtle Connotations & Nuanced Vocabulary',
    lessonGrammarRule: 'Words can share a dictionary definition (denotation) while carrying very different positive, neutral, or negative emotional shades (connotation). E.g. "frugal" (positive) vs "stingy" (negative).',
    welcomeMessage: 'Welcome to Kyoto (City 25/26)! Walk through thousands of vermilion torii gates at Fushimi Inari and serene bamboo groves.',
    landmarks: ['Fushimi Inari Shrine', 'Kinkaku-ji (Golden Pavilion)', 'Arashiyama Bamboo Grove', 'Gion District'],
    stations: [
      {
        id: 'kyo-stn-1',
        name: 'Kyoto Grand Station Concourse',
        position: [34.9858, 135.7588],
        type: 'train',
        lines: ['Tokaido Shinkansen', 'JR Nara Line', 'Karasuma Subway'],
        icon: '🚅',
        speedMultiplier: 5.0,
        description: 'Soaring futuristic glass and steel architectural canyon housing bullet train terminals!'
      },
      {
        id: 'kyo-stn-2',
        name: 'Gion-Shijo Historic Station',
        position: [35.0037, 135.7728],
        type: 'subway',
        lines: ['Keihan Main Line'],
        icon: '🚇',
        speedMultiplier: 3.5,
        description: 'Riverside underground station steps away from tea houses and weeping willows.'
      },
      {
        id: 'kyo-stn-3',
        name: 'Arashiyama Heritage Tram & Rickshaw Stop',
        position: [35.0158, 135.6775],
        type: 'taxi',
        lines: ['Randen Keifuku Tram', 'Traditional Rickshaw'],
        icon: '🛺',
        speedMultiplier: 2.5,
        description: 'Romantic tramway gliding past emerald bamboo forests and temple bells.'
      }
    ],
    monsters: [
      {
        id: 'kyo-1',
        name: 'KitsuneSage',
        type: 'Grass',
        level: 41,
        hp: 3,
        maxHp: 3,
        position: [34.9671, 135.7727],
        streetName: 'Senbon Torii Path / Fushimi Inari',
        spriteColor: '#10B981',
        description: 'A nine-tailed spirit fox holding sacred keys of wisdom among ten thousand red gates!',
        avatarIcon: '🦊',
        rarity: 'Common',
        auraColor: '#34D399',
        lessonTopic: 'Positive vs Negative Connotation',
        questions: [
          {
            id: 'kyo-1-q1',
            category: 'vocabulary',
            questionText: 'Which word has the most positive and admiring connotation for someone who is determined to succeed?',
            hint: 'Shows deep dedication and resolve',
            options: ['resolute', 'stubborn', 'pigheaded', 'obstinate'],
            correctIndex: 0,
            explanation: '"Resolute" has an inspiring, positive connotation of firm, admirable determination.',
            moveName: 'Vermilion Spirit Fire'
          },
          {
            id: 'kyo-1-q2',
            category: 'vocabulary',
            questionText: 'Which word describes a quiet, peaceful, and undisturbed natural garden with the most elegance?',
            hint: 'Tranquil, peaceful',
            options: ['serene', 'dead', 'empty', 'inactive'],
            correctIndex: 0,
            explanation: '"Serene" evokes deep, dignified peace and harmony.',
            moveName: 'Bamboo Leaf Gale'
          },
          {
            id: 'kyo-1-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an ancient proverb or deep saying?',
            hint: 'A-p-h-o-r-i-s-m',
            options: ['aphorism', 'aforism', 'aphoresm', 'aphorizm'],
            correctIndex: 0,
            explanation: '"Aphorism" is spelled A-P-H-O-R-I-S-M.',
            moveName: 'Torii Mirror Barrier'
          }
        ]
      },
      {
        id: 'kyo-2',
        name: 'GoldenKirin',
        type: 'Dragon',
        level: 42,
        hp: 4,
        maxHp: 4,
        position: [35.0394, 135.7292],
        streetName: 'Kinkakuji Mirror Pond Walk',
        spriteColor: '#F59E0B',
        description: 'A mythical celestial dragon-stag draped in shimmering gold leaf reflecting across mirror waters!',
        avatarIcon: '✨',
        rarity: 'Legendary',
        auraColor: '#FBBF24',
        lessonTopic: 'Nuance in Expressive Writing',
        questions: [
          {
            id: 'kyo-2-q1',
            category: 'vocabulary',
            questionText: '"The traveler was deeply curious and eager to learn about world cultures." Which word best fits this positive spirit?',
            hint: 'Inquisitive in a thoughtful, positive way',
            options: ['inquisitive', 'nosy', 'prying', 'intrusive'],
            correctIndex: 0,
            explanation: '"Inquisitive" carries a positive intellectual connotation, unlike "nosy" or "prying".',
            moveName: 'Pavilion Gold Reflection'
          },
          {
            id: 'kyo-2-q2',
            category: 'reading',
            questionText: 'The Japanese aesthetic concept of "Wabi-Sabi" finds beauty in what kinds of things?',
            hint: 'Simplicity, natural aging, and impermanence',
            options: ['Imperfection, natural simplicity, and the peaceful patina of time', 'Expensive plastic toys', 'Flashing billboards', 'Artificial neon gadgets'],
            correctIndex: 0,
            explanation: 'Wabi-sabi celebrates the modest, authentic elegance found in natural transience and imperfection.',
            moveName: 'Celestial Kirin Stride'
          },
          {
            id: 'kyo-2-q3',
            category: 'grammar',
            questionText: 'Having mastered twenty-five global cities, she felt not merely confident, but truly ______ in her speech.',
            hint: 'Expressing high sophistication and eloquence',
            options: ['articulate', 'chatty', 'talkative', 'wordy'],
            correctIndex: 0,
            explanation: '"Articulate" signifies the ability to express ideas clearly and effectively.',
            moveName: 'Imperial Starlight Roar'
          }
        ]
      }
    ]
  },

  // CITY 26: GENEVA, SWITZERLAND (GRAND WORLD CAPITAL)
  {
    id: 'geneva',
    name: 'Geneva',
    country: 'Switzerland',
    coordinates: [46.2044, 6.1432],
    zoom: 14,
    lessonTitle: 'Lesson 26: Grand World English Capstone & Global Diplomacy',
    lessonGrammarRule: 'Grand Master Capstone: Synthesizing clarity, eloquence, diplomatic tact, and international multilingual leadership.',
    welcomeMessage: 'Welcome to Geneva (City 26/26 - GRAND FINALE)! Stand beside the Jet d’Eau on Lake Geneva and the Palace of Nations. Complete the ultimate WordQuest world journey!',
    landmarks: ['Jet d’Eau', 'Palace of Nations (UN)', 'Lake Geneva Promenade', 'St. Pierre Cathedral'],
    stations: [
      {
        id: 'gva-stn-1',
        name: 'Gare de Genève Cornavin Central Terminal',
        position: [46.2104, 6.1425],
        type: 'train',
        lines: ['SBB Swiss Federal Rail', 'TGV Lyria Express', 'Léman Express'],
        icon: '🚅',
        speedMultiplier: 5.0,
        description: 'World-famous Swiss watchmaker precision rail linking Geneva to the Alps and Europe!'
      },
      {
        id: 'gva-stn-2',
        name: 'Nations UN Tramway Concourse',
        position: [46.2238, 6.1394],
        type: 'bus',
        lines: ['TPG Tram Line 15'],
        icon: '🚊',
        speedMultiplier: 2.3,
        description: 'Sleek eco-tram running directly to the Broken Chair and United Nations plaza.'
      },
      {
        id: 'gva-stn-3',
        name: 'Lac Léman Mouette Water Taxi Depot',
        position: [46.2072, 6.1558],
        type: 'taxi',
        lines: ['Les Mouettes Genevoises Yellow Water Buses'],
        icon: '🛥️',
        speedMultiplier: 2.8,
        description: 'Charming yellow water shuttles crossing Lake Geneva beneath the giant water fountain.'
      }
    ],
    monsters: [
      {
        id: 'gva-1',
        name: 'AlpineChronoGryphon',
        type: 'Ice',
        level: 42,
        hp: 3,
        maxHp: 3,
        position: [46.2074, 6.1559],
        streetName: 'Quai Gustave-Ador / Jet d’Eau',
        spriteColor: '#38BDF8',
        description: 'A magnificent silver gryphon with Swiss watch gear plumage perched beside the soaring 140m water fountain!',
        avatarIcon: '🦅',
        rarity: 'Rare',
        auraColor: '#7DD3FC',
        lessonTopic: 'Diplomatic English & Tact',
        questions: [
          {
            id: 'gva-1-q1',
            category: 'grammar',
            questionText: 'Which phrase is the most diplomatic and courteous way to express disagreement in an international summit?',
            hint: 'Gentle, respectful disagreement',
            options: ['I see your point; however, we might consider an alternative approach', 'You are totally wrong', 'That makes no sense', 'Be quiet and listen to me'],
            correctIndex: 0,
            explanation: 'Diplomatic English balances acknowledgment ("I see your point") with polite alternatives.',
            moveName: 'Alpine Water Jet'
          },
          {
            id: 'gva-1-q2',
            category: 'vocabulary',
            questionText: 'The profession or practice of managing international relations through dialogue and peace is ______.',
            hint: 'D-i-p-l-o-m-a-c-y',
            options: ['diplomacy', 'piracy', 'monopoly', 'anarchy'],
            correctIndex: 0,
            explanation: '"Diplomacy" is the art of fostering peaceful negotiation between nations.',
            moveName: 'Precision Chrono Talon'
          },
          {
            id: 'gva-1-q3',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for an official agreement or pact between nations?',
            hint: 'T-r-e-a-t-y',
            options: ['treaty', 'treety', 'treatey', 'treatie'],
            correctIndex: 0,
            explanation: '"Treaty" is spelled T-R-E-A-T-Y.',
            moveName: 'Glacier Shield'
          }
        ]
      },
      {
        id: 'gva-2',
        name: 'AetheriaApex',
        type: 'Dragon',
        level: 45,
        hp: 5,
        maxHp: 5,
        position: [46.2268, 6.1408],
        streetName: 'Avenue de la Paix / Palace of Nations',
        spriteColor: '#7C3AED',
        description: 'THE SUPREME COSMIC SOVEREIGN OF WORLD QUEST! Radiating prismatic auroras of universal literacy and polyglot peace over all nations!',
        avatarIcon: '👑',
        rarity: 'Legendary',
        auraColor: '#C084FC',
        lessonTopic: 'Grand Global Mastery',
        questions: [
          {
            id: 'gva-2-q1',
            category: 'grammar',
            questionText: 'Having journeyed through 26 countries, we can affirm that language _____ bridges between diverse peoples.',
            hint: 'Present tense with singular subject "language"',
            options: ['builds', 'build', 'building', 'are built'],
            correctIndex: 0,
            explanation: '"Language builds bridges" uses the third-person singular present form.',
            moveName: 'Aether Sovereign Flash'
          },
          {
            id: 'gva-2-q2',
            category: 'reading',
            questionText: '"To have another language is to possess a second soul." (Charlemagne)\nWhat is the ultimate gift of learning English and world languages?',
            hint: 'Empathy, global understanding, and connection',
            options: ['Gaining the power to connect, empathize, and collaborate with humanity across the Earth', 'Winning arguments', 'Collecting test scores', 'Buying things faster'],
            correctIndex: 0,
            explanation: 'Language mastery opens hearts, minds, and global friendship across cultures.',
            moveName: 'Cosmic Polyglot Beam'
          },
          {
            id: 'gva-2-q3',
            category: 'vocabulary',
            questionText: 'A person who can speak, read, and write in many different languages fluently is a ______.',
            hint: 'P-o-l-y-g-l-o-t',
            options: ['polyglot', 'monologue', 'geologist', 'solitary'],
            correctIndex: 0,
            explanation: 'A "polyglot" is someone who knows and uses several languages.',
            moveName: 'Summit of Nations Corona'
          },
          {
            id: 'gva-2-q4',
            category: 'spelling',
            questionText: 'Which word is spelled correctly for universal peace and agreement among people?',
            hint: 'H-a-r-m-o-n-y',
            options: ['harmony', 'harmoney', 'harmany', 'harmonee'],
            correctIndex: 0,
            explanation: '"Harmony" is spelled H-A-R-M-O-N-Y.',
            moveName: 'Eternal Grand Master Crown'
          }
        ]
      }
    ]
  }
];
