import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard from '../components/common/EventCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import './SearchPage.css';
import eventService from '../services/eventService';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const query = searchParams.get('query') || '';

  useEffect(() => {
    const loadSearchResults = async () => {
      try {
        // ✅ Use eventService.getEvents instead of getEvents()
        const response = await eventService.getEvents({ search: query });
        setEvents(response.data);
      } catch (err) {
        setError('Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      loadSearchResults();
    } else {
      setEvents([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return <LoadingSpinner size="large" />;
  }

  if (error) {
    return <EmptyState title="Error" message={error} />;
  }

  return (
    <div className="search-page">
      <div className="page-header">
        <h1>Search Results for "{query}"</h1>
        <p>{events.length} events found</p>
      </div>

      {events.length > 0 ? (
        <div className="events-grid">
          {events.map(event => (
            <EventCard key={event._id || event.id} {...event} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Events Found"
          message="Try adjusting your search filters"
        />
      )}
    </div>
  );
};

export default SearchPage;