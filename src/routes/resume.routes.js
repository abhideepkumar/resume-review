import { Router } from "express";
import { uploadResume } from "../controllers/resume.controller.js";
const router = Router();

//check jwt and upload Resume and save to database
router.route("/uploadResume").post(uploadResume);

export default router;
