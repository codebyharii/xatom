// Generate contextual prompt suggestions based on database schema
export interface Table {
  name: string
  columns: string[]
}

export interface DatabaseSchema {
  tables: Table[]
  totalRows?: number
}

export interface PromptSuggestion {
  emoji: string
  query: string
  category: string
  description?: string
}

/**
 * Generate smart prompt suggestions based on database schema
 */
export function generatePromptSuggestions(schema?: DatabaseSchema): PromptSuggestion[] {
  const defaults: PromptSuggestion[] = [
    {
      emoji: '📊',
      query: 'Show me total revenue this month',
      category: 'Analytics',
    },
    {
      emoji: '👥',
      query: 'Top 10 customers by spending',
      category: 'Customers',
    },
    {
      emoji: '📈',
      query: 'Growth rate week over week',
      category: 'Trends',
    },
    {
      emoji: '🔍',
      query: 'Products with low inventory',
      category: 'Inventory',
    },
  ]

  if (!schema?.tables || schema.tables.length === 0) {
    return defaults
  }

  const suggestions: PromptSuggestion[] = []

  // Detect tables and generate suggestions
  const tableNames = schema.tables.map(t => t.name.toLowerCase())

  // Orders/Sales table
  if (tableNames.some(t => t.includes('order') || t.includes('sale'))) {
    suggestions.push({
      emoji: '💰',
      query: 'Total sales by category this quarter',
      category: 'Sales',
      description: 'Analyze sales performance by category',
    })
  }

  // Users/Customers table
  if (tableNames.some(t => t.includes('user') || t.includes('customer'))) {
    suggestions.push({
      emoji: '👥',
      query: 'Show new customers acquired this month',
      category: 'Growth',
      description: 'Track new customer acquisitions',
    })
  }

  // Products table
  if (tableNames.some(t => t.includes('product'))) {
    suggestions.push({
      emoji: '📦',
      query: 'Most popular products by purchase count',
      category: 'Products',
      description: 'Identify bestselling items',
    })
  }

  // Events/Logs table
  if (tableNames.some(t => t.includes('event') || t.includes('log'))) {
    suggestions.push({
      emoji: '📝',
      query: 'Event frequency over the last 7 days',
      category: 'Events',
      description: 'Track event trends',
    })
  }

  // If we have suggestions, return up to 4
  if (suggestions.length > 0) {
    return suggestions.slice(0, 4)
  }

  return defaults
}

/**
 * Categorize queries for better UX
 */
export function categorizeQuery(query: string): string {
  const lowerQuery = query.toLowerCase()

  if (
    lowerQuery.includes('total') ||
    lowerQuery.includes('sum') ||
    lowerQuery.includes('revenue')
  ) {
    return 'Analytics'
  }
  if (
    lowerQuery.includes('growth') ||
    lowerQuery.includes('trend') ||
    lowerQuery.includes('week') ||
    lowerQuery.includes('month')
  ) {
    return 'Trends'
  }
  if (lowerQuery.includes('customer') || lowerQuery.includes('user')) {
    return 'Customers'
  }
  if (lowerQuery.includes('product') || lowerQuery.includes('inventory')) {
    return 'Products'
  }
  if (lowerQuery.includes('event') || lowerQuery.includes('log')) {
    return 'Events'
  }

  return 'General'
}

/**
 * Validate if query is safe for execution
 */
export function isQuerySafe(query: string): boolean {
  const upperQuery = query.toUpperCase().trim()

  // Only allow SELECT queries
  if (!upperQuery.startsWith('SELECT')) {
    return false
  }

  // Deny dangerous operations
  const dangerousKeywords = ['DROP', 'DELETE', 'UPDATE', 'INSERT', 'ALTER', 'CREATE', 'TRUNCATE', 'EXEC']
  if (dangerousKeywords.some(keyword => upperQuery.includes(keyword))) {
    return false
  }

  // Deny certain patterns
  if (upperQuery.includes('--') || upperQuery.includes('/*')) {
    return false
  }

  return true
}

/**
 * Extract mentioned entities from a query
 */
export function extractEntities(query: string): {
  tables: string[]
  columns: string[]
  timeRange?: string
} {
  const tables: string[] = []
  const columns: string[] = []
  let timeRange: string | undefined

  // Simple extraction patterns
  const tablePattern = /from\s+(\w+)|join\s+(\w+)/gi
  const columnPattern = /select\s+([^from]+)/i
  const timePattern = /(last\s+\d+\s+(days?|weeks?|months?|years?))|(this\s+(week|month|quarter|year))/i

  let match
  while ((match = tablePattern.exec(query)) !== null) {
    const table = match[1] || match[2]
    if (table) tables.push(table.toLowerCase())
  }

  const columnMatch = columnPattern.exec(query)
  if (columnMatch) {
    const cols = columnMatch[1].split(',').map(c => c.trim())
    columns.push(...cols)
  }

  const timeMatch = timePattern.exec(query)
  if (timeMatch) {
    timeRange = timeMatch[0]
  }

  return {
    tables: [...new Set(tables)],
    columns: [...new Set(columns)],
    timeRange,
  }
}
