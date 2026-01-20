'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MagneticText } from '@/components/ui/morphing-cursor'
import { getBasePath } from '@/lib/utils'

export default function Hero() {
  const t = useTranslations('home.hero')
  const params = useParams()
  const locale = params.locale as string
  const basePath = getBasePath()

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-transparent">

      <div className="container-custom relative z-20" style={{ paddingTop: 'calc(50rem - 650px)' }}>
        <div className="max-w-5xl mx-auto text-center text-gray-900 dark:text-white">
          {/* Magnetic Text Effect */}
          <div className="mb-12 flex flex-col items-center">
            <div className="magnetic-text-wrapper text-5xl md:text-7xl">
              <MagneticText
                text="ALGORIA VENTURES"
                hoverText={locale === 'en' ? 'SHAPING FUTURE' : locale === 'ar' ? 'نشكل المستقبل' : 'GELECEĞE YATIRIM'}
              />
            </div>
          </div>

          <h2 className="text-xl md:text-2xl mb-6 font-light max-w-3xl mx-auto">{t('title')}</h2>
          <p className="text-lg md:text-xl mb-12 text-gray-600 dark:text-white/80 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${basePath}/${locale}/contact#pitch`}
              className="btn-secondary inline-flex items-center justify-center gap-2 group"
            >
              {t('cta_founders')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`${basePath}/${locale}/about#criteria`}
              className="btn-outline bg-gray-100 dark:bg-white/10 border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-primary inline-flex items-center justify-center gap-2"
            >
              {t('cta_investors')}
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes dotMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 30px 30px;
          }
        }

        .magnetic-text-wrapper span {
          color: #0A0908 !important;
        }

        .dark .magnetic-text-wrapper span {
          color: white !important;
        }

        .magnetic-text-wrapper .bg-foreground {
          background-color: #EAE0D5 !important;
        }

        .magnetic-text-wrapper .text-background {
          color: white !important;
        }

        .dark .magnetic-text-wrapper .text-background {
          color: #0A0908 !important;
        }
      `}</style>
    </section>
  )
}
