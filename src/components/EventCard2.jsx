import React from 'react';
import { Link } from 'react-router-dom';

export default function EventCard2({ event }) {
  const {
    id,
    title,
    bannerImage,
    startDate,
    endDate,
    location,
    organizer: { username },
  } = event;

  const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <Link
      to={`/events/${id}`}
      className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200 bg-white"
    >
      <img
        src={bannerImage}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-1">
          {fmtDate(startDate)} &ndash; {fmtDate(endDate)}
        </p>
        <p className="text-sm text-gray-600 mb-2">{location}</p>
        <p className="text-sm text-gray-500">By {username}</p>
      </div>
    </Link>
  );
}
