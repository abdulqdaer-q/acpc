import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Volunteering from '@/components/Volunteering';
import Footer from '@/components/Footer';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return genMeta({
    title: 'Volunteer with ACPC - Join Our Team | ACPC',
    description: 'Join our volunteer team and help make the competition a success. Opportunities in media, logistics, operations, and general volunteering.',
    keywords: ['Volunteer', 'ACPC Volunteer', 'Event Volunteering', 'Competition Organization', 'Media Team', 'Logistics'],
    locale,
    path: '/volunteering',
  });
}

export default function VolunteeringPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Volunteering />
      </div>
      <Footer />
    </main>
  );
}
