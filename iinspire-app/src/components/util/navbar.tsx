import React from 'react'
import "../../..//public/styles/navbar.css"
import { Box, Image } from '@chakra-ui/react';
import Link from 'next/link';

//add a new navbar with more links for after the user logs in

function Navbar(){
    return(
        <Box className='navbar'>
            <Image className='logo' 
            src="/images/custom/IINSPIRE_logo_transparent_light.png"
            alt='logo'
            h='7vh'
            fit="contain"></Image>
            <Box className='links'>
                <Link href="/" >About</Link>
            </Box>
        </Box>    
        );
}

export default Navbar