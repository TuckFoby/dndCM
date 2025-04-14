const db = require('./connect');

const getAllDNDItems = (callback) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    callback(err, rows);
  });
};

module.exports = { getAllDNDItems };
