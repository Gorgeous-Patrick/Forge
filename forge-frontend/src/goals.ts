export type Goal = {
  title: string
  description: string
  dueDate: string | null
}

export const sampleGoals: Goal[] = [
  {
    title: 'Finish pre-commit setup',
    description:
      'Finalize and install the repository pre-commit hooks; run autoupdate and fix any reported issues.',
    dueDate: '2026-01-15',
  },
  {
    title: 'Polish frontend layout',
    description:
      'Adjust responsive styles and finalize the main landing section in the React app.',
    dueDate: null,
  },
  {
    title: 'Add unit tests for auth',
    description:
      'Write unit tests covering login/logout and token refresh logic.',
    dueDate: '2026-02-01',
  },
]
