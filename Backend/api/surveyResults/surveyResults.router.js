const express = require("express");
const srController = require('./surveyResults.controller')
const router = express.Router();


router.post("/survey-results", srController.postSurveyResult);
router.post("/survey-results-user", srController.getUserSurveyResults);
router.post("/program-survey-results", srController.getProgramSurveyResults);

module.exports = router;
