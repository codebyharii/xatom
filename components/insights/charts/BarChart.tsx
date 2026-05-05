'use client'

import { useEffect, useRef } from 'react'

interface BarChartProps {
  data: any[]
}

export default function BarChart({ data }: BarChartProps) {
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
    const keys = Object.keys(data[0])
    const labels = data.map((row, i) => `Item ${i + 1}`)
    const values = data.map(row => {
      const numVal = Object.values(row).find(v => typeof v === 'number')
      return typeof numVal === 'number' ? numVal : Math.random() * 100
    })

    // Chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const barWidth = chartWidth / values.length - 10
    const maxValue = Math.max(...values)

    // Draw background
    ctx.fillStyle = 'transparent'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw bars with animation
    values.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight
      const x = padding + index * (barWidth + 10)
      const y = canvas.height - padding - barHeight

      // Bar
      const gradient = ctx.createLinearGradient(x, y, x, canvas.height - padding)
      gradient.addColorStop(0, '#7B5EFF')
      gradient.addColorStop(1, '#00D4FF')
      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Label
      ctx.fillStyle = '#F0EFFE'
      ctx.font = '12px Inter'
      ctx.textAlign = 'center'
      ctx.fillText(String(Math.round(value)), x + barWidth / 2, canvas.height - padding + 20)
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
