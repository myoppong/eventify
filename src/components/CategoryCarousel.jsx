// src/components/CategoryCarousel.jsx
import React from 'react';
import EventCard2 from './EventCard2'; // Import EventCard2

export default function CategoryCarousel({ events }) {
  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {events.map((event, index) => (
        <div key={index} className="flex-shrink-0 w-72">
          <EventCard2 event={event} />
        </div>
      ))}
    </div>
  );
}
