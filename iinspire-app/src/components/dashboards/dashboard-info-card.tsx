import React from 'react';
import { Box, Button, CardHeader, CardBody, Heading, CardRoot, HStack, Icon, Link, VStack, Text } from '@chakra-ui/react';
import colors from '../../../public/colors';
import fonts from '../../../public/fonts';
import { FaBook, FaTrash } from 'react-icons/fa';
import { toaster } from '../ui/toaster';
import { API_ENDPOINTS } from '@/constants/config';

interface ResourceCardProps {
  title: string | null;
  description: string | null;
  URL: {
    text: string;
    link: string;
  };
  linkid: number;
  icon?: React.ComponentType;
  onDeleteSuccess?: () => void;
  showDelete?: boolean; // New prop to control delete button visibility
}

const DashboardInfoCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  URL,
  linkid,
  icon: IconComponent = FaBook,
  onDeleteSuccess,
  showDelete = true // Default to true for backward compatibility
}) => {

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this resource?");
      if (!confirmDelete) return;

      const response = await fetch(API_ENDPOINTS.deleteStudentResource, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ linkid })
      });

      if (!response.ok) {
        throw new Error('Failed to delete resource');
      }

      toaster.create({
        title: "Resource Deleted",
        description: "The resource has been successfully removed",
        type: "success",
        duration: 3000,
      });

      if (onDeleteSuccess) onDeleteSuccess();

    } catch (err) {
      toaster.create({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to delete resource",
        type: "error",
        duration: 3000,
      });
    }
  };

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
          minWidth={0}
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
        <HStack flexShrink={0} gap={3}>
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

          {/* Conditionally render Delete Button */}
          {showDelete && (
            <Button
              variant="ghost"
              colorScheme="red"
              _hover={{ 
                bg: "red.300",
                transform: "scale(1.02)"
              }}
              size="sm"
              p={2}
              minW="auto"
              onClick={handleDelete}
              aria-label="Delete resource"
            >
              <Icon as={FaTrash} boxSize={4} />
            </Button>
          )}
        </HStack>
      </HStack>
    </CardRoot>
  );
};

export default DashboardInfoCard;