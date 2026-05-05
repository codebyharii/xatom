'use client'

import { useState, useCallback } from 'react'

export interface ChatError {
  id: string
  message: string
  type: 'network' | 'validation' | 'sql' | 'system'
  timestamp: number
  retryable: boolean
}

export function useChatError() {
  const [errors, setErrors] = useState<ChatError[]>([])

  const addError = useCallback(
    (
      message: string,
      type: ChatError['type'] = 'system',
      retryable: boolean = false
    ) => {
      const error: ChatError = {
        id: Math.random().toString(36).substr(2, 9),
        message,
        type,
        timestamp: Date.now(),
        retryable,
      }

      setErrors(prev => [...prev, error])

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setErrors(prev => prev.filter(e => e.id !== error.id))
      }, 5000)

      return error.id
    },
    []
  )

  const removeError = useCallback((id: string) => {
    setErrors(prev => prev.filter(e => e.id !== id))
  }, [])

  const clearErrors = useCallback(() => {
    setErrors([])
  }, [])

  const getErrorMessage = useCallback((type: ChatError['type']): string => {
    const messages = {
      network: 'Network error. Please check your connection.',
      validation: 'Invalid input. Please check your query.',
      sql: 'SQL error. Please check your query syntax.',
      system: 'Something went wrong. Please try again.',
    }
    return messages[type]
  }, [])

  return {
    errors,
    addError,
    removeError,
    clearErrors,
    getErrorMessage,
  }
}

export function useMessagePersistence(key: string) {
  const [messages, setMessages] = useState<any[]>([])

  const saveMessages = useCallback(
    (msgs: any[]) => {
      try {
        localStorage.setItem(key, JSON.stringify(msgs))
        setMessages(msgs)
      } catch (error) {
        console.error('Failed to save messages:', error)
      }
    },
    [key]
  )

  const loadMessages = useCallback(() => {
    try {
      const saved = localStorage.getItem(key)
      if (saved) {
        const parsed = JSON.parse(saved)
        setMessages(parsed)
        return parsed
      }
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
    return []
  }, [key])

  const clearMessages = useCallback(() => {
    try {
      localStorage.removeItem(key)
      setMessages([])
    } catch (error) {
      console.error('Failed to clear messages:', error)
    }
  }, [key])

  return {
    messages,
    saveMessages,
    loadMessages,
    clearMessages,
  }
}
