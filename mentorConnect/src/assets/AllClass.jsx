import axios from "axios";
import React, { useEffect, useState } from "react";

const StudentScreen = () => {
  const [classes, setClasses] = useState([]);
  const [bookedClasses, setBookedClasses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/schedule");
        const futureClasses = response.data.filter(classItem => {
          const currentDateTime = new Date();
          return classItem.slots.some(slot =>
            slot.times.some(time => new Date(`${slot.date} ${time.startTime}`) > currentDateTime)
          );
        });
        setClasses(futureClasses);
      } catch (error) {
        console.error("Error fetching classes", error);
      }
    };
    fetchClasses();
  }, []);

  const handleBookClass = async (classId, date, startTime) => {
    if (bookedClasses.includes(`${classId}-${date}-${startTime}`)) {
      setMessage("You have already registered for this class.");
      return;
    }
    try {
      await axios.patch(`/api/schedule/${classId}/slots/${date}/${startTime}`);
      setBookedClasses(prev => [...prev, `${classId}-${date}-${startTime}`]);
      setMessage("Registered successfully!");
    } catch (error) {
      setMessage("Booking failed. Please try again.");
      console.error("Error booking class", error);
    }
  };

  const getClassLevelColor = level => {
    switch (level) {
      case "beginner":
        return "bg-green-100 border-green-300 text-green-800";
      case "intermediate":
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "experienced":
        return "bg-red-100 border-red-300 text-red-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl text-center font-bold text-orange-600 mb-4">Available Mentor Classes</h1>
      {message && <p className="text-center text-green-600 font-semibold mb-4">{message}</p>}
      
      <div className="flex flex-wrap justify-center gap-6">
        {classes.map(classItem => (
          <div
            key={classItem._id}
            className={`w-full md:w-1/3 lg:w-1/4 p-4 rounded-lg shadow-lg border ${getClassLevelColor(classItem.skillLevel)} transition-transform transform hover:scale-105`}
          >
            <h2 className="text-xl font-bold mb-2">{classItem.title}</h2>
            <p className="text-gray-700 mb-1">Mentor: {classItem.email}</p>
            <p className="text-gray-700 mb-1">Category: {classItem.category}</p>
            <p className="text-gray-700 mb-1">Level: {classItem.skillLevel}</p>
            <p className="text-gray-700 mb-3">Type: {classItem.type}</p>

            {classItem.slots.map(slot => (
              <div key={`${classItem._id}-${slot.date}`} className="bg-white p-3 rounded-md mb-2">
                <p className="text-gray-800 font-semibold">Date: {slot.date}</p>
                {slot.times.map(time => {
                  const slotTime = new Date(`${slot.date} ${time.startTime}`);
                  const remainingSeats = classItem.maxParticipants - time.bookedSeats;

                  if (slotTime > new Date()) {
                    const isFull = time.bookedSeats >= classItem.maxParticipants;
                    return (
                      <div key={time.startTime} className="flex justify-between items-center mt-2">
                        <div>
                          <p className="text-gray-700">
                            Time: {time.startTime} - {time.endTime}
                          </p>
                          <p className="text-gray-500">Remaining Seats: {remainingSeats}</p>
                        </div>
                        <button
                          className={`px-4 py-2 rounded-full font-bold ${
                            isFull
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : bookedClasses.includes(`${classItem._id}-${slot.date}-${time.startTime}`)
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }`}
                          onClick={() => handleBookClass(classItem._id, slot.date, time.startTime)}
                          disabled={isFull || bookedClasses.includes(`${classItem._id}-${slot.date}-${time.startTime}`)}
                        >
                          {isFull
                            ? "Full"
                            : bookedClasses.includes(`${classItem._id}-${slot.date}-${time.startTime}`)
                            ? "Registered"
                            : "Book Now"}
                        </button>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentScreen;
