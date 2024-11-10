import axios from 'axios';
import { Book, Calendar, Clock, Globe, GraduationCap, MessageSquare, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ClassRequestForm = () => { // Accept mentorEmail as a prop
    const location = useLocation();
    const { mentorEmail } = location.state || {};
    console.log(mentorEmail);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    timeSlot: '',
    language: '',
    duration: '',
    level: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Retrieve student email from local storage
    const studentEmail = localStorage.getItem('Email');
    // const studentEmail = 'user@gmail.com'
    if (!studentEmail) {
      alert('Student email not found in local storage');
      return;
    }
    
    // Add both studentEmail and mentorEmail to the request data
    const requestData = {
      ...formData,
      studentEmail,
      mentorEmail, // Use mentorEmail prop
    };
    console.log(requestData);
    
    try {
      const response = await axios.post('http://localhost:5000/request/class-request', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      
        alert('Class request submitted successfully');
        // Clear form fields after successful submission
        setFormData({
          title: '',
          description: '',
          subject: '',
          timeSlot: '',
          language: '',
          duration: '',
          level: '',
        });
           
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the request');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
            Request a Learning Session
          </h1>
          <p className="mt-2 text-gray-600">Connect with expert mentors and accelerate your learning journey</p>
        </div>

        <div className="shadow-2xl backdrop-blur-sm bg-white/90 rounded-lg">
          <div className="space-y-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-t-lg p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                Class Request
              </h2>
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <p className="text-violet-50">
              Let us know your learning goals and preferences
            </p>
          </div>
          
          <div className="mt-6 px-4 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="group space-y-2 transition-all duration-300 hover:scale-[1.01]">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Book className="h-4 w-4 text-violet-500" />
                  Class Topic
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow hover:shadow-md"
                  placeholder="e.g., Advanced JavaScript Concepts"
                  required
                />
              </div>

              {/* Description Field */}
              <div className="group space-y-2 transition-all duration-300 hover:scale-[1.01]">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-violet-500" />
                  Tell Us What You'd Like to Learn
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow hover:shadow-md resize-none"
                  placeholder="Describe your learning objectives and any specific topics you'd like to cover..."
                  required
                />
              </div>

              {/* Two Column Layout for Shorter Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subject Field */}
                <div className="group space-y-2 transition-all duration-300 hover:scale-[1.01]">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Book className="h-4 w-4 text-violet-500" />
                    Subject Area
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow hover:shadow-md"
                    placeholder="e.g., Web Development"
                    required
                  />
                </div>

                {/* Time Slot Field */}
                <div className="group space-y-2 transition-all duration-300 hover:scale-[1.01]">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-violet-500" />
                    Preferred Time
                  </label>
                  <input
                    type="text"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow hover:shadow-md"
                    placeholder="e.g., Weekdays after 6 PM EST"
                    required
                  />
                </div>

                {/* Duration Field */}
                <div className="group space-y-2 transition-all duration-300 hover:scale-[1.01]">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-violet-500" />
                    Session Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow hover:shadow-md"
                    placeholder="e.g., 1 hour"
                    required
                  />
                </div>

                {/* Language Field */}
                <div className="group space-y-2 transition-all duration-300 hover:scale-[1.01]">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-violet-500" />
                    Preferred Language
                  </label>
                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow hover:shadow-md"
                    placeholder="e.g., English"
                    required
                  />
                </div>
              </div>

              {/* Experience Level Field */}
              <div className="group space-y-2 transition-all duration-300 hover:scale-[1.01]">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-violet-500" />
                  Your Current Level
                </label>
                <input
                  type="text"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow hover:shadow-md"
                  placeholder="e.g., Beginner, Intermediate, Advanced"
                  required
                />
              </div>
            </form>
          </div>

          <div className="bg-gray-50 rounded-b-lg p-6">
            <button
              type="submit"
              onClick={handleSubmit} // Call handleSubmit on button click
              className="w-full py-4 px-6 text-white bg-violet-600 hover:bg-violet-500 focus:ring-2 focus:ring-violet-300 rounded-md transition-colors duration-200"
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRequestForm;
