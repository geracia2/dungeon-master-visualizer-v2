// Require dotenv to setup environment variables in our server
require("dotenv").config();
// Load the database connection function
const connectDB = require("./config");
// Load modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
// Require Auth middleware
const { authorize } = require('./middleware/authMiddleware')

// Require routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const sceneRoutes = require('./routes/sceneRoutes')
// declare .env port
PORT = process.env.PORT;

// express app
const app = express();



// MIDDLEWARE
app.use(cors())
app.use(express.json());
// enable <form> data formatting to req.body/params
app.use(express.urlencoded({ extended: true }));


// Login authentication 
app.use('/auth', authRoutes)
// User authorization
// authorization could also be put them inside specific routes folder
app.use('/api/users', authorize, userRoutes)

// RESTful Routes
app.use('/api/scene',authorize, sceneRoutes)

// Listen to the given port
app.listen(PORT, () => {
  console.log("Listening to the port: " + PORT);
  // Connect to database
  connectDB();
});
