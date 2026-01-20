'use client'

import { useTranslations } from 'next-intl'
import { investmentFocusData } from '@/data/investmentFocus'
import { Cloud, DollarSign, Heart, ShoppingCart, Brain, GraduationCap } from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  DollarSign,
  Heart,
  ShoppingCart,
  Brain,
  GraduationCap,
}

export default function InvestmentFocus() {
  const t = useTranslations('home.investmentFocus')

  return (
    <section className="section-padding bg-transparent dark:bg-secondary/10">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-gray-900 dark:text-white">{t('title')}</h2>
          <p className="text-xl text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {investmentFocusData.map((focus) => {
            const Icon = iconMap[focus.icon]
            return (
              <div
                key={focus.id}
                className="card hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-700/20 dark:bg-accent/20 rounded-lg flex items-center justify-center border border-gray-700/40 dark:border-accent/30">
                    <Icon className="w-6 h-6 text-gray-700 dark:text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{focus.title}</h3>
                    <p className="text-gray-600 dark:text-white/70">{focus.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
