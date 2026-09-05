import express from "express";
import {
  getAllUsers,
  getRecentUsers,
  getUserProfile,
  updateProfile,
  fetchMessages,
  sendMessage,
} from "../controllers/userController.js";
import {Protect} from "../middlewares/authMiddleware.js"

const router = express.Router();

// Get all users
router.get("/allUsers", Protect, getAllUsers);

// Get recent chat users
router.get("/recentUsers", Protect, getRecentUsers);

// Get a single user's safe, public-facing profile (e.g. a chat participant)
router.get("/profile/:userId", Protect, getUserProfile);

// Update current user profile
router.put("/profile", Protect, updateProfile);

// fetch all old Messages between 2 users
router.get("/fetchMessages/:receiverId", Protect, fetchMessages);

// send new Messages between 2 users
router.post("/sendMessage/:receiverId", Protect, sendMessage);

export default router;