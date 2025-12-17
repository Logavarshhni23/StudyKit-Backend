const express = require('express');
const router = express.Router();
const { getOrders, createOrder, deleteOrder } = require('../controllers/ordersController');
const auth = require('../middleware/authMiddleware');

// protect orders routes - each user sees only their own orders
router.get('/', auth, getOrders);
router.post('/', auth, createOrder);
router.delete('/:id', auth, deleteOrder);

module.exports = router;
