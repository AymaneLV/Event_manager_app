import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = '#7C4585' }) => {
  const sizeClasses = {
    small: 'loading-spinner--small',
    medium: 'loading-spinner--medium',
    large: 'loading-spinner--large'
  };

  return (
    <div className={`loading-spinner ${sizeClasses[size]}`}>
      <div className="loading-spinner__circle" style={{ borderColor: color }}></div>
    </div>
  );
};

export default LoadingSpinner;