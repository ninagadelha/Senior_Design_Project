const pool = require('../../dbconfig');

module.exports = {
    createSurveyResult: (data, callback) => {
        const query = `
      INSERT INTO survey_results (userID, programID, outcome1, outcome2, outcome3, outcome4, outcome5, outcome6)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

        pool.query(
            query,
            [data.userID, data.programID, data.outcome1, data.outcome2, data.outcome3, data.outcome4, data.outcome5, data.outcome6],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getSurveyResultsByUserID: (userID, callback) => {
        const query = `SELECT * FROM survey_results WHERE userID = ? ORDER BY created_at DESC`;

        pool.query(query, [userID], (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    }
};
