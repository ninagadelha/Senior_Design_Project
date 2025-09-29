import PCSelectProgramBox from "@/components/dashboards/PC-selectProgramScreen";
import Footer from "@/components/util/footer";
import Navbar from "@/components/util/navbar";
import { Box } from "@chakra-ui/react";
import React from "react";

const PCSelectProgram = () => {
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
                <PCSelectProgramBox />
            </Box>
            <Footer />            
        </Box>
    );
};
export default PCSelectProgram;