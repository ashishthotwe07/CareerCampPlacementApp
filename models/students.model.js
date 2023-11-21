// models/student.js
import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  dsaScore: {
    type: Number,
    required: true,
  },
  webDScore: {
    type: Number,
    required: true,
  },
  reactScore: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Placed', 'Not Placed'], 
    default: 'Not Placed',
  },
  interviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview'
  }],
 

});

const Student = model('Student', studentSchema);

export default Student;
