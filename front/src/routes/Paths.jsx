import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { RootContext } from './RootProvider';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Teacher from '../pages/Teacher';
import Student from '../pages/Student';
import Feedback from '../pages/Feedback';

function Paths() {
  const rootContext = useContext(RootContext);
  const user = rootContext.user;
  const userType = rootContext.typeUser;

  useEffect(() => {
    // Check if the user exists and navigate accordingly
    if (!user&& window.location.pathname !== '/login') {
      window.location.href = '/login'; // Use this approach for redirection
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        {userType === 'teacher' && <Route path="/teacher/*" element={<Teacher />} />}
        {userType === 'student' && <Route path="/student/*" element={<Student />} />}
        <Route path="/feedback/:activityId" element={<Feedback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add a default route that navigates to the login page */}
        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default Paths;
