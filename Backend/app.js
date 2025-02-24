const express = require('express');
const cors = require('cors')
const mysql = require('mysql2');
require('dotenv').config();
const bodyParser = require('body-parser');



//importing routes
const questionsRouter = require('./api/questions/questions.router')
const userRouter = require('./api/UserNew/User.router')
const programRouter = require('./api/program/program.router')
// Create an Express application
const app = express();
app.use(bodyParser.json());
app.use(cors());

//imports for api routers
app.use('/api',questionsRouter)
app.use('/api', userRouter)
app.use('/api', programRouter)

// Set a port for the server to listen on
const PORT = 3000;

  // Start the server and listen on the defined port
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  