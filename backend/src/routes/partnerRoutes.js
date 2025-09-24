import express from 'express';
import {
  getMyOrders,
  updateOrderStatus,
  updateAvailability,
} from '../controllers/partnerController.js';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/orders', protect, authorizeRoles('partner'), getMyOrders);
router.put('/orders/:id/status', protect, authorizeRoles('partner'), updateOrderStatus);
router.put('/availability', protect, authorizeRoles('partner'), updateAvailability);

export default router;
