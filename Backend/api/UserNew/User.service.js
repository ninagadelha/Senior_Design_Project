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

exports.PostNewUser = async (email, netid, age, gender, ethnicity, credits, stem_interests, institution, code, fullname) => {
  let role="Student";
  let programid = null;
  
  try {

    if(code==="Admin"){
      role="Admin";
    }
    else if(code==="ProgramCoordinator"){
      role="ProgramCoordinator";
    }
    else{
      // First, select programid based on the provided code
    const programResult = await queryDatabase(
      'SELECT program_id FROM Program WHERE code = ?',
      [code]
    );

    // If no program is found with that code, return an error
    if (programResult.length === 0) {
      throw new Error('Program with the given code does not exist.');
    }

    // Get the programid from the result
    programid = programResult[0].programid;
    }
    

    // Now insert the new user with the obtained programid
    const result = await queryDatabase(
      'INSERT INTO Users (role, email, netid, age, gender, ethnicity, credits, stem_interests, institution, programid,fullname, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, NOW())',
      [role, email, netid, age, gender, ethnicity, credits, stem_interests, institution, programid, fullname]
    );

    // Return some success response (you can adjust this as needed)
    return { success: true, message: 'User created successfully.' };

  } catch (error) {
    // Return the error message if anything goes wrong
    return { success: false, message: error.message };
  }
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
  
