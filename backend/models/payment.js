import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema ({
  playerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to User
    required: true
  },

  gameMasterID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to User
    required: true
  },

  sessionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session', // reference to Session
    required: true
  },

  gamesPlayed: {
    type: Number,
  },

  perGameFee: {
    type: Number,
  },

  totalAmount: {
    type: Number,
  },

  paymentIntentId: {
    type: String,
    unique: true
  },

  paymentMethod: { 
    type: String, 
  },

  status: { 
    type: String, 
    enum: ["Pending", "Completed"], 
    default: "Pending" 
  },

  paymentMadeAt: {
    type: Date,
  },

  createdAt: { 
    type: Date,
    default: Date.now
  }

}, {timestamps: true});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;