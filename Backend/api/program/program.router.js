const express = require('express');
const programController = require('./program.controller')
const router = express.Router();

//define routes and map them to controller methods
router.post("/newprogram", programController.postnewprogram);
//router.put("/editprogram", programController.putprogram);
router.get("/getprograms", programController.getPrograms)

module.exports = router;