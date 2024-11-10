// import { MeetingProvider } from "@videosdk.live/react-sdk";
// import React, { useEffect, useState } from 'react';
// import { getMeetingId, getToken } from "./ApiClient";
// import "./App.css";
// import JoinScreen from "./JoinScreen.jsx";
// import MeetingView from "./MeetingView.jsx";

// export default function VideoApp() {
//   const [meetingId, setMeetingId] = useState(null);
//   const [token, setToken] = useState(null);

//   const getMeetingAndToken = async (id) => {
//     try {
//       const token = await getToken();
//       setToken(token);
//       const meetingId =
//         id == null ? await getMeetingId(token) : id;
//       setMeetingId(meetingId);
//     } catch (error) {
//       console.error("Error getting meeting and token:", error);
//     }
//   };

//   const onMeetingLeave = () => {
//     setMeetingId(null);
//   };

//   useEffect(() => {
//     // You might want to initialize something on mount if needed
//   }, []);

//   return token && meetingId ? (
//     <MeetingProvider
//       config={{
//         meetingId,
//         micEnabled: true,
//         webcamEnabled: true,
//         name: "C.V. Raman",
//       }}
//       token={token} // Use the state token here
//     >
//       <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
//     </MeetingProvider>
//   ) : (
//     <JoinScreen getMeetingAndToken={getMeetingAndToken} />
//   );
// }
// import { MeetingProvider } from "@videosdk.live/react-sdk";
// import { useEffect, useState } from 'react';
// import { getToken } from "./ApiClient";
// import "./App.css";
// import JoinScreen from "./JoinScreen.jsx";
// import MeetingView from "./MeetingView.jsx";

// export default function VideoApp({ initialMeetingId, attendeeName }) { // Pass attendeeName as a prop
//   const [meetingId, setMeetingId] = useState(initialMeetingId);
//   const [token, setToken] = useState(null);
//   const getTokenOnly = async () => {
//     try {
//       const token = await getToken();
//       setToken(token);
//     } catch (error) {
//       console.error("Error getting token:", error);
//     }
//   };

//   const onMeetingLeave = () => {
//     setMeetingId(null);
//   };

//   useEffect(() => {
//     getTokenOnly();
//     console.log(meetingId);

//   }, []);

//   return token && meetingId ? (
//     <MeetingProvider
//       config={{
//         meetingId,
//         micEnabled: true,
//         webcamEnabled: true,
//         name: attendeeName, // Use the attendeeName prop here
//       }}
//       token={token}
//     >
//       <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
//     </MeetingProvider>
//   ) : (
//     <JoinScreen getMeetingAndToken={() => setMeetingId(initialMeetingId)} />
//   );
// }
// import { MeetingProvider } from "@videosdk.live/react-sdk";
// import { useEffect, useState } from 'react';
// import { getToken } from "./ApiClient";
// import "./App.css";
// import JoinScreen from "./JoinScreen.jsx";
// import MeetingView from "./MeetingView.jsx";

// export default function VideoApp({ initialMeetingId, attendeeName }) { // Pass attendeeName as a prop
//   const [meetingId, setMeetingId] = useState(initialMeetingId);
//   const [token, setToken] = useState(null);

//   const getTokenOnly = async () => {
//     try {
//       const token = await getToken();
//       setToken(token);
//     } catch (error) {
//       console.error("Error getting token:", error);
//     }
//   };

//   const onMeetingLeave = () => {
//     setMeetingId(null);
//   };

//   useEffect(() => {
//     getTokenOnly();
//     console.log("Meeting ID from useEffect:", meetingId);  // Log meetingId when effect runs
//   }, []); // Empty dependency array ensures this only runs once after the first render

//   console.log("Rendering VideoApp with meetingId:", meetingId); // Log meetingId on each render

//   return token && meetingId ? (
//     <MeetingProvider
//       config={{
//         meetingId,
//         micEnabled: true,
//         webcamEnabled: true,
//         name: attendeeName, // Use the attendeeName prop here
//       }}
//       token={token}
//     >
//       <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
//     </MeetingProvider>
//   ) : (
//     <JoinScreen getMeetingAndToken={() => setMeetingId(initialMeetingId)} />
//   );
// }
// import { MeetingProvider } from "@videosdk.live/react-sdk";
// import { useEffect, useState } from 'react';
// import { getToken } from "./ApiClient";
// import "./App.css";
// import JoinScreen from "./JoinScreen.jsx";
// import MeetingView from "./MeetingView.jsx";

// export default function VideoApp({ initialMeetingId, attendeeName }) { // Pass attendeeName as a prop
//   const [meetingId, setMeetingId] = useState(initialMeetingId);
//   const [token, setToken] = useState(null);

//   const getTokenOnly = async () => {
//     try {
//       const token = await getToken();
//       setToken(token);
//       console.log("token",token);
//     } catch (error) {
//       console.error("Error getting token:", error);
//     }
//   };

//   const onMeetingLeave = () => {
//     setMeetingId(null);
//   };

//   useEffect(() => {
//     getTokenOnly();
//     console.log(meetingId);
//   }, [meetingId]);

//   return token && meetingId ? (
//     <MeetingProvider
//       config={{
//         meetingId,
//         micEnabled: true,
//         webcamEnabled: true,
//         name: attendeeName, // Use the attendeeName prop here
//       }}
//       token={token}
//     >
//       <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
//     </MeetingProvider>
//   ) : (
//     <JoinScreen meetingId={meetingId} getMeetingAndToken={(id) => setMeetingId(id)} />
//   );
// }
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { getToken } from "./ApiClient";
import "./App.css";
import JoinScreen from "./JoinScreen.jsx";
import MeetingView from "./MeetingView.jsx";

export default function VideoApp() {
  const location = useLocation(); // Get location state
  const { meetingId: initialMeetingId, attendeeName: initialAttendeeName } = location.state || {}; // Destructure state

  const [newMeetingId, setNewMeetingId] = useState(initialMeetingId || ""); // New state for meetingId
  const [newAttendeeName, setNewAttendeeName] = useState(initialAttendeeName || ""); // New state for attendeeName
  const [token, setToken] = useState(null);

  const getTokenOnly = async () => {
    try {
      const token = await getToken();
      setToken(token);
      console.log("token", token);
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };

  const onMeetingLeave = () => {
    setNewMeetingId(null);
  };

  useEffect(() => {
    if (initialMeetingId) {
      setNewMeetingId(initialMeetingId); // Update state if initialMeetingId is provided
    }
    if (initialAttendeeName) {
      setNewAttendeeName(initialAttendeeName); // Update state if initialAttendeeName is provided
    }
    getTokenOnly();
    console.log(newMeetingId);
  }, [initialMeetingId, initialAttendeeName]);

  // Ensure meetingId and attendeeName are available before rendering MeetingProvider or JoinScreen
  if (!newMeetingId || !newAttendeeName) {
    return <div>Loading...</div>; // You can handle loading state here if necessary
  }

  return token && newMeetingId ? (
    <MeetingProvider
      config={{
        meetingId: newMeetingId, // Use new state variable
        micEnabled: true,
        webcamEnabled: true,
        name: newAttendeeName, // Use new state variable
      }}
      token={token}
    >
      <MeetingView meetingId={newMeetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen meetingId={newMeetingId} getMeetingAndToken={(id) => setNewMeetingId(id)} />
  );
}
