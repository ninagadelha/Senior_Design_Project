const userService = require('./User.service');
// const authService = require('../auth/auth.service'); // Uncomment if auth service is needed
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// =======================
// Basic GET endpoints
// =======================
exports.getTimestamp = async (req, res) => {
  try {
    const timestamp = await userService.getTimestamp();
    res.send(`Hello, World! Database Time: ${timestamp[0]['NOW()']}`);
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).send('Database connection failed');
  }
};

exports.getAdminUsers = async (req, res) => {
  try {
    const results = await userService.getAdminUsers();
    res.json(results);
  } catch (error) {
    console.error('Error querying the Admin Users table:', error);
    res.status(500).send('Error fetching Admin users from the database');
  }
};

exports.getUsers = async (req, res) => {
  try {
    const results = await userService.getUsers();
    res.json(results);
  } catch (error) {
    console.error('Error querying the Users table:', error);
    res.status(500).send('Error fetching users from the database');
  }
};

// =======================
// User login
// =======================
// exports.loginStudent = async (req, res) => {
//   // Older login function, commented out to avoid conflicts
// };

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await userService.loginUser(email);

    if (users.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid email or password." });
    }

    const user = users[0];

    console.log("Entered:", password);
    console.log("Stored:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "yourSecretKey",
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, message: "Login successful!", user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error during login." });
  }
};

// =======================
// User account management
// =======================
exports.updateStudent = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "yourSecretKey");

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.body.name) user.name = req.body.name;
    if (req.body.newEmail) user.email = req.body.newEmail;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// UpdateStudentAccount for manage account page
// =======================
exports.UpdateStudentAccount = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "yourSecretKey");

    const { name, newEmail, password } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (newEmail) updates.email = newEmail;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    // <-- Replace with this line
    const updatedUser = await userService.UpdateStudentFieldsByEmail(decoded.email, updates);

    res.status(200).json({
      message: 'Student account updated successfully',
      user: updatedUser
    });
  } catch (err) {
    console.error('Error updating student account:', err);
    res.status(500).json({
      message: 'Error updating student account',
      error: err.message
    });
  }
};


// =======================
// User creation and role updates
// =======================
exports.newUser = async (req, res) => {
  const { email, netid, age, gender, ethnicity, credits, stem_interests, institution, code, fullname, password } = req.body;

  if (!email) return res.status(400).send('Email is required');
  if (!code) return res.status(400).send('Program code is required');

  try {
    // const auth = await authService.validateUser(email); // Uncomment if email auth needed
    // if(!auth) return res.status(400).send('Email was not authenticated');

    const response = await userService.PostNewUser(email, netid, age, gender, ethnicity, credits, stem_interests, institution, code, fullname, password);

    if (response.success) {
      res.json({ message: 'User Created successfully' });
    } else {
      res.status(400).json({ message: response.message });
    }
  } catch (error) {
    console.error('Error Creating New User:', error);
    res.status(500).send('Error Creating New User');
  }
};

exports.updateProgramDirector = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send('Email is required');

  try {
    const results = await userService.UpdateProgramDirector(email);
    res.json({ message: 'User Role Updated', User: results });
  } catch (error) {
    console.error('Error Updating User Role:', error);
    res.status(500).send('Error Creating New User');
  }
};

exports.UpdateResearcher = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send('Email is required');

  try {
    const results = await userService.UpdateResearcher(email);
    res.json({ message: 'User Role Updated', User: results });
  } catch (error) {
    console.error('Error Updating User Role:', error);
    res.status(500).send('Error Creating New User');
  }
};

exports.UpdateStudent = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send('Email is required');

  try {
    const results = await userService.UpdateStudent(email);
    res.json({ message: 'User Role Updated', User: results });
  } catch (error) {
    console.error('Error Updating User Role:', error);
    res.status(500).send('Error Creating New User');
  }
};

// =======================
// Other utility endpoints
// =======================
exports.getExistingUser = async (req, res) => {
  const { email, programid } = req.body;
  if (!email) return res.status(400).send('Email is required');
  if (!programid) return res.status(400).send('Program is required');

  try {
    const results = await userService.checkUser(email, programid);
    if (results.length > 0) {
      res.json({ message: 'User Exists', User: results });
    } else {
      res.json({ message: 'No User' });
    }
  } catch (error) {
    console.error('Error Checking if User exists:', error);
    res.status(500).send('Error checking if user exists');
  }
};

exports.getUsersProgram = async (req, res) => {
  const { programid } = req.body;
  if (!programid) return res.status(400).send('Program ID is required');

  try {
    const results = await userService.getprogramusers(programid);
    res.json({ message: 'Fetched Programs users successfully', Users: results });
  } catch (error) {
    console.error('Error Checking for Programs Users', error);
    res.status(500).send('Error checking for Programs Users');
  }
};

exports.createAccount = async (req, res) => {
  const { email, netid, age, gender, ethnicity, credits, stem_interests, institution, code, fullname, password } = req.body;

  try {
    const result = await userService.PostNewUser(email, netid, age, gender, ethnicity, credits, stem_interests, institution, code, fullname, password);
    if (result.success) res.status(201).json(result);
    else res.status(400).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.body;

  try {
    const result = await userService.deleteStudent(id);
    if (result.success) res.status(201).json(result);
    else res.status(400).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
