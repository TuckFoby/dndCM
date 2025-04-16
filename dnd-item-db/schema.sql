
CREATE TABLE IF NOT EXISTS Items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  rarity TEXT
);

CREATE TABLE Weapons (
    item_id INTEGER PRIMARY KEY,
    damage TEXT,
    attributes TEXT,
    weapon_type TEXT, -- e.g. melee, ranged
    properties TEXT,   -- e.g. finesse, reach
    item_value INTEGER,
    item_weight INTEGER,
    attunement_required BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (item_id) REFERENCES Items(id)
);

CREATE TABLE Armor (
    item_id INTEGER PRIMARY KEY,
    armor_class TEXT,
    required_attributes TEXT,
    armor_type TEXT, -- light, medium, heavy, shield
    item_value INTEGER,
    item_weight INTEGER,
    stealth_disadvantage BOOLEAN,
    FOREIGN KEY (item_id) REFERENCES Items(id)
);

CREATE TABLE Consumables (
    item_id INTEGER PRIMARY KEY,
    effect TEXT,
    uses INTEGER,
    duration TEXT,
    FOREIGN KEY (item_id) REFERENCES Items(id)
);

CREATE TABLE Tools (
    item_id INTEGER PRIMARY KEY,
    tool_type TEXT,
    proficiency_required BOOLEAN,
    FOREIGN KEY (item_id) REFERENCES Items(id)
);

