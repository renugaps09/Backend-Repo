import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  year: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Book", bookSchema); // ✅ ES Module export
