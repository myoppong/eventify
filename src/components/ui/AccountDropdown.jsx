// src/components/ui/AccountDropdown.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Avatar, Button } from 'flowbite-react';
import LogoutButton from './LogoutButton';
import { getUserFromToken } from '../../utils/authHelpers';

export default function AccountDropdown() {
  const navigate = useNavigate();
  const user = getUserFromToken();              // decode JWT
  const loggedIn = Boolean(user);

  // Derive initials for avatar (e.g. "Jane Doe" → "JD")
  const initials = user?.username
    ? user.username
        .split(' ')
        .map(n => n[0]?.toUpperCase())
        .join('')
        .slice(0, 2)
    : '';

  // Not logged in: show Sign In / Sign Up
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
          size="sm"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
      </div>
    );
  }

  // Logged-in: show avatar dropdown
  return (
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={
        <Avatar
          rounded
          placeholderInitials={initials}
          size="sm"
        />
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">Signed in as</span>
        <span className="block text-sm font-semibold truncate">
          {user.username}
        </span>
      </Dropdown.Header>

      <Dropdown.Item as={Link} to="/profile">
        Profile
      </Dropdown.Item>

      {user.role === 'attendee' && (
        <Dropdown.Item as={Link} to="/my-tickets">
          My Tickets
        </Dropdown.Item>
      )}

      {user.role === 'organizer' && (
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
