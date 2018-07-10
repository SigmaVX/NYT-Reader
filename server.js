const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();

// Define Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve Static Assets If Live (e.g. Heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add Database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytreact");

// Define API Routes
app.use(routes);

// Send Every Other Request To React App
// Note - Define Any API Routes Before This Runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start Server Listening
app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
