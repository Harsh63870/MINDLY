import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import ProfileDropdown from './ProfileDropdown';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">��</span>
            <span className="brand-text">Mindly</span>
          </Link>

          <div className="navbar-menu">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/mood-tracker" className="nav-link">Mood Tracker</Link>
                <Link to="/achievements" className="nav-link">Achievements</Link>
                <ProfileDropdown user={user} onLogout={handleLogout} />
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Button 
                  variant="primary" 
                  size="medium"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
