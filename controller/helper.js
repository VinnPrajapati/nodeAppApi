const conn = require("../config/dbConfig");

function runQuery(query) {
  return new Promise((resolve, reject) => {
    conn.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function runQueryWithParam(query, param) {
  return new Promise((resolve, reject) => {
    conn.query(query, param, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = { runQuery, runQueryWithParam };
