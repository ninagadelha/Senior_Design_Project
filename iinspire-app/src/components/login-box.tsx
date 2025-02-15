"use client";
import React, { useState } from "react";
import { Box, Input, Button, Text, Link } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import colors from "../../public/colors";

const LoginBox = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Check if both fields are filled
    const isFormValid = username.trim() !== "" && password.trim() !== "";

    return (
        <Box
            shadow="lg"
            rounded="lg"
            p={6}
            w="80"
            bg="gray.50"
            zIndex={10}
        >
            <Text fontSize="xl" fontWeight="semibold" mb={4} textAlign="center" color="gray.800">
                Login
            </Text>

            {/* Username Input */}
            <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                bg="white"
                color="black"
                border="1px solid"
                borderColor="gray.300"
                _placeholder={{ color: "gray.500" }}
                mb={3}
                pl={3}
            />

            {/* Password Input with Toggle */}
            <Box position="relative">
                <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    bg="white"
                    color="black"
                    border="1px solid"
                    borderColor="gray.300"
                    _placeholder={{ color: "gray.500" }}
                    pr="10"
                    pl={3}
                />
                <Box
                    as="button"
                    aria-label="Toggle Password Visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    position="absolute"
                    top="50%"
                    right="3"
                    transform="translateY(-50%)"
                    bg="transparent"
                    color={colors.navbar}
                    _hover={{ color: "gray.700" }}
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Box>
            </Box>

            {/* Login Button */}
            <Button
                mt={4}
                w="full"
                colorScheme={isFormValid ? "blue" : "gray"}
                bg={isFormValid ? colors.navbar : "gray.400"}
                _hover={isFormValid ? { bg: colors.navbar } : undefined}
                cursor={isFormValid ? "pointer" : "not-allowed"}
                color="white"
            >
                Login
            </Button>

            {/* Create Account Link */}
            <Text fontSize="sm" mt={3}>
                <Link href="/create-account" color="blue.500" _hover={{ textDecoration: "underline" }}>
                    Create an account
                </Link>
            </Text>
        </Box>
    );
};

export default LoginBox;


