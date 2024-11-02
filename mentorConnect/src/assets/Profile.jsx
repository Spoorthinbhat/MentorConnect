import React, { useState } from 'react';

class MentorProfileData {
  constructor() {
    this.name = '';
    this.email = '';
    this.professionalTitles = [];
    this.educationalBackground = [];
    this.mentoringStyle = ''; // New field for mentoring style
    this.availability = '';
    this.languagesSpoken = [];
    this.pastMentoringExperience = '';
    this.mentoringGoals = '';
    this.linkedInLink = ''; // New field for LinkedIn link
    this.blogLink = ''; // New field for blog link
    this.photo = null; // To handle the profile photo upload
  }

  addProfessionalTitle(expertise, years) {
    this.professionalTitles.push({ expertise, years });
  }

  removeProfessionalTitle(index) {
    this.professionalTitles.splice(index, 1);
  }

  addEducation(education) {
    this.educationalBackground.push(education);
  }

  removeEducation(index) {
    this.educationalBackground.splice(index, 1);
  }

  addLanguage(language) {
    this.languagesSpoken.push(language);
  }

  removeLanguage(index) {
    this.languagesSpoken.splice(index, 1);
  }
}

const MentorProfile = () => {
  const [formData, setFormData] = useState(new MentorProfileData());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddProfessionalTitle = () => {
    if (formData.expertise && formData.yearsOfExperience) {
      const newTitle = { expertise: formData.expertise, years: formData.yearsOfExperience };
      setFormData((prevData) => ({
        ...prevData,
        professionalTitles: [...prevData.professionalTitles, newTitle],
        expertise: '', // Clear input after adding
        yearsOfExperience: '', // Clear input after adding
      }));
    }
  };

  const handleRemoveField = (field, index) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      if (field === 'professionalTitles') {
        updatedData.professionalTitles.splice(index, 1);
      } else if (field === 'educationalBackground') {
        updatedData.educationalBackground.splice(index, 1);
      } else if (field === 'languagesSpoken') {
        updatedData.languagesSpoken.splice(index, 1);
      }
      return updatedData;
    });
  };

  const handleAddEducation = () => {
    const educationInput = document.getElementById("educationInput").value;
    if (educationInput) {
      setFormData((prevData) => ({
        ...prevData,
        educationalBackground: [...prevData.educationalBackground, educationInput],
      }));
      document.getElementById("educationInput").value = ''; // Clear input after adding
    }
  };

  const handleAddLanguage = () => {
    const languageInput = document.getElementById("languageInput").value;
    if (languageInput) {
      setFormData((prevData) => ({
        ...prevData,
        languagesSpoken: [...prevData.languagesSpoken, languageInput],
      }));
      document.getElementById("languageInput").value = ''; // Clear input after adding
    }
  };

  const handlePhotoChange = (e) => {
    setFormData((prevData) => ({ ...prevData, photo: URL.createObjectURL(e.target.files[0]) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="max-w-6xl w-full p-5 bg-blue-100 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Mentor Profile</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* First Column */}
          <div className="col-span-1 p-4 bg-white rounded-md shadow-sm">
            <div className="flex flex-col items-center mb-4">
              <div
                className="w-32 h-32 rounded-full mb-2 cursor-pointer border border-gray-300 flex items-center justify-center"
                onClick={() => document.getElementById('photoInput').click()} // Trigger file input on click
              >
                {formData.photo ? (
                  <img src={formData.photo} alt="Profile" className="w-full h-full rounded-full" />
                ) : (
                  <span className="text-gray-500">No Photo</span>
                )}
              </div>
              <input
                type="file"
                id="photoInput"
                onChange={handlePhotoChange}
                className="hidden" // Hide the input
                accept="image/*" // Accept only image files
              />
            </div>
            <div>
              <label className="block font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
            </div>
            <div>
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={localStorage.getItem("mentorEmail")}
                onChange={handleChange}
                placeholder="Enter your email"
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 mb-2"
              />
            </div>
            <div>
              <label className="block font-semibold">Availability</label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                placeholder="Enter availability"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
            </div>
          </div>

          {/* Second Column */}
          <div className="col-span-2 p-4 bg-white rounded-md shadow-sm">
            <div>
              <label className="block font-semibold">Expertise</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                  placeholder="Enter expertise"
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  placeholder="Years"
                  className="w-20 p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={handleAddProfessionalTitle}
                  className="py-2 bg-blue-500 text-white rounded-md text-xl px-3"
                >
                  +
                </button>
              </div>
              {formData.professionalTitles.length > 0 && (
                <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
                  <div className="flex flex-wrap space-x-2">
                    {formData.professionalTitles.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-2 py-1">
                        <span>{item.expertise} ({item.years} years)</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveField('professionalTitles', index)}
                          className="text-red-500"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="block font-semibold">Mentoring Style</label>
              <input
                type="text"
                name="mentoringStyle"
                value={formData.mentoringStyle}
                onChange={handleChange}
                placeholder="Enter mentoring style"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold">Educational Background</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="educationInput" // Set id to target this input
                  placeholder="Enter education"
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="py-2 bg-blue-500 text-white rounded-md text-xl px-3"
                >
                  +
                </button>
              </div>
              {formData.educationalBackground.length > 0 && (
                <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
                  <div className="flex flex-wrap space-x-2">
                    {formData.educationalBackground.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-2 py-1">
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveField('educationalBackground', index)}
                          className="text-red-500"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4">
              <label className="block font-semibold">Past Mentoring Experience</label>
              <textarea
                name="pastMentoringExperience"
                value={formData.pastMentoringExperience}
                onChange={handleChange}
                placeholder="Describe your past mentoring experience"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
            </div>
          </div>

          {/* Third Column */}
          <div className="col-span-2 p-4 bg-white rounded-md shadow-sm">
            <div className="mt-4">
              <label className="block font-semibold">Languages Spoken</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="languageInput" // Set id to target this input
                  placeholder="Enter language"
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="py-2 bg-blue-500 text-white rounded-md text-xl px-3"
                >
                  +
                </button>
              </div>
              {formData.languagesSpoken.length > 0 && (
                <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
                  <div className="flex flex-wrap space-x-2">
                    {formData.languagesSpoken.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-2 py-1">
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveField('languagesSpoken', index)}
                          className="text-red-500"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>



            <div className="mt-4">
              <label className="block font-semibold">Mentoring Goals</label>
              <textarea
                name="mentoringGoals"
                value={formData.mentoringGoals}
                onChange={handleChange}
                placeholder="What are your mentoring goals?"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold">LinkedIn Profile</label>
              <input
                type="text"
                name="linkedInLink"
                value={formData.linkedInLink}
                onChange={handleChange}
                placeholder="Enter your LinkedIn profile URL"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold">Blog Link</label>
              <input
                type="text"
                name="blogLink"
                value={formData.blogLink}
                onChange={handleChange}
                placeholder="Enter your blog URL"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
            </div>
          </div>

          <div className="col-span-5 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorProfile;
