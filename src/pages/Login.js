import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/user/login', userData);
      localStorage.setItem('token', response.data.token);
      alert('Successfully logged in!');
      navigate('/employees');
    } catch (err) {
      alert('Login error: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              name="username"
              className="form-control"
              placeholder="Enter username"
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
              placeholder="Enter password"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn-submit">Login</button>
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
