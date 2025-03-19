const pool = require('../../dbconfig'); //importing the shared pool


// Updated queryDatabase function to accept a query parameter
const queryDatabase = async (query, params = []) => {
    try {
        const [results] = await pool.query(query, params);
        return results;
      } catch (err) {
        throw err;
      }
  };
  

  //service method to get timestamp
  exports.getTimestamp = async () => {
    return await queryDatabase('SELECT NOW()');
  };

//service method to get users
exports.getUsers = async () => {
  return await queryDatabase('SELECT * FROM Users');
};

exports.loginUser = async (email) => {
  return await queryDatabase('SELECT * FROM Users WHERE email = ?', [email]);
};

exports.PostNewUser = async (email, role, netid, age, gender, ethnicity, credits, stem_interests, institution) => {

   return await queryDatabase( 'INSERT INTO Users (role, email, netid, age, gender, ethnicity, credits, stem_interests, institution, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())', 
    [email, role, netid, age, gender, ethnicity, credits, stem_interests, institution]);
};
    
  
  
  
