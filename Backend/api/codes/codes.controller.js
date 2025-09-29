const codeService = require('./codes.service');


//controller methods

exports.postNewAdminCode = async (req, res) => {
  const { role } = req.body;


  if ( !role) {
      return res.status(400).json({ message: 'Missing required field role' });
  }

  try {
    const code = await codeService.postnewCode(role);
    res.json({
      message: 'Code Generated Successfully',
      code
    });
  } catch (error) {
    console.error('Error making new Code:', error);
    res.status(500).send('Error making new Code');
  }
}


exports.getAllCodes = async (req, res) => {
 
  try {
    const codes = await codeService.getAllCodes();
    res.json(codes);
  } catch (error) {
    console.error('Error fetching Codes:', error);
    res.status(500).send('Error fetching Codes');
  }
}


exports.deleteCode = async (req, res) => {
  const { id } = req.body;

  try {
    const code = await codeService.deleteCode(id);
    res.json({message:"Successfully deleted", code: code});
  } catch (error) {
    console.error('Error deleting code:', error);
    res.status(500).send('Error deleting Code');
  }
}

exports.joinNewProgram = async (req, res) => {
  const { code, id} = req.body;

  if ( !code || !id) {
    return res.status(400).json({ message: 'Missing required field code or id' });
}

  try {
    const result = await codeService.joinNewProgram(code, id);
    res.json({message:"Successfully Changed Students Program", result: result});
  } catch (error) {
    console.error('Error Changing Students Program Through Join Code:', error);
    res.status(500).send('Error Changing Students Program Through Join Code');
  }
}