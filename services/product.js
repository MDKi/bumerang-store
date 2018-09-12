const Product = require("../models/product.js");

const getProducts = async (req, res, next) => {
  try {
    const [limit, page] = [5000, req.query.page];
    const skip = page * limit;
    const query = req.query.isActive ? { isActive: true } : {};
    const products = await Product.find(query, {}, { skip, limit })
    res.json(products);
  }
  catch (err) { next({ route: "GET products", err }) }
};
const getProductByID = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params._id);
    res.json(product);
  }
  catch (err) { next({ route: "GET products/:_id", err }) }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  }
  catch (err) { next({ route: "POST products", err }) }
};

const updateProduct = async (req, res, next) => {
  try {
    let product = req.body;
    const update = {
      name: product.name
    }

    // This seems to return the result of the query, though I wanted to return the modified object...
    product = await Product.findOneAndUpdate({ _id: req.params._id }, update, { new: true });
    res.json(product);
  }
  catch (err) { next({ route: "PUT products/:_id", err }) }
};

const removeProduct = async (req, res, next) => {
  try {
    // Eventually needs to be changed to #orders related to this product === 0
    if (false) {
      const product = await Product.remove({ _id: req.params._id });
      res.json(product); // 🤔 What am I supposed to return if I deleted it? Maybe I need to re-define what is returned across the project...
    }
    else {
      const product = await Product.findOneAndUpdate({ _id: req.params._id }, { isActive: false }, { new: true });
      res.json(product);
    }
  }
  catch (err) { next({ route: "DELETE products", err }) }
};

module.exports = {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  removeProduct,
};
