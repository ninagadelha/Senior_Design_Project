import React from 'react';
import { Box, Button, CardRoot, Icon, Text } from '@chakra-ui/react';
import '../../../public/styles/dashboard.css';
import colors from '../../../public/colors';

interface DashboardBoxProps {
  icon: React.ElementType;
  dashboardCardHeader: string;
  dashboardCardText: string;
  dashboardButton: {
    text: string;
    link: string;
  };
}

const DashboardCard: React.FC<DashboardBoxProps> = ({
  icon: IconComponent,
  dashboardCardHeader,
  dashboardCardText,
  dashboardButton
}) => {
  return (
    <CardRoot 
    w="250px" // Fixed width for consistency
    minH="200px" // Minimum height to prevent shrinking
    border="2px solid #D9D9D9"
    borderRadius="lg"
    p={6}
    textAlign="center"
    alignItems="center"
    overflow="hidden" 
    className="dashboard-box-card" 
    variant="outline"
    background={colors.white}
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    >
      <Box>
        <Icon boxSize={8} color="black">
          <IconComponent />
        </Icon>
      </Box>

      <Box mt={3}>
        <Text fontSize="lg" fontWeight="bold">{dashboardCardHeader}</Text>
        <Text fontSize="sm" color="gray.600" mt={2}>{dashboardCardText}</Text>
      </Box>

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
            <a href={dashboardButton.link}>{dashboardButton.text}</a>
        </Button>
    </CardRoot>
  );
};

export default DashboardCard;