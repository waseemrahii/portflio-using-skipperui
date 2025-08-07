"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface PopoverFormProps {
  title: string
  open: boolean
  setOpen: (open: boolean) => void
  width?: string
  showCloseButton?: boolean
  showSuccess?: boolean
  openChild: React.ReactNode
  className?: string
}

export const PopoverForm: React.FC<PopoverFormProps> = ({
  title,
  open,
  setOpen,
  width = "320px",
  showCloseButton = true,
  showSuccess = false,
  openChild,
  className = "",
}) => {
  const [isSuccess, setIsSuccess] = useState(showSuccess)

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={() => setOpen(true)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white"
      >
        {title}
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              style={{ width }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  {showCloseButton && (
                    <button
                      onClick={() => setOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {isSuccess ? (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-green-600 font-medium">Message sent successfully!</p>
                  </div>
                ) : (
                  openChild
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export const PopoverFormButton: React.FC<{ text: string; onClick?: () => void }> = ({
  text,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
    >
      {text}
    </Button>
  )
}

export const PopoverFormSuccess: React.FC = () => {
  return (
    <div className="text-center py-4">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <Check className="w-6 h-6 text-green-600" />
      </div>
      <p className="text-green-600 font-medium">Success!</p>
    </div>
  )
}
