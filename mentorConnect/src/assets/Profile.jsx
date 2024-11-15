import axios from 'axios';
import { useState } from 'react';
import HeaderMentor from "./HeaderMentor";

class MentorProfileData {
  constructor() {
    this.name = '';
    this.email = localStorage.getItem("Email");
    this.professionalTitles = [];
    this.educationalBackground = [];
    this.mentoringStyle = []; // New field for mentoring style
    this.availability = '';
    this.languagesSpoken = [];
    this.pastMentoringExperience = '';
    this.mentoringGoals = '';
    this.linkedInLink = ''; // New field for LinkedIn link
    this.blogLink = ''; // New field for blog link
    this.photo = null; // To handle the profile photo upload
    this.expertise = ''; // Add expertise field
    this.yearsOfExperience = ''; // Add yearsOfExperience field
    this.cost='';
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
  const mentorStyles = [
    "Goal-oriented",
    "Hands-on",
    "Career-focused",
    "Project-based",
    "Skill-development",
  ];
  const toggleMentoringStyle = (style) => {
    setFormData((prevData) => {
      const isSelected = prevData.mentoringStyle.includes(style); // Check if the style is already selected
      const updatedStyles = isSelected
        ? prevData.mentoringStyle.filter(s => s !== style) // Remove the style if it's already selected
        : [...prevData.mentoringStyle, style]; // Add the style if it's not selected
      
      return {
        ...prevData,
        mentoringStyle: updatedStyles, // Update the mentoringStyle in the formData
      };
    });
  };

  // Toggles checkbox selection
  <div className="col-span-5 p-4 bg-white rounded-md shadow-sm">
  <label className="block font-semibold mb-2">Select Mentoring Style</label>
  <div className="flex flex-wrap gap-2">
    {mentorStyles.map((style) => (
      <label key={style} className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.mentoringStyle.includes(style)}
          onChange={() => handleMentorStyleChange(style)}
          className="form-checkbox"
        />
        <span>{style}</span>
      </label>
    ))}
  </div>

