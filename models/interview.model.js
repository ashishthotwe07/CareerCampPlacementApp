// models/interview.model.js
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
});

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;
