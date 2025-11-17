import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  locale: string;
  path?: string;
  images?: { url: string; alt: string }[];
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://acpc.org';

export function generateMetadata(config: SEOConfig): Metadata {
  const { title, description, keywords, locale, path = '', images } = config;
  const url = `${baseUrl}/${locale}${path}`;

  const defaultImage = {
    url: `${baseUrl}/images/logos/icpc-aleppo.svg`,
    width: 1200,
    height: 630,
    alt: 'ACPC - Aleppo Competitive Programming Competition',
  };

  return {
    title,
    description,
    keywords: keywords?.join(', '),
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/en${path}`,
        'ar': `${baseUrl}/ar${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'ACPC - Aleppo Competitive Programming Competition',
      locale: locale === 'ar' ? 'ar_SY' : 'en_US',
      type: 'website',
      images: images?.map(img => ({
        url: img.url,
        alt: img.alt,
      })) || [defaultImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images?.map(img => img.url) || [defaultImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Aleppo Competitive Programming Competition',
    alternateName: 'ACPC',
    url: baseUrl,
    logo: `${baseUrl}/images/logos/icpc-aleppo.svg`,
    sameAs: [
      'https://twitter.com/acpc_aleppo',
      'https://github.com/acpc-aleppo',
      'https://linkedin.com/company/acpc-aleppo',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@acpc.org',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Arabic'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Aleppo',
      addressCountry: 'SY',
    },
  };
}

export function generateEventSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Aleppo Collegiate Programming Contest',
    description: 'The premier competitive programming competition in Aleppo, part of the ICPC global programming contest series',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Aleppo University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Aleppo',
        addressCountry: 'SY',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Aleppo University',
      url: baseUrl,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
  };
}
