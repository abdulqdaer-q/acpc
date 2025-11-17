'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">{t('common.acpc')}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link href={`/${locale}/#about`} className="text-gray-700 hover:text-primary-600 transition">
              {t('nav.about')}
            </Link>
            <Link href={`/${locale}/#competition`} className="text-gray-700 hover:text-primary-600 transition">
              {t('nav.competition')}
            </Link>
            <Link href={`/${locale}/#schedule`} className="text-gray-700 hover:text-primary-600 transition">
              {t('nav.schedule')}
            </Link>
            <Link href={`/${locale}/#contact`} className="text-gray-700 hover:text-primary-600 transition">
              {t('nav.contact')}
            </Link>
            <LanguageSwitcher />
            <Link
              href={`/${locale}/auth/login`}
              className="text-primary-600 hover:text-primary-700 font-medium transition"
            >
              {t('nav.login')}
            </Link>
            <Link
              href={`/${locale}/auth/register`}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              {t('nav.register')}
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
              href={`/${locale}/#about`}
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
            >
              {t('nav.about')}
            </Link>
            <Link
              href={`/${locale}/#competition`}
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
            >
              {t('nav.competition')}
            </Link>
            <Link
              href={`/${locale}/#schedule`}
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
            >
              {t('nav.schedule')}
            </Link>
            <Link
              href={`/${locale}/#contact`}
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
            >
              {t('nav.contact')}
            </Link>
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
            <Link
              href={`/${locale}/auth/login`}
              className="block px-3 py-2 text-primary-600 hover:text-primary-700 font-medium transition"
            >
              {t('nav.login')}
            </Link>
            <Link
              href={`/${locale}/auth/register`}
              className="block px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-center"
            >
              {t('nav.register')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
