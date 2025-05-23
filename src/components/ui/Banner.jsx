// src/components/Banner.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl mb-8">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1549921296-3a6b5e07b9c4?auto=format&fit=crop&w=1350&q=80"
        alt="Event Banner"
        className="w-full h-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-2">
          Find Events That Excite You
        </h1>
        <p className="text-white text-md md:text-lg mb-4 max-w-xl">
          Explore music festivals, business conferences, workshops, and more
          happening near you.
        </p>

        {/* Make the Link itself look and behave like a button */}
        <Link
          to="/events"
          className="z-10 inline-block bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Explore Now
        </Link>
      </div>
    </div>
  );
}
