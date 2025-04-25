import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <footer className="bg-indigo-600 text-white position- p-4 mt-auto">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-xl">
          <Link to="/">Evently</Link>
        </div>

        {/* Hamburger Button for Mobile */}
        <button className="md:hidden" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute bottom-16 left-0 right-0 bg-indigo-600 text-white p-4 space-y-4 md:hidden z-50">
          <Link to="/about" className="block hover:text-indigo-200" onClick={toggleMenu}>About</Link>
          <Link to="/contact" className="block hover:text-indigo-200" onClick={toggleMenu}>Contact</Link>
          <Link to="/privacy-policy" className="block hover:text-indigo-200" onClick={toggleMenu}>Privacy Policy</Link>
        </div>
      )}

      {/* Footer Links (Desktop version) */}
      <div className="hidden md:flex justify-center space-x-8 mt-4">
        <Link to="/about" className="hover:text-indigo-200">About</Link>
        <Link to="/contact" className="hover:text-indigo-200">Contact</Link>
        <Link to="/privacy-policy" className="hover:text-indigo-200">Privacy Policy</Link>
      </div>

      {/* Footer Copyright */}
      <div className="mt-4 text-center text-sm">
        &copy; 2025 Evently. All Rights Reserved.
      </div>
    </footer>
  );
}
