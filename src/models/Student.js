import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
    dob: {
      type: Date,
    },
    year: {
      type: Number,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
