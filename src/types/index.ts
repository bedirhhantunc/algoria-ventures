export interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image: string
  linkedin?: string
  twitter?: string
  email?: string
}

export interface PortfolioCompany {
  id: string
  name: string
  logo: string
  description: string
  sector: string
  status: 'active' | 'exit'
  year: number
  website: string
  featured?: boolean
  image?: string
}

export interface InvestmentFocus {
  id: string
  title: string
  icon: string
  description: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  author: string
  image: string
  excerpt: string
  content: string
  readingTime?: number
}

export interface Whitepaper {
  slug: string
  title: string
  date: string
  category: string
  image: string
  excerpt: string
  content: string
  pdfUrl?: string
}

export interface NewsItem {
  slug: string
  title: string
  date: string
  image: string
  excerpt: string
  content?: string
  externalUrl?: string
  source?: string
}

export type Locale = 'tr' | 'en' | 'ar'
