'use client'

import { teamData } from '@/data/team'
import KineticTeamHybrid from '@/components/ui/kinetic-team-hybrid'

interface TeamSectionProps {
  title: string
  subtitle: string
}

export default function TeamSection({ title, subtitle }: TeamSectionProps) {
  return (
    <KineticTeamHybrid
      members={teamData}
      title={title}
      subtitle={subtitle}
    />
  )
}
