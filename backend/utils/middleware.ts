import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
dotenv.config();

export const protectRoute = async (req: any, res: any, next:  any) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      console.log("No token found in cookies:", req.cookies);
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
      return res.status(401).json({ message: "Token verification failed" });
    }

    const user = await User.findById((decoded as any).id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;


    next();
  } catch (error: any) {
    console.log("Error in protectRoute middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};