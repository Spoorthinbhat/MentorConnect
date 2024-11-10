// import { Calendar, Clock, Layout, Users } from 'lucide-react';

// const SessionCard = () => {
//   const sessions = [
//     {
//       "title": "sdv",
//       "description": "asdf",
//       "category": "ASDF",
//       "type": "One-on-One",
//       "skillLevel": "Beginner",
//       "slots": [
//         {
//           "date": "2024-11-20",
//           "times": [
//             {
//               "startTime": "15:11",
//               "endTime": "16:11",
//               "_id": "6725bba42d8bfd8a6df88683"
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "title": "JavaScript Mastery",
//       "description": "Learn advanced JavaScript techniques and build real-world applications.",
//       "category": "Programming",
//       "type": "One-on-One",
//       "skillLevel": "Intermediate",
//       "slots": [
//         {
//           "date": "2024-12-05",
//           "times": [
//             {
//               "startTime": "10:00",
//               "endTime": "12:00",
//               "_id": "672f92e8411c67a07d17da13"
//             },
//             {
//               "startTime": "14:00",
//               "endTime": "16:00",
//               "_id": "672f92e8411c67a07d17da14"
//             }
//           ]
//         },
//         {
//           "date": "2024-12-06",
//           "times": [
//             {
//               "startTime": "09:00",
//               "endTime": "11:00",
//               "_id": "672f92e8411c67a07d17da16"
//             }
//           ]
//         }
//       ]
//     }
//   ];

//   // Filter out past sessions and times
//   const filterCurrentAndFutureSessions = (sessions) => {
//     const now = new Date();
    
//     return sessions.reduce((acc, session) => {
//       // Filter slots and their times
//       const filteredSlots = session.slots.reduce((slotAcc, slot) => {
//         const slotDate = new Date(slot.date);
//         const filteredTimes = slot.times.filter(time => {
//           const [hours, minutes] = time.startTime.split(':');
//           const sessionDateTime = new Date(slotDate);
//           sessionDateTime.setHours(parseInt(hours), parseInt(minutes));
//           return sessionDateTime > now;
//         });
        
//         if (filteredTimes.length > 0) {
//           slotAcc.push({
//             ...slot,
//             times: filteredTimes
//           });
//         }
//         return slotAcc;
//       }, []);
      
//       if (filteredSlots.length > 0) {
//         acc.push({
//           ...session,
//           slots: filteredSlots
//         });
//       }
//       return acc;
//     }, []);
//   };

//   const getColorBySkillLevel = (skillLevel) => {
//     const colors = {
//       'Beginner': 'bg-blue-500',
//       'Intermediate': 'bg-purple-500',
//       'Advanced': 'bg-orange-500'
//     };
//     return colors[skillLevel] || 'bg-indigo-500';
//   };

//   const formatDate = (dateStr) => {
//     return new Date(dateStr).toLocaleDateString('en-US', {
//       weekday: 'long',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const handleJoin = (sessionId) => {
//     console.log(`Joining session: ${sessionId}`);
//   };

//   const filteredSessions = filterCurrentAndFutureSessions(sessions);

//   if (filteredSessions.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
//         <div className="text-center text-gray-600">
//           <h2 className="text-2xl font-bold mb-2">No Upcoming Sessions</h2>
//           <p>Check back later for new training sessions.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
//       <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">
//         Training Sessions
//       </h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
//         {filteredSessions.map((session) => (
//           <div key={session.title} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
//             <div className={`${getColorBySkillLevel(session.skillLevel)} p-4`}>
//               <h2 className="text-2xl font-bold text-white">{session.title}</h2>
//               <span className="inline-block mt-2 text-sm font-medium bg-white/20 text-white px-3 py-1 rounded-full">
//                 {session.skillLevel}
//               </span>
//             </div>
            
//             <div className="p-6">
//               <p className="text-gray-600 mb-4 line-clamp-2">{session.description}</p>
              
//               <div className="space-y-3 mb-4">
//                 <div className="flex items-center gap-2">
//                   <div className="bg-pink-100 p-2 rounded-lg">
//                     <Layout className="h-4 w-4 text-pink-500" />
//                   </div>
//                   <span className="text-sm font-medium text-gray-700">{session.category}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="bg-green-100 p-2 rounded-lg">
//                     <Users className="h-4 w-4 text-green-500" />
//                   </div>
//                   <span className="text-sm font-medium text-gray-700">{session.type}</span>
//                 </div>
//               </div>
              
