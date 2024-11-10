
import axios from 'axios';
import { BookOpen, Calendar, CalendarCheck, ChevronRight, Clock, GraduationCap, History, User, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClassScheduleCards = () => {
  const navigate = useNavigate();

  const [showPastClasses, setShowPastClasses] = useState(false);
  const [classesData,setClassData]=useState([]);
  const [isJoining, setIsJoining] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState({});
    useEffect(() => {
    const fetchClasses = async () => {
      try {
        const email = localStorage.getItem("Email"); // Retrieve email from local storage
        if (!email) {
          console.error("No email found in local storage.");
          return;
        }
        console.log(email);
        const response = await axios.get(`http://localhost:5000/schedule/by-email?email=${email}`);
        console.log(response.data);
        setClassData(response.data); // Set classes as an array
      } catch (error) {
        console.error("Error fetching classes by email:", error);
      }
    };
  
    fetchClasses();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAvailableSeats = (classItem, timeSlot) => {
    return classItem.maxParticipants - timeSlot.bookedSeats;
  };

  const isDatePast = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateStr);
    return date < today;
  };

  const getUserNameByEmail = async (email) => {
    try {
      if (!email) {
        throw new Error("Email parameter is required");
      }
  
      const response = await axios.get('http://localhost:5000/auth/name', {
        params: { email }
      });
  
      if (response.status === 200) {
        console.log("User name retrieved successfully:", response.data.name);
        return response.data.name;
      } else {
        console.error("Failed to retrieve user name:", response.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user name by email:", error.message);
      return null;
    }
  };

  // Filter classes based on their dates
  const filterClasses = (classes) => {
    return classes.map(classItem => ({
      ...classItem,
      slots: classItem.slots.filter(slot => {
        const isPast = isDatePast(slot.date);
        return showPastClasses ? isPast : !isPast;
      })
    })).filter(classItem => classItem.slots.length > 0);
  };

  const handleJoin = async (classId, slotId, timeId, meetingId) => {
    console.log('Joining class:', classId, 'slot:', slotId, 'time:', timeId,'Meeting ID:',meetingId);
    const email = localStorage.getItem("Email"); 
    const attendeeName = await getUserNameByEmail(email);  // Replace with actual logic to get the attendee's name
    console.log(attendeeName);
    setMeetingDetails({ meetingId, attendeeName });

    if (attendeeName) {
      setMeetingDetails({ meetingId, attendeeName });
      
      navigate('/join', {
        state: { meetingId, attendeeName },
      });
    } else {
      console.error("Could not retrieve the attendee name.");
    }
  };

  const filteredClasses = filterClasses(classesData);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8 px-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {showPastClasses ? 'Class History' : 'Available Classes'}
          </h1>
          <button
            onClick={() => setShowPastClasses(!showPastClasses)}
            className="flex items-center px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 text-gray-700 border border-gray-200"
          >
            {showPastClasses ? (
              <>
                <CalendarCheck className="w-5 h-5 mr-2" />
                View Available Classes
              </>
            ) : (
              <>
                <History className="w-5 h-5 mr-2" />
                View Class History
              </>
            )}
          </button>
        </div>

        {filteredClasses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {showPastClasses 
                ? "No class history found" 
                : "No upcoming classes available"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {filteredClasses.map((classItem) => (
              <div key={classItem._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                {/* Card Header */}
                <div className="p-6 border-b">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                      ${classItem.type === 'Group' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                      {classItem.type}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {classItem.skillLevel}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{classItem.title}</h3>
                  <p className="text-gray-600 text-sm">{classItem.description}</p>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-grow">
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <BookOpen className="w-5 h-5 mr-2" />
                      <span>Category: {classItem.category}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      <span>Prerequisites: {classItem.prerequisites || 'None'}</span>
                    </div>

                    {/* Time Slots */}
                    <div className="mt-4 space-y-3">
                      <h4 className="font-semibold text-gray-900">
                        {showPastClasses ? 'Past Sessions:' : 'Upcoming Sessions:'}
                      </h4>
                      {classItem.slots.map((slot) => (
                        <div key={slot._id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                            <span className="text-gray-700 font-medium">{formatDate(slot.date)}</span>
                          </div>
                          {slot.times.map((time) => (
                            <div key={time._id} className="border-t border-gray-200 pt-3 mt-3 first:border-0 first:pt-0 first:mt-0">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-2 text-gray-600" />
                                  <span className="text-gray-700">
                                    {time.startTime} - {time.endTime}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-2 text-gray-600" />
                                  <span className="text-sm text-gray-600">
                                    {getAvailableSeats(classItem, time)} seats remaining
                                  </span>
                                </div>
                                {!showPastClasses && (
                                  <button
                                    onClick={() => handleJoin(classItem._id, slot._id, time._id,time.meetingId)}
                                    className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 flex items-center"
                                  >
                                    Join
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span>Instructor: {classItem.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassScheduleCards;

// import axios from 'axios';
// import { BookOpen, Calendar, Clock, GraduationCap, History, Users } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import VideoApp from '../JoinScreen'; // Assuming VideoApp is in the same folder

// const ClassScheduleCards = () => {
//   const [showPastClasses, setShowPastClasses] = useState(false);
//   const [classesData, setClassData] = useState([]);
//   const [isJoining, setIsJoining] = useState(false);  // State to control joining
//   const [meetingDetails, setMeetingDetails] = useState({});  // State for meeting details

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const email = localStorage.getItem("Email"); // Retrieve email from local storage
//         if (!email) {
//           console.error("No email found in local storage.");
//           return;
//         }
//         const response = await axios.get(`http://localhost:5000/schedule/by-email?email=${email}`);
//         setClassData(response.data); // Set classes as an array
//       } catch (error) {
//         console.error("Error fetching classes by email:", error);
//       }
//     };

//     fetchClasses();
//   }, []);

//   const formatDate = (dateStr) => {
//     return new Date(dateStr).toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   const getAvailableSeats = (classItem, timeSlot) => {
//     return classItem.maxParticipants - timeSlot.bookedSeats;
//   };

//   const isDatePast = (dateStr) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const date = new Date(dateStr);
//     return date < today;
//   };

//   // Filter classes based on their dates
//   const filterClasses = (classes) => {
//     return classes.map(classItem => ({
//       ...classItem,
//       slots: classItem.slots.filter(slot => {
//         const isPast = isDatePast(slot.date);
//         return showPastClasses ? isPast : !isPast;
//       })
//     })).filter(classItem => classItem.slots.length > 0);
//   };

//   const handleJoin = (classId, slotId, timeId, meetingId) => {
//     console.log(meetingId);
//     // Assuming you have some logic to retrieve the attendee's name
//     const attendeeName = "John Doe";  // Replace with actual logic to get the attendee's name
//     setMeetingDetails({ meetingId, attendeeName });
//     setIsJoining(true); // Set to true to trigger VideoApp rendering
//   };

//   const filteredClasses = filterClasses(classesData);

//   return isJoining ? (
//     // Conditionally render VideoApp when isJoining is true
//     <VideoApp initialMeetingId={meetingDetails.meetingId} attendeeName={meetingDetails.attendeeName} />
//   ) : (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="container mx-auto py-8">
//         <div className="flex justify-between items-center mb-8 px-6">
//           <h1 className="text-3xl font-bold text-gray-900">
//             {showPastClasses ? 'Class History' : 'Available Classes'}
//           </h1>
//           <button
//             onClick={() => setShowPastClasses(!showPastClasses)}
//             className="flex items-center px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 text-gray-700 border border-gray-200"
//           >
//             {showPastClasses ? (
//               <>
//                 <CalendarCheck className="w-5 h-5 mr-2" />
//                 View Available Classes
//               </>
//             ) : (
//               <>
//                 <History className="w-5 h-5 mr-2" />
//                 View Class History
//               </>
//             )}
//           </button>
//         </div>

//         {filteredClasses.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">
//               {showPastClasses 
//                 ? "No class history found" 
//                 : "No upcoming classes available"}
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
//             {filteredClasses.map((classItem) => (
//               <div key={classItem._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
//                 {/* Card Header */}
//                 <div className="p-6 border-b">
//                   <div className="flex justify-between items-start mb-4">
//                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
//                       ${classItem.type === 'Group' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
//                       {classItem.type}
//                     </span>
//                     <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                       {classItem.skillLevel}
//                     </span>
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">{classItem.title}</h3>
//                   <p className="text-gray-600 text-sm">{classItem.description}</p>
//                 </div>

//                 {/* Card Content */}
//                 <div className="p-6 flex-grow">
//                   <div className="space-y-4">
//                     <div className="flex items-center text-gray-700">
//                       <BookOpen className="w-5 h-5 mr-2" />
//                       <span>Category: {classItem.category}</span>
//                     </div>
//                     <div className="flex items-center text-gray-700">
//                       <GraduationCap className="w-5 h-5 mr-2" />
//                       <span>Prerequisites: {classItem.prerequisites || 'None'}</span>
//                     </div>

//                     {/* Time Slots */}
//                     <div className="mt-4 space-y-3">
//                       <h4 className="font-semibold text-gray-900">
//                         {showPastClasses ? 'Past Sessions:' : 'Upcoming Sessions:'}
//                       </h4>
//                       {classItem.slots.map((slot) => (
//                         <div key={slot._id} className="bg-gray-50 rounded-lg p-4">
//                           <div className="flex items-center mb-3">
//                             <Calendar className="w-5 h-5 mr-2 text-gray-600" />
//                             <span className="text-gray-700 font-medium">{formatDate(slot.date)}</span>
//                           </div>
//                           {slot.times.map((time) => (
//                             <div key={time._id} className="border-t border-gray-200 pt-3 mt-3 first:border-0 first:pt-0 first:mt-0">
//                               <div className="flex items-center justify-between mb-2">
//                                 <div className="flex items-center">
//                                   <Clock className="w-4 h-4 mr-2 text-gray-600" />
//                                   <span className="text-gray-700">
//                                     {time.startTime} - {time.endTime}
//                                   </span>
//                                 </div>
//                               </div>
//                               <div className="flex items-center justify-between">
//                                 <div className="flex items-center">
//                                   <Users className="w-4 h-4 mr-2 text-gray-600" />
//                                   <span className="text-sm text-gray-600">
//                                     {getAvailableSeats(classItem, time)} seats remaining
//                                   </span>
//                                 </div>
//                                 {!showPastClasses && (
//                                   <button
//                                     onClick={() => handleJoin(classItem._id, slot._id, time._id, time.meetingId)}
//                                     className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
//                                   >
//                                     Join
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClassScheduleCards;
