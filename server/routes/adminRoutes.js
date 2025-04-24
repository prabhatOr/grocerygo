import express from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    toggleCustomerStatus,
} from "../controllers/adminController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, isAdmin, getAllUsers);
router.get("/users/:id", protect, isAdmin, getUserById);
router.post("/users", protect, isAdmin, createUser);
router.put("/users/:id", protect, isAdmin, updateUser);
router.patch("/users/:id", protect, isAdmin, toggleCustomerStatus);
router.delete("/users/:id", protect, isAdmin, deleteUser);

export default router;
