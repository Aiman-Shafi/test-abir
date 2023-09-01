import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Button,
  ButtonGroup,
  VisuallyHidden,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PasswordField } from "./styles/PasswordField";
import { GitHubIcon, GoogleIcon, TwitterIcon } from "./styles/ProviderIcons";

function SignUpModal() {
  const providers = [
    { name: "Google", icon: <GoogleIcon /> },
    { name: "Twitter", icon: <TwitterIcon /> },
    { name: "GitHub", icon: <GitHubIcon /> },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>SignUp / Login</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Stack
            spacing="10"
            p={10}
            border={"1px solid"}
            borderColor={"brand.100"}
          >
            <Stack spacing="6">
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading
                  size={{ base: "sm", md: "lg" }}
                  fontWeight={"900"}
                  color={"brand.100"}
                >
                  LOUPT
                </Heading>
                <Heading size={{ base: "xs", md: "sm" }}>
                  Log in to your account
                </Heading>
                {/* <Text color="fg.muted">
                  Don't have an account? <Link href="#">Sign up</Link>
                </Text> */}
              </Stack>
            </Stack>
            <Box
              py={{ base: "0", sm: "8" }}
              px={{ base: "4", sm: "10" }}
              bg={{ base: "transparent", sm: "bg.surface" }}
              boxShadow={{ base: "none", sm: "md" }}
              borderRadius={{ base: "none", sm: "xl" }}
              border={"1px solid"}
              borderColor={"brand.100"}
            >
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" type="email" />
                  </FormControl>
                  <PasswordField />
                </Stack>
                <HStack justify="space-between">
                  <Checkbox defaultChecked>Remember me</Checkbox>
                  <Button variant="text" size="sm">
                    Forgot password?
                  </Button>
                </HStack>
                <Stack spacing="6">
                  <Button bg={"brand.100"} color={"white"}>
                    Sign in
                  </Button>
                  <HStack>
                    <Divider />
                    <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                      or continue with
                    </Text>
                    <Divider />
                  </HStack>
                  <ButtonGroup variant="secondary" spacing="4">
                    {providers.map(({ name, icon }) => (
                      <Button key={name} flexGrow={1}>
                        <VisuallyHidden>Sign in with {name}</VisuallyHidden>
                        {icon}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignUpModal;
