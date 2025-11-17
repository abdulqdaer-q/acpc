'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Volunteering() {
  const t = useTranslations('volunteering');
  const [activeTab, setActiveTab] = useState('media');

  const tabs = [
    { id: 'media', label: t('tabs.media') },
    { id: 'logistics', label: t('tabs.logistics') },
    { id: 'ops', label: t('tabs.ops') },
    { id: 'volunteers', label: t('tabs.volunteers') },
  ];

  return (
    <section id="volunteering" className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Media Team */}
          {activeTab === 'media' && (
            <div className="space-y-8">
              <div className="bg-primary-50 rounded-xl p-6 border-r-4 border-primary-600">
                <h3 className="text-2xl font-bold text-primary-900 mb-4">
                  {t('media.role.title')}
                </h3>
                <ul className="space-y-3">
                  {(t.raw('media.role.items') as string[]).map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-600 text-xl flex-shrink-0">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('media.tasks.title')}
                </h3>

                {/* Before Competition */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-primary-700 mb-4 flex items-center gap-2">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                      {t('common.before')}
                    </span>
                  </h4>
                  <ul className="space-y-2 mr-6">
                    {(t.raw('media.tasks.before') as string[]).map((task: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary-500 mt-1">▹</span>
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* During Competition */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {t('common.during')}
                    </span>
                  </h4>
                  <ul className="space-y-2 mr-6">
                    {(t.raw('media.tasks.during') as string[]).map((task: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">▹</span>
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After Competition */}
                <div>
                  <h4 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {t('common.after')}
                    </span>
                  </h4>
                  <ul className="space-y-2 mr-6">
                    {(t.raw('media.tasks.after') as string[]).map((task: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-purple-500 mt-1">▹</span>
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Logistics Team */}
          {activeTab === 'logistics' && (
            <div className="space-y-8">
              <div className="bg-primary-50 rounded-xl p-6 border-r-4 border-primary-600">
                <h3 className="text-2xl font-bold text-primary-900 mb-4">
                  {t('logistics.responsibilities.title')}
                </h3>
              </div>

              <div>
                {/* Before Competition */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-primary-700 mb-4 flex items-center gap-2">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                      {t('common.before')}
                    </span>
                  </h4>
                  <ul className="space-y-2 mr-6">
                    {(t.raw('logistics.tasks.before') as string[]).map((task: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary-500 mt-1">▹</span>
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After Competition */}
                <div>
                  <h4 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {t('common.after')}
                    </span>
                  </h4>
                  <ul className="space-y-2 mr-6">
                    {(t.raw('logistics.tasks.after') as string[]).map((task: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-purple-500 mt-1">▹</span>
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Operations Team */}
          {activeTab === 'ops' && (
            <div className="space-y-8">
              <div className="bg-primary-50 rounded-xl p-6 border-r-4 border-primary-600">
                <h3 className="text-2xl font-bold text-primary-900 mb-4">
                  {t('ops.role.title')}
                </h3>
                <ul className="space-y-3">
                  {(t.raw('ops.role.items') as string[]).map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-600 text-xl flex-shrink-0">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('ops.tasks.title')}
                </h3>

                {/* Before Competition */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-primary-700 mb-4 flex items-center gap-2">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                      {t('common.before')}
                    </span>
                  </h4>
                  <ul className="space-y-2 mr-6">
                    {(t.raw('ops.tasks.before') as string[]).map((task: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary-500 mt-1">▹</span>
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* During Competition */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {t('common.during')}
                    </span>
                  </h4>
                  <ul className="space-y-2 mr-6">
                    {(t.raw('ops.tasks.during') as string[]).map((task: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">▹</span>
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After Competition */}
                <div>
                  <h4 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {t('common.after')}
                    </span>
                  </h4>
                  <ul className="space-y-2 mr-6">
                    {(t.raw('ops.tasks.after') as string[]).map((task: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-purple-500 mt-1">▹</span>
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Volunteers Team */}
          {activeTab === 'volunteers' && (
            <div className="space-y-8">
              <div className="bg-primary-50 rounded-xl p-6 border-r-4 border-primary-600">
                <h3 className="text-2xl font-bold text-primary-900 mb-4">
                  {t('volunteers.role.title')}
                </h3>
                <ul className="space-y-3">
                  {(t.raw('volunteers.role.items') as string[]).map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-600 text-xl flex-shrink-0">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('volunteers.tasks.title')}
                </h3>

                {/* Before Competition */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-primary-700 mb-4 flex items-center gap-2">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                      {t('common.before')}
                    </span>
                  </h4>
                  <ul className="space-y-2 mr-6">
                    {(t.raw('volunteers.tasks.before') as string[]).map((task: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary-500 mt-1">▹</span>
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* During Competition */}
                <div>
                  <h4 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {t('common.during')}
                    </span>
                  </h4>
                  <ul className="space-y-2 mr-6">
                    {(t.raw('volunteers.tasks.during') as string[]).map((task: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">▹</span>
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
