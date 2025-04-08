function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';  // Define allowed characters
    let code = '';
    
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return code;
  }
  
  // Function to check if the code already exists in the database
  async function checkIfCodeExists(code) {
    const query = 'SELECT COUNT(*) AS count FROM YourTable WHERE code = ?';
    const [rows] = await connection.promise().query(query, [code]);
    return rows[0].count > 0;  // Returns true if code exists, false if not
  }
  
  // Function to generate a unique 6-letter code and insert into database
  async function generateUniqueCodeAndInsert() {
    let code = generateRandomCode();
  
    // Ensure the code is unique
    while (await checkIfCodeExists(code)) {
      code = generateRandomCode();  // Regenerate if the code is not unique
    }
  
    // Insert the unique code into the database
    const insertQuery = 'INSERT INTO YourTable (code) VALUES (?)';
    await connection.promise().query(insertQuery, [code]);
  
    console.log(`Generated and inserted unique code: ${code}`);
  }