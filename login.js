const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const fs = require("fs");
const loginApp = express();
const port = 3001; // You can use a different port for the login functionality

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
loginApp.use(bodyParser.urlencoded({ extended: false }));
loginApp.use(bodyParser.json());

// Add this middleware to set the content type for CSS files
loginApp.use("/login.css", (req, res, next) => {
  res.setHeader("Content-Type", "text/css");
  next();
});

// Serve static files from the current directory
loginApp.use(express.static(__dirname));

// Endpoint to handle login
loginApp.post("/profile.html", (req, res) => {
  const { emailid, passwd } = req.body;
  const sql = "SELECT * FROM gameuser WHERE emailid = ? AND passwd = ?";

  connection.query(sql, [emailid, passwd], (err, result) => {
    if (err) {
      console.error("Error during login:", err);
      res
        .status(500)
        .send("An error occurred while logging in. Please try again later.");
      return;
    }

    if (result.length > 0) {
      console.log("User logged in successfully");
      fs.readFile(__dirname + "/profile.html", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading profile HTML file:", err);
            res.status(500).send("An error occurred while reading the profile HTML file.");
            return;
        }

        // Inject the user data into the HTML file
        const html = data.replace("<%= fullName %>", result[0].fullname)
                         .replace("<%= fullName %>", result[0].fullname)
                         .replace("<%= username %>", result[0].username)
                         .replace("<%= emailid %>", result[0].emailid)
                         .replace("<%= mno %>", result[0].mno)
                         .replace("<%= favgame %>", result[0].favgame);

        // Send the modified HTML file as a response
        res.send(html);
    });

      // You can redirect the user to their profile page or send a success message
      //   res.send("Login successful!");
      // res.sendFile(__dirname + "/profile.html");
      // Render the profile page with user data
      // res.render("profile.html", result[0]);
    } else {
      console.log("User not found");
      res.status(404);
      res.sendFile(__dirname + "/login_error.html");
      //.send("User not found. Please check your email and password.");
    }
  });
});

loginApp.listen(port, () => {
  console.log(`Login server running at http://localhost:${port}`);
});

module.exports = loginApp;