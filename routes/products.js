const express = require("express");

const router = express.Router();

const Product = require("../models/product");

router.get("/", (req, res) => {
  getProducts((err, products) => {
    if (err) {
      throw err;
    }
    res.json(products);
  });
});

router.get("/:_id", (req, res) => {
  getProductById(req.params._id, (err, product) => {
    if (err) {
      throw err;
    }
    res.json(product);
  });
});

router.post("/", (req, res) => {
  let product = req.body;
  addProduct(product, (err, product) => {
    if (err) {
      throw err;
    }
    res.json(product);
  });
});

router.put("/:_id", (req, res) => {
  const id = req.params._id;
  const product = req.body;
  updateProduct(id, product, {}, (err, product) => {
    if (err) {
      throw err;
    }
    res.json(product);
  });
});

router.delete("/:_id", (req, res) => {
  const id = req.params._id;
  removeProduct(id, (err, product) => {
    if (err) {
      throw err;
    }
    res.json(product);
  });
});

getProducts = (callback, limit) => {
	Product.find(callback).limit(limit);
}

getProductById = (id, callback) => {
	Product.findById(id, callback);
}

addProduct = (product, callback) => {
	Product.create(product, callback);
}

updateProduct = (id, product, options, callback) => {
	const query = {_id: id};
	const update = {
    name: product.name
	}
	Product.findOneAndUpdate(query, update, options, callback);
}

removeProduct = (id, callback) => {
	const query = {_id: id};
	Product.remove(query, callback);
}

module.exports = router;
