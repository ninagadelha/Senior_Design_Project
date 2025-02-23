import React from 'react'
import { Box, Button, CardBody, CardFooter, CardHeader, CardRoot, Icon, Text } from '@chakra-ui/react';
import { IoBarChartSharp } from "react-icons/io5";
import '../../../public/styles/dashboard.css';
import colors from '../../../public/colors';

function DashboardBox(){
    return(
        <CardRoot maxW="sm"
            border="2px solid #D9D9D9"
            borderRadius="lg"
            p={6}
            textAlign="center"
            alignItems="center"
            overflow="hidden" 
            className='dashboard-box-card' 
            variant="outline"
            background={colors.white}
        >
            <Box>
                <Icon boxSize={8} color="black" >
                    <IoBarChartSharp />
                </Icon>
            </Box>
            <CardBody>
                {/* Title */}
                <CardHeader p={0}>
                    <Text fontSize="lg" fontWeight="bold">Results</Text>
                </CardHeader>
                {/* Description */}
                <CardBody p={0} mt={2}>
                    <Text fontSize="sm" color="gray.600">View Survey Results</Text>
                </CardBody>
            </CardBody>
            {/* Button */}
            <CardFooter p={0}>
            <Button 
                asChild
                className='dashboard-box-button'
                bg="black"
                color="white"
                _hover={{ bg: "gray.800" }}
                borderRadius="md"
                px={4}
                py={2}
            >
                    <a href='/view-results'>View Results</a>
                </Button>
            </CardFooter>
        </CardRoot>
        );
}

export default DashboardBox