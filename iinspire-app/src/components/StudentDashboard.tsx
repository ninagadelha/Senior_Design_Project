import React from 'react'
import { Box, HStack, VStack, Text } from '@chakra-ui/react';
import colors from '../../public/colors';
import DashboardCard from './dashboards/dashboard-route-card';
import { IoBarChartSharp } from 'react-icons/io5';
import { RiSurveyFill } from "react-icons/ri";
import DashboardInfoCard from './dashboards/dashboard-info-card';
import fonts from '../../public/fonts';


function StudentDashboard(){
    return(
        <Box className="dashboard-background" background={colors.white}>
            {/* creates 2 columns on dashboard */}
            <HStack 
                gap="5rem"
                padding="3rem"
            >

                {/* Column 1: VStack of Dashboard Cards containing links to other routs like /take-survey */}
                <VStack
                    gap="2rem"
                >
                <DashboardCard
                    icon={IoBarChartSharp}
                    dashboardCardHeader="Results"
                    dashboardCardText="View Survey Results"
                    dashboardButton={{ text: "Go To Results", link: "/view-results" }}
                />

                <DashboardCard
                    icon={RiSurveyFill}
                    dashboardCardHeader="Survey"
                    dashboardCardText="Take Survey"
                    dashboardButton={{ text: "Take Survey", link: "/student-survey" }}
                />
                </VStack>

                {/* Column 2: stack of Dashboard Info Cards that link to various resources on campus */}
                <VStack
                    textAlign='left'
                    color={colors.black_text}
                >
                    <Box>
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
                        dashboardInfoCardText={'Links for ISU tutoring services and Supplemental Instruction (SI) for various STEM courses.'} 
                        dashboardInfoCardButton={{
                            text: 'View',
                            link: 'https://asc.dso.iastate.edu/tutoring'}}
                    />

                    <DashboardInfoCard 
                        imageSrc={'/images/custom/clubs_stock_photo.jpg'} 
                        dashboardInfoCardHeader={'Clubs/Organizations'} 
                        dashboardInfoCardText={'Explore the hundreds of STEM-related clubs/organizations at Iowa State University'} 
                        dashboardInfoCardButton={{
                            text: 'View',
                            link: 'https://studentengagement.iastate.edu/student-organizations'}}
                    />
                </VStack>
            </HStack>
        </Box>
        );
}

export default StudentDashboard;