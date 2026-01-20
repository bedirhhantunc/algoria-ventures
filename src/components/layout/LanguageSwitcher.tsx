'use client'

import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Globe } from 'lucide-react'
import { useState } from 'react'

const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
]

export default function LanguageSwitcher() {
  const params = useParams()
  const pathname = usePathname()
  const currentLocale = params.locale as string
  const [isOpen, setIsOpen] = useState(false)

  const switchLanguage = (newLocale: string) => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    return newPathname
  }

  const currentLanguage = languages.find((lang) => lang.code === currentLocale)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={switchLanguage(lang.code)}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 hover:bg-gray-100 transition-colors ${
                lang.code === currentLocale ? 'bg-secondary/10 font-semibold' : ''
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
