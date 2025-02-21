import { Router } from "express";
import { loginUser } from "../controllers/user.controller.js";
const router = Router();

// user login
router.route("/login").post(loginUser);

export default router;
