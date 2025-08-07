"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, Globe } from 'lucide-react'
import { cn } from "@/lib/utils"

interface WrapButtonProps {
  className?: string
  children: React.ReactNode
  href?: string
  onClick?: () => void
}

const WrapButton: React.FC<WrapButtonProps> = ({
  className,
  children,
  href,
  onClick,
}) => {
  const buttonContent = (
    <div
      className={cn(
        "group cursor-pointer border border-yellow-300 bg-yellow-50 gap-2 h-[64px] flex items-center p-[11px] rounded-full hover:bg-yellow-100 transition-all duration-300 no-cursor-trail",
        className
      )}
      onClick={onClick}
    >
      <div className="border border-yellow-400 bg-yellow-500 h-[43px] rounded-full flex items-center justify-center text-white px-4">
        <p className="font-medium tracking-tight flex items-center gap-2 justify-center">
          {children}
        </p>
      </div>
      <div className="text-yellow-600 group-hover:ml-2 ease-in-out transition-all size-[26px] flex items-center justify-center rounded-full border-2 border-yellow-400">
        <ArrowRight
          size={18}
          className="group-hover:rotate-45 ease-in-out transition-all"
        />
      </div>
    </div>
  )

  return (
    <div className="flex items-center justify-center">
      {href ? (
        <Link href={href}>
          {buttonContent}
        </Link>
      ) : (
        buttonContent
      )}
    </div>
  )
}

export default WrapButton
