'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  Home,
  Info,
  FileText,
  Mail
} from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'

export default function TubelightHeader() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('nav')

  const navItems = [
    { name: t('home'), url: `/${locale}`, icon: Home, shortName: 'ANA' },
    { name: t('about'), url: `/${locale}/about`, icon: Info, shortName: 'HKK' },
    { name: t('blog'), url: `/${locale}/blog`, icon: FileText, shortName: 'BLOG' },
    { name: t('contact'), url: `/${locale}/contact`, icon: Mail, shortName: 'İLT' },
  ]

  return <NavBar items={navItems} currentLocale={locale} />
}
