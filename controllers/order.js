const Order = require('../models/order.js');

const getAll = require("../helpers/controllers/getAll.js");

// const getOrders = getAll(Order, (obj, req, res) => { query = req.query || {} }, i => i.populate('customer').populate('products.product'));
const getOrders = async (req, res) => {
  const [limit, page] = [5000, req.query.page];
  const skip = page * limit;
  const query = req.query ? req.query : {};
  const orders = await Order
    .find(query, {}, { skip, limit })
    .populate('customer') // !!!
    .populate('products.product'); // !!!
  res.json(orders);
};
const getOrderByID = async (req, res) => {
  res.json(await Order.findById(req.params._id));
};
const createOrder = async (req, res) => {
  res.json(await Order.create(req.body));
};
const updateOrder = async (req, res) => {
  const { create_date, __v, _id, ...update } = req.body;
  res.json(await Order.findOneAndUpdate({ _id: req.params._id }, update, { new: true }));
};
const deleteOrder = async (req, res) => {
  res.json(await Order.remove({ _id: req.params._id }));
};

module.exports = {
  getOrders,
  getOrderByID,
  createOrder,
  updateOrder,
  deleteOrder,
};
