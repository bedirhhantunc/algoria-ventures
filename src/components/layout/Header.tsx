'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const t = useTranslations('nav')
  const params = useParams()
  const locale = params.locale as string
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('team'), href: `/${locale}/team` },
    { name: t('portfolio'), href: `/${locale}/portfolio` },
    { name: t('criteria'), href: `/${locale}/criteria` },
    { name: t('blog'), href: `/${locale}/blog` },
    { name: t('whitepapers'), href: `/${locale}/whitepapers` },
    { name: t('news'), href: `/${locale}/news` },
    { name: t('contact'), href: `/${locale}/contact` },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="text-2xl font-bold text-primary">
            Algoria <span className="text-secondary">Ventures</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            <LanguageSwitcher />
            <Link
              href={`/${locale}/submit`}
              className="btn-primary !py-2 !px-4 text-sm"
            >
              {t('submit')}
            </Link>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <LanguageSwitcher />
              <Link
                href={`/${locale}/submit`}
                className="btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('submit')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
