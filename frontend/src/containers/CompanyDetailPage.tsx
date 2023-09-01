import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Progress,
  Input,
  Text,
  VStack,
  useTheme,
  Button,
  useMediaQuery,
  Center,
  Spacer,
  Image,
  HStack,
  Divider,
  Heading,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { Icon, InfoIcon } from "@chakra-ui/icons";
import { MdDiscount } from "react-icons/md";
import {
  getUser,
  getConnectedUsers,
  getAllCompanies,
  getConnectedCompanies,
  Company,
  User,
} from "../api";
import image from "../assets/image 2.png";
import imageTwo from "../assets/petronas.png";
// import borderImg from '../assets/Rectangle 17.jpg';
// import appleLogo from '../assets/Ellipse 14.jpg';
const CompanyDetailPage = () => {
  const theme = useTheme();
  const mainPurple = theme.colors.mainPurple ?? "#8764FF";

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const [user, setUser] = useState({} as User);
  const [connectedUsers, setConnectedUsers] = useState([] as User[]);
  const [allCompanies, setAllCompanies] = useState([] as Company[]);
  const [connectedCompanies, setConnectedCompanies] = useState([] as Company[]);

  useEffect(() => {
    getUser()
      .then((response) => {
        if (response) {
          console.log("User:");
          console.log(response);
          setUser(response);
        } else {
          // handle the scenario when user is not returned
          console.error("No user returned");
          //setUser({} as User); this is default value anyways
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        //setUser({}); this is default value anyways
      });

    getConnectedUsers().then((response) => {
      console.log("Connected Users:");
      console.log(response);
      setConnectedUsers(response);
    });

    getAllCompanies().then((response) => {
      console.log("All Companies:");
      console.log(response);
      setAllCompanies(response);
    });

    getConnectedCompanies().then((response) => {
      console.log("Connected Companies:");
      console.log(response);
      setConnectedCompanies(response);
    });
  }, []);

  return (
    <>
      <Heading pl={10} pt={10} color={mainPurple}>
        Company Profile
      </Heading>
      <Heading pl={10} pt={10} color={mainPurple}>
        Invest In Tesla!
      </Heading>
      <HStack my={5}>
        <Text fontSize={"lg"} pl={10} color={mainPurple}>
          Very Short Company Bio Goes Here/Company Slogan
        </Text>
        <Spacer />
        <HStack mr={10}>
          <Text color={mainPurple}>3 Network Investors:</Text>
          <Avatar size="sm" src={user.profilePic} />
          <Avatar size="sm" src={user.profilePic} />
          <Avatar size="sm" src={user.profilePic} />
        </HStack>
      </HStack>
      <Center>
        <Divider
          orientation="horizontal"
          borderWidth={4}
          borderColor={mainPurple}
          w={"95%"}
          borderRadius={10}
          display={"flex"}
          alignItems={"center"}
          mb={5}
        />
      </Center>

      <HStack ml={10} mb={10} spacing={6}>
        <Image
          w={"60%"}
          border={"solid"}
          borderColor={mainPurple}
          borderRadius={30}
          src={imageTwo}
        ></Image>
        <Box
          w={"35%"}
          h={470}
          border={"solid"}
          borderColor={mainPurple}
          borderRadius={15}
          bgGradient="linear(to-t, white, #8764FF, white)"
        >
          <VStack
            alignItems={"flex-start"}
            p={10}
            textColor={"white"}
            fontSize={"2xl"}
            fontWeight={700}
            spacing={6}
          >
            <Progress
              value={50}
              size="md"
              colorScheme="purple"
              w={"90%"}
              borderRadius={10}
            />
            <Text mt={3}>Value Cap: $1,000,000</Text>
            <Text>Raised: $500,000</Text>
            <Text>Min: $100</Text>
          </VStack>

          <VStack mt={0} mb={5} align={"center"} spacing={5}>
            <HStack>
              <Text fontSize={"3xl"} fontWeight={700} color={"purple.800"}>
                Buy
              </Text>
              <InputGroup color={"purple.800"}>
                <InputLeftElement
                  pointerEvents="none"
                  color={"purple.800"}
                  fontSize="1.2em"
                  children="$"
                />
                <Input borderColor={"purple.800"} w={20}></Input>
              </InputGroup>
            </HStack>
            <Button color={"white"} bgColor={mainPurple} size={"lg"} w={40}>
              <Text fontSize={"xl"} fontWeight={700}>
                Invest
              </Text>
            </Button>
          </VStack>
        </Box>
      </HStack>
      <VStack
        align={"start"}
        px={20}
        mt={20}
        mb={10}
        bgGradient="linear(to-t, white, #8764FF, white)"
        spacing={5}
      >
        <Text fontSize={"3xl"} fontWeight={700}>
          About Petronas
        </Text>

        <Text>
          Lorem ipsum dolor sit aLorem ipsum dolor sit amet, consectetur sit
          amet, adipiscing elit. Nunc vitae commodo sit amet, augue.Lorem ipsum
          dolor sit amet, sit amet, consectetur o augue.Lorem ipsum dolor sit
          amet, consectetur sit amet, adipiscing elit. Nunc vitae commodo sit
          amet, augue.Lorem ipsum dolor sit amet, sit amet, consectetur o
          augue.Lorem ipsum dolor sit amet, consectetur sit amet, adipiscing
          elit. Nunc vitae commodo sit amet, augue.Lorem ipsum dolor sit amet,
          sit amet, consectetur o augue.Lorem ipsum dolor sit amet, consectetur
          sit amet, adipiscing elit. Nunc vitae commodo sit amet, augue.Lorem
          ipsum dolor sit amet, sit amet, consectetur o augue.Lorem ipsum dolor
          sit amet, consectetur sit amet, adipiscing elit. Nunc vitae commodo
          sit amet, augue.Lorem ipsum dolor sit amet, sit amet, consectetur o
          augue.met, consectetur sit amet, adipiscing elit. Nunc vitae commodo
          sit amet, augue.Lorem ipsum dolor sit amet, sit amet, consectetur o
          augue.
        </Text>
      </VStack>
      <VStack align={"start"} px={20} my={5}>
        <Heading>Our Team</Heading>
        <HStack my={5}>
          <HStack
            align={"center"}
            borderRadius={10}
            border={"solid"}
            borderColor={mainPurple}
            p={5}
          >
            <Avatar size={"xl"} src={user.profilePic}></Avatar>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vitae commodo augue.
            </Text>
          </HStack>
          <HStack
            align={"center"}
            borderRadius={10}
            border={"solid"}
            borderColor={mainPurple}
            p={5}
          >
            <Avatar size={"xl"} src={user.profilePic}></Avatar>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vitae commodo augue.
            </Text>
          </HStack>
          <HStack
            align={"center"}
            borderRadius={10}
            border={"solid"}
            borderColor={mainPurple}
            p={5}
          >
            <Avatar size={"xl"} src={user.profilePic}></Avatar>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vitae commodo augue.
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <HStack pl={20} my={10} spacing={10}>
        <Box
          border={"solid"}
          h={700}
          w={"60%"}
          borderRadius={10}
          borderColor={mainPurple}
        >
          <VStack align={"start"}>
            <Heading pl={10} pt={10}>
              Highlights
            </Heading>
            <HStack px={10} pt={5} spacing={5}>
              <InfoIcon color={mainPurple} boxSize={7} />
              <Text fontSize={"xl"} fontWeight={500}>
                Lorem ipsum dolor sit aLorem ipsum dolor sit amet, consectetur
                sit amet, adipiscing elit. Nunc vitae commodo sit amet,
              </Text>
            </HStack>
            <HStack px={10} pt={5} spacing={5}>
              <InfoIcon color={mainPurple} boxSize={7} />
              <Text fontSize={"xl"} fontWeight={500}>
                Lorem ipsum dolor sit aLorem ipsum dolor sit amet, consectetur
                sit amet, adipiscing elit. Nunc vitae commodo sit amet,
              </Text>
            </HStack>
            <HStack px={10} pt={5} spacing={5}>
              <InfoIcon color={mainPurple} boxSize={7} />
              <Text fontSize={"xl"} fontWeight={500}>
                Lorem ipsum dolor sit aLorem ipsum dolor sit amet, consectetur
                sit amet, adipiscing elit. Nunc vitae commodo sit amet,
              </Text>
            </HStack>
            <HStack px={10} pt={5} spacing={5}>
              <InfoIcon color={mainPurple} boxSize={7} />
              <Text fontSize={"xl"} fontWeight={500}>
                Lorem ipsum dolor sit aLorem ipsum dolor sit amet, consectetur
                sit amet, adipiscing elit. Nunc vitae commodo sit amet,
              </Text>
            </HStack>
            <HStack px={10} pt={5} spacing={5}>
              <InfoIcon color={mainPurple} boxSize={7} />
              <Text fontSize={"xl"} fontWeight={500}>
                Lorem ipsum dolor sit aLorem ipsum dolor sit amet, consectetur
                sit amet, adipiscing elit. Nunc vitae commodo sit amet,
              </Text>
            </HStack>
            <HStack px={10} pt={5} spacing={5}>
              <InfoIcon color={mainPurple} boxSize={7} />
              <Text fontSize={"xl"} fontWeight={500}>
                Lorem ipsum dolor sit aLorem ipsum dolor sit amet, consectetur
                sit amet, adipiscing elit. Nunc vitae commodo sit amet,
              </Text>
            </HStack>
          </VStack>
        </Box>
        <Box
          border={"solid"}
          h={700}
          w={"30%"}
          borderRadius={10}
          borderColor={mainPurple}
        >
          <VStack align={"start"} py={10} pl={10} fontSize={"xl"}>
            <Heading>Deal Terms</Heading>
            <Text mt={5}>Discount</Text>
            <Text fontWeight={700} mt={-3}>
              10%
            </Text>
            <Text mt={3}>Maximum Investment</Text>
            <Text fontWeight={700} mt={-3}>
              $100,000
            </Text>
            <Text mt={3}>Funding Goals</Text>
            <Text fontWeight={700} mt={-3}>
              $25k-$4.16M
            </Text>
            <Text mt={3}>Deadline</Text>
            <Text fontWeight={700} mt={-3}>
              August 18, 2023
            </Text>
          </VStack>
        </Box>
      </HStack>
    </>
  );
};
export default CompanyDetailPage;
