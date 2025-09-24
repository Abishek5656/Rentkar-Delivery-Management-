import Order from '../models/Order.js';
import User from '../models/User.js';

import mongoose from 'mongoose';

// @desc    Create new order
// @route   POST /api/orders
// @access  Admin only
export const createOrder = async (req, res, next) => {
  try {
    const { productName, deliveryAddress } = req.body;

    if (!productName || !deliveryAddress) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const order = await Order.create(
      {
        productName,
        deliveryAddress,
        status: 'pending'
      }
    );

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Admin only
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('assignedTo', 'name email');
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign order to a partner
// @route   PUT /api/orders/:id/assign/:partnerId
// @access  Admin only
export const assignOrder = async (req, res, next) => {
  try {
    const { id, partnerId } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const partner = await User.findById(partnerId);
    if (!partner || partner.role !== 'partner') {
      return res.status(400).json({ success: false, message: 'Invalid partner' });
    }

    order.assignedTo = partner._id;
    order.status = 'assigned';
    await order.save();

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Admin only
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
};
