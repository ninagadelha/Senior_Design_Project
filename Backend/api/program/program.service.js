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
  

  //service method to get all programs
  exports.getAllPrograms = async () => {
    return await queryDatabase(`
      SELECT 
        Program.*, 
        Users.fullname AS owner_fullname
      FROM Program
      LEFT JOIN Users ON Program.owner_userid = Users.id
    `);
  };
  

  exports.getPCPrograms = async (program_userid) => {
    const query = `
      SELECT 
        p.*, 
        (SELECT COUNT(*) FROM Users u WHERE u.programid = p.program_id) AS student_count
      FROM 
        Program p
      WHERE 
        p.owner_userid = ?
    `;
    return await queryDatabase(query, [program_userid]);
  };

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  };

  const codeExists = async (code) => {
    const result = await queryDatabase('SELECT * FROM Codes WHERE code = ?', [code]);
    return result.length > 0; // Returns true if the code already exists
  }

  const postnewCode = async (role) => {
  let code;
  let codeExistsFlag = true;

  // Keep generating random codes until we find one that doesn't already exist
  while (codeExistsFlag) {
    code = generateRandomCode();
    codeExistsFlag = await codeExists(code); // Check if the code already exists
  }

   await queryDatabase('INSERT into Codes (code, role, created) values (?, ?, now())', [code, role]);
   return code;
  }



exports.postnewprogram = async(program_name, owner_userid) => {
  try{
    const code = await postnewCode("Student");

    return await queryDatabase('INSERT into Program (name, owner_userid, code, when_created) values (?, ?, ?, now())', [program_name, owner_userid, code]);
  }
  catch (error) {
    console.error('Error creating new program:', error);
    throw error; // You can handle or log the error as needed
  }

}


exports.deleteProgram = async(program_id) => {
  try{

    return await queryDatabase('DELETE FROM Program WHERE program_id = ?', [program_id]);
  }
  catch (error) {
    console.error('Error Deleting program:', error);
    throw error; 
  }

}