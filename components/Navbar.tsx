'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">ACPC</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#about" className="text-gray-700 hover:text-primary-600 transition">
              About
            </Link>
            <Link href="/#competition" className="text-gray-700 hover:text-primary-600 transition">
              Competition
            </Link>
            <Link href="/#schedule" className="text-gray-700 hover:text-primary-600 transition">
              Schedule
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-primary-600 transition">
              Contact
            </Link>
            <Link
              href="/auth/login"
              className="text-primary-600 hover:text-primary-700 font-medium transition"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link
              href="/#about"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
            >
              About
            </Link>
            <Link
              href="/#competition"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
            >
              Competition
            </Link>
            <Link
              href="/#schedule"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
            >
              Schedule
            </Link>
            <Link
              href="/#contact"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
            >
              Contact
            </Link>
            <Link
              href="/auth/login"
              className="block px-3 py-2 text-primary-600 hover:text-primary-700 font-medium transition"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="block px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-center"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
