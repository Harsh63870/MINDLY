import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  return (
    <div className={`spinner-container spinner-${size}`}>
      <div className={`spinner spinner-${color}`}></div>
    </div>
  );
};

export default LoadingSpinner;
