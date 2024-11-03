const mongoose = require("mongoose");

// Define MentorProfile Schema
const mentorProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  professionalTitles: [
    {
      expertise: { type: String, required: true },
      years: { type: String, required: true },
    },
  ],
  educationalBackground: {
    type: [String], // Array of strings for educational qualifications
    required: false,
  },
  mentoringStyle: {
    type: [String], // Change to array of strings to allow multiple selections
    required: false,
  },
  availability: {
    type: String,
    required: false,
  },
  languagesSpoken: {
    type: [String], // Array of languages
    required: false,
  },
  pastMentoringExperience: {
    type: String,
    required: false,
  },
  mentoringGoals: {
    type: String,
    required: true,
  },
  linkedInLink: {
    type: String,
    required: false,
  },
  blogLink: {
    type: String,
    required: false,
  },
  image: {
    type: String, // Store the image as a Base64 string
    required: false,
  },
});

// Create MentorProfile Model
const MentorProfile = mongoose.model("MentorProfile", mentorProfileSchema);

module.exports = MentorProfile;
