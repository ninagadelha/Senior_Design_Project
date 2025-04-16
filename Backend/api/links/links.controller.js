const linkService = require('./links.service');


//controller methods

exports.postnewlink = async (req, res) => {
  const { program_id, URL, description } = req.body;


  if ( !program_id || !URL) {
      return res.status(400).json({ message: 'Missing required fields, program_id, URL' });
  }

  try {
    const link = await linkService.postnewlink(URL, program_id, description);
    res.json({
      message: 'Link Added Successfully',
      link
    });
  } catch (error) {
    console.error('Error making new link:', error);
    res.status(500).send('Error making new link');
  }
}


exports.getAllLinks = async (req, res) => {
  const { program_id } = req.body;

  try {
    const links = await linkService.getAllLinks(program_id);
    console.log('links Table Results:', links);
    res.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).send('Error fetching links');
  }
}


exports.deleteLink = async (req, res) => {
  const { linkid } = req.body;

  try {
    const link = await linkService.deleteLink(linkid);
    console.log('link successfully deleted', link);
    res.json({message:"Successfully deleted", link: link});
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).send('Error deleting link');
  }
}