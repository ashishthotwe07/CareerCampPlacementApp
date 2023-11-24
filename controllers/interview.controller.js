// Import models
import Interview from '../models/interview.model.js';
import Student from '../models/students.model.js';

// Define a class 
export default class InterviewController {

  // Method to list all interviews
  async listInterviews(req, res) {
    try {
      // Fetch all interviews from the database
      const interviews = await Interview.find();
      // Render the 'interview' view, passing the interviews data
      res.render('interviews/interview', { interviews });
    } catch (error) {
      console.error(error);
      // Handle errors 
      res.status(500).send('Internal Server Error');
    }
  }

  // Method to render the form for adding a new interview
  renderAddInterviewForm(req, res) {
    // Create a new Interview instance for the form
    const interview = new Interview();
    // Render the 'addInterview' view
    res.render('interviews/addInterview');
  }

  // Method to create a new interview
  async createInterview(req, res) {
    try {
      // Extract company and date from the request body
      const { company, date } = req.body;
      // Create a new interview instance and save it to the database
      const newInterview = await Interview.create({
        company: company,
        date: date,
      });
      // Redirect to the '/interview' route after successful creation
      req.flash('success', 'Interview created successfully.');
      res.redirect('/interview');
    } catch (error) {
      console.error(error);
      // Handle errors
      res.status(500).send('Internal Server Error');
    }
  }

  // Method to render the form for allocating students to an interview
  async allocateStudents(req, res) {
    try {
      // Extract interviewId from the request parameters
      const interviewId = req.params.id;
      // Fetch all students from the database
      const students = await Student.find();
      // Fetch the interview by its ID
      const interview = await Interview.findById(interviewId);
      // Render the 'allocate' view, passing the interview and students data
       
      res.render('interviews/allocate', { interview, students });
    } catch (error) {
      console.error(error);
      // Handle errors 
      res.status(500).send('Internal Server Error');
    }
  }

 
  // Method to process student allocation to an interview
async processAllocation(req, res) {
  try {
    // Extract interviewId and studentIds from the request body
    const interviewId = req.params.id;
    const { studentIds } = req.body;

    // Fetch the interview by its ID
    const interview = await Interview.findById(interviewId);

    // Check if no students are selected for allocation
    if (!studentIds || studentIds.length === 0) {
      
      return res.redirect('/interview');
    }

    // Fetch students with the specified IDs
    const students = await Student.find({ _id: { $in: studentIds } });

    // Check if students are already allocated to the interview
    const existingStudentIds = interview.students.map(student => student.toString());
    const newStudentIds = studentIds.filter(studentId => !existingStudentIds.includes(studentId));

    // Update references only for new students
    interview.students = interview.students.concat(newStudentIds);
    students
      .filter(student => newStudentIds.includes(student._id.toString()))
      .forEach(student => student.interviews.push(interview._id));

    // Save the updated interview and associated students
    await Promise.all([interview.save(), ...students.map(student => student.save())]);

    // Redirect to the '/interview' route after successful allocation
    req.flash('success', 'Students Allocated to Interivew.');
    res.redirect('/interview');
  } catch (error) {
    console.error(error);
    // Handle errors
    res.status(500).send('Internal Server Error');
  }
}


// Method to process student unallocation from an interview
async processUnallocation(req, res) {
  try {
    // Extract interviewId and studentIds from the request body
    const interviewId = req.params.id;
    const { studentIds } = req.body;

    // Fetch the interview by its ID
    const interview = await Interview.findById(interviewId);

    // Check if no students are selected for unallocation
    if (!studentIds || studentIds.length === 0) {
      return res.redirect('/interview');
    }

    // Remove students from the interview and update references
    interview.students = interview.students.filter(student => !studentIds.includes(student.toString()));
    await interview.save();

    // Update students to remove the interview reference
    await Student.updateMany(
      { _id: { $in: studentIds } },
      { $pull: { interviews: interviewId } }
    );

    // Redirect to the '/interview' route after successful unallocation
    req.flash('success', 'Students Unallocated from Interview.');
    res.redirect('/interview');
  } catch (error) {
    console.error(error);
    // Handle errors
    res.status(500).send('Internal Server Error');
  }
}


  // Method to render the form for editing an interview
  async renderEditInterviewForm(req, res) {
    try {
      // Extract interviewId from the request parameters
      const interviewId = req.params.id;
      // Fetch the interview by its ID
      const interview = await Interview.findById(interviewId);

      // Handle case where interview with the given id is not found
      if (!interview) {
        res.status(404).send('Interview not found');
        return;
      }

      // Render the 'editInterview' view, passing the interview data
      res.render('interviews/editInterview', { interview });
    } catch (error) {
      console.error(error);
      // Handle errors and send a 500 Internal Server Error response
      res.status(500).send('Internal Server Error');
    }
  }

  // Method to update an existing interview
  async updateInterview(req, res) {
    try {
      // Extract interviewId, company, and date from the request body
      const { interviewId, company, date } = req.body;

      // Find and update the interview by its ID
      const updatedInterview = await Interview.findByIdAndUpdate(interviewId, {
        company: company,
        date: date,
      }, { new: true });

      // Handle case where interview with the given id is not found
      if (!updatedInterview) {
        res.status(404).send('Interview not found');
        return;
      }

      // Redirect to the '/interview' route after successful update
      req.flash('success', 'Interview Updated.');
      res.redirect('/interview');
    } catch (error) {
      console.error(error);
      // Handle errors and send a 500 Internal Server Error response
      res.status(500).send('Internal Server Error');
    }
  }

  // Method to delete an interview
  async deleteInterview(req, res) {
    try {
      // Extract interviewId from the request parameters
      const interviewId = req.params.id;

      // Find and delete the interview by its ID
      const deletedInterview = await Interview.findByIdAndDelete(interviewId);

      // Handle case where interview with the given id is not found
      if (!deletedInterview) {
        res.status(404).send('Interview not found');
        return;
      }

      // Redirect to the '/interview' route after successful deletion
      req.flash('success', 'Interview Deleted.');
      res.redirect('/interview');
    } catch (error) {
      console.error(error);
      // Handle errors and send a 500 Internal Server Error response
      res.status(500).send('Internal Server Error');
    }
  }
}
