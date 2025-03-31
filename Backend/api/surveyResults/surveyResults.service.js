const pool = require("../../dbconfig.js");// Ensure pool is correctly imported

exports.getSurveyResultsByUser = (userID, programID, callback) => {
    const query = `
        SELECT category, score, max_score 
        FROM survey_results 
        WHERE userID = ? AND programID = ?
    `;

    pool.query(query, [userID, programID], (error, results) => {
        if (error) {
            return callback(error);
        }

        if (results.length === 0) {
            return callback(null, { message: "No survey results found." });
        }

        // Group scores by category
        const categoryScores = {};

        results.forEach(({ category, score, max_score }) => {
            if (!categoryScores[category]) {
                categoryScores[category] = { total: 0, count: 0, maxScore: max_score };
            }
            categoryScores[category].total += score;
            categoryScores[category].count += 1;
        });

        // Compute normalized and scaled averages
        const formattedResults = Object.entries(categoryScores).map(([category, data]) => {
            const average = data.total / data.count;
            const normalized = (average / data.maxScore) * 10; // Normalize and scale to 1-10 range
            return { category, normalizedScore: normalized.toFixed(2) };
        });

        callback(null, formattedResults);
    });
};

//Example Output
//[
//     { "category": "Civil Engagement", "normalizedScore": "8.25" },
//     { "category": "Leadership", "normalizedScore": "6.90" },
//     { "category": "Community Service", "normalizedScore": "7.50" }
// ]