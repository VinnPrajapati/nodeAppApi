const mysql = require("mysql");

const conn = mysql.createConnection({
  // host: "",
  // user: "",
  // password: "",
  // database: "",
  host: "45.79.125.127",
  user: "localconnect",
  password: "india@123",
  database: "ems",
});

conn.connect((err) => {
  if (err) {
    console.warn("not connected");
  } else {
    console.warn("connected");
  }
});

module.exports = conn;
