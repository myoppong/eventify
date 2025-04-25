import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';

export default function TicketSuccessPage() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const { data } = await api.get(`/attendee/tickets/after-payment?reference=${reference}`);
        if (data.tickets?.length > 0) {
          setTicket(data.tickets[0]); // take the most recent ticket
        }
      } catch (err) {
        console.error('Error fetching ticket:', err);
      } finally {
        setLoading(false);
      }
    };

    if (reference) fetchTicket();
  }, [reference]);

  if (loading) return <div className="p-6">Loading your ticket…</div>;
  if (!ticket) return <div className="p-6 text-red-600">Ticket not found.</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4"> Your Ticket is Ready!</h1>
      <p><strong>Event:</strong> {ticket.event}</p>
      <p><strong>Type:</strong> {ticket.ticketType}</p>
      <p><strong>Date:</strong> {new Date(ticket.date).toLocaleString()}</p>
      <p><strong>Ticket Number:</strong> {ticket.ticketNumber}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Reference:</strong> {ticket.reference}</p>

      <div className="mt-4">
        <img src={ticket.qrCode} alt="QR Code" className="w-40 h-40" />
      </div>

      <button
        onClick={() => window.print()}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        🖨️ Print Ticket
      </button>
    </div>
  );
}
