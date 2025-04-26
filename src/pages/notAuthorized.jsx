// pages/NotAuthorized.jsx
// import { useNavigate } from "react-router-dom";

// export default function NotAuthorized() {
//   const navigate = useNavigate();
//   return (
//     <div style={{ padding: "2rem", textAlign: "center" }}>
//       <h1> Not Authorized</h1>
//       <p>You don't have permission to view this page.</p>
//       <button onClick={() => navigate(-1)} style={{ marginTop: "1rem" }}>
//         Go Back
//       </button>
//     </div>
//   );
// }


// src/pages/NotAuthorized.jsx
import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function NotAuthorized() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Determine suggested role based on attempted path
  let suggestedRole = null;
  if (pathname.startsWith('/organizer')) {
    suggestedRole = 'organizer';
  } else if (
    pathname.startsWith('/attendee') ||
    pathname.startsWith('/my-tickets')
  ) {
    suggestedRole = 'attendee';
  }

  // Capitalize first letter for display
  const roleDisplay =
    suggestedRole &&
    suggestedRole.charAt(0).toUpperCase() + suggestedRole.slice(1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-4xl font-semibold mb-4 text-red-600">Not Authorized</h1>
      <p className="mb-6 text-lg text-gray-700">
        You don’t have permission to view <span className="font-mono">{pathname}</span>.
      </p>

      {suggestedRole ? (
        <p className="mb-4 text-gray-800">
          Please{' '}
          <Link
            to={`/login?role=${suggestedRole}`}
            className="text-blue-600 underline hover:text-blue-800"
          >
            log in as {roleDisplay}
          </Link>{' '}
          to continue.
        </p>
      ) : (
        <p className="mb-4 text-gray-800">
          Please log in as an{' '}
          <Link
            to="/login?role=attendee"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Attendee
          </Link>{' '}
          or{' '}
          <Link
            to="/login?role=organizer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Organizer
          </Link>{' '}
          to continue.
        </p>
      )}

      <div className="flex space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Go Back
        </button>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
