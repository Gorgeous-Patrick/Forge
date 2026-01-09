import {
  Box,
  Button,
  Dialog,
  Portal,
  Heading,
  Text,
  CloseButton,
} from "@chakra-ui/react";
import SettingsButton from "./SettingsButton";
import { useState } from "react";
import { sampleInfoTags } from "../states/InfoTag";
import { InfoTagComponent } from "./InfoTagComponent";
import { ChatboxComponent } from "@/components/Chatbox";

function TagDialog({
  tag,
  onClose,
}: {
  tag: typeof sampleInfoTags[number] | null;
  onClose: () => void;
}) {
  if (!tag) return null;
  console.log("Rendering TagDialog for tag:", tag);

  return (
    <Dialog.Root
      open={!!tag}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      size="full"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            maxW="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
          >
            <Dialog.Header>
              <Dialog.Title>{tag.title}</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body
              display="flex"
              flexDirection="column"
              flex={1}
              minH={0}
              gap={4}
            >
              <Box as="p" color="gray.700" flexShrink={0}>
                {tag.info}
              </Box>
              <Box flex={1} minH={0} overflow="hidden">
                <ChatboxComponent name={tag.title} />
              </Box>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton aria-label="Close tag dialog" onClick={onClose} />
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

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

      <Box mt={4} display="flex" gap={2} flexWrap="wrap">
        {sampleInfoTags.map((tag) => (
          <Box key={tag.title}>
            <InfoTagComponent tag={tag} onClick={() => setSelectedTag(tag)} />
          </Box>
        ))}
      </Box>

      {/* Parent-controlled dialog rendered here */}
      <TagDialog tag={selectedTag} onClose={() => setSelectedTag(null)} />
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
          <Dialog.Content maxW="720px">
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
