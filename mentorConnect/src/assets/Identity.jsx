import React from 'react';
import student from '../Photos/Student.png';
import teacher from '../Photos/Teacher.png';

export const Identity = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-8xl text-white mb-20">Who Are You?</h1>
      <div className="flex space-x-12">
        {/* Mentor Option */}
        <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
          <img src={teacher} alt="Mentor" className="w-60 h-60 rounded-full object-cover mb-4" />
          <p className="text-white text-4xl font-medium">Mentor</p>
        </div>

        {/* Student Option */}
        <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
          <img src={student} alt="Student" className="w-60 h-60 rounded-full object-cover mb-4" />
          <p className="text-white text-4xl font-medium">Student</p>
        </div>
      </div>
    </div>
  );
};

export default Identity;