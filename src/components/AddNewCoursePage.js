
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_DOMAIN } from '../constants/endpoints';


const AddNewCoursePage = () => {
  const [formData, setFormData] = useState({
    course_name: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form data before submitting (email validation and date of birth validation)
      // Add the code for validation here

      await axios.post(`${API_DOMAIN}/courses`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Show a success toast notification upon successful submission
      toast.success('Course added successfully!');
      // Clear the form fields after successful submission
      setFormData({
        course_name: ''
      });
    } catch (error) {
      if (error.response) {
        // Show an error toast notification if the API returns an error message
        toast.error(error.response.data.error.message);
      } else {
        // Show a generic error toast notification if an unexpected error occurs
        toast.error('An error occurred while processing your request.');
      }
    }
  };

  return (
    <div>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit} >
        <div>
          <label style={{ marginRight: '5px' }} >Course Name:</label>
          <input type="text" name="course_name" value={formData.course_name} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCoursePage;




