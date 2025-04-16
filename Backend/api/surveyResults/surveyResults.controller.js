const srService = require("./surveyResults.service");
const { parse } = require('json2csv')

exports.postSurveyResult = async (req, res) => {
    const { userID, programID, civicEngagement, stemInterest,stemEfficacy,stemOutcome, researchOutcome, researchEfficacy, civicParticipation } = req.body;

    if (!userID || !programID || !civicEngagement || !stemInterest|| !stemEfficacy|| !stemOutcome|| !researchOutcome || !researchEfficacy || !civicParticipation) {
        return res.status(400).json({ message: "Missing required fields: userID, programID, civicEngagement, stemInterest,stemEfficacy,stemOutcome, researchOutcome, researchEfficacy, civicParticipation" });
    }
    try {
        // Query the Users table to find a user by the provided email
        const results = await srService.createSurveyResult(userID, programID, civicEngagement, stemInterest,stemEfficacy,stemOutcome, researchOutcome, researchEfficacy, civicParticipation);
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



exports.getProgramSurveyResults = async (req, res) => {
  const { programID } = req.body;

  if (!programID) {
    return res.status(400).json({ message: "Missing programID" });
  }

  try {
    // Fetch the survey results
    const results = await srService.getSurveyResultsByProgram(programID);

    // If no results are found, return a message
    if (results.length === 0) {
      return res.status(404).json({ message: 'No survey results found for this program' });
    }


    const questionArrays = [
      'civicEngagementArray',
      'civicParticipationArray',
      'stemInterestArray',
      'stemEfficacyArray',
      'stemOutcomeArray',
      'researchOutcomeArray',
      'researchEfficacyArray'
    ];

 // Specify the header names (fields you want)
 const questionHeaders = Array.from({ length: 100 }, (_, index) => ({
  label: `Q${index + 1}`,
  value: `Q${index + 1}`
}));

 const mainHeaders = [
  { label: 'Email', value: 'email' },
  { label: 'Age', value: 'age' },
  { label: 'Gender', value: 'gender' },
  { label: 'Ethnicity', value: 'ethnicity' },
  { label: 'civicEngagement', value: 'civicEngagement' },
  { label: 'stemInterest', value: 'stemInterest' },
  { label: 'stemEfficacy', value: 'stemEfficacy' },
  { label: 'stemOutcome', value: 'stemOutcome' },
  { label: 'researchOutcome', value: 'researchOutcome' },
  { label: 'researchEfficacy', value: 'researchEfficacy' }

];

const headers = [...mainHeaders, ...questionHeaders];



  const mappedResults = results.map(result => {
    // Create an array with main columns
    const mappedData = {
      email: result.email,
      age: result.age,
      gender: result.gender,
      ethnicity: result.ethnicity,
      civicEngagement: result.civicEngagement,
      stemInterest: result.stemInterest,
      stemEfficacy: result.stemEfficacy,
      stemOutcome: result.stemOutcome,
      researchOutcome: result.researchOutcome,
      researchEfficacy: result.researchEfficacy
    };

 // Combine the 7 arrays into one (representing answers to Q1, Q2, ..., Q113)
  const allAnswers = [
  ...(Array.isArray(result.civicEngagementArray) ? result.civicEngagementArray : []),
  ...(Array.isArray(result.civicParticipationArray) ? result.civicParticipationArray : []),
  ...(Array.isArray(result.stemInterestArray) ? result.stemInterestArray : []),
  ...(Array.isArray(result.stemEfficacyArray) ? result.stemEfficacyArray : []),
  ...(Array.isArray(result.stemOutcomeArray) ? result.stemOutcomeArray : []),
  ...(Array.isArray(result.researchOutcomeArray) ? result.researchOutcomeArray : []),
  ...(Array.isArray(result.researchEfficacyArray) ? result.researchEfficacyArray : [])
];

      // Map each answer to the correct question (Q1, Q2, ..., Q113)
      allAnswers.forEach((answer, index) => {
        mappedData[`Q${index + 1}`] = answer; // Map the answer to Q1, Q2, ..., Q113
      });

      return mappedData;
  });

// Convert the mapped results to CSV with custom headers
const csv = parse(mappedResults, { fields: headers });

// Set headers to trigger a file download in the browser
res.header('Content-Type', 'text/csv');
res.attachment('survey_results.csv'); // This will be the filename of the CSV file

// Send the CSV data as the response
return res.send(csv);

  } catch (error) {
    console.error('Error fetching Program Survey Results for admin:', error);
    res.status(500).send('Error fetching Program Survey Results for Admin');
  }
}

