import {
  Box,
  VStack,
  Text,
  Heading,
  Button,
  Input,
  Textarea,
  CloseButton,
  Dialog,
  Portal,
} from '@chakra-ui/react'
import type { Goal } from './goals'
import { useState, useRef } from 'react'

type Props = {
  goals: Goal[]
  onAddGoal?: (g: Goal) => void
  onRemoveGoal?: (index: number) => void
}

function DeleteGoalDialog({
  goalTitle,
  onDelete,
}: {
  goalTitle: string
  onDelete: () => void
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          size="sm"
          variant="ghost"
          position="absolute"
          top={2}
          right={2}
          aria-label={`Remove ${goalTitle}`}
        >
          ✕
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete goal?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text color="gray.600">
                Are you sure you want to delete "{goalTitle}"? This action
                cannot be undone.
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="ghost">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.CloseTrigger asChild>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    onDelete()
                  }}
                >
                  Delete
                </Button>
              </Dialog.CloseTrigger>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

function formatDue(d: string | null) {
  if (!d) return null
  const dt = new Date(d)
  if (Number.isNaN(dt.getTime())) return null
  // Show both date and time (e.g. "Jan 15, 2026, 5:00 PM")
  try {
    return dt.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch (e) {
    // Fallback for environments that don't support dateStyle/timeStyle
    return dt.toLocaleString()
  }
}

export default function Sidebar({ goals, onAddGoal, onRemoveGoal }: Props) {
  const initialRef = useRef<HTMLInputElement | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueInput, setDueInput] = useState('') // datetime-local value

  function resetForm() {
    setTitle('')
    setDescription('')
    setDueInput('')
  }

  function handleSubmit() {
    const dueDate = dueInput ? new Date(dueInput) : null
    const goal: Goal = {
      title: title || 'Untitled Goal',
      description: description || '',
      dueDate: dueDate ? dueDate.toISOString() : null,
      deliverables: [],
    }
    if (onAddGoal) onAddGoal(goal)
    resetForm()
    // Dialog.CloseTrigger will close the dialog when used as child
  }

  return (
    <Box
      as="aside"
      w={{ base: '100%', md: '280px' }}
      bg="white"
      borderRightWidth={{ base: 0, md: '1px' }}
      borderBottomWidth={{ base: '1px', md: 0 }}
      borderRightColor="gray.200"
      borderBottomColor="gray.200"
      p={4}
      flexShrink={0}
      height="100%"
      minHeight={0}
      overflowY="auto"
    >
      <VStack align="stretch" gap={3}>
        <Heading as="h2" size="md">
          Goals
        </Heading>

        {goals.length === 0 ? (
          <Text color="gray.600">No goals yet</Text>
        ) : (
          goals.map((g, i) => (
            <Box
              key={`${g.title}-${i}`}
              p={3}
              bg="gray.50"
              borderRadius="md"
              position="relative"
            >
              <DeleteGoalDialog
                goalTitle={g.title}
                onDelete={() => {
                  if (onRemoveGoal) onRemoveGoal(i)
                }}
              />

              <Text fontWeight="semibold">{g.title}</Text>

              {g.dueDate ? (
                <Text fontSize="sm" color="gray.500">
                  {formatDue(g.dueDate)}
                </Text>
              ) : (
                <Text fontSize="sm" color="gray.500">
                  No due date
                </Text>
              )}

              <Text mt={2} fontSize="sm" color="gray.600">
                {g.description}
              </Text>
            </Box>
          ))
        )}

        {/* Bottom add button using Chakra Dialog */}
        <Box pt={2}>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button width="100%">+ Add Goal</Button>
            </Dialog.Trigger>

            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Create Goal</Dialog.Title>
                  </Dialog.Header>

                  <Dialog.Body>
                    <Box>
                      <Text fontSize="sm" mb={1}>
                        Title
                      </Text>
                      <Input
                        ref={initialRef}
                        placeholder="Goal title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                      />
                    </Box>

                    <Box mt={4}>
                      <Text fontSize="sm" mb={1}>
                        Description
                      </Text>
                      <Textarea
                        placeholder="Short description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                      />
                    </Box>

                    <Box mt={4}>
                      <Text fontSize="sm" mb={1}>
                        Due date & time
                      </Text>
                      <Input
                        type="datetime-local"
                        value={dueInput}
                        onChange={e => setDueInput(e.target.value)}
                      />
                    </Box>
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="ghost">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Dialog.CloseTrigger asChild>
                      <Button onClick={handleSubmit}>Create</Button>
                    </Dialog.CloseTrigger>
                  </Dialog.Footer>

                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Box>
      </VStack>
    </Box>
  )
}
