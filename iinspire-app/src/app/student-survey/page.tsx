'use client';
import Navbar from "@/components/util/navbar";
import Footer from "@/components/util/footer";
import TheSurvey from "@/components/TheSurvey";
import { Box } from "@chakra-ui/react";

const StudentSurvey = () => {
    return (
        <Box bg="white" color="black">
            <Navbar />
            <TheSurvey />
            <Footer />
        </Box >
    );
};


export default StudentSurvey;