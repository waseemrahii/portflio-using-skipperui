"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface FlipLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function FlipLink({ href, children, className }: FlipLinkProps) {
  return (
    <Link href={href} className={`relative inline-block overflow-hidden ${className}`}>
      <motion.div
        className="relative"
        whileHover="hover"
        initial="initial"
      >
        <motion.span
          className="block"
          variants={{
            initial: { y: 0 },
            hover: { y: "-100%" }
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.span>
        <motion.span
          className="absolute top-0 left-0 block text-yellow-600"
          variants={{
            initial: { y: "100%" },
            hover: { y: 0 }
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.span>
      </motion.div>
    </Link>
  )
}
