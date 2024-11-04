import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Import images
import availabilityIcon from '../Photos/availability.png';
import expertiseIcon from '../Photos/expertise.png';
import languageIcon from '../Photos/language.png';
import rupeeIcon from '../Photos/rupee.png';
import defaultProfileImage from '../Photos/Teacher.png'; // Fallback image for profile
import verifiedBadge from '../Photos/Verified.png';

function MentorProfiles() {
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/mentors/all'); // Ensure this API endpoint is correct
        setMentors(response.data);
      } catch (error) {
        console.error('Error fetching mentor profiles:', error);
      }
    };

    fetchMentors();
  }, []);

  // Function to handle the redirect to the Mentor Profile page
  const handleViewProfile = (mentorId) => {
    navigate(`/mentors/${mentorId}`); // Adjust the route as necessary
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-800">Our Expert Mentors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {mentors.map((mentor) => (
          <div
            key={mentor._id}
            className="border rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
          >
            {/* Profile Photo */}
            <img
              src={mentor.image ? `data:image/jpeg;base64,${mentor.image}` : defaultProfileImage}
              alt="Mentor"
              className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-blue-500 shadow-md"
            />

            {/* Title with Verified Badge */}
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{mentor.name}</h2>
              {mentor.isVerified && (
                <img
                  src={verifiedBadge}
                  alt="Verified"
                  className="w-5 h-5"
                />
              )}
            </div>

            {/* Details Section */}
            <div className="w-full text-left text-gray-600 space-y-3 text-lg">
              {/* Expertise */}
              <div className="flex items-center space-x-2">
                <img src={expertiseIcon} alt="Expertise" className="w-5 h-5" />
                <p>
                  {Array.isArray(mentor.professionalTitles) 
                    ? mentor.professionalTitles.map(title => title.expertise).join(', ') 
                    : 'N/A'}
                </p>
              </div>

              {/* Availability */}
              <div className="flex items-center space-x-2 text-lg">
                <img src={availabilityIcon} alt="Availability" className="w-5 h-5" />
                <p>{mentor.availability || 'N/A'}</p>
              </div>

              {/* Cost per Hour */}
              <div className="flex items-center space-x-2 text-lg">
                <img src={rupeeIcon} alt="Cost" className="w-5 h-5" />
                <p>{`${mentor.cost} per hour`}</p>
              </div>

              {/* Languages */}
              <div className="flex items-center space-x-2 text-lg">
                <img src={languageIcon} alt="Languages" className="w-5 h-5" />
                <p>
                  {Array.isArray(mentor.languagesSpoken) ? mentor.languagesSpoken.join(', ') : 'N/A'}
                </p>
              </div>
            </div>

            {/* View Profile Button */}
            <button 
              onClick={() => handleViewProfile(mentor._id)} // Call the handler with the mentor ID
              className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MentorProfiles;
