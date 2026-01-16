import Payment from  "../models/payment.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const viewMyPayment = async (req, res) => {
  try {
    const userID = req.payload.id;
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
// will now be handled by match controller
// const generateTotalAmount = async (req, res) => {
//   try {
//     const { sessionID } = req.params;
//     const userID = req.payload.id;
//     const completedMatchCount = await Match.countDocuments({
//       sessionID: sessionID,
//       status: "Completed",
//       $or: [
//         {teamA: userID},
//         {teamB: userID}
//       ]
//     });

//     if(!completedMatchCount) {
//       return res.status(404).json({
//         message: "No completed matches found"
//       })
//     };

//     const paymentRecord = await Payment.findOne({
//       playerID: userID,
//       sessionID: sessionID
//     });

//     if(!paymentRecord) {
//       return res.status(404).json({
//         message: "Payment record not found"
//       })
//     }

//     const updatedPaymentRecord = await Payment.findOneAndUpdate({
//       playerID: userID,
//       sessionID: sessionID
//     }, {
//       gamesPlayed: completedMatchCount,
//       totalAmount: completedMatchCount * paymentRecord.perGameFee
//     },
//     { 
//       new: true
//     }
//   );

//     res.status(200).json({
//       data: updatedPaymentRecord,
//       message: "Successfully updated the total Amount"
//     });

//   } catch (error) {
//     console.error("Generate Total Amount error:", error);
//     res.status(500).json({
//       message: "Server error during generate total amount"
//     })
//   }
// }

const makePayment = async (req, res) => {
  try {
    const userID = req.payload.id;
    const { sessionID } = req.params;
    const viewPayment = await Payment.findOne({
      playerID: userID,
      sessionID: sessionID
    });

    const paymentIntent = await stripe.PaymentIntents.create({
      amount: viewPayment.totalAmount * 100,
      currency: "php"
    });

    const savePayment = await Payment.findOneAndUpdate({
      playerID: userID,
      sessionID: sessionID
    } , {
      paymentMethod: "Stripe",
      status: "Completed",
      paymentMadeAt: new Date()
    } , { 
      new: true
    }
  );

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