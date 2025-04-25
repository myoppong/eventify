// src/components/ui/CategoryCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
export default function CategoryCard({ name, image }) {
  return (
    <Link to={`/events?category=${name.toLowerCase()}`} className="block overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
      <img src={image} alt={name} className="w-full h-36 object-cover" />
      <div className="p-4 bg-white">
        <h4 className="text-lg font-medium">{name}</h4>
      </div>
    </Link>
  );
}