const express = require("express");
const router = express.Router();

const customer = require("../models/customer");
const Customer = customer.Customer;
const Individual = customer.Individual;
const Organization = customer.Organization;

router.get("/", (req, res) => {
  Customer.find((err, customers) => {
    if (err) { throw err; }
    res.json(customers);
  }).limit(req.body.limit);
});
router.get("/individuals", (req, res) => {
  Individual.find((err, customers) => {
    if (err) { throw err; }
    res.json(customers);
  }).limit(req.body.limit);
});
router.get("/organizations", (req, res) => {
  Organization.find((err, customers) => {
    if (err) { throw err; }
    res.json(customers);
  }).limit(req.body.limit);
});

router.get("/:_id", (req, res) => {
  Customer.findById(req.params._id, (err, customer) => {
    if (err) { throw err; }
    res.json(customer);
  });
});

/*router.post("/", (req, res) => {
  const customer = req.body;

  Customer.create(customer, (err, customer) => {
    if (err) { throw err; }
    res.json(customer);
  })
});*/
// I don't actually want to have generic customers, but if I did I'd just need to uncomment the above block.

router.post("/individuals", (req, res) => {
  const customer = req.body;

  Individual.create(customer, (err, customer) => {
    if (err) { throw err; }
    res.json(customer);
  })
});
router.post("/organizations", (req, res) => {
  const customer = req.body;

  Organization.create(customer, (err, customer) => {
    if (err) { throw err; }
    res.json(customer);
  })
});


router.put("/:_id", (req, res) => {
  const customer = req.body;
  const update = {
    name: customer.name
  }

  Customer.findOneAndUpdate({_id: req.params._id}, update, {}, (err, customer) => {
    if (err) { throw err; }
    res.json(customer);
  });
});

router.delete("/:_id", (req, res) => {
  // Eventually needs to be changed to #orders related to this customer === 0
  if (false) {
  Customer.remove({_id: req.params._id}, (err, customer) => {
    if (err) { throw err; }
    res.json(customer);
  });
  }
  else {
    Customer.findOneAndUpdate({_id: req.params._id}, {isActive: false}, {}, (err, customer) => {
      if (err) { throw err; }
      res.json(customer);
    });
  }
});

module.exports = router;
