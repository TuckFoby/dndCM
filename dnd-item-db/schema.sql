CREATE TABLE IF NOT EXISTS MagicItems (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  rarity TEXT,
  attunement_required BOOLEAN DEFAULT FALSE
);
