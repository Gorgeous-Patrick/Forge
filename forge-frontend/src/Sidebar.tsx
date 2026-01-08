import {
  Box,
  VStack,
  Text,
  Heading,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from '@chakra-ui/react'
import type { Goal } from './goals'
import { useState, useRef } from 'react'

type Props = {
  goals: Goal[]
  onAddGoal?: (g: Goal) => void
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

export default function Sidebar({ goals, onAddGoal }: Props) {
  const { open, onOpen, onClose } = useDisclosure()
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
    }
    if (onAddGoal) onAddGoal(goal)
    resetForm()
    onClose()
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
    >
      <VStack align="stretch" gap={3}>
        <Heading as="h2" size="md">
          Goals
        </Heading>

        {goals.length === 0 ? (
          <Text color="gray.600">No goals yet</Text>
        ) : (
          goals.map((g, i) => (
            <Box key={`${g.title}-${i}`} p={3} bg="gray.50" borderRadius="md">
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

        {/* Bottom add button */}
        <Box pt={2}>
          <Button width="100%" onClick={onOpen}>
            + Add Goal
          </Button>
        </Box>

        {/* Inline overlay modal (fallback to ensure it opens) */}
        {open && (
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0,0,0,0.4)"
            zIndex={9999}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={onClose}
          >
            <Box
              bg="white"
              borderRadius="md"
              width={{ base: '90%', md: '480px' }}
              p={4}
              onClick={e => e.stopPropagation()}
            >
              <Heading size="md" mb={3}>
                Create Goal
              </Heading>

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

              <Box mt={4} textAlign="right">
                <Button mr={3} onClick={onClose} variant="ghost">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} variant="ghost">
                  Create
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </VStack>
    </Box>
  )
}
