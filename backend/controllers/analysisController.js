import { analyzeVideo } from "../services/geminiService.js";
import fs from "fs";

export async function uploadAndAnalyze(req, res) {
  try {
    console.log("Uploaded file:", req.file);

    const filePath = req.file.path;
    const insights = await analyzeVideo(filePath);

    fs.unlinkSync(filePath);

    res.status(200).json({
      message: "Video analyzed successfully",
      insights,
    });
  } catch (err) {
    console.error("Analysis error:", err);
    res.status(500).json({ error: "Video analysis failed" });
  }
}
