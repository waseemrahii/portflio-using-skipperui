"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface MaskedDivProps {
  children: React.ReactNode
  maskType: "type-1" | "type-2" | "type-3" | "type-4"
  size?: number
  className?: string
}

const maskPaths = {
  "type-1": "polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)",
  "type-2": "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
  "type-3": "polygon(0% 0%, 100% 0%, 100% 85%, 0% 100%)",
  "type-4": "polygon(0% 15%, 100% 0%, 100% 100%, 0% 100%)",
}

export default function MaskedDiv({
  children,
  maskType,
  size = 1,
  className,
}: MaskedDivProps) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{
        clipPath: maskPaths[maskType],
        transform: `scale(${size})`,
      }}
    >
      {children}
    </div>
  )
}
