'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { getBasePath } from '@/lib/utils'

const dummyNews = [
  {
    id: '1',
    title: 'TechFlow 5M$ Series A yatırım aldı',
    excerpt: 'Portföy şirketimiz TechFlow, lider VC fonlarından 5 milyon dolar Series A yatırım aldı.',
    date: '2024-01-15',
    image: '/images/news/news1.jpg',
  },
  {
    id: '2',
    title: 'HealthHub MENA bölgesinde genişliyor',
    excerpt: 'Dijital sağlık platformu HealthHub, Orta Doğu pazarına giriş yapıyor.',
    date: '2024-01-10',
    image: '/images/news/news2.jpg',
  },
  {
    id: '3',
    title: 'Yeni dönem başvuruları açıldı',
    excerpt: 'Q1 2024 dönemi için yatırım başvurularımız başladı. Erken aşama girişimleri bekliyoruz.',
    date: '2024-01-05',
    image: '/images/news/news3.jpg',
  },
]

export default function LatestNews() {
  const t = useTranslations('home.news')
  const params = useParams()
  const locale = params.locale as string
  const basePath = getBasePath()

  return (
    <section className="section-padding bg-transparent">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-gray-900 dark:text-white">{t('title')}</h2>
          <p className="text-xl text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {dummyNews.map((news) => (
            <div
              key={news.id}
              className="card hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4 h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-primary/20 dark:to-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-4xl">📰</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/60 mb-3">
                <Calendar className="w-4 h-4" />
                {new Date(news.date).toLocaleDateString('tr-TR')}
              </div>
              <h3 className="font-bold mb-3 line-clamp-2 text-gray-900 dark:text-white">{news.title}</h3>
              <p className="text-gray-600 dark:text-white/70 text-sm mb-4 line-clamp-3">
                {news.excerpt}
              </p>
              <Link
                href={`${basePath}/${locale}/news/${news.id}`}
                className="text-gray-700 dark:text-accent hover:text-gray-900 dark:hover:text-accent-light font-medium inline-flex items-center gap-1"
              >
                Devamını Oku
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`${basePath}/${locale}/blog#news`}
            className="border-2 border-gray-900 dark:border-accent text-gray-900 dark:text-accent hover:bg-gray-900 dark:hover:bg-accent hover:text-white dark:hover:text-primary font-semibold py-3 px-6 rounded-lg transition-all duration-300 inline-flex items-center gap-2"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
