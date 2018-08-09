const express = require("express");

const router = express.Router();

const Product = require("../models/product");

router.get("/", (req, res) => {
  console.log(req.body.limit); // This is returning undefined 🤔
  console.log(req.body); // Because this is returning an empty object... am I testing correctly?

  Product.find((err, products) => {
    if (err) { throw err; }
    res.json(products);
  }).limit(req.body.limit);
});

router.get("/:_id", (req, res) => {
  Product.findById(req.params._id, (err, product) => {
    if (err) { throw err; }
    res.json(product);
  });
});

router.post("/", (req, res) => {
  const product = req.body;

  Product.create(product, (err, product) => {
    if (err) { throw err; }
    res.json(product);
  })
});

router.put("/:_id", (req, res) => {
  const product = req.body;
  const update = {
    name: product.name
  }

  Product.findOneAndUpdate({_id: req.params._id}, update, {}, (err, product) => {
    if (err) { throw err; }
    res.json(product);
  });
});

router.delete("/:_id", (req, res) => {
  // Eventually needs to be changed to #orders related to this product === 0
  if (false) {
  Product.remove({_id: req.params._id}, (err, product) => {
    if (err) { throw err; }
    res.json(product);
  });
  }
  else {
    Product.findOneAndUpdate({_id: req.params._id}, {isActive: false}, {}, (err, product) => {
      if (err) { throw err; }
      res.json(product);
    });
  }
});

module.exports = router;
