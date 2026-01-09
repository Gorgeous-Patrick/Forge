import { Box, Button, Dialog, Portal, Heading, Text } from "@chakra-ui/react";
import SettingsButton from "./SettingsButton";
import { useState } from "react";
import { sampleInfoTags } from "../states/InfoTag";
import { InfoTagComponent } from "./InfoTagComponent";
import { ChatboxComponent } from "@/components/Chatbox";

function InfoTagSettingsPane() {
  const [selectedTag, setSelectedTag] = useState<
    typeof sampleInfoTags[number] | null
  >(null);

  return (
    <Box>
      <Text fontWeight="semibold">Info Tags</Text>
      <Text color="gray.600" mt={2}>
        Manage and customize your information tags.
      </Text>

      <Box
        mt={6}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        gap={6}
      >
        <Box flex={1}>
          <Text fontWeight="medium" mb={3}>
            Available Tags
          </Text>
          <Box display="flex" gap={2} flexWrap="wrap">
            {sampleInfoTags.map((tag) => (
              <Box key={tag.title}>
                <InfoTagComponent
                  tag={tag}
                  onClick={() => setSelectedTag(tag)}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Box flex={1} minH="420px">
          <Box
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            bg="white"
            p={4}
            height="100%"
            display="flex"
            flexDirection="column"
            minH="420px"
          >
            {selectedTag ? (
              <>
                <Heading as="h3" size="md">
                  {selectedTag.title}
                </Heading>
                <Text color="gray.600" mt={2}>
                  {selectedTag.info}
                </Text>
                <Box mt={4} flex={1} minH="0">
                  <ChatboxComponent name={selectedTag.title} />
                </Box>
              </>
            ) : (
              <Box
                flex={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="gray.500">
                  Select a tag to view details and chat.
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function SettingsDialog() {
  const panes = {
    General: (
      <Box>
        <Text fontWeight="semibold">General</Text>
        <Text color="gray.600" mt={2}>
          Basic application preferences and behavior.
        </Text>
      </Box>
    ),
    InformationTags: <InfoTagSettingsPane />,
    Appearance: (
      <Box>
        <Text fontWeight="semibold">Appearance</Text>
        <Text color="gray.600" mt={2}>
          Theme, density and other UI preferences.
        </Text>
      </Box>
    ),
    Notifications: (
      <Box>
        <Text fontWeight="semibold">Notifications</Text>
        <Text color="gray.600" mt={2}>
          Configure notification preferences and integrations.
        </Text>
      </Box>
    ),
    Account: (
      <Box>
        <Text fontWeight="semibold">Account</Text>
        <Text color="gray.600" mt={2}>
          Manage account settings and connected services.
        </Text>
      </Box>
    ),
  };

  const [selected, setSelected] = useState("General" as keyof typeof panes);
  const menuItems = Object.keys(panes) as Array<keyof typeof panes>;

  return (
    <Dialog.Root size="lg">
      <Dialog.Trigger asChild>
        <SettingsButton />
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="960px">
            <Dialog.Header>
              <Dialog.Title>Settings</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              {/* Two-column layout: left menu and right content */}
              <Box display="flex" gap={6} p={3} minWidth="600px">
                <Box width="200px" flexShrink={0}>
                  <Box as="nav">
                    {menuItems.map((item) => (
                      <Button
                        key={item}
                        variant="ghost"
                        justifyContent="flex-start"
                        width="100%"
                        mb={1}
                        bg={item === selected ? "gray.100" : "transparent"}
                        onClick={() => setSelected(item)}
                      >
                        {item}
                      </Button>
                    ))}
                  </Box>
                </Box>

                <Box flex={1}>{panes[selected] ?? null}</Box>
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
              <Button aria-hidden style={{ display: "none" }} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
