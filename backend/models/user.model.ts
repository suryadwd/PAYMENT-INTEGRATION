import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

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

export const User = mongoose.model('User', userSchema);