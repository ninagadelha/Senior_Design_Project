"use client";
import { Box, Heading, Text, Image, Container, VStack, Button, List, Link } from "@chakra-ui/react";
import React from "react";
import colors from "../../../public/colors";

const AboutPageSection = () => {
    return (
        <Box py={10} bg={colors.white} minH="calc(100vh - 128px)" display={"flex"} suppressHydrationWarning>
            <Container maxW="container.xl" justifyItems={"start"}>
                <VStack gap={8} align="start" w="100%">
                    {/* Centered Heading */}
                    <Heading
                        as="h1"
                        size="2xl"
                        color={colors.primary_blue}
                        textAlign="center"
                        w="100%"
                    >
                        About MySTEMGrowth
                    </Heading>

                    {/* Text Content (Left-Aligned, Full Width) */}
                    <VStack gap={4} align="start" w="100%" px={{ base: 4, md: 0 }}>
                        <Text fontSize="lg" lineHeight="tall" color={colors.black}>
                            The MySTEMGrowth Profile project is led by Dr. Saba Ali and her research
                            group at the University of Iowa. The purpose of the project is to provide
                            undergraduate students with a tool to translate survey measures into individualized
                            reports on their learning experiences and professional development related to STEM and
                            research. The individualized reports are visual profiles to be used by students when
                            participating in a STEM program. The survey results may also be used by educators and
                            administrators to inform programming decisions.
                        </Text>
                        <Text fontSize="lg" lineHeight="tall" color={colors.black}>
                            The MySTEMGrowth web-based tool has been developed by senior design teams at Iowa State University:
                        </Text>
                        <List.Root>
                            <List.Item>
                                <Link href="https://sdmay24-35.sd.ece.iastate.edu">
                                    https://sdmay24-35.sd.ece.iastate.edu
                                </Link>
                            </List.Item>
                            <List.Item>
                                <Link href="https://sdmay25-24.sd.ece.iastate.edu">
                                    https://sdmay25-24.sd.ece.iastate.edu
                                </Link>
                            </List.Item>
                        </List.Root>
                        <Text fontSize="lg" lineHeight="tall" color={colors.black}>
                            This material is based upon work supported by the National Science
                            Foundation under Award No. 2207350. Any opinions, findings, and conclusions
                            or recommendations expressed in this material are those of the authors and
                            do not necessarily reflect the views of the National Science Foundation.
                        </Text>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default AboutPageSection;
