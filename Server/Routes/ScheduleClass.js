// routes/schedule.js

const express = require("express");
const Schedule = require("../models/Schedule"); // Update with the correct path to your model
const router = express.Router();

// Create a new schedule
router.post("/", async (req, res) => {
  try {
    const newSchedule = new Schedule(req.body);
    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all schedules
router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific schedule by ID
router.get("/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule)
      return res.status(404).json({ message: "Schedule not found" });
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a schedule by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSchedule)
      return res.status(404).json({ message: "Schedule not found" });
    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a schedule by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!deletedSchedule)
      return res.status(404).json({ message: "Schedule not found" });
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update remaining seats for a specific slot
router.patch("/:id/slots/:date/:startTime", async (req, res) => {
  const { id, date, startTime } = req.params;

  try {
    const schedule = await Schedule.findOne({ _id: id, "slots.date": date });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule or slot not found" });
    }

    const slot = schedule.slots.find((slot) => slot.date === date);
    const timeSlot = slot.times.find((time) => time.startTime === startTime);

    // Check if bookedSeats is less than maxParticipants
    if (timeSlot && timeSlot.bookedSeats < schedule.maxParticipants) {
      timeSlot.bookedSeats += 1; // Increment the booked seats
      await schedule.save();
      res.status(200).json({ message: "Remaining seats updated successfully" });
    } else {
      res.status(400).json({ message: "No remaining seats available" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit a specific time slot
router.put("/:id/slots/:date/:startTime", async (req, res) => {
  const { id, date, startTime } = req.params;
  const { endTime, remainingSeats } = req.body;

  try {
    const schedule = await Schedule.findOne({ _id: id, "slots.date": date });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule or slot not found" });
    }

    const slot = schedule.slots.find((slot) => slot.date === date);
    const timeSlot = slot.times.find((time) => time.startTime === startTime);

    if (timeSlot) {
      timeSlot.endTime = endTime; // Update endTime
      timeSlot.remainingSeats = remainingSeats; // Update remainingSeats
      await schedule.save();
      res.status(200).json({ message: "Time slot updated successfully" });
    } else {
      res.status(404).json({ message: "Time slot not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
