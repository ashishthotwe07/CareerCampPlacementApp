import express from 'express';
import fastCsv from 'fast-csv';
import Student from '../models/students.model.js';
import Interview from '../models/interview.model.js'; // Import Interview model
import Result from '../models/result.model.js';
import isAuthenticated from '../middlewares/authentication.middleware.js';

const router = express.Router();

router.get('/',isAuthenticated, async (req, res) => {
  try {
    // Fetch students and populate the 'interviews' field
    const students = await Student.find().populate({
      path: 'interviews',
    });

    // Fetch all results
    const allResults = await Result.find();

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
    for (const student of students) {
      for (const interview of student.interviews) {
        // Find the result for the specific interview and student
        const resultForInterview = allResults.find(result =>
          result.interview.equals(interview._id) && result.student.equals(student._id)
        );

        // Get result status for the interview
        const resultStatus = resultForInterview ? resultForInterview.status : 'Didn\'t Attempt';

        // Write the student data to the CSV stream
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
      }
    }

    // End the CSV stream
    csvStream.end();

    // Wait for the stream to finish before ending the response
    await new Promise((resolve, reject) => {
      csvStream
        .on('finish', resolve)
        .on('error', reject);
    });

    console.log('CSV stream finished');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
