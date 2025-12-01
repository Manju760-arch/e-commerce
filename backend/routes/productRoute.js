import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// Get related products by category
router.get("/related/:category/:productId", async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
      _id: { $ne: req.params.productId }, // exclude the product being viewed
    }).limit(4); // show max 4 suggestions

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
