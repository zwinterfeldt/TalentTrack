import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TalentTrack from './pages/TalentTrack/TalentTrack';  // Updated path
import LoginForm from './pages/LoginForm/LoginForm';
import SignupForm from './pages/SignupForm/SignupForm';


function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<TalentTrack />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element= {<SignupForm />} />
      </Routes>
    </Router>
  );
}

export default App;


