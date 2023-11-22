// Import necessary modules and controllers
import express from 'express';
import UserController from '../controllers/user.controller.js';
import passport from 'passport';

// Create an Express router
const router = express.Router();
const userController = new UserController();

// Define routes for user authentication and registration

// Render signup form
router.get('/signup', userController.renderSignUpForm);

// Handle user signup
router.post('/signup', userController.signUp);

// Render signin form
router.get('/signin', userController.renderSignInForm);

// Handle user signin using passport middleware
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect on successful signin
    failureRedirect: '/users/signin', // Redirect on failure, back to signin
    failureFlash: 'Incorrect email/Password', // Enable flash messages for failure messages
  }),
  userController.signIn
);

// Handle user signout
router.get('/signout', userController.logout);

// Export the router
export default router;
