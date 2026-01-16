import express from "express";
import { viewMyPayment, makePayment } from "../controllers/paymentPlayerController.js";

const paymentPlayer = express();

paymentPlayer.get("/viewMyPayment/:sessionID", viewMyPayment);
paymentPlayer.put("/makePayment/:sessionID", makePayment);

export default paymentPlayer;