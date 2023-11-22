// Import modules and the User model
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

// Define a class for handling user-related operations
export default class UserController {

  // Action for rendering the sign-up form
  renderSignUpForm(req, res) {
    // Check if the user is already authenticated, redirect to dashboard if true
    if(req.isAuthenticated()){
      return res.redirect('/dashboard');
    }
    // Render the 'signup' view
    res.render('Users/signup');
  }

  // Action for handling user sign-up
  async signUp(req, res) {
    try {
      // Extract user data from the request body
      const { name, email, password } = req.body;

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the saltRounds

      // Create a new user in the database using the User model
      const user = await User.create({
          name: name,
          email: email,
          password: hashedPassword
      });

      // Redirect to the sign-in page after successful sign-up
      res.redirect('/users/signin'); 
    } catch (error) {
      console.error(error);
      // Handle errors and send a 500 Internal Server Error response
      res.status(500).send('Internal Server Error');
    }
  }

  // Action for rendering the sign-in form
  renderSignInForm(req, res) {
    // Check if the user is already authenticated, redirect to dashboard if true
    if(req.isAuthenticated()){
      return res.redirect('/dashboard');
    }
    // Render the 'signin' view
    res.render('Users/signin');
  }

  // Action for handling user sign-in
  async signIn(req, res) {
    try {
      // Redirect to the dashboard after successful sign-in
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      // Handle errors and send a 500 Internal Server Error response
      res.status(500).send('Internal Server Error');
    }
  }

  // Action for handling user logout
  logout(req, res) {
    try {
      // Logout the user and redirect to the home page
      req.logout(() => {
        res.redirect('/');
      });
    } catch (error) {
      console.error('Error in logout:', error);
      // Handle errors and send a 500 Internal Server Error response
      res.status(500).send('Internal Server Error');
    }
  }
}
