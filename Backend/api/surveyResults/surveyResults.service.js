const pool = require("../../dbconfig");// Ensure pool is correctly imported


const queryDatabase = async (query, params = []) => {
    try {
        const [results] = await pool.query(query, params);
        return results;
      } catch (err) {
        throw err;
      }
  };
  
  exports.getSurveyResultsByUser = async (userID, programID) => {
    const sql = `SELECT * from SurveyResults WHERE userID = ? AND programID = ?`;
    return await queryDatabase(sql, [userID, programID]);
  };

  exports.getSurveyResultsByProgram = async (programID) => {
    const sql = `
      SELECT 
        Users.email,
        Users.netid,
        Users.age,
        Users.gender,
        Users.ethnicity,
        Users.credits,
        Users.stem_interests,
        Users.institution,
        SurveyResults.*
      FROM SurveyResults
      LEFT JOIN Users ON SurveyResults.userID = Users.id
      WHERE SurveyResults.programID = ?
    `;
    return await queryDatabase(sql, [programID]);
  };
  



exports.createSurveyResult = async (userID, programID, civicEngagement, stemInterest,stemEfficacy,stemOutcome, researchOutcome, researchEfficacy, civicParticipation) => {
    maxScores = [5,4,9,4,4,100];
    const calculateNormalizedScore = (scores, maxScore) => {
        const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length; // Calculate the average
        return (avgScore / maxScore) * 10; // Normalize
    };

    // Normalize each of the arrays
    const normalizedCivicEngagement = calculateNormalizedScore(civicEngagement, maxScores[0]);
    const normalizedStemInterest = calculateNormalizedScore(stemInterest, maxScores[1]);
    const normalizedStemEfficacy = calculateNormalizedScore(stemEfficacy, maxScores[2]);
    const normalizedStemOutcome = calculateNormalizedScore(stemOutcome, maxScores[3]);
    const normalizedResearchOutcome = calculateNormalizedScore(researchOutcome, maxScores[4]);
    const normalizedResearchEfficacy = calculateNormalizedScore(researchEfficacy, maxScores[5]);

    // SQL query to insert the data
    const sql = `
    INSERT INTO SurveyResults 
    (userID, programID, dataCreated, civicEngagement, stemInterest, stemEfficacy, stemOutcome, researchOutcome, researchEfficacy, civicEngagementArray, stemInterestArray, stemEfficacyArray, stemOutcomeArray, researchOutcomeArray, researchEfficacyArray, civicParticipationArray)
    VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
`;

// Serialize the array data before passing it to the query
const surveyData = [
    userID, 
    programID,  
    normalizedCivicEngagement, 
    normalizedStemInterest, 
    normalizedStemEfficacy, 
    normalizedStemOutcome, 
    normalizedResearchOutcome, 
    normalizedResearchEfficacy, 
    JSON.stringify(civicEngagement),  // Serialize arrays as JSON strings
    JSON.stringify(stemInterest), 
    JSON.stringify(stemEfficacy), 
    JSON.stringify(stemOutcome), 
    JSON.stringify(researchOutcome), 
    JSON.stringify(researchEfficacy),
    JSON.stringify(civicParticipation)
];

// Return the query promise
return await queryDatabase(sql, surveyData);


  };

