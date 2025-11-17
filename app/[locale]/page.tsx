import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { generateMetadata as genMeta, generateOrganizationSchema, generateEventSchema } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return genMeta({
    title: 'ACPC - Aleppo Competitive Programming Competition',
    description: 'Join the premier competitive programming competition in Aleppo. Part of the ICPC global series, connecting students with world-class opportunities.',
    keywords: ['ACPC', 'ICPC', 'Aleppo University', 'Programming Competition', 'Competitive Programming', 'Algorithm', 'Syria'],
    locale,
    path: '',
  });
}

export default function Home() {
  const organizationSchema = generateOrganizationSchema();
  const eventSchema = generateEventSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventSchema),
        }}
      />
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Footer />
      </main>
    </>
  );
}
