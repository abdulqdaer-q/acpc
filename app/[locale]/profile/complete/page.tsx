'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { api } from '@/lib/api';

export default function CompleteProfilePage() {
  const t = useTranslations();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    full_name_arabic: '',
    birth_date: '',
    tshirt_size: 'M' as const,
    year_in_uni: '1' as const,
    faculty: 'CS' as const,
    uni_id: '',
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!api.isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    // Check if profile is already completed
    const checkProfile = async () => {
      const user = await api.getCurrentUser();
      if (user?.profile_completed) {
        router.push('/dashboard');
      }
    };

    checkProfile();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.full_name_arabic || !formData.birth_date) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      await api.updateProfile(formData);

      // Redirect to dashboard after successful profile completion
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      setLoading(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please provide the following information to complete your registration
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Full Name in Arabic */}
            <div>
              <label htmlFor="full_name_arabic" className="block text-sm font-medium text-gray-700">
                Full Name (Arabic) *
              </label>
              <input
                id="full_name_arabic"
                name="full_name_arabic"
                type="text"
                required
                value={formData.full_name_arabic}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="الاسم الكامل"
              />
            </div>

            {/* Birth Date */}
            <div>
              <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">
                Birth Date *
              </label>
              <input
                id="birth_date"
                name="birth_date"
                type="date"
                required
                value={formData.birth_date}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>

            {/* T-Shirt Size */}
            <div>
              <label htmlFor="tshirt_size" className="block text-sm font-medium text-gray-700">
                T-Shirt Size *
              </label>
              <select
                id="tshirt_size"
                name="tshirt_size"
                required
                value={formData.tshirt_size}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              <label htmlFor="year_in_uni" className="block text-sm font-medium text-gray-700">
                Year in University *
              </label>
              <select
                id="year_in_uni"
                name="year_in_uni"
                required
                value={formData.year_in_uni}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              <label htmlFor="faculty" className="block text-sm font-medium text-gray-700">
                Faculty *
              </label>
              <select
                id="faculty"
                name="faculty"
                required
                value={formData.faculty}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="ITE">Information Technology Engineering (ITE)</option>
                <option value="CS">Computer Science (CS)</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* University ID (Optional) */}
            <div>
              <label htmlFor="uni_id" className="block text-sm font-medium text-gray-700">
                University ID (Optional)
              </label>
              <input
                id="uni_id"
                name="uni_id"
                type="text"
                value={formData.uni_id}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your university ID"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Complete Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
