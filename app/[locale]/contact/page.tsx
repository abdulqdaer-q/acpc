import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return genMeta({
    title: 'Contact Us - Get in Touch | ACPC',
    description: 'Have questions about ACPC? Contact us for information about registration, competition details, or volunteering opportunities.',
    keywords: ['Contact ACPC', 'Competition Contact', 'Aleppo University Contact', 'ACPC Support', 'Get in Touch'],
    locale,
    path: '/contact',
  });
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
