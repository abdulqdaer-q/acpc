'use client';

import { useTranslations } from 'next-intl';

export default function Competition() {
  const t = useTranslations('competition');

  return (
    <section id="competition" className="py-16 md:py-24 bg-gray-50">
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
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('rules.title')}</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">•</span>
                {t('rules.teams')}
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">•</span>
                {t('rules.duration')}
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">•</span>
                {t('rules.problems')}
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">•</span>
                {t('rules.computer')}
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">•</span>
                {t('rules.languages')}
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('eligibility.title')}
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">•</span>
                {t('eligibility.university')}
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">•</span>
                {t('eligibility.highSchool')}
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">•</span>
                {t('eligibility.passionate')}
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">•</span>
                {t('eligibility.allLevels')}
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mx-2">•</span>
                {t('eligibility.noAge')}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
