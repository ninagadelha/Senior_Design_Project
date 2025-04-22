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
  exports.getAllLinks = async (program_id) => {
    return await queryDatabase('SELECT * FROM links where program_id = ?', [program_id]);
  };

 /*service method to get all programs
 exports.putprogram = async () => {
  return await queryDatabase('SELECT * FROM Program');
};*/

exports.postnewlink = async(URL, program_id, title, description) => {
  return await queryDatabase('INSERT into links (URL, program_id, description, title) values (?, ?, ?, ?)', [URL, program_id, description, title]);
}


exports.deleteLink = async(linkid) => {
  return await queryDatabase('DELETE FROM links where linkid = ?', [linkid]);
}