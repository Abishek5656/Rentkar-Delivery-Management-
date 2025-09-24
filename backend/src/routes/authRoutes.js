import express from 'express';
import { registerUser, loginUser, getAllPartners } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get("/allpartner", getAllPartners)

export default router;
