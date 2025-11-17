'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 rounded-lg transition ${
          locale === 'en'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('ar')}
        className={`px-3 py-1 rounded-lg transition ${
          locale === 'ar'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        AR
      </button>
    </div>
  );
}
