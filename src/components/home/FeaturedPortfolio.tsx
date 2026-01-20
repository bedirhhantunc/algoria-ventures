'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { portfolioData } from '@/data/portfolio'
import { Gallery4, Gallery4Item } from '@/components/ui/gallery-4'
import { getBasePath } from '@/lib/utils'

export default function FeaturedPortfolio() {
  const t = useTranslations('home.portfolio')
  const params = useParams()
  const locale = params.locale as string
  const basePath = getBasePath()

  const featuredCompanies = portfolioData.filter((company) => company.featured)

  // Convert portfolio data to gallery items
  const galleryItems: Gallery4Item[] = featuredCompanies.map((company) => ({
    id: company.id,
    title: company.name,
    description: company.description,
    href: company.website,
    image: company.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  }))

  return (
    <Gallery4
      title={t('title')}
      description={t('subtitle')}
      items={galleryItems}
      viewAllText={t('viewAll')}
      viewAllHref={`${basePath}/${locale}/about#portfolio`}
    />
  )
}
