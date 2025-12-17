const Cart = require("../models/Cart");
const Product = require("../models/Product");
const getCart = async(req,res)=>{
    const cart = await Cart.findOne({user:req.userData.id}).populate("products.product");
    if(!cart){
        return res.status(200).json({message:"Cart not found",cart:[]});
    }
    res.status(200).json({cart});
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.userData.id });

    if (!cart) {
      cart = new Cart({ user: req.userData.id, products: [] });
    }

    const existingItem = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json({ message: "Added to cart", cart });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {getCart, addToCart};