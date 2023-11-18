// routes/user.route.js

import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();
const userController = new UserController();

// Render signup form
router.get('/signup', userController.renderSignUpForm);

// Handle user signup
router.post('/signup', userController.signUp);

// Render signin form
router.get('/signin', userController.renderSignInForm);

// Handle user signin
router.post('/signin', userController.signIn);

export default router;
