// Import modules
import passport from 'passport';

// Middleware function for authentication
function isAuthenticated(req, res, next) {
  // Passport adds the isAuthenticated method to the request object
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // If authenticated, proceed to the next middleware or route handler
    return next();
  }

  // If not authenticated, redirect to the login page or send an error response
  res.redirect('/'); // You can customize the redirect URL
}


export default isAuthenticated;