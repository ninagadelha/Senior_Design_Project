"use client";
import React, { useState } from "react";
import { Box, Input, Button, Text, Link } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import colors from "../../../public/colors";
import { useAuth } from "@/context/auth-context";

const LoginBox = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { login } = useAuth();
    const isFormValid = username.trim() !== "" && password.trim() !== "";

    const handleLogin = async () => {
        try {
            console.log("Sending Request,April 10");
            const response = await fetch("http://backend-service.backend-namespace:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: username,
                    password: password,
                }),
            });
            console.log("Login API status:", response.status);
            console.log("Login API headers:", response.headers);
            const data = await response.json();

            if (response.ok) {
                login(data.user);

                // Normalize role to lowercase for consistent comparison
                const normalizedRole = data.user.role.toLowerCase();

                // Go to dashboard based on user role
                switch(normalizedRole) {
                    case "student":
                        router.push("/student-home");
                        break;
                    case "programcoordinator":
                        router.push("/pc-home");
                        break;
                    case "admin":
                        router.push("/admin-home");
                        break;
                    default:
                        break;
                }

                alert("Logged in successfully");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login");
        }
    };

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
                    color={colors.secondary_blue_dark}
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
                bg={isFormValid ? colors.secondary_blue_dark : "gray.400"}
                _hover={isFormValid ? { bg: colors.secondary_blue_dark } : undefined}
                cursor={isFormValid ? "pointer" : "not-allowed"}
                color="white"
                onClick={handleLogin}
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


