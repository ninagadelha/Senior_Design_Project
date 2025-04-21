const express = require('express');
const cors = require('cors')
const mysql = require('mysql2');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();

const allowedOrigins = [
  "http://localhost:3000", // local 
  "https://mystemgrowth.com", // prod
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for: " + origin));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`--> ${req.method} ${req.url}`);
  next();
});



//importing routes
const questionsRouter = require('./api/questions/questions.router')
const userRouter = require('./api/UserNew/User.router')
const programRouter = require('./api/program/program.router')
const surveyResultsRouter = require('./api/surveyResults/surveyResults.router');
const linkRouter = require('./api/links/links.router');
const codeRouter = require('./api/codes/codes.router');


app.use('/api',questionsRouter)
app.use('/api', userRouter)
app.use('/api', programRouter)
app.use('/api', surveyResultsRouter);
app.use('/api', linkRouter);
app.use('/api', codeRouter);

// Set the port from env or default to 5000
const PORT = 5000;

//so ECS ALB can reach it
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend is running on port ${PORT}`);
});
  
