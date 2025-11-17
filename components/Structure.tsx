'use client';

import { useTranslations } from 'next-intl';

export default function Structure() {
  const t = useTranslations('structure');

  const stages = ['university', 'national', 'regional', 'world'];

  return (
    <section id="structure" className="py-16 md:py-24 bg-white">
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
          {stages.map((stage, index) => (
            <div key={stage} className="relative bg-gradient-to-br from-primary-50 to-white p-8 rounded-lg shadow-lg border-2 border-primary-100 hover:shadow-xl transition-shadow">
              {/* Stage Number Badge */}
              <div className="absolute top-4 right-4 bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                {index + 1}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 pr-14">{t(`stages.${stage}.title`)}</h3>
              <div className="mb-4">
                <span className="inline-block bg-primary-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {t(`stages.${stage}.name`)}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{t(`stages.${stage}.description`)}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 ml-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">{t(`stages.${stage}.participants`)}</span>
                </div>

                {t(`stages.${stage}.qualification`) && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 ml-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{t(`stages.${stage}.qualification`)}</span>
                  </div>
                )}

                {t(`stages.${stage}.fee`) && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-amber-600 ml-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    <span className="text-amber-700 font-semibold">{t(`stages.${stage}.fee`)}</span>
                  </div>
                )}

                {t(`stages.${stage}.location`) && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 ml-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{t(`stages.${stage}.location`)}</span>
                  </div>
                )}

                {t(`stages.${stage}.costs`) && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 ml-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-700">{t(`stages.${stage}.costs`)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
