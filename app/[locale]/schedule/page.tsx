import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Schedule from '@/components/Schedule';
import Footer from '@/components/Footer';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return genMeta({
    title: 'Event Schedule & Timeline | ACPC',
    description: 'View the detailed competition schedule and timeline. Plan your day from registration to awards ceremony.',
    keywords: ['Competition Schedule', 'Event Timeline', 'ACPC Schedule', 'Competition Day', 'Registration Time'],
    locale,
    path: '/schedule',
  });
}

export default function SchedulePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Schedule />
      </div>
      <Footer />
    </main>
  );
}
