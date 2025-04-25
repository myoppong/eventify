// src/pages/MyTicketsPage.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TicketCard from '../components/TicketCard';

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/attendee/tickets/my')
      .then(({ data }) => setTickets(data.tickets || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading your tickets…</div>;
  if (!tickets.length)
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">
          You haven’t purchased any tickets yet.
        </p>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🎫 My Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tickets.map((t, i) => (
          <TicketCard key={i} ticket={t} />
        ))}
      </div>
    </div>
  );
}
