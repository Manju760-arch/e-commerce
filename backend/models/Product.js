import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },

  // 👉 THIS WILL STORE SIZE (S, M, L, XL)
  description: {
    type: [String],   // must be string
    required: [], // make it required since it is size
  },

  image: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
