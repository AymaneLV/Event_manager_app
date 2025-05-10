import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import RatingStars from '../components/common/RatingStars.jsx';
import './EventDetail.css';

// Dummy event data (will be fetched from API)
const dummyEventData = {
  id: 1,
  title: "Summer Music Festival",
  description: "Join us for the biggest music festival of the summer with top artists and food trucks!",
  date: "July 25, 2024",
  time: "12:00 PM - 10:00 PM",
  location: "Central Park, New York",
  price: 49.99,
  category: "Music",
  organizer: {
    name: "Eventify Team",
    followers: 250,
    rating: 4.7
  },
  participants: 1200,
  earnings: 59988,
  image: "/assets/images/event-placeholder.jpg"
};

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOrganizer, setIsOrganizer] = useState(false); // Dummy auth check

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvent(dummyEventData);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="event-detail">
        <div className="event-detail__loading">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="event-detail">
      <div className="event-detail__container">
        <div className="event-detail__header">
          <img 
            src={event.image} 
            alt={event.title} 
            className="event-detail__image"
          />
          <div className="event-detail__info">
            <span className="event-detail__tag">{event.category}</span>
            <h1 className="event-detail__title">{event.title}</h1>
            <div className="event-detail__meta">
              <div className="event-meta-item">
                <img src="/assets/images/icons/calendar.svg" alt="Date" />
                <span>{event.date} • {event.time}</span>
              </div>
              <div className="event-meta-item">
                <img src="/assets/images/icons/location.svg" alt="Location" />
                <span>{event.location}</span>
              </div>
              <div className="event-meta-item">
                <strong>{event.price === 0 ? "FREE" : `$${event.price}`}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="event-detail__content">
          <p className="event-detail__description">{event.description}</p>
          
          <div className="event-detail__organizer">
            <h3>Organized by: {event.organizer.name}</h3>
            <div className="event-detail__organizer-stats">
              <span>{event.organizer.followers} followers</span>
              <RatingStars rating={event.organizer.rating} />
            </div>
          </div>
        </div>

        <div className="event-detail__actions">
          <Link to="/login" className="btn-primary">
            Register Now
          </Link>
          
          {isOrganizer && (
            <div className="event-detail__stats">
              <h4>Organizer Stats</h4>
              <div className="event-stats">
                <div className="event-stat">
                  <strong>{event.participants}</strong>
                  <span>Participants</span>
                </div>
                <div className="event-stat">
                  <strong>${event.earnings}</strong>
                  <span>Total Earnings</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;