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

exports.getAdminUsers = async () => {
  return await queryDatabase("SELECT * FROM `Users` WHERE `role` IN ('ProgramCoordinator', 'Admin')");
};



exports.getprogramusers = async (programid)  => {
  return await queryDatabase('SELECT * FROM Users where programid=?', [programid]);
};

exports.loginUser = async (email) => {
  return await queryDatabase('SELECT * FROM Users WHERE email = ?', [email]);
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

// Post a new user with selected fields
exports.PostNewUser = async (email, netid, age, gender, ethnicity, credits, stem_interests, institution, code, fullname) => {
  let role = "Student"; // Default role
  let programid = null;

  try {
    // First, check if the code exists in the Codes table and get the associated role
    const codeResult = await queryDatabase(
      'SELECT role FROM Codes WHERE code = ?',
      [code]
    );

    // If no code is found in the Codes table, return an error
    if (codeResult.length === 0) {
      throw new Error('The provided code does not exist.');
    }

    // Get the role associated with the code from the Codes table
    role = codeResult[0].role;

    // If the role is "Student", we need to get the program_id from the Program table
    if (role === "Student") {
      const programResult = await queryDatabase(
        'SELECT program_id FROM Program WHERE code = ?',
        [code]
      );

      // If no program is found with that code, return an error
      if (programResult.length === 0) {
        throw new Error('Program with the given code does not exist.');
      }

      // Get the program_id from the result
      programid = programResult[0].program_id;
    }

    // Now insert the new user with the obtained program_id (if any)
    const result = await queryDatabase(
        'INSERT INTO Users (role, email, netid, age, gender, ethnicity, credits, stem_interests, institution, programid, fullname, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
        [role, email, netid, age, gender, ethnicity, credits, stem_interests, institution, programid, fullname]
    );

    if (result.affectedRows > 0) {
      return {
        success: true,
        message: 'User created successfully.',
        userId: result.insertId // Optional: return the newly created user's ID
      };
    }
  } catch (error) {
    // Return the error message if something goes wrong
    return { success: false, message: error.message };
  }
};

  
