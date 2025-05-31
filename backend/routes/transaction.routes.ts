import express from 'express';
import { createOrder, verifyPayment } from '../controller/transaction.controller.js';
import { protectRoute } from '../utils/middleware.js';

const router = express.Router();

router.post('/create-order', protectRoute, createOrder);
router.post('/verify-payment', protectRoute, verifyPayment);
// router.post('/webhook', webhook);

export default router;

