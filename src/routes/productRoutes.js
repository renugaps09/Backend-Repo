import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import uploadMiddleware from "../Middleware/uploadMiddleware.js"; 
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// ✅ Protected routes
router.post("/", authMiddleware, createProduct);
router.get("/", authMiddleware, getProducts);
router.get("/:id", authMiddleware, getProductById);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router; // ✅ Only this is needed
