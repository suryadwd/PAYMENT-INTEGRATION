import mongoose from "mongoose";


export const dbConnect = async ()  => {
  mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));
}

