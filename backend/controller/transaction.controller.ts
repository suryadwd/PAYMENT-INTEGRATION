import { Transaction } from "../models/transaction.model";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import { razorpay } from "../config/razorpay";
import * as crypto from "crypto";

// creating a transaction(Order)

export const createOrder = async (req: any, res: any) => {
  try {
    
    const {userId, productId} = req.body;
    if (!userId || !productId)  return res.status(400).json({ error: "User ID and Product ID are required" });
    
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const options = {
      amount: product.price * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_no_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options);

    const transaction = new Transaction({
      userId,
      productId,
      razorpayOrderId: order.id,
      amount: options.amount,  // product.price bhi lik sakte h
      currency: options.currency, 
      status: "created",
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order
    })

  } catch (error) {
    console.log("error in createOrder:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// verifyPayment

export const verifyPayment = async (req: any, res: any) => {
  try {

    const { razorpayOrderId, paymentId, signature } = req.body;

    const sign = razorpayOrderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET as string)
    .update(sign.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === signature;

  if (isAuthentic) {
    await Transaction.findOneAndUpdate(
      { razorpayOrderId: razorpayOrderId },
      {
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
        status: 'paid',
      }
    );

    res.status(200).json({ message: 'Payment verified successfully' });
  } else {
    res.status(400).json({ error: 'Invalid signature' });
  }
  } catch (error) {
    console.log("error in verifyPayment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const webhook = async (req: any, res: any) => {
  try {
    
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET as string;
  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (digest === req.headers['x-razorpay-signature']) {
    const event = req.body.event;
    const payload = req.body.payload;

    if (event === 'payment.captured') {
      const { order_id, id } = payload.payment.entity;

      await Transaction.findOneAndUpdate(
        { razorpayOrderId: order_id },
        { razorpayPaymentId: id, status: 'paid' }
      );
    }

    res.status(200).json({ status: 'Webhook received' });
  } else {
    res.status(400).json({ error: 'Invalid webhook signature' });
  }

  } catch (error) {
    console.log("error in webhook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}