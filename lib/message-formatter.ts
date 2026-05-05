// Message formatting utilities for rich text support

export interface FormattedMessage {
  text: string
  hasCode: boolean
  hasSQL: boolean
  hasMarkdown: boolean
}

/**
 * Format message for display (add markdown, detect code blocks)
 */
export function formatMessage(message: string): FormattedMessage {
  const hasCode = /```[\s\S]*?```/.test(message)
  const hasSQL = /SELECT|INSERT|UPDATE|DELETE|FROM|WHERE/i.test(message)
  const hasMarkdown = /\*\*|__|\[.*?\]\(.*?\)|^-|^#/.test(message)

  return {
    text: message,
    hasCode,
    hasSQL,
    hasMarkdown,
  }
}

/**
 * Highlight SQL syntax
 */
export function highlightSQL(sql: string): string {
  const keywords = [
    'SELECT',
    'FROM',
    'WHERE',
    'JOIN',
    'LEFT',
    'RIGHT',
    'INNER',
    'OUTER',
    'ON',
    'ORDER',
    'GROUP',
    'BY',
    'HAVING',
    'LIMIT',
    'OFFSET',
    'AS',
    'AND',
    'OR',
    'NOT',
    'IN',
    'EXISTS',
    'CASE',
    'WHEN',
    'THEN',
    'ELSE',
    'END',
  ]

  let highlighted = sql

  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
    highlighted = highlighted.replace(regex, `**${keyword}**`)
  })

  return highlighted
}

/**
 * Extract code blocks from message
 */
export function extractCodeBlocks(message: string): Array<{ language: string; code: string }> {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
  const codeBlocks: Array<{ language: string; code: string }> = []

  let match
  while ((match = codeBlockRegex.exec(message)) !== null) {
    codeBlocks.push({
      language: match[1] || 'plaintext',
      code: match[2],
    })
  }

  return codeBlocks
}

/**
 * Strip markdown from message
 */
export function stripMarkdown(message: string): string {
  return message
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
    .replace(/__([^_]+)__/g, '$1') // Alt bold
    .replace(/\*([^*]+)\*/g, '$1') // Italic
    .replace(/_([^_]+)_/g, '$1') // Alt italic
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // Links
    .replace(/`([^`]+)`/g, '$1') // Inline code
    .replace(/```[\s\S]*?```/g, '') // Code blocks
    .replace(/^#+\s/gm, '') // Headings
    .replace(/^-\s/gm, '') // Lists
}

/**
 * Truncate message to character limit
 */
export function truncateMessage(message: string, limit: number = 500): string {
  if (message.length <= limit) return message

  const truncated = message.substring(0, limit)
  const lastSpace = truncated.lastIndexOf(' ')

  return lastSpace > -1
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...'
}

/**
 * Get message summary (first line or first N chars)
 */
export function getMessageSummary(message: string, maxLength: number = 100): string {
  const firstLine = message.split('\n')[0]
  return truncateMessage(firstLine, maxLength)
}

/**
 * Format timestamp to readable string
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`

  return date.toLocaleDateString()
}

/**
 * Detect if message contains error
 */
export function isErrorMessage(message: string): boolean {
  const errorPatterns = [
    /error/i,
    /failed/i,
    /exception/i,
    /invalid/i,
    /syntax error/i,
    /connection failed/i,
    /timeout/i,
  ]

  return errorPatterns.some(pattern => pattern.test(message))
}

/**
 * Detect if message is a query
 */
export function isQuery(message: string): boolean {
  const queryPatterns = [
    /SELECT|INSERT|UPDATE|DELETE|FROM|WHERE/i,
    /\?$/, // Ends with question mark
    /^(show|list|get|what|how|why|when|where|which|who)/i,
  ]

  return queryPatterns.some(pattern => pattern.test(message))
}
