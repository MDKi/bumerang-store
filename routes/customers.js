const express = require("express");
const router = express.Router();
const catchError = require("../middleware/catchError.js");

const {
  getCustomers,
  getIndividuals,
  getOrganizations,
  getCustomerByID,
  createIndividual,
  createOrganization,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.js");

router.get("/", catchError(getCustomers, "Couldn't get customers!", "GET /customers"));
router.get("/individuals", catchError(getIndividuals, "Couldn't get individuals!", "GET /customers/"));
router.get("/organizations", catchError(getOrganizations, "Couldn't get organizations!", "GET /customers/individuals"));
router.get("/:_id", catchError(getCustomerByID, "Couldn't get a product!", "GET /customers/organizations"));

router.post("/individuals", catchError(createIndividual, "Couldn't create an individual!", "POST /customers/individuals"));
router.post("/organizations", catchError(createOrganization, "Couldn't create an organization!", "POST /customers/organizations"));

router.put("/:_id", catchError(updateCustomer, "Couldn't update a customer!", "PUT /customers/:_id"));

router.delete("/:_id", catchError(deleteCustomer, "Couldn't remove a customer!", "DELETE /customers/:_id"));

module.exports = router;
