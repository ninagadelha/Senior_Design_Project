"use client"
import Footer from "@/components/util/footer";
import Navbar from "@/components/util/navbar";
import { Box, Button, Heading, Text, VStack, Table, Icon, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import colors from "../../../public/colors";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { API_ENDPOINTS } from "@/constants/config";
import { toaster } from "@/components/ui/toaster";
import { FaTrash } from "react-icons/fa";

type Program = {
  program_id: number;
  name: string;
  owner_userid: number;
  code: string;
  student_count: number;
  resource_count?: number; // We'll fetch this separately
};

const PCProgramsHome = () => {
    const router = useRouter();
    const { selectedProgram, user } = useAuth();
    const [programs, setPrograms] = useState<Program[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch programs when component mounts
    useEffect(() => {
        const fetchPrograms = async () => {
            if (!user?.id) {
                setIsLoading(false);
                return;
            }
            
            setIsLoading(true);
            try {
                const response = await fetch(API_ENDPOINTS.getProgramsByPC, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        owner_userid: parseInt(user.id)
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                // Fetch resource count for each program
                const programsWithResources = await Promise.all(
                    data.map(async (program: Program) => {
                        try {
                            const resourcesRes = await fetch(API_ENDPOINTS.getStudentResources, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    program_id: program.program_id
                                })
                            });
                            
                            if (resourcesRes.ok) {
                                const resourcesData = await resourcesRes.json();
                                return {
                                    ...program,
                                    resource_count: resourcesData.length
                                };
                            }
                            return {
                                ...program,
                                resource_count: 0
                            };
                        } catch (error) {
                            console.error(`Error fetching resources for program ${program.program_id}:`, error);
                            return {
                                ...program,
                                resource_count: 0
                            };
                        }
                    })
                );
                
                setPrograms(programsWithResources);
            } catch (error) {
                console.error('Error fetching programs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPrograms();
    }, [user?.id]);

    const handleDeleteProgram = async (programId: number) => {
        if (!window.confirm("Are you sure you want to delete this program?")) return;
        
        try {
            const response = await fetch(API_ENDPOINTS.deleteProgram, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    program_id: programId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Remove the deleted program from state
            setPrograms(prev => prev.filter(p => p.program_id !== programId));
            
            // If the deleted program was the currently selected one, clear selection
            if (selectedProgram?.id === programId.toString()) {

                toaster.create({
                    title: "Selected Program Deleted",
                    description: "You deleted your selected program. Taking you back to Program Selection",
                    type: "warning",
                    duration: 5000,
                });

                router.push("/pc-select-program");
            }

            toaster.create({
                title: "Success",
                description: "Successfully deleted program.",
                type: "success",
                duration: 3000,
            });
        } catch (error) {
            console.error('Error deleting program:', error);
            toaster.create({
                title: "Error",
                description: "Error deleting program.",
                type: "error",
                duration: 3000,
            });
        }
    };

    /**
     * Mini component for a singular column header. CSS changes will affect all column headers
     * @param param
     * @returns 
     */
    const ColumnHeader = ({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "center" | "right" }) => (
        <Table.ColumnHeader 
          fontWeight="bold" 
          color={colors.white}
          fontSize="md"
          py={4}
          textAlign={align}
          borderBottomWidth="1px"
          borderColor={colors.light_grey}
        >
          {children}
        </Table.ColumnHeader>
      );

    /**
     * Constant for storing the table headers
     */
    const columns = [
        { header: "Program Name", align: "left" },
        { header: "Program Code", align: "left" },
        { header: "# Students", align: "center" },
        { header: "# Resources", align: "center" },
        { header: "Action", align: "center" }
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
                            size="4xl" 
                            color="#2D3748"
                            fontWeight="extrabold"
                            textAlign="center"
                            px={4}
                            lineHeight="shorter"
                        >
                            Programs
                        </Heading>

                        <Text color="#4A5568" fontSize="lg"> 
                            You currently have: {programs.length} Programs
                        </Text>

                        <Text color="#4A5568" fontSize="md"> 
                            View program information, create a new program, or delete an existing program.
                        </Text>
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
                            onClick={() => {router.push("/pc-create-program")}}
                        >
                        Create New Program
                        </Button>       
                    </VStack>                    
                    
                    {/* Programs Table */}
                    {isLoading ? (
                        <Box textAlign="center" py={10}>
                            <Spinner size="xl" color="blue.500" />
                        </Box>
                    ) : programs.length > 0 ? (
                        <Table.Root 
                            width="100%" 
                            maxWidth="1200px" 
                            size="md"
                            variant="outline"
                            borderRadius="lg"
                            overflow="hidden"
                            boxShadow="md"
                            borderColor={colors.light_grey}
                            interactive
                        >
                        <Table.Header bg={colors.primary_blue}>
                            <Table.Row>
                                {columns.map((col) => (
                                <ColumnHeader key={col.header} align={col.align as "left" | "center" | "right"}>
                                    {col.header}
                                </ColumnHeader>
                                ))}
                            </Table.Row>
                            </Table.Header>
                        
                        <Table.Body bg={colors.white}>
                            {programs.map((program) => (
                            <Table.Row 
                                key={program.program_id}
                                _hover={{ bg: colors.light_grey }}
                                transition="background-color 0.2s ease"
                                borderBottomWidth="1px"
                                borderColor={colors.light_grey}
                            >
                                <Table.Cell 
                                fontWeight="semibold" 
                                color={colors.black}
                                py={3}
                                >
                                {program.name}
                                </Table.Cell>
                                <Table.Cell 
                                color={colors.dark_grey}
                                py={3}
                                >
                                {program.code}
                                </Table.Cell>
                                <Table.Cell 
                                textAlign="center" 
                                color={colors.black}
                                fontWeight="medium"
                                py={3}
                                >
                                {program.student_count}
                                </Table.Cell>
                                <Table.Cell 
                                textAlign="center" 
                                color={colors.black}
                                fontWeight="medium"
                                py={3}
                                >
                                {program.resource_count || 0}
                                </Table.Cell>
                                <Table.Cell textAlign="center" py={3}>
                                <Button
                                    variant="ghost"
                                    colorScheme="red"
                                    _hover={{ 
                                    bg: "red.100",
                                    transform: "scale(1.05)",
                                    color: "red.600"
                                    }}
                                    _active={{
                                    transform: "scale(0.98)"
                                    }}
                                    size="sm"
                                    p={2}
                                    minW="auto"
                                    onClick={() => handleDeleteProgram(program.program_id)}
                                    aria-label="Delete program"
                                    transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                                >
                                    <Icon as={FaTrash} boxSize={4} />
                                </Button>
                                </Table.Cell>
                            </Table.Row>
                            ))}
                        </Table.Body>
                        </Table.Root>
                    ) : (
                        <Box textAlign="center" py={10}>
                            <Text color="black" fontSize="lg">No programs found. Create your first program!</Text>
                        </Box>
                    )}
                </Box>
            <Footer />
        </div>
    );
};
export default PCProgramsHome;