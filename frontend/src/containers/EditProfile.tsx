import { useEffect, useState } from "react";
import {
  getUser,
  getConnectedUsers,
  getAllCompanies,
  getConnectedCompanies,
  Company,
  User,
} from "../api";
import {
  Box,
  Input,
  FormLabel,
  Text,
  VStack,
  Select,
  Center,
  Heading,
  Textarea,
  Button,
} from "@chakra-ui/react";
import styles from "./styles/EditProfileStyle";
import Logo from "../assets/Loupt app logo 4.png";

const EditProfilePage = () => {
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
      <Box margin={"20px"}>
        <Box sx={styles.container} shadow={"md"}>
          <Center mt={2}>
            <VStack>
              <Heading>Edit User Profile</Heading>
              <Text color={"gray"} mb={"40px"}>
                Don't forget to hit update!
              </Text>
            </VStack>
          </Center>
          <Box as="form" sx={styles.formGroup}>
            <FormLabel sx={styles.label}>Phone</FormLabel>
            <Input
              type="tel"
              sx={styles.input}
              placeholder="Enter your phone number"
            />
          </Box>

          <Box as="form" sx={styles.formGroup}>
            <FormLabel sx={styles.label}>Bio</FormLabel>
            <Textarea
              sx={styles.input}
              placeholder="Tell something about yourself"
            />
          </Box>

          <Box as="form" sx={styles.formGroup}>
            <FormLabel sx={styles.label}>Company Bio</FormLabel>
            <Textarea
              sx={styles.input}
              placeholder="Tell something about your company"
            />
          </Box>

          <Box as="form" sx={styles.formGroup}>
            <FormLabel sx={styles.label}>Gender</FormLabel>
            <Select sx={styles.input}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Select>
          </Box>

          <Box as="form" sx={styles.formGroup}>
            <FormLabel sx={styles.label}>Working At</FormLabel>
            <Input type="text" sx={styles.input} placeholder="Your workplace" />
          </Box>

          <Box as="form" sx={styles.formGroup}>
            <FormLabel sx={styles.label}>Location</FormLabel>
            <Input
              type="text"
              sx={styles.input}
              placeholder="Where do you live?"
            />
          </Box>

          <Box as="form" sx={styles.formGroup}>
            <FormLabel sx={styles.label}>Studied At</FormLabel>
            <Input
              type="text"
              sx={styles.input}
              placeholder="Your alma mater"
            />
          </Box>

          <Box as="form" sx={styles.formGroup}>
            <FormLabel sx={styles.label}>Change Image</FormLabel>
            <Input type="file" sx={styles.input} />
          </Box>

          <Box as="form" sx={styles.formGroup}>
            <FormLabel sx={styles.label}>Change Password</FormLabel>
            <Input
              type="password"
              sx={styles.input}
              placeholder="Enter new password"
            />
          </Box>

          <Box as="form" sx={styles.formGroup}>
            <FormLabel sx={styles.label}>Date of Birth</FormLabel>
            <Input type="date" sx={styles.input} />
          </Box>

          <Button bg={"brand.100"} color="white">
            Update Profile
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default EditProfilePage;
