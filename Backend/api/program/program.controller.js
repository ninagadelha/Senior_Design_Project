const programService = require('./program.service');


//controller methods

exports.postnewprogram = async (req, res) => {
  const { program_name, owner_userid } = req.body;

  // You can now use programid, name, and owner_userid in your logic
  // Example: save to the database, validation, etc.

  if ( !program_name || !owner_userid) {
      return res.status(400).json({ message: 'Missing required fields, name, owner_userid' });
  }

  try {
    const programs = await programService.postnewprogram(program_name, owner_userid);
    res.json(programs);
  } catch (error) {
    console.error('Error making new programs:', error);
    res.status(500).send('Error making new programs');
  }
}


exports.getPrograms = async (req, res) => {
  try {
    const programs = await programService.getAllPrograms();
    console.log('Programs Table Results:', programs);
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).send('Error fetching programs');
  }
}

/*exports.editprogram = async (req, res) => {
  const { program_name, owner_userid } = req.body;

  // You can now use programid, name, and owner_userid in your logic
  // Example: save to the database, validation, etc.

  if ( !program_name || !owner_userid) {
      return res.status(400).json({ message: 'Missing required fields, name, owner_userid' });
  }

  try {
    const programs = await programService.putprogram(program_name, owner_userid);
    res.json(programs);
  } catch (error) {
    console.error('Error editing program:', error);
    res.status(500).send('Error editing programs');
  }
}*/

