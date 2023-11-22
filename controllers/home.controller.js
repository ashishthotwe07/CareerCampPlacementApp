// Import models
import Student from "../models/students.model.js";
import Result from "../models/result.model.js";

// Define a class 
export default class HomeController {
  // Method to render the home page
  renderHome(req, res) {
    // Check if the user is authenticated, and redirect to the dashboard if true
    if (req.isAuthenticated()) {
      return res.redirect('/dashboard');
    }
    // Render the home page if the user is not authenticated
    res.render('home');
  }

  // Method to render the dashboard page with students and interview results
  async renderDashboard(req, res) {
    try {
      // Fetch all students from the database and populate their interviews and results
      const students = await Student.find().populate({
        path: 'interviews',
        populate: {
          path: 'results' // Populate the results for each interview
        }
      });

      // Passing both students and the Result model to the template for rendering
      res.render('students/dashboard', { students, Result });
    } catch (error) {
      // Handle errors 
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}
