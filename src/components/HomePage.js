import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <header style={{ background: '#333', color: '#fff', padding: '10px', textAlign: 'center' }}>
        <h1>Student Management System</h1>
      </header>
      <div style={{ display: 'flex' }}>
        {/* Left-side Menu */}
        <nav style={{ flex: '0 0 200px', backgroundColor: '#f0f0f0', padding: '10px' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <Link to="/home/add-student">Add New Student</Link>
            </li>
            <li>
              <Link to="/home/students-list">Students List</Link>
            </li>
            <li>
              <Link to="/home/add-course">Add New Course</Link>
            </li>
            <li>
              <Link to="/home/courses-list">Courses List</Link>
            </li>
            <li>
              <Link to="/home/add-result">Add New Result</Link>
            </li>
            <li>
              <Link to="/home/results-list">Results List</Link>
            </li>
          </ul>
        </nav>
        {/* Right-side Content Area */}
        <div style={{ flex: '1', padding: '20px' }}>
          <Outlet /> {/* This will render the nested routes inside the HomePage */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

