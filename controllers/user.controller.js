import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

export default class UserController {
  // Action for rendering the sign-up form
  renderSignUpForm(req, res) {
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
    res.render('signin');
  }

  // Action for handling user sign-in
  async signIn(req, res) {
    // Implement user sign-in logic here
    try {
      // Extract user data from the request body
      const { email, password } = req.body;

      // Validate input data

      // Find the user by email in the database
      const user = await User.findOne({ email });

      if (user) {
        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          // Redirect or respond as needed upon successful sign-in
          console.log("logged in");
          res.redirect('/');
        } else {
          // Handle invalid password
          res.render('signin', { error: 'Invalid email or password' });
        }
      } else {
        // Handle user not found
        res.render('signin', { error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}
