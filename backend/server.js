import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import authRoutes from "./routes/auth.js";

import orderRoutes from "./routes/orderRoutes.js";
import productRoute from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoutes.js";
import connectDB from "./config/db.js";

connectDB();  
const app = express();
const __dirname = path.resolve();

app.use(
  cors({
    origin: [
      "https://e-commerce-product-mauve.vercel.app",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));