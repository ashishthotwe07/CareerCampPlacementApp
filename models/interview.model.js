import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  results: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Result', // Make sure it matches the name of your Result model
    },
  ],
});

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;
