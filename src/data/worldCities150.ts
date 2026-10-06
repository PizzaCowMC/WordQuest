import { CityData, CityBuilding, CityAirport, Monster, Question, ElementType, MonsterRarity } from '../types';
import { INITIAL_CITIES } from './gameData';
import { getQuestionsForMonster } from './masterQuestionBank';
import { getSpecialMobForCity } from './specialMobs';

export interface WorldCityMeta {
  id: string;
  name: string;
  country: string;
  continent: string;
  coordinates: [number, number];
  zoom: number;
  lessonTitle: string;
  lessonGrammarRule: string;
  welcomeMessage: string;
  landmarks: string[];
  airport: CityAirport;
  buildings: CityBuilding[];
}

// Procedural question templates for rich English learning across the 150 cities
const QUESTION_TEMPLATES = [
  {
    category: 'grammar' as const,
    makeQuestion: (cityName: string) => ({
      questionText: `While exploring the historic streets of ${cityName}, the traveler _____ many friendly local residents.`,
      hint: 'Irregular past tense of "meet": m-e-t',
      options: ['met', 'meeted', 'meet', 'was met'],
      correctIndex: 0,
      explanation: 'The past tense of "meet" is the irregular form "met".',
      moveName: 'Syntax Stride'
    })
  },
  {
    category: 'vocabulary' as const,
    makeQuestion: (cityName: string) => ({
      questionText: `A detailed map or guide that helps travelers find their way through ${cityName} is called an _____.`,
      hint: 'A plan of a journey or route: i-t-i-n-e-r-a-r-y',
      options: ['itinerary', 'index', 'invoice', 'inventory'],
      correctIndex: 0,
      explanation: 'An "itinerary" is a planned route or journey schedule.',
      moveName: 'Lexicon Flash'
    })
  },
  {
    category: 'reading' as const,
    makeQuestion: (cityName: string) => ({
      questionText: `"Every journey begins with a single curious thought." How does travel through ${cityName} expand human understanding?`,
      hint: 'Learning about new cultures fosters empathy and global friendship',
      options: ['It builds empathy, intercultural respect, and practical language skills', 'It teaches people to stay home', 'It only helps you buy souvenirs', 'It makes languages useless'],
      correctIndex: 0,
      explanation: 'Exploring world cultures and practicing language builds deep empathy and communication mastery.',
      moveName: 'Global Empathy Ray'
    })
  },
  {
    category: 'spelling' as const,
    makeQuestion: (cityName: string) => ({
      questionText: `Which word is spelled correctly for an unforgettable experience exploring ${cityName}?`,
      hint: 'A-d-v-e-n-t-u-r-e',
      options: ['adventure', 'adventur', 'adventcher', 'advenchure'],
      correctIndex: 0,
      explanation: '"Adventure" is spelled A-D-V-E-N-T-U-R-E.',
      moveName: 'True Orthography'
    })
  },
  {
    category: 'grammar' as const,
    makeQuestion: (cityName: string) => ({
      questionText: `If you visit ${cityName} next spring, you _____ the famous seasonal street festival.`,
      hint: 'First conditional: will + base verb',
      options: ['will enjoy', 'would enjoy', 'enjoyed', 'have enjoyed'],
      correctIndex: 0,
      explanation: 'First conditional uses "If + present simple, will + base verb" for real future possibilities.',
      moveName: 'Conditional Wave'
    })
  },
  {
    category: 'vocabulary' as const,
    makeQuestion: (cityName: string) => ({
      questionText: `A historic monument that honors an important person or event in ${cityName} is a _____.`,
      hint: 'M-e-m-o-r-i-a-l',
      options: ['memorial', 'mineral', 'mammal', 'melody'],
      correctIndex: 0,
      explanation: 'A "memorial" is a monument or statue designed to preserve the memory of an event or person.',
      moveName: 'Monolith Resonance'
    })
  }
];

const MOB_AVATARS: Record<ElementType, string[]> = {
  Electric: ['🐹', '🦊', '🐱', '🐶', '🐿️'],
  Fire: ['🦊', '🐶', '🐱', '🦎', '🐼'],
  Water: ['🦭', '🦦', '🐬', '🐧', '🐳'],
  Grass: ['🐰', '🦝', '🐿️', '🦌', '🦔'],
  Wind: ['🦉', '🐥', '🕊️', '🐿️', '🦊'],
  Psychic: ['🐱', '🐰', '🦊', '🦉', '🦄'],
  Ice: ['🐻‍❄️', '🐧', '🦭', '🐰', '🦊'],
  Dragon: ['🐲', '🦎', '🦕', '🐢', '🐊'],
  Fairy: ['🦄', '🐰', '🐱', '🧸', '🐶']
};

const ELEMENT_COLORS: Record<ElementType, { sprite: string; aura: string }> = {
  Electric: { sprite: '#F59E0B', aura: '#FBBF24' },
  Fire: { sprite: '#EF4444', aura: '#F87171' },
  Water: { sprite: '#0284C7', aura: '#38BDF8' },
  Grass: { sprite: '#10B981', aura: '#34D399' },
  Wind: { sprite: '#6366F1', aura: '#818CF8' },
  Psychic: { sprite: '#8B5CF6', aura: '#C084FC' },
  Ice: { sprite: '#0EA5E9', aura: '#7DD3FC' },
  Dragon: { sprite: '#7C3AED', aura: '#A78BFA' },
  Fairy: { sprite: '#EC4899', aura: '#F472B6' }
};

const ELEMENT_LIST: ElementType[] = ['Electric', 'Fire', 'Water', 'Grass', 'Wind', 'Psychic', 'Ice', 'Dragon', 'Fairy'];

