import { Box, Button, Dialog, Portal, Heading, Text } from '@chakra-ui/react'
import SettingsButton from './SettingsButton'

export default function SettingsDialog() {
  return (
    <Dialog.Root size="lg">
      <Dialog.Trigger asChild>
        <SettingsButton />
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="720px">
            <Dialog.Header>
              <Dialog.Title>
                <Heading as="h3" size="md">
                  Settings
                </Heading>
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Box p={3}>
                <Box mb={4}>
                  <Text fontWeight="semibold">Appearance</Text>
                  <Text color="gray.600" fontSize="sm">
                    Theme, density and other UI preferences.
                  </Text>
                </Box>

                <Box mb={4}>
                  <Text fontWeight="semibold">Notifications</Text>
                  <Text color="gray.600" fontSize="sm">
                    Configure notification preferences and integrations.
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="semibold">Account</Text>
                  <Text color="gray.600" fontSize="sm">
                    Manage account settings and connected services.
                  </Text>
                </Box>
              </Box>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="ghost">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button colorScheme="blue">Save</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              {/* close icon already inside content via CloseTrigger if desired */}
              <Button aria-hidden style={{ display: 'none' }} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
