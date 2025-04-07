const express = require("express");
const srController = require('./surveyResults.controller')
const router = express.Router();


router.post("/survey-results", srController.postSurveyResult);
router.get("/survey-results", srController.getUserSurveyResults);

module.exports = router;
