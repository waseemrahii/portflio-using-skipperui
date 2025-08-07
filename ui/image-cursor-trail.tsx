"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ImageCursorTrailProps {
  items: string[]
  maxNumberOfImages?: number
  distance?: number
  imgClass?: string
  className?: string
  children: React.ReactNode
}

interface Trail {
  x: number
  y: number
  id: number
  image: string
}

export default function ImageCursorTrail({
  items,
  maxNumberOfImages = 5,
  distance = 25,
  imgClass,
  className,
  children,
}: ImageCursorTrailProps) {
  const [trails, setTrails] = useState<Trail[]>([])
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Check if cursor is over interactive elements
      const target = e.target as HTMLElement
      const isOverInteractive = target.closest('button, a, input, textarea, select, [role="button"], .no-cursor-trail')
      
      if (isOverInteractive) {
        setIsDisabled(true)
        return
      } else {
        setIsDisabled(false)
      }

      if (!isDisabled) {
        const newTrail: Trail = {
          x: e.clientX,
          y: e.clientY,
          id: Date.now(),
          image: items[Math.floor(Math.random() * items.length)],
        }
        setTrails((prev) => [...prev.slice(-maxNumberOfImages + 1), newTrail])
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [items, maxNumberOfImages, isDisabled])

  return (
    <div className={cn("relative", className)}>
      {!isDisabled && trails.map((trail, index) => (
        <img
          key={trail.id}
          src={trail.image || "/placeholder.svg"}
          alt="Cursor trail"
          className={cn(
            "fixed pointer-events-none z-30 transition-opacity duration-500 rounded-lg",
            imgClass
          )}
          style={{
            left: trail.x - distance,
            top: trail.y - distance,
            opacity: (index + 1) / trails.length,
          }}
        />
      ))}
      {children}
    </div>
  )
}
