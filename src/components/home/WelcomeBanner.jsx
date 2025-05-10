// src/components/home/WelcomeBanner.jsx
import React from 'react';
import EventCard from '../common/EventCard';
import './WelcomeBanner.css';

// Sample data
const recentEvents = [
  {
    eventId: 1,
    image: '/assets/images/event-placeholder.jpg',
    tag: 'Music',
    title: 'Summer Music Festival',
    date: 'July 25, 2024',
    price: 49.99,
    host: 'Eventify Team',
    followers: 250
  },
  {
    eventId: 2,
    image: '/assets/images/event-placeholder.jpg',
    tag: 'Tech',
    title: 'AI Conference 2024',
    date: 'August 10, 2024',
    price: 149.99,
    host: 'Tech Innovators',
    followers: 420
  },
  {
    eventId: 3,
    image: '/assets/images/event-placeholder.jpg',
    tag: 'Art',
    title: 'Modern Art Exhibition',
    date: 'September 5, 2024',
    price: 25.00,
    host: 'Art Collective',
    followers: 180
  }
];

const WelcomeBanner = () => {
  return (
    <section className="welcome-banner">
      {/* Background Image */}
      <div className="welcome-banner__background">
        <img 
          src="/assets/images/banner_event.jpg" 
          alt="Welcome Banner" 
          className="welcome-banner__image"
        />
        <div className="welcome-banner__overlay"></div>
      </div>

      {/* Content (Text + Cards) */}
      <div className="welcome-banner__content">
        <h1 className="welcome-banner__title">Discover Amazing Events</h1>
        <p className="welcome-banner__subtitle">
          Find events near you or organize your own with Eventify
        </p>
        
        <div className="welcome-banner__events">
          {recentEvents.map(event => (
            <EventCard key={event.eventId} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;