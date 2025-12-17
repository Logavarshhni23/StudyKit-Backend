// routes/cart.js
const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const auth = require("../middleware/authMiddleware");

// Get cart for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userData.id }).populate("products.product");
    if (!cart) {
      return res.status(200).json([]);
    }
    res.status(200).json(cart.products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add to cart
router.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.userData.id });

    if (!cart) {
      cart = new Cart({ user: req.userData.id, products: [] });
    }

    const existingItem = cart.products.find(p => p.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart.products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:productId", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userData.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.products = cart.products.filter(p => p.product.toString() !== req.params.productId);
    await cart.save();

    res.status(200).json({ message: "Product removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


/* const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  const cart = fs.readFileSync("./data/cart.json");
  res.json(JSON.parse(cart));
});

router.get("/:id", (req, res) => {
  const data = fs.readFileSync("./data/cart.json");
  const cart = JSON.parse(data);

  const item = cart.find((c) => c.id === parseInt(req.params.id));

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(item);
});

router.post("/", (req, res) => {
  const data = fs.readFileSync("./data/cart.json");
  const cart = JSON.parse(data);
  const product = req.body;

  // Check if product already in cart
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  fs.writeFileSync("./data/cart.json", JSON.stringify(cart, null, 2));
  res.status(201).json({ message: "Added to cart successfully" });
});

router.delete("/:id", (req, res) => {
  const cart = JSON.parse(fs.readFileSync("./data/cart.json"));

  const updatedCart = cart.filter(
    (c) => c.id !== parseInt(req.params.id)
  );

  fs.writeFileSync("./data/cart.json", JSON.stringify(updatedCart, null, 2));

  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = router;
 */