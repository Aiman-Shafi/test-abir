import { useContext, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginUser } from "../api";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  VStack,
  Heading,
} from "@chakra-ui/react";

import { useAuth0 } from "@auth0/auth0-react";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user } = useAuth0();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      /*// If the API request is successful, set the JWT token in local storage or a secure cookie
      localStorage.setItem('jwt', response.data.token);
      console.log('token: ' + response.data.token)
      localStorage.setItem('userId', response.data.user.userId)
      console.log('userId: ' + response.data.user.userId)*/

      // Redirect to home page
      console.log("navigating to home");
      navigate("/");
    } catch (error: any) {
      // Handle login failure or display error messages if needed
      console.log(error.message);
      // Reset the form
      setUsername("");
      setPassword("");
    }
  };

  return (
    <VStack spacing={4} w="md" p={4} boxShadow="md" borderRadius={"lg"}>
      <Heading as="h2" size="xl">
        Login Page
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="username">
          <FormLabel>Username:</FormLabel>
          <Input type="text" value={username} onChange={handleUsernameChange} />
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
          Login
        </Button>
      </form>
      <Button
        as={Link}
        to="/signup"
        colorScheme="blue"
        variant="outline"
        mt={2}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default LoginPage;
