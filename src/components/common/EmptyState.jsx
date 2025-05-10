// src/components/common/EmptyState.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './EmptyState.css';

const EmptyState = ({ 
  title = "No results found", 
  message = "Try adjusting your search filters", 
  buttonText = "Clear Filters", 
  onButtonClick = () => {}
}) => {
  return (
    <div className="empty-state">
      <img 
        src="/assets/images/icons/empty-box.svg" 
        alt="No events found" 
        className="empty-state__image"
      />
      
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__message">{message}</p>
      
      {buttonText && (
        <Link to="/categories" className="empty-state__button">
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;