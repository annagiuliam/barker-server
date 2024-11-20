require("dotenv").config();
const express = require('express');

const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const db = require('./connection');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MySQL


// Routes
app.get('/accounts', (req, res) => {
  db.query('SELECT * FROM accounts', (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching users');
      return;
    }
    res.json(results);
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})