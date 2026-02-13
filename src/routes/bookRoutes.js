import express from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBook);
router.get("/", protect, getBooks);
router.get("/:id", protect, getBookById);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

export default router;
