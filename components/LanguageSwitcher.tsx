'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  const languages = {
    en: { name: 'English', nativeName: 'English', flag: '🇬🇧' },
    ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇾' }
  };

  const currentLang = languages[locale as keyof typeof languages];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition focus:outline-none"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="font-medium">{locale.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <button
            onClick={() => switchLocale('en')}
            className={`w-full text-left px-4 py-2 flex items-center space-x-3 rtl:space-x-reverse hover:bg-gray-100 transition ${
              locale === 'en' ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
            }`}
          >
            <span className="text-lg">🇬🇧</span>
            <div>
              <p className="font-medium">English</p>
            </div>
            {locale === 'en' && (
              <svg className="w-5 h-5 ml-auto text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <button
            onClick={() => switchLocale('ar')}
            className={`w-full text-left px-4 py-2 flex items-center space-x-3 rtl:space-x-reverse hover:bg-gray-100 transition ${
              locale === 'ar' ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
            }`}
          >
            <span className="text-lg">🇸🇾</span>
            <div>
              <p className="font-medium">العربية</p>
            </div>
            {locale === 'ar' && (
              <svg className="w-5 h-5 ml-auto text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
