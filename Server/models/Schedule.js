const mongoose = require("mongoose");

// Define the slot schema
const slotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  times: [
    {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      bookedSeats: { type: Number, required: true, default: 0 },
      participants: { type: [String], default: [] }, // Array to store participant emails
      meetingId: { type: String, required: true },
    },
  ],
});

// Define the schedule schema
const scheduleSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    type: { type: String, enum: ["One-on-One", "Group"], required: true },
    skillLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Expert"],
      required: true,
    },
    prerequisites: { type: String },
    maxParticipants: { type: Number, default: 1 },
    slots: [slotSchema],
  },
  { timestamps: true }
);

// Create a Mongoose model for the schedule
const Schedule = mongoose.model("Schedule", scheduleSchema);

// Export the model
module.exports = Schedule;
