import express from "express";

import{
    UserLogin,
    UserRegister,
} from "../controllers/authController.js"

const router = express.Router();

router.post("/register",UserRegister);
router.post("/login",UserLogin);

export default router;