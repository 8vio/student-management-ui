import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import AddNewStudentPage from './components/AddNewStudentPage';
import StudentsListPage from './components/StudentsListPage';
import AddNewCoursePage from './components/AddNewCoursePage';
import CoursesListPage from './components/CoursesListPage';
import AddNewResultPage from './components/AddNewResultPage';
import ResultsListPage from './components/ResultsListPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />}>
          <Route path="add-student" element={<AddNewStudentPage />} />
          <Route path="students-list" element={<StudentsListPage />} />
          <Route path="add-course" element={<AddNewCoursePage />} />
          <Route path="courses-list" element={<CoursesListPage />} />
          <Route path="add-result" element={<AddNewResultPage />} />
          <Route path="results-list" element={<ResultsListPage />} />
        </Route>
        {/* If no other route matches, redirect to /home */}
        <Route path="/*" element={<HomePage />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
}

export default App;
