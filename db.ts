import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// In production or when Turso is configured, disable query logging for performance
const isProduction = process.env.NODE_ENV === 'production';
const hasTurso = !!process.env.TURSO_AUTH_TOKEN;

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: (isProduction || hasTurso) ? ['error'] : ['query'],
  })

if (!isProduction) globalForPrisma.prisma = db
