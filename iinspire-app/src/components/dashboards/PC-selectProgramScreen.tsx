"use client"
import { 
  Box, 
  Heading, 
  Button, 
  Text, 
  Image, 
  VStack, 
  StackProps,
  Spinner,
  Portal,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import colors from "../../../public/colors";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/constants/config";

type Program = {
  program_id: number;
  name: string;
  owner_userid: number;
  code: string;
  student_count: number;
};

/**
 * Component for program coordinators to select a program to manage
 * Displays a list of programs and allows navigation to program dashboard
 */
const PCSelectProgramBox = () => {
  const router = useRouter();
  const { user, setSelectedProgram } = useAuth();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempSelectedProgram, setTempSelectedProgram] = useState<string | null>(null);

  /**
   * Fetches programs associated with the current user
   * Runs when user data changes
   */
  useEffect(() => {
    const fetchPrograms = async () => {
      if (!user?.id) {
        console.log("reached");
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
        setPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, [user]);

  /**
   * Creates a collection of programs for the select dropdown
   * Formats each program with name and student count
   */
  const programCollection = createListCollection({
    items: programs.map(program => ({
      label: `${program.name} (${program.student_count} students)`,
      value: program.program_id.toString(),
      name: program.name
    }))
  });

  /**
   * Handles program selection change in dropdown
   * @param value - Array containing the selected program ID
   */
  const handleValueChange = ({ value }: { value: string[] }) => {
    const programId = value[0] || "";
    setTempSelectedProgram(programId);
  };

  /**
   * Handles continuation to program dashboard
   * Fetches resources for selected program and sets global state
   * Navigates to program dashboard on success
   */
  const handleContinue = async () => {
    if (!tempSelectedProgram || !user?.id) return;
    
    setIsSubmitting(true);
    let selectedProgramData: Program | undefined;
  
    try {
      selectedProgramData = programs.find(
        program => program.program_id.toString() === tempSelectedProgram
      );
      
      if (selectedProgramData) {
        const resourcesRes = await fetch(API_ENDPOINTS.getStudentResources, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            program_id: parseInt(selectedProgramData.program_id.toString())
          })
        });
  
        if (!resourcesRes.ok) {
          throw new Error('Failed to fetch resources');
        }
  
        const resourcesData = await resourcesRes.json();
        console.log(resourcesData)
        
        setSelectedProgram(
          tempSelectedProgram,
          selectedProgramData.name,
          {
            programs: programs.length.toString(), // Add program count here
            students: selectedProgramData.student_count.toString(),
            resources: resourcesData.length.toString()
          }
        );
      }
      
      router.push('/pc-home');
    } catch (error) {
      console.error('Error:', error);
      // Fallback with default counts if API fails
      if (selectedProgramData) {
        setSelectedProgram(
          tempSelectedProgram,
          selectedProgramData.name,
          {
            programs: programs.length.toString(), // Add program count here
            students: selectedProgramData.student_count.toString(),
            resources: "0"
          }
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Container styling props for the main content
   */
  const containerProps: StackProps = {
    maxW: "xl",
    mx: "auto",
    p: 6,
    gap: 6,
    align: "center",
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" color={colors.primary_blue} />
      </Box>
    );
  }

  return (
    <Box 
        background={colors.white} 
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        py={6}
    >
      <VStack {...containerProps} flex="1">
        <Heading as="h1" size="2xl" color={colors.primary_blue} textAlign="center">
          Welcome, {user?.fullname}
        </Heading>
        
        {programs.length > 0 ? (
          <>
            <Select.Root 
              collection={programCollection}
              size="md"
              width="100%"
              maxWidth="400px"
              value={tempSelectedProgram ? [tempSelectedProgram] : []}
              onValueChange={handleValueChange}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText 
                    placeholder="Select program"
                    color={tempSelectedProgram ? colors.black : undefined}
                  />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content bg={colors.white}>
                    {programCollection.items.map((program) => (
                      <Select.Item 
                        item={program} 
                        key={program.value} 
                        color={colors.black}
                        _selected={{ color: colors.black, bg: colors.light_grey }}
                      >
                        {program.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </>
        ) : (
          <Text color= "black" fontSize="lg" textAlign="center">
            {user?.programid 
              ? "You have not created any programs yet." 
              : "No program coordinator account found."}
          </Text>
        )}
        
        <Button 
          size="lg"
          onClick={handleContinue}
          loading={isSubmitting}
          disabled={!tempSelectedProgram}
          bg={colors.black}
          color={colors.white}
          _hover={{ bg: colors.dark_grey }}
          borderRadius="md"
          px={3}
          py={2}
          width="100%"
          maxWidth="400px"
        >
          Continue to Dashboard
        </Button>
        
        <Text fontSize="lg" textAlign="center" color={colors.dark_grey}>
          or
        </Text>
        
        <Button 
          variant="outline" 
          size="md"
          onClick={() => router.push("/pc-create-program")}
          color={colors.black}
          _hover={{ bg: colors.light_grey }}
          width="100%"
          maxWidth="400px"
        >
          Create New Program
        </Button>

      </VStack>
    </Box>
  );
};

export default PCSelectProgramBox;