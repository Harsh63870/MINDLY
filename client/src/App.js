import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Place these imports here:
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";

// ...rest of your App.js code
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;