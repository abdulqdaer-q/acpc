import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return genMeta({
    title: 'Authentication - Login or Register | ACPC',
    description: 'Sign in to your ACPC account or create a new account to register for competitions, manage your team, and track your progress.',
    keywords: ['ACPC Login', 'Register', 'Sign Up', 'Account', 'Authentication', 'Student Login'],
    locale,
    path: '/auth',
  });
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
