const express = require("express");
const router = express.Router();

const {
  getCustomers,
  getIndividuals,
  getOrganizations,
  getCustomerByID,
  createIndividual,
  createOrganization,
  updateCustomer,
  deleteCustomer,
} = require("../services/customer.js");

router.get("/", getCustomers);
router.get("/individuals", getIndividuals);
router.get("/organizations", getOrganizations);
router.get("/:_id", getCustomerByID);

router.post("/individuals", createIndividual);
router.post("/organizations", createOrganization);

router.put("/:_id", updateCustomer);

router.delete("/:_id", deleteCustomer);

module.exports = router;
