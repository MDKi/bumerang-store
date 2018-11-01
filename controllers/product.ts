import {Request, Response} from 'express';

import Product from "../models/product";
import Order from "../models/order";

import getAll from "../helpers/controllers/getAll";

const findArgs = (req: Request, res: Response) => ({ query: req.query.isActive ? { isActive: true } : {} ,
projection: {}, options: {}});

const getProducts = getAll(Product, findArgs);
const getProductByID = async (req: Request, res: Response) => {
  res.json(await Product.findById(req.params._id));
};

const createProduct = async (req: Request, res: Response) => {
  res.json(await Product.create(req.body));
};

const updateProduct = async (req: Request, res: Response) => {
  const { create_date, __v, _id, ...update } = req.body;
  res.json(await Product.findOneAndUpdate({ _id: req.params._id }, update, { new: true }));
};

const removeProduct = async (req: Request, res: Response) => {
  const _id = req.params._id;

  if ((await Order.find({ 'products.product': _id })).length === 0) {
    res.json(await Product.remove({ _id }));
  }
  else {
    res.json(await Product.findOneAndUpdate({ _id }, { isActive: false }, { new: true }));
  }
};

export {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  removeProduct,
};
