import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import '../globals.css'
import TubelightHeader from '@/components/layout/TubelightHeader'
import Footer from '@/components/layout/Footer'
import { locales } from '@/i18n'
import StarfieldBackground from '@/components/layout/StarfieldBackground'
import { ThemeProvider } from '@/components/providers/theme-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Algoria Ventures - Geleceği Şekillendiren Teknoloji Liderlerine Yatırım',
  description:
    'Erken aşama teknoloji girişimlerine sermaye, mentorluk ve network sağlayan önde gelen venture capital fonu',
  keywords: 'venture capital, startup investment, technology, funding, turkiye',
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="relative bg-white dark:bg-primary transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            <StarfieldBackground />
          </div>
          <div className="relative" style={{ zIndex: 10 }}>
            <NextIntlClientProvider messages={messages}>
              <TubelightHeader />
              <main>{children}</main>
              <Footer />
            </NextIntlClientProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
