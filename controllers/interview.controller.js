// controllers/interview.controller.js
import Interview from '../models/interview.model.js';
import Student from '../models/students.model.js';

export default class InterviewController {
  async listInterviews(req, res) {
    try {
      const interviews = await Interview.find();
      res.render('interviews/interview', { interviews });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  renderAddInterviewForm(req, res) {
    const interview = new Interview();
    res.render('interviews/addInterview');
  }

  async createInterview(req, res) {
    try {
      const { company, date } = req.body;
      const newInterview = await Interview.create({
        company: company,
        date: date,
      });
      res.redirect('/interview');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async allocateStudents(req, res) {
    try {
      const interviewId = req.params.id;
      const students = await Student.find();
      const interview = await Interview.findById(interviewId);

      res.render('interviews/allocate', { interview, students });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async processAllocation(req, res) {
    try {
      const interviewId = req.params.id;
      const { studentIds } = req.body;
  
      const interview = await Interview.findById(interviewId);
      const students = await Student.find({ _id: { $in: studentIds } });
  
      // Check if students are already allocated to the interview
      const existingStudentIds = interview.students.map(student => student.toString());
      const newStudentIds = studentIds.filter(studentId => !existingStudentIds.includes(studentId));
  
      // Update references only for new students
      interview.students = interview.students.concat(newStudentIds);
      students
        .filter(student => newStudentIds.includes(student._id.toString()))
        .forEach(student => student.interviews.push(interview._id));
  
      await Promise.all([interview.save(), ...students.map(student => student.save())]);
  
      res.redirect('/interview');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

async renderEditInterviewForm(req, res) {
    try {
        const interviewId = req.params.id;
        const interview = await Interview.findById(interviewId);

        if (!interview) {
            // Handle case where interview with the given id is not found
            res.status(404).send('Interview not found');
            return;
        }

        res.render('interviews/editInterview', { interview });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}






async updateInterview(req, res) {
    try {
        const { interviewId, company, date } = req.body;

        const updatedInterview = await Interview.findByIdAndUpdate(interviewId, {
            company: company,
            date: date,
        }, { new: true });

        if (!updatedInterview) {
            // Handle case where interview with the given id is not found
            res.status(404).send('Interview not found');
            return;
        }

        res.redirect('/interview');

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async deleteInterview(req, res) {
    try {
        const interviewId = req.params.id;

        const deletedInterview = await Interview.findByIdAndDelete(interviewId);

        if (!deletedInterview) {
            // Handle case where interview with the given id is not found
            res.status(404).send('Interview not found');
            return;
        }

        res.redirect('/interview');

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}










}
