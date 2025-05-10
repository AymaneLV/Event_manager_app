import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/common/EventCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import './YourEvents.css';

// Dummy auth check
const isAdmin = true;

// Sample data
const sampleEvents = [
  {
    id: 1,
    title: "Summer Music Festival",
    date: "July 25, 2024",
    price: 49.99,
    tag: "Music",
    image: "/assets/images/event-placeholder.jpg",
    participants: 1200,
    earnings: 59988
  },
  {
    id: 2,
    title: "AI Conference 2024",
    date: "August 10, 2024",
    price: 149.99,
    tag: "Tech",
    image: "/assets/images/event-placeholder.jpg",
    participants: 850,
    earnings: 127485
  }
];

const YourEvents = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(sampleEvents);
      setLoading(false);
    }, 1000);
  }, []);

  if (!isAdmin) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div className="your-events">
      <div className="page-header">
        <h1>Your Events</h1>
        <p>Manage and track your event performance</p>
        <Link to="/create" className="btn-primary">Create New Event</Link>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <LoadingSpinner size="large" />
        </div>
      ) : events.length > 0 ? (
        <div className="events-grid">
          {events.map(event => (
            <EventCard 
              key={event.id} 
              eventId={event.id}
              title={event.title}
              date={event.date}
              price={event.price}
              tag={event.tag}
              image={event.image}
              host="Organizer Name"
              followers={Math.floor(Math.random() * 500)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No events found"
          message="You haven't created any events yet."
          buttonText="Create Your First Event"
          onButtonClick={() => window.location.href = '/create'}
        />
      )}
    </div>
  );
};

export default YourEvents;