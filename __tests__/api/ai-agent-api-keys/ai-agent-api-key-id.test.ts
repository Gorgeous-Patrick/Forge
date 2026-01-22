import { GET, PUT, DELETE } from '@/app/api/ai-agent-api-keys/[id]/route'
import { prismaMock } from '@/__tests__/utils/prisma-mock'
import { createMockRequest } from '@/__tests__/utils/test-helpers'
import * as auth from '@/lib/auth'

jest.mock('@/lib/auth', () => ({
  requireAuth: jest.fn(),
}))

const mockApiKey = {
  id: 'api-key-1',
  userId: 'test@example.com',
  provider: 'openai',
  apiKey: 'sk-test-key-123',
  name: 'My OpenAI Key',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

describe('GET /api/ai-agent-api-keys/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return a specific AI Agent API key', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')

    prismaMock.aIAgentApiKey.findFirst.mockResolvedValue(mockApiKey as any)

    const request = createMockRequest({ method: 'GET' })
    const params = Promise.resolve({ id: 'api-key-1' })

    const response = await GET(request, { params })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.id).toBe('api-key-1')
    expect(data.provider).toBe('openai')
    expect(prismaMock.aIAgentApiKey.findFirst).toHaveBeenCalledWith({
      where: {
        id: 'api-key-1',
        userId: 'test@example.com',
      },
    })
  })

  it('should return 404 when API key is not found', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')

    prismaMock.aIAgentApiKey.findFirst.mockResolvedValue(null)

    const request = createMockRequest({ method: 'GET' })
    const params = Promise.resolve({ id: 'non-existent-id' })

    const response = await GET(request, { params })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.error).toBe('API key not found')
  })

  it('should return 401 when user is not authenticated', async () => {
    ;(auth.requireAuth as jest.Mock).mockRejectedValue(new Error('Unauthorized'))

    const request = createMockRequest({ method: 'GET' })
    const params = Promise.resolve({ id: 'api-key-1' })

    const response = await GET(request, { params })
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Authentication required')
  })

  it('should return 500 when database error occurs', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')
    prismaMock.aIAgentApiKey.findFirst.mockRejectedValue(new Error('Database error'))

    const request = createMockRequest({ method: 'GET' })
    const params = Promise.resolve({ id: 'api-key-1' })

    const response = await GET(request, { params })
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to fetch AI Agent API key')
  })
})

