const express = require('express');
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: env === 'production' ? '.env.production' : '.env',
});

const app = express();

app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log("🔥 CORS request from:", origin);
  console.log("🔥 NODE_ENV:", env);

  if (env === 'development' && origin === 'http://localhost:3000') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  } else if (env === 'production' && origin === 'https://mystemgrowth.com') {
    res.setHeader('Access-Control-Allow-Origin', 'https://mystemgrowth.com');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(bodyParser.json());

// Dummy login route
app.post('/api/login', (req, res) => {
  res.json({ success: true });
});

// Set port
const PORT = process.env.PORT || (env === 'production' ? 5000 : 5001);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
