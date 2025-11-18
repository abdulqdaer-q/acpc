'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface GuideContent {
  title: string;
  introduction: {
    heading: string;
    content: string;
  };
  sections: Array<{
    id: string;
    heading: string;
    content: string;
    subsections?: Array<{
      heading: string;
      content: string;
      list?: Array<{
        title: string;
        description: string;
        link?: {
          url: string;
          text: string;
        };
      }> | null;
    }>;
  }>;
  conclusion: {
    heading: string;
    content: string;
  };
}

export default function GuidePage() {
  const router = useRouter();
  const locale = useLocale();
  const [guide, setGuide] = useState<GuideContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/guide`);

        if (!response.ok) {
          throw new Error('Failed to fetch guide');
        }

        const data = await response.json();

        if (data.data && data.data.content) {
          const contentData = data.data.content;
          const currentLocale = locale === 'ar' ? 'ar' : 'en';

          // Get the content for the current locale, fallback to English
          const localizedContent = contentData.content[currentLocale] || contentData.content.en;
          const localizedTitle = contentData.title[currentLocale] || contentData.title.en;

          setGuide({
            title: localizedTitle,
            ...localizedContent
          });
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load guide');
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [locale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-700">Loading guide...</div>
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Guide</h2>
          <p className="text-gray-700">{error || 'Guide content not available'}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <button
            onClick={() => router.back()}
            className="mb-4 text-indigo-600 hover:text-indigo-800 flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{guide.title}</h1>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{guide.introduction.heading}</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{guide.introduction.content}</p>
        </div>

        {/* Main Sections */}
        {guide.sections.map((section, sectionIdx) => (
          <div key={section.id} className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-indigo-600 mb-6">{section.heading}</h2>
            {section.content && (
              <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">{section.content}</p>
            )}

            {/* Subsections */}
            {section.subsections && section.subsections.map((subsection, subIdx) => (
              <div key={subIdx} className={subIdx > 0 ? 'mt-8' : ''}>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{subsection.heading}</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {subsection.content}
                </div>

                {/* List items (for options, steps, etc.) */}
                {subsection.list && subsection.list.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {subsection.list.map((item, itemIdx) => (
                      <div key={itemIdx} className="bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-500">
                        <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-700">{item.description}</p>
                        {item.link && (
                          <a
                            href={item.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                          >
                            {item.link.text}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">{guide.conclusion.heading}</h2>
          <p className="leading-relaxed whitespace-pre-line">{guide.conclusion.content}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            Go to Dashboard
          </button>
          <a
            href="https://codeforces.com/group/wVHZMP1GI8/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-md border-2 border-indigo-600"
          >
            Visit Practice Group
          </a>
        </div>
      </div>
    </div>
  );
}
