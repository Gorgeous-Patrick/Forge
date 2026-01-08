import { Box, Button, Dialog, Portal, Heading, Text } from '@chakra-ui/react'
import SettingsButton from './SettingsButton'
import { useState } from 'react'

export default function SettingsDialog() {
  const [selected, setSelected] = useState('General')

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
              {/* Two-column layout: left menu and right content */}
              <Box display="flex" gap={6} p={3} minWidth="600px">
                <Box width="200px" flexShrink={0}>
                  <Box as="nav">
                    {['General', 'Appearance', 'Notifications', 'Account'].map(
                      item => (
                        <Button
                          key={item}
                          variant="ghost"
                          justifyContent="flex-start"
                          width="100%"
                          mb={1}
                          bg={item === selected ? 'gray.100' : 'transparent'}
                          onClick={() => setSelected(item)}
                        >
                          {item}
                        </Button>
                      )
                    )}
                  </Box>
                </Box>

                <Box flex={1}>
                  {selected === 'General' && (
                    <Box>
                      <Text fontWeight="semibold">General</Text>
                      <Text color="gray.600" mt={2}>
                        Basic application preferences and behavior.
                      </Text>
                    </Box>
                  )}

                  {selected === 'Appearance' && (
                    <Box>
                      <Text fontWeight="semibold">Appearance</Text>
                      <Text color="gray.600" mt={2}>
                        Theme, density and other UI preferences.
                      </Text>
                    </Box>
                  )}

                  {selected === 'Notifications' && (
                    <Box>
                      <Text fontWeight="semibold">Notifications</Text>
                      <Text color="gray.600" mt={2}>
                        Configure notification preferences and integrations.
                      </Text>
                    </Box>
                  )}

                  {selected === 'Account' && (
                    <Box>
                      <Text fontWeight="semibold">Account</Text>
                      <Text color="gray.600" mt={2}>
                        Manage account settings and connected services.
                      </Text>
                    </Box>
                  )}
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
