import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_DOMAIN } from '../constants/endpoints';
import regexValidation from '../constants/regexValidation';
import { parseISO, differenceInYears } from 'date-fns';

const AddNewStudentPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    family_name: '',
    date_birth: '',
    email_address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation using a regular expression
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexValidation.emailValidation.test(formData.email_address)) {
      toast.error('Invalid email address. Please enter a valid email.');
      return;
    }


    // Date of birth validation
    const currentDate = new Date();
    const birthDate = parseISO(formData.date_birth);

    // Calculate the age in years
    const age = differenceInYears(currentDate, birthDate);

    // Check if the student is at least 10 years old
    if (age < 10) {
    toast.error('Invalid date of birth. The student must be at least 10 years old.');
    return;
    }

    try {
      await axios.post(`${API_DOMAIN}/students`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Show a success toast notification upon successful submission
      toast.success('Student added successfully!');
      // Clear the form fields after successful submission
      setFormData({
        first_name: '',
        family_name: '',
        date_birth: '',
        email_address: '',
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
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ marginRight: '30px' }}>First Name:</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
        </div>
        <div>
          <label style={{ marginRight: '15px' }}>Family Name:</label>
          <input type="text" name="family_name" value={formData.family_name} onChange={handleChange} />
        </div>
        <div>
          <label style={{ marginRight: '17px' }}>Date of Birth:</label>
          <input type="date" name="date_birth" value={formData.date_birth} onChange={handleChange} />
        </div>
        <div>
          <label style={{ marginRight: '7px' }}>Email Address:</label>
          <input type="text" name="email_address" value={formData.email_address} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewStudentPage;


