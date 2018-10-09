const { Customer, Individual, Organization } = require("../models/customer");
const getAll = require("../helpers/controllers/getAll.js");

// const getCustomers = getAll(Customer, (obj, req, res) => { query = req.query.isActive ? { isActive: true } : {} });
// const getIndividuals = getAll(Individual, (obj, req, res) => { query = req.query.isActive ? { isActive: true } : {} });
// const getOrganizations = getAll(Organization, (obj, req, res) => { query = req.query.isActive ? { isActive: true } : {} });
const getCustomers = async (req, res) => {
  const [limit, page] = [5000, req.query.page];
  const skip = page * limit;
  const query = req.query.isActive ? { isActive: true } : {};
  res.json(await Customer.find(query, {}, { skip, limit }));
};
const getIndividuals = async (req, res) => {
  const [limit, page] = [5000, req.query.page];
  const skip = page * limit;
  const query = req.query.isActive ? { isActive: true } : {};
  res.json(await Individual.find(query, {}, { skip, limit }));
};
const getOrganizations = async (req, res) => {
  const [limit, page] = [5000, req.query.page];
  const skip = page * limit;
  const query = req.query.isActive ? { isActive: true } : {};
  const customers = await Organization.find(query, {}, { skip, limit })
  res.json(customers);
};
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
  // Eventually needs to be changed to #orders related to this customer === 0
  if (false) {
    res.json(await Customer.remove({ _id: req.params._id }));
  }
  else {
    res.json(await Customer.findOneAndUpdate({ _id: req.params._id }, { isActive: false }, { new: true }));
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
