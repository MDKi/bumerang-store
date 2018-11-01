import mongoose from 'mongoose';

const neighborhoodSchema = new mongoose.Schema({
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

const addressSchema = new mongoose.Schema({
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

const phoneSchema = new mongoose.Schema({
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
const personSchema = new mongoose.Schema({
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

const individualSchema = new mongoose.Schema({
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
const organizationSchema = new mongoose.Schema({
  CUIT: {
    type: String,
  },
  fantasyName: {
    type: String,
  },
}, options);

const Person = mongoose.model('Person', personSchema);
const Individual = Person.discriminator('Individual', individualSchema);
const Organization = Person.discriminator('Organization', organizationSchema);

export {
  Person,
  Individual,
  Organization,
};
