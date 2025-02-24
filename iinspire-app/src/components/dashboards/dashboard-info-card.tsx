import React from 'react';
import { Box, Button, CardHeader, CardBody, CardFooter, Heading, CardRoot, HStack, Image } from '@chakra-ui/react';
import colors from '../../../public/colors';
import fonts from '../../../public/fonts';

interface DashboardInfoCardProps {
  imageSrc: string; // Updated to use an image instead of an icon
  dashboardInfoCardHeader: string;
  dashboardInfoCardText: string;
  dashboardInfoCardButton: {
    text: string;
    link: string;
  };
}

const DashboardInfoCard: React.FC<DashboardInfoCardProps> = ({
  imageSrc,
  dashboardInfoCardHeader,
  dashboardInfoCardText,
  dashboardInfoCardButton
}) => {
  return (
    <CardRoot 
      size="sm" 
      border="1px solid #D9D9D9" 
      borderRadius="lg" 
      p={2} 
      background={colors.white}
      width="800px" // Set fixed width
      display="flex"
      overflow="hidden"
      flexDirection="row"
    >
      <HStack alignItems="center">
        {/* Image for info card */}
        <Box>
          <Image 
            src={imageSrc} 
            alt={dashboardInfoCardHeader} 
            boxSize="100px"
            borderRadius="md" 
            objectFit="cover"
          />
        </Box>

        {/* Text for info card */}
        <Box flex="1">
          <CardHeader 
            textAlign="left" 
            color={colors.black} 
            fontWeight={fonts.bold_weight}
          >
            <Heading size="md">{dashboardInfoCardHeader}</Heading>
          </CardHeader>
        
          <CardBody 
            color="gray.600"
            fontSize="13px"
            py="0.5rem"
          >
            {dashboardInfoCardText}
          </CardBody>
          
          <CardFooter>
            {/* Info Card Button (link to ISU resource) */}
            <Button 
                asChild
                bg="black"
                color="white"
                _hover={{ bg: "gray.800" }}
                borderRadius="md"
                px={3}
                py={1}
            >
                <a href={dashboardInfoCardButton.link} target='_blank'>{dashboardInfoCardButton.text}</a>
            </Button>
          </CardFooter>
        </Box>
      </HStack>
    </CardRoot>
  );
};

export default DashboardInfoCard;
