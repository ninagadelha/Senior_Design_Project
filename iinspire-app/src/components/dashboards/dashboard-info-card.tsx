import React from 'react';
import { Box, Button, CardHeader, CardBody, Heading, CardRoot, HStack, Icon, Link, VStack, Text } from '@chakra-ui/react';
import colors from '../../../public/colors';
import fonts from '../../../public/fonts';
import { FaBook } from 'react-icons/fa';

interface ResourceCardProps {
  title: string | null;
  description: string | null;
  URL: {
    text: string;
    link: string;
  };
  icon?: React.ComponentType;
}

const DashboardInfoCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  URL,
  icon: IconComponent = FaBook
}) => {

  return (
    <CardRoot 
      size="sm" 
      border="1px solid #D9D9D9" 
      borderRadius="lg" 
      p={4} 
      background={colors.white}
      width="100%"
      maxWidth="800px"
      _hover={{
        boxShadow: 'md',
        transform: 'translateY(-2px)',
        transition: 'all 0.2s'
      }}
    >
      <HStack alignItems="center" gap={4} width="100%">
        {/* Icon container - Left */}
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          bg={colors.secondary_blue_light}
          borderRadius="md"
          p={3}
          minWidth="60px"
          height="60px"
          flexShrink={0}
        >
          <Icon 
            as={IconComponent} 
            boxSize={6} 
            color={colors.secondary_blue_dark}
          />
        </Box>

        {/* Text content - Middle */}
        <VStack 
          alignItems="flex-start" 
          gap={1} 
          flex="1"
          minWidth={0} // Prevent overflow
        >
          <CardHeader p={0}>
            <Heading 
              size="md" 
              color={colors.black} 
              fontWeight={fonts.bold_weight}
              truncate
              width="100%"
            >
              {title || 'Untitled Resource'}
            </Heading>
          </CardHeader>
        
          <CardBody p={0}>
            <Text 
              color="gray.600"
              fontSize="sm"
              lineClamp={2}
            >
              {description || 'No description available'}
            </Text>
          </CardBody>
        </VStack>

        {/* Button - Right */}
        <Box flexShrink={0}>
          <Link 
            href={URL.link} 
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ textDecoration: 'none' }}
          >
            <Button
              bg="black"
              color="white"
              _hover={{ 
                bg: "gray.800",
                transform: "scale(1.02)"
              }}
              borderRadius="md"
              px={4}
              size="sm"
              transition="all 0.2s"
              whiteSpace="nowrap"
            >
              {URL.text}
            </Button>
          </Link>
        </Box>
      </HStack>
    </CardRoot>
  );
};

export default DashboardInfoCard;