"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"

interface PopoverFormProps {
  title: string
  open: boolean
  setOpen: (open: boolean) => void
  width?: string
  height?: string
  showCloseButton?: boolean
  showSuccess?: boolean
  openChild: React.ReactNode
  successChild?: React.ReactNode
}

export function PopoverForm({
  title,
  open,
  setOpen,
  width = "320px",
  height = "auto",
  showCloseButton = true,
  showSuccess = false,
  openChild,
  successChild,
}: PopoverFormProps) {
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors no-cursor-trail"
      >
        {title}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 no-cursor-trail"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl relative"
              style={{ width, height }}
              onClick={(e) => e.stopPropagation()}
            >
              {showCloseButton && (
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {showSuccess ? successChild : openChild}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function PopoverFormButton({
  loading,
  text,
  className,
}: {
  loading?: boolean
  text: string
  className?: string
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={cn(
        "w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2",
        className
      )}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {text}
    </button>
  )
}

export function PopoverFormSuccess({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="p-6 text-center">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export function PopoverFormSeparator() {
  return <div className="w-full h-px bg-gray-200" />
}

export function PopoverFormCutOutLeftIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M0 6C0 2.68629 2.68629 0 6 0V12C2.68629 12 0 9.31371 0 6Z" fill="white" />
    </svg>
  )
}

export function PopoverFormCutOutRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M12 6C12 2.68629 9.31371 0 6 0V12C9.31371 12 12 9.31371 12 6Z" fill="white" />
    </svg>
  )
}
