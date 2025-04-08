import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "@/components/util/navbar";
import Footer from "@/components/util/footer";
import AboutPageSection from "@/components/util/about-section";

const AboutPage = () => {

    return (
        <Box>
            <Navbar />
            <AboutPageSection />
            <Footer />
        </Box>
            
    );
};

export default AboutPage;