// Raw catalogue of 150 iconic world cities
export const RAW_150_CITIES_DATA: {
  id: string;
  name: string;
  country: string;
  continent: string;
  coords: [number, number];
  airport: { code: string; name: string };
  buildings: { name: string; type: CityBuilding['type']; icon: string; fact: string; offset: [number, number] }[];
  lessonTitle: string;
  rule: string;
}[] = [
  // 1-36: Flagship Metropolises (London through Prague)
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    continent: 'Europe',
    coords: [51.5074, -0.1278],
    airport: { code: 'LHR', name: 'London Heathrow International Airport' },
    buildings: [
      { name: 'British Museum', type: 'museum', icon: '🏛️', fact: 'Founded in 1753, housing 8 million historical treasures including the Rosetta Stone.', offset: [0.012, 0.001] },
      { name: 'Tower of London & Crown Jewels', type: 'castle', icon: '🏰', fact: 'Medieval stone fortress and historic royal prison founded in 1066 by William the Conqueror.', offset: [0.001, 0.052] },
      { name: 'St. Paul’s Cathedral', type: 'cathedral', icon: '⛪', fact: 'Iconic dome cathedral designed by Sir Christopher Wren after the Great Fire of London.', offset: [0.006, 0.029] },
      { name: 'Westminster Palace & Big Ben', type: 'tower', icon: '🕰️', fact: 'Neo-Gothic seat of the British Parliament and world-famous clock tower.', offset: [-0.007, 0.003] }
    ],
    lessonTitle: 'Lesson 1: Present Simple & Past Irregular Verbs',
    rule: 'Use present simple for permanent truths and routines; use irregular forms (go/went, see/saw) for past events.'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    continent: 'Asia',
    coords: [35.6762, 139.6503],
    airport: { code: 'HND', name: 'Tokyo Haneda International Airport' },
    buildings: [
      { name: 'Tokyo Skytree', type: 'tower', icon: '🗼', fact: 'Standing 634 meters tall, it is the tallest freestanding broadcasting tower in the world.', offset: [0.034, 0.160] },
      { name: 'Sensō-ji Ancient Temple', type: 'palace', icon: '⛩️', fact: 'Tokyo’s oldest Buddhist temple founded in 645 AD in the historic Asakusa district.', offset: [0.038, 0.146] },
      { name: 'Tokyo National Museum', type: 'museum', icon: '🏛️', fact: 'Japan’s oldest national museum in Ueno Park preserving master samurai blades and calligraphy.', offset: [0.042, 0.126] },
      { name: 'Meiji Jingu Sacred Shrine', type: 'monument', icon: '🌲', fact: 'Tranquil Shinto shrine nestled inside a 170-acre handcrafted evergreen forest.', offset: [0.000, 0.049] }
    ],
    lessonTitle: 'Lesson 2: Daily Action Verbs & Time Prepositions',
    rule: 'Use "at" for clock times (at 3:00), "in" for months/years (in July), and "on" for days (on Monday).'
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    continent: 'Europe',
    coords: [48.8566, 2.3522],
    airport: { code: 'CDG', name: 'Paris Charles de Gaulle International Airport' },
    buildings: [
      { name: 'Louvre Palace Museum', type: 'museum', icon: '🏛️', fact: 'The world’s most visited museum, displaying Leonardo da Vinci’s Mona Lisa and the Venus de Milo.', offset: [0.004, -0.015] },
      { name: 'Eiffel Tower', type: 'tower', icon: '🗼', fact: 'Built by Gustave Eiffel for the 1889 World’s Fair, standing 330 meters over the Champ de Mars.', offset: [0.002, -0.054] },
      { name: 'Notre-Dame Cathedral', type: 'cathedral', icon: '⛪', fact: 'Masterpiece of French Gothic architecture on the Île de la Cité dating back to 1163.', offset: [-0.003, -0.002] },
      { name: 'Palais Garnier Opera House', type: 'theater', icon: '🎭', fact: 'Opulent 19th-century opera house that inspired The Phantom of the Opera.', offset: [0.015, -0.021] }
    ],
    lessonTitle: 'Lesson 3: Definite & Indefinite Articles',
    rule: 'Use "a" before consonant sounds and "an" before vowel sounds. Use "the" when identifying specific nouns.'
  },
  {
    id: 'newyork',
    name: 'New York',
    country: 'United States',
    continent: 'North America',
    coords: [40.7128, -74.0060],
    airport: { code: 'JFK', name: 'John F. Kennedy International Airport' },
    buildings: [
      { name: 'Empire State Building', type: 'tower', icon: '🏢', fact: 'Iconic 102-story Art Deco skyscraper completed in 1931 at Fifth Avenue and 34th Street.', offset: [0.035, 0.019] },
      { name: 'Metropolitan Museum of Art', type: 'museum', icon: '🏛️', fact: 'The largest art museum in the Americas, housing over two million historical works.', offset: [0.066, 0.043] },
      { name: 'One World Trade Center', type: 'tower', icon: '🏙️', fact: 'The tallest building in the Western Hemisphere, soaring to a symbolic height of 1,776 feet.', offset: [0.001, -0.007] },
      { name: 'Statue of Liberty National Monument', type: 'monument', icon: '🗽', fact: 'A colossal neoclassical sculpture gifted by France in 1886 to symbolize universal freedom.', offset: [-0.023, -0.034] }
    ],
    lessonTitle: 'Lesson 4: Spatial Prepositions & City Navigation',
    rule: 'Use between (two items), behind (in the rear), next to (beside), and across from (opposite side of the street).'
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    continent: 'Europe',
    coords: [41.9028, 12.4964],
    airport: { code: 'FCO', name: 'Rome Leonardo da Vinci Fiumicino Airport' },
    buildings: [
      { name: 'Roman Colosseum', type: 'monument', icon: '🏟️', fact: 'The largest ancient amphitheatre ever built, constructed of travertine limestone in 72 AD.', offset: [-0.013, -0.004] },
      { name: 'Pantheon Temple of the Gods', type: 'cathedral', icon: '🏛️', fact: 'Built by Emperor Hadrian with the world’s largest unreinforced concrete dome.', offset: [-0.005, -0.021] },
      { name: 'Castel Sant’Angelo', type: 'castle', icon: '🏰', fact: 'Cylindrical mausoleum commissioned by Roman Emperor Hadrian on the Tiber River.', offset: [0.001, -0.030] },
      { name: 'Vatican St. Peter’s Basilica', type: 'cathedral', icon: '⛪', fact: 'Renowned Renaissance church designed by Michelangelo, Donato Bramante, and Bernini.', offset: [0.000, -0.044] }
    ],
    lessonTitle: 'Lesson 5: Historic Past Continuous Tense',
    rule: 'Use "was/were + verb-ing" to describe actions in progress in the past when another event occurred.'
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    continent: 'Oceania',
    coords: [-33.8688, 151.2093],
    airport: { code: 'SYD', name: 'Sydney Kingsford Smith Airport' },
    buildings: [
      { name: 'Sydney Opera House', type: 'theater', icon: '🎭', fact: 'Multi-venue performing arts centre designed by Danish architect Jørn Utzon with iconic sail shells.', offset: [0.012, 0.006] },
      { name: 'Sydney Harbour Bridge', type: 'monument', icon: '🌉', fact: 'Heritage-listed steel arch bridge affectionately nicknamed "The Coathanger" by locals.', offset: [0.017, 0.001] },
      { name: 'Australian National Maritime Museum', type: 'museum', icon: '⚓', fact: 'Waterfront museum in Darling Harbour showcasing tall ships, submarines, and Polynesian voyagers.', offset: [0.001, -0.010] },
      { name: 'Sydney Tower Eye', type: 'tower', icon: '🗼', fact: 'The city’s tallest structure, offering 360-degree views stretching to the Blue Mountains.', offset: [-0.002, 0.000] }
    ],
    lessonTitle: 'Lesson 6: Comparatives & Superlatives',
    rule: 'Short adjectives take -er/-est (faster, fastest); longer adjectives take more/most (more famous, most beautiful).'
  },
  {
    id: 'cairo',
    name: 'Cairo',
    country: 'Egypt',
    continent: 'Africa',
    coords: [30.0444, 31.2357],
    airport: { code: 'CAI', name: 'Cairo International Airport' },
    buildings: [
      { name: 'Great Pyramid of Giza & Sphinx', type: 'monument', icon: '🔺', fact: 'The oldest of the Seven Wonders of the Ancient World, constructed over 4,500 years ago.', offset: [-0.069, -0.098] },
      { name: 'Grand Egyptian Museum', type: 'museum', icon: '🏛️', fact: 'The largest archaeological museum complex in the world dedicated to ancient Egyptian civilization.', offset: [-0.053, -0.088] },
      { name: 'Saladin Citadel of Cairo', type: 'castle', icon: '🏰', fact: 'Medieval Islamic fortification located on Mokattam hill with panoramic vistas across Cairo.', offset: [-0.015, 0.024] },
      { name: 'Cairo Tower', type: 'tower', icon: '🗼', fact: 'Lotus-inspired 187-meter tower on Gezira Island offering views across the River Nile.', offset: [0.001, -0.021] }
    ],
    lessonTitle: 'Lesson 7: Future Intentions ("Will" vs "Going To")',
    rule: 'Use "going to" for planned decisions and "will" for spontaneous offers or confident predictions.'
  },
  {
    id: 'rio',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    continent: 'South America',
    coords: [-22.9068, -43.1729],
    airport: { code: 'GIG', name: 'Rio de Janeiro Galeão International Airport' },
    buildings: [
      { name: 'Christ the Redeemer on Corcovado', type: 'monument', icon: '🗿', fact: '30-meter Art Deco statue atop the 700-meter Corcovado mountain overlooking Guanabara Bay.', offset: [-0.044, -0.033] },
      { name: 'Sugarloaf Mountain Cableway', type: 'tower', icon: '🚡', fact: 'Panoramic granite peak jutting out of Guanabara Bay accessed by glass bubble cable cars.', offset: [-0.042, 0.018] },
      { name: 'Museum of Tomorrow (Museu do Amanhã)', type: 'museum', icon: '🏛️', fact: 'Futuristic science museum designed by Santiago Calatrava on the revitalized Mauá Pier.', offset: [0.012, 0.008] },
      { name: 'Maracanã Stadium', type: 'monument', icon: '⚽', fact: 'Cathedral of Brazilian football and host venue for two historic FIFA World Cup finals.', offset: [-0.015, -0.056] }
    ],
    lessonTitle: 'Lesson 8: Modal Verbs (Can, Must, Should)',
    rule: '"Can" expresses ability, "must" expresses necessity/obligation, and "should" gives friendly advice.'
  },
  {
    id: 'seoul',
    name: 'Seoul',
    country: 'South Korea',
    continent: 'Asia',
    coords: [37.5665, 126.9780],
    airport: { code: 'ICN', name: 'Incheon International Airport' },
    buildings: [
      { name: 'Gyeongbokgung Grand Palace', type: 'palace', icon: '🏯', fact: 'The main royal palace of the Joseon dynasty built in 1395 with dramatic Geunjeongjeon throne hall.', offset: [0.013, -0.001] },
      { name: 'N Seoul Tower on Namsan', type: 'tower', icon: '🗼', fact: 'Iconic communications tower atop Namsan Mountain offering 360-degree views of the metropolis.', offset: [-0.015, 0.010] },
      { name: 'Dongdaemun Design Plaza (DDP)', type: 'museum', icon: '🛸', fact: 'Curved neo-futuristic landmark designed by Zaha Hadid featuring undulating aluminum panels.', offset: [0.000, 0.031] },
      { name: 'National Museum of Korea', type: 'museum', icon: '🏛️', fact: 'The flagship museum of Korean history and art, housing national treasures and golden crowns.', offset: [-0.043, -0.004] }
    ],
    lessonTitle: 'Lesson 9: Phrasal Verbs & Modern Tech Idioms',
    rule: 'Phrasal verbs combine a verb with a particle (turn on, look up, figure out) creating transformative meanings.'
  },
  {
    id: 'honolulu',
    name: 'Honolulu',
    country: 'United States',
    continent: 'Oceania',
    coords: [21.3069, -157.8583],
    airport: { code: 'HNL', name: 'Daniel K. Inouye International Airport' },
    buildings: [
      { name: 'Diamond Head State Monument', type: 'monument', icon: '🌋', fact: 'Volcanic tuff cone formed 300,000 years ago during the Honolulu volcanic eruption phase.', offset: [-0.044, 0.051] },
      { name: 'ʻIolani Palace', type: 'palace', icon: '👑', fact: 'The only royal palace in the United States, residence of Hawaiian monarchs King Kalākaua and Queen Liliʻuokalani.', offset: [-0.001, -0.001] },
      { name: 'Bishop Museum of Polynesian Heritage', type: 'museum', icon: '🏛️', fact: 'Founded in 1889, housing the world’s largest collection of Polynesian cultural artifacts.', offset: [0.026, -0.012] },
      { name: 'Aloha Tower', type: 'tower', icon: '🚢', fact: 'Lighthouse tower built in 1926 that greeted hundreds of passenger liners entering Honolulu Harbor.', offset: [-0.002, -0.008] }
    ],
    lessonTitle: 'Lesson 10: Present Perfect Tense',
    rule: 'Use "have/has + past participle" to link past experiences with the present moment.'
  },
  {
    id: 'dublin',
    name: 'Dublin',
    country: 'Ireland',
    continent: 'Europe',
    coords: [53.3498, -6.2603],
    airport: { code: 'DUB', name: 'Dublin International Airport' },
    buildings: [
      { name: 'Trinity College & Book of Kells', type: 'library', icon: '📚', fact: 'Ireland’s oldest university, housing the illuminated 9th-century gospel manuscript Book of Kells.', offset: [-0.006, 0.003] },
      { name: 'Dublin Castle', type: 'castle', icon: '🏰', fact: 'Historic seat of government in Ireland founded in 1204 by King John of England.', offset: [-0.007, -0.007] },
      { name: 'Christ Church Cathedral', type: 'cathedral', icon: '⛪', fact: 'Dublin’s oldest building founded in 1030 by Norse King Sitric Silkenbeard.', offset: [-0.006, -0.012] },
      { name: 'Kilmainham Gaol Heritage Museum', type: 'museum', icon: '🏛️', fact: 'Historic former prison where leaders of the 1916 Easter Rising were held and memorialized.', offset: [-0.008, -0.040] }
    ],
    lessonTitle: 'Lesson 11: Irish Literature & Prepositions of Movement',
    rule: 'Use "across", "along", and "within" to express spatial movement along city landmarks.'
  },
  {
    id: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    continent: 'Europe',
    coords: [52.5200, 13.4050],
    airport: { code: 'BER', name: 'Berlin Brandenburg Airport' },
    buildings: [
      { name: 'Brandenburg Gate', type: 'monument', icon: '🏛️', fact: '18th-century neoclassical monument and universal symbol of European unity and peace.', offset: [-0.004, -0.027] },
      { name: 'Reichstag Glass Dome', type: 'tower', icon: '🗳️', fact: 'Seat of the German Bundestag featuring Sir Norman Foster’s transparent energy-saving glass dome.', offset: [-0.001, -0.029] },
      { name: 'Museum Island Complex (Pergamon)', type: 'museum', icon: '🏛️', fact: 'UNESCO World Heritage complex on the Spree river housing five world-renowned museums.', offset: [0.000, -0.009] },
      { name: 'Berlin TV Tower (Fernsehturm)', type: 'tower', icon: '🗼', fact: 'Standing 368 meters at Alexanderplatz, it is the tallest structure in Germany.', offset: [0.002, 0.008] }
    ],
    lessonTitle: 'Lesson 12: Passive Voice Formations',
    rule: 'Use "Subject + be + past participle" to focus on the action rather than who performed it.'
  },
  // Toronto to Prague (Flagships 13-36)
  {
    id: 'toronto',
    name: 'Toronto',
    country: 'Canada',
    continent: 'North America',
    coords: [43.6532, -79.3832],
    airport: { code: 'YYZ', name: 'Toronto Pearson International Airport' },
    buildings: [
      { name: 'CN Tower', type: 'tower', icon: '🗼', fact: '553-meter communication tower holding the world record for tallest freestanding structure for 32 years.', offset: [-0.011, -0.004] },
      { name: 'Royal Ontario Museum (ROM)', type: 'museum', icon: '🏛️', fact: 'Canada’s largest museum of world cultures and natural history with the Crystal facade.', offset: [0.015, 0.010] },
      { name: 'Casa Loma Gothic Castle', type: 'castle', icon: '🏰', fact: 'Gothic Revival style mansion and garden in midtown Toronto built in 1914.', offset: [0.025, 0.023] }
    ],
    lessonTitle: 'Lesson 13: Gerunds vs Infinitives',
    rule: 'Certain verbs take gerunds (enjoy doing) while others take infinitives (hope to see).'
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    continent: 'Europe',
    coords: [52.3676, 4.9041],
    airport: { code: 'AMS', name: 'Amsterdam Schiphol Airport' },
    buildings: [
      { name: 'Rijksmuseum Palace', type: 'museum', icon: '🏛️', fact: 'Dutch national museum dedicated to arts and history, displaying Rembrandt’s The Night Watch.', offset: [-0.008, -0.019] },
      { name: 'Royal Palace Amsterdam', type: 'palace', icon: '👑', fact: 'Classical 17th-century town hall on Dam Square built during the Dutch Golden Age.', offset: [0.006, -0.013] },
      { name: 'Van Gogh Museum', type: 'museum', icon: '🎨', fact: 'Houses the world’s largest collection of paintings and drawings by Vincent van Gogh.', offset: [-0.010, -0.023] }
    ],
    lessonTitle: 'Lesson 14: Relative Pronouns & Clauses',
    rule: 'Use "who" for people, "which" for things, "where" for places, and "whose" for possession.'
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    continent: 'Asia',
    coords: [25.2048, 55.2708],
    airport: { code: 'DXB', name: 'Dubai International Airport' },
    buildings: [
      { name: 'Burj Khalifa', type: 'tower', icon: '🏙️', fact: 'The tallest skyscraper and structure on Earth, soaring 828 meters over downtown Dubai.', offset: [-0.007, 0.003] },
      { name: 'Museum of the Future', type: 'museum', icon: '🛸', fact: 'Torus-shaped architectural wonder adorned with Arabic calligraphy poetry.', offset: [0.018, 0.013] },
      { name: 'Dubai Frame Monument', type: 'monument', icon: '🖼️', fact: '150-meter-tall golden picture frame framing old and new Dubai.', offset: [0.031, 0.033] }
    ],
    lessonTitle: 'Lesson 15: Third Conditional Formations',
    rule: 'Use "If + had + past participle, would have + past participle" for unreal past situations.'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    continent: 'Asia',
    coords: [1.2868, 103.8545],
    airport: { code: 'SIN', name: 'Singapore Changi Airport' },
    buildings: [
      { name: 'Marina Bay Sands SkyPark', type: 'tower', icon: '🏨', fact: 'Integrated resort with three cascading towers topped by a cantilevered 340-meter SkyPark.', offset: [-0.003, 0.006] },
      { name: 'Gardens by the Bay Flower Dome', type: 'observatory', icon: '🌺', fact: 'The largest glass greenhouse in the world displaying Mediterranean plants and baobabs.', offset: [-0.005, 0.009] },
      { name: 'National Gallery Singapore', type: 'museum', icon: '🏛️', fact: 'Visual arts museum in the former Supreme Court and City Hall buildings.', offset: [0.003, -0.003] }
    ],
    lessonTitle: 'Lesson 27: Future Perfect & Continuous',
    rule: 'Future Perfect ("will have done") shows completed milestones; Future Continuous ("will be doing") shows ongoing future actions.'
  },
  {
    id: 'mexicocity',
    name: 'Mexico City',
    country: 'Mexico',
    continent: 'North America',
    coords: [19.4326, -99.1332],
    airport: { code: 'MEX', name: 'Mexico City Benito Juárez International Airport' },
    buildings: [
      { name: 'Palacio de Bellas Artes', type: 'theater', icon: '🎭', fact: 'Art Nouveau and Art Deco palace of fine arts celebrated for murals by Diego Rivera.', offset: [0.003, -0.008] },
      { name: 'Chapultepec Castle', type: 'castle', icon: '🏰', fact: 'The only royal castle in North America, once home to Emperor Maximilian I.', offset: [-0.012, -0.048] },
      { name: 'National Museum of Anthropology', type: 'museum', icon: '🏛️', fact: 'World-renowned museum housing the original Aztec Sunstone and Mayan jade masks.', offset: [-0.007, -0.053] }
    ],
    lessonTitle: 'Lesson 28: Mixed Conditionals & Hypotheses',
    rule: 'Mixed conditionals connect past causes with present outcomes or ongoing traits with past results.'
  },
  {
    id: 'vancouver',
    name: 'Vancouver',
    country: 'Canada',
    continent: 'North America',
    coords: [49.2827, -123.1207],
    airport: { code: 'YVR', name: 'Vancouver International Airport' },
    buildings: [
      { name: 'Gastown Steam Clock', type: 'tower', icon: '🕰️', fact: 'Harnesses underground steam vents to whistle Westminster chimes on the quarter-hour.', offset: [0.001, 0.011] },
      { name: 'Canada Place & Convention Centre', type: 'monument', icon: '⛵', fact: 'Promenade designed to resemble giant sailing vessel sails overlooking Burrard Inlet.', offset: [0.005, -0.009] },
      { name: 'Vancouver Art Gallery', type: 'museum', icon: '🏛️', fact: 'Housed in the historic neoclassical former provincial courthouse on Robson Square.', offset: [-0.001, -0.001] }
    ],
    lessonTitle: 'Lesson 29: Subjunctive Mood in Formal Proposals',
    rule: 'Use base verb forms after recommendation verbs: "It is crucial that he be (not is) prepared."'
  },
  {
    id: 'stockholm',
    name: 'Stockholm',
    country: 'Sweden',
    continent: 'Europe',
    coords: [59.3293, 18.0686],
    airport: { code: 'ARN', name: 'Stockholm Arlanda Airport' },
    buildings: [
      { name: 'Stockholm Royal Palace', type: 'palace', icon: '👑', fact: 'Baroque palace with over 600 rooms, official residence of the Swedish monarch in Gamla Stan.', offset: [-0.003, 0.003] },
      { name: 'Vasa Museum', type: 'museum', icon: '⛵', fact: 'Houses the salvaged 17th-century warship Vasa, preserved almost 100% intact since 1628.', offset: [-0.002, 0.022] },
      { name: 'Stockholm City Hall (Stadshuset)', type: 'tower', icon: '🏛️', fact: 'Home of the annual Nobel Prize banquet in the Blue Hall with its 106-meter tower.', offset: [-0.001, -0.016] }
    ],
    lessonTitle: 'Lesson 30: Advanced Discourse Markers',
    rule: 'Use "Furthermore" to add emphasis, "Nevertheless" for sophisticated contrast, and "Consequently" for outcomes.'
  },
  {
    id: 'nairobi',
    name: 'Nairobi',
    country: 'Kenya',
    continent: 'Africa',
    coords: [-1.2921, 36.8219],
    airport: { code: 'NBO', name: 'Jomo Kenyatta International Airport' },
    buildings: [
      { name: 'Kenyatta International Convention Centre (KICC)', type: 'tower', icon: '🗼', fact: '28-story cylinder tower topped by a saucer helipad with panoramic views of the national park.', offset: [0.004, 0.001] },
      { name: 'Nairobi National Museum', type: 'museum', icon: '🏛️', fact: 'Preserves early human hominid fossils discovered in the Great Rift Valley.', offset: [0.017, -0.007] },
      { name: 'Karen Blixen Museum', type: 'museum', icon: '🏡', fact: 'Historic farmhouse at the foot of the Ngong Hills where Out of Africa was written.', offset: [-0.061, -0.118] }
    ],
    lessonTitle: 'Lesson 31: Three-Word Phrasal Verbs',
    rule: 'Master non-separable combinations like "look forward to", "run out of", and "put up with".'
  },
  {
    id: 'vienna',
    name: 'Vienna',
    country: 'Austria',
    continent: 'Europe',
    coords: [48.2082, 16.3738],
    airport: { code: 'VIE', name: 'Vienna International Airport' },
    buildings: [
      { name: 'St. Stephen’s Cathedral (Stephansdom)', type: 'cathedral', icon: '⛪', fact: 'Gothic masterpiece with a 136-meter south tower and multi-colored tiled roof.', offset: [0.000, -0.001] },
      { name: 'Hofburg Imperial Palace', type: 'palace', icon: '👑', fact: 'Seat of the Habsburg dynasty for six centuries, now housing the Austrian National Library.', offset: [-0.003, -0.009] },
      { name: 'Schönbrunn Palace', type: 'palace', icon: '🏰', fact: '1,441-room Baroque summer residence of Habsburg monarchs and Empress Sisi.', offset: [-0.022, -0.071] }
    ],
    lessonTitle: 'Lesson 32: Inversion for Rhetorical Emphasis',
    rule: 'Use inverted word order: "Not only did he compose symphonies, but he also redefined classical opera."'
  },
  {
    id: 'lima',
    name: 'Lima',
    country: 'Peru',
    continent: 'South America',
    coords: [-12.0464, -77.0428],
    airport: { code: 'LIM', name: 'Jorge Chávez International Airport' },
    buildings: [
      { name: 'Huaca Pucllana Adobe Pyramid', type: 'monument', icon: '🏛️', fact: 'Ancient mud-brick pyramid built by the Lima culture around 500 AD.', offset: [-0.065, 0.009] },
      { name: 'Plaza Mayor & Government Palace', type: 'palace', icon: '👑', fact: 'Historic birthplace of Lima founded by Francisco Pizarro in 1535.', offset: [0.001, 0.012] },
      { name: 'Larco Museum of Pre-Columbian Art', type: 'museum', icon: '🏺', fact: '18th-century royal mansion displaying 5,000 years of ancient Peruvian golden jewelry.', offset: [-0.025, -0.031] }
    ],
    lessonTitle: 'Lesson 33: Academic Passive Voice Reporting',
    rule: 'Use "It is reported that..." and "is widely believed to be..." for objective scholarly reporting.'
  },
  {
    id: 'auckland',
    name: 'Auckland',
    country: 'New Zealand',
    continent: 'Oceania',
    coords: [-36.8485, 174.7633],
    airport: { code: 'AKL', name: 'Auckland Airport' },
    buildings: [
      { name: 'Sky Tower Auckland', type: 'tower', icon: '🗼', fact: '328-meter telecommunications tower, the tallest freestanding structure in the Southern Hemisphere.', offset: [0.000, -0.001] },
      { name: 'Auckland War Memorial Museum', type: 'museum', icon: '🏛️', fact: 'Neoclassical monument in the Auckland Domain housing sacred Māori taonga treasures.', offset: [-0.012, 0.014] },
      { name: 'Auckland Art Gallery Toi o Tāmaki', type: 'museum', icon: '🎨', fact: 'New Zealand’s leading visual arts institution with over 17,000 national works.', offset: [-0.004, 0.003] }
    ],
    lessonTitle: 'Lesson 34: Participle Clauses & Reduced Relatives',
    rule: 'Use present participles ("Walking along the harbour...") and past participles ("Carved from kauri wood...") to streamline prose.'
  },
  {
    id: 'taipei',
    name: 'Taipei',
    country: 'Taiwan',
    continent: 'Asia',
    coords: [25.0330, 121.5654],
    airport: { code: 'TPE', name: 'Taiwan Taoyuan International Airport' },
    buildings: [
      { name: 'Taipei 101', type: 'tower', icon: '🏙️', fact: '508-meter bamboo-tiered skyscraper equipped with a 660-tonne tuned mass damper sphere.', offset: [0.001, -0.001] },
      { name: 'National Palace Museum', type: 'museum', icon: '🏛️', fact: 'Houses one of the world’s largest collections of nearly 700,000 pieces of imperial Chinese artifacts.', offset: [0.069, -0.011] },
      { name: 'Chiang Kai-shek Memorial Hall', type: 'monument', icon: '🏛️', fact: 'Octagonal blue-roofed memorial monument situated in Liberty Square.', offset: [0.002, -0.044] }
    ],
    lessonTitle: 'Lesson 35: Modal Verbs of Deduction',
    rule: 'Use "must have been" for past certainty, "can\'t have been" for impossibility, and "might have" for possibilities.'
  },
  {
    id: 'prague',
    name: 'Prague',
    country: 'Czech Republic',
    continent: 'Europe',
    coords: [50.0755, 14.4378],
    airport: { code: 'PRG', name: 'Václav Havel Airport Prague' },
    buildings: [
      { name: 'Charles Bridge (Karlův most)', type: 'monument', icon: '🌉', fact: 'Medieval stone arch bridge built by King Charles IV in 1357 adorned with 30 baroque statues.', offset: [0.011, -0.027] },
      { name: 'Prague Astronomical Clock (Orloj)', type: 'tower', icon: '🕰️', fact: 'Mounted on the Old Town City Hall since 1410, it is the oldest operating astronomical clock in the world.', offset: [0.012, -0.018] },
      { name: 'Prague Castle & St. Vitus Cathedral', type: 'castle', icon: '🏰', fact: 'According to Guinness, the largest ancient castle complex in the world covering 70,000 square meters.', offset: [0.015, -0.038] }
    ],
    lessonTitle: 'Lesson 36: Metaphors & Figurative Mastery',
    rule: 'Synthesize expressive literary techniques, vivid metaphors, personification, and idiomatic fluency.'
  }
];

