// import { useMeeting } from "@videosdk.live/react-sdk";

// function Controls() {
//   const { leave, toggleMic, toggleWebcam } = useMeeting();

//   return (
//     <div>
//       <button onClick={() => leave()}>Leave</button>
//       <button onClick={() => toggleMic()}>Toggle Mic</button>
//       <button onClick={() => toggleWebcam()}>Toggle Webcam</button>
//     </div>
//   );
// }

// export default Controls;

// // Helper function to create a video element for a participant
// function createVideoElement(pId, name) {
//   let videoFrame = document.createElement("div");
//   videoFrame.setAttribute("id", `f-${pId}`);

//   let videoElement = document.createElement("video");
//   videoElement.classList.add("video-frame");
//   videoElement.setAttribute("id", `v-${pId}`);
//   videoElement.setAttribute("playsinline", true);
//   videoElement.setAttribute("width", "300");
//   videoFrame.appendChild(videoElement);

//   let displayName = document.createElement("div");
//   displayName.innerHTML = `Name : ${name}`;
//   videoFrame.appendChild(displayName);

//   return videoFrame;
// }

// // Helper function to create an audio element for a participant
// function createAudioElement(pId) {
//   let audioElement = document.createElement("audio");
//   audioElement.setAttribute("autoPlay", "false");
//   audioElement.setAttribute("playsInline", "true");
//   audioElement.setAttribute("controls", "false");
//   audioElement.setAttribute("id", `a-${pId}`);
//   audioElement.style.display = "none";
//   return audioElement;
// }

// // Function to add the local participant to the video container
// function createLocalParticipant(meeting, videoContainer) {
//   const localParticipant = createVideoElement(
//     meeting.localParticipant.id,
//     meeting.localParticipant.displayName
//   );
//   videoContainer.appendChild(localParticipant);
// }

// // Function to set the media track for a participant
// function setTrack(stream, audioElement, participant, isLocal) {
//   if (stream.kind === "video") {
//     const mediaStream = new MediaStream();
//     mediaStream.addTrack(stream.track);
//     const videoElement = document.getElementById(`v-${participant.id}`);

//     videoElement.srcObject = mediaStream;
//     videoElement
//       .play()
//       .catch((error) => console.error("videoElement.play() failed", error));
//   } else if (stream.kind === "audio") {
//     const mediaStream = new MediaStream();
//     mediaStream.addTrack(stream.track);
//     audioElement.srcObject = mediaStream;
//     audioElement
//       .play()
//       .catch((error) => console.error("audioElement.play() failed", error));
//   }
// }

// // Example usage: setting up initial participant video/audio elements
// function setupMeetingParticipants(meeting, videoContainer) {
//   createLocalParticipant(meeting, videoContainer);

//   meeting.participants.forEach((participant) => {
//     const videoElement = createVideoElement(participant.id, participant.name);
//     const audioElement = createAudioElement(participant.id);

//     // Append elements to the container or the DOM where you want them displayed
//     videoContainer.appendChild(videoElement);
//     videoContainer.appendChild(audioElement);

//     // Apply initial track setup for video and audio
//     participant.streams.forEach((stream) =>
//       setTrack(stream, audioElement, participant, false)
//     );
//   });
// }
// import { useMeeting } from "@videosdk.live/react-sdk";
// import { useState } from "react";

// function Controls() {
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isWebcamOn, setIsWebcamOn] = useState(true);

//   // Access toggle functions from the useMeeting hook
//   const { toggleMic, toggleWebcam } = useMeeting();

//   // Function to handle mic toggle
//   const handleToggleMic = () => {
//     toggleMic(); // Toggles the mic state
//     setIsMicOn((prev) => !prev); // Update button label based on state
//   };

//   // Function to handle webcam toggle
//   const handleToggleWebcam = () => {
//     toggleWebcam(); // Toggles the webcam state
//     setIsWebcamOn((prev) => !prev); // Update button label based on state
//   };

//   return (
//     <div>
//       <button onClick={handleToggleMic}>
//         {isMicOn ? "Mute Audio" : "Unmute Audio"}
//       </button>
//       <button onClick={handleToggleWebcam}>
//         {isWebcamOn ? "Turn Off Video" : "Turn On Video"}
//       </button>
//     </div>
//   );
// }

// export default Controls;
// import { useMeeting } from "@videosdk.live/react-sdk";
// import { Mic, MicOff, Video, VideoOff } from "lucide-react";
// import { useState } from "react";

// function Controls() {
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isWebcamOn, setIsWebcamOn] = useState(true);

//   const { toggleMic, toggleWebcam } = useMeeting();

//   const handleToggleMic = () => {
//     toggleMic();
//     setIsMicOn((prev) => !prev);
//   };

//   const handleToggleWebcam = () => {
//     toggleWebcam();
//     setIsWebcamOn((prev) => !prev);
//   };

