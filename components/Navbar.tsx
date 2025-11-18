'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { api, User } from '@/lib/api';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await api.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    checkAuth();
  }, []);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Always on the LEFT */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center">
              <Image
                src="/images/logos/icpc-aleppo.svg"
                alt="ICPC Aleppo Logo"
                width={60}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-end gap-8">
            {/* Nav Links */}
            <div className="flex items-center gap-6">
              <Link href={`/${locale}`} className="text-gray-700 hover:text-primary-600 transition font-medium">
                {t('nav.home')}
              </Link>
              <Link href={`/${locale}/about`} className="text-gray-700 hover:text-primary-600 transition font-medium">
                {t('nav.about')}
              </Link>
              <Link href={`/${locale}/competition`} className="text-gray-700 hover:text-primary-600 transition font-medium">
                {t('nav.competition')}
              </Link>
              <Link href={`/${locale}/volunteering`} className="text-gray-700 hover:text-primary-600 transition font-medium">
                {t('nav.volunteering')}
              </Link>
              <Link href={`/${locale}/schedule`} className="text-gray-700 hover:text-primary-600 transition font-medium">
                {t('nav.schedule')}
              </Link>
              <Link href={`/${locale}/contact`} className="text-gray-700 hover:text-primary-600 transition font-medium">
                {t('nav.contact')}
              </Link>
            </div>

            {/* Profile/Auth Section - Always on the RIGHT */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition focus:outline-none"
                    >
                      <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.email?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.full_name_arabic || user.username}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <Link
                          href={`/${locale}/dashboard`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          {t('nav.dashboard')}
                        </Link>
                        <Link
                          href={`/${locale}/profile/edit`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          {t('nav.profile')}
                        </Link>
                        <button
                          onClick={async () => {
                            await api.logout();
                            setUser(null);
                            setIsProfileOpen(false);
                            router.push(`/${locale}`);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                        >
                          {t('nav.logout')}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </>
              )}
            </div>
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
              href={`/${locale}`}
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              href={`/${locale}/competition`}
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.competition')}
            </Link>
            <Link
              href={`/${locale}/volunteering`}
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.volunteering')}
            </Link>
            <Link
              href={`/${locale}/schedule`}
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.schedule')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
            {!loading && (
              <>
                {user ? (
                  <>
                    <div className="px-3 py-2 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.full_name_arabic || user.username}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      href={`/${locale}/dashboard`}
                      className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('nav.dashboard')}
                    </Link>
                    <Link
                      href={`/${locale}/profile/edit`}
                      className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('nav.profile')}
                    </Link>
                    <button
                      onClick={async () => {
                        await api.logout();
                        setUser(null);
                        setIsOpen(false);
                        router.push(`/${locale}`);
                      }}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700 transition"
                    >
                      {t('nav.logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href={`/${locale}/auth/login`}
                      className="block px-3 py-2 text-primary-600 hover:text-primary-700 font-medium transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      href={`/${locale}/auth/register`}
                      className="block px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('nav.register')}
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
