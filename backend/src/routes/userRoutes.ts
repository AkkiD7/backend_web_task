import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  fetchAndStoreUsers,
} from "../controllers/userController";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", verifyToken, createUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/", verifyToken, getUsers);
router.get("/fetch", fetchAndStoreUsers);

export default router;
