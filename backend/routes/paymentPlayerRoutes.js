import express from "express";
import requireAuth from "../middleware/authMiddleware.js";
import { viewMyPayment, makePayment } from "../controllers/paymentPlayerController.js";

const paymentPlayer = express();
const router = express.Router();

router.use(requireAuth);

paymentPlayer.get("/viewMyPayment/:sessionID", viewMyPayment);
paymentPlayer.put("/makePayment/:sessionID", makePayment);

export default paymentPlayer;