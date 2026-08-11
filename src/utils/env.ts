export const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY as string ?? 'my-secret-key'
export const DATABASE_URL = process.env.DATABASE_URL as string
export const SHADOW_DATABASE_URL = process.env.SHADOW_DATABASE_URL as string
export const SENTRY_DSN = process.env.SENTRY_DSN as string
export const NODE_ENV = process.env.NODE_ENV as 'development' | 'production' | 'test' | 'staging' ?? 'development'
export const PORT = parseInt(process.env.PORT as string  ?? '3000', 10)
