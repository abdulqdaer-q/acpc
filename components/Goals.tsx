'use client';

import { useTranslations } from 'next-intl';

export default function Goals() {
  const t = useTranslations('goals');

  return (
    <section id="goals" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Technical Skills */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <svg className="w-10 h-10 text-primary-600 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900">{t('technical.title')}</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">✓</span>
                <span className="text-gray-600">{t('technical.algorithms')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">✓</span>
                <span className="text-gray-600">{t('technical.problemSolving')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">✓</span>
                <span className="text-gray-600">{t('technical.efficiency')}</span>
              </li>
            </ul>
          </div>

          {/* Soft Skills */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <svg className="w-10 h-10 text-primary-600 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900">{t('soft.title')}</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">✓</span>
                <span className="text-gray-600">{t('soft.teamwork')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">✓</span>
                <span className="text-gray-600">{t('soft.pressure')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">✓</span>
                <span className="text-gray-600">{t('soft.competition')}</span>
              </li>
            </ul>
          </div>

          {/* Career Opportunities */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <svg className="w-10 h-10 text-primary-600 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900">{t('career.title')}</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">✓</span>
                <span className="text-gray-600">{t('career.industry')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">✓</span>
                <span className="text-gray-600">{t('career.training')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">✓</span>
                <span className="text-gray-600">{t('career.experience')}</span>
              </li>
            </ul>
          </div>

          {/* University Benefits */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <svg className="w-10 h-10 text-primary-600 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900">{t('university.title')}</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">✓</span>
                <span className="text-gray-600">{t('university.ranking')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">✓</span>
                <span className="text-gray-600">{t('university.talent')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">✓</span>
                <span className="text-gray-600">{t('university.collaboration')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">✓</span>
                <span className="text-gray-600">{t('university.partnerships')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
