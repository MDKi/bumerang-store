const mongoose = require('mongoose');

const Product = require("./product.js");
const Customer = require("./customer.js");

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

const orderSchema = mongoose.Schema({

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Customer,
    required: false,
  },
  products: {
    type: [productOrderSchema],
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Order", orderSchema);
