
// Import required modules
import express from 'express';
import ejs from 'ejs';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';

// Create an Express application
const app = express();

// Middleware for EJS layouts
app.use(expressEjsLayouts);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(path.dirname(new URL(import.meta.url).pathname), 'views'));

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(path.dirname(new URL(import.meta.url).pathname), 'public')));

// Set up your routes and other middleware as needed

// Start the server on port 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
