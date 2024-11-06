import axios from 'axios';
import { Calendar, Check, Clock, Edit, Filter, Globe, GraduationCap, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const ClassRequestsDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  // Fetch class requests on component mount
  useEffect(() => {
    const fetchClassRequests = async () => {
      const email = "mentor@example.com"; // Placeholder email
      try {
        const response = await axios.get(`http://localhost:5000/request?email=${email}`);
        console.log(response.data);
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching class requests:", error);
      }
    };

    fetchClassRequests();
  }, []);

  const handleAccept = (id) => {
    console.log(id);
    setIsScheduleModalOpen(true);
    setSelectedRequestId(id);
    console.log(selectedRequestId);
  };

  const handleSchedule = async () => {
    if (selectedDate && selectedStartTime && selectedEndTime) {
      try {
        await axios.put(`http://localhost:5000/request/${selectedRequestId}`, {
          status: 'accepted',
          scheduledDate: selectedDate,
          startTime: selectedStartTime,
          endTime: selectedEndTime,
        });
        setRequests(requests.map(req =>
          req.id === selectedRequestId
            ? { ...req, status: 'accepted', scheduledDate: selectedDate, startTime: selectedStartTime, endTime: selectedEndTime }
            : req
        ));
        setIsScheduleModalOpen(false);
        resetScheduleForm();
        window.location.reload();

      } catch (error) {
        console.error("Error scheduling class request:", error);
      }
    }
  };

  const handleEdit = async (id) => {
    try {
      setIsEditModalOpen(true);
      setSelectedRequestId(id);
      const request = requests.find(req => req.id === id);
      setSelectedDate(request.scheduledDate);
      setSelectedStartTime(request.startTime);
      setSelectedEndTime(request.endTime);
    } catch (error) {
      console.error("Error fetching class request for editing:", error);
    }
  };

  const handleEditSubmit = async () => {
    if (selectedDate && selectedStartTime && selectedEndTime) {
      try {
        await axios.put(`http://localhost:5000/request/${selectedRequestId}`, {
          scheduledDate: selectedDate,
          startTime: selectedStartTime,
          endTime: selectedEndTime,
        });
        setRequests(requests.map(req =>
          req.id === selectedRequestId
            ? { ...req, scheduledDate: selectedDate, startTime: selectedStartTime, endTime: selectedEndTime }
            : req
        ));
        setIsEditModalOpen(false);
        resetScheduleForm();
      } catch (error) {
        console.error("Error updating class request:", error);
      }
    }
  };

  const handleReject = async (id) => {
    try {
        console.log(id);
      await axios.put(`http://localhost:5000/request/${id}`, {
        status: 'rejected',
        startTime: null,
        endTime: null,
      });
      setRequests(requests.map(req =>
        req._id === id ? { ...req, status: 'rejected', scheduledDate: null, startTime: null, endTime: null } : req
      ));
      window.location.reload();
    } catch (error) {
      console.error("Error rejecting class request:", error);
    }
  };

  const resetScheduleForm = () => {
    setSelectedDate(null);
    setSelectedStartTime('');
    setSelectedEndTime('');
    setSelectedRequestId(null);
  };

  const filteredRequests = requests.filter(req => {
    const matchesStatus = selectedStatus === 'all' || req.status === selectedStatus;
    return matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const formatScheduleInfo = (request) => {
    if (!request.scheduledDate || !request.startTime || !request.endTime) return null;
  
    // Convert scheduledDate to a Date object and format it
    const formattedDate = new Date(request.scheduledDate).toLocaleDateString("en-GB");
  
    return (
      <div className="mt-2 p-2 bg-purple-50 rounded-lg">
        <div className="text-sm font-medium text-purple-700">Scheduled for:</div>
        <div className="text-sm text-purple-600">
          Date: {formattedDate}
          <br />
          Time: {request.startTime} - {request.endTime}
        </div>
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Class Requests Dashboard</h1>
        <p className="text-gray-600">Manage and respond to incoming class requests</p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center gap-2">
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

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map((request) => (
          <div key={request._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{request.title}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{request.description}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <GraduationCap className="h-4 w-4 mr-2" />
                <span>{request.studentName}</span>
              </div>
              {formatScheduleInfo(request)}
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
                    onClick={() => handleReject(request._id)}
                    className="flex-1 px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-300"
                  >
                    <X className="h-4 w-4 inline-block mr-1" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleAccept(request._id)}
                    className="flex-1 px-4 py-2 bg-white text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors duration-300"
                  >
                    <Check className="h-4 w-4 inline-block mr-1" />
                    Accept
                  </button>
                </>
              )}
              {request.status === 'accepted' && (
                <button
                  onClick={() => handleEdit(request.id)}
                  className="flex-1 px-4 py-2 bg-white text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors duration-300"
                >
                  <Edit className="h-4 w-4 inline-block mr-1" />
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
            <h2 className="text-lg font-bold mb-4">Schedule Class</h2>
            <label className="block mb-2">
              Date
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              Start Time
              <input
                type="time"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                value={selectedStartTime}
                onChange={(e) => setSelectedStartTime(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              End Time
              <input
                type="time"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                value={selectedEndTime}
                onChange={(e) => setSelectedEndTime(e.target.value)}
              />
            </label>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSchedule}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
            <h2 className="text-lg font-bold mb-4">Edit Schedule</h2>
            <label className="block mb-2">
              Date
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              Start Time
              <input
                type="time"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                value={selectedStartTime}
                onChange={(e) => setSelectedStartTime(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              End Time
              <input
                type="time"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                value={selectedEndTime}
                onChange={(e) => setSelectedEndTime(e.target.value)}
              />
            </label>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassRequestsDashboard;