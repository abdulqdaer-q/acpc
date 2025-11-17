'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">{t('common.acpc')}</p>
          <p className="text-gray-400 mb-4">
            {t('common.acpcFull')}
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {t('common.acpc')}. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
