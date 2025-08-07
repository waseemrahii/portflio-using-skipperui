"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const DialogStack = DialogPrimitive.Root

const DialogStackTrigger = DialogPrimitive.Trigger

const DialogStackPortal = DialogPrimitive.Portal

const DialogStackClose = DialogPrimitive.Close

const DialogStackOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogStackOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogStackBody = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const childrenArray = React.Children.toArray(children)

  const contextValue = React.useMemo(
    () => ({
      currentIndex,
      setCurrentIndex,
      totalItems: childrenArray.length,
      goNext: () => setCurrentIndex((prev) => Math.min(prev + 1, childrenArray.length - 1)),
      goPrevious: () => setCurrentIndex((prev) => Math.max(prev - 1, 0)),
    }),
    [currentIndex, childrenArray.length]
  )

  return (
    <DialogStackPortal>
      <DialogStackOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...props}
      >
        <DialogStackContext.Provider value={contextValue}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {childrenArray[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </DialogStackContext.Provider>
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogStackPortal>
  )
})
DialogStackBody.displayName = "DialogStackBody"

const DialogStackContext = React.createContext<{
  currentIndex: number
  setCurrentIndex: (index: number) => void
  totalItems: number
  goNext: () => void
  goPrevious: () => void
} | null>(null)

const useDialogStack = () => {
  const context = React.useContext(DialogStackContext)
  if (!context) {
    throw new Error("useDialogStack must be used within a DialogStackBody")
  }
  return context
}

const DialogStackContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-4", className)}
    {...props}
  />
))
DialogStackContent.displayName = "DialogStackContent"

const DialogStackHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
))
DialogStackHeader.displayName = "DialogStackHeader"

const DialogStackFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2", className)}
    {...props}
  />
))
DialogStackFooter.displayName = "DialogStackFooter"

const DialogStackNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { goNext, currentIndex, totalItems } = useDialogStack()
  const isLast = currentIndex === totalItems - 1

  return (
    <button
      ref={ref}
      onClick={goNext}
      disabled={isLast}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-500 text-white hover:bg-yellow-600 h-10 px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
DialogStackNext.displayName = "DialogStackNext"

const DialogStackPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { goPrevious, currentIndex } = useDialogStack()
  const isFirst = currentIndex === 0

  return (
    <button
      ref={ref}
      onClick={goPrevious}
      disabled={isFirst}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
DialogStackPrevious.displayName = "DialogStackPrevious"

export {
  DialogStack,
  DialogStackTrigger,
  DialogStackBody,
  DialogStackContent,
  DialogStackHeader,
  DialogStackFooter,
  DialogStackNext,
  DialogStackPrevious,
  DialogStackOverlay,
  DialogStackClose,
}
