import express from "express";
import { viewMyPayment, generateTotalAmount, makePayment } from "../controllers/paymentPlayerController.js";

const paymentPlayer = express();

paymentPlayer.get("/viewMyPayment/:sessionID", viewMyPayment);
paymentPlayer.put("/generateTotalAmount/:sessionID", generateTotalAmount);
paymentPlayer.put("/makePayment/:sessionID", makePayment);

export default paymentPlayer;