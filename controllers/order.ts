import { Request, Response } from 'express';

import Order from '../models/order';

import getAll from "../helpers/controllers/getAll";

const findArgs = (req: Request, res: Response) => ({
  query: req.query || {},
  projection: {}, options: {}
});
const onceFound = orders => orders.populate('person').populate('products.product');

const getOrders = getAll(Order, findArgs, onceFound);
const getOrderByID = async (req: Request, res: Response) => {
  res.json(await Order.findById(req.params._id));
};
const createOrder = async (req: Request, res: Response) => {
  res.json(await Order.create(req.body));
};
const updateOrder = async (req: Request, res: Response) => {
  const { create_date, __v, _id, ...update } = req.body;
  res.json(await Order.findOneAndUpdate({ _id: req.params._id }, update, { new: true }));
};
const deleteOrder = async (req: Request, res: Response) => {
  res.json(await Order.remove({ _id: req.params._id }));
};

export {
  getOrders,
  getOrderByID,
  createOrder,
  updateOrder,
  deleteOrder,
};
