// src/components/AccountDropdown.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Avatar, Button } from 'flowbite-react';
import LogoutButton from './LogoutButton';

export default function AccountDropdown() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role'); // 'attendee' or 'organizer'
  const loggedIn = Boolean(username);

  // Derive initials for avatar (e.g. "Jane Doe" → "JD")
  const initials = username
    ? username
        .split(' ')
        .map(n => n[0]?.toUpperCase())
        .join('')
        .slice(0, 2)
    : '';

  if (!loggedIn) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          color="light"
          size="sm"
          onClick={() => navigate('/login')}
        >
          Sign In
        </Button>
        <Button
          onClick={() => navigate('/signup')}
          size="sm"
        >
          Sign Up
        </Button>
      </div>
    );
  }

  return (
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={
        <Avatar
          rounded={true}
          placeholderInitials={initials}
          size="sm"
        />
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">Signed in as</span>
        <span className="block text-sm font-semibold truncate">
          {username}
        </span>
      </Dropdown.Header>

      <Dropdown.Item as={Link} to="/profile">
        Profile
      </Dropdown.Item>

      {role === 'attendee' && (
        <Dropdown.Item as={Link} to="/my-tickets">
          My Tickets
        </Dropdown.Item>
      )}

      {role === 'organizer' && (
        <Dropdown.Item as={Link} to="/organizer/dashboard">
          My Events
        </Dropdown.Item>
      )}

      <Dropdown.Divider />

      <Dropdown.Item>
        <LogoutButton />
      </Dropdown.Item>
    </Dropdown>
  );
}
