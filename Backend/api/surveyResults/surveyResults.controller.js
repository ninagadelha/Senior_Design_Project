const {
    createSurveyResult,
    getSurveyResultsByUser
} = require("./surveyResults.service");

exports.postSurveyResult = (req, res) => {
    const { userID, programID, category, score, max_score } = req.body;

    if (!userID || !programID || !category || score === undefined || !max_score) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    createSurveyResult({ userID, programID, category, score, max_score }, (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Database error", error });
        }
        return res.status(201).json({ message: "Survey result added successfully" });
    });
};

exports.getUserSurveyResults = (req, res) => {
    const { userID, programID } = req.params;

    if (!userID || !programID) {
        return res.status(400).json({ message: "Missing userID or programID" });
    }

    getSurveyResultsByUser(userID, programID, (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Database error", error });
        }
        return res.status(200).json(results);
    });
};
