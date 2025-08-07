"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Send, Paperclip, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface AiInputProps {
  onSubmit: (message: string, file?: File) => void
  placeholder?: string
  className?: string
}

export const AiInput: React.FC<AiInputProps> = ({
  onSubmit,
  placeholder = "Tell me about your project...",
  className = "",
}) => {
  const [message, setMessage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() && !file) return

    setIsLoading(true)
    try {
      await onSubmit(message, file || undefined)
      setMessage("")
      setFile(null)
    } catch (error) {
      console.error("Error submitting:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            className="min-h-[120px] pr-12 resize-none border-2 border-yellow-200 focus:border-yellow-400 rounded-lg"
            disabled={isLoading}
          />
        </div>

        {file && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <Paperclip className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-gray-700 truncate max-w-xs">
                {file.name}
              </span>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="border-yellow-200 hover:border-yellow-400"
            >
              <Paperclip className="w-4 h-4 mr-2" />
              Attach File
            </Button>
          </div>

          <Button
            type="submit"
            disabled={(!message.trim() && !file) || isLoading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
