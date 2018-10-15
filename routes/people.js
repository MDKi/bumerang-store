const express = require("express");
const router = express.Router();
const catchError = require("../middleware/catchError.js");

const {
  getPeople,
  getIndividuals,
  getOrganizations,
  getPersonByID,
  createIndividual,
  createOrganization,
  updatePerson,
  deletePerson,
} = require("../controllers/person.js");

router.get("/", catchError(getPeople, "Couldn't get people!", "GET /people"));
router.get("/individuals", catchError(getIndividuals, "Couldn't get individuals!", "GET /people/"));
router.get("/organizations", catchError(getOrganizations, "Couldn't get organizations!", "GET /people/individuals"));
router.get("/:_id", catchError(getPersonByID, "Couldn't get a product!", "GET /people/organizations"));

router.post("/individuals", catchError(createIndividual, "Couldn't create an individual!", "POST /people/individuals"));
router.post("/organizations", catchError(createOrganization, "Couldn't create an organization!", "POST /people/organizations"));

router.put("/:_id", catchError(updatePerson, "Couldn't update a person!", "PUT /people/:_id"));

router.delete("/:_id", catchError(deletePerson, "Couldn't remove a person!", "DELETE /people/:_id"));

module.exports = router;
