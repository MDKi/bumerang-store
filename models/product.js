const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

const Product = module.exports = mongoose.model('Product', productSchema);
