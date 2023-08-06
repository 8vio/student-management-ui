import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { API_DOMAIN } from '../constants/endpoints';

const CoursesListPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the list of courses when the component mounts
    fetchCourses();
  }, []);

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

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`${API_DOMAIN}/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Update the list of courses after successful deletion
      setCourses(courses.filter((courses) => courses.id_course !== id));
      // Show a success toast notification upon successful deletion
      toast.success('Course deleted successfully!');
    } catch (error) {
      console.error('Error deleting course:', error);
      // Show an error toast notification if the API returns an error message
      toast.error('An error occurred while deleting the course.');
    }
  };

  return (
    <div>
      <h2>Courses List</h2>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Course Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id_course}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{`${course.course_name}`}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <button onClick={() => handleDeleteCourse(course.id_course)} style={{  background: 'none', border: 'none', color: 'red', cursor: 'pointer',  fontSize: '1.4rem' }}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesListPage;
