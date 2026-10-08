import { CityData } from '../types';

export interface RandomSpotResult {
  position: [number, number];
  name: string;
  type: 'station' | 'building' | 'airport' | 'street';
}

/**
 * Generates or selects a random spot across the city to run away to.
 * Ensures the destination is far enough from current position so the escape is exciting.
 */
export function getRandomCitySpot(city: CityData, currentPos?: [number, number]): RandomSpotResult {
  const candidates: RandomSpotResult[] = [];

  // 1. Rapid transit stations
  if (city.stations && city.stations.length > 0) {
    city.stations.forEach(stn => {
      candidates.push({
        position: stn.position,
        name: `${stn.name} (${stn.type.toUpperCase()})`,
        type: 'station'
      });
    });
  }

  // 2. Cultural monuments and historical buildings
  if (city.buildings && city.buildings.length > 0) {
    city.buildings.forEach(bldg => {
      candidates.push({
        position: bldg.position,
        name: bldg.name,
        type: 'building'
      });
    });
  }

  // 3. International airport
  if (city.airport) {
    candidates.push({
      position: city.airport.position,
      name: `${city.airport.name} Concourse`,
      type: 'airport'
    });
  }

  // 4. Street monster intersections
  if (city.monsters && city.monsters.length > 0) {
    city.monsters.slice(0, 12).forEach(m => {
      candidates.push({
        position: [m.position[0] + 0.002, m.position[1] - 0.002],
        name: `${m.streetName} Crossing`,
        type: 'street'
      });
    });
  }

  // 5. Fallback random spots around coordinates
  if (candidates.length === 0) {
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const dist = 0.018 + (i * 0.004);
      candidates.push({
        position: [
          city.coordinates[0] + Math.sin(angle) * dist,
          city.coordinates[1] + Math.cos(angle) * dist
        ],
        name: `${city.name} District Sector #${i + 1}`,
        type: 'street'
      });
    }
  }

  // Filter out candidates too close to current position (must be at least ~500m away)
  let filtered = candidates;
  if (currentPos) {
    filtered = candidates.filter(c => {
      const dist = Math.hypot(c.position[0] - currentPos[0], c.position[1] - currentPos[1]);
      return dist > 0.005;
    });
    if (filtered.length === 0) {
      filtered = candidates;
    }
  }

  return filtered[Math.floor(Math.random() * filtered.length)];
}
