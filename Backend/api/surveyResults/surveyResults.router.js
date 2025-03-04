const router = require("express").Router();
const { postSurveyResult, getUserSurveyResults } = require("./surveyResults.controller");

router.post("/survey-results", postSurveyResult);
router.get("/survey-results/:userID", getUserSurveyResults);

module.exports = router;
