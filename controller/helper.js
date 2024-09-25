const conn = require("../config/dbConfig");
const multer=require('multer');

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

// Helper function for file uploads
function uploadFile(req) {
  return new Promise((resolve, reject) => {
      const storage = multer.diskStorage({
          destination: (req, file, cb) => {
              const reqType = req.body.reqType || '';
              // const dir = path.join(__dirname, '/../expense', reqType.charAt(0).toUpperCase() + reqType.slice(1));
              const formattedType = reqType.charAt(0).toUpperCase() + reqType.slice(1); // Capitalize the first letter
              const dir = path.join(__dirname, `expense${formattedType}`); // Remove the '/..' and use `expense${formattedType}` directly

              fs.mkdirSync(dir, { recursive: true }); // Create directory if it doesn't exist
              cb(null, dir);
          },
          filename: (req, file, cb) => {
              const employeeID = req.body.EmployeeID;
              const ext = path.extname(file.originalname).toLowerCase();
              const newFileName = `${employeeID}_${new Date().toISOString().replace(/:/g, '-')}${ext}`;
              cb(null, newFileName);
          }
      });

      const upload = multer({ storage }).single('receipt_image');

      upload(req, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(req.file.filename);
          }
      });
  });
}

module.exports = { runQuery, runQueryWithParam, uploadFile};
