// import { useParticipant } from "@videosdk.live/react-sdk";
// import { useEffect, useMemo, useRef } from "react";
// import ReactPlayer from "react-player";

// function ParticipantView({ participantId }) {
//   const micRef = useRef(null);
//   const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
//     useParticipant(participantId);

//   useEffect(() => {
//     console.log("Participant Data:", {
//       webcamStream,
//       micStream,
//       webcamOn,
//       micOn,
//       isLocal,
//       displayName
//     });
//   }, [webcamStream, micStream, webcamOn, micOn, isLocal, displayName]);

//   const videoStream = useMemo(() => {
//     if (webcamOn && webcamStream) {
//       const mediaStream = new MediaStream();
//       mediaStream.addTrack(webcamStream.track);
//       return mediaStream;
//     }
//     return null;
//   }, [webcamStream, webcamOn]);

//   useEffect(() => {
//     if (micRef.current) {
//       if (micOn && micStream) {
//         const mediaStream = new MediaStream();
//         mediaStream.addTrack(micStream.track);

//         micRef.current.srcObject = mediaStream;
//         micRef.current
//           .play()
//           .catch((error) =>
//             console.error("videoElem.current.play() failed", error)
//           );
//       } else {
//         micRef.current.srcObject = null;
//       }
//     }
//   }, [micStream, micOn]);

//   return (
//     <div>
//       <p>
//         Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
//         {micOn ? "ON" : "OFF"}
//       </p>
//       <audio ref={micRef} autoPlay playsInline muted={isLocal} />
//       {webcamOn && videoStream ? (
//         <ReactPlayer
//           playsinline
//           pip={false}
//           light={false}
//           controls={false}
//           muted={true}
//           playing={true}
//           url={videoStream} // Ensure this is a valid MediaStream
//           height={"300px"}
//           width={"300px"}
//           onError={(err) => {
//             console.log(err, "participant video error");
//           }}
//         />
//       ) : (
//         <p>No video stream available</p>
//       )}
//     </div>
//   );
// }

// export default ParticipantView;
import { useParticipant } from "@videosdk.live/react-sdk";
import { Mic, MicOff, VideoOff } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";

function ParticipantView({ participantId }) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
    return null;
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className="relative w-full h-full bg-gray-800 rounded-lg overflow-hidden">
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      
      {webcamOn && videoStream ? (
        <div className="relative w-full h-full">
          <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            width="100%"
            height="100%"
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              objectFit: 'cover'
            }}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-700">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-2xl text-white">
                {displayName ? displayName[0].toUpperCase() : "P"}
              </span>
            </div>
            <VideoOff className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      )}

      {/* Overlay for participant info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium">{displayName}</span>
          <div className="flex items-center gap-2">
            {micOn ? (
              <Mic className="w-4 h-4 text-white" />
            ) : (
              <MicOff className="w-4 h-4 text-red-500" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantView;
// import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
// import React from 'react';
// import ParticipantView from './ParticipantView';

// const PresentationView = ({ presenterId }) => {
//   const {
//     screenShareStream,
//     screenShareOn,
//     displayName
//   } = useParticipant(presenterId);

//   const videoRef = React.useRef(null);

//   React.useEffect(() => {
//     if (screenShareStream && videoRef.current) {
//       const mediaStream = new MediaStream();
//       mediaStream.addTrack(screenShareStream.track);
//       videoRef.current.srcObject = mediaStream;
//     }
//   }, [screenShareStream]);

//   if (!screenShareOn) return null;

//   return (
//     <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
//       <video 
//         ref={videoRef}
//         autoPlay 
//         playsInline 
//         className="w-full h-full object-contain"
//       />
//       <div className="absolute top-4 left-4 bg-gray-900/75 px-4 py-2 rounded-lg text-white">
//         {displayName}'s screen
//       </div>
//     </div>
//   );
// };

// const MeetingGrid = () => {
//   const { participants, presenterId } = useMeeting();
//   const participantsArr = [...participants.keys()];

//   // Calculate grid layout
//   const getGridLayout = () => {
//     const hasPresentation = !!presenterId;
//     const participantCount = participantsArr.length;
    
//     if (hasPresentation) {
//       if (participantCount <= 1) return 'presentation-only';
//       if (participantCount <= 4) return 'presentation-with-participants';
//       return 'presentation-with-grid';
//     } else {
//       if (participantCount === 1) return 'single';
//       if (participantCount === 2) return 'duo';
//       if (participantCount <= 4) return 'quad';
//       return 'grid';
//     }
//   };

//   const gridLayout = getGridLayout();

//   // Layout-specific classes
//   const layoutClasses = {
//     'presentation-only': 'grid-cols-1 grid-rows-1',
//     'presentation-with-participants': 'grid-cols-4 grid-rows-1',
//     'presentation-with-grid': 'grid-cols-4 grid-rows-2',
//     'single': 'grid-cols-1 grid-rows-1',
//     'duo': 'grid-cols-2 grid-rows-1',
//     'quad': 'grid-cols-2 grid-rows-2',
//     'grid': 'grid-cols-3 grid-rows-2'
//   };

//   return (
//     <div className="w-full h-full p-4 bg-gray-900">
//       <div className={`grid gap-4 w-full h-full ${layoutClasses[gridLayout]}`}>
//         {presenterId && (
//           <div className={`
//             ${gridLayout === 'presentation-only' ? 'col-span-full row-span-full' : 'col-span-3 row-span-full'}
//           `}>
//             <PresentationView presenterId={presenterId} />
//           </div>
//         )}
        
//         {participantsArr.map((participantId) => {
//           // Skip rendering presenter's camera if they're sharing screen
//           if (presenterId === participantId && gridLayout === 'presentation-only') return null;
          
//           return (
//             <div
//               key={participantId}
//               className={`
//                 relative
//                 ${presenterId ? 'col-span-1' : ''}
//                 ${gridLayout === 'presentation-with-grid' && 'h-48'}
//               `}
//             >
//               <ParticipantView participantId={participantId} />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default MeetingGrid;