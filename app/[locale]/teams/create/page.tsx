'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { api, User } from '@/lib/api';

interface TeamMember {
  name: string;
  email: string;
  studentId: string;
  year: number;
  major: string;
}

export default function CreateTeamPage() {
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [coaches, setCoaches] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    university: '',
    coach: '',
    coachName: '',
    coachEmail: '',
    coachPhone: '',
  });

  const [members, setMembers] = useState<TeamMember[]>([
    { name: '', email: '', studentId: '', year: 1, major: '' },
    { name: '', email: '', studentId: '', year: 1, major: '' },
    { name: '', email: '', studentId: '', year: 1, major: '' },
  ]);

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

      if (!currentUser.profileCompleted) {
        router.push(`/${locale}/profile/complete`);
        return;
      }

      setUser(currentUser);

      // Fetch coaches
      try {
        const response = await api.getCoaches();
        setCoaches(response.data);
      } catch (err) {
        console.error('Failed to fetch coaches:', err);
      }
    };

    init();
  }, [router, locale]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMemberChange = (
    index: number,
    field: keyof TeamMember,
    value: string | number
  ) => {
    const newMembers = [...members];
    newMembers[index] = {
      ...newMembers[index],
      [field]: value,
    };
    setMembers(newMembers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate exactly 3 members
      const filledMembers = members.filter(
        (m) => m.name && m.email && m.studentId && m.major
      );

      if (filledMembers.length !== 3) {
        setError('You must provide exactly 3 team members');
        setLoading(false);
        return;
      }

      // Prepare team data
      const teamData = {
        name: formData.name,
        university: formData.university,
        coach: formData.coach ? parseInt(formData.coach) : undefined,
        coachName: formData.coachName,
        coachEmail: formData.coachEmail,
        coachPhone: formData.coachPhone,
        members: filledMembers,
      };

      await api.createTeam(teamData);

      // Redirect to teams page or dashboard
      router.push(`/${locale}/dashboard`);
    } catch (err: any) {
      setError(err.message || 'Failed to create team');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href={`/${locale}/dashboard`} className="text-2xl font-bold text-primary-600">
                ACPC 2025
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                href={`/${locale}/dashboard`}
                className="text-gray-700 hover:text-primary-600 px-4 py-2"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Team</h1>

          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Team Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Information</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                    University *
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    required
                    value={formData.university}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Coach Selection */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Coach Information</h2>

              <div className="mb-4">
                <label htmlFor="coach" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Coach (Optional)
                </label>
                <select
                  id="coach"
                  name="coach"
                  value={formData.coach}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">-- Select a coach --</option>
                  {coaches.map((coach) => (
                    <option key={coach.id} value={coach.id}>
                      {coach.fullNameArabic || coach.username} ({coach.email})
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  Or provide coach details manually below
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="coachName" className="block text-sm font-medium text-gray-700 mb-1">
                    Coach Name
                  </label>
                  <input
                    type="text"
                    id="coachName"
                    name="coachName"
                    value={formData.coachName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="coachEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Coach Email
                  </label>
                  <input
                    type="email"
                    id="coachEmail"
                    name="coachEmail"
                    value={formData.coachEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="coachPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Coach Phone
                  </label>
                  <input
                    type="tel"
                    id="coachPhone"
                    name="coachPhone"
                    value={formData.coachPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Team Members (Exactly 3) */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Team Members (Exactly 3 Required)
              </h2>

              {members.map((member, index) => (
                <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Member {index + 1}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={member.email}
                        onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Student ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={member.studentId}
                        onChange={(e) => handleMemberChange(index, 'studentId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year *
                      </label>
                      <select
                        required
                        value={member.year}
                        onChange={(e) => handleMemberChange(index, 'year', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value={1}>1st Year</option>
                        <option value={2}>2nd Year</option>
                        <option value={3}>3rd Year</option>
                        <option value={4}>4th Year</option>
                        <option value={5}>5th Year</option>
                        <option value={6}>6th Year</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Major *
                      </label>
                      <input
                        type="text"
                        required
                        value={member.major}
                        onChange={(e) => handleMemberChange(index, 'major', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link
                href={`/${locale}/dashboard`}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Team'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
