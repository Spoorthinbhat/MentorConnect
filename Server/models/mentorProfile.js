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
  expertise: {
    type: Map, // Using Map to store expertise areas and years of experience
    of: Number, // Each expertise area maps to a number (years of experience)
    required: false,
  },
  educationalBackground: {
    type: [String], // Array of strings for educational qualifications
    required: false,
  },
  mentoringStyle: {
    type: String,
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
    data: Buffer,
    contentType: String,
    required: false,
  },
});

// Create MentorProfile Model
const MentorProfile = mongoose.model("MentorProfile", mentorProfileSchema);

module.exports = MentorProfile;
