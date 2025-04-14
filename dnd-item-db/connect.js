const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Magic items SQLite database file (separate from user DB)
const dbPath = path.join(__dirname, 'DNDItems.db');
const DNDItemDb = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Failed to connect to DND Items DB:', err);
  else console.log('Connected to DND Items database.');
});

module.exports = DNDItemDb;
