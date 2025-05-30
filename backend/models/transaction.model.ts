import mongoose,{Schema, Model, Document} from "mongoose";

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  amount: number;
  currency?: string;
  status?: 'created' | 'paid' | 'failed';
  createdAt?: Date;
}

const transactionSchema: Schema<ITransaction> = new Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
  createdAt: { type: Date, default: Date.now }


},{timestamps: true})


export const Transaction: Model<ITransaction> = mongoose.model<ITransaction>('Transaction', transactionSchema); 