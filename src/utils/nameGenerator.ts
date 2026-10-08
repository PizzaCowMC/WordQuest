// Unique Trainer Name Generator for Lexiroam
// Generates creative, linguistic, and adventurous names

const FIRST_NAMES = [
  'Zephyr', 'Aria', 'Kael', 'Nova', 'Atlas', 'Lyra', 'Orion', 'Vesper', 
  'Solas', 'Rowan', 'Caspian', 'Thorne', 'Astrid', 'Finn', 'Elio', 'Freya', 
  'Zane', 'Soren', 'Phoenix', 'Dante', 'Iris', 'Kai', 'Ember', 'Corin', 
  'Valen', 'Kaida', 'Rhea', 'Silas', 'Caelum', 'Theron', 'Selene', 'Ronan', 
  'Mirai', 'Evander', 'Leona', 'Bryn', 'Althea', 'Milo', 'Kalliope', 'Elysia'
];

const EPITHETS_AND_SURNAMES = [
  'Wordweaver', 'Lexicon', 'Stormrider', 'Starscribe', 'Glyphseeker', 
  'Spellbinder', 'Runeheart', 'Mythwalker', 'Dawnseeker', 'Sunstrider', 
  'Frostscribe', 'Silverleaf', 'Windwhisper', 'Cloudstride', 'Shadowbane', 
  'Brightvale', 'Ironverse', 'Nightbloom', 'Goldenglyph', 'Everward', 
  'Aetherwing', 'Skywarden', 'Chronoscribe', 'Verbum', 'Pathfinder'
];

const STANDALONE_EPIC_NAMES = [
  'Zephyros', 'Ariadne', 'Caspian', 'Valerius', 'Kaelen', 'Novalia', 
  'Orion', 'Theron', 'Solara', 'Archon Leo', 'Rune Meister', 'Sage Zephyr',
  'Aero Scholar', 'Chrono Maya', 'Stella Voss'
];

let lastGenerated = '';

/**
 * Generates a unique, charismatic trainer name.
 * Avoids returning the exact same name consecutively.
 */
export function generateUniqueTrainerName(): string {
  let newName = '';
  let attempts = 0;

  do {
    const mode = Math.random();
    if (mode < 0.25) {
      // Standalone epic name
      newName = STANDALONE_EPIC_NAMES[Math.floor(Math.random() * STANDALONE_EPIC_NAMES.length)];
    } else if (mode < 0.65) {
      // First + Epithet / Compound Surname (e.g. Zephyr Wordweaver)
      const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
      const last = EPITHETS_AND_SURNAMES[Math.floor(Math.random() * EPITHETS_AND_SURNAMES.length)];
      newName = `${first} ${last}`;
    } else {
      // First + "the" Title (e.g. Aria the Glyphseeker)
      const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
      const title = EPITHETS_AND_SURNAMES[Math.floor(Math.random() * EPITHETS_AND_SURNAMES.length)];
      newName = `${first} the ${title}`;
    }
    attempts++;
  } while (newName === lastGenerated && attempts < 10);

  lastGenerated = newName;
  return newName;
}
