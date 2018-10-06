const express = require("express");
const router = express.Router();
const catchError = require("../middleware/catchError.js");

const {
  getOrders,
  getOrderByID,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.js");

router.get("/", catchError(getOrders, "Couldn't get orders!", "GET /orders"));
router.get("/:_id", catchError(getOrderByID, "Couldnt't get an order!", "GET /orders/:_id"));

router.post("/", catchError(createOrder, "Couldn't create an order!", "POST /orders"));

router.put("/:_id", catchError(updateOrder, "Couldn't update the order", "PUT /orders/:_id"));

router.delete("/:_id", catchError(deleteOrder, "Couldn't remove the order", "DELETE /orders/:_id"));

module.exports = router;
