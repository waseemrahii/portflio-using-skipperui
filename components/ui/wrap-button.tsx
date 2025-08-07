"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface WrapButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "default" | "outline" | "ghost"
}

const WrapButton: React.FC<WrapButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "outline",
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={onClick}
        variant={variant}
        className={`border-yellow-300 hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300 ${className}`}
      >
        {children}
      </Button>
    </motion.div>
  )
}

export default WrapButton
