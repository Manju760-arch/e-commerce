import express from 'express';
import Cart from '../models/cartModel.js';

const router = express.Router();

// Get cart by user
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:userId', async (req, res) => {
  const { productId, name, price,  size , quantity} = req.body;
try {
    let cart = await Cart.findOne({ user: req.params.userId });

    if (!cart) {
      cart = new Cart({
        user: req.params.userId,
        items: [{ product: productId, name, price, size,quantity }]
      });
    } else {
      // Check if product already exists in cart
     const existingItem = cart.items.find(
  (item) =>
    item.product.toString() === productId &&
    item.size === size     // <-- match size too
);

      if (existingItem) {
        existingItem.quantity += 1;  // Increase quantity
      } else {
        cart.items.push({ product: productId, name, price, size, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Remove cart item
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== req.params.productId
    );
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Increase Quantity
router.put("/:userId/increase/:productId/:size", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === req.params.productId && i.size === req.params.size
    );

    if (item) {
      item.quantity += 1;
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Decrease Quantity
router.put("/:userId/decrease/:productId/:size", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === req.params.productId && i.size === req.params.size
    );

    if (item) {
      item.quantity -= 1;

      // If quantity is 0, remove item
      if (item.quantity <= 0) {
        cart.items = cart.items.filter(
          (i) =>
            !(
              i.product.toString() === req.params.productId &&
              i.size === req.params.size
            )
        );
      }

      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
