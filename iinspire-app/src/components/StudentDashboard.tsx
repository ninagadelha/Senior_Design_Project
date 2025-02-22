import React from 'react'
import { Box, HStack, VStack } from '@chakra-ui/react';
import colors from '../../public/colors';
import DashboardBox from './dashboards/dashboard-box';

//add a new navbar with more links for after the user logs in

function StudentDashboard(){
    return(
        <Box className="dashboard-background" background={colors.white}>
            <HStack>
                <VStack>
                    <DashboardBox />
                </VStack>

                <VStack>
                    
                </VStack>
            </HStack>
        </Box>
        );
}

export default StudentDashboard;