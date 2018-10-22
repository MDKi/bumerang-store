const mongoose = require('mongoose');

const Product = require("./product.js");
const Person = require("./person.js");

const productOrderSchema = mongoose.Schema({
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

const documentKindSchema = mongoose.Schema({
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

const commercialDocSchema = mongoose.Schema({
  printedDate: {
    type: Date,
    required: true,
  },
  docKind: {
    type: documentKindSchema,
    required: true,
  },
});

const orderSchema = mongoose.Schema({
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

module.exports = mongoose.model("Order", orderSchema);
