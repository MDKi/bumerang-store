const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

// Database
const dbURL = 'mongodb://localhost/bumerang-store';
mongoose.connect(dbURL);
const db = mongoose.connection;

// For testing purposes
app.get('/api', (req, res) => {
  res.send('Working! 😊');
});

app.listen(3000);
