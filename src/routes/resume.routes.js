import { Router } from "express";
import { uploadResume,searchResume } from "../controllers/resume.controller.js";
const router = Router();
// router.use(express.json());
//check jwt and upload Resume and save to database
router.route("/uploadResume").post(uploadResume);
router.route("/searchResume").post(searchResume);

export default router;
