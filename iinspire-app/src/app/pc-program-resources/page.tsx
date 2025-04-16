"use client"
import Footer from "@/components/util/footer";
import Navbar from "@/components/util/navbar";
import { Box, Button, Heading, Text, VStack, SimpleGrid, Spinner, Alert, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import colors from "../../../public/colors";
import { useAuth } from "@/context/auth-context";
import { API_ENDPOINTS } from "@/constants/config";
import DashboardInfoCard from "@/components/dashboards/dashboard-info-card";

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

        {/* Current Resources Section */}
        <Box width="100%" maxW="1200px">
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
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default PCProgramResources;