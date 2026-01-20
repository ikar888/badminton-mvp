import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema ({
  gameMasterID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to User
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  startTime: {
    type: Date,
    required: true
  },

  endTime: {
    type: Date,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  perGameFee: {
    type: Number,
    required: true
  },

  mode: {
    type: String,
    default: 'Doubles'
  },

  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to User
  }],

  queue: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match', // reference to Match
  }],

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }

}, {timestamps: true});

const Session = mongoose.model('Session', sessionSchema);

export default Session;