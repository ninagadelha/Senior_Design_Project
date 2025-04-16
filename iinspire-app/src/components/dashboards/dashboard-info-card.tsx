import React from 'react';
import { Box, Button, CardHeader, CardBody, CardFooter, Heading, CardRoot, HStack, Icon, Link } from '@chakra-ui/react';
import colors from '../../../public/colors';
import fonts from '../../../public/fonts';
import { FaBook, FaFileAlt, FaLink, FaGraduationCap, FaVideo, FaChartBar } from 'react-icons/fa';

interface ResourceCardProps {
  title: string | null;
  description: string | null;
  URL: {
    text: string;
    link: string;
  };
  icon?: React.ReactElement;
}

// Array of possible icons to randomly select from
const resourceIcons = [
  <FaBook key="book" />,
  <FaFileAlt key="file" />,
  <FaLink key="link" />,
  <FaGraduationCap key="cap" />,
  <FaVideo key="video" />,
  <FaChartBar key="chart" />
];

const DashboardInfoCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  URL
}) => {
  // Select a random icon from the pool
  const randomIcon = resourceIcons[Math.floor(Math.random() * resourceIcons.length)];

  return (
    <CardRoot 
      size="sm" 
      border="1px solid #D9D9D9" 
      borderRadius="lg" 
      p={4} 
      background={colors.white}
      width="100%"
      maxWidth="800px"
      display="flex"
      overflow="hidden"
      flexDirection="row"
      _hover={{
        boxShadow: 'md',
        transform: 'translateY(-2px)',
        transition: 'all 0.2s'
      }}
    >
      <HStack alignItems="flex-start" gap={4} width="100%">
        {/* Icon container */}
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          bg={colors.secondary_blue_light}
          borderRadius="md"
          p={3}
          minWidth="60px"
          height="60px"
        >
          <Icon 
            as={randomIcon.type} 
            boxSize={6} 
            color={colors.secondary_blue_dark}
          />
        </Box>

        {/* Text content */}
        <Box flex="1">
          <CardHeader 
            textAlign="left" 
            color={colors.black} 
            fontWeight={fonts.bold_weight}
            p={0}
            mb={2}
          >
            <Heading size="md">
              {title || 'Untitled Resource'}
            </Heading>
          </CardHeader>
        
          <CardBody 
            color="gray.600"
            fontSize="sm"
            p={0}
            mb={3}
          >
            {description || 'No description available'}
          </CardBody>
          
          <CardFooter p={0}>
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
              >
                {URL.text}
              </Button>
            </Link>
          </CardFooter>
        </Box>
      </HStack>
    </CardRoot>
  );
};

export default DashboardInfoCard;