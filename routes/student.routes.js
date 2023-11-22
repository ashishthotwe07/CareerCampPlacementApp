// Import necessary modules and controllers
import express from 'express';
import StudentController from '../controllers/students.controller.js';
import passport from 'passport';

// Create an Express router
const router = express.Router();
const studentController = new StudentController();

// Define routes for student operations

// Render form to add a new student
router.get('/add', studentController.renderStudentForm);

// Create a new student
router.post('/add', studentController.createStudent);

// Render form to edit an existing student
router.get('/edit/:id', studentController.renderEditForm);

// Update an existing student
router.post('/edit/:id', studentController.updateStudent);

// Delete a specific student
router.get('/delete/:id', studentController.deleteStudent);

// Export the router
export default router;
