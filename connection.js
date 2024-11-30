const mysql = require('mysql');

const db = mysql.createConnection(process.env.DB_CONNECTION);
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

module.exports = db;