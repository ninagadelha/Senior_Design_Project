const express = require("express");
const { postSurveyResult, getUserSurveyResults } = require("./surveyResults.controller");

const router = express.Router();

router.post("/survey-results", postSurveyResult);
router.get("/survey-results/:userID/:programID", getUserSurveyResults);

module.exports = router;
