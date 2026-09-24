import { WeatherCondition, WeatherInfo } from '../types';

export const WEATHER_CYCLE_MS = 15 * 60 * 1000; // 15 minutes

export const ALL_WEATHER_CONDITIONS: WeatherCondition[] = [
  'sunny',
  'cloudy',
  'rainy',
  'thunderstorm',
  'snowy',
  'foggy',
  'windy'
];

export const WEATHER_DATA: Record<WeatherCondition, WeatherInfo> = {
  sunny: {
    condition: 'sunny',
    label: 'Sunny Skies',
    icon: '☀️',
    tempCelsius: 22,
    highCelsius: 25,
    lowCelsius: 16,
    humidity: 42,
    windSpeedKmh: 12,
    visibilityKm: 10,
    feelsLikeCelsius: 23,
    description: 'Clear golden sunshine warming the city streets, riverbanks, and historic monuments.',
    ambianceEffect: 'Golden sunlight motes & crystal-clear road visibility'
  },
  cloudy: {
    condition: 'cloudy',
    label: 'Partly Cloudy',
    icon: '⛅',
    tempCelsius: 18,
    highCelsius: 20,
    lowCelsius: 14,
    humidity: 62,
    windSpeedKmh: 16,
    visibilityKm: 9.5,
    feelsLikeCelsius: 18,
    description: 'Soft rolling clouds filtering gentle daylight over downtown plazas and avenues.',
    ambianceEffect: 'Calm diffuse daylight & drifting soft cloud shadows'
  },
  rainy: {
    condition: 'rainy',
    label: 'Rain Shower',
    icon: '🌧️',
    tempCelsius: 13,
    highCelsius: 15,
    lowCelsius: 10,
    humidity: 88,
    windSpeedKmh: 22,
    visibilityKm: 6,
    feelsLikeCelsius: 11,
    description: 'Steady raindrops pattering down on asphalt roads, transit stops, and sidewalks.',
    ambianceEffect: 'Diagonal falling rain streaks & pavement splashes'
  },
  thunderstorm: {
    condition: 'thunderstorm',
    label: 'Thunderstorm',
    icon: '⛈️',
    tempCelsius: 11,
    highCelsius: 13,
    lowCelsius: 9,
    humidity: 94,
    windSpeedKmh: 38,
    visibilityKm: 3.5,
    feelsLikeCelsius: 9,
    description: 'Dramatic dark storm clouds with rolling thunder, heavy downpours, and distant lightning flashes.',
    ambianceEffect: 'Heavy rainfall, dark storm vignette & occasional lightning flashes'
  },
  snowy: {
    condition: 'snowy',
    label: 'Winter Snowfall',
    icon: '❄️',
    tempCelsius: -2,
    highCelsius: 1,
    lowCelsius: -6,
    humidity: 78,
    windSpeedKmh: 14,
    visibilityKm: 5,
    feelsLikeCelsius: -5,
    description: 'Crisp winter snow fluttering peacefully down over roofs, bridges, and city parks.',
    ambianceEffect: 'Gently drifting snowflakes with winter frost ambiance'
  },
  foggy: {
    condition: 'foggy',
    label: 'Morning Mist & Fog',
    icon: '🌫️',
    tempCelsius: 9,
    highCelsius: 12,
    lowCelsius: 7,
    humidity: 96,
    windSpeedKmh: 7,
    visibilityKm: 1.2,
    feelsLikeCelsius: 8,
    description: 'A dense atmospheric fog blanketing the river, towers, and quiet cobblestone alleys.',
    ambianceEffect: 'Drifting atmospheric fog layers & soft glowing lamplight'
  },
  windy: {
    condition: 'windy',
    label: 'Windy Breeze',
    icon: '🍃',
    tempCelsius: 16,
    highCelsius: 18,
    lowCelsius: 12,
    humidity: 52,
    windSpeedKmh: 42,
    visibilityKm: 10,
    feelsLikeCelsius: 14,
    description: 'Fresh brisk gusts sweeping through tree-lined boulevards and fluttering shop awnings.',
    ambianceEffect: 'Fast-moving wind streams & swirling leaf particles'
  }
};

/**
 * Deterministically returns a random weather condition for the current 15-minute slot.
 * Ensures the weather changes randomly every 15 minutes, with no manual override needed.
 */
export const getRandomWeatherForTimestamp = (timestamp: number): WeatherCondition => {
  const slot = Math.floor(timestamp / WEATHER_CYCLE_MS);
  // Linear congruential generator hash for pure pseudo-random rotation
  const hash = Math.abs((slot * 1664525 + 1013904223) ^ (slot << 5)) % ALL_WEATHER_CONDITIONS.length;
  return ALL_WEATHER_CONDITIONS[hash];
};

/**
 * Converts Celsius to Fahrenheit: (C * 9/5) + 32
 */
export const celsiusToFahrenheit = (c: number): number => {
  return Math.round((c * 9) / 5 + 32);
};

/**
 * Formats a temperature into either °C or °F based on preference.
 */
export const formatTemperature = (celsius: number, unit: 'C' | 'F' = 'C'): string => {
  if (unit === 'F') {
    return `${celsiusToFahrenheit(celsius)}°F`;
  }
  return `${celsius}°C`;
};

/**
 * Mock realistic hourly forecast for the current day
 */
export interface HourlyForecastItem {
  timeLabel: string;
  condition: WeatherCondition;
  icon: string;
  tempCelsius: number;
}

export const getHourlyForecast = (currentCond: WeatherCondition, baseTemp: number): HourlyForecastItem[] => {
  const hours = ['Now', '+1h', '+2h', '+3h', '+4h', '+5h'];
  const variants: WeatherCondition[] = [currentCond, currentCond, 'cloudy', 'sunny', 'windy', 'rainy'];
  
  return hours.map((hour, index) => {
    const cond = index === 0 ? currentCond : variants[(index + (baseTemp % 3)) % variants.length];
    const item = WEATHER_DATA[cond];
    const tempDelta = Math.sin(index * 0.8) * 2;
    return {
      timeLabel: hour,
      condition: cond,
      icon: item.icon,
      tempCelsius: Math.round(baseTemp + tempDelta)
    };
  });
};

/**
 * Mock 5-day weather forecast
 */
export interface DailyForecastItem {
  dayLabel: string;
  condition: WeatherCondition;
  icon: string;
  highCelsius: number;
  lowCelsius: number;
}

export const getDailyForecast = (baseCond: WeatherCondition): DailyForecastItem[] => {
  const days = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri'];
  const list: WeatherCondition[] = [baseCond, 'cloudy', 'sunny', 'rainy', 'windy'];
  
  return days.map((day, i) => {
    const c = list[i % list.length];
    const data = WEATHER_DATA[c];
    return {
      dayLabel: day,
      condition: c,
      icon: data.icon,
      highCelsius: data.highCelsius,
      lowCelsius: data.lowCelsius
    };
  });
};
