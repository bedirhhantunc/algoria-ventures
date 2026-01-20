import Hero from '@/components/home/Hero'
import InvestmentFocus from '@/components/home/InvestmentFocus'
import FeaturedPortfolio from '@/components/home/FeaturedPortfolio'
import TeamPreview from '@/components/home/TeamPreview'
import LatestNews from '@/components/home/LatestNews'
import { setRequestLocale } from 'next-intl/server'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <InvestmentFocus />
      <FeaturedPortfolio />
      <TeamPreview />
      <LatestNews />
    </>
  )
}
