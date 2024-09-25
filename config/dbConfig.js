const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});

conn.connect((err) => {
  if (err) {
    console.log("not connected");
  } else {
    console.log("connected");
  }
});

module.exports = conn;
