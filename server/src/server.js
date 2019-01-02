// Gimme that .env
require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const book = require("../data/book");
const code = require("../data/code");
const student = require("../data/student");

const app = express();
const router = express.Router();

// Load the database url from the environment
const dbRoute = "mongodb://" + process.env.DB_USERNAME + ":" +
  process.env.DB_PASSWORD + process.env.DB_ROUTE;

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

// log that our server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// append /api to http requests
app.use("/api", router);
