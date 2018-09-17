const Product = require("../models/product.js");

const getProducts = async (req, res) => {
  const [limit, page] = [5000, req.query.page];
  const skip = page * limit;
  const query = req.query.isActive ? { isActive: true } : {};
  const products = await Product.find(query, {}, { skip, limit })
  res.json(products);
};
const getProductByID = async (req, res) => {
  const product = await Product.findById(req.params._id);
  res.json(product);
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

const updateProduct = async (req, res) => {
  let product = req.body;
  const update = {
    name: product.name
  }

  product = await Product.findOneAndUpdate({ _id: req.params._id }, update, { new: true });
  res.json(product);
};

const removeProduct = async (req, res) => {
  // Eventually needs to be changed to #orders related to this product === 0
  if (false) {
    const product = await Product.remove({ _id: req.params._id });
    res.json(product); // 🤔 What am I supposed to return if I deleted it? Maybe I need to re-define what is returned across the project...
  }
  else {
    const product = await Product.findOneAndUpdate({ _id: req.params._id }, { isActive: false }, { new: true });
    res.json(product);
  }
};

module.exports = {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  removeProduct,
};
