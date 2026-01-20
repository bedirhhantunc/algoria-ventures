'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Calendar, ExternalLink, ArrowRight } from 'lucide-react'

const newsItems = [
  {
    id: '1',
    slug: 'techflow-series-a',
    title: 'TechFlow 5M$ Series A Yatırım Aldı',
    excerpt: 'Portföy şirketimiz TechFlow, lider VC fonlarından 5 milyon dolar Series A yatırım aldı. Bu yatırım ile Avrupa pazarına açılacak.',
    date: '2024-01-15',
    image: '/images/news/news1.jpg',
    type: 'portfolio',
  },
  {
    id: '2',
    slug: 'healthhub-mena-expansion',
    title: 'HealthHub MENA Bölgesinde Genişliyor',
    excerpt: 'Dijital sağlık platformu HealthHub, Suudi Arabistan ve BAE pazarlarına giriş yapıyor. Bölgesel ortaklıklar kuruldu.',
    date: '2024-01-10',
    image: '/images/news/news2.jpg',
    type: 'portfolio',
  },
  {
    id: '3',
    slug: 'new-fund-announcement',
    title: 'Algoria Ventures 50M$ Yeni Fon Duyurusu',
    excerpt: 'İkinci fonumuz için 50 milyon dolar hedef ile yol haritamızı açıkladık. Erken aşama girişimlere odaklanmaya devam edeceğiz.',
    date: '2024-01-05',
    image: '/images/news/news3.jpg',
    type: 'company',
  },
  {
    id: '4',
    slug: 'team-expansion',
    title: 'Ekibimize Yeni Katılımlar',
    excerpt: 'Investment team\'imizi güçlendiriyoruz. 2 yeni Principal ve 1 Associate ekibimize katıldı.',
    date: '2024-01-01',
    image: '/images/news/news4.jpg',
    type: 'company',
  },
  {
    id: '5',
    slug: 'eduverse-partnership',
    title: 'EduVerse ile Türk Telekom Ortaklığı',
    excerpt: 'Portföy şirketimiz EduVerse, Türk Telekom ile stratejik ortaklık anlaşması imzaladı.',
    date: '2023-12-20',
    image: '/images/news/news5.jpg',
    type: 'portfolio',
    externalUrl: 'https://example.com/news',
  },
]

export default function NewsPage() {
  const t = useTranslations('news')
  const tCommon = useTranslations('common')
  const params = useParams()
  const locale = params.locale as string

  const categories = ['Tümü', 'Portföy Haberleri', 'Şirket Haberleri', 'Medyada Biz']

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
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors font-medium"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((news) => (
              <article key={news.id} className="card hover:scale-105 transition-transform duration-300">
                <div className="mb-4 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <span className="text-5xl">📰</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-accent font-medium mb-3">
                  <span className="px-2 py-1 bg-primary/10 rounded">
                    {news.type === 'portfolio' ? 'Portföy' : 'Şirket'}
                  </span>
                  {news.externalUrl && (
                    <span className="px-2 py-1 bg-accent/10 text-accent rounded flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      Medya
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold mb-3 line-clamp-2">{news.title}</h2>

                <p className="text-white/70 text-sm mb-4 line-clamp-3">{news.excerpt}</p>

                <div className="flex items-center gap-1 text-sm text-white/60 mb-4">
                  <Calendar className="w-4 h-4" />
                  {new Date(news.date).toLocaleDateString(locale)}
                </div>

                {news.externalUrl ? (
                  <a
                    href={news.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-light font-medium inline-flex items-center gap-1"
                  >
                    Haberi Oku
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    href={`/${locale}/news/${news.slug}`}
                    className="text-accent hover:text-accent-light font-medium inline-flex items-center gap-1"
                  >
                    {tCommon('readMore')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
