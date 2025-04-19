const express = require('express');
const questionsController = require('./questions.controller')
const router = express.Router();

//define routes and map them to controller methods
router.get("/questions", questionsController.getAllQuestions);
router.get("/questionsCSV", questionsController.getQuestionsCSV);


module.exports = router;