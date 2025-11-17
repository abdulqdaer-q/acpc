import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://acpc.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'ar'];
  const pages = ['', '/about', '/competition', '/volunteering', '/schedule', '/contact'];

  const urls: MetadataRoute.Sitemap = [];

  // Generate URLs for each locale and page
  locales.forEach((locale) => {
    pages.forEach((page) => {
      urls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: page === '' ? 1.0 : 0.8,
      });
    });
  });

  // Add auth pages with lower priority
  locales.forEach((locale) => {
    urls.push({
      url: `${baseUrl}/${locale}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    });
    urls.push({
      url: `${baseUrl}/${locale}/auth/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    });
  });

  return urls;
}
