// src/pages/organizer/EventDetails.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination } from 'flowbite-react';
import Loader from '../components/ui/Loader';
import api from '../services/api';
import { toast, Toaster } from 'react-hot-toast';

export default function EventDetail() {
  const { id: eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingAttendees, setLoadingAttendees] = useState(true);

  // Memoizing the headers object
  const headers = useMemo(() => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }), []); // Empty array means the headers will only be recalculated when localStorage changes

  // Fetch event overview
  useEffect(() => {
    api.get('/organizer/my-events/overview', { headers })
      .then(res => {
        const evt = res.data.events.find(e => e.eventId === eventId);
        setEvent(evt || {});
      })
      .catch(() => toast.error('Failed to load event info'))
      .finally(() => setLoading(false));
  }, [eventId, headers]); // 'headers' is now memoized, so it won't change unless localStorage changes

  // Fetch attendees on page change
  useEffect(() => {
    setLoadingAttendees(true);
    api.get(`/organizer/event/${eventId}/attendees`, {
      params: { page, perPage },
      headers,
    })
      .then(res => {
        const { attendees, total, perPage } = res.data; // Destructure response data
        setAttendees(attendees);
        setTotalPages(Math.ceil(total / perPage));
      })
      .catch(() => toast.error('Failed to load attendees'))
      .finally(() => setLoadingAttendees(false));
  }, [eventId, page, perPage, headers]); // 'headers' is memoized

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" />

      {/* Event Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold mb-2">{event?.title}</h1>
        <img src={event?.banner} alt={event?.title} className="w-full h-48 object-cover rounded" />
        <p className="mt-2 text-gray-600">
          Sold: {event?.ticketsSold} &nbsp;|&nbsp; Left: {event?.ticketsLeft}
        </p>
      </div>

      {/* Attendees Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Attendees</h2>
        {loadingAttendees ? (
          <Loader />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Ticket Type</th>
                    <th className="px-4 py-2 text-left">Ticket #</th>
                    <th className="px-4 py-2 text-left">Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((a, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-2">{a.email}</td>
                      <td className="px-4 py-2">{a.ticketType}</td>
                      <td className="px-4 py-2">{a.ticketNumber}</td>
                      <td className="px-4 py-2">{a.paymentStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={p => setPage(p)}
                showIcons
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
