import React from 'react'
import { HStack, VStack, Text, Flex } from '@chakra-ui/react';
import colors from '../../public/colors';
import DashboardCard from './dashboards/dashboard-route-card';
import { IoBarChartSharp } from 'react-icons/io5';
import { RiSurveyFill } from "react-icons/ri";
import DashboardInfoCard from './dashboards/dashboard-info-card';
import fonts from '../../public/fonts';

function StudentDashboard(){
    return(
        <Flex className="dashboard-background" background={colors.white}>
            {/* creates 2 columns on dashboard */}
            <HStack 
                gap="5rem"
                padding="3rem"
                justifyContent="center"
            >

                {/* Column 1: VStack of Dashboard Cards containing links to other routs like /take-survey */}
                <VStack
                    gap="2rem"
                    display={'flex'}
                >
                <DashboardCard
                    icon={IoBarChartSharp}
                    dashboardCardHeader="Results"
                    dashboardCardText="View Survey Results"
                    dashboardButton={{ text: "View Results", link: "/view-results" }}
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
                    color={colors.black}
                    gap="1rem"
                >
                    <Flex>
                        <VStack>
                            <Text
                                fontWeight={fonts.bold_weight}
                                fontSize={fonts.large_font_size}
                            >
                                Resources
                            </Text>
                            <Text
                                fontWeight={fonts.default_weight}
                                fontSize={fonts.default_font_size}
                            >
                                Resources to help improve your STEM journey.
                            </Text>
                        </VStack>
                        

                    </Flex>
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
                        dashboardInfoCardText={'Explore the hundreds of STEM-related clubs/organizations at Iowa State University.'} 
                        dashboardInfoCardButton={{
                            text: 'View',
                            link: 'https://studentengagement.iastate.edu/student-organizations'}}
                    />

                    <DashboardInfoCard 
                        imageSrc={'/images/custom/ISU_events_stock_photo.jpg'} 
                        dashboardInfoCardHeader={'Events'} 
                        dashboardInfoCardText={'Connect with STEM professionals from across the world at various events around campus.'} 
                        dashboardInfoCardButton={{
                            text: 'View',
                            link: 'https://www.career.iastate.edu/career-fairs/'}}
                    />

                    <DashboardInfoCard 
                        imageSrc={'/images/custom/mental_health_stock_photo.jpg'} 
                        dashboardInfoCardHeader={'Mental Health'} 
                        dashboardInfoCardText={'Utilize Iowa State\'s extensive mental health resources like counseling, wellness coaches, and Crisis Care.'} 
                        dashboardInfoCardButton={{
                            text: 'View',
                            link: 'https://cyclonehealth.iastate.edu/mental-health'}}
                    />
                </VStack>
            </HStack>
        </Flex>
        );
}

export default StudentDashboard;