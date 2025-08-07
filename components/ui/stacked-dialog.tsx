"use client"

import React, { createContext, useContext, useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from 'lucide-react'

interface DialogStackContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
  setTotalSteps: (total: number) => void
  nextStep: () => void
  prevStep: () => void
}

const DialogStackContext = createContext<DialogStackContextType | undefined>(undefined)

const useDialogStack = () => {
  const context = useContext(DialogStackContext)
  if (!context) {
    throw new Error("useDialogStack must be used within a DialogStack")
  }
  return context
}

export const DialogStack: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <DialogStackContext.Provider
      value={{
        isOpen,
        setIsOpen,
        currentStep,
        setCurrentStep,
        totalSteps,
        setTotalSteps,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </DialogStackContext.Provider>
  )
}

export const DialogStackTrigger: React.FC<{
  children: React.ReactNode
  asChild?: boolean
}> = ({ children, asChild = false }) => {
  const { setIsOpen } = useDialogStack()

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: () => setIsOpen(true),
    })
  }

  return (
    <button onClick={() => setIsOpen(true)} className="cursor-pointer">
      {children}
    </button>
  )
}

export const DialogStackOverlay: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { isOpen, setIsOpen } = useDialogStack()

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-black/50 z-50 ${className}`}
      onClick={() => setIsOpen(false)}
    />
  )
}

export const DialogStackBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen, currentStep, setTotalSteps } = useDialogStack()
  const childrenArray = React.Children.toArray(children)

  useEffect(() => {
    setTotalSteps(childrenArray.length)
  }, [childrenArray.length, setTotalSteps])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {childrenArray[currentStep]}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export const DialogStackContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="p-6">{children}</div>
}

export const DialogStackHeader: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = "" }) => {
  const { setIsOpen } = useDialogStack()

  return (
    <div className={`relative mb-4 ${className}`}>
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-0 right-0 text-gray-400 hover:text-gray-600"
      >
        <X className="w-5 h-5" />
      </button>
      {children}
    </div>
  )
}

export const DialogStackFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex justify-between items-center mt-6">{children}</div>
}

export const DialogStackPrevious: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = "" }) => {
  const { prevStep, currentStep } = useDialogStack()

  if (currentStep === 0) return <div />

  return (
    <button
      onClick={prevStep}
      className={`flex items-center text-gray-600 hover:text-gray-800 transition-colors ${className}`}
    >
      {children}
    </button>
  )
}

export const DialogStackNext: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = "" }) => {
  const { nextStep, currentStep, totalSteps } = useDialogStack()

  if (currentStep === totalSteps - 1) return <div />

  return (
    <button
      onClick={nextStep}
      className={`flex items-center text-yellow-600 hover:text-yellow-700 transition-colors ${className}`}
    >
      {children}
    </button>
  )
}
