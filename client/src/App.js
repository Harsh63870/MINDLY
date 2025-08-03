import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from './pages/Profile';
import MoodTracker from './components/MoodTracker';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import './styles/main.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mood-tracker" element={<MoodTracker />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;