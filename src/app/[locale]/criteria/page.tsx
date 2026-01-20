import { investmentStages } from '@/data/investmentFocus'
import { CheckCircle, MapPin, Layers } from 'lucide-react'
import Link from 'next/link'
import { setRequestLocale, getTranslations } from 'next-intl/server'

export default async function CriteriaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('criteria')

  const sectors = [
    'SaaS',
    'FinTech',
    'HealthTech',
    'E-Commerce',
    'AI & ML',
    'EdTech',
    'AgriTech',
    'CleanTech',
  ]

  const qualities = [
    'Güçlü ve tamamlayıcı kurucu ekip',
    'Ölçeklenebilir iş modeli',
    'Büyük pazar potansiyeli (TAM > $1B)',
    'Teknolojik yenilik veya farklılaşma',
    'İlk müşteri veya traction kanıtı',
    'Net değer önerisi',
  ]

  const process = [
    {
      step: '1',
      title: 'Başvuru',
      description: 'Pitch deck ve temel bilgileri gönderin',
      duration: '1 gün',
    },
    {
      step: '2',
      title: 'İlk İnceleme',
      description: 'Ekibimiz başvurunuzu değerlendirir',
      duration: '1 hafta',
    },
    {
      step: '3',
      title: 'İlk Görüşme',
      description: 'Video call ile tanışma ve detaylı sunum',
      duration: '1 hafta',
    },
    {
      step: '4',
      title: 'Due Diligence',
      description: 'Detaylı analiz ve referans görüşmeleri',
      duration: '2-3 hafta',
    },
    {
      step: '5',
      title: 'Karar',
      description: 'Yatırım komitesi kararı ve term sheet',
      duration: '1 hafta',
    },
    {
      step: '6',
      title: 'Kapanış',
      description: 'Yasal süreç ve fon transferi',
      duration: '2-4 hafta',
    },
  ]

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
          <div className="text-center mb-12">
            <h2 className="mb-4">{t('stages')}</h2>
            <p className="text-xl text-white/70">
              Erken aşamadan Series A&apos;ya kadar yatırım yapıyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investmentStages.map((stage) => (
              <div key={stage.id} className="card text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Layers className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{stage.title}</h3>
                <p className="text-2xl font-bold text-primary mb-3">
                  {stage.range}
                </p>
                <p className="text-white/70">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary/10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="mb-6">{t('sectors')}</h2>
              <div className="flex flex-wrap gap-3">
                {sectors.map((sector, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white rounded-full shadow-sm font-medium text-primary"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-6">{t('geographic')}</h2>
              <div className="card">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">Primer Pazar</h4>
                    <p className="text-white/70">Türkiye</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">Sekonder Pazarlar</h4>
                    <p className="text-white/70">
                      MENA Bölgesi, Orta Doğu, Kuzey Afrika
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">{t('qualities')}</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Başarılı bir girişim ve ekipte ne arıyoruz
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {qualities.map((quality, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-white/80 font-medium">{quality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary/10">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="mb-4">{t('process')}</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Başvurudan yatırıma kadar adım adım süreç
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((item) => (
              <div key={item.step} className="card relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2 mt-4">{item.title}</h3>
                <p className="text-white/70 mb-3">{item.description}</p>
                <p className="text-sm text-primary font-medium">
                  ⏱ {item.duration}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-white/70 mb-6">
              Ortalama süreç süresi: 6-8 hafta
            </p>
            <Link href={`/${locale}/submit`} className="btn-primary">
              {t('applyNow')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
