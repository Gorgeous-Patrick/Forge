import { NextRequest } from 'next/server'

export function createMockRequest(options: {
  method: string
  body?: any
  headers?: Record<string, string>
  cookies?: Record<string, string>
}): NextRequest {
  const { method, body, headers = {}, cookies = {} } = options

  const url = 'http://localhost:3000/api/test'
  const init: RequestInit = {
    method,
    headers: new Headers(headers),
  }

  if (body) {
    init.body = JSON.stringify(body)
    init.headers = new Headers({
      ...headers,
      'Content-Type': 'application/json',
    })
  }

  const request = new NextRequest(url, init)

  // Mock cookies
  if (Object.keys(cookies).length > 0) {
    const cookieStore = {
      get: (name: string) => {
        return cookies[name] ? { name, value: cookies[name] } : undefined
      },
      set: jest.fn(),
      delete: jest.fn(),
    }

    jest.spyOn(request as any, 'cookies', 'get').mockReturnValue(cookieStore)
  }

  return request
}

export const mockUser = {
  id: 'test@example.com',
  passwordHash: '$2a$10$abcdefghijklmnopqrstuvwxyz123456',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

export const mockGoal = {
  id: 'goal-1',
  userId: 'test@example.com',
  title: 'Test Goal',
  description: 'Test Description',
  dueDate: new Date('2024-12-31'),
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  deliverables: [],
  infoTags: [],
}

export const mockDeliverable = {
  id: 'deliverable-1',
  goalId: 'goal-1',
  title: 'Test Deliverable',
  completed: false,
  minutesEstimate: 60,
  order: 0,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

export const mockEvent = {
  id: 'event-1',
  userId: 'test@example.com',
  title: 'Test Event',
  start: new Date('2024-06-01T10:00:00Z'),
  end: new Date('2024-06-01T11:00:00Z'),
  kind: 'meeting',
  metadata: {},
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}
