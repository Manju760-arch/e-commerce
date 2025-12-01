// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Optional: you can add other fields here, like orders
  },
  { timestamps: true } // This automatically adds createdAt and updatedAt
);

export default mongoose.model("User", userSchema);
