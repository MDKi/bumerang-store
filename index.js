const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

const Product = require('./models/product');

// Database
const dbURL = 'mongodb://localhost:27017/bumerang-store';
mongoose.connect(dbURL, { useNewUrlParser: true });
const db = mongoose.connection;

// For testing purposes
app.get('/api', (req, res) => {
  res.send('Working! 😊');
});

app.get('/api/products', (req, res) => {
  Product.getProducts((err, products) => {
    if(err) {
      throw err;
    }
    res.json(products);
  });
});

app.get('/api/products/:_id', (req, res) => {
  Product.getProductById(req.params._id, (err, product) => {
    if(err) {
      throw err;
    }
    res.json(product);
  });
});

app.post('/api/products', (req, res) => {
  let product = req.body;
  Product.addProduct(product, (err, product) => {
    if(err) {
      throw err;
    }
    res.json(product);
  });
});

app.put('/api/products/:_id', (req, res) => {
  const id = req.params._id;
  const product = req.body;
  Product.updateProduct(id, product, {}, (err, product) => {
    if(err) {
      throw err;
    }
    res.json(product);
  });
});

app.delete('/api/products/:_id', (req, res) => {
  const id = req.params._id;
  Product.removeProduct(id, (err, product) => {
    if(err) {
      throw err;
    }
    res.json(product);
  });
});

app.listen(3000);
