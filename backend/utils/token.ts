import { Response } from "express"
import jwt from "jsonwebtoken"



export const genTokenSetCookies = async (payload: string, res: Response) => {

  const token = jwt.sign({ id: payload },  process.env.JWT_SECRET as string, { expiresIn: '5d' });

  res.cookie("jwtToken",token,{maxAge:5*24*60*60*1000})

}