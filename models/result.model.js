
import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
  },
  status: {
    type: String,
    enum: ['Pass', 'Fail', 'On Hold', "Didn't Attempt"],
    default: "Didn't Attempt", // Default status
  },
});

const Result = mongoose.model('Result', resultSchema);

export default Result;
