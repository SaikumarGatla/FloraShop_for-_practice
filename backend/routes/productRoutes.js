const express = require('express');
const {
  getProductById,
  getProducts,
  deleteProductById,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts
} = require("../controllers/productController.js");

const { protect, admin } = require("../middlewares/authMiddleware.js");

const router = express.Router()

router.route("/").get(getProducts).post(protect,admin, createProduct);
router.route("/:id/reviews").post(protect,createProductReview);
router.get('/carousel', getTopProducts);
router.route("/:id").get(getProductById).delete(protect, admin, deleteProductById).put(protect, admin, updateProduct);

module.exports = router