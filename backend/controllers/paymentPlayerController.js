import Payment from  "../models/payment.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const viewMyPayment = async (req, res) => {
  try {
    const userID = req.user._id;
    const { sessionID } = req.params;
    const viewPayment = await Payment.find({
      playerID: userID,
      sessionID: sessionID
    });

    if(!viewPayment.length) {
      return res.status(404).json({
        message: "No record found"
      })
    };

    res.status(200).json({
      data: viewPayment
    });

  } catch (error) {
    console.error("View Payment error:", error);
    res.status(500).json({
      message: "Server error during view payment"
    })
  }
}

const makePayment = async (req, res) => {
  try {
    const userID = req.user._id
    const { sessionID } = req.params;
    const viewPayment = await Payment.findOne({
      playerID: userID,
      sessionID: sessionID
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: viewPayment.totalAmount * 100,
      currency: "php"
    });
  
  res.status(200).json({
    message: "Payment Intent Created",
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id
  });

  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({
      message: "Payment Failed"
    })
  }
}

export {
  viewMyPayment,
  makePayment
}