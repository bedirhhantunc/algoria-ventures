'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { teamData } from '@/data/team'
import KineticTeamHybrid from '@/components/ui/kinetic-team-hybrid'

export default function TeamPreview() {
  const t = useTranslations('home.team')
  const params = useParams()
  const locale = params.locale as string

  // Show only first 3 team members
  const previewTeam = teamData.slice(0, 3)

  return (
    <section className="bg-transparent dark:bg-primary">
      <KineticTeamHybrid
        members={previewTeam}
        title={t('title')}
        subtitle={t('subtitle')}
        viewAllText={t('viewAll')}
        viewAllHref={`/${locale}/about#team`}
      />
    </section>
  )
}
