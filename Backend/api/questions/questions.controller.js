const questionsService = require('./questions.service');


//controller methods
exports.getAllQuestions = async (req, res) => {
    try {
      const questions = await questionsService.getAllQuestions();
      res.json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).send('Error fetching questions');
    }
  };