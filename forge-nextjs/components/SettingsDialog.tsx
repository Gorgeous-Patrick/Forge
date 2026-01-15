import { Box, Button, Dialog, Portal, Heading, Text, Input, Stack } from "@chakra-ui/react";
import SettingsButton from "./SettingsButton";
import { useState, useEffect } from "react";
import { sampleInfoTags } from "../states/InfoTag";
import { InfoTagComponent } from "./InfoTagComponent";
import { ChatboxComponent } from "@/components/Chatbox";
import { useColorModeValue } from "@/components/ui/color-mode";
import { tagEditorPrompt } from "@/components/prompts";
import { toaster } from "@/components/ui/toaster";

function AccountSettingsPane() {
  const [claudeApiKey, setClaudeApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const inputBg = useColorModeValue("white", "gray.800");
  const inputBorder = useColorModeValue("gray.300", "gray.600");

  useEffect(() => {
    // Load existing settings
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        if (response.ok) {
          const data = await response.json();
          if (data.settings?.claudeApiKey) {
            setClaudeApiKey(data.settings.claudeApiKey);
          }
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setInitialLoad(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ claudeApiKey }),
      });

      if (response.ok) {
        toaster.create({
          title: "Settings saved",
          description: "Your Claude API key has been updated successfully.",
          type: "success",
        });
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
      toaster.create({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Text fontWeight="semibold">Account</Text>
      <Text color={subtitleColor} mt={2}>
        Manage your API keys and account settings.
      </Text>

      <Stack gap={4} mt={6}>
        <Box>
          <Text fontWeight="medium" mb={2}>
            Claude API Key
          </Text>
          <Text fontSize="sm" color={subtitleColor} mb={3}>
            Enter your Anthropic Claude API key to enable AI features
          </Text>
          <Input
            type="password"
            value={claudeApiKey}
            onChange={(e) => setClaudeApiKey(e.target.value)}
            placeholder="sk-ant-..."
            bg={inputBg}
            borderColor={inputBorder}
            disabled={initialLoad}
          />
        </Box>

        <Box>
          <Button
            onClick={handleSave}
            colorScheme="blue"
            loading={loading}
            disabled={initialLoad}
          >
            Save API Key
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

function InfoTagSettingsPane() {
  const [selectedTag, setSelectedTag] = useState<
    typeof sampleInfoTags[number] | null
  >(null);
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const infoTextColor = useColorModeValue("gray.600", "gray.300");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Box>
      <Text fontWeight="semibold">Info Tags</Text>
      <Text color={subtitleColor} mt={2}>
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
            borderColor={cardBorder}
            borderRadius="lg"
            bg={cardBg}
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
                <Text color={infoTextColor} mt={2}>
                  {selectedTag.info}
                </Text>
                <Box mt={4} flex={1} minH="0">
                  <ChatboxComponent
                    name={selectedTag.title}
                    systemPrompt={tagEditorPrompt(selectedTag.title)}
                    summaryPrompt={
                      "Please summarize the key points about " +
                      selectedTag.title +
                      " from our conversation."
                    }
                  />
                </Box>
              </>
            ) : (
              <Box
                flex={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color={placeholderColor}>
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
  const bodyBg = useColorModeValue("white", "gray.900");
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const menuBgActive = useColorModeValue("gray.100", "gray.700");
  const menuBg = "transparent";

  const panes = {
    General: (
      <Box>
        <Text fontWeight="semibold">General</Text>
        <Text color={subtitleColor} mt={2}>
          Basic application preferences and behavior.
        </Text>
      </Box>
    ),
    InformationTags: <InfoTagSettingsPane />,
    Appearance: (
      <Box>
        <Text fontWeight="semibold">Appearance</Text>
        <Text color={subtitleColor} mt={2}>
          Theme, density and other UI preferences.
        </Text>
      </Box>
    ),
    Notifications: (
      <Box>
        <Text fontWeight="semibold">Notifications</Text>
        <Text color={subtitleColor} mt={2}>
          Configure notification preferences and integrations.
        </Text>
      </Box>
    ),
    Account: <AccountSettingsPane />,
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
          <Dialog.Content maxW="960px" bg={bodyBg}>
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
                        bg={item === selected ? menuBgActive : menuBg}
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
