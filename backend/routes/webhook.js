import express from "express";
import Stripe from "stripe";
import Payment from "../models/payment.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET; 

router.post("/", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    
    try {
      await Payment.findOneAndUpdate(
        { paymentIntentId: paymentIntent.id }, 
        { 
          paymentMethod: "Stripe",
          status: "Completed", 
          paymentMadeAt: new Date() 
        },
        { new: true }
      );
      res.status(200).json({ 
        message: "Successfully Paid",
        received: true 
      })
    } catch (error) {
      return res.status(500).json({ 
        received: true, 
        message: "Database Payment update failed" 
      });
    }
  }
});


export default router;