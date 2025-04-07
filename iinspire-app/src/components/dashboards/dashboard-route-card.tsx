import React from 'react';
import { Box, Button, CardRoot, Icon, Text } from '@chakra-ui/react';
import '../../../public/styles/dashboard.css';
import colors from '../../../public/colors';

interface DashboardBoxProps {
  icon: React.ElementType;
  dashboardCardHeader: string;
  dashboardCardValue: string;
  dashboardButton: {
    text: string;
    link: string;
  };
}

const DashboardCard: React.FC<DashboardBoxProps> = ({
  icon: IconComponent,
  dashboardCardHeader,
  dashboardCardValue,
  dashboardButton
}) => {
  return (
    <CardRoot 
      w="300px" // Fixed width for consistency
      minH="225px" // Minimum height to prevent shrinking
      border="2px solid #D9D9D9"
      borderRadius="lg"
      p={7}
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

      <Box>
        <Text fontSize="lg" fontWeight="bold">{dashboardCardValue}</Text>
      </Box>

      <Box >
        <Text fontSize="lg">{dashboardCardHeader}</Text>
      </Box>

        <Button 
            asChild
            className='dashboard-box-button'
            bg="black"
            color="white"
            _hover={{ bg: "gray.800" }}
            borderRadius="md"
            px={3}
            py={2}
        >
            <a href={dashboardButton.link}>{dashboardButton.text}</a>
        </Button>
    </CardRoot>
  );
};

export default DashboardCard;