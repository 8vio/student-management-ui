import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_DOMAIN } from '../constants/endpoints';

const LoginPage = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_DOMAIN}/login`, formData);
      const token = response.data.token;
      // Save the token to local storage or a state management library (e.g., Redux) for future API calls
      localStorage.setItem('token', token);
      // Navigate to the Home page on successful login
      navigate('/home');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error.message);
      } else {
        setErrorMessage('An error occurred while processing your request.');
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <header style={{ background: '#333', color: '#fff', padding: '10px', textAlign: 'center' }}>
        <h1>Student Management System</h1>
      </header>

      {/* Login Form */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ marginRight: '6px' }}>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div>
            <label style={{ marginRight: '10px' }}>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;


