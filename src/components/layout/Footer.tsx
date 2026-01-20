'use client'

import React, { useState, type FC } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Linkedin, Twitter, Mail, Instagram, Facebook } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

/**
 * Props for the Footer component.
 */
interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Async function to handle email subscription. Should return `true` for success and `false` for failure. */
  onSubscribe?: (email: string) => Promise<boolean>
}

/**
 * A responsive and theme-adaptive footer component with newsletter subscription.
 */
export const Footer: FC<FooterProps> = ({ onSubscribe, className, ...props }) => {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const params = useParams()
  const locale = params.locale as string

  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  )

  const quickLinks = [
    { name: tNav('about'), href: `/${locale}/about` },
    { name: tNav('team'), href: `/${locale}/team` },
    { name: tNav('portfolio'), href: `/${locale}/portfolio` },
    { name: tNav('criteria'), href: `/${locale}/criteria` },
    { name: tNav('blog'), href: `/${locale}/blog` },
    { name: tNav('contact'), href: `/${locale}/contact` },
  ]

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: <Linkedin className="w-5 h-5" /> },
    { label: 'Twitter', href: 'https://twitter.com', icon: <Twitter className="w-5 h-5" /> },
    {
      label: 'Instagram',
      href: 'https://instagram.com',
      icon: <Instagram className="w-5 h-5" />,
    },
    { label: 'Facebook', href: 'https://facebook.com', icon: <Facebook className="w-5 h-5" /> },
  ]

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)

    // If onSubscribe is provided, use it; otherwise simulate success
    const success = onSubscribe ? await onSubscribe(email) : true

    setSubscriptionStatus(success ? 'success' : 'error')
    setIsSubmitting(false)

    if (success) {
      setEmail('')
    }

    // Reset the status message after 3 seconds
    setTimeout(() => {
      setSubscriptionStatus('idle')
    }, 3000)
  }

  return (
    <footer className={cn('bg-gray-50 dark:bg-primary text-gray-900 dark:text-white', className)} {...props}>
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        {/* Company Info */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">A</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Algoria <span className="text-gray-600 dark:text-white/60">Ventures</span>
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-white/80">{t('description')}</p>
        </div>

        {/* Useful Links */}
        <div className="md:justify-self-center">
          <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">{t('quickLinks')}</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-700 dark:text-white/80 transition-colors hover:text-gray-900 dark:hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div className="md:justify-self-center">
          <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">{t('followUs')}</h3>
          <ul className="space-y-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-white/80 transition-colors hover:text-gray-900 dark:hover:text-white"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">{t('newsletter')}</h3>
          <form onSubmit={handleSubscribe} className="relative w-full max-w-sm">
            <div className="relative">
              <Input
                type="email"
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || subscriptionStatus !== 'idle'}
                required
                aria-label="Email for newsletter"
                className="pr-28 bg-gray-200 dark:bg-white/10 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/60"
              />
              <Button
                type="submit"
                disabled={isSubmitting || subscriptionStatus !== 'idle'}
                className="absolute right-0 top-0 h-full rounded-l-none px-4 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-white/90 text-white dark:text-primary font-semibold"
              >
                {isSubmitting ? t('subscribing') : t('subscribe')}
              </Button>
            </div>
            {/* Advanced Animation Overlay */}
            {(subscriptionStatus === 'success' || subscriptionStatus === 'error') && (
              <div
                key={subscriptionStatus} // Re-trigger animation on status change
                className="animate-in fade-in absolute inset-0 flex items-center justify-center rounded-lg bg-white/95 dark:bg-primary/95 text-center backdrop-blur-sm"
              >
                {subscriptionStatus === 'success' ? (
                  <span className="font-semibold text-green-600 dark:text-green-400">{t('subscribed')}</span>
                ) : (
                  <span className="font-semibold text-red-600 dark:text-red-400">{t('subscribeFailed')}</span>
                )}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 dark:border-white/20">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-white/60">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
