const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: env === 'production' ? '.env.production' : '.env',
});

const app = express();


const allowedOrigins = env === 'production'
    ? ['https://mystemgrowth.com']
    : ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight


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


const PORT = process.env.PORT || (env === 'production' ? 5000 : 5001);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
