

// src/pages/CreateEventPage.jsx
import React from 'react';
import CreateEventForm from '../../components/CreateEventForm';

export default function CreateEventPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Create New Event</h1>
        <CreateEventForm />
      </div>
    </div>
  );
}

