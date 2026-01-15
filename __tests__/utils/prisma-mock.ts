import { PrismaClient } from '@/lib/generated/prisma'
import { DeepMockProxy } from 'jest-mock-extended'
import { prisma } from '@/lib/prisma'

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
