// controllers/result.controller.js
import Result from "../models/result.model.js";
import Student from "../models/students.model.js";
import Interview from "../models/interview.model.js";


export default class ResultController {
  
    async showResultsPage(req, res) {
        try {
            const interviewId = req.params.id;
    
            // Fetch the interview
            const interview = await Interview.findById(interviewId);
    
            if (!interview) {
                return res.status(404).send('Interview not found');
            }
    
            // Fetch results directly for the interview
            const results = await Result.find({ interview: interviewId }).populate('student');
          console.log(Student.result);
            // Map results to students for easier access in the template
            const studentsWithResults = results.map(result => ({
                student: result.student,
                result: result.status,
            }));
    
            res.render('resultPage', { interview, students: studentsWithResults });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    
    
      async updateResult(req, res) {
        try {
          const { studentId, interviewId, status } = req.body;
    
          // Find the student
          const student = await Student.findById(studentId);
    
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
    
          res.redirect(`/result/interview/${interviewId}/results`);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      }
}
