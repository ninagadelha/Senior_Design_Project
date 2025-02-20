import React from 'react'
import "../../..//public/styles/navbar.css"
import { Box, Image } from '@chakra-ui/react';

//add a new navbar with more links for after the user logs in

function Footer(){
    return(
        <Box className='navbar'>
            <Image className='logo' 
            src="/images/custom/IINSPIRE_logo_transparent_light.png"
            alt='logo'
            h='7vh'
            fit="contain"></Image>
        </Box>    
        );
}

export default Footer