import { teamData } from '@/data/team'
import { Linkedin, Twitter, Mail } from 'lucide-react'
import { setRequestLocale, getTranslations } from 'next-intl/server'

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('team')

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamData.map((member) => (
              <div
                key={member.id}
                className="card hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-6">
                  <div className="w-full h-64 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white text-6xl font-bold mb-4">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-primary font-medium">{member.position}</p>
                </div>

                <p className="text-white/70 mb-6">{member.bio}</p>

                <div className="flex gap-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-primary" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Twitter className="w-5 h-5 text-primary" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Mail className="w-5 h-5 text-primary" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
