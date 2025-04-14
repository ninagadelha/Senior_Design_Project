import Footer from "@/components/util/footer";
import Navbar from "@/components/util/navbar";
import { Box, Link } from "@chakra-ui/react";
import React from "react";

const PCCreateProgram = () => {
    return (
        <Box
            minH="100vh"
            display="flex"   
            flexDirection="column"
        >
            <Navbar />
            <Box 
                flex="1"
                display="flex"
                flexDirection="column"
            >
                <Link href="/pc-select-program">
                    Back to Select Program Screen
                </Link>
            </Box>
            <Footer />            
        </Box>
    );
};
export default PCCreateProgram;