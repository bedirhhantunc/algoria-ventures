import { InvestmentFocus } from '@/types'

export const investmentFocusData: InvestmentFocus[] = [
  {
    id: '1',
    title: 'SaaS',
    icon: 'Cloud',
    description: 'B2B ve B2C SaaS çözümlerine yatırım yapıyoruz',
  },
  {
    id: '2',
    title: 'FinTech',
    icon: 'DollarSign',
    description: 'Finansal teknolojiler ve ödeme sistemleri',
  },
  {
    id: '3',
    title: 'HealthTech',
    icon: 'Heart',
    description: 'Sağlık teknolojileri ve dijital sağlık platformları',
  },
  {
    id: '4',
    title: 'E-Commerce',
    icon: 'ShoppingCart',
    description: 'Yeni nesil e-ticaret ve marketplace çözümleri',
  },
  {
    id: '5',
    title: 'AI & ML',
    icon: 'Brain',
    description: 'Yapay zeka ve makine öğrenmesi uygulamaları',
  },
  {
    id: '6',
    title: 'EdTech',
    icon: 'GraduationCap',
    description: 'Eğitim teknolojileri ve online öğrenme platformları',
  },
]

export const investmentStages = [
  {
    id: 'seed',
    title: 'Tohum (Seed)',
    range: '$100K - $500K',
    description: 'İlk ürün geliştirme ve pazar testi',
  },
  {
    id: 'pre-series-a',
    title: 'Pre-Series A',
    range: '$500K - $2M',
    description: 'Ürün-pazar uyumu ve ilk satışlar',
  },
  {
    id: 'series-a',
    title: 'Series A',
    range: '$2M - $10M',
    description: 'Ölçekleme ve pazar genişletme',
  },
]
