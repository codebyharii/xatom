'use client'

import { useEffect, useRef } from 'react'

interface PieChartProps {
  data: any[]
}

const COLORS = ['#7B5EFF', '#00D4FF', '#00E5A0', '#FFB347', '#FF6B9D', '#A78BFA']

export default function PieChart({ data }: PieChartProps) {
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

    const total = values.reduce((a, b) => a + b, 0)

    // Chart dimensions
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(canvas.width, canvas.height) / 3

    // Draw background
    ctx.fillStyle = 'transparent'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw pie slices
    let currentAngle = -Math.PI / 2
    values.forEach((value, index) => {
      const sliceAngle = (value / total) * Math.PI * 2

      // Draw slice
      ctx.fillStyle = COLORS[index % COLORS.length]
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.closePath()
      ctx.fill()

      // Draw border
      ctx.strokeStyle = '#0D0D12'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw percentage label
      const labelAngle = currentAngle + sliceAngle / 2
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)

      const percentage = Math.round((value / total) * 100)
      ctx.fillStyle = '#F0EFFE'
      ctx.font = 'bold 12px Inter'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      if (percentage > 5) {
        ctx.fillText(`${percentage}%`, labelX, labelY)
      }

      currentAngle += sliceAngle
    })

    // Draw legend
    let legendY = centerY + radius + 40
    values.forEach((value, index) => {
      const percentage = Math.round((value / total) * 100)

      // Color box
      ctx.fillStyle = COLORS[index % COLORS.length]
      ctx.fillRect(50, legendY, 12, 12)

      // Label
      ctx.fillStyle = '#F0EFFE'
      ctx.font = '11px Inter'
      ctx.textAlign = 'left'
      ctx.fillText(`Item ${index + 1}: ${percentage}%`, 70, legendY + 9)

      legendY += 20
    })
  }, [data])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
