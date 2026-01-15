"use client";

import {
  Box,
  Button,
  Input,
  Text,
  Dialog,
  Portal,
  CloseButton,
  VStack,
  Field,
  Tabs,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";

type LoginDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: (email: string) => void;
  initialMode?: "login" | "register";
};

export default function LoginDialog({
  open,
  onOpenChange,
  onLoginSuccess,
  initialMode = "login",
}: LoginDialogProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dialogTextColor = useColorModeValue("gray.600", "gray.300");
  const errorColor = useColorModeValue("red.600", "red.400");

  // Reset form when mode changes or dialog opens/closes
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleModeChange = (newMode: "login" | "register") => {
    setMode(newMode);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || `${mode === "login" ? "Login" : "Registration"} failed`);
        setIsLoading(false);
        return;
      }

      // Login/Register successful
      onLoginSuccess(data.user.email);
      resetForm();
      onOpenChange(false);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{mode === "login" ? "Login" : "Register"}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack gap={4} align="stretch">
                <HStack gap={2} width="100%" justify="center">
                  <Button
                    variant={mode === "login" ? "solid" : "ghost"}
                    colorScheme={mode === "login" ? "blue" : "gray"}
                    onClick={() => handleModeChange("login")}
                    flex={1}
                  >
                    Login
                  </Button>
                  <Button
                    variant={mode === "register" ? "solid" : "ghost"}
                    colorScheme={mode === "register" ? "blue" : "gray"}
                    onClick={() => handleModeChange("register")}
                    flex={1}
                  >
                    Register
                  </Button>
                </HStack>

                <form onSubmit={handleSubmit}>
                  <VStack gap={4} align="stretch">
                    <Field.Root>
                      <Field.Label>Email</Field.Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        disabled={isLoading}
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Password</Field.Label>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder={mode === "register" ? "Min. 8 characters" : "Enter your password"}
                        disabled={isLoading}
                        minLength={mode === "register" ? 8 : undefined}
                      />
                      {mode === "register" && (
                        <Field.HelperText fontSize="xs" color={dialogTextColor}>
                          Password must be at least 8 characters
                        </Field.HelperText>
                      )}
                    </Field.Root>

                    {error && (
                      <Text color={errorColor} fontSize="sm">
                        {error}
                      </Text>
                    )}

                    <Box mt={2}>
                      <Button
                        type="submit"
                        colorScheme="blue"
                        width="100%"
                        disabled={isLoading}
                      >
                        {isLoading
                          ? mode === "login"
                            ? "Logging in..."
                            : "Creating account..."
                          : mode === "login"
                          ? "Login"
                          : "Create Account"}
                      </Button>
                    </Box>
                  </VStack>
                </form>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