  {/* Display Selected Mentoring Styles */}
  {formData.mentoringStyle.length > 0 && (
    <div className="mt-4 p-2 border border-gray-300 rounded-md bg-gray-100">
      <h2 className="font-semibold">Selected Mentoring Styles:</h2>
      <ul className="list-disc list-inside">
        {formData.mentoringStyle.map((style) => (
          <li key={style}>{style}</li>
        ))}
      </ul>
    </div>
  )}
</div>
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
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        photo: file, // Store the file directly
      }));
      
      // Create an image preview URL
      const previewUrl = URL.createObjectURL(file);
      // setImagePreview(previewUrl); // Set the image preview state
    }
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const email = localStorage.getItem("Email");// Retrieve email from local storage if needed
  
    const professionalTitlesArray = formData.professionalTitles.reduce((acc, title) => {
      if (title.expertise && title.years) {
        acc.push({
          years: title.years.toString(), // Ensure years is a string
          expertise: title.expertise      // Retain expertise as part of the object
        });
      }
      return acc;
    }, []);
    
  
    // Create the final data object for submission
    const updatedFormData = {
      ...formData,
      professionalTitles: professionalTitlesArray, // Assign the transformed professionalTitles object
      email: email, // Include email in the submission
    };
  
    console.log('Updated Form Data:', JSON.stringify(updatedFormData, null, 2)); // Log for verification
  
    try {
      const response = await axios.post('http://localhost:5000/mentors/upload', updatedFormData);
      console.log('Success:', response.data);
      alert('Posted successfully!');
      setFormData({
        name: "",
        email: "",
        professionalTitles: [],
        educationalBackground: [],
        mentoringStyle: [],
        availability: "",
        languagesSpoken: [],
        pastMentoringExperience: "",
        mentoringGoals: "",
        linkedInLink: "",
        blogLink: "",
        image: "",
        cost: ''
      });
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Error posting the profile!');
    }
  };
  
  return (
    <div>
      <HeaderMentor></HeaderMentor>
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
      <img src={URL.createObjectURL(formData.photo)}  alt="Profile" className="w-full h-full rounded-full" />
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
                // value={localStorage.getItem("mentorEmail")}
                value={localStorage.getItem("Email")}
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
            {/* <div className="mt-4">
      <label className="block font-semibold">Cost per Hour &#8377;</label>
      <input
        type="number"
        id="cost"
        value={formData.cost}
        onChange={handleChange}
        placeholder="Enter your hourly rate"
        className="w-full p-2 border border-gray-300 rounded-md mb-2"
      />
    </div> */}
    <div>
        <label className="block font-semibold">Cost per Hour &#8377;</label>
        <input
          type="number"
          name="cost" // Ensure the name matches
          value={formData.cost}
          onChange={handleChange}
          placeholder="Enter your hourly rate"
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
            <div className="col-span-5 p-4 bg-white rounded-md shadow-sm">
  <label className="block font-semibold mb-2">Select Mentoring Style</label>
  <div className="flex flex-wrap gap-2">
    {mentorStyles.map((style) => (
      <label key={style} className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.mentoringStyle.includes(style)}
          onChange={() => toggleMentoringStyle(style)} // Updated this line
          className="form-checkbox"
        />
        <span>{style}</span>
      </label>
    ))}
  </div>

  {/* Display Selected Mentoring Styles */}
  {formData.mentoringStyle.length > 0 && (
    <div className="mt-4 p-2 border border-gray-300 rounded-md bg-gray-100">
      <h2 className="font-semibold">Selected Mentoring Styles:</h2>
      <ul className="list-disc list-inside">
        {formData.mentoringStyle.map((style) => (
          <li key={style}>{style}</li>
        ))}
      </ul>
    </div>
  )}
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
    </div>
  );
};
// return (
//   <div>
//     <HeaderMentor />
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
//       <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="bg-blue-600 p-6 text-white">
//           <h1 className="text-3xl font-bold text-center">Mentor Profile</h1>
//           <p className="text-center text-blue-100 mt-2">Share your expertise and help others grow</p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
//           {/* First Column */}
//           <div className="col-span-1 space-y-6">
//             <div className="flex flex-col items-center">
//               <div
//                 className="w-40 h-40 rounded-full mb-4 cursor-pointer border-2 border-blue-200 hover:border-blue-400 transition-all flex items-center justify-center bg-blue-50"
//                 onClick={() => document.getElementById('photoInput').click()}
//               >
//                 {formData.photo ? (
//                   <img src={URL.createObjectURL(formData.photo)} alt="Profile" className="w-full h-full rounded-full object-cover" />
//                 ) : (
//                   <Camera className="w-12 h-12 text-blue-300" />
//                 )}
//               </div>
//               <input type="file" id="photoInput" onChange={handlePhotoChange} className="hidden" accept="image/*" />
//             </div>

//             <div className="space-y-4">
//               <div className="relative">
//                 <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
//                   <User className="w-4 h-4" />
//                   <span>Name</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter your name"
//                   required
//                   className="w-full p-2 pl-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div className="relative">
//                 <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
//                   <Mail className="w-4 h-4" />
//                   <span>Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value="mentor@gmail.com"
//                   onChange={handleChange}
//                   readOnly
//                   className="w-full p-2 pl-3 border border-gray-300 rounded-md bg-gray-50"
//                 />
//               </div>

