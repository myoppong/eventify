// src/components/NavBar.jsx
import React from 'react';
import { Navbar, Dropdown, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../utils/authHelpers';
import LogoutButton from './ui/LogoutButton';

export default function AppNavbar() {
  return (
    <Navbar
      fluid
      rounded
      className="bg-white shadow-lg sticky top-0 z-50 px-6 py-3"
    >
      {/* Brand */}
      <Navbar.Brand>
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo192.png"
            alt="Evently Logo"
            className="h-8 w-8"
          />
          <span className="text-2xl font-bold text-indigo-600">Evently</span>
        </Link>
      </Navbar.Brand>

      {/* Right side: Create Event & Mobile Toggle */}
      <div className="flex items-center md:order-2 space-x-4">
        <Link
          to="/create-event"
          className="hidden md:inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Create Event
        </Link>
        <Navbar.Toggle className="text-indigo-600 hover:text-indigo-800 focus:ring-2 focus:ring-indigo-300" />
      </div>

      {/* Center: Navigation Links */}
      <Navbar.Collapse className="justify-center space-y-0 md:space-y-0 md:space-x-6">
        <Navbar.Link as={Link} to="/" className="hover:text-indigo-600">
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/events" className="hover:text-indigo-600">
          Events
        </Navbar.Link>
        <Navbar.Link as={Link} to="/organizer/dashboard" className="hover:text-indigo-600">
          Organizer
        </Navbar.Link>
        <Navbar.Link as={Link} to="/my-tickets" className="hover:text-indigo-600">
          My Tickets
        </Navbar.Link>

        {/* Account Dropdown */}
        <Dropdown label="Account" arrowIcon={false} inline={true} className="text-gray-700 hover:text-indigo-600">
          <Dropdown.Header>
            <span className="block text-sm">Signed in as</span>
            <span className="block text-sm font-medium truncate">
              {isLoggedIn() ? localStorage.getItem('username') : 'Guest'}
            </span>
          </Dropdown.Header>
          <Dropdown.Item as={Link} to="/profile">
            Profile
          </Dropdown.Item>
          {isLoggedIn() && (
            <Dropdown.Item>
              <LogoutButton />
            </Dropdown.Item>
          )}
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}