// Additional 114 world cities generated systematically to complete the 150-city roster
const ADDITIONAL_METROS_INFO = [
  { id: 'madrid', name: 'Madrid', country: 'Spain', continent: 'Europe', coords: [40.4168, -3.7038], code: 'MAD', airportName: 'Adolfo Suárez Madrid-Barajas Airport' },
  { id: 'lisbon', name: 'Lisbon', country: 'Portugal', continent: 'Europe', coords: [38.7223, -9.1393], code: 'LIS', airportName: 'Lisbon Humberto Delgado Airport' },
  { id: 'edinburgh', name: 'Edinburgh', country: 'Scotland', continent: 'Europe', coords: [55.9533, -3.1883], code: 'EDI', airportName: 'Edinburgh Airport' },
  { id: 'oslo', name: 'Oslo', country: 'Norway', continent: 'Europe', coords: [59.9139, 10.7522], code: 'OSL', airportName: 'Oslo Gardermoen Airport' },
  { id: 'copenhagen', name: 'Copenhagen', country: 'Denmark', continent: 'Europe', coords: [55.6761, 12.5683], code: 'CPH', airportName: 'Copenhagen Kastrup Airport' },
  { id: 'helsinki', name: 'Helsinki', country: 'Finland', continent: 'Europe', coords: [60.1699, 24.9384], code: 'HEL', airportName: 'Helsinki-Vantaa Airport' },
  { id: 'warsaw', name: 'Warsaw', country: 'Poland', continent: 'Europe', coords: [52.2297, 21.0122], code: 'WAW', airportName: 'Warsaw Chopin Airport' },
  { id: 'budapest', name: 'Budapest', country: 'Hungary', continent: 'Europe', coords: [47.4979, 19.0402], code: 'BUD', airportName: 'Budapest Ferenc Liszt Airport' },
  { id: 'brussels', name: 'Brussels', country: 'Belgium', continent: 'Europe', coords: [50.8503, 4.3517], code: 'BRU', airportName: 'Brussels Zaventem Airport' },
  { id: 'zurich', name: 'Zurich', country: 'Switzerland', continent: 'Europe', coords: [47.3769, 8.5417], code: 'ZRH', airportName: 'Zurich Kloten Airport' },
  { id: 'venice', name: 'Venice', country: 'Italy', continent: 'Europe', coords: [45.4408, 12.3155], code: 'VCE', airportName: 'Venice Marco Polo Airport' },
  { id: 'florence', name: 'Florence', country: 'Italy', continent: 'Europe', coords: [43.7696, 11.2558], code: 'FLR', airportName: 'Florence Peretola Airport' },
  { id: 'milan', name: 'Milan', country: 'Italy', continent: 'Europe', coords: [45.4642, 9.1900], code: 'MXP', airportName: 'Milan Malpensa Airport' },
  { id: 'munich', name: 'Munich', country: 'Germany', continent: 'Europe', coords: [48.1351, 11.5820], code: 'MUC', airportName: 'Munich Franz Josef Strauss Airport' },
  { id: 'frankfurt', name: 'Frankfurt', country: 'Germany', continent: 'Europe', coords: [50.1109, 8.6821], code: 'FRA', airportName: 'Frankfurt Airport' },
  { id: 'hamburg', name: 'Hamburg', country: 'Germany', continent: 'Europe', coords: [53.5511, 9.9937], code: 'HAM', airportName: 'Hamburg Airport' },
  { id: 'manchester', name: 'Manchester', country: 'United Kingdom', continent: 'Europe', coords: [53.4808, -2.2426], code: 'MAN', airportName: 'Manchester Airport' },
  { id: 'oxford', name: 'Oxford', country: 'United Kingdom', continent: 'Europe', coords: [51.7520, -1.2577], code: 'OXF', airportName: 'Oxford Airport' },
  { id: 'cambridge', name: 'Cambridge', country: 'United Kingdom', continent: 'Europe', coords: [52.2053, 0.1218], code: 'CBG', airportName: 'Cambridge City Airport' },
  { id: 'chicago', name: 'Chicago', country: 'United States', continent: 'North America', coords: [41.8781, -87.6298], code: 'ORD', airportName: 'Chicago O\'Hare International Airport' },
  { id: 'losangeles', name: 'Los Angeles', country: 'United States', continent: 'North America', coords: [34.0522, -118.2437], code: 'LAX', airportName: 'Los Angeles International Airport' },
  { id: 'seattle', name: 'Seattle', country: 'United States', continent: 'North America', coords: [47.6062, -122.3321], code: 'SEA', airportName: 'Seattle-Tacoma International Airport' },
  { id: 'boston', name: 'Boston', country: 'United States', continent: 'North America', coords: [42.3601, -71.0589], code: 'BOS', airportName: 'Boston Logan International Airport' },
  { id: 'washingtondc', name: 'Washington D.C.', country: 'United States', continent: 'North America', coords: [38.9072, -77.0369], code: 'IAD', airportName: 'Washington Dulles International Airport' },
  { id: 'miami', name: 'Miami', country: 'United States', continent: 'North America', coords: [25.7617, -80.1918], code: 'MIA', airportName: 'Miami International Airport' },
  { id: 'lasvegas', name: 'Las Vegas', country: 'United States', continent: 'North America', coords: [36.1699, -115.1398], code: 'LAS', airportName: 'Harry Reid International Airport' },
  { id: 'denver', name: 'Denver', country: 'United States', continent: 'North America', coords: [39.7392, -104.9903], code: 'DEN', airportName: 'Denver International Airport' },
  { id: 'sandiego', name: 'San Diego', country: 'United States', continent: 'North America', coords: [32.7157, -117.1611], code: 'SAN', airportName: 'San Diego International Airport' },
  { id: 'philadelphia', name: 'Philadelphia', country: 'United States', continent: 'North America', coords: [39.9526, -75.1652], code: 'PHL', airportName: 'Philadelphia International Airport' },
  { id: 'atlanta', name: 'Atlanta', country: 'United States', continent: 'North America', coords: [33.7490, -84.3880], code: 'ATL', airportName: 'Hartsfield-Jackson Atlanta Airport' },
  { id: 'montreal', name: 'Montreal', country: 'Canada', continent: 'North America', coords: [45.5017, -73.5673], code: 'YUL', airportName: 'Montréal-Trudeau International Airport' },
  { id: 'quebec', name: 'Quebec City', country: 'Canada', continent: 'North America', coords: [46.8139, -71.2080], code: 'YQB', airportName: 'Québec City Jean Lesage Airport' },
  { id: 'ottawa', name: 'Ottawa', country: 'Canada', continent: 'North America', coords: [45.4215, -75.6972], code: 'YOW', airportName: 'Ottawa Macdonald-Cartier Airport' },
  { id: 'beijing', name: 'Beijing', country: 'China', continent: 'Asia', coords: [39.9042, 116.4074], code: 'PEK', airportName: 'Beijing Capital International Airport' },
  { id: 'shanghai', name: 'Shanghai', country: 'China', continent: 'Asia', coords: [31.2304, 121.4737], code: 'PVG', airportName: 'Shanghai Pudong International Airport' },
  { id: 'hongkong', name: 'Hong Kong', country: 'China', continent: 'Asia', coords: [22.3193, 114.1694], code: 'HKG', airportName: 'Hong Kong International Airport' },
  { id: 'guangzhou', name: 'Guangzhou', country: 'China', continent: 'Asia', coords: [23.1291, 113.2644], code: 'CAN', airportName: 'Guangzhou Baiyun Airport' },
  { id: 'xian', name: 'Xi\'an', country: 'China', continent: 'Asia', coords: [34.3416, 108.9398], code: 'XIY', airportName: 'Xi\'an Xianyang Airport' },
  { id: 'osaka', name: 'Osaka', country: 'Japan', continent: 'Asia', coords: [34.6937, 135.5023], code: 'KIX', airportName: 'Kansai International Airport' },
  { id: 'sapporo', name: 'Sapporo', country: 'Japan', continent: 'Asia', coords: [43.0618, 141.3545], code: 'CTS', airportName: 'New Chitose Airport' },
  { id: 'fukuoka', name: 'Fukuoka', country: 'Japan', continent: 'Asia', coords: [33.5904, 130.4017], code: 'FUK', airportName: 'Fukuoka Airport' },
  { id: 'busan', name: 'Busan', country: 'South Korea', continent: 'Asia', coords: [35.1796, 129.0756], code: 'PUS', airportName: 'Gimhae International Airport' },
  { id: 'incheon', name: 'Incheon', country: 'South Korea', continent: 'Asia', coords: [37.4563, 126.7052], code: 'ICN', airportName: 'Incheon International Hub' },
  { id: 'kaohsiung', name: 'Kaohsiung', country: 'Taiwan', continent: 'Asia', coords: [22.6273, 120.3014], code: 'KHH', airportName: 'Kaohsiung International Airport' },
  { id: 'kualalumpur', name: 'Kuala Lumpur', country: 'Malaysia', continent: 'Asia', coords: [3.1390, 101.6869], code: 'KUL', airportName: 'Kuala Lumpur International Airport' },
  { id: 'georgetown', name: 'George Town', country: 'Malaysia', continent: 'Asia', coords: [5.4141, 100.3288], code: 'PEN', airportName: 'Penang International Airport' },
  { id: 'jakarta', name: 'Jakarta', country: 'Indonesia', continent: 'Asia', coords: [-6.2088, 106.8456], code: 'CGK', airportName: 'Soekarno-Hatta International Airport' },
  { id: 'bali', name: 'Bali (Denpasar)', country: 'Indonesia', continent: 'Asia', coords: [-8.6705, 115.2126], code: 'DPS', airportName: 'Ngurah Rai International Airport' },
  { id: 'manila', name: 'Manila', country: 'Philippines', continent: 'Asia', coords: [14.5995, 120.9842], code: 'MNL', airportName: 'Ninoy Aquino International Airport' },
  { id: 'cebu', name: 'Cebu City', country: 'Philippines', continent: 'Asia', coords: [10.3157, 123.8854], code: 'CEB', airportName: 'Mactan-Cebu International Airport' },
  { id: 'hanoi', name: 'Hanoi', country: 'Vietnam', continent: 'Asia', coords: [21.0285, 105.8542], code: 'HAN', airportName: 'Noi Bai International Airport' },
  { id: 'hochiminh', name: 'Ho Chi Minh City', country: 'Vietnam', continent: 'Asia', coords: [10.8231, 106.6297], code: 'SGN', airportName: 'Tan Son Nhat Airport' },
  { id: 'phnompenh', name: 'Phnom Penh', country: 'Cambodia', continent: 'Asia', coords: [11.5564, 104.9282], code: 'PNH', airportName: 'Phnom Penh International Airport' },
  { id: 'siemreap', name: 'Siem Reap', country: 'Cambodia', continent: 'Asia', coords: [13.3671, 103.8448], code: 'SAI', airportName: 'Siem Reap Angkor International Airport' },
  { id: 'yangon', name: 'Yangon', country: 'Myanmar', continent: 'Asia', coords: [16.8661, 96.1951], code: 'RGN', airportName: 'Yangon International Airport' },
  { id: 'newdelhi', name: 'New Delhi', country: 'India', continent: 'Asia', coords: [28.6139, 77.2090], code: 'DEL', airportName: 'Indira Gandhi International Airport' },
  { id: 'bengaluru', name: 'Bengaluru', country: 'India', continent: 'Asia', coords: [12.9716, 77.5946], code: 'BLR', airportName: 'Kempegowda International Airport' },
  { id: 'kolkata', name: 'Kolkata', country: 'India', continent: 'Asia', coords: [22.5726, 88.3639], code: 'CCU', airportName: 'Netaji Subhash Chandra Bose Airport' },
  { id: 'chennai', name: 'Chennai', country: 'India', continent: 'Asia', coords: [13.0827, 80.2707], code: 'MAA', airportName: 'Chennai International Airport' },
  { id: 'jaipur', name: 'Jaipur', country: 'India', continent: 'Asia', coords: [26.9124, 75.7873], code: 'JAI', airportName: 'Jaipur International Airport' },
  { id: 'colombo', name: 'Colombo', country: 'Sri Lanka', continent: 'Asia', coords: [6.9271, 79.8612], code: 'CMB', airportName: 'Bandaranaike International Airport' },
  { id: 'kathmandu', name: 'Kathmandu', country: 'Nepal', continent: 'Asia', coords: [27.7172, 85.3240], code: 'KTM', airportName: 'Tribhuvan International Airport' },
  { id: 'dhaka', name: 'Dhaka', country: 'Bangladesh', continent: 'Asia', coords: [23.8103, 90.4125], code: 'DAC', airportName: 'Hazrat Shahjalal International Airport' },
  { id: 'lahore', name: 'Lahore', country: 'Pakistan', continent: 'Asia', coords: [31.5204, 74.3587], code: 'LHE', airportName: 'Allama Iqbal International Airport' },
  { id: 'doha', name: 'Doha', country: 'Qatar', continent: 'Asia', coords: [25.2854, 51.5310], code: 'DOH', airportName: 'Hamad International Airport' },
  { id: 'abudhabi', name: 'Abu Dhabi', country: 'United Arab Emirates', continent: 'Asia', coords: [24.4539, 54.3773], code: 'AUH', airportName: 'Zayed International Airport' },
  { id: 'riyadh', name: 'Riyadh', country: 'Saudi Arabia', continent: 'Asia', coords: [24.7136, 46.6753], code: 'RUH', airportName: 'King Khalid International Airport' },
  { id: 'muscat', name: 'Muscat', country: 'Oman', continent: 'Asia', coords: [23.5880, 58.3829], code: 'MCT', airportName: 'Muscat International Airport' },
  { id: 'kuwaitcity', name: 'Kuwait City', country: 'Kuwait', continent: 'Asia', coords: [29.3759, 47.9774], code: 'KWI', airportName: 'Kuwait International Airport' },
  { id: 'amman', name: 'Amman', country: 'Jordan', continent: 'Asia', coords: [31.9454, 35.9284], code: 'AMM', airportName: 'Queen Alia International Airport' },
  { id: 'jerusalem', name: 'Jerusalem', country: 'Israel', continent: 'Asia', coords: [31.7683, 35.2137], code: 'JRS', airportName: 'Jerusalem Gateway Terminal' },
  { id: 'telaviv', name: 'Tel Aviv', country: 'Israel', continent: 'Asia', coords: [32.0853, 34.7818], code: 'TLV', airportName: 'Ben Gurion International Airport' },
  { id: 'marrakech', name: 'Marrakech', country: 'Morocco', continent: 'Africa', coords: [31.6295, -7.9811], code: 'RAK', airportName: 'Marrakesh Menara Airport' },
  { id: 'casablanca', name: 'Casablanca', country: 'Morocco', continent: 'Africa', coords: [33.5731, -7.5898], code: 'CMN', airportName: 'Mohammed V International Airport' },
  { id: 'tunis', name: 'Tunis', country: 'Tunisia', continent: 'Africa', coords: [36.8065, 10.1815], code: 'TUN', airportName: 'Tunis-Carthage Airport' },
  { id: 'addisababa', name: 'Addis Ababa', country: 'Ethiopia', continent: 'Africa', coords: [9.0320, 38.7480], code: 'ADD', airportName: 'Addis Ababa Bole International Airport' },
  { id: 'kigali', name: 'Kigali', country: 'Rwanda', continent: 'Africa', coords: [-1.9441, 30.0619], code: 'KGL', airportName: 'Kigali International Airport' },
  { id: 'kampala', name: 'Kampala', country: 'Uganda', continent: 'Africa', coords: [0.3476, 32.5825], code: 'EBB', airportName: 'Entebbe International Airport' },
  { id: 'daressalaam', name: 'Dar es Salaam', country: 'Tanzania', continent: 'Africa', coords: [-6.7924, 39.2083], code: 'DAR', airportName: 'Julius Nyerere International Airport' },
  { id: 'zanzibar', name: 'Zanzibar City', country: 'Tanzania', continent: 'Africa', coords: [-6.1659, 39.2026], code: 'ZNZ', airportName: 'Abeid Amani Karume Airport' },
  { id: 'accra', name: 'Accra', country: 'Ghana', continent: 'Africa', coords: [5.6037, -0.1870], code: 'ACC', airportName: 'Kotoka International Airport' },
  { id: 'lagos', name: 'Lagos', country: 'Nigeria', continent: 'Africa', coords: [6.5244, 3.3792], code: 'LOS', airportName: 'Murtala Muhammed International Airport' },
  { id: 'dakar', name: 'Dakar', country: 'Senegal', continent: 'Africa', coords: [14.7167, -17.4677], code: 'DSS', airportName: 'Blaise Diagne International Airport' },
  { id: 'johannesburg', name: 'Johannesburg', country: 'South Africa', continent: 'Africa', coords: [-26.2041, 28.0473], code: 'JNB', airportName: 'O. R. Tambo International Airport' },
  { id: 'durban', name: 'Durban', country: 'South Africa', continent: 'Africa', coords: [-29.8587, 31.0218], code: 'DUR', airportName: 'King Shaka International Airport' },
  { id: 'portlouis', name: 'Port Louis', country: 'Mauritius', continent: 'Africa', coords: [-20.1609, 57.5012], code: 'MRU', airportName: 'Sir Seewoosagur Ramgoolam Airport' },
  { id: 'melbourne', name: 'Melbourne', country: 'Australia', continent: 'Oceania', coords: [-37.8136, 144.9631], code: 'MEL', airportName: 'Melbourne Tullamarine Airport' },
  { id: 'brisbane', name: 'Brisbane', country: 'Australia', continent: 'Oceania', coords: [-27.4698, 153.0251], code: 'BNE', airportName: 'Brisbane Airport' },
  { id: 'perth', name: 'Perth', country: 'Australia', continent: 'Oceania', coords: [-31.9505, 115.8605], code: 'PER', airportName: 'Perth Airport' },
  { id: 'cairns', name: 'Cairns', country: 'Australia', continent: 'Oceania', coords: [-16.9186, 145.7781], code: 'CNS', airportName: 'Cairns International Airport' },
  { id: 'wellington', name: 'Wellington', country: 'New Zealand', continent: 'Oceania', coords: [-41.2865, 174.7762], code: 'WLG', airportName: 'Wellington International Airport' },
  { id: 'christchurch', name: 'Christchurch', country: 'New Zealand', continent: 'Oceania', coords: [-43.5321, 172.6362], code: 'CHC', airportName: 'Christchurch Airport' },
  { id: 'suva', name: 'Suva', country: 'Fiji', continent: 'Oceania', coords: [-18.1416, 178.4419], code: 'NAN', airportName: 'Nadi International Airport' },
  { id: 'santiago', name: 'Santiago', country: 'Chile', continent: 'South America', coords: [-33.4489, -70.6693], code: 'SCL', airportName: 'Arturo Merino Benítez Airport' },
  { id: 'saopaulo', name: 'São Paulo', country: 'Brazil', continent: 'South America', coords: [-23.5505, -46.6333], code: 'GRU', airportName: 'São Paulo/Guarulhos Airport' },
  { id: 'bogota', name: 'Bogotá', country: 'Colombia', continent: 'South America', coords: [4.7110, -74.0721], code: 'BOG', airportName: 'El Dorado International Airport' },
  { id: 'medellin', name: 'Medellín', country: 'Colombia', continent: 'South America', coords: [6.2442, -75.5812], code: 'MDE', airportName: 'José María Córdova Airport' },
  { id: 'cartagena', name: 'Cartagena', country: 'Colombia', continent: 'South America', coords: [10.3910, -75.4794], code: 'CTG', airportName: 'Rafael Núñez International Airport' },
  { id: 'quito', name: 'Quito', country: 'Ecuador', continent: 'South America', coords: [-0.1807, -78.4678], code: 'UIO', airportName: 'Mariscal Sucre International Airport' },
  { id: 'cusco', name: 'Cusco', country: 'Peru', continent: 'South America', coords: [-13.5319, -71.9675], code: 'CUZ', airportName: 'Alejandro Velasco Astete Airport' },
  { id: 'lapaz', name: 'La Paz', country: 'Bolivia', continent: 'South America', coords: [-16.5000, -68.1500], code: 'LPB', airportName: 'El Alto International Airport' },
  { id: 'montevideo', name: 'Montevideo', country: 'Uruguay', continent: 'South America', coords: [-34.9011, -56.1645], code: 'MVD', airportName: 'Carrasco International Airport' },
  { id: 'panamacity', name: 'Panama City', country: 'Panama', continent: 'North America', coords: [8.9824, -79.5199], code: 'PTY', airportName: 'Tocumen International Airport' },
  { id: 'havana', name: 'Havana', country: 'Cuba', continent: 'North America', coords: [23.1136, -82.3666], code: 'HAV', airportName: 'José Martí International Airport' },
  { id: 'sanjose', name: 'San José', country: 'Costa Rica', continent: 'North America', coords: [9.9281, -84.0907], code: 'SJO', airportName: 'Juan Santamaría Airport' },
  { id: 'belgrade', name: 'Belgrade', country: 'Serbia', continent: 'Europe', coords: [44.7866, 20.4489], code: 'BEG', airportName: 'Belgrade Nikola Tesla Airport' },
  { id: 'bucharest', name: 'Bucharest', country: 'Romania', continent: 'Europe', coords: [44.4268, 26.1025], code: 'OTP', airportName: 'Henri Coandă International Airport' },
  { id: 'zagreb', name: 'Zagreb', country: 'Croatia', continent: 'Europe', coords: [45.8150, 15.9819], code: 'ZAG', airportName: 'Franjo Tuđman Airport' },
  { id: 'dubrovnik', name: 'Dubrovnik', country: 'Croatia', continent: 'Europe', coords: [42.6507, 18.0944], code: 'DBV', airportName: 'Dubrovnik Airport' },
  { id: 'pristina', name: 'Pristina', country: 'Kosovo', continent: 'Europe', coords: [42.6629, 21.1655], code: 'PRN', airportName: 'Pristina International Airport' },
  { id: 'sofia', name: 'Sofia', country: 'Bulgaria', continent: 'Europe', coords: [42.6977, 23.3219], code: 'SOF', airportName: 'Sofia Airport' },
  { id: 'vilnius', name: 'Vilnius', country: 'Lithuania', continent: 'Europe', coords: [54.6872, 25.2797], code: 'VNO', airportName: 'Vilnius Airport' },
  { id: 'riga', name: 'Riga', country: 'Latvia', continent: 'Europe', coords: [56.9496, 24.1052], code: 'RIX', airportName: 'Riga International Airport' },
  { id: 'tallinn', name: 'Tallinn', country: 'Estonia', continent: 'Europe', coords: [59.4370, 24.7535], code: 'TLL', airportName: 'Lennart Meri Tallinn Airport' },
  { id: 'luxembourg', name: 'Luxembourg City', country: 'Luxembourg', continent: 'Europe', coords: [49.6116, 6.1319], code: 'LUX', airportName: 'Luxembourg Airport' },
  { id: 'monaco', name: 'Monaco', country: 'Monaco', continent: 'Europe', coords: [43.7384, 7.4246], code: 'MCM', airportName: 'Monaco Heliport Terminal' },
  { id: 'sanmarino', name: 'San Marino', country: 'San Marino', continent: 'Europe', coords: [43.9424, 12.4578], code: 'SAI', airportName: 'Federico Fellini Airport' },
  { id: 'vaduz', name: 'Vaduz', country: 'Liechtenstein', continent: 'Europe', coords: [47.1410, 9.5209], code: 'ACH', airportName: 'St. Gallen-Altenrhein Airport' },
  { id: 'andorra', name: 'Andorra la Vella', country: 'Andorra', continent: 'Europe', coords: [42.5063, 1.5218], code: 'LEU', airportName: 'Andorra–La Seu d\'Urgell Airport' },
  { id: 'sanjuan', name: 'San Juan', country: 'Puerto Rico', continent: 'North America', coords: [18.4655, -66.1057], code: 'SJU', airportName: 'Luis Muñoz Marín International Airport' },
  { id: 'kingston', name: 'Kingston', country: 'Jamaica', continent: 'North America', coords: [17.9712, -76.7936], code: 'KIN', airportName: 'Norman Manley International Airport' },
  { id: 'nassau', name: 'Nassau', country: 'Bahamas', continent: 'North America', coords: [25.0479, -77.3554], code: 'NAS', airportName: 'Lynden Pindling International Airport' },
  { id: 'georgetownguyana', name: 'Georgetown', country: 'Guyana', continent: 'South America', coords: [6.8013, -58.1551], code: 'GEO', airportName: 'Cheddi Jagan International Airport' },
  { id: 'paramaribo', name: 'Paramaribo', country: 'Suriname', continent: 'South America', coords: [5.8520, -55.2038], code: 'PBM', airportName: 'Johan Adolf Pengel International Airport' },
  { id: 'sucre', name: 'Sucre', country: 'Bolivia', continent: 'South America', coords: [-19.0196, -65.2620], code: 'SRE', airportName: 'Alcantarí International Airport' }
];

