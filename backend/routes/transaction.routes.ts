import express from 'express';
import { createOrder, verifyPayment, webhook } from '../controller/transaction.controller';
import { protectRoute } from '../utils/middleware';

const router = express.Router();

router.post('/create-order', protectRoute, createOrder);
router.post('/verify-payment', protectRoute, verifyPayment);
router.post('/webhook', webhook);

export default router;

