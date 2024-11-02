import axios from 'axios'; // Import Axios
import React, { useState } from 'react';
import background from '../Photos/Background-overlay.png';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(true); // Toggling between Sign Up and Login
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const url = isSignUp ? 'http://localhost:5000/auth/signup' : 'http://localhost:5000/auth/login'; // Adjust the URL based on your backend
      // Adjust the URL based on your backend
      const response = await axios.post(url, formData);

      if (isSignUp) {
        alert("Signup successful!");
        // Optionally, navigate to the Identity component or another page
        // navigate('/identity');
      } else {
        alert("Login successful!");
        // Store the JWT token in local storage or a global state
        localStorage.setItem('token', response.data.token);
        // Optionally, navigate to another page
        // navigate('/dashboard');
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${background})` }}>
      <form className="login-form w-1/4" onSubmit={handleSubmit}>
        <h1 className='text-3xl text-center text-black-500 font-bold'>
          {isSignUp ? 'Sign Up' : 'Login'}
        </h1>

        {isSignUp && (
          <>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                required
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        {isSignUp && (
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>
        )}

        <button type="submit">Submit</button>

        {/* Toggle between Sign Up and Login */}
        <p className="text-center mt-4">
          {isSignUp ? (
            <>
              Already an existing user?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsSignUp(false)}
              >
                Log In
              </span>
            </>
          ) : (
            <>
              New user?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
