import React from 'react'
import { Box, HStack, VStack } from '@chakra-ui/react';
import colors from '../../public/colors';
import DashboardCard from './dashboards/dashboard-box';
import { IoBarChartSharp } from 'react-icons/io5';


function StudentDashboard(){
    return(
        <Box className="dashboard-background" background={colors.white}>
            <HStack>
                <VStack>
                <DashboardCard
                    icon={IoBarChartSharp}
                    dashboardCardHeader="Results"
                    dashboardCardText="View Survey Results"
                    dashboardButton={{ text: "Go To Results", link: "/view-results" }}
                />

                <DashboardCard
                    icon={IoBarChartSharp}
                    dashboardCardHeader="Survey"
                    dashboardCardText="Take Survey"
                    dashboardButton={{ text: "Take Survey", link: "/student-survey" }}
                />
                </VStack>

                <VStack>
                    
                </VStack>
            </HStack>
        </Box>
        );
}

export default StudentDashboard;