// app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const authRoutes = require("./Routes/auth.js"); // Update with your actual path
const ScheduleRoutes = require("./Routes/ScheduleClass.js"); // Update with your actual path
const mentorRoutes = require("./Routes/mentorProfileRoutes");
const classRequestRoutes = require("./Routes/classRequestRoutes");
// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// MongoDB connection URI
const uri =
  "mongodb+srv://spu:pass@cluster0.cvotq.mongodb.net/mentor?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Routes
app.use("/auth", authRoutes);
app.use("/schedule", ScheduleRoutes);
app.use("/mentors", mentorRoutes); // Register the Schedule router
app.use("/request", classRequestRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
