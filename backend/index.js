import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import connectDB from "./database/connectDB.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentGMRoutes from "./routes/paymentGMRoutes.js";
import paymentPlayerRoutes from "./routes/paymentPlayerRoutes.js";
import webhookRoutes from "./routes/webhook.js";
import analysisRoutes from "./routes/analysisRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use("/webhook", express.raw({ type: "application/json" }), webhookRoutes);
app.use(express.json());
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_HOST,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/sessions", sessionRoutes);
app.use("/api/v1/matches", matchRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/payments/gm", paymentGMRoutes);
app.use("/api/v1/payments/player", paymentPlayerRoutes);
app.use("/api/v1/video", analysisRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Badminton-MVP");
});

app.listen(port, () => {
  console.log(`Running @ http://localhost:${port}`);
});
