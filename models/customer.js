const mongoose = require('mongoose');

const options = {discriminatorKey: 'kind'};
const customerSchema = mongoose.Schema({
  email: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  }
}, options);

const individualSchema = mongoose.Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  DNI: {
    type: String,
  },
}, options);
const organizationSchema = mongoose.Schema({
  CUIT: {
    type: String,
  },
  fantasyName: {
    type: String,
  },
}, options);

module.exports = mongoose.model('Customer', customerSchema);
