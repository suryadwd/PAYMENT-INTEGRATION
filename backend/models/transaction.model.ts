import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }

},{timestamps: true})