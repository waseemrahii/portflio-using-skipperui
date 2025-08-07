"use client"

import React, { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface Ripple {
  id: number
  x: number
  y: number
  timestamp: number
}

const ImageRipple: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ripplesRef = useRef<Ripple[]>([])
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const rippleIdRef = useRef(0)
  const animationFrameRef = useRef<number>()

  const images = [
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  ]

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    mousePositionRef.current = { x, y }
  }

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple: Ripple = {
      id: rippleIdRef.current++,
      x,
      y,
      timestamp: Date.now()
    }

    ripplesRef.current = [...ripplesRef.current, newRipple]
  }

  const drawRipples = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background gradient
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    )
    gradient.addColorStop(0, 'rgba(254, 205, 69, 0.1)')
    gradient.addColorStop(1, 'rgba(255, 165, 0, 0.05)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const currentTime = Date.now()

    // Draw ripples
    ripplesRef.current.forEach(ripple => {
      const age = currentTime - ripple.timestamp
      const maxAge = 2000 // 2 seconds
      
      if (age > maxAge) return

      const progress = age / maxAge
      const radius = progress * 200
      const opacity = 1 - progress

      // Outer ripple
      ctx.beginPath()
      ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(254, 205, 69, ${opacity * 0.6})`
      ctx.lineWidth = 2
      ctx.stroke()

      // Inner ripple
      ctx.beginPath()
      ctx.arc(ripple.x, ripple.y, radius * 0.5, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255, 165, 0, ${opacity * 0.8})`
      ctx.lineWidth = 1
      ctx.stroke()

      // Center dot
      if (progress < 0.3) {
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(254, 205, 69, ${(1 - progress / 0.3) * 0.8})`
        ctx.fill()
      }
    })

    // Mouse cursor effect
    const { x, y } = mousePositionRef.current
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(254, 205, 69, 0.3)'
    ctx.lineWidth = 1
    ctx.stroke()

    // Clean up old ripples
    ripplesRef.current = ripplesRef.current.filter(ripple => currentTime - ripple.timestamp < 2000)
  }

  useEffect(() => {
    const animate = () => {
      drawRipples()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, []) // Empty dependency array - only run once

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-yellow-50 to-orange-50 overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 opacity-10">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt=""
            className="absolute w-32 h-24 object-cover rounded-lg"
            style={{
              left: `${20 + (index * 20)}%`,
              top: `${30 + (index * 15)}%`,
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Ripple Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />

      {/* Instructions */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Interactive Ripple Effect</h2>
          <p className="text-gray-600 text-lg">Click anywhere to create ripples</p>
        </motion.div>
      </div>
    </div>
  )
}

export default ImageRipple
