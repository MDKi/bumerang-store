const Product = require("../models/product.js");
const Order = require("../models/order.js");

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
  _id = req.params._id;
  safe = await isSafeToDelete(_id);
  if (safe) {
    res.json(await Product.remove({ _id }));
  }
  else {
    res.json(await Product.findOneAndUpdate({ _id }, { isActive: false }, { new: true }));
  }
};

const isSafeToDelete = async id => {
  const relatedOrders = await Order.find({ 'products.product': id });
  return relatedOrders.length == 0 ? true : false;
}

module.exports = {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  removeProduct,
};
