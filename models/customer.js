const mongoose = require('mongoose');

const neighborhoodSchema = mongoose.Schema({
  neighborhood: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: true,
  },
  house: {
    type: String,
    required: true,
  },
});

const addressSchema = mongoose.Schema({
  street: {
    type: String,
  },
  number: {
    type: String,
  },
  neighborhood: {
    type: neighborhoodSchema,
  },
  zipCode: {
    type: String,
    default: "5567",
  },
  city: {
    type: String,
    default: "La Consulta",
  },
  department: { // Municipality
    type: String,
    default: "San Carlos",
  },
  province: {
    type: String,
    default: "Mendoza",
  },
});

const phoneSchema = mongoose.Schema({
  areaCode: {
    type: String,
    default: "2622",
  },
  number: {
    type: String,
    required: true,
  },
});

const options = { discriminatorKey: 'kind' };
const customerSchema = mongoose.Schema({
  email: {
    type: String,
  },
  address: {
    type: [addressSchema],
    required: false,
  },
  phone: {
    type: [phoneSchema],
    required: false,
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

const Customer = mongoose.model('Customer', customerSchema);
const Individual = Customer.discriminator('Individual', individualSchema);
const Organization = Customer.discriminator('Organization', organizationSchema);

module.exports = {
  Customer,
  Individual,
  Organization,
};
