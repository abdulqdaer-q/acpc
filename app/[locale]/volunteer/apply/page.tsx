'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { api, User } from '@/lib/api';

export default function VolunteerApplicationPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('volunteerApplication');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    team: '' as 'media' | 'logistics' | 'ops' | 'volunteers' | '',
    experience: '',
    availability: '',
    motivation: '',
  });

  useEffect(() => {
    const init = async () => {
      // Check authentication
      if (!api.isAuthenticated()) {
        router.push(`/${locale}/auth/login`);
        return;
      }

      // Get current user
      const currentUser = await api.getCurrentUser();
      if (!currentUser) {
        router.push(`/${locale}/auth/login`);
        return;
      }

      setUser(currentUser);

      // Pre-fill form with user data
      setFormData(prev => ({
        ...prev,
        name: currentUser.fullNameArabic || currentUser.username || '',
        email: currentUser.email,
      }));
    };

    init();
  }, [router, locale]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.phone || !formData.team ||
          !formData.experience || !formData.availability || !formData.motivation) {
        throw new Error(t('errors.allFieldsRequired'));
      }

      // Submit application
      await api.submitVolunteerApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        team: formData.team as 'media' | 'logistics' | 'ops' | 'volunteers',
        experience: formData.experience,
        availability: formData.availability,
        motivation: formData.motivation,
      });

      setSuccess(true);

      // Redirect to applications page after 2 seconds
      setTimeout(() => {
        router.push(`/${locale}/volunteer/my-applications`);
      }, 2000);
    } catch (err: any) {
      setError(err.message || t('errors.submitFailed'));
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
            {t('success')}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          {/* Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              {t('form.name.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('form.name.placeholder')}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              {t('form.email.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('form.email.placeholder')}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              {t('form.phone.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('form.phone.placeholder')}
              required
            />
          </div>

          {/* Team */}
          <div className="mb-6">
            <label htmlFor="team" className="block text-gray-700 text-sm font-bold mb-2">
              {t('form.team.label')} <span className="text-red-500">*</span>
            </label>
            <select
              id="team"
              name="team"
              value={formData.team}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">{t('form.team.placeholder')}</option>
              <option value="media">{t('form.team.options.media')}</option>
              <option value="logistics">{t('form.team.options.logistics')}</option>
              <option value="ops">{t('form.team.options.ops')}</option>
              <option value="volunteers">{t('form.team.options.volunteers')}</option>
            </select>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <label htmlFor="experience" className="block text-gray-700 text-sm font-bold mb-2">
              {t('form.experience.label')} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              rows={4}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('form.experience.placeholder')}
              required
            />
          </div>

          {/* Availability */}
          <div className="mb-6">
            <label htmlFor="availability" className="block text-gray-700 text-sm font-bold mb-2">
              {t('form.availability.label')} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              rows={3}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('form.availability.placeholder')}
              required
            />
          </div>

          {/* Motivation */}
          <div className="mb-6">
            <label htmlFor="motivation" className="block text-gray-700 text-sm font-bold mb-2">
              {t('form.motivation.label')} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              rows={4}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('form.motivation.placeholder')}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between mt-8">
            <Link
              href={`/${locale}/volunteer/my-applications`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {t('form.viewApplications')}
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('form.submitting') : t('form.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
