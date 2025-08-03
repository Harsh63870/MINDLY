import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <img src="/mindlylogo.png" alt="Mindly Logo" className="footer-logo" />
              <h3>Mindly</h3>
            </div>
            <p className="footer-description">
              Your gamified mental health companion. Track your mood, earn achievements, 
              and build better mental health habits.
            </p>
          </div>

          <div className="footer-section">
            <h4>Features</h4>
            <ul className="footer-links">
              <li><Link to="/mood-tracker">Mood Tracking</Link></li>
              <li><Link to="/achievements">Achievements</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#help">Help Center</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="#mental-health">Mental Health Resources</a></li>
              <li><a href="#crisis">Crisis Support</a></li>
              <li><a href="#community">Community</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2024 Mindly. All rights reserved.</p>
          </div>
          <div className="footer-social">
            <a href="#twitter" className="social-link">Twitter</a>
            <a href="#instagram" className="social-link">Instagram</a>
            <a href="#facebook" className="social-link">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;