import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

export default class UserController {
  // Action for rendering the sign-up form
  renderSignUpForm(req, res) {
    if(req.isAuthenticated()){
      return res.redirect('/dashboard');
    }
    res.render('signup');
  }

  // Action for handling user sign-up
  async signUp(req, res) {
    // Implement user sign-up logic here
    try {
      // Extract user data from the request body
      const { name, email, password } = req.body;

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the saltRounds

  
    // Create a new user in the database (assuming you have a User model)
      const user = await User.create({
          name: name,
          email: email,
          password: hashedPassword
      });

      // Redirect 
      res.redirect('/users/signin'); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  // Action for rendering the sign-in form
  renderSignInForm(req, res) {
    if(req.isAuthenticated()){
      return res.redirect('/dashboard');
    }
    res.render('signin');
  }

  // Action for handling user sign-in
  async signIn(req, res) {
    
    try {
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  logout(req, res) {
    try {
      req.logout(() => {
        res.redirect('/');
      });
    } catch (error) {
      console.error('Error in logout:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  


}
