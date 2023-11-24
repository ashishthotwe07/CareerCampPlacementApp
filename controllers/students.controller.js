// Import the Student model
import Student from "../models/students.model.js";

// Define a class for handling student-related operations
export default class StudentController {

    // Method to render the form for adding a new student
    renderStudentForm(req, res) {
        res.render('students/addstudent');
    }

    // Method to create a new student
    async createStudent(req, res) {
        try {
            // Extract student data from the request body
            const { name, batch, college, dsaScore, webDScore, reactScore, status } = req.body;

            // Create a new student in the database
            const newStudent = await Student.create({
                name: name,
                batch: batch,
                college: college,
                dsaScore: dsaScore,
                webDScore: webDScore,
                reactScore: reactScore,
                status: status,
            });

            // Redirect to the dashboard or send a response, as needed
            req.flash('success', 'Student Created');
            res.redirect('/dashboard'); // You can adjust the redirection URL

        } catch (error) {
            console.error(error);
            // Handle errors and send a 500 Internal Server Error response
            res.status(500).send('Internal Server Error');
        }
    }

    // Method to render the form for editing a student
    async renderEditForm(req, res) {
        try {
            // Extract studentId from the request parameters
            const studentId = req.params.id;

            // Find the student by ID
            const student = await Student.findById(studentId);

            // Handle case where student with the given id is not found
            if (!student) {
                res.status(404).send('Student not found');
                return;
            }

            // Render the 'editStudentForm' view, passing the student data
            res.render('students/editStudentForm', { student });

        } catch (error) {
            console.error(error);
            // Handle errors and send a 500 Internal Server Error response
            res.status(500).send('Internal Server Error');
        }
    }

    // Method to update an existing student
    async updateStudent(req, res) {
        try {
            // Extract student data from the request body
            const { studentId, name, batch, college, dsaScore, webDScore, reactScore, status } = req.body;

            // Find the student by ID and update the fields
            const updatedStudent = await Student.findByIdAndUpdate(studentId, {
                name: name,
                batch: batch,
                college: college,
                dsaScore: dsaScore,
                webDScore: webDScore,
                reactScore: reactScore,
                status: status,
            }, { new: true }); // { new: true } ensures you get the updated document

            // Handle case where student with the given id is not found
            if (!updatedStudent) {
                res.status(404).send('Student not found');
                return;
            }

            // Redirect to the dashboard or send a response, as needed
            req.flash('success', 'Students Information updated');
            res.redirect('/dashboard'); // You can adjust the redirection URL

        } catch (error) {
            console.error(error);
            // Handle errors and send a 500 Internal Server Error response
            res.status(500).send('Internal Server Error');
        }
    }

    // Method to delete a student
    async deleteStudent(req, res) {
        try {
            // Extract studentId from the request parameters
            const studentId = req.params.id;

            // Find the student by ID and delete it
            const deletedStudent = await Student.findByIdAndDelete(studentId);

            // Handle case where student with the given id is not found
            if (!deletedStudent) {
                res.status(404).send('Student not found');
                return;
            }

            // Redirect to the dashboard or send a response, as needed
            req.flash('success', 'Students Deleted');
            res.redirect('/dashboard'); // You can adjust the redirection URL

        } catch (error) {
            console.error(error);
            // Handle errors and send a 500 Internal Server Error response
            res.status(500).send('Internal Server Error');
        }
    }
}
