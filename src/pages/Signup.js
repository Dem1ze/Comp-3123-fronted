import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signup.css';

const Signup = () => {
  const [userDetails, setUserDetails] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/user/signup', userDetails);
      alert('Account created successfully!');
      navigate('/login');
    } catch (err) {
      alert('Error during signup: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <h2>Create an Account</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              name="username"
              className="form-control"
              placeholder="Enter your username"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Choose a password"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn-signup">Sign Up</button>
            <button type="button" className="btn-back-to-login" onClick={handleNavigateToLogin}>
              Go to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
