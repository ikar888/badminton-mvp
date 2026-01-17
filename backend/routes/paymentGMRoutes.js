import express from "express";
import requireAuth from "../middleware/authMiddleware.js";
import { viewAllGMPayment} from "../controllers/paymentGMController.js";

const paymentGM = express();

paymentGM.use(requireAuth);

paymentGM.get("/viewAllPayment/:sessionID", viewAllGMPayment);

export default paymentGM;