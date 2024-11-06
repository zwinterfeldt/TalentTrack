import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TalentTrack from './pages/TalentTrack/TalentTrack';  
import LoginForm1 from './pages/LoginForm/LoginForm1';
import SignupForm1 from './pages/SignupForm/SignupForm1';
import Dashboard from './pages/Dashboard/Dashboard';
import SideBar from './components/SideBar';


function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<TalentTrack />} />
        <Route path="/login" element={<LoginForm1 />} />
        <Route path="/signup" element= {<SignupForm1 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;