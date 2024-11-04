import axios from 'axios';
import {
    Clock,
    Globe,
    GraduationCap,
    IndianRupee,
    Lightbulb,
    Newspaper,
    Target,
    Users
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function MentorProfilePage() {
    const navigate = useNavigate();
    const { id: mentorId } = useParams();
    console.log(mentorId);
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/mentors/${mentorId}`);
        setMentor(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [mentorId]);

  const handleRequestClass = () => {
    // Logic for requesting a class with the mentorId
    console.log("Requesting class with mentor ID:", mentorId);
    navigate('/request-class', { state: { mentorEmail: mentor.email } });
    // You can navigate to another page or show a modal here
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!mentor) return null; // Ensure mentor data is loaded before rendering

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section with Gradient Background */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl mb-8 p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center md:space-x-6">
              <div className="relative">
                <img
                  src="/api/placeholder/120/120"
                  alt={mentor.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-400 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
              <div className="text-center md:text-left mt-4 md:mt-0">
                <h1 className="text-3xl font-bold text-white mb-1">{mentor.name}</h1>
                <p className="text-indigo-100">{mentor.email}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {mentor.professionalTitles.map((title, index) => (
                    <span key={index} className="bg-indigo-500 bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {title.expertise} • {title.years} years
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 md:mt-0">
              <div className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl flex items-center">
                <IndianRupee className="w-5 h-5 mr-2" />
                <span className="text-xl font-semibold">₹{mentor.cost}/hour</span>
              </div>
              <button
                onClick={handleRequestClass}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Request Class
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Educational Background */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-200 hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Educational Background</h2>
              </div>
              <div className="space-y-4">
                {mentor.educationalBackground.map((edu, index) => (
                  <div key={index} className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <p className="text-purple-900">{edu}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentoring Style */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-200 hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Mentoring Style</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {mentor.mentoringStyle.map((style, index) => (
                  <span key={index} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm">
                    {style}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-200 hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Languages</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {mentor.languagesSpoken.map((lang, index) => (
                  <span key={index} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Mentoring Experience */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-200 hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-rose-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-rose-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Mentoring Experience</h2>
              </div>
              <p className="text-gray-700 mb-6">{mentor.pastMentoringExperience}</p>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Mentoring Goals</h3>
              </div>
              <p className="text-gray-700">{mentor.mentoringGoals}</p>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-200 hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Availability</h2>
              </div>
              <p className="text-gray-700">{mentor.availability}</p>
            </div>

            {/* Professional Links */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-200 hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-sky-100 p-3 rounded-lg">
                  <Newspaper className="w-6 h-6 text-sky-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Professional Links</h2>
              </div>
              <div className="space-y-2">
                <a href={mentor.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  LinkedIn Profile
                </a>
                {mentor.blog && (
                  <a href={mentor.blog} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Blog
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
