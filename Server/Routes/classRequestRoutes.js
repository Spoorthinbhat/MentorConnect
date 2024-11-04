const express = require("express");
const router = express.Router();
const ClassRequest = require("../models/ClassRequest"); // Import the ClassRequest model

// POST route to create a new class request
router.post("/class-request", async (req, res) => {
  const {
    studentEmail,
    mentorEmail,
    title,
    description,
    subject,
    timeSlot,
    language,
    duration,
    level,
  } = req.body;

  // Check if all required fields are provided
  if (
    !studentEmail ||
    !mentorEmail ||
    !title ||
    !description ||
    !subject ||
    !timeSlot ||
    !language ||
    !duration ||
    !level
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new class request instance
    const newClassRequest = new ClassRequest({
      studentEmail,
      mentorEmail,
      title,
      description,
      subject,
      timeSlot,
      language,
      duration,
      level,
    });

    // Save the class request to the database
    await newClassRequest.save();
    res.status(201).json({
      message: "Class request created successfully",
      classRequest: newClassRequest,
    });
  } catch (error) {
    console.error("Error creating class request:", error);
    res.status(500).json({ error: "Failed to create class request" });
  }
});

// GET route to retrieve class requests by mentor email
router.get("/class-request/mentor/:mentorEmail", async (req, res) => {
  const { mentorEmail } = req.params;

  try {
    // Find all class requests where mentorEmail matches the provided email
    const classRequests = await ClassRequest.find({ mentorEmail });

    if (classRequests.length > 0) {
      res.status(200).json(classRequests);
    } else {
      res.status(404).json({
        message: "No class requests found for the provided mentor email",
      });
    }
  } catch (error) {
    console.error("Error retrieving class requests:", error);
    res.status(500).json({ error: "Failed to retrieve class requests" });
  }
});

module.exports = router;
