import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  useTheme,
  Button,
  Img,
  useMediaQuery,
  HStack,
  Divider,
  Container,
  Heading,
} from "@chakra-ui/react";
import {
  getUser,
  getConnectedUsers,
  getAllCompanies,
  getConnectedCompanies,
  Company,
  User,
  getUserToken,
} from "../api";
import { useAuth0, Auth0Context } from "@auth0/auth0-react";

import heroBg from "../assets/bg-hero.png";
import heroMan from "../assets/hero-man-img.png";
import styles from "./styles/HomeStyles";
import NetworkCard from "../components/NetworkCard";
import CardGrid from "../components/CardGrid";

const HomePage = () => {
  // Fetching Data
  // const [user, setUser] = useState({} as User);

  const [connectedUsers, setConnectedUsers] = useState([] as User[]);
  const [allCompanies, setAllCompanies] = useState([] as Company[]);
  const [connectedCompanies, setConnectedCompanies] = useState([] as Company[]);

  const { user, getAccessTokenSilently, isLoading } = useAuth0();

  useEffect(() => {
    //wait for auth0 to be done loading and make sure we have our user data
    if (!isLoading && user) {
      //get the auth0 sub and the JWT from auth0. this will be verified by our backend
      getUserToken(user, getAccessTokenSilently).then((result) => {
        //is we get a success (we are authenticated), execute this logic
        if (result.isAuthenticated) {
          console.log("authenticated!");

          getUser().then((response) => {
            console.log("User:");
            console.log(response);
          });

          getConnectedCompanies().then((response) => {
            console.log("Connected Companies:");
            console.log(response);
            setConnectedCompanies(response);
          });
        } else console.log("Homepage: not authenticated..");
      });
    }
  }, [isLoading]);

  return (
    <>
      {/* // HERO SECTION  */}
      <Container maxW={"1280px"}>
        <Flex sx={styles.container}>
          <Box sx={styles.firstColumn}>
            <Heading as="h2" sx={styles.heading2}>
              Join Our Crowdfunding Revolution!
            </Heading>
            <Heading sx={styles.heading1}>
              Unleash Your Dreams, Empower Your Ideas
            </Heading>
            <Text sx={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vitae commodo augue. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nunc vitae commodo augue. Lorem ipsum dolor sit
            </Text>
            <Button sx={styles.button}>Get Started</Button>
          </Box>

          <Box
            sx={styles.secondColumn}
            style={{
              backgroundImage: `url(${heroBg})`,
            }}
          >
            <Img src={heroMan} width="90%" />
          </Box>
        </Flex>

        {/* NETWORK SUGGESTIONS  */}
        <VStack spacing={20}>
          <Divider sx={styles.divider} />
          <Box>
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              gap={10}
            >
              <Heading sx={styles.heading1}>Network Suggestions</Heading>
              <HStack>
                <NetworkCard isAuthenticated={!!user}></NetworkCard>
              </HStack>
            </Flex>
          </Box>
          <Divider sx={styles.divider} />
        </VStack>
        {/* DUAL BUTTONS  */}
        <HStack spacing={4} justify="center" py={10}>
          <Button sx={styles.buttonLarge} color={"brand.100"}>
            My Network
          </Button>
          <Button sx={styles.buttonLarge} color="white" bg="brand.100">
            Explore
          </Button>
        </HStack>
        {/* COMPANY CARDS */}
        <Box m={"50px 20px"}>
          <CardGrid></CardGrid>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
