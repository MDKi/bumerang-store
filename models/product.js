const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
