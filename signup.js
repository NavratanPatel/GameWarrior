const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Create connection to MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "gamewarrior",
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add this middleware to set the content type for CSS files
app.use("/signup.css", (req, res, next) => {
  res.setHeader("Content-Type", "text/css");
  next();
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Endpoint to handle form submission
app.post("/profile.html", (req, res) => {
  const userData = req.body;
  const sql = "INSERT INTO gameuser SET ?";

  connection.query(sql,userData, (err, result) => {
    if (err) {
      console.error("Error inserting user data:", err);
      res
        .status(500)
        res.sendFile(__dirname + "/signup_error.html");
      return;
    }
    console.log("User signed up successfully");
    res.sendFile(__dirname + "/profile.html");
  });
});

module.exports = app;
