"use client"

import React from "react"
import { motion } from "framer-motion"

interface FlipLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  target?: string
}

const FlipLink: React.FC<FlipLinkProps> = ({
  href,
  children,
  className = "",
  target = "_blank",
}) => {
  return (
    <motion.a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className={`relative inline-block overflow-hidden ${className}`}
      whileHover="hover"
    >
      <motion.span
        className="block"
        variants={{
          hover: { y: "-100%" }
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 block"
        initial={{ y: "100%" }}
        variants={{
          hover: { y: "0%" }
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.span>
    </motion.a>
  )
}

export default FlipLink
