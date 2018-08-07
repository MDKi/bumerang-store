const express = require("express");

const router = express.Router();

const Product = require("./models/product");

router.get("/", (req, res) => {
  Product.getProducts((err, products) => {
    if (err) {
      throw err;
    }
    res.json(products);
  });
});

router.get("/:_id", (req, res) => {
  Product.getProductById(req.params._id, (err, product) => {
    if (err) {
      throw err;
    }
    res.json(product);
  });
});

router.post("/", (req, res) => {
  let product = req.body;
  Product.addProduct(product, (err, product) => {
    if (err) {
      throw err;
    }
    res.json(product);
  });
});

router.put("/:_id", (req, res) => {
  const id = req.params._id;
  const product = req.body;
  Product.updateProduct(id, product, {}, (err, product) => {
    if (err) {
      throw err;
    }
    res.json(product);
  });
});

router.delete("/:_id", (req, res) => {
  const id = req.params._id;
  Product.removeProduct(id, (err, product) => {
    if (err) {
      throw err;
    }
    res.json(product);
  });
});

module.exports = router;
