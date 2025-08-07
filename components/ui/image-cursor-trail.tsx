"use client"

import React, { useState, useEffect, useRef, useCallback, ReactNode } from "react"

interface ImageCursorTrailProps {
  children: ReactNode
  items: string[]
  maxNumberOfImages?: number
  distance?: number
  imgClass?: string
  className?: string
}

interface TrailImage {
  id: number
  x: number
  y: number
  src: string
  opacity: number
  scale: number
}

const ImageCursorTrail: React.FC<ImageCursorTrailProps> = ({
  children,
  items,
  maxNumberOfImages = 5,
  distance = 20,
  imgClass = "w-32 h-40 rounded-lg",
  className = "",
}) => {
  const [images, setImages] = useState<TrailImage[]>([])
  const [isOverInteractive, setIsOverInteractive] = useState(false)
  const imageIdRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastMouseMoveTime = useRef(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now()
    if (now - lastMouseMoveTime.current < 100) return // Throttle to prevent excessive updates
    lastMouseMoveTime.current = now

    const target = e.target as HTMLElement
    const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], .no-cursor-trail')
    
    setIsOverInteractive(!!isInteractive)

    if (!isInteractive && items.length > 0) {
      const randomImage = items[Math.floor(Math.random() * items.length)]
      
      setImages(prev => {
        const newImages = [...prev]
        
        if (newImages.length >= maxNumberOfImages) {
          newImages.shift()
        }
        
        newImages.push({
          id: imageIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          src: randomImage,
          opacity: 1,
          scale: 0.8 + Math.random() * 0.4,
        })
        
        return newImages
      })
    }
  }, [items, maxNumberOfImages])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  useEffect(() => {
    const interval = setInterval(() => {
      setImages(prev => 
        prev.map(img => ({
          ...img,
          opacity: Math.max(0, img.opacity - 0.05),
        })).filter(img => img.opacity > 0)
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}
      
      {!isOverInteractive && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.src || "/placeholder.svg"}
              alt=""
              className={`absolute ${imgClass} object-cover shadow-lg transition-all duration-300`}
              style={{
                left: image.x - 60,
                top: image.y - 80,
                opacity: image.opacity,
                transform: `scale(${image.scale}) rotate(${(image.x % 20) - 10}deg)`,
                zIndex: 30,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageCursorTrail
