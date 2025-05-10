import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ 
  eventId, 
  image, 
  tag, 
  title, 
  date, 
  price, 
  host, 
  followers 
}) => {
  return (
    <Link to={`/event/${eventId}`} className="event-card">
      <div className="event-card__image-container">
        <img 
          src={image || '/assets/images/event-placeholder.jpg'} 
          alt={title} 
          className="event-card__image"
        />
        <span className="event-card__tag">{tag}</span>
      </div>
      
      <div className="event-card__content">
        <h3 className="event-card__title">{title}</h3>
        <p className="event-card__date">{date}</p>
        <div className="event-card__price">{price === 0 ? 'Free' : `$${price}`}</div>
        
        <div className="event-card__host-info">
          <span className="event-card__host-name">{host}</span>
          <span className="event-card__followers">{followers} followers</span>
        </div>
        
        <button className="event-card__details-btn">View Details</button>
      </div>
    </Link>
  );
};

export default EventCard;