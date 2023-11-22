import express from 'express';
import fastCsv from 'fast-csv';
import Student from '../models/students.model.js';
import Interview from '../models/interview.model.js'; // Import Interview model

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Fetch students and populate the 'interviews' field
    const students = await Student.find().populate({
      path: 'interviews',
    });

    // Explicitly populate the 'results' field within each interview
    await Interview.populate(students, { path: 'interviews.results' });

    // Create a CSV stream
    const csvStream = fastCsv.format({ headers: true });

    // Pipe the CSV stream to the response
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=students_data.csv');
    csvStream.pipe(res);

    // Write header row
    csvStream.write([
      'Student ID',
      'Student Name',
      'Student College',
      'Student Status',
      'DSA Final Score',
      'WebD Final Score',
      'React Final Score',
      'Interview Date',
      'Interview Company',
      'Interview Result'
    ]);

    // Write data rows
    students.forEach(student => {
      student.interviews.forEach(interview => {
        const resultStatus = interview.results && interview.results.length > 0
        ? interview.results.map(result => result.status).join(', ')
        : 'No Result';
      

        csvStream.write([
          student._id,
          student.name,
          student.college,
          student.status,
          student.dsaScore,
          student.webDScore,
          student.reactScore,
          interview.date,
          interview.company,
          resultStatus
        ]);
      });
    });

    // End the CSV stream
    csvStream.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