//   return (
//     <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 bg-gray-900/90 p-4 rounded-full backdrop-blur-sm">
//       <button
//         onClick={handleToggleMic}
//         className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-200 ${
//           isMicOn 
//             ? "bg-gray-700 hover:bg-gray-600" 
//             : "bg-red-500 hover:bg-red-600"
//         }`}
//         title={isMicOn ? "Mute Audio" : "Unmute Audio"}
//       >
//         {isMicOn ? (
//           <Mic className="w-6 h-6 text-white" />
//         ) : (
//           <MicOff className="w-6 h-6 text-white" />
//         )}
//       </button>

//       <button
//         onClick={handleToggleWebcam}
//         className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-200 ${
//           isWebcamOn 
//             ? "bg-gray-700 hover:bg-gray-600" 
//             : "bg-red-500 hover:bg-red-600"
//         }`}
//         title={isWebcamOn ? "Turn Off Video" : "Turn On Video"}
//       >
//         {isWebcamOn ? (
//           <Video className="w-6 h-6 text-white" />
//         ) : (
//           <VideoOff className="w-6 h-6 text-white" />
//         )}
//       </button>
//     </div>
//   );
// }

// export default Controls;
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import {
  Mic,
  MicOff,
  Monitor,
  MonitorStop,
  Volume2 as SpeakerIcon,
  Video,
  VideoOff
} from "lucide-react";
import { useEffect, useState } from "react";

function Controls() {
  const mMeeting = useMeeting();
  const presenterId = mMeeting?.presenterId;

  const [isMicOn, setIsMicOn] = useState(true);
  const [isWebcamOn, setIsWebcamOn] = useState(true);
  const [isScreenShareOn, setIsScreenShareOn] = useState(false);

  const {
    micOn,
    webcamOn,
    isLocal,
    screenShareOn,
    displayName,
    isActiveSpeaker,
  } = useParticipant(presenterId);

  const toggleMic = () => {
    mMeeting.toggleMic();
    setIsMicOn((prev) => !prev);
  };

  const toggleWebcam = () => {
    mMeeting.toggleWebcam();
    setIsWebcamOn((prev) => !prev);
  };

  const toggleScreenShare = () => {
    mMeeting.toggleScreenShare();
    setIsScreenShareOn((prev) => !prev);
  };

  useEffect(() => {
    if (screenShareOn !== isScreenShareOn) {
      setIsScreenShareOn(screenShareOn);
    }
  }, [screenShareOn]);

  const ControlButton = ({ onClick, isActive, activeColor, title, children }) => (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center w-12 h-12 rounded-full
        transition-all duration-200 ease-in-out
        ${isActive 
          ? `${activeColor} hover:brightness-110` 
          : 'bg-gray-700 hover:bg-gray-600'
        }
        transform hover:scale-105 active:scale-95
        shadow-lg hover:shadow-xl
      `}
      title={title}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4">
      {/* Presenter Status */}
      {presenterId && (
        <div
          className={`
            bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full
            flex items-center gap-2 text-white
            transition-all duration-200 ease-in-out
            shadow-lg
          `}
        >
          {!micOn ? (
            <MicOff className="w-4 h-4" />
          ) : micOn && isActiveSpeaker ? (
            <SpeakerIcon className="w-4 h-4 animate-pulse" />
          ) : null}
          <p className="text-sm font-medium">
            {isLocal ? "You are presenting" : `${displayName} is presenting`}
          </p>
        </div>
      )}

      {/* Main Controls */}
      <div className="flex items-center gap-4 bg-gray-900/90 px-6 py-4 rounded-full backdrop-blur-sm shadow-xl">
        <ControlButton
          onClick={toggleMic}
          isActive={!isMicOn}
          activeColor="bg-red-500"
          title={isMicOn ? "Mute Audio" : "Unmute Audio"}
        >
          {isMicOn ? (
            <Mic className="w-6 h-6 text-white" />
          ) : (
            <MicOff className="w-6 h-6 text-white" />
          )}
        </ControlButton>

        <ControlButton
          onClick={toggleWebcam}
          isActive={!isWebcamOn}
          activeColor="bg-red-500"
          title={isWebcamOn ? "Turn Off Video" : "Turn On Video"}
        >
          {isWebcamOn ? (
            <Video className="w-6 h-6 text-white" />
          ) : (
            <VideoOff className="w-6 h-6 text-white" />
          )}
        </ControlButton>

        <ControlButton
          onClick={toggleScreenShare}
          isActive={isScreenShareOn}
          activeColor="bg-blue-500"
          title={isScreenShareOn ? "Stop Sharing Screen" : "Share Screen"}
        >
          {isScreenShareOn ? (
            <MonitorStop className="w-6 h-6 text-white" />
          ) : (
            <Monitor className="w-6 h-6 text-white" />
          )}
        </ControlButton>
      </div>
    </div>
  );
}

export default Controls;
