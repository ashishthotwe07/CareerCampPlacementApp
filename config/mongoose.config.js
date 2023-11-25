// Importing mongoose
import mongoose from "mongoose";

// Connect to the MongoDB database with new URL parser
mongoose.connect('mongodb://localhost:27017/Career_Camp', { useNewUrlParser: true, useUnifiedTopology: true });


// Get the connection object from mongoose
const db = mongoose.connection;

// Event listener for database connection error
db.on('error', console.error.bind(console, 'Error in connecting to DB'));

// Event listener for successful database connection
db.once('open', () => {
    console.log("Connected to Database");
});

// Export the database connection object
export { db };
