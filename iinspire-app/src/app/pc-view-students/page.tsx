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
import { FaTrash, FaUserGraduate } from "react-icons/fa";

type Student = {
  id: number;
  role: string;
  email: string;
  netid: string;
  fullname: string | null;
  created_at: string;
  // Add other properties you want to display
};

const PCViewStudents = () => {
    const router = useRouter();
    const { selectedProgram } = useAuth();
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch students when component mounts or selected program changes
    useEffect(() => {
        const fetchStudents = async () => {
            if (!selectedProgram?.id) {
                setIsLoading(false);
                return;
            }
            
            setIsLoading(true);
            try {
                const response = await fetch(API_ENDPOINTS.getUsersInProgram, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        programid: parseInt(selectedProgram.id)
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                // Access the Users array from the response
                setStudents(data.Users || []);
            } catch (error) {
                console.error('Error fetching students:', error);
                toaster.create({
                    title: "Error",
                    description: "Failed to fetch students.",
                    type: "error",
                    duration: 3000,
                });
                setStudents([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStudents();
    }, [selectedProgram?.id]);

    const handleRemoveStudent = async (studentId: number) => {
        if (!window.confirm("Are you sure you want to remove this student from the program?")) return;
        
        try {
            const response = await fetch(API_ENDPOINTS.deleteStudentResource, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: studentId,
                    program_id: selectedProgram?.id
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            setStudents(prev => prev.filter(s => s.id !== studentId));
            
            toaster.create({
                title: "Success",
                description: "Student removed from program.",
                type: "success",
                duration: 3000,
            });
        } catch (error) {
            console.error('Error removing student:', error);
            toaster.create({
                title: "Error",
                description: "Error removing student from program.",
                type: "error",
                duration: 3000,
            });
        }
    };

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

    const columns = [
        { header: "Student Name", align: "left" },
        { header: "Email", align: "left" },
        { header: "NetID", align: "left" },
        { header: "Join Date", align: "center" },
        { header: "Action", align: "center" }
    ];

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

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
                        {selectedProgram?.name ? `Students in "${selectedProgram.name}"` : "No program selected"}
                    </Heading>

                    <Text color="#4A5568" fontSize="md"> 
                        View student information or remove them from this program.
                    </Text>
                </VStack>                    
                
                {/* Students Table */}
                {!selectedProgram?.id ? (
                    <Box textAlign="center" py={10}>
                        <Text color="black" fontSize="lg">No program selected. Please select a program first.</Text>
                        <Button 
                            mt={4}
                            colorScheme="blue"
                            onClick={() => router.push("/pc-select-program")}
                        >
                            Select Program
                        </Button>
                    </Box>
                ) : isLoading ? (
                    <Box textAlign="center" py={10}>
                        <Spinner size="xl" color="blue.500" />
                    </Box>
                ) : students.length > 0 ? (
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
                            {students.map((student) => (
                            <Table.Row 
                                key={student.id}
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
                                    <Icon as={FaUserGraduate} mr={2} />
                                    {student.fullname || `N/A`}
                                </Table.Cell>
                                <Table.Cell 
                                    color={colors.dark_grey}
                                    py={3}
                                >
                                    {student.email}
                                </Table.Cell>
                                <Table.Cell 
                                    color={colors.dark_grey}
                                    py={3}
                                >
                                    {student.netid}
                                </Table.Cell>
                                <Table.Cell 
                                    textAlign="center" 
                                    color={colors.black}
                                    fontWeight="medium"
                                    py={3}
                                >
                                    {formatDate(student.created_at)}
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
                                        onClick={() => handleRemoveStudent(student.id)}
                                        aria-label="Remove student"
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
                        <Text fontSize="lg">No students found in this program.</Text>
                    </Box>
                )}
            </Box>
            <Footer />
        </div>
    );
};

export default PCViewStudents;