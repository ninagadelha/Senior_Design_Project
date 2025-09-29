"use client"
import {
    Box,
    Heading,
    Button,
    Text,
    VStack,
    Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import colors from "../../../public/colors";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/constants/config";
import Navbar from "@/components/util/navbar";
import Footer from "@/components/util/footer";

type Program = {
    program_name: string;
    owner_userid: number;
};

const PCCreateProgram = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [programName, setProgramName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        setIsLoading(true);
        setErrorMessage("");

        const newProgram: Program = {
            program_name: programName,
            owner_userid: parseInt(user.id),
        };        
        console.log(newProgram);
        
        try {
            const response = await fetch(API_ENDPOINTS.newProgram, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    owner_userid: newProgram.owner_userid,
                    program_name: newProgram.program_name,
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create program');
            }

            //const newProgram: Program = await response.json();
            console.log(response);
            

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

                    <Text color={colors.black}>
                        Enter the desired name of your new program. For example, &quot;ISU2025&quot;
                    </Text>

                    <VStack width="100%" maxWidth="400px" gap={4}>
                        <Input
                            value={programName}
                            onChange={(e) => setProgramName(e.target.value)}
                            placeholder="Program Name"
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
                        {/* <Image
                            src="/images/program-creation.svg"
                            alt="Program creation illustration"
                            maxH="300px"
                        /> */}
                    </Box>
                </VStack>
            </Box>
            <Footer />
        </Box>
    );
};

export default PCCreateProgram;