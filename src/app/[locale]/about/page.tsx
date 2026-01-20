import { Target, Lightbulb, Users, TrendingUp, CheckCircle, Layers } from 'lucide-react'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { teamData } from '@/data/team'
import { investmentStages } from '@/data/investmentFocus'
import PortfolioGallery from '@/components/about/PortfolioGallery'
import HistoryTimeline from '@/components/about/HistoryTimeline'
import TeamSection from '@/components/about/TeamSection'

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')
  const tTeam = await getTranslations('team')
  const tPortfolio = await getTranslations('portfolio')
  const tCriteria = await getTranslations('criteria')

  const values = [
    {
      icon: Target,
      title: t('mission'),
      description:
        'Türkiye ve bölgede teknoloji ekosistemini güçlendirmek, yenilikçi girişimlere destek olarak ekonomik ve sosyal değer yaratmak.',
    },
    {
      icon: Lightbulb,
      title: t('vision'),
      description:
        'Geleceğin teknoloji liderlerini keşfeden ve destekleyen, bölgenin en güvenilir venture capital fonu olmak.',
    },
    {
      icon: Users,
      title: t('philosophy'),
      description:
        'Sadece sermaye değil, deneyim, network ve mentorluk ile girişimcilerin yanında uzun vadeli ortaklık kuruyoruz.',
    },
    {
      icon: TrendingUp,
      title: t('approach'),
      description:
        'Erken aşamada giren, aktif destek veren, girişimci dostu ve şeffaf bir yatırım süreci sunuyoruz.',
    },
  ]


  const qualities = [
    'Güçlü ve tamamlayıcı kurucu ekip',
    'Ölçeklenebilir iş modeli',
    'Büyük pazar potansiyeli (TAM > $1B)',
    'Teknolojik yenilik veya farklılaşma',
    'İlk müşteri veya traction kanıtı',
    'Net değer önerisi',
  ]

  const sectors = ['SaaS', 'FinTech', 'HealthTech', 'E-Commerce', 'AI & ML', 'EdTech']

  return (
    <div>
      {/* Hero */}
      <section className="section-padding text-gray-900 dark:text-white bg-transparent">
        <div className="container-custom text-center">
          <h1 className="mb-6">{t('title')}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-white/90">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Misyon, Vizyon, Felsefe, Yaklaşım */}
      <section className="section-padding bg-transparent">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="card hover:scale-105 transition-transform duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-700/20 dark:bg-accent/20 rounded-lg flex items-center justify-center border border-gray-700/40 dark:border-accent/30">
                      <Icon className="w-6 h-6 text-gray-700 dark:text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                      <p className="text-gray-600 dark:text-white/70">{value.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ekip */}
      <section id="team" className="scroll-mt-20 bg-transparent">
        <TeamSection
          title={tTeam('title')}
          subtitle={tTeam('subtitle')}
        />
      </section>

      {/* Portföy */}
      <section id="portfolio" className="scroll-mt-20">
        <PortfolioGallery
          title={tPortfolio('title')}
          description={tPortfolio('subtitle')}
        />
      </section>

      {/* Yatırım Kriterleri */}
      <section id="criteria" className="section-padding bg-transparent dark:bg-secondary/10 scroll-mt-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-gray-900 dark:text-white">{tCriteria('title')}</h2>
            <p className="text-xl text-gray-600 dark:text-white/70 max-w-2xl mx-auto">{tCriteria('subtitle')}</p>
          </div>

          {/* Yatırım Aşamaları */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">{tCriteria('stages')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {investmentStages.map((stage) => (
                <div key={stage.id} className="card text-center hover:scale-105 transition-transform duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700/20 dark:bg-accent/20 rounded-lg border border-gray-700/40 dark:border-accent/30 mb-4">
                    <Layers className="w-8 h-8 text-gray-700 dark:text-accent" />
                  </div>
                  <h4 className="font-bold mb-2 text-gray-900 dark:text-white">{stage.title}</h4>
                  <p className="text-2xl font-bold text-gray-700 dark:text-accent mb-3">{stage.range}</p>
                  <p className="text-gray-600 dark:text-white/70 text-sm">{stage.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sektörler ve Nitelikler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="card hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">{tCriteria('sectors')}</h3>
              <div className="flex flex-wrap gap-3">
                {sectors.map((sector, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-700/10 dark:bg-accent/10 rounded-full font-medium text-gray-700 dark:text-accent text-sm border border-gray-700/30 dark:border-accent/30 hover:bg-gray-700/20 dark:hover:bg-accent/20 transition-colors cursor-default"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>

            <div className="card hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">{tCriteria('qualities')}</h3>
              <div className="space-y-3">
                {qualities.slice(0, 4).map((quality, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gray-700 dark:text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 dark:text-white/80 text-sm">{quality}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarihçe */}
      <section className="section-padding bg-transparent">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-gray-900 dark:text-white">{t('history')}</h2>
            <p className="text-xl text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
              Yolculuğumuzun önemli kilometre taşları
            </p>
          </div>

          <HistoryTimeline />
        </div>
      </section>
    </div>
  )
}
