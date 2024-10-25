import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TalentTrack from './pages/TalentTrack/TalentTrack';  
import LoginForm from './pages/LoginForm/LoginForm';
import SignupForm from './pages/SignupForm/SignupForm';
import Dashboard from './pages/Dashboard/Dashboard';
import SideBar from './components/SideBar';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<TalentTrack />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element= {<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        
      </Routes>
    </Router>
  );
}

export default App;



