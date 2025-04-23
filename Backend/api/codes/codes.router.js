const express = require('express');
const codeController = require('./codes.controller')
const router = express.Router();

//define routes and map them to controller methods
router.post("/newadmincode", codeController.postNewAdminCode);
//router.put("/editprogram", programController.putprogram);
router.get("/getAdminCodes", codeController.getAllCodes);

router.delete("/deletecode", codeController.deleteCode);

router.post("/joinNewProgram", codeController.joinNewProgram)
module.exports = router;