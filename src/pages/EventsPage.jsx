// import React, { useEffect, useState } from 'react';
// import EventCard2 from '../components/EventCard2';
// import api from '../services/api';

// export default function EventsPage() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     api
//       .get('/events')
//       .then((res) => setEvents(res.data.events))
//       .catch((err) => console.error('Failed to fetch events:', err));
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Browse Events</h1>
//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {events.map((evt) => (
//           <EventCard2 key={evt.id} event={evt} />
//         ))}
//       </div>
//     </div>
//   );
// }

// src/pages/EventsPage.jsx
import React, { useEffect, useState } from 'react';
import EventCard2 from '../components/EventCard2';
import api from '../services/api';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/events')
      .then((res) => setEvents(res.data.events))
      .catch((err) => console.error('Failed to fetch events:', err))
      .finally(() => setLoading(false));
  }, []);

  // Show loader while fetching
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Browse Events</h1>
      {events.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((evt) => (
            <EventCard2 key={evt.id} event={evt} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No events found.</p>
      )}
    </div>
  );
}
