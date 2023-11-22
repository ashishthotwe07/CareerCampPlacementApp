// Import required modules
import express from 'express';
import ejs from 'ejs';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import router from './routes/index.js';
import { db } from './config/mongoose.config.js';
import session from 'express-session';
import passport from 'passport';
import passportLocal from './config/passport.localStrategy.js'
import MongoStore from 'connect-mongo';
import papaparse from 'papaparse';
import fs from 'fs';


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

app.use(session({
  name: 'career_camp_placement',
  secret: 'Ashking@1', // a secret key for session security
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://0.0.0.0:27017/Career_Camp', // MongoDB connection URL
    collectionName: 'sessionData',
    mongooseConnection: db, // Mongoose connection object
  }),
}));

// Initialize Passport and restore authentication state if any, from the session
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser)

// Set up your routes and other middleware as needed

app.use('/' , router);


// Start the server on port 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});


