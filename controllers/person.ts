import { Request, Response } from 'express';

import { Person, Individual, Organization } from "../models/person";
import Order from "../models/order";

import getAll from "../helpers/controllers/getAll";

const findArgs = (req: Request, res: Response) => ({
  query: req.query.isActive ? { isActive: true } : {},
  projection: {}, options: {}
});

const getPeople = getAll(Person, findArgs);
const getIndividuals = getAll(Individual, findArgs);
const getOrganizations = getAll(Organization, findArgs);
const getPersonByID = async (req: Request, res: Response) => {
  res.json(await Person.findById(req.params._id));
};

const createPerson = async (req: Request, res: Response) => {
  if (!req.body.kind) throw new Error("(POST) Invalid kind!");
  if (req.body.kind === "Individual") return createIndividual;
  if (req.body.kind === "Organization") return createOrganization;
};
const createIndividual = async (req: Request, res: Response) => {
  res.json(await Individual.create(req.body));
};
const createOrganization = async (req: Request, res: Response) => {
  res.json(await Organization.create(req.body));
};

const updatePerson = async (req: Request, res: Response) => {
  const { create_date, __v, _id, ...update } = await req.body;
  if (update.kind === "Individual") {
    res.json(await Individual.findOneAndUpdate({ _id: req.params._id }, update, { new: true }));
  }
  else if (update.kind === "Organization") {
    res.json(await Person.findOneAndUpdate({ _id: req.params._id }, update, { new: true }));
  }
  else throw new Error("(PUT) Invalid kind!");
};

const deletePerson = async (req: Request, res: Response) => {
  const _id = req.params._id;
  if ((await Order.find({ person: _id })).length === 0) {
    res.json(await Person.remove({ _id }));
  }
  else {
    res.json(await Person.findOneAndUpdate({ _id }, { isActive: false }, { new: true }));
  }
};

export {
  getPeople,
  getIndividuals,
  getOrganizations,
  getPersonByID,
  createPerson,
  createIndividual,
  createOrganization,
  updatePerson,
  deletePerson,
}
