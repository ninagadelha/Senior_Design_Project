const userService = require('./User.service');
//const authService = require('../auth/auth.service)

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

exports.getAdminUsers = async (req,res)=>{
  try {
    // Query the Users table
    const results = await userService.getAdminUsers();
    // Send the results as a JSON response
    res.json(results);
  } catch (error) {
    console.error('Error querying the Admin Users table:', error);
    res.status(500).send('Error fetching Admin users from the database');
  }
}

exports.getUsers = async (req,res) => {
  try {
    // Query the Users table
    const results = await userService.getUsers();
    // Send the results as a JSON response
    res.json(results);
  } catch (error) {
    console.error('Error querying the Users table:', error);
    res.status(500).send('Error fetching users from the database');
  }
};

const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
  const {email, password} = req.body; // make sure to grab password too

  const users = await userService.loginUser(email);

  if (users.length === 0) {
    return res.status(400).json({success: false, message: "Invalid email or password."});
  }

  const user = users[0];
  console.log("Entered:", password);
  console.log("Stored:", user.password);

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    return res.status(400).json({ success: false, message: "Invalid email or password." });
  }

  res.status(200).json({success: true, message: "Login successful!", user});
}

  exports.newUser = async (req, res) => {
    const {email, netid, age, gender, ethnicity, credits, stem_interests, institution, code, fullname, password} = req.body;

    if (!email) {
      return res.status(400).send('Email is required');
    }
    if (!code) {
      return res.status(400).send('Program code is required');
    }

    try {

      /* const auth = await authService.validateUser(email)
      if(!auth){
      return res.status(400).send('Email was not authenticated');
      }

      */

      // Query the Users table to find a user by the provided email
      const response = await userService.PostNewUser(email, netid, age, gender, ethnicity, credits, stem_interests, institution, code, fullname, password);


      // Check if the user was created successfully
      if (response.success) {
        // If successful, send a success message in the response
        res.json({
          message: 'User Created successfully'
        });
      } else {
        // If there was an error (e.g., program doesn't exist), send an error message
        res.status(400).json({
          message: response.message  // The message will come from the error or validation
        });
      }
    } catch (error) {
      console.error('Error Creating New User:', error);
      res.status(500).send('Error Creating New User');
    }
  }


  exports.updateProgramDirector = async (req, res) => {
    const {email} = req.body;

    if (!email) {
      return res.status(400).send('Email is required');
    }
    try {
      // Query the Users table to find a user by the provided email
      const results = await userService.UpdateProgramDirector(email);
      // User found with the provided email
      res.json({
        message: 'User Role Updated',
        User: results
      });
    } catch (error) {
      console.error('Error Updating User Role:', error);
      res.status(500).send('Error Creating New User');
    }
  }

  exports.UpdateResearcher = async (req, res) => {
    const {email} = req.body;

    if (!email) {
      return res.status(400).send('Email is required');
    }
    try {
      // Query the Users table to find a user by the provided email
      const results = await userService.UpdateResearcher(email);
      // User found with the provided email
      res.json({
        message: 'User Role Updated',
        User: results
      });
    } catch (error) {
      console.error('Error Updating User Role:', error);
      res.status(500).send('Error Creating New User');
    }
  }


  exports.UpdateStudent = async (req, res) => {
    const {email} = req.body;

    if (!email) {
      return res.status(400).send('Email is required');
    }
    try {
      // Query the Users table to find a user by the provided email
      const results = await userService.UpdateStudent(email);
      // User found with the provided email
      res.json({
        message: 'User Role Updated',
        User: results
      });
    } catch (error) {
      console.error('Error Updating User Role:', error);
      res.status(500).send('Error Creating New User');
    }
  }

  //new endpoint for changing account info (new manage acc button in navbar)
  exports.UpdateStudentAccount = async (req, res) => {

    const { name, email, newEmail, password } = req.body;
    
    if (!email) {
      return res.status(400).send('Current email is required');
    }

    try{
      const updates = {};
      if(name) updates.name = name;
      if(newEmail) updates.email = newEmail;
      if(password){
        const bcrypt = require('bcrypt');
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(password, salt);
      }

      const updatedUser = await userService.UpdateStudentFieldsByEmail(email, updates);

      res.json({
        message: 'Student account updated successfully',
        user: updatedUser
      });
    }
    catch (err){
      console.error('Error updating student account:', err);
      res.status(500).send('Error updating student account');
    }
  };


  exports.getExistingUser = async (req, res) => {
    const {email, programid} = req.body;

    if (!email) {
      return res.status(400).send('Email is required');
    }
    if (!programid) {
      return res.status(400).send('Program is required');
    }
    try {
      // Query the Users table to find a user by the provided email
      const results = await userService.checkUser(email, programid);
      // User found with the provided email
      if (results.length > 0) {
        res.json({
          message: 'User Exists',
          User: results
        });
      } else {
        res.json({message: 'No User'});
      }
    } catch (error) {
      console.error('Error Checking if User exists:', error);
      res.status(500).send('Error checking if user exists');
    }
  }


  exports.getUsersProgram = async (req, res) => {
    const {programid} = req.body;

    if (!programid) {
      return res.status(400).send('Program ID is required');
    }
    try {
      // Query the Users table to find a user by the provided email
      const results = await userService.getprogramusers(programid);
      // User found with the provided email
      res.json({
        message: 'Fetched Programs users successfully',
        Users: results
      });
    } catch (error) {
      console.error('Error Checking for Programs Users', error);
      res.status(500).send('Error checking for Programs Users');
    }


  }
  exports.createAccount = async (req, res) => {
    const {
      email,
      netid,
      age,
      gender,
      ethnicity,
      credits,
      stem_interests,
      institution,
      code,
      fullname,
      password
    } = req.body;
    try {
      const result = await userService.PostNewUser(email, netid, age, gender, ethnicity, credits, stem_interests, institution, code, fullname, password);
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      res.status(500).json({success: false, message: err.message});
    }
  };


  exports.deleteStudent = async (req, res) => {
    const {id} = req.body;
    try {
      const result = await userService.deleteStudent(id);
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      res.status(500).json({success: false, message: err.message});
    }
  };
