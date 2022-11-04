import express from "express";


import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser
} from "../controllers/userController.js";
import { protect,admin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/").post(registerUser).get(protect,admin, getUsers);
router.route('/:id').delete(protect,admin,deleteUser)

export default router;
