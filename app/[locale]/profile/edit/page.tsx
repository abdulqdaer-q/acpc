'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { api, User } from '@/lib/api';

export default function EditProfilePage() {
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    fullNameArabic: '',
    birthDate: '',
    tshirtSize: 'M',
    yearInUni: '1',
    faculty: 'CS',
    uniId: '',
  });

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await api.getCurrentUser();

      if (!currentUser) {
        router.push(`/${locale}/auth/login`);
        return;
      }

      setUser(currentUser);
      setFormData({
        fullNameArabic: currentUser.fullNameArabic || '',
        birthDate: currentUser.birthDate || '',
        tshirtSize: currentUser.tshirtSize || 'M',
        yearInUni: currentUser.yearInUni || '1',
        faculty: currentUser.faculty || 'CS',
        uniId: currentUser.uniId || '',
      });
      setLoading(false);
    };

    loadUser();
  }, [router, locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      await api.updateProfile(formData);
      setSuccess(true);

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        router.push(`/${locale}/dashboard`);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Edit Your Profile
            </h2>
            <p className="text-gray-600 mt-2">
              Update your personal information below
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              Profile updated successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name in Arabic */}
            <div>
              <label htmlFor="fullNameArabic" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name (Arabic) *
              </label>
              <input
                id="fullNameArabic"
                name="fullNameArabic"
                type="text"
                required
                value={formData.fullNameArabic}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 placeholder-gray-400"
                placeholder="الاسم الكامل"
              />
            </div>

            {/* Birth Date */}
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                Birth Date *
              </label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                required
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* T-Shirt Size */}
            <div>
              <label htmlFor="tshirtSize" className="block text-sm font-medium text-gray-700 mb-2">
                T-Shirt Size *
              </label>
              <select
                id="tshirtSize"
                name="tshirtSize"
                required
                value={formData.tshirtSize}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXXL">XXXL</option>
              </select>
            </div>

            {/* Year in University */}
            <div>
              <label htmlFor="yearInUni" className="block text-sm font-medium text-gray-700 mb-2">
                Year in University *
              </label>
              <select
                id="yearInUni"
                name="yearInUni"
                required
                value={formData.yearInUni}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
                <option value="6">6th Year</option>
                <option value="graduated">Graduated</option>
              </select>
            </div>

            {/* Faculty */}
            <div>
              <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-2">
                Faculty *
              </label>
              <select
                id="faculty"
                name="faculty"
                required
                value={formData.faculty}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="ITE">Information Technology Engineering (ITE)</option>
                <option value="CS">Computer Science (CS)</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* University ID */}
            <div>
              <label htmlFor="uniId" className="block text-sm font-medium text-gray-700 mb-2">
                University ID (Optional)
              </label>
              <input
                id="uniId"
                name="uniId"
                type="text"
                value={formData.uniId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-gray-900 placeholder-gray-400"
                placeholder="Enter your university ID"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving || success}
                className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {saving ? 'Saving...' : success ? 'Saved!' : 'Save Changes'}
              </button>
              <Link
                href={`/${locale}/dashboard`}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
