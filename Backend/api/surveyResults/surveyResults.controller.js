const srService = require("./surveyResults.service");

exports.postSurveyResult = async (req, res) => {
    const { userID, programID, civicEngagement, stemInterest,stemEfficacy,stemOutcome, researchOutcome, researchEfficacy } = req.body;

    if (!userID || !programID || !civicEngagement || !stemInterest|| !stemEfficacy|| !stemOutcome|| !researchOutcome || !researchEfficacy) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        // Query the Users table to find a user by the provided email
        const results = await srService.createSurveyResult(userID, programID, civicEngagement, stemInterest,stemEfficacy,stemOutcome, researchOutcome, researchEfficacy);
          // User found with the provided email
          res.json({
            message: 'Results Saved Succesfully:',
            Results: results
          });
      }
      catch (error) {
        console.error('Error saving User Survey Results:', error);
        res.status(500).send('Error saving User Survey Results');
      }
    };


exports.getUserSurveyResults = async (req, res) => {
    const { userID, programID } = req.body;

    if (!userID || !programID) {
        return res.status(400).json({ message: "Missing userID or programID" });
    }

try {
    // Query the Users table to find a user by the provided email
    const results = await srService.getSurveyResultsByUser(userID, programID);
      // User found with the provided email
      res.json({
        message: 'User results:',
        Results: results
      });
  }
  catch (error) {
    console.error('Error fetching User Survey Results:', error);
    res.status(500).send('Error fetching User Survey Results');
  }
};
