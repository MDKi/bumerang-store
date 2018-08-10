const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

const products = require("./routes/products");
const customers = require("./routes/customers");

// Database
const dbURL = 'mongodb://localhost:27017/bumerang-store';
mongoose.connect(dbURL, { useNewUrlParser: true });
const db = mongoose.connection;

// For testing purposes
app.get('/api', (req, res) => {
  res.send('Working! 😊');
});

app.use("/api/products", products);
app.use("/api/customers", customers);

app.listen(3000);
