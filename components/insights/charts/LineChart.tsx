'use client'

import { useEffect, useRef } from 'react'

interface LineChartProps {
  data: any[]
}

export default function LineChart({ data }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const rect = canvas.parentElement?.getBoundingClientRect()
    if (rect) {
      canvas.width = rect.width
      canvas.height = rect.height
    }

    // Get data for chart
    const values = data.map(row => {
      const numVal = Object.values(row).find(v => typeof v === 'number')
      return typeof numVal === 'number' ? numVal : Math.random() * 100
    })

    // Chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const pointSpacing = chartWidth / (values.length - 1 || 1)
    const maxValue = Math.max(...values)

    // Draw background
    ctx.fillStyle = 'transparent'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw line
    ctx.strokeStyle = '#00D4FF'
    ctx.lineWidth = 3
    ctx.beginPath()

    values.forEach((value, index) => {
      const x = padding + index * pointSpacing
      const y = canvas.height - padding - (value / maxValue) * chartHeight
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw area under line
    const gradient = ctx.createLinearGradient(0, padding, 0, canvas.height - padding)
    gradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)')
    gradient.addColorStop(1, 'rgba(0, 212, 255, 0.05)')
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw points
    values.forEach((value, index) => {
      const x = padding + index * pointSpacing
      const y = canvas.height - padding - (value / maxValue) * chartHeight

      ctx.fillStyle = '#00D4FF'
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()

      // Inner circle
      ctx.fillStyle = '#0D0D12'
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw axes
    ctx.strokeStyle = '#A09CB8'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.stroke()
  }, [data])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
