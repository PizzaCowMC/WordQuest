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

export interface CityData {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [lat, lng]
  zoom: number;
  lessonTitle: string;
  lessonGrammarRule: string;
  bannerImage?: string;
  welcomeMessage: string;
  landmarks: string[];
  stations: TransitStation[];
  monsters: Monster[];
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
