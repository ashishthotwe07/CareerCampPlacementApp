// controllers/result.controller.js
import Result from "../models/result.model.js";
import Interview from "../models/interview.model.js";
import Student from "../models/students.model.js";

export default class ResultController {
  // Method to show the results page for a specific interview
  async showResultsPage(req, res) {
    try {
      // Extract interview ID from request parameters
      const interviewId = req.params.id;

      // Populate the interview with students and their results
      const interview = await Interview.findById(interviewId).populate({
        path: 'students',
        populate: {
          path: 'results',
        },
      });

      // Check if the interview exists
      if (!interview) {
        return res.status(404).send('Interview not found');
      }

      // Fetch all results
      const allResults = await Result.find();

      // Directly access students and match their results from the allResults array
      const studentsWithResults = interview.students.map(student => {
        // Find the corresponding result for the student in allResults
        const studentResult = allResults.find(result =>
          result.student.equals(student._id) && result.interview.equals(interview._id)
        );

        return {
          student: student,
          result: studentResult ? studentResult.status : "Didn't Attempt",
        };
      });

      // Render the result page with interview details and students' results
      res.render('resultPage', { interview, students: studentsWithResults });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  // Method to update the result of a student for a specific interview
  async updateResult(req, res) {
    try {
      // Extract data from the request body
      const { studentId, interviewId, status } = req.body;

      // Find the student
      const student = await Student.findById(studentId);

      // Check if the student exists
      if (!student) {
        return res.status(404).send('Student not found');
      }

      // Check if the result exists
      const existingResult = await Result.findOne({ student: studentId, interview: interviewId });

      if (existingResult) {
        // Update the existing result
        existingResult.status = status;
        await existingResult.save();
      } else {
        // Create a new result if it doesn't exist
        await Result.create({ student: studentId, interview: interviewId, status: status });
      }

      // Redirect to the results page for the specific interview
      res.redirect(`/result/interview/${interviewId}/results`);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}
