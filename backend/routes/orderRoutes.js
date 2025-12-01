import express from "express";
import Order from "../models/orderModel.js";

const router = express.Router();

/* 1️⃣ Admin - get all orders */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* 2️⃣ User - create order */
router.post("/user/:userId", async (req, res) => {
  try {
    const { items, address, phone } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const newOrder = new Order({
      user: req.params.userId,
      items,
      address,
      phone,
      status: "Ordered",
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating order" });
  }
});

/* 3️⃣ User - get orders */
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* 4️⃣ User/Admin - update order status */
router.put("/status/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* 5️⃣ User - delete order */
router.delete("/delete/:orderId", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    const orders = await Order.find({ user: deletedOrder.user });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
