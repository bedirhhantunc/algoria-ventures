import { cn } from "@/lib/utils"
import Link from "next/link"

export interface TestimonialAuthor {
  name: string
  role: string
  avatar?: string
}

interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
}

export function TestimonialCard({ author, text, href }: TestimonialCardProps) {
  const content = (
    <div className="card hover:scale-105 transition-all duration-300 min-w-[320px] max-w-[400px] cursor-pointer">
      <p className="text-gray-600 dark:text-white/80 text-sm mb-4 line-clamp-4">{text}</p>
      <div className="flex items-center gap-3">
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-500 dark:from-accent dark:to-secondary rounded-full flex items-center justify-center text-white dark:text-primary font-bold">
            {author.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900 dark:text-white text-sm">{author.name}</p>
          <p className="text-xs text-gray-500 dark:text-white/60">{author.role}</p>
        </div>
      </div>
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
