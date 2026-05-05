'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, File, Loader } from 'lucide-react'

interface ResumeUploaderProps {
  onSingleUpload: (file: File) => void
  onBulkUpload: (files: File[]) => void
  compact?: boolean
}

const ACCEPTED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export default function ResumeUploader({
  onSingleUpload,
  onBulkUpload,
  compact = false,
}: ResumeUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: 'Only PDF and Word documents are supported',
      }
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: 'File size must be less than 10MB',
      }
    }

    return { valid: true }
  }

  const handleFileSelect = (files: FileList) => {
    const fileArray = Array.from(files)
    const validFiles: File[] = []
    const errors: string[] = []

    fileArray.forEach(file => {
      const validation = validateFile(file)
      if (validation.valid) {
        validFiles.push(file)
      } else if (validation.error) {
        errors.push(`${file.name}: ${validation.error}`)
      }
    })

    if (errors.length > 0) {
      console.error('Upload errors:', errors)
    }

    if (validFiles.length === 1) {
      onSingleUpload(validFiles[0])
    } else if (validFiles.length > 1) {
      onBulkUpload(validFiles)
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelect(e.target.files)
    }
  }

  if (compact) {
    return (
      <div className="p-4 space-y-2">
        <button
          onClick={handleClick}
          className="w-full px-4 py-2 rounded-lg bg-gradient-amber text-white font-semibold hover:shadow-lg hover:shadow-amber/30 transition-all flex items-center justify-center gap-2"
        >
          <Upload size={18} />
          Upload More Resumes
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={handleInputChange}
          className="hidden"
          disabled={uploading}
        />
        <p className="text-xs text-text3 text-center">PDF or Word documents, up to 10MB</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
        isDragging
          ? 'border-amber bg-amber/5'
          : 'border-border/30 bg-bg2/50 hover:bg-bg2/80 hover:border-amber/50'
      }`}
    >
      <div className="p-12 text-center">
        {uploading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Loader size={48} className="text-amber" />
          </motion.div>
        ) : (
          <motion.div
            animate={{ y: isDragging ? -5 : 0 }}
            transition={{ duration: 0.3 }}
            className="inline-block mb-4 text-5xl"
          >
            📄
          </motion.div>
        )}

        <h3 className="text-lg font-semibold mb-2">
          {isDragging ? 'Drop resumes here' : 'Upload Resumes'}
        </h3>

        <p className="text-text2 mb-4">
          Drag and drop your resumes here, or{' '}
          <button
            onClick={handleClick}
            className="text-amber hover:text-amber/80 font-semibold underline"
          >
            click to select
          </button>
        </p>

        <p className="text-xs text-text3">
          PDF or Word documents • Multiple files supported • Up to 10MB each
        </p>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={handleInputChange}
          className="hidden"
          disabled={uploading}
        />
      </div>
    </motion.div>
  )
}
