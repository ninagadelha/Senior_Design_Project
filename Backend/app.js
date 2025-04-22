const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: env === 'production' ? '.env.production' : '.env',
});

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://mystemgrowth.com',
  'https://api.mystemgrowth.com',
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`--> ${req.method} ${req.url}`);
  next();
});


const questionsRouter = require('./api/questions/questions.router');
const userRouter = require('./api/UserNew/User.router');
const programRouter = require('./api/program/program.router');
const surveyResultsRouter = require('./api/surveyResults/surveyResults.router');
const linkRouter = require('./api/links/links.router');
const codeRouter = require('./api/codes/codes.router');

app.use('/api', questionsRouter);
app.use('/api', userRouter);
app.use('/api', programRouter);
app.use('/api', surveyResultsRouter);
app.use('/api', linkRouter);
app.use('/api', codeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
