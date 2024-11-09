import { useNavigate } from "react-router-dom";

const JoinButton = () => {
  const navigate = useNavigate();
const participantName = "spoo";
const meetingId = "bmlo-0hau-1umk";
  const handleJoinClick = () => {
    navigate("/app",);
  };

  return (
    <button
      onClick={handleJoinClick}
      className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      Join
    </button>
  );
};

export default JoinButton;
