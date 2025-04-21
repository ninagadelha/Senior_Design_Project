const questionsService = require('./questions.service');
const { parse } = require('json2csv');


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


  exports.getQuestionsCSV = async (req, res) => {
    try {
      const questions = await questionsService.getAllQuestions();
      // Map to desired format: Q{question_id} and question_text
      const mappedQuestions = questions.map((q, index) => ({
        QuestionNumber: `Q${index + 1}`, // Index-based numbering starting from Q1
        QuestionText: q.question_text
      }));

    // Define headers explicitly
    const fields = [
      { label: 'QuestionNumber', value: 'QuestionNumber' },
      { label: 'QuestionText', value: 'QuestionText' }
    ];

    const csv = parse(mappedQuestions, { fields });

    res.header('Content-Type', 'text/csv');
    res.attachment('MySTEMGrowthQuestions.csv');
    return res.send(csv);

    } catch (error) {
      console.error('Error Creating questions CSV:', error);
      res.status(500).send('Error Creating questions CSV');
    }
  };