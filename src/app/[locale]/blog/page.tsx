'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Calendar, User, ArrowRight, Download } from 'lucide-react'
import { TestimonialsSection } from '@/components/ui/testimonials-section'

const blogPosts = [
  {
    id: '1',
    slug: 'turkiye-startup-ekosistemi-2024',
    title: "Türkiye Startup Ekosistemi 2024 Görünümü",
    excerpt: 'Türkiye\'deki startup ekosisteminin 2024 yılı için öngörüleri ve trendler.',
    category: 'Pazar Analizi',
    author: 'Ahmet Yılmaz',
    date: '2024-01-15',
    readingTime: '8 dk',
  },
  {
    id: '2',
    slug: 'basarili-pitch-deck-nasil-hazirlanir',
    title: 'Başarılı Bir Pitch Deck Nasıl Hazırlanır?',
    excerpt: 'Yatırımcıların dikkatini çeken pitch deck hazırlama rehberi.',
    category: 'Girişimci İpuçları',
    author: 'Zeynep Kaya',
    date: '2024-01-10',
    readingTime: '10 dk',
  },
  {
    id: '3',
    slug: 'fintech-gelecegi',
    title: 'FinTech\'in Geleceği: 2024 Trendleri',
    excerpt: 'Finansal teknolojiler sektöründe bizi nelerin beklediğine dair analiz.',
    category: 'Pazar Analizi',
    author: 'Mehmet Demir',
    date: '2024-01-05',
    readingTime: '12 dk',
  },
]

const whitepapers = [
  {
    id: '1',
    slug: 'turkiye-vc-landscape-2024',
    title: 'Türkiye Venture Capital Landscape 2024',
    excerpt: 'Türkiye\'deki venture capital ekosisteminin kapsamlı analizi.',
    category: 'Pazar Raporu',
    date: '2024-01-01',
    pages: 42,
    pdfUrl: '/whitepapers/turkey-vc-2024.pdf',
  },
  {
    id: '2',
    slug: 'saas-metrics-guide',
    title: 'SaaS Metrikleri Rehberi',
    excerpt: 'SaaS şirketleri için kritik metrikler.',
    category: 'Teknik Rapor',
    date: '2023-12-15',
    pages: 28,
    pdfUrl: '/whitepapers/saas-metrics.pdf',
  },
]

const newsItems = [
  {
    id: '1',
    slug: 'techflow-series-a',
    title: 'TechFlow 5M$ Series A Yatırım Aldı',
    excerpt: 'Portföy şirketimiz TechFlow, lider VC fonlarından 5 milyon dolar yatırım aldı.',
    date: '2024-01-15',
    type: 'portfolio',
  },
  {
    id: '2',
    slug: 'healthhub-mena-expansion',
    title: 'HealthHub MENA Bölgesinde Genişliyor',
    excerpt: 'Dijital sağlık platformu HealthHub, Suudi Arabistan ve BAE pazarlarına giriş yapıyor.',
    date: '2024-01-10',
    type: 'portfolio',
  },
]

export default function BlogPage() {
  const t = useTranslations('blog')
  const tWhitepapers = useTranslations('whitepapers')
  const tNews = useTranslations('news')
  const tCommon = useTranslations('common')
  const params = useParams()
  const locale = params.locale as string

  // Convert blog posts to testimonials format
  const blogTestimonials = blogPosts.map(post => ({
    author: {
      name: post.author,
      role: `${post.category} • ${post.readingTime}`,
    },
    text: post.excerpt,
    href: `/${locale}/blog/${post.slug}`,
  }))

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

      {/* Blog Yazıları - Marquee */}
      <TestimonialsSection
        title="Blog Yazıları"
        description="Sektör analizleri ve girişimci ipuçları"
        testimonials={blogTestimonials}
      />

      {/* Original Blog Grid - Hidden for now */}
      <section className="section-padding hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="card hover:scale-105 transition-transform duration-300">
                <div className="mb-4 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <span className="text-5xl">📝</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-accent font-medium mb-3">
                  <span className="px-2 py-1 bg-primary/10 rounded">{post.category}</span>
                  <span>{post.readingTime}</span>
                </div>

                <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-white/70 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString(locale)}
                  </div>
                </div>

                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="text-accent hover:text-accent-light font-medium inline-flex items-center gap-1"
                >
                  {tCommon('readMore')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Whitepapers */}
      <section id="whitepapers" className="section-padding bg-transparent dark:bg-secondary/10 scroll-mt-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-gray-900 dark:text-white">{tWhitepapers('title')}</h2>
            <p className="text-xl text-gray-600 dark:text-white/70">{tWhitepapers('subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whitepapers.map((paper) => (
              <article key={paper.id} className="card hover:scale-105 transition-transform duration-300">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-32 h-40 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-primary/20 dark:to-accent/20 rounded-lg flex items-center justify-center">
                    <span className="text-5xl">📄</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-accent font-medium mb-2">
                      <span className="px-2 py-1 bg-gray-200 dark:bg-primary/10 rounded">{paper.category}</span>
                      <span>{paper.pages} sayfa</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white">{paper.title}</h3>
                    <p className="text-gray-600 dark:text-white/70 text-sm mb-3 line-clamp-2">{paper.excerpt}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-white/60 mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(paper.date).toLocaleDateString(locale)}
                    </div>
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !py-2 !px-4 text-sm inline-flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      PDF İndir
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Haberler */}
      <section id="news" className="section-padding scroll-mt-20 bg-transparent">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-gray-900 dark:text-white">{tNews('title')}</h2>
            <p className="text-xl text-gray-600 dark:text-white/70">{tNews('subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsItems.map((news) => (
              <article key={news.id} className="card hover:scale-105 transition-transform duration-300">
                <div className="mb-4 h-40 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-primary/20 dark:to-accent/20 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">📰</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-accent font-medium mb-3">
                  <span className="px-2 py-1 bg-gray-200 dark:bg-primary/10 rounded">
                    {news.type === 'portfolio' ? 'Portföy' : 'Şirket'}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-3 line-clamp-2 text-gray-900 dark:text-white">{news.title}</h3>
                <p className="text-gray-600 dark:text-white/70 text-sm mb-4 line-clamp-2">{news.excerpt}</p>

                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-white/60 mb-4">
                  <Calendar className="w-4 h-4" />
                  {new Date(news.date).toLocaleDateString(locale)}
                </div>

                <Link
                  href={`/${locale}/news/${news.slug}`}
                  className="text-gray-700 dark:text-accent hover:text-gray-900 dark:hover:text-accent-light font-medium inline-flex items-center gap-1"
                >
                  {tCommon('readMore')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
