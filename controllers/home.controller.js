import Student from "../models/students.model.js";

export default class HomeController {
  renderHome(req, res){
    if(req.isAuthenticated()){
      return res.redirect('/dashboard');
    }
    res.render('home')
  }
  async renderDashboard(req, res){
    try {
      const students = await Student.find(); // Fetch students from the database
      res.render('dashboard', { students });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  
  }
}