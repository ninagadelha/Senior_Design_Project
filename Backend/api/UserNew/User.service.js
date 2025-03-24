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

exports.PostNewUser = async (email, role, netid, age, gender, ethnicity, credits, stem_interests, institution, programid) => {

   return await queryDatabase( 'INSERT INTO Users (role, email, netid, age, gender, ethnicity, credits, stem_interests, institution, programid, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?, NOW())', 
    [email, role, netid, age, gender, ethnicity, credits, stem_interests, institution, programid]);
};



exports.UpdateResearcher = async (email) => {
  const sql = `UPDATE Users SET role = 'Researcher' WHERE email = ?`;
  return await queryDatabase(sql, [email]);
}
exports.UpdateProgramDirector = async (email) => {
  const sql = `UPDATE Users SET role = 'Program Director' WHERE email = ?`;
  return await queryDatabase(sql, [email]);
}

exports.UpdateStudent= async (email) => {
  const sql = `UPDATE Users SET role = 'Student' WHERE email = ?`;
  return await queryDatabase(sql, [email]);
}
  
  
exports.checkUser= async ( email, programid) => {
  const sql = `SELECT * from Users WHERE email = ? AND programid = ?`;
  return await queryDatabase(sql, [email, programid]);
}
  
