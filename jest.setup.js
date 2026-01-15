// Jest setup file
import '@testing-library/jest-dom'
import { mockDeep, mockReset } from 'jest-mock-extended'

// Mock environment variables
process.env.DATABASE_URL = 'file:./test.db'
process.env.ANTHROPIC_API_KEY = 'test-api-key'

// Mock Prisma Client
jest.mock('./lib/prisma', () => ({
  __esModule: true,
  prisma: mockDeep(),
}))

// Mock Next.js headers and cookies
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  })),
}))
