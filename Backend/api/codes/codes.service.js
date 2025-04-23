const pool = require('../../dbconfig'); //importing the shared pool


const queryDatabase = async (query, params = []) => {
    try {
        const [results] = await pool.query(query, params);
        return results;
      } catch (err) {
        throw err;
      }
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

  exports.postnewCode = async (role) => {
  let code;
  let codeExistsFlag = true;

  // Keep generating random codes until we find one that doesn't already exist
  while (codeExistsFlag) {
    code = generateRandomCode();
    codeExistsFlag = await codeExists(code); // Check if the code already exists
  }

  return await queryDatabase('INSERT into Codes (code, role, created) values (?, ?, now())', [code, role]);

  }

  exports.getAllCodes = async () => {
    return await queryDatabase("SELECT * FROM Codes where role in ('ProgramCoordinator', 'Admin')");
  };


  exports.deleteCode = async(id) => {
    return await queryDatabase('DELETE FROM Codes where id = ?', [id]);
  }


  exports.joinNewProgram = async(code, id) => {
     // Step 1: Check if code exists
  const codeResult = await queryDatabase(
    'SELECT program_id FROM Program WHERE code = ?',
    [code]
  );

  if (codeResult.length === 0) {
    throw new Error('Invalid program code');
  }

  const programId = codeResult[0].program_id;

  // Step 2: Update the user's programid
  const updateResult = await queryDatabase(
    'UPDATE Users SET programid = ? WHERE id = ?',
    [programId, id]
  );

  if (updateResult.affectedRows === 0) {
    throw new Error('User ID not found or update failed');
  }

  return {
    message: 'User program updated successfully',
   id,
    programId,
  };
};