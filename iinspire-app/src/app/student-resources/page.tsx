"use client";
import React, { useEffect, useState } from "react";
import { 
  Box, Heading, Spinner, VStack, Text, SimpleGrid} from "@chakra-ui/react";
import { useAuth } from "@/context/auth-context";
import { API_ENDPOINTS } from "@/constants/config";
import { FaBook, FaFileAlt, FaLink, FaGraduationCap, FaVideo, FaChartBar } from 'react-icons/fa';
import Navbar from "@/components/util/navbar";
import Footer from "@/components/util/footer";
import colors from "../../../public/colors";
import DashboardInfoCard from "@/components/dashboards/dashboard-info-card";
import { toaster } from "@/components/ui/toaster";

interface Resource {
  linkid: number;
  URL: string;
  program_id: number;
  description: string | null;
  title: string;
}

export default function StudentResourcesPage() {
  const { selectedProgram, user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const iconComponents = [FaBook, FaFileAlt, FaLink, FaGraduationCap, FaVideo, FaChartBar];

  useEffect(() => {
    console.log(user);

    const fetchResources = async () => {
      try {
        console.log("User ProgramID:", user?.programid);
        
        const response = await fetch(API_ENDPOINTS.getStudentResources, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            program_id: user?.programid
          })
        });

        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received data:", data);
        
        if (!Array.isArray(data)) {
          throw new Error("Received data is not an array");
        }

        setResources(data);
      } catch (err) {
        console.error("Error loading resources:", err);
        toaster.create({
        title: "No Resources Found",
        description: "There are currently no resources available",
        type: "info",
        duration: 3000,
      })
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [selectedProgram, user]);

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
            View resources for your program.
          </Text>
        </VStack>

        {/* Resources Grid Section */}
        <Box width="100%" maxW="1200px">
          <Heading 
            as="h2" 
            size="xl" 
            color="#2D3748"
            fontWeight="bold"
            mb={6}
            textAlign="left"
          >
            Available Resources
          </Heading>

          {loading ? (
            <Box textAlign="center" py={10}>
              <Spinner size="xl" color="blue.500" />
              <Text mt={4}>Loading resources...</Text>
            </Box>
          ) : resources.length === 0 ? (
            <Text color="gray.500" textAlign="center" py={10}>
              No resources available for your program yet.
            </Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} gap={6}>
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
                    showDelete={false}
                  />
                );
              })}
            </SimpleGrid>
          )}
        </Box>
      </Box>
      <Footer />
    </div>
  );
}