/**
 * Ring configuration for expansive metropolitan zones.
 * Disperses 20 mobs across 5 rings spanning 0.026 to 0.245 degrees (~3 to 27+ km).
 */
const METRO_RINGS = [
  { ringIndex: 0, count: 4, rMin: 0.026, rMax: 0.045, label: 'Downtown Quarter' },
  { ringIndex: 1, count: 5, rMin: 0.050, rMax: 0.085, label: 'Mid-City Borough' },
  { ringIndex: 2, count: 5, rMin: 0.090, rMax: 0.138, label: 'Outer Metropolitan Enclave' },
  { ringIndex: 3, count: 4, rMin: 0.142, rMax: 0.188, label: 'Perimeter Horizon & Airport Corridor' },
  { ringIndex: 4, count: 2, rMin: 0.192, rMax: 0.245, label: 'Frontier Ridge & Scenic Reserve' }
];

const SECTOR_DISTRICTS: Record<number, string[]> = {
  0: ['Northgate Skyway', 'Highland Ridge Way', 'Northern Pines Arterial', 'Crown Summit Parkway'],
  1: ['Northeast University Crescent', 'Silver Lake Parkway', 'Starlight Heights Road', 'North-East Hillside Avenue'],
  2: ['Eastside Harbor Promenade', 'Sunrise Esplanade', 'Maritime Pier Corridor', 'Eastern Grand Expressway'],
  3: ['Canal District Causeway', 'Southeast Valley Parkway', 'Orchard Vista Avenue', 'River Delta Expressway'],
  4: ['Southbridge Pier Road', 'Southern Horizon Highway', 'Emerald Coastline Boulevard', 'Palm Bay Arterial'],
  5: ['Aerotropolis Skyway', 'Southwest Industrial Greenway', 'Sunset Valley Parkway', 'Westgate Transit Corridor'],
  6: ['Westminster Heritage Avenue', 'Grand Western Parkway', 'Sunset Hills Overlook', 'Pacific Ridge Way'],
  7: ['Northwest River Bend', 'Lakeside Parkway', 'Timberland Ridge Road', 'Alpine Foothills Expressway']
};

