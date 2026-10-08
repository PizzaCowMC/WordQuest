export interface UpdateLogEntry {
  version: string;
  releaseDate: string;
  title: string;
  highlight: string;
  tag: 'Major' | 'Feature' | 'Engine' | 'Polish';
  changes: string[];
}

export const APP_VERSION = '26.5.1';

export const UPDATE_LOGS: UpdateLogEntry[] = [
  {
    version: '26.5.1',
    releaseDate: 'October 2026',
    title: '25 New World Metropolises (9 in Taiwan), Moving Monsters, Settings Daily Missions & Pretty UI',
    highlight: 'Added 25 new expansive cities with 9 handcrafted Taiwanese metropolises, brought wild street monsters to life with continuous autonomous movement & facing orientation, seamlessly embedded Daily Missions right into the Settings tab with live reward claiming, added an "X" dismiss button on the controls guide banner with settings toggle, increased challenge with harder C2 and typing trials, and beautified all HUD and floating dock buttons!',
    tag: 'Major',
    changes: [
      '25 New World Metropolises Added (Total 175 Cities): Expanded the global tour from 150 to 175 metropolises, including 9 iconic Taiwanese cities (Taichung, Tainan, New Taipei City, Taoyuan, Hsinchu, Keelung, Chiayi, Hualien, Yilan) plus 16 global hubs (Kyoto, Sapporo, Fukuoka, Daegu, Genoa, Valencia, Seville, Manchester, Hamburg, Zurich, Lyon, Krakow, Auckland, Brisbane, Calgary, Geneva) with authentic landmarks and custom curricula.',
      'Harder and Harder Progressive Difficulty: Monsters in high-tier metropolises scale up to Lv. 650 with 5 to 6 HP (Legendaries 6 to 7 HP) and demanding 50/50 splits of keyboard typing challenges and extreme C2/GRE linguistics questions (negative inversions, mandative subjunctives, rhetorical devices).',
      'Living Autonomous Moving Monsters: Wild road monsters now actively patrol and roam the streets with smooth continuous physics, changing waypoints every few seconds, dynamically flipping orientation to face their walking direction, and triggering battles on player encounter.',
      'Closable Controls Tips with "X" Button: The floating controls guide card in the lower-left corner now features an instant "X" dismiss button with persistent memory, along with a quick "?" toggle button on the floating dock and a switch in the Settings menu.',
      'Daily Missions Integrated Inside Settings Tab: Transformed the Settings modal into an organized tabbed dashboard with "General Settings" and "Daily Missions". Trainers can track daily step counts, monster victories, and transit rides, and claim XP and coin payouts with celebratory confetti right in Settings.',
      'Pretty & Organized Buttons: Redesigned the top HUD into clean semantic clusters (Trainer status & location, transit & boss portals, smartphone & settings) and organized the floating map dock into three frosted glass utility modules.'
    ]
  },
  {
    version: '26.5.0',
    releaseDate: 'October 2026',
    title: 'Trainer Mastery & XP Charts Dashboard, Phone Stability & Harder Hints',
    highlight: 'Introduced the comprehensive Trainer Mastery & XP Analytics Dashboard with interactive SVG charts, full multi-tier XP progress bar, fixed smartphone audio crashes, and eradicated all ~-~-~-~ letter-by-letter giveaway hints in favor of rigorous linguistic etymological clues!',
    tag: 'Major',
    changes: [
      'Real Real Real Progress Bar & XP Dashboard: Launched full-featured Trainer Mastery modal accessible via the top XP bar and smartphone with exact numerical XP counters, percentage meters, and streak bonus multipliers.',
      'Interactive Mastery & Progression Charts: Built 4 custom SVG data visualizations including Curriculum Category Mastery Bar Chart, Level 1 to 1000 Exponential Trajectory Curve Chart with live player node pinpointer, 7-Day Weekly Study Activity Chart, and Level 1000 Milestone Unlocks Roadmap.',
      'Fixed Smartphone Audio & Lifecycle Crash: Safeguarded Web Audio synthesizer routines and AudioContext state transitions against browser restrictions, added global ErrorBoundary recovery, and made smartphone wardrobe and transit apps resilient to prevent app crashes.',
      'Removed All ~-~-~-~ Letter-Spelled Hints: Stripped all ~-~-~-~ letter-by-letter hyphenated hints (such as m-e-t, s-o-u-g-h-t, M-u-s-e-u-m, and P-y-r-a-m-i-d) that gave away exact answers without cognitive deduction.',
      'Harder Analytical Clues: Upgraded clue engine with deep pedagogical hints focused on Latin and Greek root stems, Germanic ablaut vowel shifts, dental preterite patterns, morphological affixes, and semantic domains.'
    ]
  },
  {
    version: '26.4.0',
    releaseDate: 'October 2026',
    title: 'Ascension to Level 1000, Mythic City Mobs, Final Boss & Master Question Bank',
    highlight: 'Added authentic leveling up to Lv. 1000 with real-time HUD XP progress bar, spawned 20 mythic special mobs in iconic world metropolises, unlocked the 8-phase Final Boss trial (The Grand Lexicon Archon), added 600 super challenging C2 linguistics questions and 1,000 interactive typing questions, and streamlined online multiplayer by removing chat!',
    tag: 'Major',
    changes: [
      'Real Level Up to Lv. 1000: Full exponential XP progression scaling from Level 1 to Level 1000 with 17 honorary rank titles (from Novice Word Explorer to Ascended Lexicon Sovereign). Defeating monsters, completing missions, and claiming rewards now directly power up your trainer level.',
      'Live HUD XP Progress Bar: Real-time interactive XP progress bar in the top navigation bar displaying trainer level badge, current percentage, exact XP to next level, and tooltip inspection.',
      'Special Mobs in Iconic Cities: Spawned 20 unique Mythic special guardians across world metropolises (including Chronomancer of Big Ben in London, Kitsune Kami of Shibuya in Tokyo, Phantom of Eiffel Aurora in Paris, Times Square Neon Leviathan in NYC, Sphinx in Cairo, Minotaur in Athens, and more) offering 1,500 XP.',
      'The Final Boss Encounter: Face The Grand Lexicon Archon (Lv.1000 Dragon) in the Citadel of Syntax with 8 grueling phases of super hard linguistics and keyboard typing challenges, granting 5,000 XP and the Archon Sovereign crown.',
      '600 Super Challenging Questions: Added 600 extreme C2 / GRE-level questions covering mandative subjunctives, negative inversions, litotes, rhetorical devices, and nuanced etymology.',
      '1,000 Not Multiple Choice Questions: Added 1,000 interactive typing challenges where trainers must directly type the exact word, irregular past tense, comparative, or orthographic spelling instead of picking options.',
      'Removed Multiplayer Chat: Completely removed the multiplayer chat drawer and text message input to provide a pristine, distraction-free environment while keeping 100% real online multiplayer trainer presence, map roaming, and 1v1 knowledge duels intact.'
    ]
  },
  {
    version: '1.14.0',
    releaseDate: 'October 2026',
    title: '100% Real Online Multiplayer & Server Authoritative Movement',
    highlight: 'Eliminated all bot simulations and replaced them with genuine human-only multiplayer synchronization and clean player movement across world metropolises!',
    tag: 'Feature',
    changes: [
      'Pure Human Online Multiplayer: Removed all simulated bot trainers so every remote explorer visible on the city map is a genuine online player.',
      'Server-Authoritative Position Sync: Smooth position replication and compass heading updates across all connected browsers.',
      '1v1 Knowledge Duels: Challenge real trainers roaming the city streets to real-time curriculum battles.'
    ]
  },
  {
    version: '1.13.1',
    releaseDate: 'October 2026',
    title: 'Sequential World Tour, Airport Flight Clearance & Player Name Polish',
    highlight: 'Enforced authentic world tour progression where trainers must clear all city monsters before taking off, added live airport runway clearance indicators, and polished map player nameplates!',
    tag: 'Feature',
    changes: [
      'Sequential City Progression: Replaced unrestricted city jumping with linear world tour progression. Trainers can only advance to the next scheduled metropolis in sequence once the current city is finished.',
      'Airport Runway Clearance Gating: International flight clearance is now strictly tied to city defense. Local runways are grounded until all roaming monsters in the current metropolis are defeated.',
      'Live Airport Map Indicators: Physical Airport Terminal map markers and top-bar shortcuts now show real-time monster progress badges (e.g. "🔒 Grounded (X/Y)" vs "✅ Runway Cleared • Fly Now").',
      'Revisitation Route: Cleared and previously visited destinations remain open for exploration and review, while unreached cities are locked.',
      'Player Nameplate Cleanup: Removed stray template comments and added responsive text truncation with tooltip support for clean player and creature tags.'
    ]
  },
  {
    version: '1.12.0',
    releaseDate: 'October 2026',
    title: 'Expansive World Metropolises & Widely Scattered Monsters',
    highlight: 'Every city expanded to a massive 25-50km metropolitan region with 5 concentric rings (Core, Mid-City, Outer Boroughs, Perimeter Horizons, Frontier Ridges) and widely scattered mobs across all 360 compass degrees!',
    tag: 'Major',
    changes: [
      'Massive City Dimensions: Scaled all city territories across expansive 25 to 50+ kilometer boundaries spanning downtown squares, outer borough hills, coastal harbors, and perimeter aerotropolis corridors.',
      'Widely Scattered Mobs: Exactly 20 mobs per city are evenly and widely distributed across 5 concentric metropolitan rings (radii up to 26+ km) using non-clustering radial dispersion so mobs never bunch up.',
      'Metropolis Overview Camera: Added a dedicated "Fit Full Metropolis Overview" button allowing instant panoramic framing of the entire immense city territory and its scattered creatures.',
      'Enhanced Zoom Capabilities: Expanded zoom range down to level 11, giving players a satellite-level regional view of distant sectors and scattered monsters.',
      'Dynamic Radar Mini-Map: Updated radar zoom to capture scattered monsters and transit stations across outer districts.',
      'High-Speed City Exploration: Upgraded vehicle cruising speeds for bicycles, buses, taxis, and foot patrols for brisk and agile traversal across the vast city landscape.',
      'District Sector Naming: Each mob is designated with realistic cardinal district names (Northgate Skyway, Eastside Harbor Promenade, Aerotropolis Corridor, Sunset Hills Overlook) based on its spatial quadrant.'
    ]
  },
  {
    version: '1.11.0',
    releaseDate: 'October 2026',
    title: '150 World Cities, 50 Mobs Per City, Smooth Physics & Airport Terminals',
    highlight: 'Massive world expansion to 150 global destinations with 50 autonomous monsters per city (7,500 total mobs), smooth acceleration/friction physics, famous monuments where mobs hide inside, physical airport terminal boarding procedure, and enhanced cinematic airplane footage!',
    tag: 'Major',
    changes: [
      '150 World Cities: Unlocked 150 planetary capitals and metropolises across all continents (from Tokyo and London to Athens, Reykjavik, Rio, and Cairo) with custom landmarks and cultural curriculum.',
      '50 Mobs Per City (7,500 Road Monsters): Each city is populated by 50 elemental monsters with custom questions and rarity tiers.',
      'Smoother Physics Engine: Continuous velocity vector engine with acceleration, friction damping, fluid turning interpolation, and soft boundary cushioning.',
      'Autonomous Mob Movement: Undefeated mobs wander the city streets on their own within organic patrol zones, reacting to player approach.',
      'Famous Monuments & Interior Hiding: Historical monuments (museums, palaces, towers, citadels) mark each city where mobs can hide inside; click to inspect lore and encounter hidden creatures.',
      'Physical Airport & Boarding: Walk into the physical Airport Terminal to complete check-in, baggage weighing, customs security quiz, and boarding pass scan.',
      'Cinematic Airplane Footage: Realistic 3D jetliner footage featuring 3 switchable camera angles (Chase Cam, Passenger Wing Window, Cockpit Synthetic Vision HUD), banking aerodynamics, and contrails.',
      'Multiplayer Stability: Fixed repeated "entered the world" chat spam bug with per-session announcement deduplication and stable player IDs.',
      'Daily Missions System: Daily educational mission board providing 3 random curriculum tasks for bonus XP and coins.'
    ]
  },
  {
    version: '1.10.0',
    releaseDate: 'October 2026',
    title: 'Global Metropolis Expansion & 118 Road Monsters',
    highlight: 'Expanded to 36 iconic world cities with 118 elemental road monsters, 30+ new transit hubs, and advanced curriculum lessons.',
    tag: 'Major',
    changes: [
      'World Expansion: Added 10 brand-new world cities (Singapore, Mexico City, Vancouver, Stockholm, Nairobi, Vienna, Lima, Auckland, Taipei, and Prague), bringing the global quest to 36 world cities.',
      'City Roster Deduplication: Resolved duplicate city entries and introduced Dublin (Ireland) as City 11 with custom Irish literary and folklore challenges.',
      'Monster Dex: Expanded total monster encounters from 59 to 118 unique road monsters across all 36 world cities, with each city now featuring 3 to 4 distinct creatures.',
      'Curriculum Growth: Added new curriculum lessons covering Future Perfect & Continuous, Mixed Conditionals, Subjunctive Mood, Discourse Markers, Three-Word Phrasal Verbs, Rhetorical Inversion, and Metaphors.',
      'Rapid Transit: Added over 30 new express subway, bullet train, ferry, and taxi transit stations across the new metropolis street maps.',
      'Interactive Battles: All 118 road monsters feature 4 curriculum-aligned questions with dynamic option shuffling and randomized letter badge distributions.'
    ]
  },
  {
    version: '1.9.6',
    releaseDate: 'October 2026',
    title: 'Silky Smooth Walking & Answer Randomization',
    highlight: '60FPS requestAnimationFrame continuous walking engine and intelligent multiple-choice shuffling.',
    tag: 'Engine',
    changes: [
      'Engine: 60FPS continuous game-loop movement using requestAnimationFrame with diagonal velocity normalization.',
      'Controls: Zero-latency instantaneous key response on WASD and Arrow keys, eliminating the 500ms OS key-repeat pause.',
      'Camera: Seamless real-time camera tracking with zero Leaflet animation queue conflicts or camera stutter.',
      'Gameplay: Dynamic question option randomization ensuring consecutive battle questions never share the same answer letter.',
      'Multiplayer: Added letter badges (A, B, C, D) and randomized option pools for 1v1 English Knowledge Duels.',
      'System: Full Version History & Update Logs archive from v1.0.0 through v1.9.6.'
    ]
  },
  {
    version: '1.9.5',
    releaseDate: 'September 2026',
    title: 'Real-Time Multiplayer & Live 1v1 Duels',
    highlight: 'Server-authoritative WebSockets, live trainer avatars on city streets, and 1v1 quiz duels.',
    tag: 'Major',
    changes: [
      'Multiplayer: Full WebSocket integration on port 3000 with real-time player position syncing.',
      'Social: Live player avatars and companion sprites roaming street maps worldwide.',
      'Duels: Instant 1v1 English Knowledge Duels with 20-second timers, live scoring, and coin/XP rewards.',
      'Party Codes: Global room and custom private party channels for friend groups and classrooms.',
      'Chat & Emotes: Interactive slide-out chat drawer with global victory feeds and 6 quick-reaction emotes.'
    ]
  },
  {
    version: '1.9.0',
    releaseDate: 'August 2026',
    title: '26-City Worldwide Expansion & Express Transit',
    highlight: 'Global itinerary from London to Rio de Janeiro with 104 street monsters and city transit hubs.',
    tag: 'Major',
    changes: [
      'World: Expanded from 12 to 26 world capitals (including Seoul, Berlin, Cairo, Sydney, and Rio).',
      'Transit: City Express Lines Rapid Transit Hubs with Subway, Train, Taxi, and Bus stops.',
      'Fast Travel: Direct teleportation between unlocked district stations via transit passes.',
      'Questions: 104 unique curriculum-aligned grammar, reading, and vocabulary lessons.'
    ]
  },
  {
    version: '1.8.0',
    releaseDate: 'July 2026',
    title: 'Dynamic 15-Minute Weather Engine & Forecasts',
    highlight: 'Procedural real-time weather system with temperature unit toggling (°C / °F).',
    tag: 'Feature',
    changes: [
      'Weather: Automatic 15-minute procedural weather cycle (Sunny, Rainy, Thunderstorm, Foggy, Snow, Sunset).',
      'Visuals: Canvas-based rain drops, lightning flash pulses, and atmospheric fog overlays.',
      'Forecasts: Hourly and 5-day weather forecasts available inside the smartphone app.',
      'Settings: Seamless global switching between Celsius (°C) and Fahrenheit (°F).'
    ]
  },
  {
    version: '1.7.0',
    releaseDate: 'June 2026',
    title: '3-Time Check Guard & 3D Flight Sequences',
    highlight: 'Educational safety net with remedial explanations and cinematic inter-city flights.',
    tag: 'Feature',
    changes: [
      'Pedagogy: 3-Check Guard providing 3 attempts per question before triggering grammar review cards.',
      'Flights: 3D airplane flight sequences with realistic flight times and travel distance logging.',
      'Review: In-depth teacher explanations and clue hints for difficult questions.'
    ]
  },
  {
    version: '1.6.0',
    releaseDate: 'May 2026',
    title: 'Smartphone OS & 3-Slot Adventure Save System',
    highlight: 'In-game smartphone with apps and local/exportable adventure save slots.',
    tag: 'Feature',
    changes: [
      'Smartphone: Virtual smartphone modal with Weather, Wardrobe, Transit Tickets, and Settings apps.',
      'Saves: 3 dedicated local save slots with quick save and JSON backup export/import.',
      'Wardrobe: Customizable outfit colors, trainer avatars, titles, and accessories.'
    ]
  },
  {
    version: '1.5.0',
    releaseDate: 'April 2026',
    title: 'Daily Login Streaks & Real-Time Radar Mini-Map',
    highlight: 'Daily attendance bonuses and HUD radar overlay with live monster tracking.',
    tag: 'Feature',
    changes: [
      'Rewards: Daily streak multipliers with bonus coins and XP for regular practice.',
      'Mini-Map: Real-time district radar HUD displaying trainer position and nearby monsters.',
      'Toggle: Dedicated settings switch to enable or disable the mini-map radar overlay.'
    ]
  },
  {
    version: '1.4.0',
    releaseDate: 'March 2026',
    title: 'Audio Synthesizer & English Speech Pronunciation',
    highlight: 'Custom 8-bit sound effects and Web Speech API audio for reading practice.',
    tag: 'Polish',
    changes: [
      'Audio: Web Audio API retro sound synthesizer with attack hits, fanfares, car horns, and chimes.',
      'Speech: Natural English pronunciation TTS for all question prompts and dialogue.',
      'Mute: Global audio toggle accessible from the HUD, settings, and phone.'
    ]
  },
  {
    version: '1.3.0',
    releaseDate: 'February 2026',
    title: 'Mobile Virtual Joystick & District Safety Bounds',
    highlight: 'On-screen touch controls and boundary clamping.',
    tag: 'Polish',
    changes: [
      'Touch: Responsive floating virtual analog joystick for smooth phone and tablet navigation.',
      'Boundaries: Strict mathematical coordinate clamping locking players inside the active city district.',
      'Responsive: Optimized mobile UI layout with touch-friendly buttons and gestures.'
    ]
  },
  {
    version: '1.2.0',
    releaseDate: 'January 2026',
    title: 'Elemental Monster Types & Rarity Tiers',
    highlight: 'Electric, Fire, Water, Grass, Psychic, and Dragon monster classes.',
    tag: 'Feature',
    changes: [
      'Elements: 6 elemental types with color-coded auras and custom elemental attacks.',
      'Rarity: Common, Rare, Epic, and Legendary monster classifications with custom stat bars.',
      'Capture: Interactive capture orb sequence with particle confetti celebrations.'
    ]
  },
  {
    version: '1.1.0',
    releaseDate: 'December 2025',
    title: 'Starter Companions & Field Guide Passport',
    highlight: 'Choose Voltling, Pyropup, Aquatail, or Leafox as your English learning partner.',
    tag: 'Feature',
    changes: [
      'Starters: 4 companion creatures with unique personalities and companion avatars.',
      'Field Guide: Interactive passport collecting defeated monsters, city stamps, and badges.',
      'Levels: Level-up progression system with XP curves and rank titles.'
    ]
  },
  {
    version: '1.0.0',
    releaseDate: 'November 2025',
    title: 'Initial Release: Lexiroam Street Adventure',
    highlight: 'Real-world street map English learning adventure.',
    tag: 'Major',
    changes: [
      'World: Real Leaflet OpenStreetMap exploration across initial world cities.',
      'Combat: Turn-based English grammar and vocabulary challenges on real city roads.',
      'Vehicles: Walking and bicycle movement modes.',
      'Student Profile: Character creation with custom names and companion selection.'
    ]
  }
];
