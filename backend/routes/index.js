const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  db.serialize(() => {
    db.all("SELECT * FROM my_table", (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err.message);
      } else {
        res.send(rows);
      }
    });
  });
});

module.exports = router;
