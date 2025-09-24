import Order from '../models/Order.js';
import User from '../models/User.js';

// @desc    Get logged-in partner's assigned orders
// @route   GET /api/partner/orders
// @access  Partner only
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ assignedTo: req.user._id });
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (picked / delivered)
// @route   PUT /api/partner/orders/:id/status
// @access  Partner only
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['picked', 'delivered'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status update' });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      assignedTo: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found or not assigned to you' });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Update partner availability
// @route   PUT /api/partner/availability
// @access  Partner only
export const updateAvailability = async (req, res, next) => {
  try {
    const { availability } = req.body;

    if (typeof availability !== 'boolean') {
      return res.status(400).json({ success: false, message: 'Availability must be true or false' });
    }

    const partner = await User.findById(req.user._id);
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }

    partner.availability = availability;
    await partner.save();

    res.json({ success: true, data: partner });
  } catch (error) {
    next(error);
  }
};


export const getAllPartners = async (req, res, next) => {
  try {
    const users = await User.find({ role: "partner", availability: true });
     res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};
