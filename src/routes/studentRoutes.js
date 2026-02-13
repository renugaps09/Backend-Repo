import express from "express";
import authMiddleware from "../Middleware/ authMiddleware.js";

import uploadMiddleware from "../Middleware/uploadMiddleware.js";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

// 🔐 Protect all student routes
router.use(authMiddleware);

// 📌 Routes
router.post("/", uploadMiddleware.single("photo"), createStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", uploadMiddleware.single("photo"), updateStudent);
router.delete("/:id", deleteStudent);

export default router;