// Web Vitals tracking for performance monitoring
// This tracks Core Web Vitals: LCP, FID, CLS, FCP, TTFB

export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    // Send to your analytics service
    if ((window as any).gtag) {
      (window as any).gtag.event(metric.name, {
        value: Math.round(metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      })
    }

    // Log in development
    console.log(`${metric.name}:`, metric.value)
  }
}