/**
 * Generates 20 mathematically guaranteed, non-overlapping spatial slots across the expansive metropolis.
 */
function generate20MetropolitanSlots(
  cityLat: number, 
  cityLng: number, 
  cityName: string, 
  cityIndex: number
): {
  position: [number, number];
  streetName: string;
  rarity: MonsterRarity;
  tier: number;
}[] {
  const cosLat = Math.cos((cityLat * Math.PI) / 180) || 1;
  const slots: {
    position: [number, number];
    streetName: string;
    rarity: MonsterRarity;
    tier: number;
  }[] = [];

  let globalSlotIndex = 0;

  METRO_RINGS.forEach((ring) => {
    for (let i = 0; i < ring.count; i++) {
      // Offset phase by ring and cityIndex to prevent radially aligned lines
      const ringPhase = (ring.ringIndex * 0.47) + ((cityIndex % 7) * 0.21);
      const baseAngle = (i * (2 * Math.PI / ring.count)) + ringPhase;
      const jitterAngle = (((globalSlotIndex * 13 + cityIndex * 17) % 7) - 3) * 0.025;
      const angle = baseAngle + jitterAngle;

      const norm = (i + 0.5) / ring.count;
      const radius = ring.rMin + (ring.rMax - ring.rMin) * norm;

      const mobLat = cityLat + Math.cos(angle) * radius;
      const mobLng = cityLng + (Math.sin(angle) * radius) / cosLat;

      // Determine cardinal sector for authentic street naming
      const normalizedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      const sector = Math.floor(((normalizedAngle + (Math.PI / 8)) % (2 * Math.PI)) / (Math.PI / 4)) % 8;
      const namesList = SECTOR_DISTRICTS[sector] || SECTOR_DISTRICTS[0];
      const districtName = namesList[(globalSlotIndex + cityIndex) % namesList.length];

      // Progressive rarity from inner core to outer frontier
      let rarity: MonsterRarity = 'Common';
      if (ring.ringIndex === 4) {
        rarity = 'Legendary';
      } else if (ring.ringIndex === 3) {
        rarity = i % 2 === 0 ? 'Legendary' : 'Epic';
      } else if (ring.ringIndex === 2) {
        rarity = i % 2 === 0 ? 'Epic' : 'Rare';
      } else if (ring.ringIndex === 1) {
        rarity = i % 2 === 0 ? 'Rare' : 'Common';
      } else {
        rarity = i === 0 ? 'Rare' : 'Common';
      }

      slots.push({
        position: [mobLat, mobLng],
        streetName: `${cityName} ${districtName} (${ring.label} #${i + 1})`,
        rarity,
        tier: ring.ringIndex
      });

      globalSlotIndex++;
    }
  });

  return slots;
}

