"use client";
import { useState } from "react";
import { Box, Input, Button, Text, Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import colors from "../../../public/colors";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { API_ENDPOINTS } from "@/constants/config";

const CreateAccountBox = () => {
  const [email, setEmail] = useState("");
  const [netid, setNetid] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [credits, setCredits] = useState("");
  const [stemInterests, setStemInterests] = useState("");
  const [institution, setInstitution] = useState("");
  const [code, setCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleCreateAccount = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.createAccount, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          netid,
          age,
          gender,
          ethnicity,
          credits,
          stem_interests: stemInterests,
          institution,
          code,
        }),
      });

      const data = await response.json();
      console.log("Create Account API status:", response.status);
      if (response.ok) {
        setSuccessMessage("Account created successfully!");
        setTimeout(() => router.push("/"), 2000);
      } else {
        setSuccessMessage("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      setSuccessMessage("An error occurred while creating the account.");
    }
  };

  return (
    <Box shadow="lg" rounded="lg" p={6} w="80" bg="gray.50" zIndex={10}>
      <Text
        fontSize="xl"
        fontWeight="semibold"
        mb={4}
        textAlign="center"
        color="gray.800"
      >
        Create Account
      </Text>

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        color="black"
        mb={3}
      />
      <Input
        placeholder="NetID"
        value={netid}
        onChange={(e) => setNetid(e.target.value)}
        color="black"
        mb={3}
      />
      <Input
        placeholder="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        color="black"
        mb={3}
      />

      <Menu>
        <MenuButton
          as={Button}
          w="100%"
          mb={3}
          textAlign="left"
          bg="white"
          border="1px solid #ccc"
          borderRadius="md"
          _hover={{ bg: "gray.100" }}
          _expanded={{ bg: "gray.100" }}
          color={gender ? "black" : "gray.500"}
        >
          {gender || "Select Gender"}
        </MenuButton>
        <MenuList
          maxW="100%"
          whiteSpace="normal"
          bg="white"
          zIndex={2}
          boxShadow="md"
          color="black"
        >
          {[
            "Woman",
            "Man",
            "Transgender",
            "Non-binary/non-conforming",
            "Prefer not to respond",
          ].map((option) => (
            <MenuItem
              key={option}
              onClick={() => setGender(option)}
              whiteSpace="normal"
              wordBreak="break-word"
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton
          as={Button}
          w="100%"
          mb={3}
          textAlign="left"
          bg="white"
          border="1px solid #ccc"
          borderRadius="md"
          _hover={{ bg: "gray.100" }}
          _expanded={{ bg: "gray.100" }}
          color={ethnicity ? "black" : "gray.500"} 
        >
          {ethnicity || "Select Race/Ethnicity"}
        </MenuButton>
        <MenuList
          maxW="100%"
          whiteSpace="normal"
          bg="white"
          zIndex={2}
          boxShadow="md"
          color="black"
        >
          {[
            "Black or African American",
            "White",
            "Hispanic/Latino(a)",
            "Asian",
            "American Indian/Alaska Native",
            "Native Hawaiian/Other Pacific Islander",
            "Two or more",
            "Prefer not to respond",
          ].map((option) => (
            <MenuItem
              key={option}
              onClick={() => setEthnicity(option)}
              whiteSpace="normal"
              wordBreak="break-word"
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Input
        placeholder="Credits"
        value={credits}
        onChange={(e) => setCredits(e.target.value)}
        mb={3}
        color="black"
      />
      <Input
        placeholder="STEM Interests"
        value={stemInterests}
        onChange={(e) => setStemInterests(e.target.value)}
        mb={3}
        color="black"
      />
      <Input
        placeholder="Institution"
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
        mb={3}
        color="black"
      />
      <Input
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        mb={4}
        color="black"
      />

      <Button
        onClick={handleCreateAccount}
        w="full"
        colorScheme="blue"
        bg={colors.secondary_blue_dark}
        color="white"
      >
        Create Account
      </Button>

      {successMessage && (
        <Text
          mt={2}
          color={
            successMessage.includes("successfully") ? "green.500" : "red.500"
          }
        >
          {successMessage}
        </Text>
      )}

      <Text fontSize="sm" color="black" mt={3}>
        Already have an account?{" "}
        <Link
          href="/"
          color="blue.500"
          _hover={{ textDecoration: "underline" }}
        >
          Login here
        </Link>
      </Text>
    </Box>
  );
};

export default CreateAccountBox;
