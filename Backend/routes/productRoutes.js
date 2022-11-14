import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts)
router.route("/:id/reviews").post(protect, createProductReview);

//  fetch specific product: access: public
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
