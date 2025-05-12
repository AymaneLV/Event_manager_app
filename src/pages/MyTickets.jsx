import React, { useState, useEffect } from 'react';
import EventCard from '../components/common/EventCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import './MyTickets.css';

// Dummy auth check
const isAuthenticated = true;

// Sample data
const sampleTickets = [
  {
    id: 1,
    title: "Summer Music Festival",
    date: "July 25, 2024",
    price: 49.99,
    tag: "Music",
    image: "/assets/images/event-placeholder.jpg",
    host: "Eventify Team",
    followers: 250
  },
  {
    id: 2,
    title: "AI Conference 2024",
    date: "August 10, 2024",
    price: 149.99,
    tag: "Tech",
    image: "/assets/images/event-placeholder.jpg",
    host: "Tech Innovators",
    followers: 420
  }
];

const MyTickets = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTickets(sampleTickets);
      setLoading(false);
    }, 1000);
  }, []);

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div className="my-tickets">
      <div className="page-header">
        <h1>My Tickets</h1>
        <p>Manage your event registrations and tickets</p>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <LoadingSpinner size="large" />
        </div>
      ) : tickets.length > 0 ? (
        <div className="tickets-grid">
          {tickets.map(ticket => (
            <EventCard key={ticket.id} {...ticket} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No tickets found"
          message="You haven't registered for any events yet."
          buttonText="Browse Events"
          onButtonClick={() => window.location.href = '/'}
        />
      )}
    </div>
  );
};

export default MyTickets;