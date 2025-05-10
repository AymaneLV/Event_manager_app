// src/pages/EventsByCategory.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard from '../components/common/EventCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import eventService from '../services/eventService'; // ✅ Default import

const EventsByCategory = () => {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const category = searchParams.get('category');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await eventService.getEvents({ category }); // ✅ Use as method
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load events');
        setLoading(false);
      }
    };

    if (category) {
      loadEvents();
    }
  }, [category]);

  if (loading) {
    return (
      <div className="events-by-category">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return <EmptyState title="Error" message={error} />;
  }

  return (
    <div className="events-by-category">
      <div className="page-header">
        <h1>Events in {category}</h1>
        <p>Explore all upcoming {category} events</p>
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
        <EmptyState 
          title="No Events Found" 
          message={`No ${category} events available at the moment`}
        />
      )}
    </div>
  );
};

export default EventsByCategory;