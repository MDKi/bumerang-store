const { Customer, Individual, Organization } = require("../models/customer");

const getCustomers = async (req, res, next) => {
  const [limit, page] = [5000, req.query.page];
  const skip = page * limit;
  const query = req.query.isActive ? { isActive: true } : {};
  const customers = await Customer.find(query, {}, { skip, limit })
  res.json(customers);
};
const getIndividuals = async (req, res, next) => {
  const [limit, page] = [5000, req.query.page];
  const skip = page * limit;
  const query = req.query.isActive ? { isActive: true } : {};
  const customers = await Individual.find(query, {}, { skip, limit })
  res.json(customers);
};
const getOrganizations = async (req, res, next) => {
  const [limit, page] = [5000, req.query.page];
  const skip = page * limit;
  const query = req.query.isActive ? { isActive: true } : {};
  const customers = await Organization.find(query, {}, { skip, limit })
  res.json(customers);
};
const getCustomerByID = async (req, res, next) => {
  const customer = await Customer.findById(req.params._id);
  res.json(customer);
};

const createIndividual = async (req, res, next) => {
  const customer = await Individual.create(req.body);
  res.json(customer);
};
const createOrganization = async (req, res, next) => {
  const customer = await Organization.create(req.body);
  res.json(customer);
};

const updateCustomer = async (req, res, next) => {
  let customer = req.body;
  // TO-DO
  const update = {
    email: customer.email,
  }

  customer = await Customer.findOneAndUpdate({ _id: req.params._id }, update, { new: true });
  res.json(customer);
};

const deleteCustomer = async (req, res, next) => {
  // Eventually needs to be changed to #orders related to this customer === 0
  if (false) {
    const customer = await Customer.remove({ _id: req.params._id });
    res.json(customer);
  }
  else {
    const customer = await Customer.findOneAndUpdate({ _id: req.params._id }, { isActive: false }, { new: true });
    res.json(customer);
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
