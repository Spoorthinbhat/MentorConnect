import axios from "axios"; // Import Axios for making HTTP requests
import React, { useState } from "react";

class Slot {
  constructor(date, startTime, endTime) {
    this.date = date;
    this.times = [
      {
        startTime: startTime,
        endTime: endTime,
        bookedSeats: 0,
      },
    ];
  }
}

class ClassSession {
  constructor(title, description, category, type, email, skillLevel, prerequisites, maxParticipants) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.type = type;
    this.email = email;
    this.skillLevel = skillLevel;
    this.prerequisites = prerequisites;
    this.maxParticipants = maxParticipants;
    this.slots = [];
  }

  addSlot(slot) {
    this.slots.push(slot);
  }
}

const MentorScheduleClass = () => {
  const [classDetails, setClassDetails] = useState({
    title: "",
    description: "",
    category: "",
    type: "One-on-One",
    skillLevel: "Beginner",
    prerequisites: "",
    maxParticipants: 1,
  });
  const [slots, setSlots] = useState([]);
  const [currentSlot, setCurrentSlot] = useState({ date: "", startTime: "", endTime: "" });

//   const email = localStorage.getItem("mentorEmail"); // Get email from local storage
const email = "user@gmail.com";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClassDetails({
      ...classDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSlotChange = (e) => {
    const { name, value } = e.target;
    setCurrentSlot({
      ...currentSlot,
      [name]: value,
    });
  };

  const addSlot = () => {
    if (currentSlot.date && currentSlot.startTime && currentSlot.endTime) {
      const slot = new Slot(currentSlot.date, currentSlot.startTime, currentSlot.endTime);
      setSlots([...slots, slot]);
      setCurrentSlot({ date: "", startTime: "", endTime: "" });
    }
  };

  const deleteSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const newClassSession = new ClassSession(
    classDetails.title,
    classDetails.description,
    classDetails.category,
    classDetails.type,
    email, // Use the email retrieved from local storage
    classDetails.skillLevel,
    classDetails.prerequisites,
    classDetails.maxParticipants
  );

  slots.forEach(slot => newClassSession.addSlot(slot));

  try {
    const response = await axios.post("http://localhost:5000/schedule", newClassSession);
    console.log("Class scheduled successfully:", response.data);

    // Clear the form fields
    setClassDetails({
      title: "",
      description: "",
      category: "",
      type: "One-on-One",
      skillLevel: "Beginner",
      prerequisites: "",
      maxParticipants: 1,
    });
    setSlots([]); // Clear the slots

  } catch (error) {
    console.error("Error scheduling class:", error);
  }
};


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Schedule a Class</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Class Title */}
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={classDetails.title}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
            placeholder="Enter class title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={classDetails.description}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
            placeholder="Brief summary of the class"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium">Category/Subject</label>
          <input
            type="text"
            name="category"
            value={classDetails.category}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
            placeholder="Enter category (e.g., Math, Science)"
          />
        </div>

        {/* Skill Level */}
        <div>
          <label className="block text-gray-700 font-medium">Skill Level</label>
          <select
            name="skillLevel"
            value={classDetails.skillLevel}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        {/* Prerequisites */}
        <div>
          <label className="block text-gray-700 font-medium">Prerequisites</label>
          <input
            type="text"
            name="prerequisites"
            value={classDetails.prerequisites}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
            placeholder="Enter prerequisites (if any)"
          />
        </div>

        {/* Max Participants */}
        <div>
          <label className="block text-gray-700 font-medium">Max Participants</label>
          <input
            type="number"
            name="maxParticipants"
            value={classDetails.maxParticipants}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
            min="1"
          />
        </div>

        {/* Class Type as Radio Buttons */}
        <div>
          <label className="block text-gray-700 font-medium">Class Type</label>
          <div className="flex items-center space-x-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="One-on-One"
                checked={classDetails.type === "One-on-One"}
                onChange={handleChange}
                className="mr-2"
              />
              One-on-One
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="Group"
                checked={classDetails.type === "Group"}
                onChange={handleChange}
                className="mr-2"
              />
              Group
            </label>
          </div>
        </div>

        {/* Slot Scheduling */}
        {classDetails.type === "One-on-One" && (
          <div>
            <h3 className="text-xl font-medium mt-6">Schedule One-on-One Slots</h3>
            <div className="flex items-center space-x-4 mt-2">
              <input
                type="date"
                name="date"
                value={currentSlot.date}
                onChange={handleSlotChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="time"
                name="startTime"
                value={currentSlot.startTime}
                onChange={handleSlotChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="time"
                name="endTime"
                value={currentSlot.endTime}
                onChange={handleSlotChange}
                className="p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={addSlot}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Add Slot
              </button>
            </div>
            <div className="mt-4">
              {slots.map((slot, index) => (
                <div key={index} className="flex items-center justify-between mt-2">
                  <span>{`Date: ${slot.date}, Start: ${slot.times[0].startTime}, End: ${slot.times[0].endTime}`}</span>
                  <button
                    type="button"
                    onClick={() => deleteSlot(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Schedule Class
        </button>
      </form>
    </div>
  );
};

export default MentorScheduleClass;
