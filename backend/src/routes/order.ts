import express from 'express';
import Order from '../models/Order';
import { auth, adminAuth } from '../middleware/auth';

const router = express.Router();

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;
    const order = new Order({
      user: (req as any).user.userId,
      items,
      totalAmount,
      shippingAddress,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: (req as any).user.userId })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Admin: Get all orders
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Admin: Update order status
router.put('/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status' });
  }
});

export default router;
