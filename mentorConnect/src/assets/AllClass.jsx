// // import axios from "axios";
// // import React, { useEffect, useState } from "react";

// // const StudentScreen = () => {
// //   const [classes, setClasses] = useState([]);
// //   const [bookedClasses, setBookedClasses] = useState([]);
// //   const [message, setMessage] = useState("");

// //   useEffect(() => {
// //     const fetchClasses = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:5000/schedule");
// //         const futureClasses = response.data.filter(classItem => {
// //           const currentDateTime = new Date();
// //           return classItem.slots.some(slot =>
// //             slot.times.some(time => new Date(`${slot.date} ${time.startTime}`) > currentDateTime)
// //           );
// //         });
// //         setClasses(futureClasses);
// //       } catch (error) {
// //         console.error("Error fetching classes", error);
// //       }
// //     };
// //     fetchClasses();
// //   }, []);

// //   const handleBookClass = async (classId, date, startTime) => {
// //     if (bookedClasses.includes(`${classId}-${date}-${startTime}`)) {
// //       setMessage("You have already registered for this class.");
// //       return;
// //     }
// //     try {
// //       await axios.patch(`/api/schedule/${classId}/slots/${date}/${startTime}`);
// //       setBookedClasses(prev => [...prev, `${classId}-${date}-${startTime}`]);
// //       setMessage("Registered successfully!");
// //     } catch (error) {
// //       setMessage("Booking failed. Please try again.");
// //       console.error("Error booking class", error);
// //     }
// //   };

// //   const getClassLevelColor = level => {
// //     switch (level) {
// //       case "Beginner":
// //         return "bg-green-100 border-green-300 text-green-800";
// //       case "Intermediate":
// //         return "bg-yellow-100 border-yellow-300 text-yellow-800";
// //       case "Expert":
// //         return "bg-red-100 border-red-300 text-red-800";
// //       default:
// //         return "bg-gray-100 border-gray-300 text-gray-800";
// //     }
// //   };

// //   return (
// //     <div className="p-6 bg-blue-50 min-h-screen">
// //       <h1 className="text-3xl text-center font-bold text-orange-600 mb-4">Available Mentor Classes</h1>
// //       {message && <p className="text-center text-green-600 font-semibold mb-4">{message}</p>}
      
// //       <div className="flex flex-wrap justify-center gap-6">
// //         {classes.map(classItem => (
// //           <div
// //             key={classItem._id}
// //             className={`w-full md:w-1/3 lg:w-1/4 p-4 rounded-lg shadow-lg border ${getClassLevelColor(classItem.skillLevel)} transition-transform transform hover:scale-105`}
// //           >
// //             <h2 className="text-xl font-bold mb-2">{classItem.title}</h2>
// //             <p className="text-gray-700 mb-1">Mentor: {classItem.email}</p>
// //             <p className="text-gray-700 mb-1">Category: {classItem.category}</p>
// //             <p className="text-gray-700 mb-1">Level: {classItem.skillLevel}</p>
// //             <p className="text-gray-700 mb-3">Type: {classItem.type}</p>

// //             {classItem.slots.map(slot => (
// //               <div key={`${classItem._id}-${slot.date}`} className="bg-white p-3 rounded-md mb-2">
// //                 <p className="text-gray-800 font-semibold">Date: {slot.date}</p>
// //                 {slot.times.map(time => {
// //                   const slotTime = new Date(`${slot.date} ${time.startTime}`);
// //                   const BookedSeats = classItem.maxParticipants - time.bookedSeats; // Remaining seats

