// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/your_database_name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  // Add other fields as needed
});

const User = mongoose.model("User", userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/createProfile.html");
});

// Handle user registration
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const newUser = new User({
      username,
      email,
      password, // Note: In a real-world application, you should hash the password before storing it.
      // Add other fields as needed
    });

    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
