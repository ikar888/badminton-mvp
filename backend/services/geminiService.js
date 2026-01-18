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
    Provide your insights in three clear sections suitable for a user interface:

    **Strengths**
    - List the player's strong points in bullet form.

    **Weaknesses**
    - List the areas that need improvement in bullet form.

    **Improvement Suggestions**
    - Provide actionable recommendations in bullet form.

    Keep the response concise, structured, and easy to display.
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
