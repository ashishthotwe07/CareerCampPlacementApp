// models/student.js

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
});

const Student = model('Student', studentSchema);

export default Student;
