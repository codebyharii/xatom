'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { pageview } from '@/lib/analytics'

export function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID) {
      pageview(pathname)
    }
  }, [pathname])

  // This component doesn't render anything, it just sets up analytics
  return null
}
