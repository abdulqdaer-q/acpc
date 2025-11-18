'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { api, User } from '@/lib/api';

interface VolunteerApplication {
  id: number;
  name: string;
  email: string;
  phone: string;
  team: 'media' | 'logistics' | 'ops' | 'volunteers';
  experience: string;
  availability: string;
  motivation: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export default function MyApplicationsPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('myApplications');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<VolunteerApplication[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({
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

      // Fetch applications
      try {
        const response = await api.getMyVolunteerApplications();
        setApplications(response.data || []);
      } catch (err: any) {
        setError(err.message || t('errors.loadFailed'));
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [router, locale, t]);

  const handleEdit = (application: VolunteerApplication) => {
    setEditingId(application.id);
    setEditFormData({
      name: application.name,
      email: application.email,
      phone: application.phone,
      team: application.team,
      experience: application.experience,
      availability: application.availability,
      motivation: application.motivation,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({
      name: '',
      email: '',
      phone: '',
      team: '',
      experience: '',
      availability: '',
      motivation: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (id: number) => {
    setError('');
    try {
      await api.updateVolunteerApplication(id, {
        name: editFormData.name,
        email: editFormData.email,
        phone: editFormData.phone,
        team: editFormData.team as 'media' | 'logistics' | 'ops' | 'volunteers',
        experience: editFormData.experience,
        availability: editFormData.availability,
        motivation: editFormData.motivation,
      });

      // Refresh applications
      const response = await api.getMyVolunteerApplications();
      setApplications(response.data || []);
      setEditingId(null);
    } catch (err: any) {
      setError(err.message || t('errors.updateFailed'));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(t('confirmDelete'))) return;

    setError('');
    try {
      await api.deleteVolunteerApplication(id);

      // Refresh applications
      const response = await api.getMyVolunteerApplications();
      setApplications(response.data || []);
    } catch (err: any) {
      setError(err.message || t('errors.deleteFailed'));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTeamLabel = (team: string) => {
    const teamMap: { [key: string]: string } = {
      media: t('teams.media'),
      logistics: t('teams.logistics'),
      ops: t('teams.ops'),
      volunteers: t('teams.volunteers'),
    };
    return teamMap[team] || team;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('subtitle')}
            </p>
          </div>
          <Link
            href={`/${locale}/volunteer/apply`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            {t('newApplication')}
          </Link>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {applications.length === 0 ? (
          <div className="bg-white shadow-lg rounded-lg px-8 py-12 text-center">
            <p className="text-gray-600 text-lg mb-6">{t('noApplications')}</p>
            <Link
              href={`/${locale}/volunteer/apply`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              {t('submitFirst')}
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {editingId === application.id ? (
                  // Edit Form
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {t('editApplication')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          {t('form.name')}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          {t('form.email')}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          {t('form.phone')}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={editFormData.phone}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          {t('form.team')}
                        </label>
                        <select
                          name="team"
                          value={editFormData.team}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="media">{t('teams.media')}</option>
                          <option value="logistics">{t('teams.logistics')}</option>
                          <option value="ops">{t('teams.ops')}</option>
                          <option value="volunteers">{t('teams.volunteers')}</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          {t('form.experience')}
                        </label>
                        <textarea
                          name="experience"
                          value={editFormData.experience}
                          onChange={handleInputChange}
                          rows={3}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          {t('form.availability')}
                        </label>
                        <textarea
                          name="availability"
                          value={editFormData.availability}
                          onChange={handleInputChange}
                          rows={2}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          {t('form.motivation')}
                        </label>
                        <textarea
                          name="motivation"
                          value={editFormData.motivation}
                          onChange={handleInputChange}
                          rows={3}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                      >
                        {t('actions.cancel')}
                      </button>
                      <button
                        onClick={() => handleUpdate(application.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
                      >
                        {t('actions.save')}
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {application.name}
                        </h3>
                        <p className="text-gray-600">{getTeamLabel(application.team)}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {t(`status.${application.status}`)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          {t('details.email')}
                        </p>
                        <p className="text-gray-600">{application.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          {t('details.phone')}
                        </p>
                        <p className="text-gray-600">{application.phone}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        {t('details.experience')}
                      </p>
                      <p className="text-gray-600 whitespace-pre-wrap">
                        {application.experience}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        {t('details.availability')}
                      </p>
                      <p className="text-gray-600 whitespace-pre-wrap">
                        {application.availability}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        {t('details.motivation')}
                      </p>
                      <p className="text-gray-600 whitespace-pre-wrap">
                        {application.motivation}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <p className="text-sm text-gray-500">
                        {t('details.submitted')}: {new Date(application.createdAt).toLocaleDateString(locale)}
                      </p>
                      {application.status === 'pending' && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleEdit(application)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
                          >
                            {t('actions.edit')}
                          </button>
                          <button
                            onClick={() => handleDelete(application.id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
                          >
                            {t('actions.delete')}
                          </button>
                        </div>
                      )}
                      {application.status === 'approved' && (
                        <span className="text-green-600 font-medium">
                          {t('approvedMessage')}
                        </span>
                      )}
                      {application.status === 'rejected' && (
                        <span className="text-red-600 font-medium">
                          {t('rejectedMessage')}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
