import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { API_DOMAIN } from '../constants/endpoints';


const StudentsListPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch the list of students when the component mounts
    fetchStudents();
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

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`${API_DOMAIN}/students/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Update the list of students after successful deletion
      setStudents(students.filter((student) => student.id_student !== id));
      // Show a success toast notification upon successful deletion
      toast.success('Student deleted successfully!');
    } catch (error) {
      console.error('Error deleting student:', error);
      // Show an error toast notification if the API returns an error message
      toast.error('An error occurred while deleting the student.');
    }
  };

  return (
    <div>
      <h2>Students List</h2>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Name & Family name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>DOB</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id_student}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{`${student.first_name} ${student.family_name}`}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{student.date_birth}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{student.email_address}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <button onClick={() => handleDeleteStudent(student.id_student)} style={{  background: 'none', border: 'none', color: 'red', cursor: 'pointer',  fontSize: '1.4rem' }}>
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

export default StudentsListPage;
