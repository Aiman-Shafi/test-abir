import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  useTheme,
  Button,
  useMediaQuery,
  HStack,
  Img,
  Heading,
  Avatar,
} from "@chakra-ui/react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";
import {
  getUser,
  getConnectedUsers,
  getAllCompanies,
  getConnectedCompanies,
  Company,
  User,
} from "../api";
import image from "../assets/image 2.png";
import heroBg from "../assets/bg-hero.png";
import heroMan from "../assets/hero-man-img.png";
import styles from "./styles/HomeStyles";
const AboutUsPage = () => {
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
      <VStack spacing={10} maxW={"1280px"} margin={"auto"}>
        {/* {Hero Section} */}
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

        <Box
          h={300}
          w={"100%"}
          border={"solid"}
          borderRadius={10}
          bg={
            "radial-gradient(161.62% 80.25% at 50.00% 58.31%, rgba(112, 70, 255, 0.25) 0%, rgba(217, 217, 217, 0.00) 100%)"
          }
          borderColor={mainPurple}
        >
          <VStack align="center" justify="center" height="100%">
            <HStack spacing={20} wrap={"wrap"}>
              <VStack>
                <Text color={mainPurple} fontSize={80} fontWeight={800}>
                  2.5M+
                </Text>
                <Text fontSize={30} fontWeight={700} mt={-7}>
                  Community Members
                </Text>
              </VStack>
              <VStack>
                <Text color={mainPurple} fontSize={80} fontWeight={800}>
                  $2.5B
                </Text>
                <Text fontSize={30} fontWeight={700} mt={-7}>
                  Funds Deployed
                </Text>
              </VStack>
              <VStack>
                <Text color={mainPurple} fontSize={80} fontWeight={800}>
                  3000+
                </Text>
                <Text fontSize={30} fontWeight={700} mt={-7}>
                  Funded Ventures
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>

        <Box
          h={1180}
          w={"100%"}
          border={"solid"}
          borderRadius={5}
          borderColor={mainPurple}
        >
          <Heading pl={10} pt={8} textAlign="center" fontSize={"48px"}>
            Our Mission
          </Heading>
          <HStack pl={"20"} pt={5} pr={10} spacing={10} align={"start"}>
            <Text color={mainPurple} fontSize={60} fontWeight={700} pt={-5}>
              1
            </Text>
            <VStack align={"start"}>
              <Text fontWeight={700} fontSize={28}>
                Democratizing Finance:
              </Text>
              <Text fontSize={20}>
                Our aim to democratize access to funding by empowering
                individuals and organizations to seek financial support from a
                diverse pool of backers. It breaks away from traditional
                financing methods and allows anyone with a compelling idea to
                attract backers, irrespective of their background or
                connections.
              </Text>
            </VStack>
          </HStack>
          <HStack pl={"20"} pt={5} pr={10} spacing={8} align={"start"}>
            <Text color={mainPurple} fontSize={60} fontWeight={700} pt={-5}>
              2
            </Text>
            <VStack align={"start"}>
              <Text fontWeight={700} fontSize={28}>
                Supporting Innovation and Creativity:
              </Text>
              <Text fontSize={20}>
                Our platform foster innovation and creativity by enabling
                entrepreneurs, artists, inventors, and other innovators to bring
                their ideas to life. Projects that may struggle to secure
                funding through conventional channels have the opportunity to
                thrive through crowdfunding.
              </Text>
            </VStack>
          </HStack>
          <HStack pl={"20"} pt={5} pr={10} spacing={8} align={"start"}>
            <Text color={mainPurple} fontSize={60} fontWeight={700} pt={-5}>
              3
            </Text>
            <VStack align={"start"}>
              <Text fontWeight={700} fontSize={28}>
                Community Building:
              </Text>
              <Text fontSize={20}>
                We create a sense of community among backers and project
                creators. Backers become emotionally invested in the success of
                projects they support, forging a deeper connection with the
                creators.
              </Text>
            </VStack>
          </HStack>
          <HStack pl={"20"} pt={5} pr={10} spacing={8} align={"start"}>
            <Text color={mainPurple} fontSize={60} fontWeight={700} pt={-5}>
              4
            </Text>
            <VStack align={"start"}>
              <Text fontWeight={700} fontSize={28}>
                Showcasing Diverse Projects:
              </Text>
              <Text fontSize={20}>
                We support a wide range of projects, spanning various industries
                and sectors. From technological innovations and social causes to
                creative works and charitable initiatives, these platforms
                showcase the diversity of ideas and ventures in need of
                financial backing.
              </Text>
            </VStack>
          </HStack>
          <HStack pl={"20"} pt={5} pr={10} spacing={10} align={"start"}>
            <Text color={mainPurple} fontSize={60} fontWeight={700} pt={-5}>
              5
            </Text>
            <VStack align={"start"}>
              <Text fontWeight={700} fontSize={28}>
                Encouraging Risk-taking:
              </Text>
              <Text fontSize={20}>
                By enabling individuals to contribute smaller amounts,
                crowdfunding encourages risk-taking in a controlled manner.
                Backers can support projects they believe in without committing
                large sums, while project creators can pursue ventures that
                might have been too risky under traditional financing.
              </Text>
            </VStack>
          </HStack>
          <HStack pl={"20"} pt={5} pr={10} spacing={10} align={"start"}>
            <Text color={mainPurple} fontSize={60} fontWeight={700} pt={-5}>
              6
            </Text>
            <VStack align={"start"}>
              <Text fontWeight={700} fontSize={28}>
                Transparent and Accountable Funding:
              </Text>
              <Text fontSize={20}>
                We often enforce transparency and accountability, ensuring that
                project creators communicate openly about their progress and use
                of funds. This transparency builds trust between creators and
                backers.
              </Text>
            </VStack>
          </HStack>
          <HStack pl={"20"} pt={5} pr={10} spacing={10} align={"start"}>
            <Text color={mainPurple} fontSize={60} fontWeight={700} pt={-5}>
              7
            </Text>
            <VStack align={"start"}>
              <Text fontWeight={700} fontSize={28}>
                Engaging Marketing Tool:
              </Text>
              <Text fontSize={20}>
                We serve as effective marketing tools for projects.We create
                buzz around the project, generate publicity, and attract media
                attention, all of which contribute to the project's success.
              </Text>
            </VStack>
          </HStack>
        </Box>
        <Box
          h={600}
          w={"100%"}
          border={"solid"}
          borderRadius={5}
          borderColor={mainPurple}
          bg={
            "radial-gradient(161.62% 80.25% at 50.00% 58.31%, rgba(112, 70, 255, 0.25) 0%, rgba(217, 217, 217, 0.00) 100%)"
          }
        >
          <Heading pl={10} pt={7}>
            Meet Our Team
          </Heading>
          <VStack>
            <HStack p={10} spacing={10}>
              <Box
                border={"solid"}
                borderRadius={5}
                borderColor={mainPurple}
                w={250}
                h={450}
                bg={"white"}
              >
                <VStack p={5} spacing={3}>
                  <Avatar
                    size={"2xl"}
                    src={image}
                    border={"solid"}
                    color={mainPurple}
                  ></Avatar>
                  <Text fontSize={"2xl"} fontWeight={700}>
                    Name Name
                  </Text>
                  <Text>
                    Lorem ipsum dolor sit aLorem ipsum dolor sit amet,
                    consectetur sit amet, adipiscing elit. Nunc vitae commodo
                    sit amet, augue.Lorem ipsum
                  </Text>
                  <Text fontSize={"xl"} fontWeight={700}>
                    Creative Leader
                  </Text>
                  <HStack>
                    <FaInstagram color={mainPurple} />
                    <FaTwitter color={mainPurple} />
                    <FaFacebook color={mainPurple} />
                    <FaLinkedin color={mainPurple} />
                  </HStack>
                </VStack>
              </Box>
              <Box
                border={"solid"}
                borderRadius={5}
                borderColor={mainPurple}
                w={250}
                h={450}
                bg={"white"}
              >
                <VStack p={5} spacing={3}>
                  <Avatar
                    size={"2xl"}
                    src={image}
                    border={"solid"}
                    color={mainPurple}
                  ></Avatar>
                  <Text fontSize={"2xl"} fontWeight={700}>
                    Name Name
                  </Text>
                  <Text>
                    Lorem ipsum dolor sit aLorem ipsum dolor sit amet,
                    consectetur sit amet, adipiscing elit. Nunc vitae commodo
                    sit amet, augue.Lorem ipsum
                  </Text>
                  <Text fontSize={"xl"} fontWeight={700}>
                    Creative Leader
                  </Text>
                  <HStack>
                    <FaInstagram color={mainPurple} />
                    <FaTwitter color={mainPurple} />
                    <FaFacebook color={mainPurple} />
                    <FaLinkedin color={mainPurple} />
                  </HStack>
                </VStack>
              </Box>
              <Box
                border={"solid"}
                borderRadius={5}
                borderColor={mainPurple}
                w={250}
                h={450}
                bg={"white"}
              >
                <VStack p={5} spacing={3}>
                  <Avatar
                    size={"2xl"}
                    src={image}
                    border={"solid"}
                    color={mainPurple}
                  ></Avatar>
                  <Text fontSize={"2xl"} fontWeight={700}>
                    Name Name
                  </Text>
                  <Text>
                    Lorem ipsum dolor sit aLorem ipsum dolor sit amet,
                    consectetur sit amet, adipiscing elit. Nunc vitae commodo
                    sit amet, augue.Lorem ipsum
                  </Text>
                  <Text fontSize={"xl"} fontWeight={700}>
                    Creative Leader
                  </Text>
                  <HStack>
                    <FaInstagram color={mainPurple} />
                    <FaTwitter color={mainPurple} />
                    <FaFacebook color={mainPurple} />
                    <FaLinkedin color={mainPurple} />
                  </HStack>
                </VStack>
              </Box>
              <Box
                border={"solid"}
                borderRadius={5}
                borderColor={mainPurple}
                w={250}
                h={450}
                bg={"white"}
              >
                <VStack p={5} spacing={3}>
                  <Avatar
                    size={"2xl"}
                    src={image}
                    border={"solid"}
                    color={mainPurple}
                  ></Avatar>
                  <Text fontSize={"2xl"} fontWeight={700}>
                    Name Name
                  </Text>
                  <Text>
                    Lorem ipsum dolor sit aLorem ipsum dolor sit amet,
                    consectetur sit amet, adipiscing elit. Nunc vitae commodo
                    sit amet, augue.Lorem ipsum
                  </Text>
                  <Text fontSize={"xl"} fontWeight={700}>
                    Creative Leader
                  </Text>
                  <HStack>
                    <FaInstagram color={mainPurple} />
                    <FaTwitter color={mainPurple} />
                    <FaFacebook color={mainPurple} />
                    <FaLinkedin color={mainPurple} />
                  </HStack>
                </VStack>
              </Box>
            </HStack>
          </VStack>
        </Box>
        <Box
          h={220}
          w={"100%"}
          border={"solid"}
          borderRadius={5}
          borderColor={mainPurple}
        >
          <VStack align={"start"} px={10} pt={5} spacing={7}>
            <Heading> How It All Started </Heading>
            <Text>
              {" "}
              Loupt was born out of a shared passion for innovation and a desire
              to bridge the gap between great ideas and the resources needed to
              make them happen. Our founders realized that traditional funding
              avenues often limit the potential of promising projects, leaving
              them overlooked and undiscovered. Inspired by the success stories
              of crowdfunding campaigns, they set out to create a platform that
              would democratize fundraising and support the dreams of
              visionaries worldwide.
            </Text>
          </VStack>
        </Box>
        <Box
          h={420}
          w={"100%"}
          border={"solid"}
          borderRadius={5}
          borderColor={mainPurple}
        >
          <Heading pl={10} pt={5} mb={5}>
            What Sets Us Apart
          </Heading>
          <HStack px={10} spacing={5} my={5}>
            <FaArrowRight size={40} color={mainPurple} />
            <VStack align={"start"}>
              <Text fontSize={20} fontWeight={700} pt={-5}>
                Community-Centric Approach:
              </Text>
              <Text fontSize={15}>
                We prioritize building a strong and supportive community of
                backers, creators, and changemakers. By fostering an environment
                of collaboration and shared interests, we encourage a culture of
                mutual empowerment and continuous growth.
              </Text>
            </VStack>
          </HStack>
          <HStack px={10} spacing={5} my={5}>
            <FaArrowRight size={40} color={mainPurple} />
            <VStack align={"start"}>
              <Text fontSize={20} fontWeight={700} pt={-5}>
                Diverse Range of Projects:
              </Text>
              <Text fontSize={15}>
                From art and technology to education and humanitarian
                initiatives, our platform welcomes a wide spectrum of projects.
                We believe that every idea, no matter how big or small, deserves
                a chance to be heard and funded.
              </Text>
            </VStack>
          </HStack>
          <HStack px={10} spacing={5} my={5}>
            <FaArrowRight size={40} color={mainPurple} />
            <VStack align={"start"}>
              <Text fontSize={20} fontWeight={700} pt={-5}>
                Transparent and Secure:
              </Text>
              <Text fontSize={15}>
                Trust is at the core of our platform. We maintain the highest
                level of transparency throughout the crowdfunding process, and
                our secure payment system ensures that every contribution is
                handled with utmost care and confidentiality.
              </Text>
            </VStack>
          </HStack>
        </Box>

        <Box w={"100%"}>
          <Heading>Testimonials</Heading>
        </Box>
        <Box
          h={440}
          w={"100%"}
          mb={10}
          bg={
            "radial-gradient(161.62% 80.25% at 50.00% 58.31%, rgba(112, 70, 255, 0.25) 0%, rgba(217, 217, 217, 0.00) 100%)"
          }
          border={"solid"}
          borderRadius={10}
          borderColor={mainPurple}
        >
          <VStack spacing={5} mt={10}>
            <Text fontSize={25} fontWeight={700}>
              Loupt helped raise my compay $30,000
            </Text>
            <Text px={40} fontSize={24} align={"center"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vitae commodo augue.Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nunc vitae commodo augue.Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Nunc vitae commodo augue.Lorem
              ipsum dolor sit amet, consectet
            </Text>
            <HStack spacing={10}>
              <Avatar
                size={"lg"}
                src={image}
                border={"solid"}
                color={mainPurple}
              ></Avatar>
              <Avatar
                size={"lg"}
                src={image}
                border={"solid"}
                color={mainPurple}
              ></Avatar>
              <Avatar
                size={"xl"}
                src={image}
                border={"solid"}
                color={mainPurple}
              ></Avatar>
              <Avatar
                size={"lg"}
                src={image}
                border={"solid"}
                color={mainPurple}
              ></Avatar>
              <Avatar
                size={"lg"}
                src={image}
                border={"solid"}
                color={mainPurple}
              ></Avatar>
            </HStack>
            <Text fontSize={20} fontWeight={700}>
              Tom
            </Text>
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

export default AboutUsPage;
