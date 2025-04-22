"use client";
import React from "react";
import {
  Box,
  Flex,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import DashboardRouteCard from "./dashboard-route-card";
import { HiUsers } from "react-icons/hi";
import {  CgDialpad, CgExport, CgNotes } from "react-icons/cg";
import { GrResources } from "react-icons/gr";
import { useAuth } from "@/context/auth-context";
import colors from "../../../public/colors";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const { isAuthenticated, selectedProgram } = useAuth();
  const router = useRouter();

  const responsiveConfig = useBreakpointValue({
    base: {
      direction: "column",
      justify: "center",
      maxWidth: "100%",
      cardsPerRow: 1,
    },
    sm: {
      direction: "row",
      justify: "center",
      maxWidth: "100%",
      cardsPerRow: 2,
    },
    md: {
      direction: "row",
      justify: "center",
      maxWidth: "1200px",
      cardsPerRow: 3,
    },
    lg: {
      direction: "row",
      justify: "center",
      maxWidth: "1400px",
      cardsPerRow: 3,
    },
  });

  const cardSpacing = 20;
  const cardMinWidth = "280px";

  const topRowCards = [
    {
      icon: CgNotes,
      description: "Get Program Information",
      button: { text: "View Info", link: "/program-info" },
      borderColor: colors.border_teal,
    },
    {
      icon: CgExport,
      description: "Download Results",
      button: { text: "Results", link: "/download-csv" },
      borderColor: colors.border_red,
    },
    {
      icon: CgDialpad,
      description: "Generate Code",
      button: { text: "Get Code", link: "/generate-code" },
      borderColor: colors.border_sky_blue,
    },
  ];

  if (!isAuthenticated) {
    return <div>Please login to view this content</div>;
  }

  return (
    <Box
      flex="1"
      minH="100vh"
      p={6}
      background={colors.white}
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
    >
      {/* Header at the top */}
      <Heading
        as="h1"
        fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
        color="black"
        fontWeight="extrabold"
        textAlign="center"
        mb={8}
      >
        MyStemGrowth Admin Dashboard
      </Heading>

      {/* Cards vertically centered */}
      <Flex
        flex="1"
        align="center"
        justify="center"
        width="100%"
        maxWidth={responsiveConfig?.maxWidth}
        gap={cardSpacing}
        flexWrap="wrap"
      >
        {topRowCards.map((card, index) => (
          <Box
            key={`top-${index}`}
            minWidth={cardMinWidth}
            maxWidth={{ base: "100%", sm: "400px" }}
          >
            <DashboardRouteCard
              icon={card.icon}
              value={null}
              description={card.description}
              button={card.button}
              borderColor={card.borderColor}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default AdminDashboard;


