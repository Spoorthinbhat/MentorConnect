// const express = require("express");
// const MentorProfile = require("../models/mentorProfile");

// const router = express.Router();

// // Create a new mentor profile
// router.post("/", async (req, res) => {
//   try {
//     const mentorProfile = new MentorProfile(req.body);
//     await mentorProfile.save();
//     res.status(201).send(mentorProfile);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // Get all mentor profiles
// router.get("/", async (req, res) => {
//   try {
//     const mentorProfiles = await MentorProfile.find();
//     res.send(mentorProfiles);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Get a mentor profile by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const mentorProfile = await MentorProfile.findById(req.params.id);
//     if (!mentorProfile) {
//       return res.status(404).send();
//     }
//     res.send(mentorProfile);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Update a mentor profile by ID
// router.patch("/:id", async (req, res) => {
//   try {
//     const mentorProfile = await MentorProfile.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!mentorProfile) {
//       return res.status(404).send();
//     }
//     res.send(mentorProfile);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // Delete a mentor profile by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const mentorProfile = await MentorProfile.findByIdAndDelete(req.params.id);
//     if (!mentorProfile) {
//       return res.status(404).send();
//     }
//     res.send(mentorProfile);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// module.exports = router;
