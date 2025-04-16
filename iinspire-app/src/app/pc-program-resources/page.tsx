"use client"
import Footer from "@/components/util/footer";
import Navbar from "@/components/util/navbar";
import { Box, Button, Heading, Text, VStack, SimpleGrid, Spinner, Alert, HStack, Grid, GridItem, CardHeader, CardBody, CardRoot, Icon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import colors from "../../../public/colors";
import { useAuth } from "@/context/auth-context";
import { API_ENDPOINTS } from "@/constants/config";
import DashboardInfoCard from "@/components/dashboards/dashboard-info-card";
import { FaChevronRight } from "react-icons/fa";

interface Resource {
  linkid: number;
  URL: string;
  program_id: number;
  description: string | null;
  title: string;
}

const PCProgramResources = () => {
  const { selectedProgram } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
        console.log(selectedProgram.id)
      try {
        const response = await fetch(API_ENDPOINTS.getStudentResources, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            program_id: selectedProgram.id
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }

        const data = await response.json();
        setResources(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (selectedProgram?.id) {
      fetchResources();
    }
  }, [selectedProgram]);

  // Example resources to show in the right column
  const exampleResources = [
    "Mental Health Resources",
    "Academic Advising",
    "Student Services",
    "Tutoring Services",
    "Career Resources",
    "Internship Opportunities",
    "Networking Events",
  ];

  return (
    <div>
      <Navbar />
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
        {/* Header Section */}
        <VStack 
          background="linear-gradient(to right, #E6F0FF, #D0E1FF)"
          py={8} 
          width="100%"
          gap={6}
          mb={10}
        >
          <Heading 
            as="h1" 
            size="3xl" 
            color="#2D3748"
            fontWeight="extrabold"
            textAlign="center"
            px={4}
            lineHeight="shorter"
          >
            Program Resources
          </Heading>

          <Text color="#4A5568" fontSize="lg"> 
            View, edit, or remove resources for your students.
          </Text>

          <HStack>
            <Button 
                colorScheme="blue" 
                size="lg" 
                px={8}
                fontWeight="semibold"
                boxShadow="md"
                _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg"
                }}
                transition="all 0.2s"
            >
                Add Resource
            </Button>

            <Button 
                colorScheme="blue" 
                size="lg" 
                px={8}
                fontWeight="semibold"
                boxShadow="md"
                _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg"
                }}
                transition="all 0.2s"
            >
                Edit Resources
            </Button>
          </HStack>          
        </VStack>

        {/* Current Resources Section - Now with two columns */}
        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={8} width="100%" maxW="1200px">
          {/* Left Column - Existing Resources */}
          <GridItem>
            <Heading 
              as="h2" 
              size="xl" 
              color="#2D3748"
              fontWeight="bold"
              mb={6}
              textAlign="left"
            >
              Current Resources
            </Heading>

            {loading ? (
              <Box textAlign="center" py={10}>
                <Spinner size="xl" color="blue.500" />
              </Box>
            ) : error ? (
              <Alert.Root status="error" mb={6}>
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Error Loading Resources</Alert.Title>
                  <Alert.Description>
                    {error}
                  </Alert.Description>
                </Alert.Content>
              </Alert.Root>
            ) : resources.length === 0 ? (
              <Alert.Root status="info" mb={6}>
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>No Resources Found</Alert.Title>
                  <Alert.Description>
                    There are currently no resources available for this program.
                  </Alert.Description>
                </Alert.Content>
              </Alert.Root>
            ) : (
              <SimpleGrid columns={1} gap={6}>
                {resources.map((resource) => (
                  <DashboardInfoCard
                    key={resource.linkid}
                    title={resource.title}
                    description={resource.description || "No description available"}
                    URL={{
                      text: "Visit Resource",
                      link: resource.URL
                    }}
                  />
                ))}
              </SimpleGrid>
            )}
          </GridItem>

          {/* Right Column - Example Resources */}
          <GridItem>
  <CardRoot 
    border="1px solid" 
    borderColor="gray.200" 
    borderRadius="lg" 
    bg={colors.white}
    boxShadow="sm"
    _hover={{
      boxShadow: "md",
      transform: "translateY(-2px)",
      transition: "all 0.2s ease-in-out"
    }}
  >
    <CardHeader 
      bg={colors.secondary_blue_light} 
      borderTopRadius="lg"
      px={6}
      py={4}
    >
      <Heading size="lg" color="#2D3748" fontWeight="semibold">
        Resource Ideas
      </Heading>
    </CardHeader>
    <CardBody p={6}>
      <Text mb={4} color="gray.600" fontSize="md">
        Here are some examples of resources you could add:
      </Text>
      <VStack 
        align="start" 
        gap={3}
      >
        {exampleResources.map((example, index) => (
          <HStack key={index} gap={3}>
            <Icon as={FaChevronRight} color={colors.secondary_blue_dark} boxSize={4} />
            <Text color="gray.700" fontSize="sm">
              {example}
            </Text>
          </HStack>
        ))}
      </VStack>
    </CardBody>
  </CardRoot>
</GridItem>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default PCProgramResources;