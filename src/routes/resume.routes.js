import { Router } from "express";
import { uploadResume, searchResume } from "../controllers/resume.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// protected endpoints with middleware
router.route("/uploadResume").post(authMiddleware, uploadResume);
router.route("/searchResume").post(authMiddleware, searchResume);

export default router;
