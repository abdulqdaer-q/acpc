'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { api, User } from '@/lib/api';

export default function Dashboard() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('dashboard');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await api.getCurrentUser();

      if (!currentUser) {
        router.push(`/${locale}/auth/login`);
      } else {
        // Check if profile is completed
        if (!currentUser.profile_completed) {
          router.push(`/${locale}/profile/complete`);
          return;
        }
        setUser(currentUser);
      }
      setLoading(false);
    };

    checkUser();
  }, [router, locale]);

  const handleLogout = async () => {
    await api.logout();
    router.push(`/${locale}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">{tCommon('loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href={`/${locale}`} className="text-2xl font-bold text-primary-600">
                {tCommon('acpc')}
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                {user?.full_name || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                {tNav('logout')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('welcome')}
          </h1>
          <p className="text-gray-600 mt-2">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* My Competitions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('myCompetitions.title')}
                </h3>
                <p className="text-2xl font-bold text-primary-600">0</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              {t('myCompetitions.none')}
            </p>
          </div>

          {/* Team Members */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('teamMembers.title')}
                </h3>
                <p className="text-2xl font-bold text-green-600">1</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              {t('teamMembers.canAdd')}
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('upcomingEvents.title')}
                </h3>
                <p className="text-2xl font-bold text-orange-600">1</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              {t('upcomingEvents.acpc2025')}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('quickActions.title')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button className="bg-primary-600 text-white p-4 rounded-lg hover:bg-primary-700 transition text-left">
              <h3 className="font-semibold text-lg mb-2">{t('quickActions.registerCompetition.title')}</h3>
              <p className="text-sm opacity-90">{t('quickActions.registerCompetition.description')}</p>
            </button>
            <Link href={`/${locale}/teams/create`} className="bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-gray-200 transition text-left block">
              <h3 className="font-semibold text-lg mb-2">{t('quickActions.createJoinTeam.title')}</h3>
              <p className="text-sm">{t('quickActions.createJoinTeam.description')}</p>
            </Link>
            <button className="bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-gray-200 transition text-left">
              <h3 className="font-semibold text-lg mb-2">{t('quickActions.viewSchedule.title')}</h3>
              <p className="text-sm">{t('quickActions.viewSchedule.description')}</p>
            </button>
            <button className="bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-gray-200 transition text-left">
              <h3 className="font-semibold text-lg mb-2">{t('quickActions.practiceProblems.title')}</h3>
              <p className="text-sm">{t('quickActions.practiceProblems.description')}</p>
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('profile.title')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <p className="text-gray-900 capitalize">
                {user?.user_role || 'User'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name (Arabic)
              </label>
              <p className="text-gray-900">
                {user?.full_name_arabic || t('profile.notProvided')}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Birth Date
              </label>
              <p className="text-gray-900">
                {user?.birth_date ? new Date(user.birth_date).toLocaleDateString() : t('profile.notProvided')}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                T-Shirt Size
              </label>
              <p className="text-gray-900">{user?.tshirt_size || t('profile.notProvided')}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year in University
              </label>
              <p className="text-gray-900">
                {user?.year_in_uni === 'graduated' ? 'Graduated' : `Year ${user?.year_in_uni}` || t('profile.notProvided')}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Faculty
              </label>
              <p className="text-gray-900">{user?.faculty || t('profile.notProvided')}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                University ID
              </label>
              <p className="text-gray-900">{user?.uni_id || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
