'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Starfield } from '@/components/ui/starfield-1'

export default function StarfieldBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Force re-render when theme changes
  useEffect(() => {
    if (mounted) {
      setKey(prev => prev + 1)
    }
  }, [resolvedTheme, mounted])

  if (!mounted) {
    // Render dark mode by default during SSR
    return (
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <Starfield
          starColor="rgba(234,224,213,1)"
          bgColor="rgba(10,9,8,1)"
          speed={0.5}
          quantity={400}
        />
      </div>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <>
      {isDark ? (
        <Starfield
          key="dark-stars"
          starColor="rgba(234,224,213,1)"
          bgColor="rgba(10,9,8,1)"
          speed={0.5}
          quantity={400}
        />
      ) : (
        <Starfield
          key="light-stars"
          starColor="#000000"
          bgColor="rgba(255,255,255,1)"
          speed={0.5}
          quantity={400}
        />
      )}
    </>
  )
}
