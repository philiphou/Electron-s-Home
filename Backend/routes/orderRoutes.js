import express from "express";

import {
  addOrderItems,
  getMyOrder,
  getOrderById,
  getOrderList,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getOrderList);

router.route("/myorders").get(protect, getMyOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
