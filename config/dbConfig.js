const mysql = require("mysql");

const conn = mysql.createConnection({
  // host: "",
  // user: "",
  // password: "",
  // database: "",
});

conn.connect((err) => {
  if (err) {
    console.warn("not connected");
  } else {
    console.warn("connected");
  }
});

module.exports = conn;
