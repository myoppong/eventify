// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../services/api';

// export default function EventDetailPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     api
//       .get(`/events/${id}`)
//       .then((res) => setEvent(res.data.event))
//       .catch((err) => console.error('Failed to fetch event:', err));
//   }, [id]);

//   if (!event) return <p className="p-6">Loading…</p>;

//   const fmtDate = (iso) =>
//     new Date(iso).toLocaleDateString(undefined, {
//       month: 'long',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
//       <img
//         src={event.bannerImage}
//         alt={event.title}
//         className="w-full h-64 sm:h-96 object-cover rounded"
//       />

//       <h1 className="text-4xl font-bold mt-4">{event.title}</h1>
//       <p className="text-gray-600 mt-1">{event.category}</p>

//       <div className="mt-4 space-y-2">
//         <p>
//           <strong>When:</strong> {fmtDate(event.startDate)} – {fmtDate(event.endDate)}
//         </p>
//         <p>
//           <strong>Where:</strong> {event.location}
//         </p>
//         <p>
//           <strong>Organizer:</strong> {event.organizer.username} ({event.organizer.email})
//         </p>
//       </div>

//       <div className="mt-6">
//         <h2 className="text-2xl font-semibold mb-2">About this event</h2>
//         <p className="whitespace-pre-line">{event.description}</p>
//       </div>

//       {event.tickets?.length > 0 && (
//         <div className="mt-6">
//           <h2 className="text-2xl font-semibold mb-4">Tickets</h2>
//           <ul className="space-y-4">
//             {event.tickets.map((t) => (
//               <li key={t.id} className="p-4 border rounded flex justify-between items-center">
//                 <div>
//                   <p className="font-medium">{t.type}</p>
//                   <p>Price: ₵{t.price} • Available: {t.quantityAvailable}</p>
//                 </div>
//                 <button
//                   onClick={() => navigate(`/purchase/${t.id}`)}
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                   Buy Tickets
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="mt-6">
//         <h2 className="text-2xl font-semibold mb-2">Connect</h2>
//         <div className="flex space-x-4">
//           {event.socialLinks.facebook && (
//             <a href={event.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//               Facebook
//             </a>
//           )}
//           {event.socialLinks.instagram && (
//             <a href={event.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
//               Instagram
//             </a>
//           )}
//           {event.socialLinks.twitter && (
//             <a href={event.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
//               Twitter
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api
      .get(`/events/${id}`)            // <-- singular “event”
      .then((res) => setEvent(res.data.event))
      .catch((err) => console.error('Failed to fetch event:', err));
  }, [id]);

  if (!event) return <p className="p-6">Loading…</p>;

  const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <img
        src={event.bannerImage}
        alt={event.title}
        className="w-full h-96 object-cover rounded"
      />

      <h1 className="text-4xl font-bold mt-4">{event.title}</h1>
      <p className="text-gray-600 mt-1">{event.category}</p>

      <div className="mt-4 space-y-2">
        <p>
          <strong>When:</strong> {fmtDate(event.startDate)} – {fmtDate(event.endDate)}
        </p>
        <p>
          <strong>Where:</strong> {event.location}
        </p>
        <p>
          <strong>Organizer:</strong> {event.organizer.username} ({event.organizer.email})
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">About this event</h2>
        <p className="whitespace-pre-line">{event.description}</p>
      </div>

      {event.tickets && event.tickets.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Tickets</h2>
          <ul className="space-y-4">
            {event.tickets.map((t) => (
              <li
                key={t.id}
                className="flex justify-between p-4 border rounded items-center"
              >
                <div>
                  <p className="font-medium">{t.type}</p>
                  <p>
                    Price: ₵{t.price} • Available: {t.quantityAvailable}
                  </p>
                  {t.customFields?.length > 0 && (
                    <p>Custom: {t.customFields.join(', ')}</p>
                  )}
                </div>
                <button
                  onClick={() => navigate('/purchase', { state: { ticket: t } })}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Buy Ticket
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Connect</h2>
        <div className="flex space-x-4">
          {event.socialLinks.facebook && (
            <a
              href={event.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Facebook
            </a>
          )}
          {event.socialLinks.instagram && (
            <a
              href={event.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              Instagram
            </a>
          )}
          {event.socialLinks.twitter && (
            <a
              href={event.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Twitter
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
