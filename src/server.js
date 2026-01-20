import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();        // Load .env variables
connectDB();            // Connect MongoDB

const app = express();

// 🔑 MIDDLEWARE (VERY IMPORTANT)
app.use(cors());
app.use(express.json()); // 👈 Allows reading JSON body

// 🔗 ROUTES
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// 🏠 TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running...");
});

// 🚀 SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
