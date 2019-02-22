// Gimme that .env
require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors');

const BookRoutes = require('./routes/BookRoutes');
const CodeRoutes = require('./routes/CodeRoutes');
const StudentRoutes = require('./routes/StudentRoutes');
const ReportRoute = require('./routes/ReportRoute');


const app = express();

// Load the database url from the environment
var dbRoute = "";

if (process.env.DB_USERNAME && process.env.DB_PASSWORD) {
  dbRoute = "mongodb://" + process.env.DB_USERNAME + ":" +
    process.env.DB_PASSWORD + process.env.DB_ROUTE;
} else {
  dbRoute = "mongodb://" + process.env.DB_ROUTE;
}


// Load the port to run on from the environment
const port = process.env.PORT || 3200;

// connect our server's code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

var db = mongoose.connection;

// Give me a notification once connected
db.once("open", () => console.log("Connected to database"));

// Check if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Tell our server how to display stuff (mostly for developement)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.disable('etag');

// log that our server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// Set the corresponding routes for the three item types
app.use('/books', BookRoutes);
app.use('/codes', CodeRoutes);
app.use('/students', StudentRoutes);
app.use('/report', ReportRoute);