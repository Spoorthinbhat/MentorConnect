
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./header";

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/schedule"); // Adjust the URL as necessary
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await axios.delete(`http://localhost:5000/schedule/${id}`);
        setClasses(classes.filter((classItem) => classItem._id !== id));
        alert("Class deleted successfully");
      } catch (error) {
        console.error("Error deleting class:", error);
      }
    }
  };

  return (
    <div>
      <Header></Header>
   
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Scheduled Classes</h1>
      <div className="grid grid-cols-1 gap-6">
        {classes.map((classItem) => (
          <div key={classItem._id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{classItem.title}</h2>
            <p className="text-gray-600">{classItem.description}</p>
            <p className="mt-2">
              <strong>Max Participants:</strong> {classItem.maxParticipants}
            </p>
            <p className="mt-2">
              <strong>Booked Seats:</strong> {classItem.bookedSeats || 0}
            </p>
            <h3 className="mt-4 font-medium">Scheduled Time Slots:</h3>
            {classItem.slots.map((slot, index) => (
              <div key={index} className="mt-2">
                <p>{`Date: ${slot.date}`}</p>
                <p>{`Start: ${slot.times[0].startTime}`}</p>
                <p>{` End: ${slot.times[0].endTime}`}</p>
              </div>
            ))}
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleDelete(classItem._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                // Implement your edit functionality here
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ClassesPage;
