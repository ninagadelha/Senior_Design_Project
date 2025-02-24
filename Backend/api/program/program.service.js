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
    return await queryDatabase('SELECT * FROM Program');
  };

 /*service method to get all programs
 exports.putprogram = async () => {
  return await queryDatabase('SELECT * FROM Program');
};*/

exports.postnewprogram = async(program_name, owner_userid) => {
  return await queryDatabase('INSERT into Program (name, owner_userid) values (?, ?)', [program_name, owner_userid]);
}