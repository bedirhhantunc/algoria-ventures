'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { teamData } from '@/data/team'
import KineticTeamHybrid from '@/components/ui/kinetic-team-hybrid'
import { getBasePath } from '@/lib/utils'

export default function TeamPreview() {
  const t = useTranslations('home.team')
  const params = useParams()
  const locale = params.locale as string
  const basePath = getBasePath()

  // Show only first 3 team members
  const previewTeam = teamData.slice(0, 3)

  return (
    <section className="bg-transparent dark:bg-primary">
      <KineticTeamHybrid
        members={previewTeam}
        title={t('title')}
        subtitle={t('subtitle')}
        viewAllText={t('viewAll')}
        viewAllHref={`${basePath}/${locale}/about#team`}
      />
    </section>
  )
}
