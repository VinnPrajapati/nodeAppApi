const express = require("express");
const commonData = require("../controller/commonData.js");

const router = express.Router();

router.post("/upload", commonData.upload, commonData.fileUpload);

module.exports = router;
