import React from 'react';
import { VStack, Text, Heading, Box } from '@chakra-ui/react';
import fonts from '../../../public/fonts';
import colors from '../../../public/colors';
import HeroCard from './hero-card';

function StudentDashboardNew() {
    return (
        <VStack 
            bg={colors.white}
            gap={0}
            width="100vw"
            maxWidth="100%"
            overflowX="hidden"
        >
            {/* Welcome Header Section */}
            <Box 
                width="100%"
                py={{ base: "3rem", md: "4rem" }} // Top padding remains
                pb={{ base: "0.5rem", md: "1.5rem" }} // Reduced bottom padding
                px={{ base: "1.5rem", md: "3rem" }}
                textAlign="center"
                bg={colors.white}
            >
                <VStack 
                    maxW="800px" 
                    mx="auto"
                    gap={6}
                >
                    <Heading
                        as="h1"
                        fontSize={{ base: fonts.extra_large_font_size, md: "3rem" }}
                        fontWeight={fonts.bold_weight}
                        color={colors.black}
                        lineHeight="1.2"
                    >
                        Welcome to your IINSPIRE Student Dashboard!
                    </Heading>
                    <Text
                        fontSize={{ base: fonts.default_font_size, md: fonts.default_font_size }}
                        fontWeight={fonts.default_weight}
                        color={colors.dark_grey}
                        px={{ base: 4, md: 8 }}
                    >
                        Within this dashboard, you can access surveys, view results, and find resources to support your STEM journey at Iowa State.
                    </Text>
                </VStack>
            </Box>
            
            {/* Hero Cards Section */}
            <VStack width="100%" gap={0}>
                <HeroCard
                    title="Take Survey"
                    description="Share your experiences and help improve STEM education at Iowa State University."
                    buttonText="Take Survey"
                    buttonLink="/student-survey"
                    imageSrc="/images/custom/tree_sprout.png"
                    imageAlt="Take Survey Hero Image"
                />
                <HeroCard
                    title="View Results"
                    description="See how your responses compare to others in your program and track your progress over time."
                    buttonText="View Results"
                    buttonLink="/view-results"
                    imageSrc="/images/custom/tree_sprout.png"
                    imageAlt="View Results Hero Image"
                    reverseLayout={true}
                />
                <HeroCard
                    title="View Resources"
                    description="Explore external resources like tutoring, mental health counseling, and other services"
                    buttonText="View Resources"
                    buttonLink="/student-resources"
                    imageSrc="/images/custom/tree_sprout.png"
                    imageAlt="View Resources Hero Image"
                />
            </VStack>
        </VStack>
    );
}

export default StudentDashboardNew;