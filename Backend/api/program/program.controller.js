const programService = require('./program.service');


//controller methods

exports.postnewprogram = async (req, res) => {
  const { program_name, owner_userid } = req.body;

  if ( !program_name || !owner_userid ) {
      return res.status(400).json({ message: 'Missing required fields, program_name, owner_userid' });
  }

  try {
    const programs = await programService.postnewprogram(program_name, owner_userid);
    res.json({message: "successfully created program",
      program : programs});
  } catch (error) {
    console.error('Error making new program :', error);
    res.status(500).send('Error making new program');
  }
}


exports.getPrograms = async (req, res) => {
  try {
    const programs = await programService.getAllPrograms();
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).send('Error fetching programs');
  }
}

exports.getPCPrograms = async (req, res) => {
  const {owner_userid} = req.body;
  try {
    const programs = await programService.getPCPrograms(owner_userid);
    res.json(programs);
  } catch (error) {
    console.error('Error fetching Program Coordinators programs:', error);
    res.status(500).send('Error fetching programs');
  }
}


