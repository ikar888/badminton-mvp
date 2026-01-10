import mongoose from 'mongoose';

const userSchema = mongoose.Schema ({
  username: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    isPlayer: Boolean,
    isGameMaster: Boolean
  },

  skillLevel: { 
    type: String,
    required: true
  },

  matchHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  }, 

  paymentHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  }, 

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type:Date,
    default: Date.now
  }

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;