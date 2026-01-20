"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  shortName?: string
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  currentLocale?: string
}

const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
]

export function NavBar({ items, className, currentLocale = 'tr' }: NavBarProps) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [currentHash, setCurrentHash] = useState('')

  // Listen to hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }

    setCurrentHash(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  // Update active tab based on current path (including hash)
  useEffect(() => {
    const currentItem = items.find(item => {
      // Check if paths match (ignoring hash)
      const itemPathWithoutHash = item.url.split('#')[0]

      return pathname === itemPathWithoutHash ||
             (pathname === `/${currentLocale}` && item.url.endsWith(`/${currentLocale}`))
    })

    if (currentItem) {
      setActiveTab(currentItem.name)
    }
  }, [pathname, currentHash, items, currentLocale])

  const switchLanguage = (newLocale: string) => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    return newPathname
  }

  const currentLanguage = languages.find((lang) => lang.code === currentLocale)

  return (
    <>
      {/* Main Navigation - Centered and Wider */}
      <div
        className={cn(
          "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6 pointer-events-none",
          className,
        )}
      >
        <div className="flex items-center gap-3 bg-white/90 dark:bg-background/5 border border-gray-300 dark:border-white/40 backdrop-blur-lg py-1 px-1.5 rounded-full shadow-lg pointer-events-auto">
          {items.map((item) => {
            const isActive = activeTab === item.name

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-8 py-2 rounded-full transition-colors",
                  isActive ? "bg-gray-200 dark:bg-muted text-gray-900 dark:text-primary" : "text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-accent",
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden text-xs uppercase font-bold">
                  {item.shortName || item.name.substring(0, 3)}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-gray-300/50 dark:bg-primary/5 rounded-full -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 35,
                      mass: 0.8,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-700 dark:bg-white rounded-t-full shadow-[0_0_6px_rgba(0,0,0,0.3)] dark:shadow-[0_0_6px_rgba(255,255,255,0.5)]">
                      <div className="absolute w-12 h-6 bg-gray-700/15 dark:bg-white/15 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-gray-700/20 dark:bg-white/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-gray-700/25 dark:bg-white/25 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Theme Toggle & Language Switcher - Fixed to Right */}
      <div className="fixed top-6 right-6 z-50 pointer-events-none flex gap-2">
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>

        <div className="relative pointer-events-auto">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center justify-center gap-1.5 h-8 px-2.5 bg-white/90 dark:bg-background/5 border border-gray-300 dark:border-white/40 backdrop-blur-lg rounded-full hover:bg-gray-100 dark:hover:bg-muted transition-colors shadow-lg text-gray-700 dark:text-white"
          >
            <Globe className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {currentLanguage?.code}
            </span>
          </button>

          {/* Language Dropdown */}
          {isLangOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsLangOpen(false)}
              />

              {/* Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-10 bg-white/90 dark:bg-background/5 border border-gray-300 dark:border-white/40 backdrop-blur-lg rounded-full shadow-2xl overflow-hidden z-50"
              >
              <div className="py-1 px-1">
                {languages.map((lang) => {
                  const isActive = lang.code === currentLocale

                  return (
                    <Link
                      key={lang.code}
                      href={switchLanguage(lang.code)}
                      onClick={() => setIsLangOpen(false)}
                      className={cn(
                        "relative flex items-center justify-center gap-1.5 px-2.5 py-1.5 transition-all",
                        "text-xs font-semibold",
                        isActive ? "bg-gray-200 dark:bg-muted text-gray-900 dark:text-primary rounded-full" : "text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-accent hover:bg-gray-100 dark:hover:bg-white/10 rounded-full"
                      )}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span className="uppercase font-bold text-[10px] tracking-wider">{lang.code}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeLang"
                          className="absolute inset-0 bg-primary/5 rounded-full -z-10"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  )
                })}
              </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
