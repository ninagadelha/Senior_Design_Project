import React from 'react';
import { Box, Button, CardRoot, Icon, Text } from '@chakra-ui/react';
import colors from '../../../public/colors';

interface DashboardCardProps {
  icon: React.ElementType;
  value: string;
  description: string;
  button: {
    text: string;
    link: string;
  };
  borderColor?: string;
}

const DashboardRouteCard: React.FC<DashboardCardProps> = ({
  icon: IconComponent,
  value,
  description,
  button,
  borderColor = '#D9D9D9' // Default to original gray color
}) => {
  return (
    <CardRoot 
      w="300px"
      minH="225px"
      border={`2px solid ${borderColor}`}
      borderRadius="lg"
      p={7}
      textAlign="center"
      alignItems="center"
      overflow="hidden"
      variant="outline"
      background={colors.white}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* Icon Box - matches original styling */}
      <Box>
        <Icon boxSize={8} color="black">
          <IconComponent />
        </Icon>
      </Box>

      {/* Value - bold and prominent */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" color={colors.black}>
          {value}
        </Text>
      </Box>

      {/* Description - now supports multi-line text */}
      <Box>
        <Text fontSize="md" whiteSpace="pre-wrap" color={colors.black}>
          {description}
        </Text>
      </Box>

      {/* Button - maintains original styling */}
      <Button 
        asChild
        bg="black"
        color="white"
        _hover={{ bg: "gray.800" }}
        borderRadius="md"
        px={3}
        py={2}
        width="full"
      >
        <a href={button.link}>{button.text}</a>
      </Button>
    </CardRoot>
  );
};

export default DashboardRouteCard;