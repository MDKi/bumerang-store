const express = require("express");
const router = express.Router();

const { Customer, Individual, Organization } = require("../models/customer");

router.get("/", async (req, res, next) => {
  // If I used Promises
  // Customer.find({})
  //   .then(customers => res.json(customers))
  //   .catch(err => next(err))
  try {
    const [limit, page] = [5000, req.query.page];
    const skip = page * limit;
    const customers = await Customer.find({}, {}, { skip, limit })
    res.json(customers);
  }
  catch (err) { next({ route: "GET customers", err }) }
});
router.get("/individuals", async (req, res, next) => {
  try {
    const [limit, page] = [5000, req.query.page];
    const skip = page * limit;
    const customers = await Individual.find({}, {}, { skip, limit })
    res.json(customers);
  }
  catch (err) { next({ route: "GET customers/individuals", err }) }
});
router.get("/organizations", async (req, res, next) => {
  // I don't remember if I want to keep this here or in the error handler...
  // Organization.find((err, customers) => {
  //   if (customers.length === 0) {
  //     res.status(404).json({ message: "No customers" })
  //     return;
  //   }
  //   res.json(customers);
  // }, {}, { limit: 5000 });
  try {
    const [limit, page] = [5000, req.query.page];
    const skip = page * limit;
    const customers = await Organization.find({}, {}, { skip, limit })
    res.json(customers);
  }
  catch (err) { next({ route: "GET customers/organizations", err }) }
});

router.get("/:_id", async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params._id);
    res.json(customer);
  }
  catch (err) { next({ route: "GET customers/:_id", err }) }
});


router.post("/individuals", async (req, res, next) => {
  try {
    const customer = await Individual.create(req.body);
    res.json(customer);
  }
  catch (err) { next({ route: "POST customers/individuals", err }) }
});
router.post("/organizations", async (req, res, next) => {
  try {
    const customer = await Organization.create(req.body);
    res.json(customer);
  }
  catch (err) { next({ route: "POST customers/organizations", err }) }
});


router.put("/:_id", async (req, res, next) => {
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
});


router.delete("/:_id", async (req, res, next) => {
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
});

module.exports = router;
