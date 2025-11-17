import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Goals from '@/components/Goals';
import Competition from '@/components/Competition';
import Structure from '@/components/Structure';
import Organization from '@/components/Organization';
import Funding from '@/components/Funding';
import Footer from '@/components/Footer';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return genMeta({
    title: 'Competition Details - Format, Rules & Structure | ACPC',
    description: 'Learn about the competition format, rules, eligibility, and structure from university level to ICPC World Finals. Understand how teams compete and advance.',
    keywords: ['Competition Format', 'ICPC Rules', 'Team Competition', 'Programming Contest', 'Competition Structure', 'World Finals'],
    locale,
    path: '/competition',
  });
}

export default function CompetitionPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Goals />
        <Competition />
        <Structure />
        <Organization />
        <Funding />
      </div>
      <Footer />
    </main>
  );
}
