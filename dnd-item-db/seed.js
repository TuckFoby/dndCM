const db = require('./connect');

const seedItems = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS MagicItems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        rarity TEXT,
        attunement_required BOOLEAN DEFAULT FALSE
      )
    `);

    const stmt = db.prepare(`
      INSERT INTO MagicItems (name, description, rarity, attunement_required)
      VALUES (?, ?, ?, ?)
    `);

    stmt.run('Cloak of Invisibility', 'Grants invisibility for a limited duration.', 'Legendary', true);
    stmt.run('Potion of Healing', 'Restores 2d4+2 HP when consumed.', 'Common', false);
    stmt.finalize(() => {
      console.log('Magic items seeded!');
      db.close();
    });
  });
};

seedItems();