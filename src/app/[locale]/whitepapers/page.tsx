'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Calendar, Download, ArrowRight } from 'lucide-react'

const whitepapers = [
  {
    id: '1',
    slug: 'turkiye-vc-landscape-2024',
    title: 'Türkiye Venture Capital Landscape 2024',
    excerpt: 'Türkiye\'deki venture capital ekosisteminin kapsamlı analizi ve gelecek öngörüleri.',
    category: 'Pazar Raporu',
    date: '2024-01-01',
    pages: 42,
    image: '/images/whitepapers/wp1.jpg',
    pdfUrl: '/whitepapers/turkey-vc-2024.pdf',
  },
  {
    id: '2',
    slug: 'saas-metrics-guide',
    title: 'SaaS Metrikleri: Kapsamlı Rehber',
    excerpt: 'SaaS şirketleri için kritik metrikler ve bunları nasıl iyileştireceğinize dair stratejiler.',
    category: 'Teknik Rapor',
    date: '2023-12-15',
    pages: 28,
    image: '/images/whitepapers/wp2.jpg',
    pdfUrl: '/whitepapers/saas-metrics.pdf',
  },
  {
    id: '3',
    slug: 'fintech-regulation-mena',
    title: 'FinTech Regulasyonları: MENA Bölgesi',
    excerpt: 'Orta Doğu ve Kuzey Afrika bölgesinde FinTech düzenlemeleri ve uyumluluk rehberi.',
    category: 'Düzenleme Raporu',
    date: '2023-11-20',
    pages: 35,
    image: '/images/whitepapers/wp3.jpg',
    pdfUrl: '/whitepapers/fintech-regulation.pdf',
  },
]

export default function WhitepapersPage() {
  const t = useTranslations('whitepapers')
  const params = useParams()
  const locale = params.locale as string

  const categories = ['Tümü', 'Pazar Raporu', 'Teknik Rapor', 'Düzenleme Raporu']

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
            {whitepapers.map((paper) => (
              <article key={paper.id} className="card hover:scale-105 transition-transform duration-300">
                <div className="mb-4 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <span className="text-6xl">📄</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-accent font-medium mb-3">
                  <span className="px-2 py-1 bg-primary/10 rounded">{paper.category}</span>
                  <span>{paper.pages} sayfa</span>
                </div>

                <h2 className="text-xl font-bold mb-3 line-clamp-2">{paper.title}</h2>

                <p className="text-white/70 text-sm mb-4 line-clamp-3">{paper.excerpt}</p>

                <div className="flex items-center gap-1 text-sm text-white/60 mb-4">
                  <Calendar className="w-4 h-4" />
                  {new Date(paper.date).toLocaleDateString(locale)}
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/${locale}/whitepapers/${paper.slug}`}
                    className="flex-1 btn-outline !py-2 text-sm inline-flex items-center justify-center gap-1"
                  >
                    Detaylar
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !py-2 text-sm inline-flex items-center justify-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    PDF
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
