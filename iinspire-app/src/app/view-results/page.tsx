import React from 'react'
import "../../..//public/styles/navbar.css"
import { Box, Link } from '@chakra-ui/react';
import Navbar from '@/components/util/navbar';
import Footer from '@/components/util/footer';

//add a new navbar with more links for after the user logs in

function ViewResults(){
    return(
        <Box>
            <Navbar />
            <Box>
                Result Page!
            </Box>
            <Box>
                <Link href="/student-home" className="text-blue-500 hover:underline text-sm">
                    Back to Student Home
                </Link>
            </Box>
            <Footer />
        </Box>    
        );
}

export default ViewResults