import express from "express";
import requireAuth from "../middleware/authMiddleware.js";
import { viewMyPayment, makePayment, viewAllMyPayment } from "../controllers/paymentPlayerController.js";

const paymentPlayer = express.Router();

paymentPlayer.use(requireAuth);

paymentPlayer.get("/viewMyPayment/", viewAllMyPayment);
paymentPlayer.get("/viewMyPayment/:sessionID", viewMyPayment);
paymentPlayer.put("/makePayment/:sessionID", makePayment);

export default paymentPlayer;