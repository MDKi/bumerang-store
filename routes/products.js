const express = require("express");
const router = express.Router();
const catchError = require("../middleware/catchError.js");

const {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  removeProduct,
} = require("../controllers/product.js");

router.get("/", catchError(getProducts, "Couldn't get products!", "GET /products"));
router.get("/:_id", catchError(getProductByID, "Couldnt't get a product!", "GET /products/:_id"));

router.post("/", catchError(createProduct, "Couldn't create a product!", "POST /products"));

router.put("/:_id", catchError(updateProduct, "Couldn't update the product", "PUT /products/:_id"));

router.delete("/:_id", catchError(removeProduct, "Couldn't remove the product", "DELETE /products/:_id"));

module.exports = router;
