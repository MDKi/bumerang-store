const express = require('express');
const app = express();

app.use(express.json());

const products = require("./routes/products.js");
const people = require("./routes/people.js");
const orders = require("./routes/orders.js");

app.get('/api', (req, res) => {
  res.send('Working! 😊');
});

app.use("/api/products", products);
app.use("/api/people", people);
app.use("/api/orders", orders);

// Error handler
app.use((error, req, res, next) => {
  console.log(error);
})

module.exports = app; // To test with Jest
