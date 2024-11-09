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
  console.log("Incoming request:", req.params, req.body);
  const { id, date, startTime } = req.params;
  const { email } = req.body; // Retrieve email from request body

  try {
    // Find the schedule by ID and date
    const schedule = await Schedule.findOne({ _id: id, "slots.date": date });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Locate the specific slot by date
    const slot = schedule.slots.find((slot) => slot.date === date);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found for this date" });
    }

    // Locate the specific time slot by start time
    const timeSlot = slot.times.find((time) => time.startTime === startTime);
    if (!timeSlot) {
      return res.status(404).json({ message: "Time slot not found" });
    }

    // Check if there are seats available and if email is not already registered
    if (timeSlot.bookedSeats < schedule.maxParticipants) {
      if (!timeSlot.participants.includes(email)) {
        // Add participant and increment bookedSeats
        timeSlot.bookedSeats += 1;
        timeSlot.participants.push(email);

        await schedule.save();
        res.status(200).json({ message: "Participant added successfully" });
      } else {
        res
          .status(400)
          .json({ message: "Email is already registered for this slot" });
      }
    } else {
      res.status(400).json({ message: "No remaining seats available" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
router.get("/api/registered-classes", async (req, res) => {
  const { email } = req.query; // Get the student email from the query parameter

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Query for all schedules where the student's email is in the participants array within the times array
    const registeredClasses = await Schedule.find({
      "slots.times.participants": email, // Check if the student's email is in the participants array directly
    }).select("title description category type skillLevel slots"); // Only select relevant fields

    if (registeredClasses.length === 0) {
      return res
        .status(404)
        .json({ message: "No classes found for this student" });
    }

    // Map through the classes and filter relevant slots
    const result = registeredClasses.map((course) => {
      const relevantSlots = course.slots
        .map((slot) => {
          // Filter the times array to only include slots with the given participant email
          const filteredTimes = slot.times.filter(
            (time) => time.participants.includes(email) // Check if the student is in this time slot
          );

          return filteredTimes.length > 0
            ? { date: slot.date, times: filteredTimes }
            : null;
        })
        .filter((slot) => slot !== null); // Filter out any null values

      return {
        title: course.title,
        description: course.description,
        category: course.category,
        type: course.type,
        skillLevel: course.skillLevel,
        slots: relevantSlots,
      };
    });

    res.status(200).json(result); // Return the list of registered classes
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Export the router
module.exports = router;
