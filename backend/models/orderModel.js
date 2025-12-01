import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: String,
      price: Number,
      size: String,   
      quantity: { type: Number, default: 1 },
    },
  ],
  
  address: String,
  phone: String,
 status: {
    type: String,
    enum: ["Ordered", "Shipped", "Out for Delivery", "Delivered"],
    default: "Ordered"
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