//               <div className="relative">
//                 <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
//                   <Clock className="w-4 h-4" />
//                   <span>Availability</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="availability"
//                   value={formData.availability}
//                   onChange={handleChange}
//                   placeholder="Enter availability"
//                   className="w-full p-2 pl-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div className="relative">
//                 <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
//                   <DollarSign className="w-4 h-4" />
//                   <span>Cost per Hour ₹</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="cost"
//                   value={formData.cost}
//                   onChange={handleChange}
//                   placeholder="Enter your hourly rate"
//                   className="w-full p-2 pl-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Second Column */}
//           <div className="col-span-2 space-y-6">
//             <div>
//               <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
//                 <Briefcase className="w-4 h-4" />
//                 <span>Expertise</span>
//               </label>
//               <div className="flex space-x-2 mb-2">
//                 <input
//                   type="text"
//                   name="expertise"
//                   value={formData.expertise}
//                   onChange={handleChange}
//                   placeholder="Enter expertise"
//                   className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <input
//                   type="number"
//                   name="yearsOfExperience"
//                   value={formData.yearsOfExperience}
//                   onChange={handleChange}
//                   placeholder="Years"
//                   className="w-20 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleAddProfessionalTitle}
//                   className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//                 >
//                   <Plus className="w-5 h-5" />
//                 </button>
//               </div>
//               {formData.professionalTitles.length > 0 && (
//                 <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
//                   <div className="flex flex-wrap gap-2">
//                     {formData.professionalTitles.map((item, index) => (
//                       <div key={index} className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-md px-3 py-1">
//                         <Award className="w-4 h-4 text-blue-500" />
//                         <span>{item.expertise} ({item.years} years)</span>
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveField('professionalTitles', index)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div>
//               <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
//                 <Target className="w-4 h-4" />
//                 <span>Mentoring Style</span>
//               </label>
//               <div className="flex flex-wrap gap-3">
//                 {mentorStyles.map((style) => (
//                   <label key={style} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
//                     <input
//                       type="checkbox"
//                       checked={formData.mentoringStyle.includes(style)}
//                       onChange={() => toggleMentoringStyle(style)}
//                       className="form-checkbox text-blue-500 rounded"
//                     />
//                     <span className="text-sm">{style}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div>
//                 <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
//                   <GraduationCap className="w-4 h-4" />
//                   <span>Educational Background</span>
//                 </label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     id="educationInput"
//                     placeholder="Enter education"
//                     className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleAddEducation}
//                     className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//                   >
//                     <Plus className="w-5 h-5" />
//                   </button>
//                 </div>
//               {/* Education list rendering remains the same but with enhanced styling */}
//             </div>
//           </div>

//           {/* Third Column */}
//           <div className="col-span-2 space-y-6">
//             <div>
//               <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
//                 <Languages className="w-4 h-4" />
//                 <span>Languages Spoken</span>
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   id="languageInput"
//                   placeholder="Enter language"
//                   className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleAddLanguage}
//                   className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//                 >
//                   <Plus className="w-5 h-5" />
//                 </button>
//               </div>
//               {/* Languages list rendering remains the same but with enhanced styling */}
//             </div>

//             <div>
//               <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
//                 <Target className="w-4 h-4" />
//                 <span>Mentoring Goals</span>
//               </label>
//               <textarea
//                 name="mentoringGoals"
//                 value={formData.mentoringGoals}
//                 onChange={handleChange}
//                 placeholder="What are your mentoring goals?"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
//               />
//             </div>

//             <div>
//               <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
//                 <Linkedin className="w-4 h-4" />
//                 <span>LinkedIn Profile</span>
//               </label>
//               <input
//                 type="text"
//                 name="linkedInLink"
//                 value={formData.linkedInLink}
//                 onChange={handleChange}
//                 placeholder="Enter your LinkedIn profile URL"
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
//                 <Globe className="w-4 h-4" />
//                 <span>Blog Link</span>
//               </label>
//               <input
//                 type="text"
//                 name="blogLink"
//                 value={formData.blogLink}
//                 onChange={handleChange}
//                 placeholder="Enter your blog URL"
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           <div className="col-span-5 flex justify-center">
//             <button
//               type="submit"
//               className="flex items-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
//             >
//               <Save className="w-5 h-5" />
//               <span>Save Profile</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// );
// };
export default MentorProfile;

