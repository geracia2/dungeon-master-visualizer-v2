// Require dotenv to setup environment variables in our server
require("dotenv").config();
// Load modules
const express = require("express");
const mongoose = require("mongoose");
// Require routes
// const userRoutes = require('./routes/user')

PORT = process.env.PORT;

// express app
const app = express();

// Load the connectDB function
const connectDB = require("./config");

// MIDDLEWARE
app.use(express.json());
// enable <form> data formatting to req.body
app.use(express.urlencoded({ extended: true }));

// routes
// app.use('/api/user', userRoutes)

// Listen to the given port
app.listen(PORT, () => {
  console.log("Listening to the port: " + PORT);
  // Connect to database
  connectDB();
});
