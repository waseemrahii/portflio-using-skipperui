"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ShareLink {
  icon: React.ComponentType<any>
  onClick: () => void
  label: string
}

interface ShareButtonProps {
  links: ShareLink[]
  children: React.ReactNode
  className?: string
}

export default function ShareButton({ links, children, className }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition-colors no-cursor-trail",
          className
        )}
      >
        {children}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-[200px] z-50 no-cursor-trail"
          >
            {links.map((link, index) => (
              <button
                key={index}
                onClick={() => {
                  link.onClick()
                  setIsOpen(false)
                }}
                className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-gray-100 rounded-md transition-colors text-gray-700"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