// //                   if (slotTime > new Date()) {
// //                     const isFull = time.bookedSeats >= classItem.maxParticipants; // Check if full
// //                     return (
// //                       <div key={time.startTime} className="flex justify-between items-center mt-2">
// //                         <div>
// //                           <p className="text-gray-700">
// //                             Time: {time.startTime} - {time.endTime}
// //                           </p>
// //                           <p className="text-gray-500">Remaining Seats: {BookedSeats}</p> {/* Show remaining seats */}
// //                         </div>
// //                         <button
// //                           className={`px-4 py-2 rounded-full font-bold ${
// //                             isFull || bookedClasses.includes(`${classItem._id}-${slot.date}-${time.startTime}`)
// //                               ? "bg-gray-400 text-white cursor-not-allowed"
// //                               : "bg-red-500 hover:bg-red-600 text-white"
// //                           }`}
// //                           onClick={() => handleBookClass(classItem._id, slot.date, time.startTime)}
// //                           disabled={isFull || bookedClasses.includes(`${classItem._id}-${slot.date}-${time.startTime}`)}
// //                         >
// //                           {isFull
// //                             ? "Full"
// //                             : bookedClasses.includes(`${classItem._id}-${slot.date}-${time.startTime}`)
// //                             ? "Registered"
// //                             : "Book Now"}
// //                         </button>
// //                       </div>
// //                     );
// //                   }
// //                   return null;
// //                 })}
// //               </div>
// //             ))}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default StudentScreen;
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const StudentScreen = () => {
//   const [classes, setClasses] = useState([]);
//   const [bookedClasses, setBookedClasses] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/schedule");
//         const futureClasses = response.data.filter(classItem => {
//           const currentDateTime = new Date();
//           return classItem.slots.some(slot =>
//             slot.times.some(time => new Date(`${slot.date} ${time.startTime}`) > currentDateTime)
//           );
//         });
//         setClasses(futureClasses);
//       } catch (error) {
//         console.error("Error fetching classes", error);
//       }
//     };
//     fetchClasses();
//   }, []);

//   const handleBookClass = async (classId, date, startTime) => {
//     if (bookedClasses.includes(`${classId}-${date}-${startTime}`)) {
//       setMessage("You have already registered for this class.");
//       return;
//     }
//     try {
//       const response = await axios.patch(`http://localhost:5000/schedule/${classId}/slots/${date}/${startTime}`);
//       if (response.status === 200) {
//         setBookedClasses(prev => [...prev, `${classId}-${date}-${startTime}`]);
//         setMessage("Registered successfully!");
//       }
//     } catch (error) {
//       setMessage("Booking failed. Please try again.");
//       console.error("Error booking class", error);
//     }
//   };

//   const getClassLevelColor = level => {
//     switch (level) {
//       case "Beginner":
//         return "bg-green-100 border-green-300 text-green-800";
//       case "Intermediate":
//         return "bg-yellow-100 border-yellow-300 text-yellow-800";
//       case "Expert":
//         return "bg-red-100 border-red-300 text-red-800";
//       default:
//         return "bg-gray-100 border-gray-300 text-gray-800";
//     }
//   };

//   return (
//     <div className="p-6 bg-blue-50 min-h-screen">
//       <h1 className="text-3xl text-center font-bold text-orange-600 mb-4">Available Mentor Classes</h1>
//       {message && <p className="text-center text-green-600 font-semibold mb-4">{message}</p>}
      
//       <div className="flex flex-wrap justify-center gap-6">
//         {classes.map(classItem => (
//           <div
//             key={classItem._id}
//             className={`w-full md:w-1/3 lg:w-1/4 p-4 rounded-lg shadow-lg border ${getClassLevelColor(classItem.skillLevel)} transition-transform transform hover:scale-105`}
//           >
//             <h2 className="text-xl font-bold mb-2">{classItem.title}</h2>
//             <p className="text-gray-700 mb-1">Mentor: {classItem.email}</p>
//             <p className="text-gray-700 mb-1">Category: {classItem.category}</p>
//             <p className="text-gray-700 mb-1">Level: {classItem.skillLevel}</p>
//             <p className="text-gray-700 mb-3">Type: {classItem.type}</p>

//             {classItem.slots.map(slot => (
//               <div key={`${classItem._id}-${slot.date}`} className="bg-white p-3 rounded-md mb-2">
//                 <p className="text-gray-800 font-semibold">Date: {slot.date}</p>
//                 {slot.times.map(time => {
//                   const slotTime = new Date(`${slot.date} ${time.startTime}`);
//                   const BookedSeats = classItem.maxParticipants - time.bookedSeats; // Remaining seats

//                   if (slotTime > new Date()) {
//                     const isFull = time.bookedSeats >= classItem.maxParticipants; // Check if full
//                     return (
//                       <div key={time.startTime} className="flex justify-between items-center mt-2">
//                         <div>
//                           <p className="text-gray-700">
//                             Time: {time.startTime} - {time.endTime}
//                           </p>
//                           <p className="text-gray-500">Remaining Seats: {BookedSeats}</p> {/* Show remaining seats */}
//                         </div>
//                         <button
//                           className={`px-4 py-2 rounded-full font-bold ${
//                             isFull || bookedClasses.includes(`${classItem._id}-${slot.date}-${time.startTime}`)
//                               ? "bg-gray-400 text-white cursor-not-allowed"
//                               : "bg-red-500 hover:bg-red-600 text-white"
//                           }`}
//                           onClick={() => handleBookClass(classItem._id, slot.date, time.startTime)}
//                           disabled={isFull || bookedClasses.includes(`${classItem._id}-${slot.date}-${time.startTime}`)}
//                         >
//                           {isFull
//                             ? "Full"
//                             : bookedClasses.includes(`${classItem._id}-${slot.date}-${time.startTime}`)
//                             ? "Registered"
//                             : "Book Now"}
//                         </button>
//                       </div>
//                     );
//                   }
//                   return null;
//                 })}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentScreen;
// import axios from 'axios';
// import {
//   Book,
//   Calendar,
//   CheckCircle,
//   Clock,
//   Loader2,
//   Mail,
//   Sparkles,
//   Star,
//   Tag,
//   Users,
//   Video,
//   XCircle
// } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import Header from './header';

// const StudentScreen = () => {
//   const [classes, setClasses] = useState([]);
//   const [bookedClasses, setBookedClasses] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/schedule");
//         const futureClasses = response.data.filter(classItem => {
//           const currentDateTime = new Date();
//           return classItem.slots.some(slot =>
//             slot.times.some(time => new Date(`${slot.date} ${time.startTime}`) > currentDateTime)
//           );
//         });
//         setClasses(futureClasses);
//       } catch (error) {
//         console.error("Error fetching classes", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchClasses();
//   }, []);

//   const handleBookClass = async (classId, date, startTime) => {
//     if (bookedClasses.includes(`${classId}-${date}-${startTime}`)) {
//       setMessage("You have already registered for this class.");
//       return;
//     }
  
//     // Retrieve email from local storage
//     const email = localStorage.getItem("Email");
//   console.log(email);
//     try {
//       const response = await axios.patch(
//         `http://localhost:5000/schedule/${classId}/slots/${date}/${startTime}`,
//         { email } // Pass email in the request body
//       );
  
//       if (response.status === 200) {
//         setBookedClasses(prev => [...prev, `${classId}-${date}-${startTime}`]);
//         setMessage("Registered successfully!");
//       }
//     } catch (error) {
//       setMessage("Booking failed. Please try again.");
//       console.error("Error booking class", error);
//     }
//   };
  

//   const getClassLevelColor = level => {
//     switch (level) {
//       case "Beginner":
//         return "bg-gradient-to-br from-green-400 to-emerald-500 text-white";
//       case "Intermediate":
//         return "bg-gradient-to-br from-purple-400 to-indigo-500 text-white";
//       case "Expert":
//         return "bg-gradient-to-br from-red-400 to-rose-500 text-white";
//       default:
//         return "bg-gradient-to-br from-gray-400 to-gray-500 text-white";
//     }
//   };

//   const getLevelAccent = level => {
//     switch (level) {
//       case "Beginner":
//         return "text-emerald-400";
//       case "Intermediate":
//         return "text-purple-400";
//       case "Expert":
//         return "text-rose-400";
//       default:
//         return "text-gray-400";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
//         <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Header></Header>
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2 flex items-center justify-center gap-2">
//             <Book className="w-8 h-8 text-purple-600" />
//             Available Mentor Classes
//           </h1>
//           <div className="flex items-center justify-center gap-1 text-purple-600">
//             <Sparkles className="w-4 h-4" />
//             <span className="text-sm">Discover Your Next Learning Adventure</span>
//             <Sparkles className="w-4 h-4" />
//           </div>
//         </div>

//         {message && (
//           <div className="mb-6 max-w-md mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-0.5">
//             <div className="bg-white rounded-md p-4">
//               <p className="text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-medium">
//                 {message}
//               </p>
//             </div>
//           </div>
//         )}
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {classes.map(classItem => (
//             <div
//               key={classItem._id}
//               className="rounded-xl overflow-hidden bg-white shadow-lg transform hover:scale-102 transition-all duration-300"
//             >
//               <div className={`p-4 ${getClassLevelColor(classItem.skillLevel)}`}>
//                 <h2 className="text-xl font-bold mb-1">{classItem.title}</h2>
//                 <div className="flex items-center gap-1">
//                   <Star className="w-4 h-4 fill-current" />
//                   <span className="text-sm opacity-90">{classItem.skillLevel} Level</span>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className="space-y-4">
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 text-gray-700">
//                       <Mail className="w-4 h-4 text-blue-500" />
//                       <span>{classItem.email}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-700">
//                       <Tag className="w-4 h-4 text-purple-500" />
//                       <span>{classItem.category}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Video className="w-4 h-4 text-pink-500" />
//                       <span>{classItem.type}</span>
//                     </div>
//                   </div>

//                   {classItem.slots.map(slot => (
//                     <div 
//                       key={`${classItem._id}-${slot.date}`} 
//                       className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 space-y-3"
//                     >
//                       <div className="flex items-center gap-2 text-gray-800">
//                         <Calendar className="w-4 h-4 text-indigo-500" />
//                         <span className="font-medium">{slot.date}</span>
//                       </div>
                      
//                       {slot.times.map(time => {
//                         const slotTime = new Date(`${slot.date} ${time.startTime}`);
//                         const remainingSeats = classItem.maxParticipants - time.bookedSeats;
                        
//                         if (slotTime > new Date()) {
//                           const isFull = time.bookedSeats >= classItem.maxParticipants;
//                           const isBooked = bookedClasses.includes(`${classItem._id}-${slot.date}-${time.startTime}`);
                          
//                           return (
//                             <div 
//                               key={time.startTime} 
//                               className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
//                             >
//                               <div className="space-y-1">
//                                 <div className="flex items-center gap-2 text-gray-700">
//                                   <Clock className="w-4 h-4 text-teal-500" />
//                                   <span>{time.startTime} - {time.endTime}</span>
//                                 </div>
//                                 <div className="flex items-center gap-2 text-gray-600">
//                                   <Users className="w-4 h-4 text-orange-500" />
//                                   <span>{remainingSeats} seats left</span>
//                                 </div>
//                               </div>
                              
//                               <button
//                                 className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-all
//                                   ${isFull || isBooked
//                                     ? 'bg-gray-400 text-white cursor-not-allowed'
//                                     : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg'
//                                   }`}
//                                 onClick={() => handleBookClass(classItem._id, slot.date, time.startTime)}
//                                 disabled={isFull || isBooked}
//                               >
//                                 {isFull ? (
//                                   <>
//                                     <XCircle className="w-4 h-4" />
//                                     Full
//                                   </>
//                                 ) : isBooked ? (
//                                   <>
//                                     <CheckCircle className="w-4 h-4" />
//                                     Registered
//                                   </>
//                                 ) : (
//                                   <>
//                                     <CheckCircle className="w-4 h-4" />
//                                     Book Now
//                                   </>
//                                 )}
//                               </button>
//                             </div>
//                           );
//                         }
//                         return null;
//                       })}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default StudentScreen;
import axios from "axios";
import {
  Book,
  Calendar,
  Clock,
  Loader2,
  Mail,
  Sparkles,
  Star,
  Tag,
  Users,
  Video
} from 'lucide-react';
import { useEffect, useState } from "react";
import Header from './header';
  
const StudentScreen = () => {
  const [classes, setClasses] = useState([]);
  const [bookedClasses, setBookedClasses] = useState([]); // Track booked classes
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const handleBookClass = async (classId, date, startTime) => {
    if (bookedClasses.includes(`${classId}-${date}-${startTime}`)) {
      alert("You have already registered for this class.");
      return;
    }

    // Retrieve email from local storage
    const email = localStorage.getItem("Email");
    console.log(email);

    try {
      const response = await axios.patch(
        `http://localhost:5000/schedule/${classId}/slots/${date}/${startTime}`,
        { email } // Pass email in the request body
      );

      if (response.status === 200) {
        setBookedClasses(prev => [...prev, `${classId}-${date}-${startTime}`]);
        alert("Registered successfully!");
      }
    } catch (error) {
      alert("You have already registered");
      console.error("Error booking class", error);
    }
  };

  const getClassLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-gradient-to-br from-green-400 to-emerald-500 text-white";
      case "Intermediate":
        return "bg-gradient-to-br from-purple-400 to-indigo-500 text-white";
      case "Expert":
        return "bg-gradient-to-br from-red-400 to-rose-500 text-white";
      default:
        return "bg-gradient-to-br from-gray-400 to-gray-500 text-white";
    }
  };

  const getLevelAccent = (level) => {
    switch (level) {
      case "Beginner":
        return "text-emerald-400";
      case "Intermediate":
        return "text-purple-400";
      case "Expert":
        return "text-rose-400";
      default:
        return "text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2 flex items-center justify-center gap-2">
              <Book className="w-8 h-8 text-purple-600" />
              Available Mentor Classes
            </h1>
            <div className="flex items-center justify-center gap-1 text-purple-600">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Discover Your Next Learning Adventure</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map(classItem => (
              <div
                key={classItem._id}
                className="rounded-xl overflow-hidden bg-white shadow-lg transform hover:scale-102 transition-all duration-300"
              >
                <div className={`p-4 ${getClassLevelColor(classItem.skillLevel)}`}>
                  <h2 className="text-xl font-bold mb-1">{classItem.title}</h2>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm opacity-90">{classItem.skillLevel} Level</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span>{classItem.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Tag className="w-4 h-4 text-purple-500" />
                        <span>{classItem.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-pink-500" />
                        <span>{classItem.type}</span>
                      </div>
                    </div>

                    {classItem.slots.map(slot => (
                      <div 
                        key={`${classItem._id}-${slot.date}`} 
                        className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center gap-2 text-gray-800">
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          <span className="font-medium">{slot.date}</span>
                        </div>

                        {slot.times.map(time => {
                          const slotTime = new Date(`${slot.date} ${time.startTime}`);
                          const remainingSeats = classItem.maxParticipants - time.bookedSeats;

                          if (slotTime > new Date()) {
                            const isFull = time.bookedSeats >= classItem.maxParticipants;
                            const isBooked = bookedClasses.includes(`${classItem._id}-${slot.date}-${time.startTime}`);

                            return (
                              <div 
                                key={time.startTime} 
                                className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-gray-700">
                                    <Clock className="w-4 h-4 text-teal-500" />
                                    <span>{time.startTime} - {time.endTime}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <Users className="w-4 h-4 text-orange-500" />
                                    <span>{remainingSeats} seats left</span>
                                  </div>
                                </div>

                                {isBooked ? (
                                  <button
                                    className="px-4 py-2 rounded-full font-medium bg-gray-400 text-white cursor-not-allowed"
                                    disabled
                                  >
                                    Registered
                                  </button>
                                ) : (
                                  <button
                                    className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-all
                                      ${isFull
                                        ? 'bg-gray-400 text-white cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg'
                                      }`}
                                    onClick={() => handleBookClass(classItem._id, slot.date, time.startTime)}
                                    disabled={isFull}
                                  >
                                    {isFull ? 'Fully Booked' : 'Book Now'}
                                  </button>
                                )}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentScreen;

