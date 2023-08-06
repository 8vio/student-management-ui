import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_DOMAIN } from '../constants/endpoints';

const AddNewResultPage = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    student_id: '',
    course_id: '',
    score: '',
  });

  useEffect(() => {
    // Fetch the list of students and courses when the component mounts
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_DOMAIN}/students`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_DOMAIN}/courses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.name === 'score' ? e.target.value : parseInt(e.target.value, 10);
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form data before submitting
      if (!formData.student_id || !formData.course_id || !formData.score) {
        toast.error('Please select a student, a course, and a score.');
        return;
      }

      await axios.post(`${API_DOMAIN}/results`, {
        cd_student: formData.student_id,
        cd_course: formData.course_id,
        score: formData.score,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Show a success toast notification upon successful submission
      toast.success('Result added successfully!');
      // Clear the form fields after successful submission
      setFormData({
        student_id: '',
        course_id: '',
        score: '',
      });
    } catch (error) {
      console.error('Error adding result:', error);
      // Show an error toast notification if the API returns an error message
      toast.error('An error occurred while adding the result.');
    }
  };

  return (
    <div>
      <h2>Add New Result</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ marginRight: '6px' }}>Student Name:</label>
          <select name="student_id" value={formData.student_id} onChange={handleChange}>
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id_student} value={student.id_student}>
                {`${student.first_name} ${student.family_name}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ marginRight: '12px' }}>Course Name:</label>
          <select name="course_id" value={formData.course_id} onChange={handleChange}>
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id_course} value={course.id_course}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ marginRight: '69px' }}>Score:</label>
          <select name="score" value={formData.score} onChange={handleChange}>
            <option value="">Select a score</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewResultPage;
