"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

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

const ShareButton: React.FC<ShareButtonProps> = ({ links, children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className={`border-yellow-300 hover:border-yellow-400 hover:bg-yellow-50 ${className}`}
      >
        {children}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50"
          >
            <div className="flex flex-col space-y-1 min-w-[150px]">
              {links.map((link, index) => (
                <button
                  key={index}
                  onClick={() => {
                    link.onClick()
                    setIsOpen(false)
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default ShareButton
