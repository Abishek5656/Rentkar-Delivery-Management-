import express from 'express';
import {
  createOrder,
  getOrders,
  assignOrder,
  deleteOrder,
} from '../controllers/orderController.js';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin-only order routes
router.post('/', protect, authorizeRoles('admin'), createOrder);
router.get('/', protect, authorizeRoles('admin'), getOrders);
router.put('/:id/assign/:partnerId', protect, authorizeRoles('admin'), assignOrder);
router.delete('/:id', protect, authorizeRoles('admin'), deleteOrder);

export default router;
