const express = require("express");
const fileDatas = require("../controller/fileController.js");
const connomDatas = require("../controller/commonController.js");
const router = express.Router();

router.post("/upload", fileDatas.upload, fileDatas.fileUpload);
router.post("/getEduData", connomDatas.getEduData);
router.post("/getExitMailEmp", connomDatas.exitMailEmpforDues);
router.post("/expenseInsertData", connomDatas.expenseInsertData);

module.exports = router;
