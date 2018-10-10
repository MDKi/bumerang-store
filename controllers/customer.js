const { Customer, Individual, Organization } = require("../models/customer.js");
const Order = require("../models/order.js");

const getAll = require("../helpers/controllers/getAll.js");

const findArgs = (req, res) => ({ query: req.query.isActive ? { isActive: true } : {} });

const getCustomers = getAll(Customer, findArgs);
const getIndividuals = getAll(Individual, findArgs);
const getOrganizations = getAll(Organization, findArgs);
const getCustomerByID = async (req, res) => {
  res.json(await Customer.findById(req.params._id));
};

const createIndividual = async (req, res) => {
  res.json(await Individual.create(req.body));
};
const createOrganization = async (req, res) => {
  res.json(await Organization.create(req.body));
};

const updateCustomer = async (req, res) => {
  const { create_date, __v, _id, ...update } = req.body;
  res.json(await Customer.findOneAndUpdate({ _id: req.params._id }, update, { new: true }));
};

const deleteCustomer = async (req, res) => {
  const _id = req.params._id;
  if ((await Order.find({ customer: _id })).length === 0) {
    res.json(await Customer.remove({ _id }));
  }
  else {
    res.json(await Customer.findOneAndUpdate({ _id }, { isActive: false }, { new: true }));
  }
};

module.exports = {
  getCustomers,
  getIndividuals,
  getOrganizations,
  getCustomerByID,
  createIndividual,
  createOrganization,
  updateCustomer,
  deleteCustomer,
}
