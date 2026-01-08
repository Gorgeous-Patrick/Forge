export type Deliverable = {
  title: string
  completed: boolean
}

export type Goal = {
  title: string
  description: string
  // ISO datetime string (e.g. "2026-01-15T17:00:00" or full ISO with TZ) or null when no due date/time
  dueDate: string | null
  // Small list of deliverables for the goal
  deliverables: Deliverable[]
}

export const sampleGoals: Goal[] = [
  {
    title: 'Finish pre-commit setup',
    description:
      'Finalize and install the repository pre-commit hooks; run autoupdate and fix any reported issues.',
    dueDate: '2026-01-15T17:00:00',
    deliverables: [
      { title: 'Add .pre-commit-config.yaml', completed: true },
      { title: 'Run pre-commit install', completed: false },
      { title: 'Run pre-commit autoupdate', completed: false },
    ],
  },
  {
    title: 'Polish frontend layout',
    description:
      'Adjust responsive styles and finalize the main landing section in the React app.',
    dueDate: null,
    deliverables: [
      { title: 'Fix mobile header spacing', completed: true },
      { title: 'Adjust hero section spacing', completed: false },
    ],
  },
  {
    title: 'Add unit tests for auth',
    description:
      'Write unit tests covering login/logout and token refresh logic.',
    dueDate: '2026-02-01T09:30:00',
    deliverables: [
      { title: 'Test login flow', completed: false },
      { title: 'Test token refresh', completed: false },
    ],
  },
]
