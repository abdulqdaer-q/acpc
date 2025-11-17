'use client';

import { useTranslations } from 'next-intl';

export default function History() {
  const t = useTranslations('history');

  return (
    <section id="history" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('beginning.title')}</h3>
            <p className="text-gray-600">
              {t('beginning.description')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('expansion.title')}</h3>
            <p className="text-gray-600">
              {t('expansion.description')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('worldFinals.title')}</h3>
            <p className="text-gray-600">
              {t('worldFinals.description')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('modernEra.title')}</h3>
            <p className="text-gray-600">
              {t('modernEra.description')}
            </p>
          </div>
        </div>

        <div className="bg-primary-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('format.title')}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <span className="text-primary-600 mx-2">•</span>
              <p className="text-gray-700">{t('format.teamComposition')}</p>
            </div>
            <div className="flex items-start">
              <span className="text-primary-600 mx-2">•</span>
              <p className="text-gray-700">{t('format.worldFinalists')}</p>
            </div>
            <div className="flex items-start">
              <span className="text-primary-600 mx-2">•</span>
              <p className="text-gray-700">{t('format.challenge')}</p>
            </div>
            <div className="flex items-start">
              <span className="text-primary-600 mx-2">•</span>
              <p className="text-gray-700">{t('format.awards')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
