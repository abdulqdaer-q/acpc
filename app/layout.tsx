import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://acpc.org'),
  title: {
    default: "ACPC - Aleppo Competitive Programming Competition",
    template: "%s | ACPC",
  },
  description: "Join the premier competitive programming competition in Aleppo. Part of the ICPC global series, connecting students with world-class opportunities.",
  keywords: ['ACPC', 'ICPC', 'Aleppo University', 'Programming Competition', 'Competitive Programming', 'Algorithm', 'Syria', 'Coding Contest'],
  authors: [{ name: 'ACPC Team' }],
  creator: 'Aleppo University',
  publisher: 'Aleppo University',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/logos/icpc-aleppo.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'ACPC - Aleppo Competitive Programming Competition',
    title: 'ACPC - Aleppo Competitive Programming Competition',
    description: 'Join the premier competitive programming competition in Aleppo',
    images: [
      {
        url: '/images/logos/icpc-aleppo.svg',
        width: 1200,
        height: 630,
        alt: 'ACPC Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACPC - Aleppo Competitive Programming Competition',
    description: 'Join the premier competitive programming competition in Aleppo',
    images: ['/images/logos/icpc-aleppo.svg'],
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
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
