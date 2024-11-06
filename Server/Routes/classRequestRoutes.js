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
router.get("/", async (req, res) => {
  const { email } = req.query; // Expect email as a query parameter

  try {
    // Find ClassRequests where studentEmail or mentorEmail matches the provided email
    const classRequests = await ClassRequest.find({
      $or: [{ studentEmail: email }, { mentorEmail: email }],
    });

    // Return the found ClassRequests
    res.status(200).json(classRequests);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { status, scheduledDate, startTime, endTime, meetingId } = req.body;

  // Initialize an object to hold the fields to be updated
  const updateFields = {};

  // Check the status and update fields accordingly
  if (status === "rejected") {
    updateFields.status = status;
  } else if (status === "accepted") {
    updateFields.status = status;

    // Conditionally add fields to updateFields if they are provided
    if (scheduledDate !== undefined) {
      updateFields.scheduledDate = scheduledDate;
    }
    if (startTime !== undefined) {
      updateFields.startTime = startTime;
    }
    if (endTime !== undefined) {
      updateFields.endTime = endTime;
    }
    if (meetingId !== undefined) {
      updateFields.meetingId = meetingId;
      console.log("Meeting ID is being set to:", meetingId); // Log meetingId
    }
  }

  console.log("Update Fields:", updateFields); // Log updateFields to confirm structure

  try {
    // Find the ClassRequest by ID and update the fields
    const updatedClassRequest = await ClassRequest.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true } // return the updated document without runValidators for testing
    );

    // If the ClassRequest was not found, return a 404 error
    if (!updatedClassRequest) {
      return res.status(404).json({ message: "ClassRequest not found" });
    }

    // Return the updated ClassRequest
    res.status(200).json(updatedClassRequest);
  } catch (error) {
    console.error("Error updating ClassRequest:", error); // Detailed error logging
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
