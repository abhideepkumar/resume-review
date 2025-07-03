import { Router } from "express";
import { loginUser } from "../controllers/user.controller.js";
import { newUser } from "../controllers/user.controller.js";
const router = Router();

// user login
router.route("/login").post(loginUser);
//new user
router.route("/signup").post(newUser);

export default router;
