import express from "express";
import multer from "multer";
import { uploadAndAnalyze } from "../controllers/analysisController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/analyze", upload.single("video"), uploadAndAnalyze);

export default router;
