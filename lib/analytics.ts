// Google Analytics Setup
// Add your Google Analytics ID to .env.local
// NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag.pageview({
      page_path: url,
    })
  }
}

export const event = (name: string, params: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag.event(name, params)
  }
}
