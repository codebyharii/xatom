'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CountUpProps {
  value: number
  duration?: number
  decimals?: number
}

export function CountUp({ value, duration = 2, decimals = 0 }: CountUpProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / (duration * 1000)

      if (progress < 1) {
        setDisplayValue(Math.floor(value * progress * (10 ** decimals)) / (10 ** decimals))
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration, decimals])

  return <span>{displayValue.toFixed(decimals)}</span>
}
