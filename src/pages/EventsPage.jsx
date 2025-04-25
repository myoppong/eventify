import React, { useEffect, useState } from 'react';
import EventCard2 from '../components/EventCard2';
import api from '../services/api';

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api
      .get('/events')
      .then((res) => setEvents(res.data.events))
      .catch((err) => console.error('Failed to fetch events:', err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Browse Events</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((evt) => (
          <EventCard2 key={evt.id} event={evt} />
        ))}
      </div>
    </div>
  );
}
