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

exports.postnewprogram = async(program_name, owner_userid, code) => {
  return await queryDatabase('INSERT into Program (name, owner_userid, code) values (?, ?, ?)', [program_name, owner_userid, code]);
}