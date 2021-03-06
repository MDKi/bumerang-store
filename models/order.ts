import mongoose from 'mongoose';

import toJson from '@meanie/mongoose-to-json';
mongoose.plugin(toJson);

import Product from "./product";
import { Person } from "./person";

const productOrderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Product,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const documentKindSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
    required: true,
    enum: ["positive", "negative"],
  },
});

const commercialDocSchema = new mongoose.Schema({
  printedDate: {
    type: Date,
    required: true,
  },
  docKind: {
    type: documentKindSchema,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Person,
    required: false,
  },
  products: {
    type: [productOrderSchema],
    required: true,
  },
  isSale: {
    type: Boolean,
    required: true,
    default: true,
  },
  commercialDocs: {
    type: [commercialDocSchema],
  },
  create_date: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model("Order", orderSchema);