//               {session.slots.map((slot) => (
//                 <div key={slot.date} className="border-t border-gray-100 pt-4">
//                   <div className="flex items-center gap-2 mb-3">
//                     <div className="bg-yellow-100 p-2 rounded-lg">
//                       <Calendar className="h-4 w-4 text-yellow-600" />
//                     </div>
//                     <span className="text-sm font-medium text-gray-700">{formatDate(slot.date)}</span>
//                   </div>
//                   <div className="space-y-3">
//                     {slot.times.map((time) => (
//                       <div 
//                         key={time._id} 
//                         className="bg-gray-50 rounded-lg p-3 flex items-center justify-between"
//                       >
//                         <div className="flex items-center gap-2">
//                           <div className="bg-blue-100 p-2 rounded-lg">
//                             <Clock className="h-4 w-4 text-blue-500" />
//                           </div>
//                           <span className="text-sm font-medium text-gray-700">
//                             {time.startTime} - {time.endTime}
//                           </span>
//                         </div>
//                         <button
//                           onClick={() => handleJoin(time._id)}
//                           className={`${getColorBySkillLevel(session.skillLevel)} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 text-sm font-semibold`}
//                         >
//                           Join
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SessionCard;
import { Calendar, Clock, Layout, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const SessionCard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const email = localStorage.getItem("Email"); 
        const response = await fetch(`http://localhost:5000/schedule/api/registered-classes?email=${email}`);
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Filter out past sessions and times
  const filterCurrentAndFutureSessions = (sessions) => {
    const now = new Date();

    return sessions.reduce((acc, session) => {
      const filteredSlots = session.slots.reduce((slotAcc, slot) => {
        const slotDate = new Date(slot.date);
        const filteredTimes = slot.times.filter((time) => {
          const [hours, minutes] = time.startTime.split(':');
          const sessionDateTime = new Date(slotDate);
          sessionDateTime.setHours(parseInt(hours), parseInt(minutes));
          return sessionDateTime > now;
        });

        if (filteredTimes.length > 0) {
          slotAcc.push({
            ...slot,
            times: filteredTimes,
          });
        }
        return slotAcc;
      }, []);

      if (filteredSlots.length > 0) {
        acc.push({
          ...session,
          slots: filteredSlots,
        });
      }
      return acc;
    }, []);
  };

  const getColorBySkillLevel = (skillLevel) => {
    const colors = {
      Beginner: 'bg-blue-500',
      Intermediate: 'bg-purple-500',
      Advanced: 'bg-orange-500',
    };
    return colors[skillLevel] || 'bg-indigo-500';
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleJoin = (sessionId) => {
    console.log(`Joining session: ${sessionId}`);
  };

  const filteredSessions = filterCurrentAndFutureSessions(sessions);

  if (loading) {
    return <p>Loading sessions...</p>;
  }

  if (filteredSessions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="text-center text-gray-600">
          <h2 className="text-2xl font-bold mb-2">No Upcoming Sessions</h2>
          <p>Check back later for new training sessions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">
        Training Sessions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredSessions.map((session) => (
          <div
            key={session.title}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className={`${getColorBySkillLevel(session.skillLevel)} p-4`}>
              <h2 className="text-2xl font-bold text-white">{session.title}</h2>
              <span className="inline-block mt-2 text-sm font-medium bg-white/20 text-white px-3 py-1 rounded-full">
                {session.skillLevel}
              </span>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4 line-clamp-2">
                {session.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <Layout className="h-4 w-4 text-pink-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {session.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Users className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {session.type}
                  </span>
                </div>
              </div>

              {session.slots.map((slot) => (
                <div key={slot.date} className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <Calendar className="h-4 w-4 text-yellow-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {formatDate(slot.date)}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {slot.times.map((time) => (
                      <div
                        key={time._id}
                        className="bg-gray-50 rounded-lg p-3 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Clock className="h-4 w-4 text-blue-500" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {time.startTime} - {time.endTime}
                          </span>
                        </div>
                        <button
                          onClick={() => handleJoin(time._id)}
                          className={`${getColorBySkillLevel(
                            session.skillLevel
                          )} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 text-sm font-semibold`}
                        >
                          Join
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionCard;
