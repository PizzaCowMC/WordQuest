import { TransitStation, TrainerAppearance, VehicleType, CityData } from '../types';

export interface AvatarChoice {
  id: string;
  avatar: string;
  name: string;
  genderStyle: string;
  title: string;
  accessory: string;
}

export const AVATAR_OPTIONS: AvatarChoice[] = [
  { id: 'av-boy-explorer', avatar: '🧒', name: 'Leo', genderStyle: 'Boy Explorer', title: 'World Voyager', accessory: 'Explorer Compass' },
  { id: 'av-girl-scholar', avatar: '👧', name: 'Maya', genderStyle: 'Girl Scholar', title: 'Grammar Sage', accessory: 'Lexicon Notebook' },
  { id: 'av-street-skater', avatar: '🛹', name: 'Kai', genderStyle: 'Street Skater', title: 'Asphalt Cruiser', accessory: 'Safety Helmet' },
  { id: 'av-anime-mage', avatar: '🧙‍♀️', name: 'Zoe', genderStyle: 'Arcane Witch', title: 'Spellbinder', accessory: 'Starlight Pendant' },
  { id: 'av-detective', avatar: '🕵️', name: 'Sherlock Jr.', genderStyle: 'Word Detective', title: 'Mystery Solver', accessory: 'Magnifying Glass' },
  { id: 'av-pilot', avatar: '🧑‍✈️', name: 'Captain Sky', genderStyle: 'Sky Aviator', title: 'Cloud Commander', accessory: 'Aviator Goggles' },
  { id: 'av-cyber', avatar: '🧑‍💻', name: 'Nova', genderStyle: 'Cyber Knight', title: 'Digital Polyglot', accessory: 'Neon Headset' },
  { id: 'av-adventurer', avatar: '🧗', name: 'Alex', genderStyle: 'Summit Adventurer', title: 'Peak Conqueror', accessory: 'Carabiner Hook' },
  { id: 'av-polyglot', avatar: '🧕', name: 'Amina', genderStyle: 'Global Ambassador', title: 'Language Diplomat', accessory: 'Silk Scarf' },
  { id: 'av-wizard', avatar: '🧙', name: 'Rowan', genderStyle: 'Spellcrafter', title: 'Vocabulary Mage', accessory: 'Crystal Wand' },
  { id: 'av-ninja', avatar: '🥷', name: 'Jin', genderStyle: 'Shadow Ninja', title: 'Silent Wordmaster', accessory: 'Kunai Scroll' },
  { id: 'av-astronaut', avatar: '🧑‍🚀', name: 'Luna', genderStyle: 'Space Voyager', title: 'Cosmic Linguist', accessory: 'Zero-G Visor' },
  { id: 'av-athlete', avatar: '🏃‍♂️', name: 'Marcus', genderStyle: 'Track Sprinter', title: 'Speed Reader', accessory: 'Smart Stopwatch' },
  { id: 'av-tennis', avatar: '🎾', name: 'Chloe', genderStyle: 'Grand Slam Champ', title: 'Match Ace', accessory: 'Gold Wristband' },
  { id: 'av-marine', avatar: '🤿', name: 'Sam', genderStyle: 'Deep Diver', title: 'Ocean Explorer', accessory: 'Diving Mask' },
  { id: 'av-princess', avatar: '👸', name: 'Elena', genderStyle: 'Royal Sovereign', title: 'Empire Orator', accessory: 'Emerald Tiara' },
  { id: 'av-hero', avatar: '🦸', name: 'Sora', genderStyle: 'Sky Hero', title: 'Guardian of Words', accessory: 'Solar Cape' },
  { id: 'av-samurai', avatar: '🗡️', name: 'Kenji', genderStyle: 'Blade Guardian', title: 'Honor Knight', accessory: 'Bamboo Scabbard' },
  { id: 'av-gamer', avatar: '🎮', name: 'Tara', genderStyle: 'Esports Prodigy', title: 'Combo Master', accessory: 'RGB Headphones' },
  { id: 'av-courier', avatar: '🚴‍♂️', name: 'Liam', genderStyle: 'Urban Courier', title: 'Speed Messenger', accessory: 'Messenger Bag' }
];

export const OUTFIT_COLORS = [
  { name: 'Electric Amber', hex: '#F59E0B', ring: 'ring-amber-400', badge: 'bg-amber-500' },
  { name: 'Ocean Sapphire', hex: '#2563EB', ring: 'ring-blue-500', badge: 'bg-blue-600' },
  { name: 'Crimson Flame', hex: '#EF4444', ring: 'ring-red-500', badge: 'bg-red-500' },
  { name: 'Emerald Forest', hex: '#10B981', ring: 'ring-emerald-500', badge: 'bg-emerald-500' },
  { name: 'Cosmic Violet', hex: '#8B5CF6', ring: 'ring-purple-500', badge: 'bg-purple-500' },
  { name: 'Midnight Onyx', hex: '#334155', ring: 'ring-slate-400', badge: 'bg-slate-700' },
  { name: 'Sakura Pink', hex: '#EC4899', ring: 'ring-pink-500', badge: 'bg-pink-500' },
  { name: 'Sunset Orange', hex: '#EA580C', ring: 'ring-orange-500', badge: 'bg-orange-500' }
];

export const ACCESSORY_OPTIONS = [
  { id: 'acc-goggles', name: 'Aviator Goggles', icon: '🥽' },
  { id: 'acc-hat', name: 'Explorer Safari Hat', icon: '🤠' },
  { id: 'acc-headphones', name: 'Grammar Headphones', icon: '🎧' },
  { id: 'acc-crown', name: 'Scholar Laurels', icon: '👑' },
  { id: 'acc-glasses', name: 'Detective Monocle', icon: '👓' },
  { id: 'acc-backpack', name: 'Expedition Rucksack', icon: '🎒' },
  { id: 'acc-cap', name: 'Snapback Cap', icon: '🧢' },
  { id: 'acc-ribbon', name: 'Ribbon Scarf', icon: '🎗️' },
];

