const Order = require('../models/order.js');

const getAll = require("../helpers/controllers/getAll.js");

const findArgs = (req, res) => ({query: req.query || {}});
const onceFound = orders => orders.populate('person').populate('products.product');

const getOrders = getAll(Order, findArgs, onceFound);
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
