"use client"

import React from "react"

interface MaskedDivProps {
  children: React.ReactNode
  maskType: "type-1" | "type-2" | "type-3" | "type-4"
  size?: number
  className?: string
}

const MaskedDiv: React.FC<MaskedDivProps> = ({
  children,
  maskType,
  size = 1,
  className = "",
}) => {
  const getMaskPath = (type: string) => {
    switch (type) {
      case "type-1":
        return "polygon(0% 0%, 100% 0%, 85% 100%, 0% 85%)"
      case "type-2":
        return "polygon(20% 0%, 100% 0%, 100% 80%, 0% 100%)"
      case "type-3":
        return "circle(50% at 50% 50%)"
      case "type-4":
        return "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
      default:
        return "none"
    }
  }

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        clipPath: getMaskPath(maskType),
        transform: `scale(${size})`,
      }}
    >
      {children}
    </div>
  )
}

export default MaskedDiv
