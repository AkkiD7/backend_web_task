import { Request, Response } from "express";
import pool from "../config/db";

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { name, email, profile_image } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  try {
    const [existingUser]: any = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const [newUser]: any = await pool.query(
      "INSERT INTO users (name, email, profile_image) VALUES (?, ?, ?)",
      [name, email, profile_image || null]
    );

    return res
      .status(201)
      .json({ message: "User created successfully", userId: newUser.insertId });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return res
        .status(500)
        .json({ message: "Error creating user", error: err.message });
    } else {
      console.error("Unknown error:", err);
      return res.status(500).json({ message: "Unknown error occurred." });
    }
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, email, profile_image } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  try {
    const [result] = await pool.query(
      "UPDATE users SET name = ?, email = ?, profile_image = ? WHERE id = ?",
      [name, email, profile_image || null, id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const fetchAndStoreUsers = async (req: Request, res: Response) => {
  try {
    const response = await fetch("https://reqres.in/api/users");
    const data = await response.json();

    for (const user of data.data) {
      await pool.query(
        "INSERT INTO users (name, email, profile_image) VALUES (?, ?, ?)",
        [`${user.first_name} ${user.last_name}`, user.email, user.avatar]
      );
    }

    res.status(200).json({ message: "Fetched and stored users" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
};
