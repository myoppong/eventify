// src/components/ui/TeamMemberCard.jsx
import React from 'react';

export default function TeamMemberCard({ name, role, img }) {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
      <img
        src={img}
        alt={name}
        className="w-24 h-24 rounded-full mb-4 object-cover ring-4 ring-indigo-100"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
      <p className="text-gray-500">{role}</p>
    </div>
  );
}
