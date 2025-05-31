import { Transaction } from "../models/transaction.model.js";
import { Product } from "../models/product.model.js";
import { razorpay } from "../config/razorpay.js";
import * as crypto from "crypto";

// creating a transaction(Order)

export const createOrder = async (req: any, res: any) => {
  try {
    
    console.log("Incoming order request:", req.body);
    console.log("Cookies:", req.cookies);
    console.log("User:", req.user); // from protectRoute

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
      key: process.env.RAZORPAY_KEY_ID
    });

    await transaction.save();

    return res.status(201).json({
  success: true,
  message: "Order created successfully",
  key: process.env.RAZORPAY_KEY_ID,     // Add this
  amount: order.amount,                 // Add this
  currency: order.currency,             // Add this
  orderId: order.id,                    // Add this
  order,
});


  } catch (error) {
    console.log("error in createOrder:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// verifyPayment

export const verifyPayment = async (req: any, res: any) => {
  try {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET as string)
    .update(sign.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    await Transaction.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
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

// later we can use this webhook to update the transaction status

// export const webhook = async (req: any, res: any) => {
//   try {
    
//   const secret = process.env.RAZORPAY_WEBHOOK_SECRET as string;
//   const shasum = crypto.createHmac('sha256', secret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest('hex');

//   if (digest === req.headers['x-razorpay-signature']) {
//     const event = req.body.event;
//     const payload = req.body.payload;

//     if (event === 'payment.captured') {
//       const { order_id, id } = payload.payment.entity;

//       await Transaction.findOneAndUpdate(
//         { razorpayOrderId: order_id },
//         { razorpayPaymentId: id, status: 'paid' }
//       );
//     }

//     res.status(200).json({ status: 'Webhook received' });
//   } else {
//     res.status(400).json({ error: 'Invalid webhook signature' });
//   }

//   } catch (error) {
//     console.log("error in webhook:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }