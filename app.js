const express = require("express");
const bodyParser = require("body-parser");
const registrationApp = require("./signup");
const loginApp = require("./login");
// const feedbackApp = require("./contact");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mount the registration app on the root path
app.use("/", registrationApp);

// Mount the login app on a separate path
app.use("/login", loginApp);

//feedback
// app.use("/feedback", feedbackApp);

// Start the server for registration functionality
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
