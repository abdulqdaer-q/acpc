'use client';

import { useTranslations } from 'next-intl';

export default function Achievements() {
  const t = useTranslations('achievements');

  const years = ['2016', '2018', '2019', '2021', '2023', '2024'];

  return (
    <section id="achievements" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            {t('subtitle')}
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            {t('introduction')}
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {years.map((year, index) => (
              <div key={year} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow"></div>

                {/* Content */}
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-primary-50 p-6 rounded-lg shadow-md">
                    <div className="text-3xl font-bold text-primary-600 mb-2">{t(`timeline.${year}.year`)}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t(`timeline.${year}.title`)}</h3>
                    <p className="text-gray-600">{t(`timeline.${year}.description`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto bg-primary-50 p-6 rounded-lg">
            {t('summary')}
          </p>
        </div>
      </div>
    </section>
  );
}
