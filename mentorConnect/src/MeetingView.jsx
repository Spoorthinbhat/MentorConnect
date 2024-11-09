// import { useMeeting } from "@videosdk.live/react-sdk";
// import { useState } from "react";
// import Controls from "./Controls"; // Ensure this path is correct
// import ParticipantView from "./ParticipantView";

// function MeetingView(props) {
//   const [joined, setJoined] = useState(null);

//   const { join, participants } = useMeeting({
//     onMeetingJoined: () => {
//       setJoined("JOINED");
//     },
//     onMeetingLeft: () => {
//       props.onMeetingLeave();
//     },
//   });

//   const joinMeeting = () => {
//     setJoined("JOINING");
//     join();
//   };

//   return (
//     <div className="container">
//       <h3>Meeting Id: {props.meetingId}</h3>
//       {joined === "JOINED" ? (
//         <div>
//           <Controls /> {/* Ensure Controls component is displayed */}
//           {[...participants.keys()].map((participantId) => (
//             <ParticipantView
//               participantId={participantId}
//               key={participantId}
//             />
//           ))}
//         </div>
//       ) : joined === "JOINING" ? (
//         <p>Joining the meeting...</p>
//       ) : (
//         <button onClick={joinMeeting}>Join</button>
//       )}
//     </div>
//   );
// }

// export default MeetingView;
import { useMeeting } from "@videosdk.live/react-sdk";
import { Video } from "lucide-react";
import { useState } from "react";
import Controls from "./Controls";
import ParticipantView from "./ParticipantView";

function MeetingView(props) {
  const [joined, setJoined] = useState(null);

  const { join, participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  // Calculate grid layout based on number of participants
  const getGridLayout = () => {
    const participantCount = participants.size;
    if (participantCount === 1) return "grid-cols-1";
    if (participantCount === 2) return "grid-cols-2";
    if (participantCount === 3 || participantCount === 4) return "grid-cols-2";
    if (participantCount <= 6) return "grid-cols-3";
    return "grid-cols-4";
  };

  return (
    <div className="h-screen bg-gray-900 text-white relative overflow-hidden">
      {joined === "JOINED" ? (
        <div className="h-full flex flex-col">
          {/* Meeting Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
            <div className="flex items-center space-x-2">
              <Video className="w-6 h-6 text-gray-400" />
              <h3 className="text-lg font-medium">Meeting ID: {props.meetingId}</h3>
            </div>
            <div className="text-sm text-gray-400">
              {participants.size} participant{participants.size !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Participants Grid */}
          <div className="flex-1 p-4 overflow-auto">
            <div className={`grid ${getGridLayout()} gap-4 h-full`}>
              {[...participants.keys()].map((participantId) => (
                <div
                  key={participantId}
                  className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden"
                >
                  <ParticipantView
                    participantId={participantId}
                    key={participantId}
                  />
                  {/* Participant name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                    <span className="text-sm">Participant {participantId.slice(0, 5)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <Controls />
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          {joined === "JOINING" ? (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg">Joining the meeting...</p>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-6">Ready to join?</h2>
              <button
                onClick={joinMeeting}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-medium transition-colors duration-200"
              >
                Join Meeting
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MeetingView;