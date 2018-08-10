const express = require("express");

const router = express.Router();

const Product = require("../models/product");


router.get("/", (req, res) => {
  const getReqLimit = 0; // req.body.limit?
  Product.find((err, products) => {
    if (err) { throw err; }
    res.json(products);
  }).limit(getReqLimit);
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
