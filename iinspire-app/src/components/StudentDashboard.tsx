import React from 'react'
import { Box, HStack, VStack, Text } from '@chakra-ui/react';
import colors from '../../public/colors';
import DashboardCard from './dashboards/dashboard-route-card';
import { IoBarChartSharp } from 'react-icons/io5';
import DashboardInfoCard from './dashboards/dashboard-info-card';
import fonts from '../../public/fonts';


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
                    <Box
                        textAlign='left'
                        color={colors.black_text}
                    >
                        <Text
                            fontWeight={fonts.bold}
                        >
                            Resources
                        </Text>
                        <Text
                            fontWeight={fonts.default}
                        >
                            Resources to help improve your STEM journey.
                        </Text>

                    </Box>
                    <DashboardInfoCard 
                        imageSrc={'/images/custom/tutoring_stock_photo.jpg'} 
                        dashboardInfoCardHeader={'Tutoring/SI'} 
                        dashboardInfoCardText={'Links for ISU tutoring services and Supplemental Instruction (SI) for various STEM cources.'} 
                        dashboardInfoCardButton={{
                            text: 'View',
                            link: 'https://asc.dso.iastate.edu/tutoring'}}
                    />
                </VStack>
            </HStack>
        </Box>
        );
}

export default StudentDashboard;