export const VEHICLE_OPTIONS: {
  type: VehicleType;
  name: string;
  icon: string;
  badgeName: string;
  speedMultiplier: number;
  cost: string;
  description: string;
  spriteGlow: string;
}[] = [
  {
    type: 'walk',
    name: 'Foot Patrol',
    icon: '🚶',
    badgeName: 'Walking',
    speedMultiplier: 1.0,
    cost: 'Free',
    description: 'Standard exploration pace on city sidewalks & pedestrian paths',
    spriteGlow: 'shadow-sky-500/30'
  },
  {
    type: 'bicycle',
    name: 'City Bicycle',
    icon: '🚲',
    badgeName: 'Bicycle (1.8x)',
    speedMultiplier: 1.8,
    cost: 'Free Pass',
    description: 'Swift eco-cruising along streets and bike lanes',
    spriteGlow: 'shadow-emerald-500/50'
  },
  {
    type: 'bus',
    name: 'City Transit Bus',
    icon: '🚌',
    badgeName: 'Bus (2.4x)',
    speedMultiplier: 2.4,
    cost: 'Bus Ticket (10 Coins)',
    description: 'Cruises main boulevards and stops at major landmark stations',
    spriteGlow: 'shadow-yellow-500/50'
  },
  {
    type: 'taxi',
    name: 'Yellow Street Cab',
    icon: '🚕',
    badgeName: 'Taxi Cab (2.8x)',
    speedMultiplier: 2.8,
    cost: 'Call via Phone (15 Coins)',
    description: 'Point-to-point road car hailing directly to your street coordinates',
    spriteGlow: 'shadow-amber-500/50'
  },
  {
    type: 'car',
    name: 'Electric Roadster',
    icon: '🚗',
    badgeName: 'Personal Car (3.4x)',
    speedMultiplier: 3.4,
    cost: 'Car Pass (30 Coins)',
    description: 'High performance sports car for zooming through city highways',
    spriteGlow: 'shadow-red-500/60'
  },
  {
    type: 'subway',
    name: 'Metro Underground',
    icon: '🚇',
    badgeName: 'Subway (4.2x)',
    speedMultiplier: 4.2,
    cost: 'Metro Pass (25 Coins)',
    description: 'High-speed subterranean urban line between central stations',
    spriteGlow: 'shadow-blue-500/60'
  },
  {
    type: 'bullet_train',
    name: 'High-Speed Express',
    icon: '🚅',
    badgeName: 'Express Rail (5.5x)',
    speedMultiplier: 5.5,
    cost: 'Rail Ticket (40 Coins)',
    description: 'Ultra-fast bullet train connecting regional terminal hubs',
    spriteGlow: 'shadow-purple-500/70'
  }
];

export const TRANSIT_TICKETS = [
  {
    id: 'ticket-bus',
    vehicleType: 'bus' as VehicleType,
    title: 'City Bus Day Pass',
    icon: '🚌',
    costCoins: 10,
    durationLabel: 'Unlimited City Rides',
    description: 'Board any city bus or double-decker along urban avenues at 2.4x speed.',
    speedMultiplier: 2.4
  },
  {
    id: 'ticket-taxi',
    vehicleType: 'taxi' as VehicleType,
    title: 'Taxi RidePass / Phone Dispatch',
    icon: '🚕',
    costCoins: 15,
    durationLabel: 'Instant GPS Dispatch',
    description: 'Call a yellow street taxi anytime directly from your smartphone at 2.8x speed.',
    speedMultiplier: 2.8
  },
  {
    id: 'ticket-subway',
    vehicleType: 'subway' as VehicleType,
    title: 'Metro Underground Pass',
    icon: '🚇',
    costCoins: 25,
    durationLabel: 'Unlimited Subway Network',
    description: 'Tap through metro turnstiles for blazing underground navigation at 4.2x speed.',
    speedMultiplier: 4.2
  },
  {
    id: 'ticket-car',
    vehicleType: 'car' as VehicleType,
    title: 'Electric Roadster Rental',
    icon: '🚗',
    costCoins: 30,
    durationLabel: 'Personal Sports Car',
    description: 'Unlock your private electric car to cruise all avenues and bridges at 3.4x speed.',
    speedMultiplier: 3.4
  },
  {
    id: 'ticket-train',
    vehicleType: 'bullet_train' as VehicleType,
    title: 'High-Speed Rail Express Ticket',
    icon: '🚅',
    costCoins: 40,
    durationLabel: 'Express Terminal Access',
    description: 'Board the aerodynamic bullet train at 5.5x supersonic street speed.',
    speedMultiplier: 5.5
  }
];