/**
 * Builds 20 unique, balanced mobs for any given city.
 * Combines flagship unique monsters, monument-lurking monsters, and widely scattered street patrollers.
 */
export function getCity20Mobs(cityId: string, baseCity: CityData, cityName: string, cityIndex: number): Monster[] {
  const cityLat = baseCity.coordinates[0];
  const cityLng = baseCity.coordinates[1];

  // Pre-generate the 20 expansive metropolitan coordinates
  const slots = generate20MetropolitanSlots(cityLat, cityLng, cityName, cityIndex);

  const mobPrefixes = [
    'Spark', 'Frost', 'Gale', 'Pyro', 'Aqua', 'Terra', 'Mystic', 'Cosmic', 
    'Shadow', 'Solar', 'Pulse', 'Zephyr', 'Nova', 'Echo', 'Prism', 'Aero', 
    'Blaze', 'Storm', 'Thunder', 'Astral', 'Vortex', 'Radiant', 'Zenith', 'Titan'
  ];
  const mobSuffixes = [
    'Cub', 'Puff', 'Fox', 'Sprite', 'Bunny', 'Otter', 'Pip', 'Whiskers', 
    'Fawn', 'Wisp', 'Scout', 'Kit', 'Chick', 'Pika', 'Lynx', 'Griffin', 
    'Buddy', 'Drake', 'Sprout', 'Chirper', 'Paw', 'Specter'
  ];

  const result: Monster[] = [];
  const usedSlotIndices = new Set<number>();

  // 1. Reposition any existing monsters (e.g. from INITIAL_CITIES) across widely separated slots
  const existingMonsters = (baseCity.monsters || []).slice(0, 4);
  existingMonsters.forEach((m, idx) => {
    // Pick staggered slot indices in different rings (e.g. slots 0, 5, 10, 15)
    const slotIdx = (idx * 5) % slots.length;
    usedSlotIndices.add(slotIdx);
    const slot = slots[slotIdx];

    result.push({
      ...m,
      position: slot.position,
      streetName: slot.streetName,
      rarity: slot.rarity,
      hp: slot.rarity === 'Legendary' ? 4 : 3,
      maxHp: slot.rarity === 'Legendary' ? 4 : 3
    });
  });

  // 2. Generate building-lurking monsters for monuments
  const buildings = baseCity.buildings || [];
  buildings.forEach((bldg, bIdx) => {
    if (result.length >= 20) return;
    const bldgMobId = `${cityId}-bldg-${bIdx + 1}`;
    const elem = ELEMENT_LIST[(cityIndex + bIdx * 2) % ELEMENT_LIST.length];
    const colors = ELEMENT_COLORS[elem];
    const avatars = MOB_AVATARS[elem];
    const avatar = avatars[bIdx % avatars.length];

    result.push({
      id: bldgMobId,
      name: `${bldg.name.split(' ')[0]} ${elem === 'Dragon' ? 'Drake' : elem === 'Psychic' ? 'Phantom' : 'Guardian'}`,
      type: elem,
      level: Math.min(85, 6 + cityIndex * 2 + bIdx),
      hp: 4,
      maxHp: 4,
      position: [bldg.position[0] + 0.0008, bldg.position[1] + 0.0008],
      streetName: `Inside ${bldg.name}`,
      spriteColor: colors.sprite,
      auraColor: colors.aura,
      description: `A mysterious creature hiding inside ${bldg.name}! Defeat it to learn hidden architectural lore!`,
      avatarIcon: avatar,
      rarity: 'Epic',
      lessonTopic: `Monument Lore: ${bldg.name}`,
      questions: getQuestionsForMonster(cityIndex, 20 + bIdx, 4)
    });
  });

  // 3. Fill all remaining slots with widely scattered street monsters across all 5 rings up to 20
  for (let sIdx = 0; sIdx < slots.length; sIdx++) {
    if (result.length >= 20) break;
    if (usedSlotIndices.has(sIdx)) continue;

    const slot = slots[sIdx];
    const mobNum = result.length + 1;
    const mobId = `${cityId}-mob-${mobNum}`;
    const elem = ELEMENT_LIST[(cityIndex + sIdx * 3) % ELEMENT_LIST.length];
    const colors = ELEMENT_COLORS[elem];
    const avatars = MOB_AVATARS[elem];
    const avatar = avatars[sIdx % avatars.length];

    const prefix = mobPrefixes[(sIdx + cityIndex) % mobPrefixes.length];
    const suffix = mobSuffixes[(sIdx * 2 + cityIndex) % mobSuffixes.length];

    result.push({
      id: mobId,
      name: `${prefix}${suffix}`,
      type: elem,
      level: Math.min(90, 4 + Math.floor(cityIndex * 1.4) + (slot.tier * 2) + (sIdx % 4)),
      hp: slot.rarity === 'Legendary' ? 4 : 3,
      maxHp: slot.rarity === 'Legendary' ? 4 : 3,
      position: slot.position,
      streetName: slot.streetName,
      spriteColor: colors.sprite,
      auraColor: colors.aura,
      description: `A wild ${elem.toLowerCase()} creature roaming ${slot.streetName}!`,
      avatarIcon: avatar,
      rarity: slot.rarity,
      lessonTopic: `${cityName} Street Exploration #${mobNum}`,
      questions: getQuestionsForMonster(cityIndex, mobNum, slot.rarity === 'Legendary' ? 5 : 4)
    });
  }

  // Inject iconic Mythic Special Mob if this city has one (e.g. Chronomancer, Kitsune Kami, etc.)
  const specialMob = getSpecialMobForCity(cityName, [cityLat, cityLng]);
  if (specialMob) {
    result.unshift(specialMob);
  }

  return result.slice(0, 20);
}

