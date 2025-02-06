import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import pool from "../config/db";

const secretKey = process.env.JWT_SECRET || "secret";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const [rows]: any = await pool.query(
      "SELECT * FROM admin WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const user = rows[0];

    if (user.password !== password) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    next(err); 
  }
};
