import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeVideo(filePath) {
  const videoData = fs.readFileSync(filePath).toString("base64");

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    Analyze this badminton training video.
    Provide insights in JSON format with keys:
    - strengths (list)
    - weaknesses (list)
    - improvementSuggestions (list)
  `;

  const result = await model.generateContent([
    { inlineData: { data: videoData, mimeType: "video/mp4" } },
    prompt,
  ]);

  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}
