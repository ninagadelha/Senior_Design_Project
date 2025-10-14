"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/util/navbar";
import Footer from "@/components/util/footer";
import { Flex, Box, Heading, Text, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export default function StudentManageAcc() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  function decodeJWT(token: string): any {
  try {
    const payload = token.split(".")[1]; // get the middle part
    const decoded = atob(payload); // base64 decode
    return JSON.parse(decoded); // parse JSON
  } catch (err) {
    console.error("Failed to decode token manually:", err);
    return null;
  }
}
  
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = decodeJWT(token);
    if (decoded) {
      setCurrentEmail(decoded.email);
    }
  }
}, []);

  const strongPassword = (pwd: string) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return strongPasswordRegex.test(pwd);
  };

  const handleSave = async () => {
    if (password || confirmPassword) {
      if (!password || !confirmPassword) {
        setPasswordError("Please fill out both password fields.");
        return;
      }
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match.");
        return;
      }
      if (!strongPassword(password)) {
        setPasswordError(
          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
        );
        return;
      }
    }

    setPasswordError("");

    const body: any = {};
    if (name.trim()) body.name = name.trim();
    if (email.trim()) {
      body.newEmail = email.trim();
      localStorage.setItem("email", email.trim());
    }
    if (password) body.password = password;

    if (Object.keys(body).length === 0) {
      alert("No changes to save.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Not logged in.");
        return;
      }

      const res = await fetch(`${BACKEND_URL}/api/users/UpdateStudentAccount`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update account");
      }

      const updatedUser = await res.json();
      console.log("Updated user:", updatedUser);

      alert("Account updated successfully!");
      //setName("");
      //setEmail("");
      //setPassword("");
      //setConfirmPassword("");

      localStorage.removeItem("token");
      router.push("/");

    } catch (error: any) {
      console.error(error);
      setPasswordError(error.message);
    }
  };

  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Box flex="1" p={8}>
        <Heading mb={6}>Manage Account Information</Heading>
        <Box
          display="flex"
          flexDirection="column"
          gap={4}
          maxW="400px"
          width="100%"
          alignItems="stretch"
        >
          <Input
            placeholder="Enter your new username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input placeholder="Current email" value={currentEmail} readOnly />
          <Input
            placeholder="Enter your new email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Enter your new password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm your new password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordError && (
            <Text color="red.500" fontSize="sm">
              {passwordError}
            </Text>
          )}
          <Button colorScheme="blue" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
}
