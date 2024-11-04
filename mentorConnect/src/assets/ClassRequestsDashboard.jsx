import { Calendar, CalendarDays, Check, Clock, Filter, Globe, GraduationCap, Search, X } from 'lucide-react';
import React, { useState } from 'react';

const ClassRequestsDashboard = () => {
  // Sample data - in real app this would come from an API
  const [requests, setRequests] = useState([
    {
      id: 1,
      topic: "Advanced JavaScript Concepts",
      description: "Looking to learn advanced JavaScript concepts including closures, promises, and async/await",
      subject: "Web Development",
      timeSlot: "Weekdays after 6 PM EST",
      duration: "1 hour",
      language: "English",
      level: "Intermediate",
      status: "pending",
      studentName: "Alex Johnson",
      requestDate: "2024-03-15"
    },
    {
      id: 2,
      topic: "Machine Learning Basics",
      description: "Want to understand fundamental concepts of ML and practical applications",
      subject: "Data Science",
      timeSlot: "Weekend mornings",
      duration: "2 hours",
      language: "English",
      level: "Beginner",
      status: "pending",
      studentName: "Sarah Chen",
      requestDate: "2024-03-16"
    },
    {
      id: 3,
      topic: "React Native Development",
      description: "Need help with building mobile apps using React Native",
      subject: "Mobile Development",
      timeSlot: "Flexible",
      duration: "1.5 hours",
      language: "Spanish",
      level: "Advanced",
      status: "pending",
      studentName: "Miguel Rivera",
      requestDate: "2024-03-14"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleAccept = (id) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'accepted' } : req
    ));
  };

  const handleReject = (id) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
  };

  const handleSchedule = (id) => {
    // In a real app, this would open a scheduling modal/form
    console.log('Schedule class for ID:', id);
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || req.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Class Requests Dashboard</h1>
        <p className="text-gray-600">Manage and respond to incoming class requests</p>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by topic or student name..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 h-5 w-5" />
          <select
            className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{request.topic}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{request.description}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <GraduationCap className="h-4 w-4 mr-2" />
                <span>{request.studentName}</span>
              </div>
            </div>

            {/* Card Details */}
            <div className="p-6 bg-gray-50 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-purple-500" />
                  {request.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Globe className="h-4 w-4 mr-2 text-purple-500" />
                  {request.language}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                  {request.timeSlot}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <GraduationCap className="h-4 w-4 mr-2 text-purple-500" />
                  {request.level}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between gap-2">
              {request.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="flex-1 px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-300"
                  >
                    <X className="h-4 w-4 inline-block mr-1" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="flex-1 px-4 py-2 bg-white text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors duration-300"
                  >
                    <Check className="h-4 w-4 inline-block mr-1" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleSchedule(request.id)}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                  >
                    <CalendarDays className="h-4 w-4 inline-block mr-1" />
                    Schedule
                  </button>
                </>
              )}
              {request.status !== 'pending' && (
                <button
                  onClick={() => handleSchedule(request.id)}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  <CalendarDays className="h-4 w-4 inline-block mr-1" />
                  Schedule Class
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-gray-500 mb-4">No class requests found</div>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassRequestsDashboard;