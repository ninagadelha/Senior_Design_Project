"use client"
import {
    Box,
    Heading,
    Button,
    Text,
    Image,
    VStack,
    Input,
    Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import colors from "../../../public/colors";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/constants/config";
import Navbar from "@/components/util/navbar";
import Footer from "@/components/util/footer";

type Program = {
    program_id: number;
    name: string;
    owner_userid: number;
    code: string;
    student_count: number;
};

const PCCreateProgram = () => {
    const router = useRouter();
    const { user, setSelectedProgram } = useAuth();
    const [programName, setProgramName] = useState("");
    const [programCode, setProgramCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch(API_ENDPOINTS.newProgram, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    owner_userid: parseInt(user.id),
                    program_name: programName,
                    code: programCode
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create program');
            }

            const newProgram: Program = await response.json();

            setSelectedProgram(
                newProgram.program_id.toString(),
                newProgram.name,
                {
                    surveys: "1",
                    students: newProgram.student_count.toString(),
                    resources: "0"
                }
            );

            router.push('/pc-home');
        } catch (error) {
            console.error('Error creating program:', error);
            setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const containerProps = {
        maxW: "xl",
        mx: "auto",
        p: 6,
        gap: 6,
        align: "center",
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            minH="100vh"
        >
            <Navbar />
            <Box
                background={colors.white}
                flex="1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                py={6}
            >
                <VStack {...containerProps} flex="1" as="form" onSubmit={handleSubmit}>
                    <Heading as="h1" size="2xl" color={colors.primary_blue} textAlign="center">
                        Create New Program
                    </Heading>

                    <VStack width="100%" maxWidth="400px" gap={4}>
                        <Text width="100%" textAlign="left" fontSize="md" color={colors.black}>
                            Program Name
                        </Text>
                        <Input
                            value={programName}
                            onChange={(e) => setProgramName(e.target.value)}
                            placeholder="Enter program name"
                            required
                            color={colors.black}
                            bg={colors.white}
                        />

                        <Text width="100%" textAlign="left" fontSize="md" color={colors.black}>
                            Program Code
                        </Text>
                        <Input
                            value={programCode}
                            onChange={(e) => setProgramCode(e.target.value)}
                            placeholder="Enter unique program code"
                            required
                            color={colors.black}
                            bg={colors.white}
                        />

                        <Button
                            type="submit"
                            size="lg"
                            loading={isLoading}
                            loadingText="Creating..."
                            bg={colors.black}
                            color={colors.white}
                            _hover={{ bg: colors.dark_grey }}
                            width="100%"
                        >
                            Create Program
                        </Button>

                        {errorMessage && (
                            <Text color="red.500" textAlign="center">
                                {errorMessage}
                            </Text>
                        )}
                    </VStack>

                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                        color={colors.black}
                        _hover={{ bg: colors.light_grey }}
                        width="100%"
                        maxWidth="400px"
                    >
                        Cancel
                    </Button>

                    <Box mt={8}>
                        <Image
                            src="/images/program-creation.svg"
                            alt="Program creation illustration"
                            maxH="300px"
                        />
                    </Box>
                </VStack>
            </Box>
            <Footer />
        </Box>
    );
};

export default PCCreateProgram;