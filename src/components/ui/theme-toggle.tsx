"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Default to dark mode skeleton during SSR
    return (
      <div
        className={cn(
          "w-16 h-8 p-1 rounded-full border border-white/20 bg-white/10",
          className
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark
          ? "bg-white/10 border border-white/20"
          : "bg-white/90 border border-gray-300",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="button"
      tabIndex={0}
      aria-label="Toggle theme"
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark
              ? "transform translate-x-0 bg-white/20"
              : "transform translate-x-8 bg-gray-700"
          )}
        >
          {isDark ? (
            <Moon
              className="w-4 h-4 text-white"
              strokeWidth={1.5}
            />
          ) : (
            <Sun
              className="w-4 h-4 text-white"
              strokeWidth={1.5}
            />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark
              ? "bg-transparent"
              : "transform -translate-x-8"
          )}
        >
          {isDark ? (
            <Sun
              className="w-4 h-4 text-white/50"
              strokeWidth={1.5}
            />
          ) : (
            <Moon
              className="w-4 h-4 text-gray-500"
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>
    </div>
  )
}
