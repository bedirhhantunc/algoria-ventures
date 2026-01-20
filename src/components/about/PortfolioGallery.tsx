'use client'

import { portfolioData } from '@/data/portfolio'
import { Gallery4, Gallery4Item } from '@/components/ui/gallery-4'

interface PortfolioGalleryProps {
  title: string
  description: string
}

export default function PortfolioGallery({ title, description }: PortfolioGalleryProps) {
  // Convert all portfolio data to gallery items
  const galleryItems: Gallery4Item[] = portfolioData.map((company) => ({
    id: company.id,
    title: company.name,
    description: company.description,
    href: company.website,
    image: company.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  }))

  return (
    <Gallery4
      title={title}
      description={description}
      items={galleryItems}
    />
  )
}
