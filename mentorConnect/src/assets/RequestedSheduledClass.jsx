import axios from 'axios'; // Make sure axios is imported
import { BookOpen, Calendar, CalendarCheck, Clock, Globe, GraduationCap, History } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderMentor from "./HeaderMentor";
const MentoringSessions = () => {
    const navigate = useNavigate();

  const [showHistory, setShowHistory] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sessions data from API
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const email = localStorage.getItem("Email");
        const response = await axios.get(`http://localhost:5000/request?email=${email}`);
        setSessions(response.data); // Use response.data to get JSON data
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const currentDate = new Date();
  const upcomingSessions = sessions.filter(
    session => new Date(session.scheduledDate) >= currentDate
  );
  const pastSessions = sessions.filter(
    session => new Date(session.scheduledDate) < currentDate
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const getUserNameByEmail = async (email) => {
    try {
      if (!email) {
        throw new Error("Email parameter is required");
      }
  
      const response = await axios.get('http://localhost:5000/auth/name', {
        params: { email }
      });
  
      if (response.status === 200) {
        console.log("User name retrieved successfully:", response.data.name);
        return response.data.name;
      } else {
        console.error("Failed to retrieve user name:", response.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user name by email:", error.message);
      return null;
    }
  };
  const handleJoin =async (meetingId) => {
    if (meetingId) {
      console.log(`Joining meeting: ${meetingId}`);
      const email = localStorage.getItem("Email"); 
      const attendeeName = await getUserNameByEmail(email);  // Replace with actual logic to get the attendee's name
      console.log(attendeeName);
      if (attendeeName) {
        // setMeetingDetails({ meetingId, attendeeName });
        
        navigate('/join', {
          state: { meetingId, attendeeName },
        });
      }
    } else {
      console.log('No meeting ID available');
    }
  };

  const displaySessions = showHistory ? pastSessions : upcomingSessions;

  if (loading) {
    return <div>Loading sessions...</div>;
  }

  return (
    <div>

    <HeaderMentor></HeaderMentor>
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {showHistory ? 'Session History' : 'Upcoming Sessions'}
        </h1>
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {showHistory ? (
            <>
              <CalendarCheck className="w-4 h-4" />
              Show Upcoming
            </>
          ) : (
            <>
              <History className="w-4 h-4" />
              Show History
            </>
          )}
        </button>
      </div>

      {displaySessions.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600">
            {showHistory ? 'No past sessions found' : 'No upcoming sessions scheduled'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {displaySessions.map((session) => (
            <div key={session._id} className="border rounded-lg overflow-hidden bg-white shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{session.title}</h2>
                    <p className="text-gray-600">{session.subject}</p>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {session.level}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{session.description}</p>
                
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(session.scheduledDate)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{session.startTime} - {session.endTime}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{session.duration}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>{session.subject}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{session.language}</span>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t">
                {showHistory ? (
                  <button 
                    className="w-full px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
                    disabled
                  >
                    Session Completed
                  </button>
                ) : (
                  <button 
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed"
                    onClick={() => handleJoin(session.meetingId)}
                    disabled={!session.meetingId}
                  >
                    {session.meetingId ? 'Join Session' : 'Meeting ID Not Available'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default MentoringSessions;
