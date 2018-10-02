const Product = require("../models/product.js");

const getProducts = async (req, res) => {
  const [limit, page] = [5000, req.query.page];
  const skip = page * limit;
  const query = req.query.isActive ? { isActive: true } : {};
  res.json(await Product.find(query, {}, { skip, limit }));
};
const getProductByID = async (req, res) => {
  res.json(await Product.findById(req.params._id));
};

const createProduct = async (req, res) => {
  res.json(await Product.create(req.body));
};

const updateProduct = async (req, res) => {
  const {create_date, __v, _id, ...update} = req.body;
  res.json(await Product.findOneAndUpdate({ _id: req.params._id }, update, { new: true }));
};

const removeProduct = async (req, res) => {
  // Eventually needs to be changed to #orders related to this product === 0
  if (false) {
    res.json(await Product.remove({ _id: req.params._id }));
  }
  else {
    res.json(await Product.findOneAndUpdate({ _id: req.params._id }, { isActive: false }, { new: true }));
  }
};

module.exports = {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  removeProduct,
};
