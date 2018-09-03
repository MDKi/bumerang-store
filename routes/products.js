const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  removeProduct,
} = require("../services/product.js");

router.get("/", getProducts);
router.get("/:_id", getProductByID);

router.post("/", createProduct);

router.put("/:_id", updateProduct);

router.delete("/:_id", removeProduct);

module.exports = router;
