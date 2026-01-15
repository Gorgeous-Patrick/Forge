import { POST } from '@/app/api/auth/login/route'
import { prismaMock } from '@/__tests__/utils/prisma-mock'
import { createMockRequest, mockUser } from '@/__tests__/utils/test-helpers'
import * as auth from '@/lib/auth'

jest.mock('@/lib/auth', () => ({
  verifyPassword: jest.fn(),
  setAuthCookie: jest.fn(),
}))

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should login user successfully with valid credentials', async () => {
    ;(auth.verifyPassword as jest.Mock).mockResolvedValue(true)
    ;(auth.setAuthCookie as jest.Mock).mockResolvedValue(undefined)

    prismaMock.user.findUnique.mockResolvedValue(mockUser)

    const request = createMockRequest({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.message).toBe('Login successful')
    expect(data.user.email).toBe('test@example.com')
    expect(auth.verifyPassword).toHaveBeenCalledWith(
      'password123',
      mockUser.passwordHash
    )
    expect(auth.setAuthCookie).toHaveBeenCalledWith('test@example.com')
  })

  it('should return 400 when email is missing', async () => {
    const request = createMockRequest({
      method: 'POST',
      body: {
        password: 'password123',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Email and password are required')
  })

  it('should return 400 when password is missing', async () => {
    const request = createMockRequest({
      method: 'POST',
      body: {
        email: 'test@example.com',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Email and password are required')
  })

  it('should return 401 when user does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)

    const request = createMockRequest({
      method: 'POST',
      body: {
        email: 'nonexistent@example.com',
        password: 'password123',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Invalid email or password')
  })

  it('should return 401 when password is incorrect', async () => {
    ;(auth.verifyPassword as jest.Mock).mockResolvedValue(false)
    prismaMock.user.findUnique.mockResolvedValue(mockUser)

    const request = createMockRequest({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'wrongpassword',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Invalid email or password')
  })

  it('should return 500 when database error occurs', async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error('Database error'))

    const request = createMockRequest({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to login')
  })
})