// Backwards compatibility alias
export const getCity50Mobs = getCity20Mobs;

// Assemble and export the full 150 World Cities database
export const ALL_150_CITIES: CityData[] = (() => {
  const mapOfExisting = new Map<string, CityData>();
  INITIAL_CITIES.forEach(c => mapOfExisting.set(c.id, c));

  const list: CityData[] = [];

  // 1. Process the 36 Handcrafted Metropolises first
  RAW_150_CITIES_DATA.forEach((raw, idx) => {
    const existing = mapOfExisting.get(raw.id);
    const airport: CityAirport = {
      id: `${raw.id}-airport`,
      name: raw.airport.name,
      code: raw.airport.code,
      position: [raw.coords[0] - 0.125, raw.coords[1] - 0.165],
      terminalDescription: `International Departure Concourse for ${raw.airport.name} (${raw.airport.code})`
    };

    const buildings: CityBuilding[] = raw.buildings.map((b, bIdx) => ({
      id: `${raw.id}-bldg-${bIdx + 1}`,
      name: b.name,
      type: b.type,
      position: [raw.coords[0] + b.offset[0] * 2.2, raw.coords[1] + b.offset[1] * 2.2],
      icon: b.icon,
      description: `Famous historical monument in ${raw.name}.`,
      historicalFact: b.fact,
      hiddenMonsterIds: [`${raw.id}-bldg-${bIdx + 1}`]
    }));

    const baseCity: CityData = existing ? {
      ...existing,
      continent: raw.continent,
      zoom: 13,
      airport,
      buildings,
      welcomeMessage: existing.welcomeMessage.replace(/26/g, '150')
    } : {
      id: raw.id,
      name: raw.name,
      country: raw.country,
      continent: raw.continent,
      coordinates: raw.coords,
      zoom: 13,
      lessonTitle: raw.lessonTitle,
      lessonGrammarRule: raw.rule,
      welcomeMessage: `Welcome to ${raw.name} (${raw.country})! Explore famous monuments, physical airport concourses, and 20 roaming road monsters!`,
      landmarks: buildings.map(b => b.name),
      stations: [
        {
          id: `${raw.id}-stn-main`,
          name: `${raw.name} Central Express Station`,
          position: [raw.coords[0] + 0.022, raw.coords[1] - 0.025],
          type: 'train',
          lines: ['City Express Line', 'Airport Rail Link'],
          icon: '🚅',
          speedMultiplier: 5.0,
          description: `Direct high-speed passenger artery through ${raw.name}.`
        },
        {
          id: `${raw.id}-stn-subway`,
          name: `${raw.name} Metro Heritage Stop`,
          position: [raw.coords[0] - 0.048, raw.coords[1] + 0.052],
          type: 'subway',
          lines: ['Downtown Metro Line 1'],
          icon: '🚇',
          speedMultiplier: 3.5,
          description: `Rapid subterranean transit station.`
        },
        {
          id: `${raw.id}-stn-taxi`,
          name: `${raw.name} Perimeter Cab Hub`,
          position: [raw.coords[0] + 0.082, raw.coords[1] + 0.086],
          type: 'taxi',
          lines: ['City Cabs'],
          icon: '🚕',
          speedMultiplier: 2.8,
          description: `Reliable urban taxi stop.`
        }
      ],
      monsters: [],
      airport,
      buildings
    };

    baseCity.monsters = getCity50Mobs(raw.id, baseCity, raw.name, idx);
    list.push(baseCity);
  });

  // 2. Process Additional Metros (cities 37 to 150)
  ADDITIONAL_METROS_INFO.forEach((meta, aIdx) => {
    const cityIndex = 36 + aIdx;
    const airport: CityAirport = {
      id: `${meta.id}-airport`,
      name: meta.airportName,
      code: meta.code,
      position: [meta.coords[0] - 0.125, meta.coords[1] - 0.165],
      terminalDescription: `International Departure Concourse for ${meta.airportName} (${meta.code})`
    };

    const buildings: CityBuilding[] = [
      {
        id: `${meta.id}-bldg-1`,
        name: `${meta.name} Grand Historic Museum`,
        type: 'museum',
        position: [meta.coords[0] + 0.055, meta.coords[1] + 0.045],
        icon: '🏛️',
        description: `The premier cultural institution of ${meta.name} displaying historical artifacts.`,
        historicalFact: `Preserves centuries of cultural heritage and art from ${meta.country}.`,
        hiddenMonsterIds: [`${meta.id}-bldg-1`]
      },
      {
        id: `${meta.id}-bldg-2`,
        name: `${meta.name} Historic Royal Palace & Citadel`,
        type: 'palace',
        position: [meta.coords[0] - 0.065, meta.coords[1] - 0.055],
        icon: '🏰',
        description: `Ancient stone fortress and seat of historical rulers in ${meta.name}.`,
        historicalFact: `A monumental architectural landmark representing the history of ${meta.name}.`,
        hiddenMonsterIds: [`${meta.id}-bldg-2`]
      },
      {
        id: `${meta.id}-bldg-3`,
        name: `${meta.name} Tower & Public Square`,
        type: 'tower',
        position: [meta.coords[0] + 0.048, meta.coords[1] - 0.070],
        icon: '🗼',
        description: `Iconic central tower and meeting plaza in the heart of ${meta.name}.`,
        historicalFact: `Gathers travelers and locals for civic events, markets, and celebrations.`,
        hiddenMonsterIds: [`${meta.id}-bldg-3`]
      }
    ];

    const baseCity: CityData = {
      id: meta.id,
      name: meta.name,
      country: meta.country,
      continent: meta.continent,
      coordinates: [meta.coords[0], meta.coords[1]] as [number, number],
      zoom: 13,
      lessonTitle: `Lesson ${cityIndex + 1}: ${meta.name} Global English Exploration`,
      lessonGrammarRule: 'Master contextual grammar, sophisticated travel vocabulary, and reading idioms.',
      welcomeMessage: `Welcome to ${meta.name} (City ${cityIndex + 1}/150)! Explore famous monuments, physical airport concourses, and 20 roaming road monsters!`,
      landmarks: buildings.map(b => b.name),
      stations: [
        {
          id: `${meta.id}-stn-main`,
          name: `${meta.name} Central Rail Hub`,
          position: [meta.coords[0] + 0.022, meta.coords[1] - 0.025],
          type: 'train',
          lines: ['Regional Express Line', 'Airport Rail Link'],
          icon: '🚅',
          speedMultiplier: 5.0,
          description: `Central railway station connecting ${meta.name} to world capitals.`
        },
        {
          id: `${meta.id}-stn-subway`,
          name: `${meta.name} Downtown Metro`,
          position: [meta.coords[0] - 0.048, meta.coords[1] + 0.052],
          type: 'subway',
          lines: ['Metro Line 1'],
          icon: '🚇',
          speedMultiplier: 3.5,
          description: `Rapid underground passenger network.`
        },
        {
          id: `${meta.id}-stn-taxi`,
          name: `${meta.name} Perimeter Cab Hub`,
          position: [meta.coords[0] + 0.082, meta.coords[1] + 0.086],
          type: 'taxi',
          lines: ['City Cabs'],
          icon: '🚕',
          speedMultiplier: 2.8,
          description: `Reliable urban taxi stop.`
        }
      ],
      monsters: [],
      airport,
      buildings
    };

    baseCity.monsters = getCity50Mobs(meta.id, baseCity, meta.name, cityIndex);
    list.push(baseCity);
  });

  return list;
})();

export const TOTAL_WORLD_CITIES = ALL_150_CITIES.length;
