import { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
import { getUser, Company, User, getConnectedCompanies, updateUser } from "../api";
import { Link } from "react-router-dom";

import {
  Box,
  Heading,
  Text,
  VStack,
  Avatar,
  Image,
  AvatarBadge,
  Button,
  HStack,
  Spacer,
  Center,
  Divider,
  Grid,
} from "@chakra-ui/react";
import {
  Icon,
  ChevronDownIcon,
  EditIcon,
  PhoneIcon,
  EmailIcon,
  BellIcon,
  ChatIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import { BsThreeDots, BsGenderMale, BsBriefcaseFill } from "react-icons/bs";
import { TbDeviceAnalytics } from "react-icons/tb";
import { FaGraduationCap, FaLocationArrow } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
import bannerImg from "../../src/assets/bannerImg.png";
import image from "../assets/image 2.png";
import { getConnectedUsers, getAllCompanies, getUserToken } from "../api";

import { useAuth0, Auth0Context } from "@auth0/auth0-react";

const ProfilePage = () => {
  const [user, setUser] = useState({} as User);
  const [connectedUsers, setConnectedUsers] = useState([] as User[]);
  const [allCompanies, setAllCompanies] = useState([] as Company[]);
  const [connectedCompanies, setConnectedCompanies] = useState([] as Company[]);
  const { getAccessTokenSilently, isLoading, user: auth0User } = useAuth0();

  useEffect(() => {
    //wait for auth0 to be done loading and make sure we have our user data
    if (!isLoading && auth0User) {
      //get the auth0 sub and the JWT from auth0. this will be verified by our backend
      getUserToken(auth0User, getAccessTokenSilently).then((result) => {
        //is we get a success (we are authenticated), execute this logic
        if (result.isAuthenticated) {
          console.log("authenticated!");

          getUser().then((response) => {
            console.log("User:");
            console.log(response);
            if(response)
              setUser(response);
          });

          updateUser(
            {
              bio: "This is an updated test bio"
            }
          ).then((response) => {
            console.log("User has been updated:");
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
      <Box mb={{ base: "4", md: "150" }}>
        <Box
          bgImage={bannerImg}
          h={{ base: "50", md: "210" }}
          w="full"
          position="relative"
        >
          <Link to="/edit-profile">
            <Button
              position="absolute"
              top={{ base: "150px", md: "150px" }}
              left={{ base: "22%", md: "87%" }}
              leftIcon={<EditIcon />}
              bg={"brand.100"}
              color="white"
              fontSize={"18px"}
            >
              Edit Profile
            </Button>
          </Link>

          <Box
            position="absolute"
            left={{ base: "5%", md: "5%" }}
            top={{ base: "10px", md: "100px" }}
            width={{ base: "90px", md: "190px" }}
            height={{ base: "90px", md: "190px" }}
            borderRadius="50%"
            bgColor="rgba(135, 100, 255, 0.5)"
            border="0.5px solid #FFF"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              width={{ base: "70px", md: "160px" }}
              height={{ base: "70px", md: "160px" }}
              borderRadius="50%"
              bg="#8764FF"
              border="2px solid #FFF"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Avatar
                size={{ base: "md", md: "2xl" }}
                src={user.profilePic}
                name={user.legalName}
                zIndex="2"
              >
                <AvatarBadge
                  boxSize={{ base: "0.3em", md: "0.7em" }}
                  bg={"green.500"}
                  borderColor="white"
                  borderWidth="3px"
                />
              </Avatar>
            </Box>
          </Box>
          <Button
            position="absolute"
            top={{ base: "150px", md: "310px" }}
            left={{ base: "22%", md: "8.5%" }}
            rightIcon={<EditIcon />}
          >
            Edit
          </Button>

          <Text
            position="absolute"
            top={{ base: "110px", md: "220px" }}
            left={{ base: "22%", md: "22%" }}
            fontSize={{ base: "xl", md: "3xl" }}
            fontWeight="bold"
            color="black"
          >
            {user.legalName}
          </Text>
          <HStack
            position="absolute"
            top={{ base: "130px", md: "270px" }}
            left={{ base: "22%", md: "22%" }}
            spacing={10}
            w="full" // make sure the HStack takes full width
          >
            <Text
              fontSize={{ base: "sm", md: "xl" }}
              fontWeight="bold"
              color="black"
            >
              300 Connections
            </Text>
            <HStack spacing={0}>
              {[...Array(10)].map((_, i) => (
                <Avatar
                  key={i}
                  size="md"
                  src={user.profilePic}
                  name={`Friend ${i + 1}`}
                  marginLeft={-2}
                />
              ))}
            </HStack>
            {/* <Spacer />  */}
            <Button position={"absolute"} left={{ base: "22%", md: "66%" }}>
              <ChevronDownIcon boxSize={8} />
            </Button>
          </HStack>
        </Box>
      </Box>
      <Box>
        <Center>
          <Divider
            mb={10}
            orientation={"horizontal"}
            size={"md"}
            borderColor={"#8764FF"}
            borderWidth={2}
            width={"88%"}
          />
        </Center>
      </Box>
      <VStack>
        <HStack spacing={5}>
          <HStack spacing={5}>
            <Box
              h={"75px"}
              w={700}
              border={"solid"}
              borderRadius={10}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderColor={"#8764FF"}
            >
              <HStack spacing={5}>
                <Text fontSize={"2xl"} fontWeight={700}>
                  Contact Information
                </Text>
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Button w={20} colorScheme="purple">
                  <EmailIcon />
                </Button>
                <Button w={20} colorScheme="purple">
                  <PhoneIcon />
                </Button>
                <Button
                  w={20}
                  colorScheme="purple" // color the button
                  rightIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </HStack>
            </Box>
          </HStack>
          <HStack spacing={5}>
            <Box
              h={"75px"}
              w={450}
              border={"solid"}
              borderRadius={10}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderColor={"#8764FF"}
            >
              <Center>
                <HStack spacing={5}>
                  <Button colorScheme="purple" w={20}>
                    <BellIcon />
                  </Button>
                  <Button colorScheme="purple" w={20}>
                    <ChatIcon />
                  </Button>
                  <Button colorScheme="purple" w={20}>
                    <Icon as={TbDeviceAnalytics} />
                  </Button>
                  <Button colorScheme="purple" w={20}>
                    <Icon as={BsThreeDots} />
                  </Button>
                </HStack>
              </Center>
            </Box>
          </HStack>
        </HStack>
        <HStack mt={10} mb={10} spacing={5}>
          <VStack>
            <Box
              w={"450px"}
              h={"785px"}
              border={"solid"}
              borderRadius={10}
              borderColor={"#8764FF"}
              p={8}
            >
              <Heading mb={5}>Bio</Heading>
              <Text mb={5}>
                {user.bio}
                {/* Short bio */}
              </Text>

              <Button w={"100%"} bgColor={"#8764FF"} color={"white"} mb={10}>
                Edit Bio
              </Button>
              <Heading mb={5}>Company Bio</Heading>
              <Text mb={5}>{/* {connectedCompanies[0].bio} */}</Text>
              <Button w={"100%"} bgColor={"#8764FF"} color={"white"} mb={10}>
                Edit Company Bio
              </Button>
              <Heading>Basic Information</Heading>
              <HStack mt={5}>
                <Icon as={FaLocationArrow} height={10} width={10} mr={2}></Icon>
                <Text fontSize={"2xl"}>Lives in</Text>
                <Text fontSize={"2xl"} fontWeight={700}>
                  London
                </Text>
              </HStack>
              <HStack mt={5}>
                <Icon as={BsGenderMale} height={10} width={10} mr={2}></Icon>
                <Text fontSize={"2xl"}>Gender</Text>
                <Text fontSize={"2xl"} fontWeight={700}>
                  Male
                </Text>
              </HStack>
              <HStack mt={5}>
                <Icon as={BsBriefcaseFill} height={10} width={10} mr={2}></Icon>
                <Text fontSize={"2xl"}>Works at</Text>
                <Text fontSize={"2xl"} fontWeight={700}>
                  Dowell
                </Text>
              </HStack>
              <HStack mt={5}>
                <Icon as={FaGraduationCap} height={10} width={10} mr={2}></Icon>
                <Text fontSize={"2xl"}>Studied at</Text>
                <Text fontSize={"2xl"} fontWeight={700}>
                  Davidson College
                </Text>
              </HStack>
            </Box>
          </VStack>
          <VStack spacing={7}>
            <Box
              w={"700px"}
              h={"240px"}
              border={"solid"}
              borderRadius={10}
              borderColor={"#8764FF"}
              p={5}
            >
              <Heading mb={4}>Connection Suggestions</Heading>
              <HStack>
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Box
                      key={i} // Don't forget to include a key when mapping in React
                      w={"100px"}
                      h={"140px"}
                      // borderRadius={'10px'}
                      background={"#FFF"}
                      boxShadow={"0px 4px 15px 0px rgba(0, 0, 0, 0.07)"}
                      position="relative"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        style={{
                          position: "absolute",
                          top: "3px",
                          right: "3px",
                        }}
                      >
                        <path
                          d="M9.72266 17.8458L17.8466 9.72412M9.72266 9.72412L17.8466 17.8458"
                          stroke="#F41E1E"
                          strokeWidth="1.72312"
                          strokeLinecap="round"
                        />
                      </svg>

                      <Center h="full">
                        <VStack>
                          <Image
                            src={image}
                            boxSize="50px"
                            borderRadius="63px"
                            border="1px solid var(--main-purple, #9583F4)"
                            bg="lightgray"
                            objectFit="cover"
                            boxShadow="0px 4px 15px 0px rgba(0, 0, 0, 0.07)"
                          />
                          <Text>Barr Flinn</Text>
                          <Button
                            h={"30px"}
                            w={"80px"}
                            color={"white"}
                            bg={"#9583F4"}
                          >
                            Accept
                          </Button>
                        </VStack>
                      </Center>
                    </Box>
                  ))}
              </HStack>
            </Box>
            <Box
              w={"700px"}
              h={"300px"}
              border={"solid"}
              borderRadius={10}
              borderColor={"#8764FF"}
              p={5}
            >
              <Heading mb={4}>My Investments</Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Box
                  border={"solid"}
                  borderRadius={10}
                  p={3}
                  borderColor={"#8764FF"}
                >
                  <HStack>
                    <Avatar
                      // src={connectedCompanies[0].logo}
                      mr={2}
                      borderColor={"#8764FF"}
                      borderWidth={2}
                    />
                    <VStack
                      alignItems={"start"}
                      spacing={-2}
                      fontSize={"lg"}
                      fontWeight={700}
                    >
                      <Text>
                        {/* {connectedCompanies[0].name} */}
                        Name
                      </Text>
                      <Text>32 Shares</Text>
                    </VStack>
                    <Spacer />
                    <Spacer />
                    <Button bg={"transparent"}>
                      <ArrowForwardIcon color={"#8764FF"} boxSize={10} />
                    </Button>
                  </HStack>
                </Box>
                <Box
                  border={"solid"}
                  borderRadius={10}
                  p={3}
                  borderColor={"#8764FF"}
                >
                  <HStack>
                    <Avatar
                      // src={connectedCompanies[1].logo}

                      mr={2}
                      borderColor={"#8764FF"}
                      borderWidth={2}
                    />
                    <VStack
                      alignItems={"start"}
                      spacing={-2}
                      fontSize={"lg"}
                      fontWeight={700}
                    >
                      <Text>{/* {connectedCompanies[1].name} */}</Text>
                      <Text>32 Shares</Text>
                    </VStack>
                    <Spacer />
                    <Spacer />
                    <Button bg={"transparent"}>
                      <ArrowForwardIcon color={"#8764FF"} boxSize={10} />
                    </Button>
                  </HStack>
                </Box>
                <Box
                  border={"solid"}
                  borderRadius={10}
                  p={3}
                  borderColor={"#8764FF"}
                >
                  <HStack>
                    <Avatar
                      // src={connectedCompanies[2].logo}

                      mr={2}
                      borderColor={"#8764FF"}
                      borderWidth={2}
                    />
                    <VStack
                      alignItems={"start"}
                      spacing={-2}
                      fontSize={"lg"}
                      fontWeight={700}
                    >
                      <Text>{/* {connectedCompanies[2].name} */}</Text>
                      <Text>32 Shares</Text>
                    </VStack>
                    <Spacer />
                    <Spacer />
                    <Button bg={"transparent"}>
                      <ArrowForwardIcon color={"#8764FF"} boxSize={10} />
                    </Button>
                  </HStack>
                </Box>
                <Box
                  border={"solid"}
                  borderRadius={10}
                  p={3}
                  borderColor={"#8764FF"}
                >
                  <HStack>
                    <Avatar
                      // src={connectedCompanies[3].logo}
                      mr={2}
                      borderColor={"#8764FF"}
                      borderWidth={2}
                    />
                    <VStack
                      alignItems={"start"}
                      spacing={-2}
                      fontSize={"lg"}
                      fontWeight={700}
                    >
                      <Text>{/* {connectedCompanies[3].name} */}</Text>
                      <Text>32 Shares</Text>
                    </VStack>
                    <Spacer />
                    <Spacer />
                    <Button bg={"transparent"}>
                      <ArrowForwardIcon color={"#8764FF"} boxSize={10} />
                    </Button>
                  </HStack>
                </Box>
              </Grid>
            </Box>

            <Box
              w={"700px"}
              h={"190px"}
              border={"solid"}
              borderRadius={10}
              borderColor={"#8764FF"}
              p={5}
            >
              <Heading mb={4}>My Company</Heading>
              <HStack spacing={5}>
                <Box
                  border={"solid"}
                  borderRadius={10}
                  p={3}
                  borderColor={"#8764FF"}
                >
                  <HStack>
                    <Avatar
                      // src={connectedCompanies[4].logo}
                      mr={2}
                      borderColor={"#8764FF"}
                      borderWidth={2}
                    />
                    <VStack
                      alignItems={"start"}
                      spacing={-2}
                      fontSize={"lg"}
                      fontWeight={700}
                    >
                      <Text>{/* {connectedCompanies[4].name} */}</Text>
                      <Text>72 Investors</Text>
                    </VStack>
                    <Spacer />
                    <Spacer />
                    <Spacer />
                    <Spacer />
                    <Spacer />

                    <Button bg={"transparent"}>
                      <ArrowForwardIcon color={"#8764FF"} boxSize={10} />
                    </Button>
                  </HStack>
                </Box>

                <Box
                  border={"solid"}
                  borderRadius={10}
                  p={3}
                  borderColor={"#8764FF"}
                >
                  <HStack>
                    <Avatar
                      // src={connectedCompanies[0].logo}
                      mr={2}
                      borderColor={"#8764FF"}
                      borderWidth={2}
                    />
                    <VStack
                      alignItems={"start"}
                      spacing={-2}
                      fontSize={"lg"}
                      fontWeight={700}
                    >
                      <Text>{/* {connectedCompanies[0].name} */}</Text>
                      <Text>72 Investors</Text>
                    </VStack>
                    <Spacer />
                    <Spacer />
                    <Spacer />
                    <Spacer />
                    <Spacer />

                    <Button bg={"transparent"}>
                      <ArrowForwardIcon color={"#8764FF"} boxSize={10} />
                    </Button>
                  </HStack>
                </Box>
              </HStack>
            </Box>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
};

export default ProfilePage;
