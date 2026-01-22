import { GET, POST } from '@/app/api/ai-agent-api-keys/route'
import { prismaMock } from '@/__tests__/utils/prisma-mock'
import { createMockRequest } from '@/__tests__/utils/test-helpers'
import * as auth from '@/lib/auth'
import { AIProvider } from '@/lib/generated/prisma'

jest.mock('@/lib/auth', () => ({
  requireAuth: jest.fn(),
}))

const mockApiKey = {
  id: 'api-key-1',
  userId: 'test@example.com',
  provider: AIProvider.OPENAI,
  apiKey: 'sk-test-key-123',
  name: 'My OpenAI Key',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

describe('GET /api/ai-agent-api-keys', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return all AI Agent API keys for authenticated user', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')

    const mockApiKeys = [
      { ...mockApiKey, id: 'key-1', provider: AIProvider.OPENAI },
      { ...mockApiKey, id: 'key-2', provider: AIProvider.ANTHROPIC },
    ]

    prismaMock.aIAgentApiKey.findMany.mockResolvedValue(mockApiKeys as any)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveLength(2)
    expect(data[0].id).toBe('key-1')
    expect(data[1].id).toBe('key-2')
    expect(prismaMock.aIAgentApiKey.findMany).toHaveBeenCalledWith({
      where: { userId: 'test@example.com' },
      orderBy: {
        createdAt: 'desc',
      },
    })
  })

  it('should return 401 when user is not authenticated', async () => {
    ;(auth.requireAuth as jest.Mock).mockRejectedValue(new Error('Unauthorized'))

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Authentication required')
  })

  it('should return 500 when database error occurs', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')
    prismaMock.aIAgentApiKey.findMany.mockRejectedValue(new Error('Database error'))

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to fetch AI Agent API keys')
  })
})

describe('POST /api/ai-agent-api-keys', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create a new AI Agent API key', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')

    prismaMock.aIAgentApiKey.findUnique.mockResolvedValue(null)
    prismaMock.aIAgentApiKey.create.mockResolvedValue(mockApiKey as any)

    const request = createMockRequest({
      method: 'POST',
      body: {
        provider: AIProvider.OPENAI,
        apiKey: 'sk-test-key-123',
        name: 'My OpenAI Key',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.id).toBe(mockApiKey.id)
    expect(data.provider).toBe(AIProvider.OPENAI)
    expect(data.apiKey).toBe('sk-test-key-123')
    expect(prismaMock.aIAgentApiKey.create).toHaveBeenCalledWith({
      data: {
        userId: 'test@example.com',
        provider: AIProvider.OPENAI,
        apiKey: 'sk-test-key-123',
        name: 'My OpenAI Key',
      },
    })
  })

  it('should create API key without optional name', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')

    prismaMock.aIAgentApiKey.findUnique.mockResolvedValue(null)
    prismaMock.aIAgentApiKey.create.mockResolvedValue({
      ...mockApiKey,
      name: null,
    } as any)

    const request = createMockRequest({
      method: 'POST',
      body: {
        provider: AIProvider.ANTHROPIC,
        apiKey: 'sk-ant-test-key-456',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(prismaMock.aIAgentApiKey.create).toHaveBeenCalledWith({
      data: {
        userId: 'test@example.com',
        provider: AIProvider.ANTHROPIC,
        apiKey: 'sk-ant-test-key-456',
        name: undefined,
      },
    })
  })

  it('should return 400 when provider is missing', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')

    const request = createMockRequest({
      method: 'POST',
      body: {
        apiKey: 'sk-test-key-123',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Provider and apiKey are required')
  })

  it('should return 400 when apiKey is missing', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')

    const request = createMockRequest({
      method: 'POST',
      body: {
        provider: 'openai',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Provider and apiKey are required')
  })

  it('should return 400 when provider is invalid', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')

    const request = createMockRequest({
      method: 'POST',
      body: {
        provider: 'invalid-provider',
        apiKey: 'sk-test-key-123',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('Invalid provider')
  })

  it('should return 409 when API key for provider already exists', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')

    prismaMock.aIAgentApiKey.findUnique.mockResolvedValue(mockApiKey as any)

    const request = createMockRequest({
      method: 'POST',
      body: {
        provider: AIProvider.OPENAI,
        apiKey: 'sk-test-key-new',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(409)
    expect(data.error).toBe("API key for provider 'OPENAI' already exists")
  })

  it('should return 401 when user is not authenticated', async () => {
    ;(auth.requireAuth as jest.Mock).mockRejectedValue(new Error('Unauthorized'))

    const request = createMockRequest({
      method: 'POST',
      body: {
        provider: AIProvider.OPENAI,
        apiKey: 'sk-test-key-123',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Authentication required')
  })

  it('should return 500 when database error occurs', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')
    prismaMock.aIAgentApiKey.findUnique.mockResolvedValue(null)
    prismaMock.aIAgentApiKey.create.mockRejectedValue(new Error('Database error'))

    const request = createMockRequest({
      method: 'POST',
      body: {
        provider: AIProvider.OPENAI,
        apiKey: 'sk-test-key-123',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to create AI Agent API key')
  })
})
