// Import required modules
import express from 'express';
import ejs from 'ejs';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import router from './routes/index.js';
import { db } from './config/mongoose.config.js';

// Create an Express application
const app = express();


app.use(express.urlencoded({ extended: true }));

// Middleware for EJS layouts
app.use(expressEjsLayouts);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join('views'));

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join('public')));

// Set up your routes and other middleware as needed

app.use('/' , router);

// Start the server on port 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
