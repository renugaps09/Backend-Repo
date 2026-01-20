import express from "express";
import {
  signup,
  login,
  refreshAccessToken,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// 👇 NEW ROUTE
router.post("/refresh-token", refreshAccessToken);

export default router;
