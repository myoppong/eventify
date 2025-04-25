// src/components/EventCard.jsx
import React from 'react';


export default function EventCard({
  bannerUrl = 'https://via.placeholder.com/400x300?text=No+Image',
  title = 'Untitled Event',
  sold = 0,
  remaining = 0,
  onClick = () => {},
  onEdit,
  onDelete,
}) {
  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md bg-white transition-shadow duration-200 hover:shadow-xl"
    >
      {/* Event Image */}
      <img
        src={bannerUrl}
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Event Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {sold} sold &middot; {remaining} remaining
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={e => { e.stopPropagation(); onEdit(); }}
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={e => { e.stopPropagation(); onDelete(); }}
              className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
