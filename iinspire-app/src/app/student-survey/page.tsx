'use client';
import Navbar from "@/components/util/navbar";
import Footer from "@/components/util/footer";
import TheSurvey from "@/components/TheSurvey";
import { Box, Flex } from "@chakra-ui/react";

const StudentSurvey = () => {
    return (
        <Flex direction="column" minH="100vh" bg="white" color="black" suppressHydrationWarning>
            <Navbar />
            <Box flex="1">
                <TheSurvey />
            </Box>
            <Footer />
        </Flex>
    );
};


export default StudentSurvey;