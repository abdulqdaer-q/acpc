'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('title')}
            <br />
            <span className="text-primary-600">{t('titleHighlight')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/auth/register`}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition shadow-lg hover:shadow-xl"
            >
              {t('registerNow')}
            </Link>
            <Link
              href={`/${locale}/#about`}
              className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition border-2 border-primary-600"
            >
              {t('learnMore')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
