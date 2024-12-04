const { Router } = require('express');
const db = require('../connection');

const authRouter = Router();

authRouter.post('/login', function (req, res) {
  // Capture the input fields
  let { username, password } = req.body;
  console.log(username);

  // res.send(req.body.password)
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        // Authenticate the user
        req.session.loggedin = true;
        req.session.username = username;
        // Redirect to home page
        res.redirect('/home');
      } else {
        res.send('Incorrect Username and/or Password!');
      }
      res.end();
    });
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
});

module.exports = authRouter;