export const CITY_TRANSIT_STATIONS: Record<string, TransitStation[]> = {
  london: [
    {
      id: 'lon-stn-1',
      name: 'Westminster Underground Station',
      position: [51.5015, -0.1250],
      type: 'subway',
      lines: ['Jubilee Line', 'District Line', 'Circle Line'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'Step into the iconic London Tube to travel rapidly across Westminster & Big Ben!'
    },
    {
      id: 'lon-stn-2',
      name: 'Waterloo Rail Terminal',
      position: [51.5031, -0.1132],
      type: 'train',
      lines: ['South Western Express', 'Waterloo & City Line', 'Bakerloo Line', 'Northern Line'],
      icon: '🚅',
      speedMultiplier: 5.0,
      description: 'Britain\'s busiest railway palace offering express bullet speed across the River Thames!'
    },
    {
      id: 'lon-stn-3',
      name: 'Piccadilly Circus Station',
      position: [51.5101, -0.1345],
      type: 'subway',
      lines: ['Piccadilly Line', 'Bakerloo Line'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'Subway hub beneath London\'s glittering neon billboards in the heart of the West End!'
    },
    {
      id: 'lon-stn-4',
      name: 'Charing Cross Station',
      position: [51.5083, -0.1248],
      type: 'train',
      lines: ['Northern Line', 'Bakerloo Line', 'Southeastern Rail'],
      icon: '🚅',
      speedMultiplier: 4.5,
      description: 'Direct rail terminus steps away from Trafalgar Square and the National Gallery.'
    },
    {
      id: 'lon-stn-5',
      name: 'Covent Garden Station',
      position: [51.5129, -0.1243],
      type: 'subway',
      lines: ['Piccadilly Line'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'Historic piazza station famous for street performers, markets, and Royal Opera House.'
    },
    {
      id: 'lon-stn-6',
      name: 'Leicester Square Station',
      position: [51.5114, -0.1283],
      type: 'subway',
      lines: ['Northern Line', 'Piccadilly Line'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'Bustling entertainment crossroads connecting Soho, Chinatown, and premier movie theaters.'
    },
    {
      id: 'lon-stn-7',
      name: 'Oxford Circus Station',
      position: [51.5152, -0.1419],
      type: 'subway',
      lines: ['Central Line', 'Victoria Line', 'Bakerloo Line'],
      icon: '🚇',
      speedMultiplier: 3.8,
      description: 'The premier shopping junction connecting Oxford Street and Regent Street avenues.'
    },
    {
      id: 'lon-stn-8',
      name: 'London Bridge Station',
      position: [51.5048, -0.0860],
      type: 'train',
      lines: ['Jubilee Line', 'Northern Line', 'Thameslink', 'Southern Rail'],
      icon: '🚅',
      speedMultiplier: 4.8,
      description: 'Ultra-modern glass terminal beside The Shard and historic Borough Market.'
    },
    {
      id: 'lon-stn-9',
      name: 'Tower Hill & Bridge Station',
      position: [51.5098, -0.0766],
      type: 'subway',
      lines: ['District Line', 'Circle Line', 'DLR Network'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'Direct station for the historic Tower of London and the iconic glass walkways of Tower Bridge.'
    },
    {
      id: 'lon-stn-10',
      name: 'King\'s Cross St. Pancras International',
      position: [51.5308, -0.1238],
      type: 'train',
      lines: ['Victoria Line', 'Piccadilly Line', 'Northern Line', 'Eurostar Express'],
      icon: '🚅',
      speedMultiplier: 5.5,
      description: 'Legendary grand transit palace linking national express trains, Tube lines, and Eurostar.'
    },
    {
      id: 'lon-stn-11',
      name: 'Victoria Rail & Underground Terminal',
      position: [51.4952, -0.1439],
      type: 'train',
      lines: ['Victoria Line', 'District Line', 'Circle Line', 'Gatwick Express'],
      icon: '🚅',
      speedMultiplier: 4.8,
      description: 'Major South-West gateway connecting Buckingham Palace, St. James\'s Park, and airport rail.'
    },
    {
      id: 'lon-stn-12',
      name: 'St. Paul\'s Cathedral Station',
      position: [51.5149, -0.0975],
      type: 'subway',
      lines: ['Central Line'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'Direct station serving Sir Christopher Wren\'s dome and the pedestrian Millennium Bridge.'
    },
    {
      id: 'lon-stn-13',
      name: 'Green Park Station',
      position: [51.5067, -0.1428],
      type: 'subway',
      lines: ['Jubilee Line', 'Piccadilly Line', 'Victoria Line'],
      icon: '🚇',
      speedMultiplier: 3.6,
      description: 'Scenic royal park interchange connecting Mayfair, Piccadilly, and Buckingham Palace gardens.'
    }
  ],
  tokyo: [
    {
      id: 'tok-stn-1',
      name: 'Shinjuku Grand Terminal',
      position: [35.6909, 139.7005],
      type: 'train',
      lines: ['Yamanote Line', 'Chuo Rapid', 'Shinkansen Connector'],
      icon: '🚅',
      speedMultiplier: 5.0,
      description: 'The world busiest transit hub! Board high-speed express trains.'
    },
    {
      id: 'tok-stn-2',
      name: 'Shibuya Crossing Metro Station',
      position: [35.6595, 139.7004],
      type: 'subway',
      lines: ['Ginza Line', 'Hanzomon Line', 'Fukutoshin Line'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'Subterranean Tokyo Metro hub directly beneath the famous scramble crossing.'
    },
    {
      id: 'tok-stn-3',
      name: 'Akihabara Electric Cab Hub',
      position: [35.6983, 139.7731],
      type: 'taxi',
      lines: ['Tokyo Green Cab'],
      icon: '🚕',
      speedMultiplier: 2.6,
      description: 'Hop in a neon-lit Tokyo taxi cruising the neon electronics avenue.'
    }
  ],
  paris: [
    {
      id: 'par-stn-1',
      name: 'Châtelet - Les Halles Metro',
      position: [51.5074, -0.1278], // Will map to Paris coordinates in app
      type: 'subway',
      lines: ['Metro Line 1', 'Line 4', 'RER A'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'The heartbeat of the Paris Métro linking the Seine and Louvre.'
    },
    {
      id: 'par-stn-2',
      name: 'Gare de Lyon TGV Hub',
      position: [48.8443, 2.3730],
      type: 'train',
      lines: ['TGV High Speed', 'Transilien'],
      icon: '🚅',
      speedMultiplier: 5.0,
      description: 'Super-fast French TGV train station for lightning travel!'
    },
    {
      id: 'par-stn-3',
      name: 'Champs-Élysées Taxi Station',
      position: [48.8698, 2.3075],
      type: 'taxi',
      lines: ['Taxis Bleus Paris'],
      icon: '🚕',
      speedMultiplier: 2.6,
      description: 'Board a Parisian cab to cruise the grand tree-lined boulevards.'
    }
  ],
  newyork: [
    {
      id: 'nyc-stn-1',
      name: 'Times Square - 42nd St Subway',
      position: [40.7580, -73.9855],
      type: 'subway',
      lines: ['1, 2, 3 Trains', 'N, Q, R, W Lines', '7 Express'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'The pulsing center of the NYC Subway under Broadway neon lights.'
    },
    {
      id: 'nyc-stn-2',
      name: 'Grand Central Terminal',
      position: [40.7527, -73.9772],
      type: 'train',
      lines: ['Metro-North Rail', 'Hudson Line'],
      icon: '🚅',
      speedMultiplier: 5.0,
      description: 'Iconic cathedral of rail transit with starry ceiling and express tracks.'
    },
    {
      id: 'nyc-stn-3',
      name: 'Manhattan Yellow Cab Hub',
      position: [40.7505, -73.9934],
      type: 'taxi',
      lines: ['NYC Medallion Taxi'],
      icon: '🚕',
      speedMultiplier: 2.6,
      description: 'Wave down an authentic NYC Yellow Cab to zip down 5th Avenue!'
    }
  ],
  cairo: [
    {
      id: 'cai-stn-1',
      name: 'Sadat Tahrir Metro Station',
      position: [30.0444, 31.2357],
      type: 'subway',
      lines: ['Cairo Line 1', 'Line 2 Interchange'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'First underground metro system in Africa, passing under downtown Cairo.'
    },
    {
      id: 'cai-stn-2',
      name: 'Ramses Central Railway',
      position: [30.0634, 31.2467],
      type: 'train',
      lines: ['Egyptian National Railways Express'],
      icon: '🚅',
      speedMultiplier: 5.0,
      description: 'Historic railway palace connecting the Nile valley.'
    },
    {
      id: 'cai-stn-3',
      name: 'Nile Corniche White Taxi Stand',
      position: [30.0400, 31.2300],
      type: 'taxi',
      lines: ['Cairo Nile Fleet'],
      icon: '🚕',
      speedMultiplier: 2.6,
      description: 'Hop into a Nile taxi cab cruising along the majestic riverfront.'
    }
  ],
  sydney: [
    {
      id: 'syd-stn-1',
      name: 'Circular Quay Ferry & Rail Station',
      position: [-33.8614, 151.2108],
      type: 'subway',
      lines: ['City Circle Line', 'Harbour Express'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'Overlooks Sydney Harbour Bridge and Opera House!'
    },
    {
      id: 'syd-stn-2',
      name: 'Sydney Central Grand Terminal',
      position: [-33.8832, 151.2064],
      type: 'train',
      lines: ['NSW TrainLink Express', 'Airport Line'],
      icon: '🚅',
      speedMultiplier: 5.0,
      description: 'Clock-towered railway hub sending trains across New South Wales.'
    },
    {
      id: 'syd-stn-3',
      name: 'George Street Light Rail & Taxi',
      position: [-33.8732, 151.2070],
      type: 'taxi',
      lines: ['Sydney Cabs'],
      icon: '🚕',
      speedMultiplier: 2.6,
      description: 'Cruising past the Queen Victoria Building down to the harbour.'
    }
  ],
  rome: [
    {
      id: 'rom-stn-1',
      name: 'Colosseo Metro B Station',
      position: [41.8902, 12.4922],
      type: 'subway',
      lines: ['Metro Linea B', 'Ancient Roman Line'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'Exit right directly in front of the ancient Roman Colosseum!'
    },
    {
      id: 'rom-stn-2',
      name: 'Roma Termini Central Hub',
      position: [41.9010, 12.5018],
      type: 'train',
      lines: ['Frecciarossa High-Speed', 'Italo Rail'],
      icon: '🚅',
      speedMultiplier: 5.0,
      description: 'Italy premier bullet train hub with 300 km/h speed trains.'
    },
    {
      id: 'rom-stn-3',
      name: 'Piazza Venezia White Cab Stand',
      position: [41.8963, 12.4823],
      type: 'taxi',
      lines: ['Taxi Roma Capitale'],
      icon: '🚕',
      speedMultiplier: 2.6,
      description: 'Classic Roman cab station in front of the Vittoriano monument.'
    }
  ],
  rio: [
    {
      id: 'rio-stn-1',
      name: 'Carioca Metro Interchange',
      position: [-22.9068, -43.1769],
      type: 'subway',
      lines: ['Linha 1', 'Linha 2'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'Bustling downtown Rio station with samba music and rapid transit.'
    },
    {
      id: 'rio-stn-2',
      name: 'Central do Brasil Terminal',
      position: [-22.9038, -43.1915],
      type: 'train',
      lines: ['SuperVia Express', 'Corcovado Cog Rail'],
      icon: '🚅',
      speedMultiplier: 5.0,
      description: 'Famous Art Deco train station topped with the historic four-faced clock.'
    },
    {
      id: 'rio-stn-3',
      name: 'Copacabana Yellow Taxi Stand',
      position: [-22.9691, -43.1834],
      type: 'taxi',
      lines: ['Rio Amarelo Taxis'],
      icon: '🚕',
      speedMultiplier: 2.6,
      description: 'Yellow taxis with blue stripes cruising alongside Copacabana beach!'
    }
  ],
  singapore: [
    {
      id: 'sin-stn-1',
      name: 'Marina Bay MRT Interchange',
      position: [1.2764, 103.8546],
      type: 'subway',
      lines: ['North South Line', 'Circle Line', 'Thomson-East Coast'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'State-of-the-art automated underground transit under Marina Bay Sands.'
    },
    {
      id: 'sin-stn-2',
      name: 'City Hall MRT Hub',
      position: [1.2931, 103.8522],
      type: 'train',
      lines: ['East West Line', 'North South Line'],
      icon: '🚅',
      speedMultiplier: 5.0,
      description: 'Hyper-efficient Singapore rail center next to Saint Andrew Cathedral.'
    },
    {
      id: 'sin-stn-3',
      name: 'Orchard Road ComfortDelGro Taxi Hub',
      position: [1.3048, 103.8318],
      type: 'taxi',
      lines: ['Comfort Blue Cabs', 'CityCab'],
      icon: '🚕',
      speedMultiplier: 2.6,
      description: 'Catch a fast eco-taxi cruising the famous shopping boulevard.'
    }
  ],
  honolulu: [
    {
      id: 'hon-stn-1',
      name: 'Skyline Rail Ala Moana Station',
      position: [21.2910, -157.8435],
      type: 'train',
      lines: ['Skyline Oahu Rail Transit'],
      icon: '🚅',
      speedMultiplier: 5.0,
      description: 'Brand-new driverless elevated train zooming over Honolulu palm trees!'
    },
    {
      id: 'hon-stn-2',
      name: 'Waikiki Beach Trolley Hub',
      position: [21.2765, -157.8250],
      type: 'subway',
      lines: ['Waikiki Trolley Pink Line', 'DaBus Express'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'Open-air island streetcar whisking riders along Kalakaua Avenue.'
    },
    {
      id: 'hon-stn-3',
      name: 'Diamond Head Cab Stand',
      position: [21.2642, -157.8105],
      type: 'taxi',
      lines: ['Aloha Island Cabs'],
      icon: '🚕',
      speedMultiplier: 2.6,
      description: 'Island cab station ready to climb the volcanic slopes of Diamond Head!'
    }
  ],
  seoul: [
    {
      id: 'seo-stn-1',
      name: 'Seoul Station KTX High-Speed Hub',
      position: [37.5559, 126.9723],
      type: 'train',
      lines: ['KTX Bullet Train', 'Line 1', 'Line 4', 'AREX Airport Express'],
      icon: '🚅',
      speedMultiplier: 5.0,
      description: 'Korea premier 305 km/h high-speed bullet train terminal!'
    },
    {
      id: 'seo-stn-2',
      name: 'Gangnam Metro Station',
      position: [37.4979, 127.0276],
      type: 'subway',
      lines: ['Line 2 Green', 'Shinbundang Line'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'Ultra-modern subterranean tech hub with interactive digital screens.'
    },
    {
      id: 'seo-stn-3',
      name: 'Myeongdong Orange Taxi Stand',
      position: [37.5636, 126.9856],
      type: 'taxi',
      lines: ['Seoul International Taxi'],
      icon: '🚕',
      speedMultiplier: 2.6,
      description: 'Hail an English-friendly orange international taxi through shopping streets.'
    }
  ],
  berlin: [
    {
      id: 'ber-stn-1',
      name: 'Berlin Hauptbahnhof (Central Station)',
      position: [52.5251, 13.3694],
      type: 'train',
      lines: ['ICE Intercity Express', 'S-Bahn S3/S5/S7/S9', 'U5'],
      icon: '🚅',
      speedMultiplier: 5.0,
      description: 'Stunning multi-level glass railway station spanning the Spree river!'
    },
    {
      id: 'ber-stn-2',
      name: 'Alexanderplatz U-Bahn Station',
      position: [52.5219, 13.4132],
      type: 'subway',
      lines: ['U2', 'U5', 'U8', 'Berlin Tram'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'Deep historic yellow U-Bahn station under the iconic TV Tower (Fernsehturm).'
    },
    {
      id: 'ber-stn-3',
      name: 'Brandenburg Gate Taxi Hub',
      position: [52.5163, 13.3777],
      type: 'taxi',
      lines: ['Berlin Taxi Funk'],
      icon: '🚕',
      speedMultiplier: 2.6,
      description: 'Catch a classic beige Mercedes taxi in front of the historic monument.'
    }
  ],
  dublin: [
    {
      id: 'dub-stn-1',
      name: 'Pearse Station / Trinity Rail Hub',
      position: [53.3435, -6.2495],
      type: 'train',
      lines: ['DART Coastal Rail', 'Commuter Rail'],
      icon: '🚅',
      speedMultiplier: 5.0,
      description: 'Historical Victorian station connecting coastal Irish sea towns with downtown.'
    },
    {
      id: 'dub-stn-2',
      name: 'Westmoreland Luas Tram Stop',
      position: [53.3461, -6.2592],
      type: 'subway',
      lines: ['Luas Green Line', 'Luas Cross City'],
      icon: '🚇',
      speedMultiplier: 3.5,
      description: 'Central modern tram line gliding past Trinity College and the River Liffey.'
    },
    {
      id: 'dub-stn-3',
      name: 'Temple Bar Culture Cab Stand',
      position: [53.3452, -6.2648],
      type: 'taxi',
      lines: ['Dublin City Cabs'],
      icon: '🚕',
      speedMultiplier: 2.6,
      description: 'Cobblestone cab stop right beside historic live music pubs and theatres.'
    }
  ]
};

export const CITY_LESSONS_INFO: Record<string, { title: string; grammarRule: string; summary: string }> = {
  london: {
    title: 'Lesson 1: Present Simple & Irregular Past Verbs',
    grammarRule: 'Use present simple for routines (e.g., "The clock rings"), and irregular past tense for past events (go ➔ went, see ➔ saw).',
    summary: 'Master regular & irregular verbs while traversing Westminster and the Tower Bridge.'
  },
  tokyo: {
    title: 'Lesson 2: Daily Action Verbs & Time Prepositions',
    grammarRule: 'Use "at" for exact clock times (at 3:00), "in" for months/years (in July), and "on" for days (on Monday).',
    summary: 'Power up your time expressions navigating Shibuya and Shinjuku neon avenues.'
  },
  paris: {
    title: 'Lesson 3: Definite/Indefinite Articles & Adjectives',
    grammarRule: 'Use "a" before consonant sounds and "an" before vowel sounds (an apple, a car). Adjectives describe nouns.',
    summary: 'Explore French cafes while perfecting descriptive adjectives and articles.'
  },
  newyork: {
    title: 'Lesson 4: Spatial Prepositions & City Navigation',
    grammarRule: 'Prepositions indicate location: between (two things), behind (in the rear), next to (beside), across from (opposite).',
    summary: 'Navigate the grid of Manhattan from Times Square to Central Park.'
  },
  cairo: {
    title: 'Lesson 5: Historic Past Continuous & Time Clauses',
    grammarRule: 'Past Continuous (was/were + verb-ing) describes actions in progress in the past: "Archaeologists were digging when they found it."',
    summary: 'Uncover ancient Nile grammar secrets under the Great Pyramids.'
  },
  sydney: {
    title: 'Lesson 6: Comparatives & Superlatives',
    grammarRule: 'Add -er / -est for short adjectives (faster, fastest); use "more" / "most" for longer adjectives (more dangerous, most beautiful).',
    summary: 'Compare oceanic wildlife and landmarks across Sydney Harbour.'
  },
  rome: {
    title: 'Lesson 7: Future Intentions ("Will" vs "Going To")',
    grammarRule: 'Use "going to" for planned decisions and "will" for spontaneous offers or future predictions: "I will help you."',
    summary: 'Predict your linguistic victory amid the Roman Colosseum and Forum.'
  },
  rio: {
    title: 'Lesson 8: Modal Verbs (Can, Must, Should)',
    grammarRule: '"Can" expresses ability, "must" expresses necessity/obligation, and "should" gives friendly advice.',
    summary: 'Groove to the rhythm of modal auxiliaries beneath Christ the Redeemer.'
  },
  singapore: {
    title: 'Lesson 9: Conditionals (Zero & First Conditionals)',
    grammarRule: 'First Conditional: "If + present simple, will + verb" expresses real future possibilities: "If you practice, you will succeed."',
    summary: 'Synthesize cause and effect in the futuristic Gardens by the Bay.'
  },
  honolulu: {
    title: 'Lesson 10: Perfect Tense & Mastery Proverbial Review',
    grammarRule: 'Present Perfect: "have/has + past participle" connects past experience to the present moment: "I have traveled around the world."',
    summary: 'Conquer the volcanic summit of Diamond Head to become a World Master.'
  },
  dublin: {
    title: 'Lesson 11: Irish Literature, Idioms & Prepositions',
    grammarRule: 'Prepositions of place and direction: "across the River Liffey", "along the cobblestones", "within the college walls".',
    summary: 'Explore historic Trinity College and Temple Bar while discovering rich literary expressions.'
  },
  seoul: {
    title: 'Lesson 9: Phrasal Verbs & Modern Tech Idioms',
    grammarRule: 'Phrasal verbs combine a verb with a particle (turn on, look up, figure out). Their meaning is idiomatic and transformative!',
    summary: 'Decipher dynamic idioms in the high-tech streets of Gangnam and Myeongdong.'
  },
  berlin: {
    title: 'Lesson 12: Passive Voice & Global Communication',
    grammarRule: 'Passive Voice: "Subject + be + past participle" focuses on the action: "The message was delivered across the world."',
    summary: 'Master advanced academic and communicative structures by the historic Brandenburg Gate.'
  }
};

// City 11: Dublin, Ireland
export const DUBLIN_CITY: CityData = {
  id: 'dublin',
  name: 'Dublin',
  country: 'Ireland',
  coordinates: [53.3498, -6.2603],
  zoom: 14,
  lessonTitle: CITY_LESSONS_INFO.dublin.title,
  lessonGrammarRule: CITY_LESSONS_INFO.dublin.grammarRule,
  welcomeMessage: 'Welcome to Dublin (City 11/36)! Walk through Trinity College and historic Temple Bar while defeating Celtic mythological beasts to unlock Berlin!',
  landmarks: ['Trinity College & Book of Kells', 'Temple Bar Quarter', 'Dublin Castle', "Ha'penny Bridge"],
  stations: CITY_TRANSIT_STATIONS.dublin,
  monsters: [
    {
      id: 'dub-1',
      name: 'ShamrockSprite',
      type: 'Grass',
      level: 21,
      hp: 3,
      maxHp: 3,
      position: [53.3440, -6.2540],
      streetName: 'Trinity College Parliament Square',
      spriteColor: '#10B981',
      description: 'A cheerful emerald sprite weaving three-leaf shamrock blessings around the Long Room Library!',
      avatarIcon: '☘️',
      rarity: 'Common',
      auraColor: '#34D399',
      lessonTopic: 'Prepositions of Movement & Place',
      questions: [
        {
          id: 'dub-1-q1',
          category: 'grammar',
          questionText: 'We strolled _____ the historic cobblestones of Temple Bar toward the River Liffey.',
          hint: 'Movement along a surface or path: along',
          options: ['along', 'onto into', 'above of', 'underneath with'],
          correctIndex: 0,
          explanation: 'We use "along" to describe movement following the line or path of a road, street, or river.',
          moveName: 'Emerald Clover Whirl'
        },
        {
          id: 'dub-1-q2',
          category: 'vocabulary',
          questionText: 'A three-leaved clover used as a national symbol of Ireland is a ______.',
          hint: 'From Irish "seamróg" (little clover), distinctive three-leaflet botanic emblem',
          options: ['shamrock', 'thistle', 'tulip', 'cactus'],
          correctIndex: 0,
          explanation: 'The "shamrock" is a young sprig of clover used as a symbol of Ireland and Saint Patrick.',
          moveName: 'Verdant Meadow Burst'
        },
        {
          id: 'dub-1-q3',
          category: 'reading',
          questionText: '"You can never be overdressed or overeducated." (Oscar Wilde)\nWhat value does this celebrated Irish playwright place on lifelong learning?',
          hint: 'Education and knowledge are always worthwhile and can never be too abundant',
          options: ['Knowledge and deep learning are invaluable gifts that one can never have too much of', 'Clothes are more important than thinking', 'Stop studying after age 10', 'Books are boring'],
          correctIndex: 0,
          explanation: 'Oscar Wilde wittily affirmed that pursuing education and elegance is always worthy and enriching.',
          moveName: 'Wit of Wilde Ray'
        },
        {
          id: 'dub-1-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for an ancient illustrated manuscript written by hand?',
          hint: 'Latin "manu" (by hand) + "scriptus" (written), single "n" and medial "u"',
          options: ['manuscript', 'mannuscript', 'manuscribt', 'manuskript'],
          correctIndex: 0,
          explanation: '"Manuscript" is spelled M-A-N-U-S-C-R-I-P-T.',
          moveName: 'Book of Kells Ward'
        }
      ]
    },
    {
      id: 'dub-2',
      name: 'LeprechaunPuck',
      type: 'Electric',
      level: 22,
      hp: 3,
      maxHp: 3,
      position: [53.3455, -6.2637],
      streetName: 'Temple Bar Square / Fleet Street',
      spriteColor: '#F59E0B',
      description: 'A crafty mischief sprite with a pot of golden spark coins and a witty tongue!',
      avatarIcon: '🎩',
      rarity: 'Rare',
      auraColor: '#FBBF24',
      lessonTopic: 'Phrasal Verbs with "Turn"',
      questions: [
        {
          id: 'dub-2-q1',
          category: 'grammar',
          questionText: 'When traveling in Dublin, unexpected sunny weather can _____ at any moment.',
          hint: 'Phrasal verb meaning to arrive or happen unexpectedly: turn up',
          options: ['turn up', 'turn out of', 'turn down into', 'turn away on'],
          correctIndex: 0,
          explanation: '"Turn up" means to appear, arrive, or happen unexpectedly.',
          moveName: 'Pot of Gold Flare'
        },
        {
          id: 'dub-2-q2',
          category: 'vocabulary',
          questionText: 'A supernatural creature in Irish folklore pictured as a little bearded man who mends shoes is a ______.',
          hint: 'Old Irish "luchorpán" (diminutive body): features medial "-echaun" ending',
          options: ['leprechaun', 'goblin', 'cyclops', 'minotaur'],
          correctIndex: 0,
          explanation: 'A "leprechaun" is a diminutive supernatural being in Irish mythology, often associated with a pot of gold.',
          moveName: 'Rainbow Arc Shock'
        },
        {
          id: 'dub-2-q3',
          category: 'reading',
          questionText: 'If someone in Ireland says they have the "Gift of the Gab", what extraordinary talent do they possess?',
          hint: 'The ability to speak eloquently, persuasively, and charmingly',
          options: ['The talent to speak eloquently, smoothly, and persuasively', 'The ability to run fast', 'A package of gifts', 'The power of silence'],
          correctIndex: 0,
          explanation: 'The "gift of the gab" (often linked to kissing the Blarney Stone) means having great eloquence and conversational charm.',
          moveName: 'Blarney Stone Spark'
        },
        {
          id: 'dub-2-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for a multicolored meteorological bow in the sky?',
          hint: 'Compound noun combining meteorological precipitation and the curved arch form',
          options: ['rainbow', 'rainboe', 'raynbow', 'ranbow'],
          correctIndex: 0,
          explanation: '"Rainbow" is spelled R-A-I-N-B-O-W.',
          moveName: 'Golden Coin Blast'
        }
      ]
    },
    {
      id: 'dub-3',
      name: 'BansheeSiren',
      type: 'Wind',
      level: 23,
      hp: 3,
      maxHp: 3,
      position: [53.3429, -6.2674],
      streetName: 'Dame Street / Dublin Castle Upper Yard',
      spriteColor: '#6366F1',
      description: 'A silver-haired spectral wind sovereign howling haunting ancient ballads over Dublin Castle!',
      avatarIcon: '🌬️',
      rarity: 'Epic',
      auraColor: '#818CF8',
      lessonTopic: 'Modal Verbs of Obligation (Must, Have to, Need to)',
      questions: [
        {
          id: 'dub-3-q1',
          category: 'grammar',
          questionText: 'All international visitors _____ possess a valid travel passport when boarding European flights.',
          hint: 'Strong official rule / obligation: must',
          options: ['must', 'might', 'could', 'would'],
          correctIndex: 0,
          explanation: 'We use "must" (or "have to") to express an imperative requirement or rule of law.',
          moveName: 'Celtic Wind Wail'
        },
        {
          id: 'dub-3-q2',
          category: 'vocabulary',
          questionText: 'A traditional narrative poem or song that tells a dramatic historic legend is a ______.',
          hint: 'Occitan "balada" (dancing song): spelled with double "l" and terminal "-ad"',
          options: ['ballad', 'novel', 'monologue', 'dictionary'],
          correctIndex: 0,
          explanation: 'A "ballad" is a poem or song narrating a story in short stanzas, traditional in Irish culture.',
          moveName: 'Gaelic Gale'
        },
        {
          id: 'dub-3-q3',
          category: 'reading',
          questionText: '"A stranger is just a friend you haven\'t met yet." (W.B. Yeats)\nWhat does this celebrated Irish quote reflect about warm hospitality?',
          hint: 'Treating all newcomers with warmth, openness, and friendly curiosity',
          options: ['Treating newcomers and travelers with immediate warmth, empathy, and welcoming kindness', 'Avoid talking to anyone', 'Lock all doors', 'Strangers are dangerous'],
          correctIndex: 0,
          explanation: 'Attributed to Nobel laureate W.B. Yeats, this quote captures the warm, welcoming spirit of Irish culture.',
          moveName: 'Yeats Silver Verse'
        },
        {
          id: 'dub-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for a medieval royal fortified residence?',
          hint: 'Features an unpronounced silent "t" derived from Old English "castel"',
          options: ['castle', 'casle', 'castel', 'kassle'],
          correctIndex: 0,
          explanation: '"Castle" is spelled C-A-S-T-L-E.',
          moveName: 'Dublin Castle Aura'
        }
      ]
    }
  ]
};

// New City 11: Seoul, South Korea
export const SEOUL_CITY: CityData = {
  id: 'seoul',
  name: 'Seoul',
  country: 'South Korea',
  coordinates: [37.5665, 126.9780],
  zoom: 14,
  lessonTitle: CITY_LESSONS_INFO.seoul.title,
  lessonGrammarRule: CITY_LESSONS_INFO.seoul.grammarRule,
  welcomeMessage: 'Welcome to Seoul (City 11/26)! Navigate between modern skyscrapers and historic palaces. Defeat 3 tech and neon monsters to unlock Berlin!',
  landmarks: ['N Seoul Tower', 'Gyeongbokgung Palace', 'Dongdaemun Design Plaza', 'Gangnam Blvd'],
  stations: CITY_TRANSIT_STATIONS.seoul,
  monsters: [
    {
      id: 'seo-1',
      name: 'CyberKite',
      type: 'Wind',
      level: 21,
      hp: 3,
      maxHp: 3,
      position: [37.5695, 126.9770],
      streetName: 'Sejong-daero Avenue',
      spriteColor: '#06B6D4',
      description: 'A neon digital dragon soaring above Gyeongbokgung palace gates!',
      avatarIcon: '🪁',
      rarity: 'Rare',
      auraColor: '#22D3EE',
      lessonTopic: 'Phrasal Verbs',
      questions: [
        {
          id: 'seo-1-q1',
          category: 'grammar',
          questionText: 'When you don\'t understand a new English word, you should _____ in the dictionary.',
          hint: 'Phrasal verb for searching information',
          options: ['look it up', 'look it off', 'look it into', 'look it down'],
          correctIndex: 0,
          explanation: '"Look up" means to search for information in a book, dictionary, or online database.',
          moveName: 'Neon Wind Gust'
        },
        {
          id: 'seo-1-q2',
          category: 'vocabulary',
          questionText: 'What does the phrasal verb "give up" mean?',
          hint: 'To stop fighting or quit',
          options: ['to stop trying / quit', 'to give a present', 'to climb higher', 'to speak louder'],
          correctIndex: 0,
          explanation: '"Give up" means to quit or surrender. Never give up on your English studies!',
          moveName: 'Cyber Gale'
        },
        {
          id: 'seo-1-q3',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for the study of high-tech tools and computers?',
          hint: 'Greek roots "techne" (art/craft) + "logia" (study): uses digraph "ch"',
          options: ['technology', 'tecknology', 'technolagy', 'technoligy'],
          correctIndex: 0,
          explanation: '"Technology" is spelled T-E-C-H-N-O-L-O-G-Y.',
          moveName: 'Binary Typhoon'
        }
      ]
    },
    {
      id: 'seo-2',
      name: 'VoltHani',
      type: 'Electric',
      level: 22,
      hp: 3,
      maxHp: 3,
      position: [37.5590, 126.9820],
      streetName: 'Myeongdong Walking Street',
      spriteColor: '#F59E0B',
      description: 'A cheerful electric fox energizing the vibrant night markets of Myeongdong!',
      avatarIcon: '🦊',
      rarity: 'Epic',
      auraColor: '#FBBF24',
      lessonTopic: 'Idioms & Communication',
      questions: [
        {
          id: 'seo-2-q1',
          category: 'grammar',
          questionText: 'Please _____ your shoes before entering the traditional home.',
          hint: 'Phrasal verb for removing clothing or footwear',
          options: ['take off', 'take on', 'take down', 'take out'],
          correctIndex: 0,
          explanation: '"Take off" is the phrasal verb meaning to remove shoes or clothing.',
          moveName: 'Sparkle Dash'
        },
        {
          id: 'seo-2-q2',
          category: 'reading',
          questionText: 'If a project is "a piece of cake", what does that idiom mean?',
          hint: 'Think about how easy it is to eat cake',
          options: ['It is very easy to accomplish', 'It is made of sugar', 'It takes five years', 'It is dangerous'],
          correctIndex: 0,
          explanation: 'The idiom "a piece of cake" means something is extremely simple or easy to do.',
          moveName: 'Thunder K-Pop'
        },
        {
          id: 'seo-2-q3',
          category: 'vocabulary',
          questionText: 'The train was about to leave, so we had to _____ the carriage quickly.',
          hint: 'Enter a bus or train',
          options: ['get on', 'get in to off', 'get up', 'get down'],
          correctIndex: 0,
          explanation: 'We say "get on" for buses, trains, and planes (large public transport).',
          moveName: 'Voltage Burst'
        }
      ]
    },
    {
      id: 'seo-3',
      name: 'NamsanGargoyle',
      type: 'Psychic',
      level: 23,
      hp: 3,
      maxHp: 3,
      position: [37.5512, 126.9882],
      streetName: 'N Seoul Tower Loop',
      spriteColor: '#8B5CF6',
      description: 'The glowing mystic guardian perched high atop N Seoul Tower overlooking the mountain!',
      avatarIcon: '🔮',
      rarity: 'Legendary',
      auraColor: '#C084FC',
      lessonTopic: 'Advanced Comprehension',
      questions: [
        {
          id: 'seo-3-q1',
          category: 'grammar',
          questionText: 'I am really looking forward _____ you at the international conference tomorrow.',
          hint: 'The phrase "look forward to" is followed by a gerund (-ing)',
          options: ['to meeting', 'to meet', 'meeting', 'meet'],
          correctIndex: 0,
          explanation: 'The phrase "look forward to" takes a noun or gerund (-ing): "look forward to meeting".',
          moveName: 'Cosmic Tower Ray'
        },
        {
          id: 'seo-3-q2',
          category: 'vocabulary',
          questionText: 'Someone who speaks three or more languages fluently is known as a ______.',
          hint: 'Poly- means many',
          options: ['polyglot', 'monoglot', 'pilot', 'botanist'],
          correctIndex: 0,
          explanation: 'A "polyglot" is someone who knows and is able to use several languages.',
          moveName: 'Mind Warp'
        },
        {
          id: 'seo-3-q3',
          category: 'reading',
          questionText: '"Action speaks louder than words." What does this wise proverb advise us?',
          hint: 'What you do is more important than what you say',
          options: ['What you actually do matters more than what you promise', 'Shouting is better than whispering', 'Books are useless', 'Only speak in riddles'],
          correctIndex: 0,
          explanation: '"Action speaks louder than words" reminds us that real deeds and practice matter far more than mere talk!',
          moveName: 'Astral Master Strike'
        }
      ]
    }
  ]
};

// New City 12: Berlin, Germany
export const BERLIN_CITY: CityData = {
  id: 'berlin',
  name: 'Berlin',
  country: 'Germany',
  coordinates: [52.5200, 13.4050],
  zoom: 14,
  lessonTitle: CITY_LESSONS_INFO.berlin.title,
  lessonGrammarRule: CITY_LESSONS_INFO.berlin.grammarRule,
  welcomeMessage: 'Welcome to Berlin (City 12/26)! Stand near the historic Brandenburg Gate and Museum Island. Defeat all 3 grand titan monsters to unlock Flight to Toronto!',
  landmarks: ['Brandenburg Gate', 'Reichstag Building', 'Museum Island', 'TV Tower (Fernsehturm)'],
  stations: CITY_TRANSIT_STATIONS.berlin,
  monsters: [
    {
      id: 'ber-1',
      name: 'IronGryphon',
      type: 'Wind',
      level: 24,
      hp: 3,
      maxHp: 3,
      position: [52.5163, 13.3777],
      streetName: 'Pariser Platz / Unter den Linden',
      spriteColor: '#475569',
      description: 'The magnificent winged iron gryphon standing sentinel atop the Brandenburg Gate!',
      avatarIcon: '🦅',
      rarity: 'Epic',
      auraColor: '#94A3B8',
      lessonTopic: 'Passive Voice Formations',
      questions: [
        {
          id: 'ber-1-q1',
          category: 'grammar',
          questionText: 'This famous monument _____ in 1791 by royal architect Carl Gotthard Langhans.',
          hint: 'Passive voice in past simple (was/were + past participle)',
          options: ['was built', 'is built', 'built', 'was building'],
          correctIndex: 0,
          explanation: 'In the passive past simple, we use "was/were + past participle": "was built".',
          moveName: 'Quadriga Wing Storm'
        },
        {
          id: 'ber-1-q2',
          category: 'vocabulary',
          questionText: 'A piece of writing or speech honoring peace, unity, and harmony between nations is a ______.',
          hint: 'Related to treaty or concord',
          options: ['declaration', 'quarrel', 'whisper', 'complaint'],
          correctIndex: 0,
          explanation: 'A "declaration" is a formal or explicit statement or announcement.',
          moveName: 'Iron Gale'
        },
        {
          id: 'ber-1-q3',
          category: 'spelling',
          questionText: 'Which spelling is correct for the person who designs majestic buildings and monuments?',
          hint: 'Greek "arkhitekton" (master builder): features classical "ch" digraph',
          options: ['architect', 'architecht', 'arkitect', 'archetect'],
          correctIndex: 0,
          explanation: '"Architect" is spelled A-R-C-H-I-T-E-C-T.',
          moveName: 'Gryphon Talon Crush'
        }
      ]
    },
    {
      id: 'ber-2',
      name: 'ChronoBear',
      type: 'Grass',
      level: 25,
      hp: 3,
      maxHp: 3,
      position: [52.5186, 13.3930],
      streetName: 'Museum Island Spree Promenade',
      spriteColor: '#059669',
      description: 'The ancient emerald crowned bear of Berlin guarding centuries of knowledge and art!',
      avatarIcon: '🐻',
      rarity: 'Rare',
      auraColor: '#34D399',
      lessonTopic: 'Active vs Passive Voice',
      questions: [
        {
          id: 'ber-2-q1',
          category: 'grammar',
          questionText: 'Active: "Millions of tourists visit Museum Island every year."\nPassive: "Museum Island _____ by millions of tourists every year."',
          hint: 'Present simple passive (is/are + visited)',
          options: ['is visited', 'was visited', 'visits', 'has visited'],
          correctIndex: 0,
          explanation: 'Present simple passive uses "is/are + past participle": "is visited".',
          moveName: 'Emerald Heritage Paw'
        },
        {
          id: 'ber-2-q2',
          category: 'reading',
          questionText: 'Why do authors and scientists use passive voice in research papers?',
          hint: 'To focus on the discovery or results rather than themselves',
          options: ['To emphasize the result and action objectively', 'Because they forgot who did it', 'To make sentences shorter', 'Because active voice is forbidden'],
          correctIndex: 0,
          explanation: 'Passive voice emphasizes the experiment, action, or findings objectively!',
          moveName: 'Ancient Wisdom Roar'
        },
        {
          id: 'ber-2-q3',
          category: 'vocabulary',
          questionText: 'A building where collections of historical, scientific, or artistic objects are kept is a ______.',
          hint: 'Greek "Mouseion" (seat of the Muses): single "s" and terminal "-um"',
          options: ['museum', 'bakery', 'stadium', 'dockyard'],
          correctIndex: 0,
          explanation: 'A "museum" preserves and displays priceless cultural treasures.',
          moveName: 'Spree River Wave'
        }
      ]
    },
    {
      id: 'ber-3',
      name: 'AetherTitan',
      type: 'Dragon',
      level: 26,
      hp: 4,
      maxHp: 4,
      position: [52.5208, 13.4094],
      streetName: 'Alexanderplatz Tower Plaza',
      spriteColor: '#7C3AED',
      description: 'The ultimate cosmic sovereign of English linguistic mastery radiating golden auroras over the world!',
      avatarIcon: '👑',
      rarity: 'Legendary',
      auraColor: '#A855F7',
      lessonTopic: 'Global English Grand Mastery',
      questions: [
        {
          id: 'ber-3-q1',
          category: 'grammar',
          questionText: 'By completing this 12-city global tour, all grammar challenges _____ successfully mastered by you!',
          hint: 'Future perfect passive: have been + past participle',
          options: ['have been', 'has been', 'was being', 'are be'],
          correctIndex: 0,
          explanation: '"Have been" is used with plural subject "all grammar challenges" in the perfect tense.',
          moveName: 'Titan Supernova'
        },
        {
          id: 'ber-3-q2',
          category: 'vocabulary',
          questionText: 'The ability to speak, read, and write a language easily and accurately without hesitation is ______.',
          hint: 'Latin "fluere" (to flow): noun form ending in suffix "-ency"',
          options: ['fluency', 'hesitation', 'silence', 'alphabet'],
          correctIndex: 0,
          explanation: '"Fluency" is the smooth, effortless command of a language.',
          moveName: 'Grand Lexicon Burst'
        },
        {
          id: 'ber-3-q3',
          category: 'reading',
          questionText: '"The limits of my language mean the limits of my world." (Philosopher Ludwig Wittgenstein)\nWhat is the true meaning of this quote?',
          hint: 'Learning new languages opens up new worlds and opportunities',
          options: ['Learning new words and languages broadens your world and understanding', 'Maps should not have words', 'Only speak your mother tongue', 'Language is very small'],
          correctIndex: 0,
          explanation: 'Every new language you learn expands your thoughts, connections, and horizon across the globe!',
          moveName: 'Universal Polyglot Beam'
        },
        {
          id: 'ber-3-q4',
          category: 'spelling',
          questionText: 'Which word is spelled correctly for an impressive, honorable achievement in learning?',
          hint: 'Latin "accomplere": features doubled "cc" and nominal suffix "-ment"',
          options: ['accomplishment', 'acomplishment', 'accomplisment', 'accompleshment'],
          correctIndex: 0,
          explanation: '"Accomplishment" is spelled A-C-C-O-M-P-L-I-S-H-M-E-N-T.',
          moveName: 'Eternal Master Crown'
        }
      ]
    }
  ]
};
