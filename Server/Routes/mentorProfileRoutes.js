const express = require("express");
const MentorProfile = require("../models/mentorProfile");

const router = express.Router();

// Upload a new mentor profile
router.post("/upload", async (req, res) => {
  try {
    console.log("Received body:", req.body); // Log the incoming request
    const mentorProfile = new MentorProfile(req.body);
    await mentorProfile.save();
    res.status(201).json({
      message: "Mentor profile created successfully",
      profile: mentorProfile,
    });
  } catch (error) {
    console.error("Error creating mentor profile:", error);
    res.status(400).json({ message: "Error creating mentor profile", error });
  }
});

// Update an existing mentor profile
router.put("/update/:id", async (req, res) => {
  const { name, email, mentoringGoals, imageBase64 } = req.body;

  // Validate input data
  if (!name || !email || !mentoringGoals) {
    return res
      .status(400)
      .json({ error: "Name, email, and mentoring goals are required" });
  }

  try {
    const updatedProfile = await MentorProfile.findByIdAndUpdate(
      req.params.id,
      { name, email, mentoringGoals, image: imageBase64 },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }

    res.status(200).json({
      message: "Mentor profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating mentor profile:", error); // Log the error for debugging
    res.status(500).json({ error: "Error updating mentor profile" });
  }
});

// Retrieve a mentor profile by ID
router.get("/:id", async (req, res) => {
  try {
    const mentorProfile = await MentorProfile.findById(req.params.id);
    if (!mentorProfile) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }
    res.status(200).json(mentorProfile);
  } catch (error) {
    console.error("Error retrieving mentor profile:", error); // Log the error for debugging
    res.status(500).json({ error: "Error retrieving mentor profile" });
  }
});

module.exports = router;
