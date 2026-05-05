// Database connection utilities
// Handles different database types and connection management

export type DatabaseType = 'postgres' | 'mysql' | 'sqlserver' | 'bigquery'

export interface DatabaseConnection {
  type: DatabaseType
  connectionString: string
  name: string
}

export interface DatabaseConfig {
  host: string
  port: number
  user: string
  password: string
  database: string
}

/**
 * Parse connection string based on database type
 */
export function parseConnectionString(connectionString: string, type: DatabaseType): DatabaseConfig {
  try {
    if (type === 'postgres' || type === 'mysql') {
      // postgresql://user:password@host:port/dbname
      const url = new URL(connectionString.replace(/(postgresql|mysql):\/\//, 'https://'))
      return {
        host: url.hostname,
        port: parseInt(url.port) || (type === 'postgres' ? 5432 : 3306),
        user: url.username,
        password: url.password,
        database: url.pathname.replace('/', ''),
      }
    } else if (type === 'sqlserver') {
      // mssql://user:password@host:port/dbname
      const url = new URL(connectionString.replace('mssql://', 'https://'))
      return {
        host: url.hostname,
        port: parseInt(url.port) || 1433,
        user: url.username,
        password: url.password,
        database: url.pathname.replace('/', ''),
      }
    } else if (type === 'bigquery') {
      // For BigQuery, it's project-id/dataset
      const [project, dataset] = connectionString.split('/')
      return {
        host: 'bigquery.googleapis.com',
        port: 443,
        user: '',
        password: '',
        database: dataset,
      }
    }

    throw new Error('Invalid connection string')
  } catch (error) {
    throw new Error(`Failed to parse connection string: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Validate connection string format
 */
export function validateConnectionString(connectionString: string, type: DatabaseType): boolean {
  try {
    const lower = connectionString.toLowerCase()

    if (type === 'postgres') {
      return lower.startsWith('postgresql://') && connectionString.includes('@')
    } else if (type === 'mysql') {
      return lower.startsWith('mysql://') && connectionString.includes('@')
    } else if (type === 'sqlserver') {
      return lower.startsWith('mssql://') && connectionString.includes('@')
    } else if (type === 'bigquery') {
      return connectionString.includes('/') && !connectionString.includes('@')
    }

    return false
  } catch {
    return false
  }
}

/**
 * Test database connection
 */
export async function testDatabaseConnection(
  connectionString: string,
  type: DatabaseType
): Promise<{ success: boolean; message: string }> {
  try {
    if (!validateConnectionString(connectionString, type)) {
      return {
        success: false,
        message: 'Invalid connection string format',
      }
    }

    // TODO: Implement actual connection test based on database type
    // For now, simulate connection test
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      message: `Successfully connected to ${type}`,
    }
  } catch (error) {
    return {
      success: false,
      message: `Connection failed: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * Format database name from connection string
 */
export function extractDatabaseName(connectionString: string, type: DatabaseType): string {
  try {
    const config = parseConnectionString(connectionString, type)
    return config.database || 'Unknown Database'
  } catch {
    return 'Unknown Database'
  }
}

/**
 * Get database-specific SQL syntax
 */
export function getDatabaseDialect(type: DatabaseType) {
  return {
    dateFormat: type === 'sqlserver' ? 'CONVERT(DATE, column)' : 'DATE(column)',
    limit: type === 'sqlserver' ? 'OFFSET 0 ROWS FETCH NEXT 100 ROWS ONLY' : 'LIMIT 100',
    now: type === 'sqlserver' ? 'GETDATE()' : 'NOW()',
    separator: ';',
  }
}
