import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Route404 = () => {
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="90vh"
      justifyContent="center"
      alignItems="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box
        textAlign="center"
        p={16}
        borderRadius="md"
        bg={useColorModeValue("white", "gray.700")}
      >
        <Heading size="2xl" mb={4}>
          404: Page Not Found
        </Heading>
        <Text mb={4}>Sorry, the page you are looking for doesn't exist.</Text>
        <Link to="/">
          <Button
            bg={"brand.100"}
            _hover={{ color: "brand.100", bg: "brand.200" }}
            color="white"
          >
            Go Home
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Route404;
