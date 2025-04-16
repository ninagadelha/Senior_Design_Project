"use client";
import React, { useEffect, useState } from "react";
import { Box, Heading, Spinner } from "@chakra-ui/react";
//import { FaLink } from "react-icons/fa";
//import DashboardCard from "@/components/dashboards/dashboard-route-card";
import { useAuth } from "@/context/auth-context";
import { API_ENDPOINTS } from "@/constants/config";

//Will need to be adjusted e
interface Resource {
  linkid: number;
  URL: string;
  program_id: number;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user?.programid) {
      setError("User not authenticated or missing program ID");
      setLoading(false);
      return;
    }

    const fetchResources = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.getStudentResources, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          //Needs fixing since GET cannot have a body
          body: JSON.stringify({
            program_id: user.programid
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch resources");
        const data = await response.json();
        setResources(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [isAuthenticated, user?.programid]);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Box color="red.500">Error: {error}</Box>;
  if (resources.length === 0) return <Box>No resources found for your program.</Box>;

  return (
    <Box p={8}>
      <Heading as="h1" mb={8} textAlign="center">
        Program Resources
      </Heading>

      {/* <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {resources.map((resource) => (
          <DashboardCard
            key={resource.linkid}
            icon={FaLink}
            dashboardCardHeader={`Resource #${resource.linkid}`}
            dashboardCardValue={resource.URL.replace(/^https?:\/\//, "")}
            dashboardButton={{
              text: "Visit Resource",
              link: resource.URL.startsWith("http") ? resource.URL : `https://${resource.URL}`,
            }}
          />
        ))}
      </SimpleGrid> */}
    </Box>
  );
}