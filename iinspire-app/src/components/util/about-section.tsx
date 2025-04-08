"use client";
import { Box, Heading, Text, Image, Container, VStack, Button } from "@chakra-ui/react";
import React from "react";
import colors from "../../../public/colors";

const AboutPageSection = () => {
    return (
        <Box py={10} bg={colors.white} minH="calc(100vh - 128px)">
            <Container maxW="container.md" centerContent>
                <VStack gap={8} align="center" textAlign="center">
                    {/* Heading */}
                    <Heading as="h1" size="2xl" color={colors.primary_blue}>
                        About IINSPIRE LSAMP Program
                    </Heading>

                    {/* Image */}
                    <Box width="100%" maxW="600px">
                        <Image
                            src="/images/custom/group_collaboration_stock_photo.jpg"
                            alt="LSAMP students collaborating"
                            borderRadius="lg"
                            boxShadow="lg"
                            objectFit="cover"
                            width="100%"
                        />
                    </Box>

                    {/* Text Content */}
                    <VStack gap={4} align="center" px={{ base: 4, md: 0 }} maxW="60%">
                        <Text fontSize="lg" lineHeight="tall" color={colors.black}>
                            The IINSPIRE LSAMP (Louis Stokes Alliance for Minority Participation) 
                            is a program designed to support underrepresented minority students 
                            in STEM fields. Our mission is to increase the number of students 
                            from these backgrounds who earn degrees in STEM disciplines.
                        </Text>
                        <Text fontSize="lg" lineHeight="tall" color={colors.black}>
                            Through academic support, research opportunities, mentoring, 
                            and professional development, we help students succeed in their 
                            STEM education and prepare for graduate studies or STEM careers.
                        </Text>
                        <Text fontSize="lg" lineHeight="tall" color={colors.black}>
                            The IINSPIRE Alliance is a partnership of multiple institutions 
                            working together to create a more diverse STEM workforce.
                        </Text>
                    </VStack>

                    {/* Learn More Button */}
                    <Button 
                        colorScheme="blue" 
                        variant="solid" 
                        size="lg"
                        bg={colors.primary_blue}
                        color="white"
                        _hover={{ bg: colors.secondary_blue_light }}
                    >
                        Learn More
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
};

export default AboutPageSection;