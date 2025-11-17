import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import History from '@/components/History';
import Achievements from '@/components/Achievements';
import Footer from '@/components/Footer';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return genMeta({
    title: 'About ACPC - History & Achievements | ACPC',
    description: 'Learn about the history of ICPC and Aleppo University\'s distinguished achievements in competitive programming competitions since 1977.',
    keywords: ['ICPC History', 'ACPC Achievements', 'Aleppo University', 'Programming Competition History', 'World Finals'],
    locale,
    path: '/about',
  });
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <History />
        <Achievements />
      </div>
      <Footer />
    </main>
  );
}
