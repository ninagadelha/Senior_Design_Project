"use client"
import React from 'react';
import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import DashboardCard from './dashboard-route-card';
import { IoBarChartSharp } from 'react-icons/io5';
import { HiUsers } from "react-icons/hi";
import { CgNotes } from "react-icons/cg";
import { GrResources } from "react-icons/gr";
import colors from '../../../public/colors';

const PCDashboard = () => {
  // Responsive configuration
  const responsiveConfig = useBreakpointValue({
    base: { 
      direction: 'column',
      justify: 'center',
      maxWidth: '100%',
      cardsPerRow: 1
    },
    sm: { 
      direction: 'row', 
      justify: 'center',
      maxWidth: '100%',
      cardsPerRow: 2
    },
    md: { 
      direction: 'row', 
      justify: 'center',
      maxWidth: '1200px',
      cardsPerRow: 3
    },
    lg: {
      direction: 'row',
      justify: 'center',
      maxWidth: '1400px',
      cardsPerRow: 3
    }
  });

  const cardSpacing = 6;
  const cardMinWidth = '280px'; // Minimum width before wrapping

  // Card data
  const topRowCards = [
    {
      icon: CgNotes,
      header: "Program",
      value: "2",
      button: { text: "View Programs", link: "/view-results" }
    },
    {
      icon: HiUsers,
      header: "Students",
      value: "21",
      button: { text: "View Students", link: "/program-students" }
    },
    {
      icon: GrResources,
      header: "Resources",
      value: "3",
      button: { text: "View Resources", link: "/program-resources" }
    }
  ];

  const bottomRowCards = [
    {
      icon: IoBarChartSharp,
      header: "Temp",
      text: "Coming Soon",
      button: { text: "Go to Settings", link: "/pc-dashboard" }
    },
  ];

  return (
    <Box 
      flex="1"
      minH="84vh" 
      p={6} 
      background={colors.white}
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
    >
      {/* Welcome Header */}
      <Box 
        width="100%"
        maxWidth={responsiveConfig?.maxWidth}
        textAlign="center"
        mb={4} // Adds space below the header
      >
        <Heading 
          as="h1" 
          size="xl" 
          color="black"
          fontWeight="bold"
        >
          Welcome!
        </Heading>
      </Box>

      {/* Top Row */}
      <Flex
        width="100%"
        maxWidth={responsiveConfig?.maxWidth}
        justify={responsiveConfig?.justify}
        gap={cardSpacing}
        mb={cardSpacing}
        flexWrap="wrap"
      >
        {topRowCards.map((card, index) => (
          <Box 
            key={`top-${index}`}
            minWidth={cardMinWidth}
            maxWidth={{ base: '100%', sm: '400px' }}
          >
            <DashboardCard
              icon={card.icon}
              dashboardCardHeader={card.header}
              dashboardCardValue={card.value}
              dashboardButton={card.button}
            />
          </Box>
        ))}
      </Flex>

      {/* Bottom Row */}
      <Flex
        width="100%"
        maxWidth={responsiveConfig?.maxWidth}
        justify={responsiveConfig?.justify}
        gap={cardSpacing}
        flexWrap="wrap"
      >
        {bottomRowCards.map((card, index) => (
          <Box 
            key={`bottom-${index}`}
            minWidth={cardMinWidth}
            maxWidth={{ base: '100%', sm: '400px' }}
          >
            <DashboardCard
              icon={card.icon}
              dashboardCardHeader={card.header}
              dashboardCardValue={card.text}
              dashboardButton={card.button}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default PCDashboard;