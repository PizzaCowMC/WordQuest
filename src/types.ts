export type ElementType = 
  | 'Electric' 
  | 'Fire' 
  | 'Water' 
  | 'Grass' 
  | 'Psychic' 
  | 'Ice' 
  | 'Dragon' 
  | 'Fairy'
  | 'Wind';

export type MonsterRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface Question {
  id: string;
  category: 'grammar' | 'vocabulary' | 'spelling' | 'reading';
  questionText: string;
  hint?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  moveName: string; // e.g. "Flame Blast", "Hydro Pump", "Thunder Shock"
}

export interface Monster {
  id: string;
  name: string;
  type: ElementType;
  level: number;
  hp: number;
  maxHp: number;
  position: [number, number]; // [lat, lng]
  streetName: string;
  spriteColor: string;
  description: string;
  avatarIcon: string;
  rarity?: MonsterRarity;
  auraColor?: string;
  lessonTopic?: string;
  questions: Question[];
  defeated?: boolean;
}

export type VehicleType = 
  | 'walk' 
  | 'bicycle' 
  | 'taxi' 
  | 'car' 
  | 'bus' 
  | 'subway' 
  | 'bullet_train';

export interface TransitStation {
  id: string;
  name: string;
  position: [number, number];
  type: 'subway' | 'train' | 'taxi' | 'bus';
  lines: string[];
  icon: string;
  speedMultiplier: number;
  description: string;
}

export interface TransitTicket {
  id: string;
  vehicleType: VehicleType;
  title: string;
  icon: string;
  costCoins: number;
  durationLabel: string;
  description: string;
  speedMultiplier: number;
}

export type MissionCategory = 
  | 'grammar' 
  | 'exploration' 
  | 'battle' 
  | 'vocabulary' 
  | 'transit' 
  | 'monument' 
  | 'duel'
  | 'airport';

export interface DailyMission {
  id: string;
  category: MissionCategory;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  xpReward: number;
  coinReward: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
}

export interface CityBuilding {
  id: string;
  name: string;
  type: 'museum' | 'palace' | 'tower' | 'cathedral' | 'library' | 'theater' | 'observatory' | 'airport' | 'castle' | 'monument';
  position: [number, number];
  icon: string;
  description: string;
  historicalFact: string;
  hiddenMonsterIds?: string[];
}

export interface CityAirport {
  id: string;
  name: string;
  code: string;
  position: [number, number];
  terminalDescription: string;
}

export interface CityData {
  id: string;
  name: string;
  country: string;
  continent?: string;
  coordinates: [number, number]; // [lat, lng]
  zoom: number;
  lessonTitle: string;
  lessonGrammarRule: string;
  bannerImage?: string;
  welcomeMessage: string;
  landmarks: string[];
  stations: TransitStation[];
  monsters: Monster[];
  buildings?: CityBuilding[];
  airport?: CityAirport;
}

export interface StarterCompanion {
  id: string;
  name: string;
  type: ElementType;
  color: string;
  description: string;
  avatar: string;
}

export interface TrainerAppearance {
  avatar: string; // Emoji or character representation
  title: string;  // e.g. "Star Explorer", "Word Detective", "Aero Scholar"
  outfitColor: string; // Hex color code
  accessory: string; // e.g. "Smart Glasses", "Adventurer Hat", "Headphones"
  genderStyle: string; // Label
}

export interface StudentProfile {
  name: string;
  appearance: TrainerAppearance;
  activeVehicle: VehicleType;
  starter: StarterCompanion;
  level: number;
  xp: number;
  coins: number;
  travelMinutesSpent: number;
  defeatedMonsterIds: string[];
  capturedMonsters: string[]; // Monster IDs
  currentCityIndex: number;
  visitedCities: string[];
  unlockedVehicles?: VehicleType[];
  purchasedTickets?: string[];
  lastDailyRewardDate?: string; // YYYY-MM-DD
  dailyStreak?: number; // 1 to 7
  tempUnit?: 'C' | 'F'; // Temperature display preference
}

export type WeatherCondition = 
  | 'sunny' 
  | 'cloudy' 
  | 'rainy' 
  | 'thunderstorm' 
  | 'snowy' 
  | 'foggy' 
  | 'windy';

export interface WeatherInfo {
  condition: WeatherCondition;
  label: string;
  icon: string;
  tempCelsius: number;
  highCelsius: number;
  lowCelsius: number;
  humidity: number;
  windSpeedKmh: number;
  visibilityKm: number;
  feelsLikeCelsius: number;
  description: string;
  ambianceEffect: string;
}

// -------------------------------------------------------------
// MULTIPLAYER INTERFACES
// -------------------------------------------------------------

export interface MultiplayerPlayer {
  id: string;
  name: string;
  avatar: string;
  clothingColor?: string;
  companionId?: string;
  cityIndex: number;
  cityName: string;
  pos: { lat: number; lng: number };
  facing: 'left' | 'right' | 'up' | 'down';
  vehicle: VehicleType | string;
  level: number;
  title: string;
  lastActive: number;
  room: string;
  currentEmote?: {
    emoji: string;
    text?: string;
    timestamp: number;
  };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: number;
  room: string;
  isAnnouncement?: boolean;
}

export interface DuelSession {
  id: string;
  challengerId: string;
  challengerName: string;
  opponentId: string;
  opponentName: string;
  question: {
    prompt: string;
    options: string[];
    correctAnswer: string;
  };
  challengerAnswer?: string;
  opponentAnswer?: string;
  winnerId?: string | 'tie';
  status: 'pending' | 'active' | 'finished';
  expiresAt: number;
}

