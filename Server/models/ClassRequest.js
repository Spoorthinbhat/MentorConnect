// models/ClassRequest.js
const mongoose = require("mongoose");

const classRequestSchema = new mongoose.Schema({
  studentEmail: { type: String, required: true },
  mentorEmail: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  timeSlot: { type: String, required: true },
  language: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "rejected", "accepted"],
    default: "pending",
    required: false,
  },
  scheduledDate: { type: Date, required: false },
  startTime: { type: String, required: false, default: "Null" }, // Format: "HH:mm"
  endTime: { type: String, required: false, default: "Null" }, // Format: "HH:mm"
});

module.exports = mongoose.model("ClassRequest", classRequestSchema);
