import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_DOMAIN } from '../constants/endpoints';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ResultsListPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch the list of results when the component mounts
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get(`${API_DOMAIN}/results`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };


  const handleDeleteResult = async (id) => {
    try {
      await axios.delete(`${API_DOMAIN}/results/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Update the list of results after successful deletion
      setResults(results.filter((result) => result.id_result !== id));
      // Show a success toast notification upon successful deletion
      toast.success('Result deleted successfully!');
    } catch (error) {
      console.error('Error deleting result:', error);
      // Show an error toast notification if the API returns an error message
      toast.error('An error occurred while deleting the result.');
    }
  };


  return (
    <div>
      <h2>Results List</h2>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Course</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Student</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Score</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id_result}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{`${result.course}`}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{`${result.student}`}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{`${result.score}`}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <button onClick={() => handleDeleteResult(result.id_result)} style={{  background: 'none', border: 'none', color: 'red', cursor: 'pointer',  fontSize: '1.4rem' }}>
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

export default ResultsListPage;
