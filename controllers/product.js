const Product = require("../models/product.js");
const Order = require("../models/order.js");

const getAll = require("../helpers/controllers/getAll.js");

// const getProducts = getAll(Product, (obj, req, res) => { query = req.query.isActive ? { isActive: true } : {} });
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
  const { create_date, __v, _id, ...update } = req.body;
  res.json(await Product.findOneAndUpdate({ _id: req.params._id }, update, { new: true }));
};

const removeProduct = async (req, res) => {
  const _id = req.params._id;

  if ((await Order.find({ 'products.product': _id })).length === 0) {
    res.json(await Product.remove({ _id }));
  }
  else {
    res.json(await Product.findOneAndUpdate({ _id }, { isActive: false }, { new: true }));
  }
};

module.exports = {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  removeProduct,
};
