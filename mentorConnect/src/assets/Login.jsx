import axios from 'axios';
import { Calendar, Lock, LogIn, Mail, Phone, User, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // To navigate programmatically
  const location = useLocation();  // Get location state passed by the Identity page

  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    dob: '',
    password: '',
    confirmPassword: '',
    role: ''  // Add role to formData
  });

  const [role, setRole] = useState('');  // This will store the role from Identity page

  useEffect(() => {
    // Get the role from location state passed by Identity page
    if (location.state && location.state.role) {
      console.log(location.state.role);
      setRole(location.state.role);  // Set the role if available
      setFormData((prevData) => ({
        ...prevData,
        role: location.state.role  // Set the role in formData
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
  
    try {
      const url = isSignUp ? 'http://localhost:5000/auth/signup' : 'http://localhost:5000/auth/login';
      const response = await axios.post(url, formData);
  
      if (isSignUp) {
        alert("Signup successful!");
      } else {
        const { token, email } = response.data;
  
        if (!email) {
          console.error("Email or role is missing in the response");
          return;
        }
  
        alert("Login successful!");
        console.log(token);
        localStorage.setItem('token', token);
        localStorage.setItem('Email', email);
  
        if (role === 'student') {
          navigate('/home');  // Redirect to home page for student
        } else if (role === 'mentor') {
          navigate('/mentor-Home');  // Redirect to mentor home page
        } else {
          console.error("Unknown role:", role);
        }
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data?.message || "An error occurred!");
      } else if (error.request) {
        alert("Network error, please try again.");
      } else {
        alert("An unexpected error occurred: " + error.message);
      }
    }
  };
  

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          {isSignUp ? 
            <UserPlus size={48} className="mx-auto text-blue-500" /> :
            <LogIn size={48} className="mx-auto text-blue-500" />
          }
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 w-full p-2 border rounded-lg"
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 w-full p-2 border rounded-lg"
                    placeholder="Phone Number"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="pl-10 w-full p-2 border rounded-lg"
                      placeholder="Age"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="pl-10 w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 w-full p-2 border rounded-lg"
                placeholder="Email address"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 w-full p-2 border rounded-lg"
                placeholder="Password"
                required
              />
            </div>

            {isSignUp && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border rounded-lg"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="relative w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSignUp ? (
                <UserPlus className="absolute left-4 text-white" size={20} />
              ) : (
                <LogIn className="absolute left-4 text-white" size={20} />
              )}
              <span className="ml-6">{isSignUp ? 'Sign Up' : 'Sign In'}</span>
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-500 flex items-center justify-center gap-2 mx-auto"
            >
              {isSignUp ? (
                <>
                  <LogIn size={16} />
                  <span>Already have an account? Sign In</span>
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  <span>Need an account? Sign Up</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
