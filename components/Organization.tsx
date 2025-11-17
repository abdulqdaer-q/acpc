'use client';

import { useTranslations } from 'next-intl';

export default function Organization() {
  const t = useTranslations('organization');

  return (
    <section id="organization" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Two Days */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Practice Day */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <svg className="w-12 h-12 text-primary-600 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900">{t('practiceDay.title')}</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary-600 mx-2 text-xl">①</span>
                <span className="text-gray-600">{t('practiceDay.registration')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2 text-xl">②</span>
                <span className="text-gray-600">{t('practiceDay.photos')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2 text-xl">③</span>
                <span className="text-gray-600">{t('practiceDay.technical')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2 text-xl">④</span>
                <span className="text-gray-600">{t('practiceDay.practice')}</span>
              </li>
            </ul>
          </div>

          {/* Competition Day */}
          <div className="bg-white p-8 rounded-lg shadow-md border-2 border-primary-600">
            <div className="flex items-center mb-6">
              <svg className="w-12 h-12 text-primary-600 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900">{t('competitionDay.title')}</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary-600 mx-2 text-xl">⏱</span>
                <span className="text-gray-600 font-semibold">{t('competitionDay.duration')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2 text-xl">📝</span>
                <span className="text-gray-600">{t('competitionDay.problems')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2 text-xl">🎈</span>
                <span className="text-gray-600">{t('competitionDay.balloon')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2 text-xl">📸</span>
                <span className="text-gray-600">{t('competitionDay.firstSolve')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2 text-xl">📊</span>
                <span className="text-gray-600">{t('competitionDay.scoreboard')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2 text-xl">❄️</span>
                <span className="text-gray-600">{t('competitionDay.freeze')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2 text-xl">🏆</span>
                <span className="text-gray-600 font-semibold">{t('competitionDay.ceremony')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Organizing Teams */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('teams.title')}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="flex items-start p-4 bg-primary-50 rounded-lg">
              <span className="text-primary-600 mx-2">👥</span>
              <span className="text-gray-700 text-sm">{t('teams.organizing')}</span>
            </div>
            <div className="flex items-start p-4 bg-primary-50 rounded-lg">
              <span className="text-primary-600 mx-2">📦</span>
              <span className="text-gray-700 text-sm">{t('teams.logistics')}</span>
            </div>
            <div className="flex items-start p-4 bg-primary-50 rounded-lg">
              <span className="text-primary-600 mx-2">📱</span>
              <span className="text-gray-700 text-sm">{t('teams.media')}</span>
            </div>
            <div className="flex items-start p-4 bg-primary-50 rounded-lg">
              <span className="text-primary-600 mx-2">💻</span>
              <span className="text-gray-700 text-sm">{t('teams.technical')}</span>
            </div>
            <div className="flex items-start p-4 bg-primary-50 rounded-lg">
              <span className="text-primary-600 mx-2">🤝</span>
              <span className="text-gray-700 text-sm">{t('teams.volunteers')}</span>
            </div>
            <div className="flex items-start p-4 bg-primary-50 rounded-lg">
              <span className="text-primary-600 mx-2">⚖️</span>
              <span className="text-gray-700 text-sm">{t('teams.judges')}</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-600 italic bg-yellow-50 p-4 rounded-lg inline-block">
              💡 {t('teams.note')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
