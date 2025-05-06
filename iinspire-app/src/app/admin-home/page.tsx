"use client"
import Footer from "@/components/util/footer";
import Navbar from "@/components/util/navbar";
import {Box, Button, Heading, Text, Table, Icon, Spinner, Flex} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import colors from "../../../public/colors";
import {useAuth} from "@/context/auth-context";
import {API_ENDPOINTS} from "@/constants/config";
import {toaster} from "@/components/ui/toaster";
import {FaTrash} from "react-icons/fa";
import styles from "./AdminHome.module.css"

type Program = {
    program_id: number;
    name: string;
    owner_userid: number;
    owner_fullname: string;
    code: string;
    submission_count?: number;
};

const AdminHome = () => {
    const {selectedProgram} = useAuth();
    const [programs, setPrograms] = useState<Program[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState("admin");
    const [code, setCode] = useState("");

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.getProgramsAdmin);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();

                //fetch number of students who have taken the survey
                const programsWithCounts = await Promise.all(
                    data.map(async (program: Program) => {

                        let submissionCount = 0;
                        try {
                            const submissionRes = await fetch(API_ENDPOINTS.adminProgramResultsCSV, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({programID: program.program_id})
                            });

                            if (submissionRes.ok) {
                                const blob = await submissionRes.blob();
                                const csvText = await blob.text();

                                const rows = csvText.trim().split("\n");
                                const emailSet = new Set<string>();

                                for (const row of rows) {
                                    const email = row.split(",")[0].replace(/"/g, "");
                                    if (email.includes("@")) {
                                        emailSet.add(email);
                                    }
                                }

                                submissionCount = emailSet.size;
                            } else if (submissionRes.status !== 404) {
                                console.error(`Failed to fetch submissions for program ${program.program_id}`);
                            }
                        } catch (err) {
                            console.error(`Error fetching submissions for program ${program.program_id}:`, err);
                        }

                        return {
                            ...program,
                            submission_count: submissionCount
                        };
                    })
                );

                setPrograms(programsWithCounts);

            } catch (error) {
                console.error("Error fetching programs:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPrograms();
    }, []);


    //download survey results
    const downloadCSV = async (programID: number) => {
        try {
            const response = await fetch(API_ENDPOINTS.adminProgramResultsCSV, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({programID})
            });

            if (response.status === 404) {
                alert("No survey results found for this program.");
                return;
            }

            if (!response.ok) throw new Error("Failed to fetch CSV");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `program_${programID}_results.csv`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(`Error downloading CSV for program ${programID}:`, error);
        }
    };

    //download survey questions
    const downloadQuestionsCSV = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.getQuestionsCSV);

            if (response.status === 404) {
                alert("No questions data found.");
                return;
            }

            if (!response.ok) throw new Error("Failed to fetch questions CSV");

            const blob = await response.blob();
            const text = await blob.text();

            const fileBlob = new Blob([text], {type: "text/csv"});
            const url = window.URL.createObjectURL(fileBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `questions.csv`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading questions CSV:", error);
            alert("There was an error downloading the questions.");
        }
    };

    //delete a program
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
                // You might want to add a function in your auth context to clear selected program
                // Or handle this differently based on your app's requirements
            }

            toaster.create({
                title: "Success",
                description: "Successfully deleted program. Please refresh the page.",
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

    //generate PC code or admin code
    const generateCode = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.getAdminCodes);
            const data = await response.json();

            const targetRole = role === "admin" ? "Admin" : "ProgramCoordinator";

            const match = data.find((item: any) => item.role === targetRole);

            if (match) {
                setCode(match.code);
            } else {
                setCode("No code found for role");
            }
        } catch (error) {
            console.error("Error fetching admin codes:", error);
            setCode("Error fetching code");
        }
    };

    /**
     * Mini component for a singular column header. CSS changes will affect all column headers
     * @param param
     * @returns
     */
    const ColumnHeader = ({children, align = "left"}: {
        children: React.ReactNode;
        align?: "left" | "center" | "right"
    }) => (
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
        {header: "Program Name", align: "left"},
        {header: "PC", align: "left"},
        {header: "# Submissions", align: "center"},
        {header: "Download Results", align: "center"},
        {header: "Download Questions", align: "center"},
        {header: "Action", align: "center"}
    ];

    return (
        <div>
            <Navbar/>
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
                <Heading
                    as="h1"
                    size="4xl"
                    mb={6}
                    fontWeight="extrabold"
                    textAlign="center"
                    color="#2D3748"
                >
                    MySTEMGrowth Admin Dashboard
                </Heading>
                <Box maxW="lg" p={6} borderWidth={1} borderRadius="xl" mb={10}>
                    <Text color="black" fontSize="2xl" mb={4} fontWeight="bold">
                        Generate Access Code
                    </Text>

                    <Text mb={2} color="black">Select Role:</Text>
                    <select
                        className={styles.select}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="admin">Admin</option>
                        <option value="pc">Program Coordinator</option>
                    </select>

                    <Button colorScheme="blue" onClick={generateCode} mt={4} mb={4}>
                        Generate Code
                    </Button>

                    {code && (
                        <Flex
                            align="center"
                            justify="space-between"
                            bg="gray.100"
                            px={4}
                            py={2}
                            borderRadius="md"
                            mb={2}
                        >
                            <Text color = "black" fontFamily="mono">{code}</Text>
                        </Flex>
                    )}
                </Box>

                {isLoading ? (
                    <Box textAlign="center" py={10}>
                        <Spinner size="xl" color="blue.500"/>
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
                                    _hover={{bg: colors.light_grey}}
                                    transition="background-color 0.2s ease"
                                    borderBottomWidth="1px"
                                    borderColor={colors.light_grey}
                                >
                                    <Table.Cell fontWeight="semibold" color={colors.black} py={3}>
                                        {program.name}
                                    </Table.Cell>
                                    <Table.Cell color={colors.dark_grey} py={3}>
                                        {program.owner_fullname}
                                    </Table.Cell>
                                    <Table.Cell textAlign="center" py={3} color={colors.black}>
                                        {program.submission_count ?? 0}
                                    </Table.Cell>
                                    <Table.Cell textAlign="center" py={3}>
                                        <Button
                                            size="sm"
                                            colorScheme="blue"
                                            onClick={() => downloadCSV(program.program_id)}
                                        >
                                            Download Results
                                        </Button>
                                    </Table.Cell>
                                    <Table.Cell textAlign="center" py={3}>
                                        <Button
                                            size="sm"
                                            colorScheme="teal"
                                            onClick={downloadQuestionsCSV} // ✅ no need for program ID
                                        >
                                            Download Questions
                                        </Button>
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
                                            <Icon as={FaTrash} boxSize={4}/>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                ) : (
                    <Box textAlign="center" py={10}>
                        <Text fontSize="lg">No programs found.</Text>
                    </Box>
                )}
            </Box>
            <Footer/>
        </div>
    );
};
export default AdminHome;