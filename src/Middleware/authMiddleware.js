import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes
export const authMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Get token from Authorization header
    // Format must be: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Find user from token
    const user = await User.findById(decoded.id).select("-password -refreshToken");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 4️⃣ Attach user to request object
    req.user = user;

    // 5️⃣ Call next() to continue to route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
