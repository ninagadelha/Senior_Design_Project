const express = require("express");
const srController = require('./surveyResults.controller')
const router = express.Router();


router.post("/survey-results", srController.postSurveyResult);
router.get("/survey-results", srController.getUserSurveyResults);
router.get("/program-survey-results", srController.getProgramSurveyResults);

module.exports = router;
