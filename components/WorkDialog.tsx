import {
  Box,
  Button,
  Text,
  CloseButton,
  Dialog,
  Portal,
  HStack,
  RadioCard,
} from "@chakra-ui/react";
import type { Goal } from "../states/goals";
import { useState } from "react";

export function WorkDialog({ goal }: { goal: Goal }) {
  const defaultVal =
    goal.events && goal.events.length > 0 ? "0" : "";
  const [selected, setSelected] = useState<string>(defaultVal);

  return (
    <Dialog.Root size="lg">
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
                  Choose a event to work on for this session.
                </Text>

                {goal.events && goal.events.length > 0 ? (
                  <Box mt={3}>
                    <RadioCard.Root
                      defaultValue={defaultVal}
                      onValueChange={(v: any) =>
                        setSelected(String((v && (v as any).value) ?? v))
                      }
                      variant="solid"
                    >
                      <RadioCard.Label>Select event</RadioCard.Label>
                      <HStack align="stretch">
                        {goal.events.map((d, idx) => (
                          <RadioCard.Item key={`del-${idx}`} value={`${idx}`}>
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl>
                              <RadioCard.ItemContent>
                                <RadioCard.ItemText>
                                  {d.title}
                                </RadioCard.ItemText>
                                {d.minutesEstimate ? (
                                  <RadioCard.ItemDescription>
                                    {d.minutesEstimate} min
                                  </RadioCard.ItemDescription>
                                ) : null}
                              </RadioCard.ItemContent>
                              <RadioCard.ItemIndicator />
                            </RadioCard.ItemControl>
                          </RadioCard.Item>
                        ))}
                      </HStack>
                    </RadioCard.Root>
                  </Box>
                ) : (
                  <Text mt={3} color="gray.500">
                    No events defined for this goal.
                  </Text>
                )}
              </Box>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="ghost">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  onClick={() => {
                    // eslint-disable-next-line no-console
                    console.log(
                      "Start work on",
                      goal.title,
                      "event",
                      selected
                    );
                  }}
                >
                  Start
                </Button>
              </Dialog.ActionTrigger>
              <Dialog.CloseTrigger asChild></Dialog.CloseTrigger>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default WorkDialog;
