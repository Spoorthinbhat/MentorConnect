import { MeetingProvider } from "@videosdk.live/react-sdk";
import React, { useEffect, useState } from 'react';
import { getMeetingId, getToken } from "./ApiClient";
import "./App.css";
import JoinScreen from "./JoinScreen.jsx";
import MeetingView from "./MeetingView.jsx";

export default function VideoApp() {
  const [meetingId, setMeetingId] = useState(null);
  const [token, setToken] = useState(null);

  const getMeetingAndToken = async (id) => {
    try {
      const token = await getToken();
      setToken(token);
      const meetingId =
        id == null ? await getMeetingId(token) : id;
      setMeetingId(meetingId);
    } catch (error) {
      console.error("Error getting meeting and token:", error);
    }
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  useEffect(() => {
    // You might want to initialize something on mount if needed
  }, []);

  return token && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "C.V. Raman",
      }}
      token={token} // Use the state token here
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}
