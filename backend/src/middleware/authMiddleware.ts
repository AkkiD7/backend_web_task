import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "secret";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    res.status(401).json({ message: "Access Denied. No Token Provided." });
    return; 
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    (req as any).user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
