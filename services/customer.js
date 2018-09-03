const { Customer, Individual, Organization } = require("../models/customer");

const getCustomers = async (req, res, next) => {
  try {
    const [limit, page] = [5000, req.query.page];
    const skip = page * limit;
    const query = req.query.isActive ? { isActive: true } : {};
    const customers = await Customer.find(query, {}, { skip, limit })
    res.json(customers);
  }
  catch (err) { next({ route: "GET customers", err }) }
};
const getIndividuals = async (req, res, next) => {
  try {
    const [limit, page] = [5000, req.query.page];
    const skip = page * limit;
    const query = req.query.isActive ? { isActive: true } : {};
    const customers = await Individual.find(query, {}, { skip, limit })
    res.json(customers);
  }
  catch (err) { next({ route: "GET customers/individuals", err }) }
};
const getOrganizations = async (req, res, next) => {
  try {
    const [limit, page] = [5000, req.query.page];
    const skip = page * limit;
    const query = req.query.isActive ? { isActive: true } : {};
    const customers = await Organization.find(query, {}, { skip, limit })
    res.json(customers);
  }
  catch (err) { next({ route: "GET customers/organizations", err }) }
};
const getCustomerByID = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params._id);
    res.json(customer);
  }
  catch (err) { next({ route: "GET customers/:_id", err }) }
};

const createIndividual = async (req, res, next) => {
  try {
    const customer = await Individual.create(req.body);
    res.json(customer);
  }
  catch (err) { next({ route: "POST customers/individuals", err }) }
};
const createOrganization = async (req, res, next) => {
  try {
    const customer = await Organization.create(req.body);
    res.json(customer);
  }
  catch (err) { next({ route: "POST customers/organizations", err }) }
};

const updateCustomer = async (req, res, next) => {
  try {
    let customer = req.body;
    // TO-DO
    const update = {
      email: customer.email,
    }

    customer = await Customer.findOneAndUpdate({ _id: req.params._id }, update);
    res.json(customer);
  }
  catch (err) { next({ route: "PUT customers/:_id", err }) }
};

const deleteCustomer = async (req, res, next) => {
  try {
    // Eventually needs to be changed to #orders related to this customer === 0
    if (false) {
      const customer = await Customer.remove({ _id: req.params._id });
      res.json(customer);
    }
    else {
      const customer = await Customer.findOneAndUpdate({ _id: req.params._id }, { isActive: false }, {});
      res.json(customer);
    }
  }
  catch (err) { next({ route: "DELETE customers/:_id", err }) }
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