describe('PUT /api/ai-agent-api-keys/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should update an AI Agent API key', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')

    prismaMock.aIAgentApiKey.findFirst.mockResolvedValue(mockApiKey as any)
    prismaMock.aIAgentApiKey.findUnique.mockResolvedValue(null)
    prismaMock.aIAgentApiKey.update.mockResolvedValue({
      ...mockApiKey,
      name: 'Updated Name',
      apiKey: 'sk-test-key-new',
    } as any)

    const request = createMockRequest({
      method: 'PUT',
      body: {
        apiKey: 'sk-test-key-new',
        name: 'Updated Name',
      },
    })
    const params = Promise.resolve({ id: 'api-key-1' })

    const response = await PUT(request, { params })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.name).toBe('Updated Name')
    expect(prismaMock.aIAgentApiKey.update).toHaveBeenCalledWith({
      where: { id: 'api-key-1' },
      data: {
        apiKey: 'sk-test-key-new',
        name: 'Updated Name',
      },
    })
  })

  it('should update provider if not conflicting', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')

    prismaMock.aIAgentApiKey.findFirst.mockResolvedValue(mockApiKey as any)
    prismaMock.aIAgentApiKey.findUnique.mockResolvedValue(null)
    prismaMock.aIAgentApiKey.update.mockResolvedValue({
      ...mockApiKey,
      provider: 'anthropic',
    } as any)

    const request = createMockRequest({
      method: 'PUT',
      body: {
        provider: 'anthropic',
      },
    })
    const params = Promise.resolve({ id: 'api-key-1' })

    const response = await PUT(request, { params })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.provider).toBe('anthropic')
  })

  it('should return 409 when updating provider conflicts with existing key', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')

    prismaMock.aIAgentApiKey.findFirst.mockResolvedValue(mockApiKey as any)
    prismaMock.aIAgentApiKey.findUnique.mockResolvedValue({
      ...mockApiKey,
      id: 'different-key-id',
      provider: 'anthropic',
    } as any)

    const request = createMockRequest({
      method: 'PUT',
      body: {
        provider: 'anthropic',
      },
    })
    const params = Promise.resolve({ id: 'api-key-1' })

    const response = await PUT(request, { params })
    const data = await response.json()

    expect(response.status).toBe(409)
    expect(data.error).toBe("API key for provider 'anthropic' already exists")
  })

  it('should return 404 when API key is not found', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')

    prismaMock.aIAgentApiKey.findFirst.mockResolvedValue(null)

    const request = createMockRequest({
      method: 'PUT',
      body: {
        name: 'Updated Name',
      },
    })
    const params = Promise.resolve({ id: 'non-existent-id' })

    const response = await PUT(request, { params })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.error).toBe('API key not found')
  })

  it('should return 401 when user is not authenticated', async () => {
    ;(auth.requireAuth as jest.Mock).mockRejectedValue(new Error('Unauthorized'))

    const request = createMockRequest({
      method: 'PUT',
      body: {
        name: 'Updated Name',
      },
    })
    const params = Promise.resolve({ id: 'api-key-1' })

    const response = await PUT(request, { params })
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Authentication required')
  })

  it('should return 500 when database error occurs', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')
    prismaMock.aIAgentApiKey.findFirst.mockResolvedValue(mockApiKey as any)
    prismaMock.aIAgentApiKey.update.mockRejectedValue(new Error('Database error'))

    const request = createMockRequest({
      method: 'PUT',
      body: {
        name: 'Updated Name',
      },
    })
    const params = Promise.resolve({ id: 'api-key-1' })

    const response = await PUT(request, { params })
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to update AI Agent API key')
  })
})

describe('DELETE /api/ai-agent-api-keys/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should delete an AI Agent API key', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')

    prismaMock.aIAgentApiKey.findFirst.mockResolvedValue(mockApiKey as any)
    prismaMock.aIAgentApiKey.delete.mockResolvedValue(mockApiKey as any)

    const request = createMockRequest({ method: 'DELETE' })
    const params = Promise.resolve({ id: 'api-key-1' })

    const response = await DELETE(request, { params })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.message).toBe('API key deleted successfully')
    expect(prismaMock.aIAgentApiKey.delete).toHaveBeenCalledWith({
      where: { id: 'api-key-1' },
    })
  })

  it('should return 404 when API key is not found', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')

    prismaMock.aIAgentApiKey.findFirst.mockResolvedValue(null)

    const request = createMockRequest({ method: 'DELETE' })
    const params = Promise.resolve({ id: 'non-existent-id' })

    const response = await DELETE(request, { params })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.error).toBe('API key not found')
  })

  it('should return 401 when user is not authenticated', async () => {
    ;(auth.requireAuth as jest.Mock).mockRejectedValue(new Error('Unauthorized'))

    const request = createMockRequest({ method: 'DELETE' })
    const params = Promise.resolve({ id: 'api-key-1' })

    const response = await DELETE(request, { params })
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Authentication required')
  })

  it('should return 500 when database error occurs', async () => {
    ;(auth.requireAuth as jest.Mock).mockResolvedValue('test@example.com')
    prismaMock.aIAgentApiKey.findFirst.mockResolvedValue(mockApiKey as any)
    prismaMock.aIAgentApiKey.delete.mockRejectedValue(new Error('Database error'))

    const request = createMockRequest({ method: 'DELETE' })
    const params = Promise.resolve({ id: 'api-key-1' })

    const response = await DELETE(request, { params })
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to delete AI Agent API key')
  })
})
