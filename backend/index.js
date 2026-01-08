import dotenv from "dotenv";
import express from 'express';
import 'dotenv/config'
import connectDB from './database/connectDB.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

import authRoutes from "./routes/authRoutes.js";
import connectDB from "./database/connectDB.js";
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Badminton-MVP');
})
app.listen(port, () => {
  console.log(`Running @ http://localhost:${port}`);
});