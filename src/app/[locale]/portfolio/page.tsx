'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { portfolioData } from '@/data/portfolio'
import { ExternalLink, Filter } from 'lucide-react'

export default function PortfolioPage() {
  const t = useTranslations('portfolio')
  const [selectedSector, setSelectedSector] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const sectors = ['all', ...Array.from(new Set(portfolioData.map((c) => c.sector)))]
  const statuses = ['all', 'active', 'exit']

  const filteredCompanies = portfolioData.filter((company) => {
    const matchesSector =
      selectedSector === 'all' || company.sector === selectedSector
    const matchesStatus =
      selectedStatus === 'all' || company.status === selectedStatus
    return matchesSector && matchesStatus
  })

  return (
    <div>
      <section className="section-padding bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="container-custom text-center">
          <h1 className="mb-6">{t('title')}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-white/70" />
              <span className="font-medium">{t('filter')}:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-white/70">{t('sector')}:</span>
              {sectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedSector === sector
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-white/80 hover:bg-gray-200'
                  }`}
                >
                  {sector === 'all' ? t('all') : sector}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-white/70">{t('status')}:</span>
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedStatus === status
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-white/80 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? t('all') : t(status)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="card hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-4 w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-5xl font-bold text-primary">
                    {company.name.charAt(0)}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">{company.name}</h3>
                  {company.status === 'exit' && (
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded">
                      {t('exit')}
                    </span>
                  )}
                </div>

                <p className="text-sm text-white/70 mb-2">{company.sector}</p>
                <p className="text-xs text-white/60 mb-3">Since {company.year}</p>
                <p className="text-sm text-white/80 mb-4 line-clamp-2">
                  {company.description}
                </p>

                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark text-sm font-medium flex items-center gap-1"
                >
                  Website
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/70">
                Seçili filtrelere uygun şirket bulunamadı.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
