'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface ScheduleEvent {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time?: string;
  day: number;
  location?: string;
  event_type: string;
}

interface Contest {
  id: number;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  location?: string;
  schedule_events: ScheduleEvent[];
}

export default function Schedule() {
  const t = useTranslations('schedule');
  const [contest, setContest] = useState<Contest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveContest = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contests/active`);
        if (response.ok) {
          const data = await response.json();
          setContest(data);
        }
      } catch (error) {
        console.error('Error fetching active contest:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveContest();
  }, []);

  if (loading) {
    return null;
  }

  // Don't show schedule if no active contest
  if (!contest) {
    return null;
  }

  // Group events by day
  const eventsByDay = contest.schedule_events.reduce((acc, event) => {
    if (!acc[event.day]) {
      acc[event.day] = [];
    }
    acc[event.day].push(event);
    return acc;
  }, {} as Record<number, ScheduleEvent[]>);

  const formatTime = (datetime: string) => {
    return new Date(datetime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateStr: string, day: number) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + day - 1);
    return date.toLocaleDateString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="schedule" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {contest.name} - {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {contest.description || t('subtitle')}
          </p>
          {contest.location && (
            <p className="text-lg text-gray-500 mt-2">
              📍 {contest.location}
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {Object.entries(eventsByDay)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([day, events]) => (
              <div key={day}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-primary-500 pb-2">
                  Day {day} - {formatDate(contest.start_date, Number(day))}
                </h3>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start bg-gray-50 p-6 rounded-lg hover:shadow-md transition"
                    >
                      <div className="flex-shrink-0 w-32 text-primary-600 font-bold">
                        {formatTime(event.start_time)}
                        {event.end_time && ` - ${formatTime(event.end_time)}`}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-1">
                          {event.title}
                        </h4>
                        {event.description && (
                          <p className="text-gray-600 mb-2">{event.description}</p>
                        )}
                        {event.location && (
                          <p className="text-sm text-gray-500">📍 {event.location}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
