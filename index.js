const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

const config = require("./config");

const products = require("./routes/products");
const customers = require("./routes/customers");

// Database
mongoose.connect(config.db, { useNewUrlParser: true });
const db = mongoose.connection;

// For testing purposes
app.get('/api', (req, res) => {
  res.send('Working! 😊');
});

app.use("/api/products", products);
app.use("/api/customers", customers);

// Error handler
app.use((error, req, res, next) => {
  console.log(error);
})

app.listen(config.port, () => console.log(`Listening...`));

module.exports = app; // To test with Jest
