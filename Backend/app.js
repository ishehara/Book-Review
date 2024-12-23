const express = require("express");
const cors = require("cors"); // Import CORS
const mongoose = require("mongoose");
const router = require("./Routes/ReviewRoute"); // Import your routes

const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the review routes
app.use("/reviews", router);

// Connect to MongoDB and start the server
mongoose
  .connect("mongodb+srv://Admin:pKuNOxeKUvEBTXtf@bookreview.yyghj.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB:", err));
