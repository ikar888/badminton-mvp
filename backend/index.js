import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./database/connectDB.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import cors from "cors";
import paymentPlayerRoutes from "./routes/paymentPlayerRoutes.js"
import paymentPlayerRoutes from "./routes/paymentPlayerRoutes.js"


const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/sessions", sessionRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Badminton-MVP");
});

app.listen(port, () => {
  console.log(`Running @ http://localhost:${port}`);
});
