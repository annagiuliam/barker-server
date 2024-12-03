require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const db = require('./connection');
const PORT = process.env.PORT || 3000;

//Routers
const authRouter = require('./routes/authRouter');

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json());

app.use('/auth', authRouter);


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

app.post('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/home', function (req, res) {
  res.send('Welcome back, ' + req.session.username + '!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})