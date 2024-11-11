import axios from "axios";
import {
  BookCheck,
  BookMarked,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  GraduationCap,
  Group,
  PlusCircle,
  Radio,
  Save,
  Trash2,
  UserPlus,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { createMeeting } from "../api";
import HeaderMentor from "./HeaderMentor";

// Keeping original classes unchanged
class Slot {
  constructor(date, startTime, endTime, meetingId) {
    this.date = date;
    this.times = [
      {
        startTime: startTime,
        endTime: endTime,
        bookedSeats: 0,
        participants: [],
        meetingId: meetingId,
      },
    ];
  }
}

class ClassSession {
  constructor(title, description, category, type, email, skillLevel, prerequisites, maxParticipants,mentorName) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.type = type;
    this.email = email;
    this.skillLevel = skillLevel;
    this.prerequisites = prerequisites;
    this.maxParticipants = maxParticipants;
    this.slots = [];
    this.name = mentorName;
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
  const [mentorName, setMentorName] = useState("");
  const email = localStorage.getItem("Email");
  // const email = "joe@example.com";
  const [loading, setLoading] = useState(true);  // Add loading state
  // const email = localStorage.getItem("Email");

  useEffect(() => {
    const fetchMentorName = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/name?email=${email}`);
        setMentorName(response.data.name);
        setLoading(false);  // Stop loading once the name is fetched
      } catch (error) {
        console.error("Error fetching mentor name:", error);
        setLoading(false);  // Also stop loading in case of an error
      }
    };

    if (email) fetchMentorName();
  }, [email]);
  // Keeping all handlers unchanged
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

  const addSlot = async () => {
    if (currentSlot.date && currentSlot.startTime && currentSlot.endTime) {
      const meetingId = (await _handleOnCreateMeeting()).meetingId;
      if (!meetingId) throw new Error("Failed to create meeting ID.");

      const slot = new Slot(currentSlot.date, currentSlot.startTime, currentSlot.endTime, meetingId);
      setSlots([...slots, slot]);
      setCurrentSlot({ date: "", startTime: "", endTime: "" });
    }
  };

  const deleteSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const _handleOnCreateMeeting = async () => {
    try {
      return await createMeeting();
    } catch (error) {
      console.error("Error creating meeting:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(mentorName);
    if (loading || !mentorName) {  // Ensure mentorName is available and loading is finished
      console.log("Please wait for mentor name to load.");
      return;
    }
    const newClassSession = new ClassSession(
      classDetails.title,
      classDetails.description,
      classDetails.category,
      classDetails.type,
      email,
      classDetails.skillLevel,
      classDetails.prerequisites,
      classDetails.maxParticipants,
      mentorName
    );

    slots.forEach(slot => newClassSession.addSlot(slot));

    try {
      const response = await axios.post("http://localhost:5000/schedule", newClassSession);
      console.log("Class scheduled successfully:", response.data);

      setClassDetails({
        title: "",
        description: "",
        category: "",
        type: "One-on-One",
        skillLevel: "Beginner",
        prerequisites: "",
        maxParticipants: 1,
      });
      setSlots([]);
    } catch (error) {
      console.error("Error scheduling class:", error);
    }
  };

  return (
    <div>
    <HeaderMentor></HeaderMentor>
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-11">
      <div className="flex items-center justify-center mb-8">
        <GraduationCap className="w-8 h-8 text-blue-500 mr-2" />
        <h1 className="text-3xl font-bold text-gray-800">Schedule a Class</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Class Title */}
        <div className="form-group">
          <label className="flex items-center text-gray-700 font-medium mb-2">
            <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
            Title
          </label>
          <input
            type="text"
            name="title"
            value={classDetails.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter class title"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="flex items-center text-gray-700 font-medium mb-2">
            <FileText className="w-5 h-5 mr-2 text-blue-500" />
            Description
          </label>
          <textarea
            name="description"
            value={classDetails.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief summary of the class"
            rows="4"
          ></textarea>
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="flex items-center text-gray-700 font-medium mb-2">
            <BookMarked className="w-5 h-5 mr-2 text-blue-500" />
            Category/Subject
          </label>
          <input
            type="text"
            name="category"
            value={classDetails.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter category (e.g., Math, Science)"
          />
        </div>

        {/* Skill Level */}
        <div className="form-group">
          <label className="flex items-center text-gray-700 font-medium mb-2">
            <BookCheck className="w-5 h-5 mr-2 text-blue-500" />
            Skill Level
          </label>
          <select
            name="skillLevel"
            value={classDetails.skillLevel}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        {/* Prerequisites */}
        <div className="form-group">
          <label className="flex items-center text-gray-700 font-medium mb-2">
            <GraduationCap className="w-5 h-5 mr-2 text-blue-500" />
            Prerequisites
          </label>
          <input
            type="text"
            name="prerequisites"
            value={classDetails.prerequisites}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter prerequisites (if any)"
          />
        </div>

        {/* Max Participants */}
        <div className="form-group">
          <label className="flex items-center text-gray-700 font-medium mb-2">
            <Users className="w-5 h-5 mr-2 text-blue-500" />
            Max Participants
          </label>
          <input
            type="number"
            name="maxParticipants"
            value={classDetails.maxParticipants}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
          />
        </div>

        {/* Class Type */}
        <div className="form-group">
          <label className="flex items-center text-gray-700 font-medium mb-2">
            <Radio className="w-5 h-5 mr-2 text-blue-500" />
            Class Type
          </label>
          <div className="flex items-center space-x-6 mt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="One-on-One"
                checked={classDetails.type === "One-on-One"}
                onChange={handleChange}
                className="form-radio text-blue-500"
              />
              <span className="flex items-center">
                <UserPlus className="w-4 h-4 mr-1 text-gray-600" />
                One-on-One
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="Group"
                checked={classDetails.type === "Group"}
                onChange={handleChange}
                className="form-radio text-blue-500"
              />
              <span className="flex items-center">
                <Group className="w-4 h-4 mr-1 text-gray-600" />
                Group
              </span>
            </label>
          </div>
        </div>

        {/* Slot Scheduling */}
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-500" />
            Schedule Slots
          </h3>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <input
                type="date"
                name="date"
                value={currentSlot.date}
                onChange={handleSlotChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <input
                type="time"
                name="startTime"
                value={currentSlot.startTime}
                onChange={handleSlotChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <input
                type="time"
                name="endTime"
                value={currentSlot.endTime}
                onChange={handleSlotChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="button"
              onClick={addSlot}
              className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors"
            >
              <PlusCircle className="w-5 h-5 mr-1" />
              Add Slot
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {slots.map((slot, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="space-y-1">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    <strong>Date:</strong> {slot.date}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                    <strong>Time:</strong> {slot.times[0].startTime} - {slot.times[0].endTime}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => deleteSlot(index)}
                  className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg mt-8 transition-colors"
        >
          <Save className="w-5 h-5 mr-2" />
          Schedule Class
        </button>
      </form>
    </div>
    </div>
  );
};

export default MentorScheduleClass;

