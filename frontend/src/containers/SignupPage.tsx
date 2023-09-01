import { useState, ChangeEvent, FormEvent } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Box,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { signupUser } from "../api";

const SignupPage: React.FC = () => {
  const [legalName, setLegalName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLegalNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLegalName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform sign-up logic here

    const response = await signupUser(
      legalName,
      email,
      parseInt(phoneNumber),
      password
    );

    console.log(
      `Legal Name: ${legalName}, Email: ${email}, Phone Number: ${phoneNumber}`
    );

    console.log(response);
    // Reset the form
    setLegalName("");
    setEmail("");
    setPhoneNumber("");
  };

  return (
    <VStack spacing={4} w="md" p={4} boxShadow="md" borderRadius={"lg"}>
      <Box textAlign="center">
        <Heading as="h2" size="xl">
          Sign Up Page
        </Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl id="legalName">
          <FormLabel>Legal Name:</FormLabel>
          <Input
            type="text"
            value={legalName}
            onChange={handleLegalNameChange}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email:</FormLabel>
          <Input type="email" value={email} onChange={handleEmailChange} />
        </FormControl>
        <FormControl id="phoneNumber">
          <FormLabel>Phone Number:</FormLabel>
          <Input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <Button colorScheme="blue" type="submit" mt={4}>
          Sign Up
        </Button>
      </form>
      <Text mt={2}>
        Already have an account?{" "}
        <Button as={Link} to="/login" colorScheme="blue" variant="link">
          Log In!
        </Button>
      </Text>
    </VStack>
  );
};

export default SignupPage;
