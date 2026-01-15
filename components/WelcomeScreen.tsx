"use client";
import { Box, Flex, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

interface WelcomeScreenProps {
  onLoginClick: () => void;
}

export default function WelcomeScreen({ onLoginClick }: WelcomeScreenProps) {
  const bgGradient = useColorModeValue(
    "linear(to-br, gray.50, white)",
    "linear(to-br, gray.900, gray.800)"
  );
  const headingColor = useColorModeValue("gray.900", "gray.50");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const accentColor = useColorModeValue("blue.600", "blue.400");

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient={bgGradient}
      px={4}
    >
      <VStack gap={6} maxW="600px" textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight="bold"
          color={headingColor}
          letterSpacing="tight"
        >
          Forge
        </Heading>

        <Text
          fontSize={{ base: "lg", md: "xl" }}
          color={textColor}
          maxW="500px"
          lineHeight="tall"
        >
          Build your future, one block at a time. Organize your goals and schedule with clarity.
        </Text>

        <Button
          size="lg"
          colorScheme="blue"
          onClick={onLoginClick}
          px={8}
          py={6}
          fontSize="lg"
          mt={4}
          _hover={{
            transform: "translateY(-2px)",
            shadow: "lg",
          }}
          transition="all 0.2s"
        >
          Get Started
        </Button>

        <Text fontSize="sm" color={textColor} opacity={0.8} mt={2}>
          Sign in to access your calendar and goals
        </Text>
      </VStack>
    </Flex>
  );
}
