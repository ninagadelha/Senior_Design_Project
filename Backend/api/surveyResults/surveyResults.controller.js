const srService = require("./surveyResults.service");
const { parse } = require('json2csv')

//this puts a new survey result into the database
exports.postSurveyResult = async (req, res) => {
    const { userID, programID, civicEngagement, stemInterest,stemEfficacy,stemOutcome, researchOutcome, researchEfficacy, civicParticipation, taken_survey} = req.body;

    if (!userID || !programID || !civicEngagement || !stemInterest|| !stemEfficacy|| !stemOutcome|| !researchOutcome || !researchEfficacy || !civicParticipation || !taken_survey) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        // Query the Users table to find a user by the provided email
        const results = await srService.createSurveyResult(userID, programID, civicEngagement, stemInterest,stemEfficacy,stemOutcome, researchOutcome, researchEfficacy, civicParticipation, taken_survey);
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


    //this gets all of the user's survey results given a userid and programid
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



//This creates the excel export for admin user type
exports.getProgramSurveyResults = async (req, res) => {
  const { programID } = req.body;

  if (!programID) {
    return res.status(400).json({ message: "Missing programID" });
  }

  try {
    const results = await srService.getSurveyResultsByProgram(programID);

    if (!results.length) {
      return res.status(404).json({ message: 'No survey results found for this program' });
    }

    const headers = generateCSVHeaders();
    const mappedResults = results.map(mapSurveyResultToCSVRow);

    const csv = parse(mappedResults, { fields: headers });

    res.header('Content-Type', 'text/csv');
    res.attachment('survey_results.csv');
    return res.send(csv);

  } catch (error) {
    console.error('Error fetching Program Survey Results for admin:', error);
    return res.status(500).send('Error fetching Program Survey Results for Admin');
  }
};

function generateCSVHeaders() {
  const baseHeaders = [
    { label: 'Email', value: 'email' },
    { label: 'Fullname', value: 'fullname' },
    { label: 'Institution', value: 'institution' },
    { label: 'Date', value: 'Date' },
    { label: 'civicEngagement', value: 'civicEngagement' },
    { label: 'stemInterest', value: 'stemInterest' },
    { label: 'stemEfficacy', value: 'stemEfficacy' },
    { label: 'stemOutcome', value: 'stemOutcome' },
    { label: 'researchOutcome', value: 'researchOutcome' },
    { label: 'researchEfficacy', value: 'researchEfficacy' }
  ];

  const questionHeaders = Array.from({ length: 114 }, (_, i) => ({
    label: `Q${i + 1}`,
    value: `Q${i + 1}`
  }));

  return [...baseHeaders, ...questionHeaders];
}

function mapSurveyResultToCSVRow(result) {
  const baseData = {
    email: result.email,
    fullname: result.fullname,
    institution: result.institution,
    Date: new Date(result.dataCreated).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }),
    civicEngagement: result.civicEngagement,
    stemInterest: result.stemInterest,
    stemEfficacy: result.stemEfficacy,
    stemOutcome: result.stemOutcome,
    researchOutcome: result.researchOutcome,
    researchEfficacy: result.researchEfficacy
  };

  const questionArrays = [
    result.civicEngagementArray,
    result.civicParticipationArray,
    result.stemInterestArray,
    result.stemEfficacyArray,
    result.stemOutcomeArray,
    result.researchOutcomeArray,
    result.researchEfficacyArray
  ];

  const allAnswers = questionArrays.flatMap(arr => (Array.isArray(arr) ? arr : []));

  allAnswers.forEach((answer, index) => {
    baseData[`Q${index + 1}`] = answer;
  });

  baseData[`Q114`] = result.taken_survey || '';

  return baseData;
}





exports.getPCSurveyResults = async (req, res) => {
  const { programID } = req.body;

  if (!programID) {
    return res.status(400).json({ message: "Missing programID" });
  }

  try {
    const results = await srService.getSurveyResultsByProgram(programID);

    if (!results.length) {
      return res.status(404).json({ message: 'No survey results found for this program' });
    }

    const headers = generatePCCSVHeaders();
    const mappedResults = results.map(mapPCSurveyResultToCSVRow);

    const csv = parse(mappedResults, { fields: headers });

    res.header('Content-Type', 'text/csv');
    res.attachment(`survey_results_${Date.now()}.csv`);
    return res.send(csv);

  } catch (error) {
    console.error('Error fetching Program Survey Results for admin:', error);
    return res.status(500).send('Error fetching Program Survey Results for Admin');
  }
};


function generatePCCSVHeaders() {
  const baseHeaders = [
    { label: 'Fullname', value: 'fullname' },
    { label: 'Email', value: 'email' },
    { label: 'Institution', value: 'institution' },
    { label: 'Date', value: 'Date' },
    { label: 'civicEngagement', value: 'civicEngagement' },
    { label: 'stemInterest', value: 'stemInterest' },
    { label: 'stemEfficacy', value: 'stemEfficacy' },
    { label: 'stemOutcome', value: 'stemOutcome' },
    { label: 'researchOutcome', value: 'researchOutcome' },
    { label: 'researchEfficacy', value: 'researchEfficacy' }
  ];


  return [...baseHeaders];
}


function mapPCSurveyResultToCSVRow(result) {
  const baseData = {
    email: result.email,
    fullname: result.fullname,
    institution: result.institution,
    Date: new Date(result.dataCreated).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }),
    civicEngagement: result.civicEngagement,
    stemInterest: result.stemInterest,
    stemEfficacy: result.stemEfficacy,
    stemOutcome: result.stemOutcome,
    researchOutcome: result.researchOutcome,
    researchEfficacy: result.researchEfficacy
  };

  return baseData;
}