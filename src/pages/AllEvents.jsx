import React, { useState, useEffect } from 'react';
import EventCard from '../components/common/EventCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import eventService from '../services/eventService';

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAllEvents = async () => {
      try {
        const response = await eventService.getEvents(); // Fetches all events
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load events');
        setLoading(false);
      }
    };

    loadAllEvents();
  }, []);

  if (loading) {
    return (
      <div className="all-events">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return <EmptyState title="Error" message={error} />;
  }

  return (
    <div className="all-events">
      <div className="page-header">
        <h1>All Events</h1>
        <p>Discover upcoming events across all categories</p>
      </div>

      {events.length > 0 ? (
        <div className="events-grid">
          {events.map(event => (
            <EventCard 
              key={event._id || event.id}
              eventId={event._id || event.id}
              title={event.title}
              date={event.date}
              price={event.price}
              tag={event.category}
              image={event.image}
              host={event.organizer.name}
              followers={event.organizer.followers}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="No Events Found" message="No events available at the moment" />
      )}
    </div>
  );
};

export default AllEvents;