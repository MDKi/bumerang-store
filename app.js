const express = require('express');
const app = express();

app.use(express.json());

const products = require("./routes/products");
const customers = require("./routes/customers");

app.get('/api', (req, res) => {
  res.send('Working! 😊');
});

app.use("/api/products", products);
app.use("/api/customers", customers);

// Error handler
app.use((error, req, res, next) => {
  console.log(error);
})

module.exports = app; // To test with Jest
