const userService = require('./User.service');

//controller methods
exports.getTimestamp = async (req,res) => {
  try {
    const timestamp = await userService.getTimestamp();
    res.send(`Hello, World! Database Time: ${timestamp[0]['NOW()']}`);
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).send('Database connection failed');
  }
};

exports.getUsers = async (req,res) => {
  try {
    // Query the Users table
    const results = await userService.getUsers();
    // Log the query result
    console.log('Users Table Results:', results);

    // Send the results as a JSON response
    res.json(results);
  } catch (error) {
    console.error('Error querying the Users table:', error);
    res.status(500).send('Error fetching users from the database');
  }
};


exports.loginUser = async (req, res) => {
  const { email } = req.body; // Get the email from the request body
    
  if (!email) {
    return res.status(400).send('Email is required');
  }

  try {
    // Query the Users table to find a user by the provided email
    const results = await userService.loginUser(email);

    if (results.length > 0) {
      // User found with the provided email
      res.json({
        message: 'Login successful',
        user: results[0] // Return the user data (you can exclude password for security reasons)
      });
    } else {
      // No user found with that email
      res.status(401).send('Invalid email or password');
    }
  }
  catch (error) {
    console.error('Error querying the Users table for login:', error);
    res.status(500).send('Error logging in');
  }
}

exports.newUser = async (req, res) => {
  const { email, role, netid, age, gender, ethnicity, credits, stem_interests, institution, programid } = req.body;
  
  if (!email) {
    return res.status(400).send('Email is required');
  } if (!role) {
    return res.status(400).send('Role is required');
  }
  if (!programid) {
    return res.status(400).send('Program is required');
  }

  try {
    // Query the Users table to find a user by the provided email
    const results = await userService.PostNewUser( email, role, netid, age, gender, ethnicity, credits, stem_interests, institution, programid);

   
      // User found with the provided email
      res.json({
        message: 'User Created successful'
      });
  }
  catch (error) {
    console.error('Error Creating New User:', error);
    res.status(500).send('Error Creating New User');
  }
}




exports.updateProgramDirector = async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).send('Email is required');
  }
  try {
    // Query the Users table to find a user by the provided email
    const results = await userService.UpdateProgramDirector( email);
      // User found with the provided email
      res.json({
        message: 'User Role Updated',
        User: results
      });
  }
  catch (error) {
    console.error('Error Updating User Role:', error);
    res.status(500).send('Error Creating New User');
  }
}

exports.UpdateResearcher = async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).send('Email is required');
  }
  try {
    // Query the Users table to find a user by the provided email
    const results = await userService.UpdateResearcher( email);
      // User found with the provided email
      res.json({
        message: 'User Role Updated',
        User: results
      });
  }
  catch (error) {
    console.error('Error Updating User Role:', error);
    res.status(500).send('Error Creating New User');
  }
}


exports.UpdateStudent = async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).send('Email is required');
  }
  try {
    // Query the Users table to find a user by the provided email
    const results = await userService.UpdateStudent( email);
      // User found with the provided email
      res.json({
        message: 'User Role Updated',
        User: results
      });
  }
  catch (error) {
    console.error('Error Updating User Role:', error);
    res.status(500).send('Error Creating New User');
  }
}


exports.getExistingUser = async (req, res) => {
  const { email, programid } = req.body;
  
  if (!email) {
    return res.status(400).send('Email is required');
  }
  if (!programid) {
    return res.status(400).send('Program is required');
  }
  try {
    // Query the Users table to find a user by the provided email
    const results = await userService.checkUser( email, programid);
      // User found with the provided email
      if(results.length>0){
        res.json({
          message: 'User Exists',
          User: results
        });
      }
      else{
        res.json({message:'No User'});
      }
  }
  catch (error) {
    console.error('Error Checking if User exists:', error);
    res.status(500).send('Error checking if user exists');
  }
}