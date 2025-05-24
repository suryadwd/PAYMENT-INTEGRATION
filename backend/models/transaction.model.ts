import mongoose,{Schema, Model, Document} from "mongoose";

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  rzp_orderId: string;
  rzp_paymentId: string;
  rzp_signature: string;
  amount: number;
  currency?: string;
  status?: 'created' | 'paid' | 'failed';
}

const transactionSchema: Schema<ITransaction> = new Schema({

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rzp_orderId: String,
  rzp_paymentId: String,
  rzp_signature: String,
  amount: Number,
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' }
},{timestamps: true})


export const Transaction: Model<ITransaction> = mongoose.model<ITransaction>('Transaction', transactionSchema); 