const { Person, Individual, Organization } = require("../models/person.js");
const Order = require("../models/order.js");

const getAll = require("../helpers/controllers/getAll.js");

const findArgs = (req, res) => ({ query: req.query.isActive ? { isActive: true } : {} });

const getPeople = getAll(Person, findArgs);
const getIndividuals = getAll(Individual, findArgs);
const getOrganizations = getAll(Organization, findArgs);
const getPersonByID = async (req, res) => {
  res.json(await Person.findById(req.params._id));
};

const createIndividual = async (req, res) => {
  res.json(await Individual.create(req.body));
};
const createOrganization = async (req, res) => {
  res.json(await Organization.create(req.body));
};

const updatePerson = async (req, res) => {
  const { create_date, __v, _id, ...update } = req.body;
  res.json(await Person.findOneAndUpdate({ _id: req.params._id }, update, { new: true }));
};

const deletePerson = async (req, res) => {
  const _id = req.params._id;
  if ((await Order.find({ person: _id })).length === 0) {
    res.json(await Person.remove({ _id }));
  }
  else {
    res.json(await Person.findOneAndUpdate({ _id }, { isActive: false }, { new: true }));
  }
};

module.exports = {
  getPeople,
  getIndividuals,
  getOrganizations,
  getPersonByID,
  createIndividual,
  createOrganization,
  updatePerson,
  deletePerson,
}
