const Cart = require('../models/Cart');
const Order = require('../models/Order');


const getOrders = async (req, res) => {
  try {
    let query = {};
    if (req.userData && req.userData.id) {
      query = { $or: [{ userId: req.userData.id }, { userEmail: req.userData.email }] };
    }
    const orders = await Order.find(query);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read orders' });
  }
};

const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const newOrder = new Order({
      id: Date.now(),
      items,
      total,
      date: new Date(),
      userId: req.userData?.id,
      userEmail: req.userData?.email,
    });
    await newOrder.save();

    try {
      if (req.userData && req.userData.id) {
        await Cart.findOneAndUpdate({ user: req.userData.id }, { products: [] });
      }
    } catch (e) {
      console.error('Failed to clear cart for user after order', e.message || e);
    }

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findOneAndDelete({ id: id });
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

module.exports = { getOrders, createOrder, deleteOrder };
