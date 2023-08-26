const express = require("express");

const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToBeDelivered,
} = require("../controllers/orderController.js");
const { protect ,admin } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect,admin, getOrders)
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToBeDelivered);


module.exports = router;
