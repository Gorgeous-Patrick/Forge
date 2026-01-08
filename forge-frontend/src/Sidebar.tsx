import { Box, VStack, Text, Heading, HStack, Badge } from '@chakra-ui/react'
import type { Goal } from './goals'

type Props = {
  goals: Goal[]
}

function formatDue(d: string | null) {
  if (!d) return null
  const dt = new Date(d)
  if (Number.isNaN(dt.getTime())) return null
  return dt.toLocaleDateString()
}

export default function Sidebar({ goals }: Props) {
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
              <HStack align="start" justify="space-between">
                <Box>
                  <Text fontWeight="semibold">{g.title}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {g.description}
                  </Text>
                </Box>
                <Box textAlign="right">
                  {g.dueDate ? (
                    <Badge colorScheme="purple">{formatDue(g.dueDate)}</Badge>
                  ) : (
                    <Text fontSize="xs" color="gray.500">
                      No due date
                    </Text>
                  )}
                </Box>
              </HStack>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  )
}
