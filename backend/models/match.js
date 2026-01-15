import mongoose from 'mongoose';

const matchSchema = mongoose.Schema ({
  sessionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session', // reference to Session
    required: true
  },

  sequenceNumber: {
    type: Number,
  },

  teamA: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to User
  }],

  teamB: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to User
  }],

  status: {
    type: String,
    enum: ["Scheduled", "Ongoing" , "Completed"],
    default: "Scheduled"
  }
}, {timestamps: true});

const Match = mongoose.model('Match', matchSchema);

export default Match;