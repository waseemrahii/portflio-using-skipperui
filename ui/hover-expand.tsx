"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface HoverExpandProps {
  images: string[]
  initialSelectedIndex?: number
  thumbnailHeight?: number
  modalImageSize?: number
  maxThumbnails?: number
  className?: string
}

export default function HoverExpand({
  images,
  initialSelectedIndex = 0,
  thumbnailHeight = 200,
  modalImageSize = 300,
  maxThumbnails = 10,
  className,
}: HoverExpandProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const displayImages = images.slice(0, maxThumbnails)

  return (
    <div className={cn("flex flex-wrap gap-4 p-8 justify-center relative", className)}>
      {displayImages.map((image, index) => (
        <motion.div
          key={index}
          className="relative cursor-pointer no-cursor-trail"
          style={{ height: thumbnailHeight, width: thumbnailHeight }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => setSelectedIndex(index)}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={image || "/placeholder.svg"}
            alt={`Gallery ${index + 1}`}
            className={cn(
              "w-full h-full object-cover rounded-xl transition-all duration-300 shadow-lg",
              selectedIndex === index && "ring-4 ring-yellow-400 shadow-yellow-200",
              hoveredIndex === index && "shadow-2xl"
            )}
          />
          
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="fixed pointer-events-none z-50 no-cursor-trail"
                style={{
                  width: modalImageSize,
                  height: modalImageSize,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Expanded ${index + 1}`}
                    className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
