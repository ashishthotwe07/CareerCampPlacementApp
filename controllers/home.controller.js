// Import models
import Student from "../models/students.model.js";
import Result from "../models/result.model.js";

// Define a class
export default class HomeController {
  // Method to render the home page
  renderHome(req, res) {
    if (req.isAuthenticated()) {
      req.flash('success', 'You are already logged in.');
      return res.redirect('/dashboard');
    }
    res.render('home');
  }

  // Method to render the dashboard page with students and interview results
  async renderDashboard(req, res) {
    try {
      const students = await Student.find().populate({
        path: 'interviews',
        populate: {
          path: 'results',
        },
      });

      res.render('students/dashboard', { students, Result });
    } catch (error) {
      req.flash('error', 'Error loading dashboard.');

      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}
