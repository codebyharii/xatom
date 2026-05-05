// SQL Agent for AI-powered query generation
// This utility handles the conversion of natural language to SQL queries

interface SQLAgentConfig {
  database: 'postgres' | 'mysql' | 'sqlserver' | 'bigquery'
  schema?: any // Table schema information
}

interface QueryGenerationRequest {
  question: string
  database: SQLAgentConfig
}

interface QueryGenerationResponse {
  sql: string
  explanation: string
  chartType: 'bar' | 'line' | 'pie'
}

/**
 * Generate SQL from natural language question
 * In production, this would call LangChain + OpenAI
 */
export async function generateSQLFromQuestion(
  request: QueryGenerationRequest
): Promise<QueryGenerationResponse> {
  const { question, database } = request

  // TODO: Implement LangChain + OpenAI integration
  // For now, return mock SQL based on keywords

  let sql = 'SELECT * FROM users'
  let chartType: 'bar' | 'line' | 'pie' = 'bar'
  let explanation = 'Query generated from your question'

  if (question.toLowerCase().includes('total') || question.toLowerCase().includes('sum')) {
    sql = `SELECT DATE_TRUNC('month', created_at) as month, COUNT(*) as total FROM users GROUP BY month ORDER BY month`
    chartType = 'line'
  } else if (question.toLowerCase().includes('by region') || question.toLowerCase().includes('by')) {
    sql = `SELECT region, COUNT(*) as count FROM users GROUP BY region ORDER BY count DESC LIMIT 10`
    chartType = 'bar'
  } else if (question.toLowerCase().includes('top')) {
    sql = `SELECT * FROM users ORDER BY created_at DESC LIMIT 5`
    chartType = 'bar'
  } else if (question.toLowerCase().includes('growth') || question.toLowerCase().includes('over time')) {
    sql = `SELECT DATE_TRUNC('week', created_at) as week, COUNT(*) as users FROM users GROUP BY week ORDER BY week`
    chartType = 'line'
  }

  return {
    sql,
    explanation,
    chartType,
  }
}

/**
 * Validate SQL query before execution
 */
export function validateSQL(sql: string, database: SQLAgentConfig['database']): boolean {
  // Basic validation
  if (!sql || sql.length === 0) return false

  const upperSQL = sql.toUpperCase().trim()

  // Only allow SELECT queries
  if (!upperSQL.startsWith('SELECT')) {
    return false
  }

  // Deny DROP, DELETE, UPDATE, INSERT, ALTER commands
  const dangerousKeywords = ['DROP', 'DELETE', 'UPDATE', 'INSERT', 'ALTER', 'CREATE', 'TRUNCATE']
  if (dangerousKeywords.some(keyword => upperSQL.includes(keyword))) {
    return false
  }

  return true
}

/**
 * Parse query execution time
 */
export function estimateExecutionTime(sql: string): number {
  // Simple heuristic for execution time estimation
  const complexity = (sql.match(/JOIN/gi) || []).length * 500 + (sql.length / 10)
  return Math.min(complexity, 5000) // Cap at 5 seconds
}

/**
 * Detect optimal chart type for results
 */
export function detectChartType(
  results: any[],
  question: string
): 'bar' | 'line' | 'pie' {
  if (results.length === 0) return 'bar'

  const firstRow = results[0]
  const columnCount = Object.keys(firstRow).length
  const hasTimestamp = Object.keys(firstRow).some(
    key => key.toLowerCase().includes('date') || key.toLowerCase().includes('time')
  )

  // If has timestamp, use line chart for trends
  if (hasTimestamp && results.length > 3) {
    return 'line'
  }

  // If few categories, use pie chart
  if (columnCount === 2 && results.length <= 6) {
    if (question.toLowerCase().includes('distribution') || question.toLowerCase().includes('percentage')) {
      return 'pie'
    }
  }

  return 'bar'
}

/**
 * Format results for display
 */
export function formatResults(results: any[]): any[] {
  return results.map(row => {
    const formatted: any = {}
    Object.entries(row).forEach(([key, value]) => {
      if (typeof value === 'number' && !Number.isInteger(value)) {
        formatted[key] = Number(value).toFixed(2)
      } else {
        formatted[key] = value
      }
    })
    return formatted
  })
}
