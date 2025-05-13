"use client"
import Footer from "@/components/util/footer";
import Navbar from "@/components/util/navbar";
import { 
  Box, Button, Heading, Text, VStack, SimpleGrid, 
  Spinner, Grid, GridItem, CardHeader, CardBody, 
  CardRoot, Icon, Dialog, Portal, Field, 
  Input, Textarea, HStack
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import colors from "../../../public/colors";
import { useAuth } from "@/context/auth-context";
import { API_ENDPOINTS } from "@/constants/config";
import DashboardInfoCard from "@/components/dashboards/dashboard-info-card";
import { FaRegStar} from "react-icons/fa";
import { toaster } from "@/components/ui/toaster";
import { FaBook, FaFileAlt, FaLink, FaGraduationCap, FaVideo, FaChartBar } from 'react-icons/fa';

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
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    URL: ''
  });

  const iconComponents = [FaBook, FaFileAlt, FaLink, FaGraduationCap, FaVideo, FaChartBar];

  useEffect(() => {
    const fetchResources = async () => {
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
        toaster.create({
          title: "Error Loading Resources",
          description: err instanceof Error ? err.message : "Failed to load resources",
          type: "error",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    if (selectedProgram?.id) {
      fetchResources();
    }
  }, [selectedProgram]);

  useEffect(() => {
    if (!loading && resources.length === 0) {
      toaster.create({
        title: "No Resources Found",
        description: "There are currently no resources available",
        type: "info",
        duration: 3000,
      });
    }
  }, [loading, resources]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewResource(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddResource = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.addStudentResource, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          program_id: selectedProgram.id,
          URL: newResource.URL,
          description: newResource.description,
          title: newResource.title
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add resource');
      }

      const data = await response.json();
      setResources(prev => [...prev, data]);
      
      toaster.create({
        title: "Resource Added",
        description: "Your resource has been successfully added",
        type: "success",
        duration: 3000,
      });

      setNewResource({
        title: '',
        description: '',
        URL: ''
      });
    } catch (err) {
      toaster.create({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to add resource",
        type: "error",
        duration: 3000,
      });
    }
  };

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
          <Dialog.Root>
            <Dialog.Trigger asChild>
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
            </Dialog.Trigger>
            <Portal>
              {/* Dark backdrop */}
              <Dialog.Backdrop 
                bg="blackAlpha.600" 
                backdropFilter="blur(4px)"
              />
              
              <Dialog.Positioner>
                <Dialog.Content 
                  bg={colors.white} // Keep content white
                  borderRadius="lg"
                  boxShadow="xl"
                >
                  {/* Header with dark background */}
                  <Dialog.Header 
                    borderTopRadius="lg"
                    color="white"
                    py={4}
                    px={6}
                  >
                    <Dialog.Title fontSize="xl" fontWeight="semibold" color={colors.primary_blue}>
                      Add New Resource
                    </Dialog.Title>
                  </Dialog.Header>
                  
                  <Dialog.Body p={6}>
                    <Field.Root mb={4} required>
                      <Field.Label color={colors.primary_blue}>Title</Field.Label>
                      <Input 
                        name="title"
                        value={newResource.title}
                        onChange={handleInputChange}
                        placeholder="Resource title"
                        bg="white"
                        color={colors.black}
                      />
                    </Field.Root>
                    
                    <Field.Root mb={4}>
                      <Field.Label color={colors.primary_blue}>Description</Field.Label>
                      <Textarea
                        name="description"
                        value={newResource.description}
                        onChange={handleInputChange}
                        placeholder="Brief description"
                        bg="white"
                        color={colors.black}
                      />
                    </Field.Root>
                    
                    <Field.Root required>
                      <Field.Label color={colors.primary_blue}>URL</Field.Label>
                      <Input
                        name="URL"
                        type="url"
                        value={newResource.URL}
                        onChange={handleInputChange}
                        placeholder="https://example.com"
                        bg="white"
                        color={colors.black}
                      />
                    </Field.Root>
                  </Dialog.Body>
                  
                  <Dialog.Footer 
                    gap={3} 
                    px={6} 
                    py={4}
                    borderTop="1px solid"
                    borderColor="gray.200"
                  >
                    <Button 
                      colorScheme="blue"
                      onClick={handleAddResource}
                      disabled={!newResource.title || !newResource.URL}
                    >
                      Save
                    </Button>
                    <Dialog.CloseTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.CloseTrigger>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
          </HStack>          
        </VStack>

        {/* Current Resources Section */}
        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={8} width="100%" maxW="1200px">
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
            ) : resources.length === 0 ? (
                <Text color="gray.600" fontSize="lg">No resources available.</Text>
            ) : (
              <SimpleGrid columns={1} gap={6}>
                {resources.map((resource) => {
                    const IconComponent = iconComponents[resource.linkid % iconComponents.length];
                    
                    return (
                      <DashboardInfoCard
                      key={resource.linkid}
                      linkid={resource.linkid}
                      title={resource.title}
                      description={resource.description || "No description available"}
                      URL={{
                        text: "Visit Resource",
                        link: resource.URL
                      }}
                      icon={IconComponent}
                      onDeleteSuccess={() => {
                        setResources(prev => prev.filter(r => r.linkid !== resource.linkid));
                      }}
                    />
                    );
                    })}
              </SimpleGrid>
            )}
          </GridItem>

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
                <VStack align="start" gap={3}>
                  {exampleResources.map((example, index) => (
                    <HStack key={index} gap={3}>
                      <Icon as={FaRegStar} color={colors.secondary_blue_dark} boxSize={4} />
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