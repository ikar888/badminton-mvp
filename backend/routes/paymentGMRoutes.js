import express from "express";
import { viewAllGMPayment} from "../controllers/paymentGMController.js";

const paymentGM = express();

paymentGM.get("/viewAllPayment/:sessionID", viewAllGMPayment);


export default paymentGM;