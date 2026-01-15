import { PATCH, DELETE } from '@/app/api/deliverables/[id]/route'
import { prismaMock } from '@/__tests__/utils/prisma-mock'
import { createMockRequest, mockDeliverable } from '@/__tests__/utils/test-helpers'

const mockParams = { params: Promise.resolve({ id: 'deliverable-1' }) }

describe('PATCH /api/deliverables/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should update deliverable completed status', async () => {
    const updatedDeliverable = {
      ...mockDeliverable,
      completed: true,
    }

    prismaMock.deliverable.update.mockResolvedValue(updatedDeliverable as any)

    const request = createMockRequest({
      method: 'PATCH',
      body: {
        completed: true,
      },
    })

    const response = await PATCH(request, mockParams)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.completed).toBe(true)
    expect(prismaMock.deliverable.update).toHaveBeenCalledWith({
      where: { id: 'deliverable-1' },
      data: {
        completed: true,
      },
    })
  })

  it('should update deliverable title', async () => {
    const updatedDeliverable = {
      ...mockDeliverable,
      title: 'Updated Title',
    }

    prismaMock.deliverable.update.mockResolvedValue(updatedDeliverable as any)

    const request = createMockRequest({
      method: 'PATCH',
      body: {
        title: 'Updated Title',
      },
    })

    const response = await PATCH(request, mockParams)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.title).toBe('Updated Title')
  })

  it('should update deliverable minutesEstimate', async () => {
    const updatedDeliverable = {
      ...mockDeliverable,
      minutesEstimate: 120,
    }

    prismaMock.deliverable.update.mockResolvedValue(updatedDeliverable as any)

    const request = createMockRequest({
      method: 'PATCH',
      body: {
        minutesEstimate: 120,
      },
    })

    const response = await PATCH(request, mockParams)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.minutesEstimate).toBe(120)
  })

  it('should update multiple fields at once', async () => {
    const updatedDeliverable = {
      ...mockDeliverable,
      title: 'Updated Title',
      completed: true,
      minutesEstimate: 90,
    }

    prismaMock.deliverable.update.mockResolvedValue(updatedDeliverable as any)

    const request = createMockRequest({
      method: 'PATCH',
      body: {
        title: 'Updated Title',
        completed: true,
        minutesEstimate: 90,
      },
    })

    const response = await PATCH(request, mockParams)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.title).toBe('Updated Title')
    expect(data.completed).toBe(true)
    expect(data.minutesEstimate).toBe(90)
  })

  it('should return 500 when database error occurs', async () => {
    prismaMock.deliverable.update.mockRejectedValue(new Error('Database error'))

    const request = createMockRequest({
      method: 'PATCH',
      body: {
        completed: true,
      },
    })

    const response = await PATCH(request, mockParams)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to update deliverable')
  })
})

describe('DELETE /api/deliverables/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should delete a deliverable', async () => {
    prismaMock.deliverable.delete.mockResolvedValue(mockDeliverable as any)

    const request = createMockRequest({ method: 'DELETE' })
    const response = await DELETE(request, mockParams)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.message).toBe('Deliverable deleted successfully')
    expect(prismaMock.deliverable.delete).toHaveBeenCalledWith({
      where: { id: 'deliverable-1' },
    })
  })

  it('should return 500 when database error occurs', async () => {
    prismaMock.deliverable.delete.mockRejectedValue(new Error('Database error'))

    const request = createMockRequest({ method: 'DELETE' })
    const response = await DELETE(request, mockParams)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to delete deliverable')
  })
})
