const { createSurveyResult, getSurveyResultsByUserID } = require("./surveyResults.service");

module.exports = {
    postSurveyResult: (req, res) => {
        const body = req.body;
        if (!body.userID || !body.programID) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        createSurveyResult(body, (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }
            return res.status(201).json({ message: "Survey result created successfully", resultId: results.insertId });
        });
    },

    getUserSurveyResults: (req, res) => {
        const userID = req.params.userID;

        getSurveyResultsByUserID(userID, (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }
            return res.status(200).json(results);
        });
    }
};
