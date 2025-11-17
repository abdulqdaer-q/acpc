import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import History from '@/components/History';
import Achievements from '@/components/Achievements';
import Goals from '@/components/Goals';
import Competition from '@/components/Competition';
import Structure from '@/components/Structure';
import Organization from '@/components/Organization';
import Funding from '@/components/Funding';
import Volunteering from '@/components/Volunteering';
import Schedule from '@/components/Schedule';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <History />
      <Achievements />
      <Goals />
      <Competition />
      <Structure />
      <Organization />
      <Funding />
      <Volunteering />
      <Schedule />
      <Contact />
      <Footer />
    </main>
  );
}
