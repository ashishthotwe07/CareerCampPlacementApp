import Student from "../models/students.model.js";



export default class StudentController {
    renderStudentForm(req, res){
        res.render('addstudent');
    }

    async createStudent(req, res) {
        try {
          // Extract student data from the request body
          const { name, batch, college, dsaScore, webDScore, reactScore, status } = req.body;
    
          // Create a new student in the database explicitly mentioning property names
          const newStudent = await Student.create({
            name: name,
            batch: batch,
            college: college,
            dsaScore: dsaScore,
            webDScore: webDScore,
            reactScore: reactScore,
            status: status,
          });
    
          // Redirect or send a response, as needed
          res.redirect('/dashboard'); // You can adjust the redirection URL
    
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      }

      async renderEditForm(req, res) {
        try {
            const studentId = req.params.id;
            const student = await Student.findById(studentId);
            
            if (!student) {
                // Handle case where student with the given id is not found
                res.status(404).send('Student not found');
                return;
            }

            res.render('editStudentForm', { student });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

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

            if (!updatedStudent) {
                // Handle case where student with the given id is not found
                res.status(404).send('Student not found');
                return;
            }

            // Redirect or send a response, as needed
            res.redirect('/dashboard'); // You can adjust the redirection URL

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    async deleteStudent(req, res) {
        try {
            const studentId = req.params.id;

            // Find the student by ID and delete it
            const deletedStudent = await Student.findByIdAndDelete(studentId);

            if (!deletedStudent) {
                // Handle case where student with the given id is not found
                res.status(404).send('Student not found');
                return;
            }

            // Redirect or send a response, as needed
            res.redirect('/dashboard'); // You can adjust the redirection URL

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}