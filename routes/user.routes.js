// routes/user.route.js

import express from 'express';
import UserController from '../controllers/user.controller.js';
import passport from 'passport';


const router = express.Router();
const userController = new UserController();

// Render signup form
router.get('/signup', userController.renderSignUpForm);

// Handle user signup
router.post('/signup', userController.signUp);

// Render signin form
router.get('/signin', userController.renderSignInForm);

// Handle user signin
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect on successful signin
    failureRedirect: '/users/signin', // Redirect on failure, back to signin
    failureFlash: true, // Enable flash messages for failure messages
  }),
  userController.signIn
);

router.get('/signout' , userController.logout);
export default router;
