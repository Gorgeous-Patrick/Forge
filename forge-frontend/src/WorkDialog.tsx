import {
  Box,
  Button,
  Text,
  CloseButton,
  Dialog,
  Portal,
} from '@chakra-ui/react'
import type { Goal } from './states/goals'

export function WorkDialog({ goal }: { goal: Goal }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="sm" colorScheme="blue">
          Work!
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Work on goal</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Box>
                <Text fontWeight="semibold">{goal.title}</Text>
                <Text mt={2} color="gray.600">
                  This is a placeholder dialog for starting a focused work
                  session on this goal. Wire a timer or a deeper UI here.
                </Text>
              </Box>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button variant="ghost">Close</Button>
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

export default WorkDialog
