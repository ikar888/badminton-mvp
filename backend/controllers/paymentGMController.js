import Payment from "../models/payment.js";

const viewAllGMPayment = async (req, res) => {
  try {
    const { sessionID } = req.params;
    const allPayment = await Payment.find({
      sessionID: sessionID
    })
    .populate("playerID", "username email")
    .sort({status: -1, createdAt: -1});

    if(!allPayment.length) {
      return res.status(404).json({
        message: "No record found"
      })
    };

    res.status(200).json({
      count: allPayment.length,
      data: allPayment
    });

  } catch(error) {
    console.error("View all Payment error:", error);
    res.status(500).json({
      message: "Server error during view payment"
    })
  }
}

export {
  viewAllGMPayment
};