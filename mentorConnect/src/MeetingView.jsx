import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useState } from "react";
import Controls from "./Controls"; // Ensure this path is correct
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

  return (
    <div className="container">
      <h3>Meeting Id: {props.meetingId}</h3>
      {joined === "JOINED" ? (
        <div>
          <Controls /> {/* Ensure Controls component is displayed */}
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
        </div>
      ) : joined === "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join</button>
      )}
    </div>
  );
}

export default MeetingView;
