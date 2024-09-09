const express = require("express");
const conn = require("../config/dbConfig");
const multer = require("multer");
const path = require("path");

// Set up Multer storage configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads"); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      ); // Correct filename format
    },
  }),
}).single("userFile");

// Handle file upload and response
const fileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    console.log("File:", req.file);
    console.log("Body:", req.body);
    res.send("File uploaded successfully!");
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).send("File upload failed.");
  }
};

module.exports = {
  upload,
  fileUpload,
};
