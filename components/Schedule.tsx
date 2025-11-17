'use client';

import { useTranslations } from 'next-intl';

export default function Schedule() {
  const t = useTranslations('schedule');

  const events = [
    {
      time: t('events.registration.time'),
      title: t('events.registration.title'),
      description: t('events.registration.description'),
    },
    {
      time: t('events.opening.time'),
      title: t('events.opening.title'),
      description: t('events.opening.description'),
    },
    {
      time: t('events.start.time'),
      title: t('events.start.title'),
      description: t('events.start.description'),
    },
    {
      time: t('events.lunch.time'),
      title: t('events.lunch.title'),
      description: t('events.lunch.description'),
    },
    {
      time: t('events.end.time'),
      title: t('events.end.title'),
      description: t('events.end.description'),
    },
    {
      time: t('events.awards.time'),
      title: t('events.awards.title'),
      description: t('events.awards.description'),
    },
  ];

  return (
    <section id="schedule" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex items-start bg-gray-50 p-6 rounded-lg hover:shadow-md transition"
              >
                <div className="flex-shrink-0 w-24 text-primary-600 font-bold">
                  {event.time}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {event.title}
                  </h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
