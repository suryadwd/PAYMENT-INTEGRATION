import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import transactionRouter from "./routes/transaction.routes.js";
import { dbConnect } from "./config/db.js";

app.use(express.json());
app.use(cors({ credentials: true, origin:[ "http://localhost:5173",  'http://13.61.164.1.nip.io'] }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRouter);
app.use("/api/products", productRouter);
app.use("/api/transactions", transactionRouter);

const PORT = parseInt(process.env.PORT || "8000", 10);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  dbConnect();
});
