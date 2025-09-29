import React from 'react';
import { Box, Button, Flex, Heading, Text, Image, Link, Icon } from '@chakra-ui/react';
import colors from '../../../public/colors';
import fonts from '../../../public/fonts';

interface HeroCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc?: string;
  imageAlt?: string;
  reverseLayout?: boolean;
  icon?: React.ElementType;
}

const HeroCard: React.FC<HeroCardProps> = ({
    title,
    description,
    buttonText,
    buttonLink,
    imageSrc,
    imageAlt = '',
    reverseLayout,
    icon: IconComponent,
  }) => {
    return (
      <Flex
        width="100vw"
        maxWidth="100%"
        minH={{ base: "auto", md: "70vh" }} // Reduced from 100vh
        direction={{ base: 'column', md: reverseLayout ? 'row-reverse' : 'row' }}
        align="center"
        justify="center"
        gap={{ base: "1.5rem", md: "3rem" }} // Reduced gap
        py={{ base: "1rem", md: "1.5rem" }} // Minimal padding
        px={{ base: "1rem", md: "2rem" }}
        bg={colors.white}
      >
        {/* Text Content - Tightened spacing */}
        <Box 
          flex="1"
          minW={{ md: '50%' }}
          maxW={{ md: '600px' }}
          display="flex"
          flexDirection="column"
          alignItems={{ base: 'center', md: 'center' }}
          justifyContent="center"
          textAlign={{ base: 'center', md: 'center' }}
          py={{ base: "0.5rem", md: "1rem" }} // Reduced internal padding
        >
          {IconComponent && (
            <Icon as={IconComponent} boxSize={8} color={colors.black} mb="0.75rem" />
          )}
          <Heading
            as="h2"
            fontSize={{ base: fonts.large_font_size, md: fonts.extra_large_font_size }}
            fontWeight={fonts.bold_weight}
            color={colors.black}
            mb="1rem" // Reduced from 1.5rem
            lineHeight="1.2"
          >
            {title}
          </Heading>
          <Text
            fontSize={{ base: fonts.default_font_size, md: fonts.default_font_size }}
            fontWeight={fonts.default_weight}
            mb="1.5rem" // Reduced from 2rem
            color={colors.dark_grey}
            maxW="500px"
          >
            {description}
          </Text>
          <Link href={buttonLink} _hover={{ textDecoration: 'none' }} display="inline-block">
            <Button
              as="span"
              size="lg"
              bg={colors.black}
              color={colors.white}
              _hover={{ bg: colors.dark_grey }}
              px="2rem"
              py="1.25rem" // Slightly reduced
              fontSize={fonts.default_font_size}
              fontWeight={fonts.bold_weight}
            >
              {buttonText}
            </Button>
          </Link>
        </Box>
  
        {/* Image Container - Tightened */}
        {imageSrc && (
          <Box 
            flex="1" 
            minW={{ md: '50%' }}
            maxW={{ md: '600px' }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            py={{ base: "0.5rem", md: "0" }} // Reduced padding
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              borderRadius="lg"
              objectFit="contain" // Changed from cover to contain
              w="100%"
              h="auto"
              maxH={{ base: "250px", md: "350px" }} // Reduced max height
            />
          </Box>
        )}
      </Flex>
    );
  };

export default HeroCard;