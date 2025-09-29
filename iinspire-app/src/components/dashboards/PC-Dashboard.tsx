"use client"
import React from 'react';
import { Box, Button, Flex, Heading, useBreakpointValue, VStack } from '@chakra-ui/react';
import DashboardRouteCard from './dashboard-route-card';
import { IoBarChartSharp } from 'react-icons/io5';
import { HiUsers } from "react-icons/hi";
import { CgNotes } from "react-icons/cg";
import { GrResources } from "react-icons/gr";
import { useAuth } from '@/context/auth-context';
import colors from '../../../public/colors';
import { useRouter } from "next/navigation";

const PCDashboard = () => {
  const { isAuthenticated, selectedProgram } = useAuth();
  const router = useRouter();

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

  const cardSpacing = 20;
  const cardMinWidth = '280px'; // Minimum width before wrapping

  const topRowCards = [
    {
      icon: CgNotes,
      value: selectedProgram?.counts?.programs || "1",
      description: "View, create, or delete programs",
      button: { text: "Programs", link: "/pc-programs-home" },
      borderColor: colors.border_teal
    },
    {
      icon: HiUsers,
      value: selectedProgram?.counts?.students || "0",
      description: `View students in "${selectedProgram?.name || 'your program'}"`,
      button: { text: "Students", link: "/pc-view-students" },
      borderColor: colors.border_red
    },
    {
      icon: GrResources,
      value: selectedProgram?.counts?.resources || "0",
      description: "View, edit, or add program resources",
      button: { text: "Resources", link: "/pc-program-resources" },
      borderColor: colors.border_sky_blue
    }
  ];

const bottomRowCards = [
  {
    icon: IoBarChartSharp,
    value: "Help",
    description: "Learn more about using your Program Home Page to its fullest potential!",
    button: { text: "Learn More", link: "/pc-help-page" },
    borderColor: colors.border_purple
  }
];

  if (!isAuthenticated) {
    return (
      <div>Please login to view this content</div>
    );
  }

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
      <VStack 
        width="100%"
        maxWidth={responsiveConfig?.maxWidth}
        mb={6}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >

        {/* Heading */}
        <Heading 
          as="h1" 
          size="2xl" 
          color="black"
          fontWeight="bold"
          textAlign="center"
          flex="1"
          px={4}
        >
          Viewing Program: {selectedProgram.name}
        </Heading>
          <Button 
            colorScheme="blue" 
            size="md" 
            px={8}
            mt={2}
            fontWeight="semibold"
            boxShadow="sm"
            _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg"
            }}
            transition="all 0.2s"
            onClick={() => {router.push("/pc-select-program")}}
          >
          Change Selected Program
        </Button>
      </VStack>

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
            <DashboardRouteCard
              icon={card.icon}
              value={card.value}
              description={card.description}
              button={card.button}
              borderColor={card.borderColor}
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
            <DashboardRouteCard
              icon={card.icon}
              value={card.value}
              description={card.description}
              button={card.button}
              borderColor={card.borderColor}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default PCDashboard;