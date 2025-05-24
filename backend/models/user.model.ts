import mongoose, {Schema, Model, Document} from "mongoose";

// defining interfaces
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  transaction?: mongoose.Types.ObjectId[];
}

//changing  structure 
const userSchema: Schema<IUser> = new Schema({

  name:{
    type: String,
  },
  email:{
    type:String
  },
  password:{
    type:String
  },  
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  transaction: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'transaction'
  }]

}, {timestamps: true});



export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);