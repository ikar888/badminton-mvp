import express from "express";
import requireAuth from "../middleware/authMiddleware.js";
import { viewMyPayment, makePayment } from "../controllers/paymentPlayerController.js";

const paymentPlayer = express();

paymentPlayer.use(requireAuth);

paymentPlayer.get("/viewMyPayment/:sessionID", viewMyPayment);
paymentPlayer.put("/makePayment/:sessionID", makePayment);

export default paymentPlayer;