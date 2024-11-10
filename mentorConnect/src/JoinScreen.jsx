// import React, { useState } from "react";

// function JoinScreen({ getMeetingAndToken }) {
//   const [meetingId, setMeetingId] = useState("");

//   const onClick = async () => {
//     await getMeetingAndToken(meetingId);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter Meeting Id"
//         value={meetingId}
//         onChange={(e) => {
//           setMeetingId(e.target.value);
//         }}
//       />
//       <button onClick={onClick}>Join</button>
//       {" or "}
//       <button onClick={() => getMeetingAndToken(null)}>Create Meeting</button>
//     </div>
//   );
// }

// export default JoinScreen;
// import { useState } from "react";

// function JoinScreen({ getMeetingAndToken }) {
//   const [meetingId, setMeetingId] = useState("");

//   const onClick = async () => {
//     await getMeetingAndToken(meetingId);  // Only passes meetingId to getMeetingAndToken
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter Meeting Id"
//         value={meetingId}
//         onChange={(e) => setMeetingId(e.target.value)}  // Updates meetingId state
//       />
//       <button onClick={onClick}>Join</button>
//     </div>
//   );
// }

// export default JoinScreen;
import { useEffect } from "react";

function JoinScreen({ meetingId, getMeetingAndToken }) {
  useEffect(() => {
    if (meetingId) {
      getMeetingAndToken(meetingId);  // Automatically join when meetingId is passed
    }
  }, [meetingId, getMeetingAndToken]);

  return (
    <div>
      <p>Joining meeting with ID: {meetingId}</p>
    </div>
  );
}

export default JoinScreen;
